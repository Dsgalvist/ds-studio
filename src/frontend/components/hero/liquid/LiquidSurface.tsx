
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type LiquidPoint = [number, number, number];

type Props = {
  points: LiquidPoint[];
  width?: number;
  speed?: number;
  amplitude?: number;
  offset?: number;
};

const LENGTH_SEGMENTS = 180;
const WIDTH_SEGMENTS = 24;

export default function LiquidSurface({
  points,
  width = 0.7,
  speed = 0.7,
  amplitude = 0.22,
  offset = 0,
}: Props) {
  const { gl, camera } = useThree();

  const pointerTarget = useRef(
    new THREE.Vector2(-100, -100)
  );

  const pointerSmooth = useRef(
    new THREE.Vector2(-100, -100)
  );

  const pointerActive = useRef(false);
  const motionEnabled = useRef(true);

  const raycaster = useMemo(
    () => new THREE.Raycaster(),
    []
  );

  const pointerNDC = useMemo(
    () => new THREE.Vector2(),
    []
  );

  const interactionPlane = useMemo(
    () =>
      new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        0
      ),
    []
  );

  const intersection = useMemo(
    () => new THREE.Vector3(),
    []
  );

  // Geometría base de la superficie.
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(
        ([x, y, z]) => new THREE.Vector3(x, y, z)
      ),
      false,
      "centripetal"
    );

    const positions = new Float32Array(
      (LENGTH_SEGMENTS + 1) *
        (WIDTH_SEGMENTS + 1) *
        3
    );

    const indices: number[] = [];

    for (let i = 0; i < LENGTH_SEGMENTS; i++) {
      for (let j = 0; j < WIDTH_SEGMENTS; j++) {
        const a =
          i * (WIDTH_SEGMENTS + 1) + j;

        const b = a + WIDTH_SEGMENTS + 1;

        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const result = new THREE.BufferGeometry();

    result.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    result.setIndex(indices);

    result.userData.curve = curve;

    return result;
  }, [points]);

  // Conservamos el material cromado que funcionó.
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#D9E1ED",
        metalness: 1,
        roughness: 0.095,
        clearcoat: 1,
        clearcoatRoughness: 0.07,
        envMapIntensity: 2.3,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Accesibilidad: respetar movimiento reducido.
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      motionEnabled.current = !media.matches;
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  // Seguimiento del cursor en coordenadas 3D.
  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerMove = (event: PointerEvent) => {
      if (!motionEnabled.current) return;

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const nx =
        ((event.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      const ny =
        -(
          (event.clientY - rect.top) /
          rect.height
        ) *
          2 +
        1;

      pointerActive.current =
        nx >= -1 &&
        nx <= 1 &&
        ny >= -1 &&
        ny <= 1;

      if (!pointerActive.current) return;

      pointerNDC.set(nx, ny);

      raycaster.setFromCamera(
        pointerNDC,
        camera
      );

      if (
        raycaster.ray.intersectPlane(
          interactionPlane,
          intersection
        )
      ) {
        pointerTarget.current.set(
          intersection.x,
          intersection.y
        );
      }
    };

    const onLeave = () => {
      pointerActive.current = false;
    };

    window.addEventListener(
      "pointermove",
      onPointerMove,
      { passive: true }
    );

    window.addEventListener(
      "blur",
      onLeave
    );

    document.addEventListener(
      "pointerleave",
      onLeave
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        onPointerMove
      );

      window.removeEventListener(
        "blur",
        onLeave
      );

      document.removeEventListener(
        "pointerleave",
        onLeave
      );
    };
  }, [
    gl,
    camera,
    raycaster,
    pointerNDC,
    interactionPlane,
    intersection,
  ]);

  // Vectores reutilizables para evitar
  // crear objetos en cada frame.
  const vectors = useMemo(
    () => ({
      up: new THREE.Vector3(0, 0, 1),
      side: new THREE.Vector3(),
      across: new THREE.Vector3(),
      depth: new THREE.Vector3(),
      base: new THREE.Vector3(),
    }),
    []
  );

  const elapsedTime = useRef(0);

  useFrame((_, delta) => {
    const curve = geometry.userData
      .curve as THREE.CatmullRomCurve3;

    const attribute = geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    const array = attribute.array as Float32Array;

    if (motionEnabled.current) {
      elapsedTime.current += Math.min(delta, 0.05);
    }

    const time = elapsedTime.current * speed;

    const follow = 1 - Math.exp(-delta * 7);

    pointerSmooth.current.lerp(
      pointerTarget.current,
      follow
    );

    const pointerX = pointerSmooth.current.x;
    const pointerY = pointerSmooth.current.y;

    const influenceEnabled =
      pointerActive.current &&
      motionEnabled.current;

    const {
      up,
      side,
      across,
      depth,
      base,
    } = vectors;

    for (let i = 0; i <= LENGTH_SEGMENTS; i++) {
      const t = i / LENGTH_SEGMENTS;

      const center = curve.getPointAt(t);
      const tangent = curve
        .getTangentAt(t)
        .normalize();

      side
        .crossVectors(tangent, up)
        .normalize();

      if (side.lengthSq() < 0.00001) {
        side.set(1, 0, 0);
      }

      // Extremos suavizados.
      const envelope = Math.pow(
        Math.max(
          0,
          Math.sin(Math.PI * t)
        ),
        0.42
      );

      // Variaciones de anchura más suaves.
      const widthVariation =
        0.88 +
        0.09 *
          Math.sin(
            t * 9.0 +
              time * 0.45 +
              offset
          ) +
        0.05 *
          Math.cos(
            t * 15.0 -
              time * 0.3
          );

      const localWidth =
        width *
        envelope *
        widthVariation;

      // Torsión orgánica reducida:
      // evita los nudos centrales.
      const roll =
        Math.sin(
          t * 6.0 -
            time * 0.42 +
            offset
        ) *
          0.28 +
        Math.cos(
          t * 11.0 +
            time * 0.28
        ) *
          0.1;

      across
        .copy(side)
        .multiplyScalar(Math.cos(roll))
        .addScaledVector(
          up,
          Math.sin(roll)
        );

      depth
        .copy(up)
        .multiplyScalar(Math.cos(roll))
        .addScaledVector(
          side,
          -Math.sin(roll)
        );

      for (
        let j = 0;
        j <= WIDTH_SEGMENTS;
        j++
      ) {
        const v = j / WIDTH_SEGMENTS;
        const u = v * 2 - 1;

        // Pliegues más largos y fluidos.
        const fold =
          Math.sin(
            t * 10.0 -
              time * 0.85 +
              u * 2.8 +
              offset
          ) *
            0.55 +
          Math.sin(
            t * 17.0 +
              time * 0.5 -
              u * 3.5
          ) *
            0.28 +
          Math.cos(
            t * 7.0 -
              time * 0.35 +
              u * 4.2
          ) *
            0.17;

        // Bordes ligeramente curvados.
        const edgeCurl =
          Math.pow(
            Math.abs(u),
            2.2
          ) * 0.09;

        base
          .copy(center)
          .addScaledVector(
            across,
            u * localWidth * 0.5
          );

        // Distancia al cursor.
        const dx = base.x - pointerX;
        const dy = base.y - pointerY;

        const distanceSq =
          dx * dx + dy * dy;

        // Influencia localizada.
        const influence =
          influenceEnabled
            ? Math.exp(
                -distanceSq / 0.8
              )
            : 0;

        const ripple =
          Math.sin(
            Math.sqrt(distanceSq) * 9 -
              time * 4.5
          ) * influence;

        // Deformación tridimensional.
        const deformation =
          fold * amplitude +
          edgeCurl +
          ripple * 0.24;

        base.addScaledVector(
          depth,
          deformation
        );

        // Movimiento vertical sutil.
        base.y +=
          Math.sin(
            t * 9.0 +
              time * 0.65 +
              offset
          ) *
          amplitude *
          0.12;

        const index =
          (
            i *
              (WIDTH_SEGMENTS + 1) +
            j
          ) * 3;

        array[index] = base.x;
        array[index + 1] = base.y;
        array[index + 2] = base.z;
      }
    }

    attribute.needsUpdate = true;

    // Actualizamos las normales para que
    // los reflejos sigan los pliegues.
    geometry.computeVertexNormals();
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <mesh
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}
