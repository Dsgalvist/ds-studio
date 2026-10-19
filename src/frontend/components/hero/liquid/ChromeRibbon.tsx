
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Point = [number, number, number];

type Props = {
  points: Point[];
  width?: number;
  speed?: number;
  offset?: number;
  folds?: number;
  opacity?: number;
};

export default function ChromeRibbon({
  points,
  width = 0.8,
  speed = 0.15,
  offset = 0,
  folds = 2,
  opacity = 1,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,
      "centripetal"
    );

    const lengthSegments = 260;
    const widthSegments = 24;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const up = new THREE.Vector3(0, 0, 1);
    const side = new THREE.Vector3();
    const normal = new THREE.Vector3();

    for (let i = 0; i <= lengthSegments; i++) {
      const t = i / lengthSegments;

      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t).normalize();

      side.crossVectors(tangent, up).normalize();

      if (side.lengthSq() < 0.00001) {
        side.set(1, 0, 0);
      }

      normal.crossVectors(tangent, side).normalize();

      // Anchura orgánica con extremos afinados
      const envelope = Math.pow(
        Math.max(0, Math.sin(Math.PI * t)),
        0.45
      );

      const widthVariation =
        0.82 +
        0.18 * Math.sin(t * Math.PI * 3 + offset);

      const localWidth =
        width * envelope * widthVariation;

      // Torsión orgánica sin efecto de hélice
      const roll =
        Math.sin(t * Math.PI * 2.1 + offset) * 0.38 +
        Math.sin(t * Math.PI * 4.2 + offset) * 0.12;

      const across = side
        .clone()
        .multiplyScalar(Math.cos(roll))
        .addScaledVector(normal, Math.sin(roll))
        .normalize();

      const depth = normal
        .clone()
        .multiplyScalar(Math.cos(roll))
        .addScaledVector(side, -Math.sin(roll))
        .normalize();

      for (let j = 0; j <= widthSegments; j++) {
        const v = j / widthSegments;
        const u = v * 2 - 1;

        // Curvatura en los bordes
        const edgeCurl =
          Math.pow(Math.abs(u), 2.5) * 0.09;

        // Pliegues longitudinales
        const fold =
          Math.sin(
            t * Math.PI * folds * 2 +
              u * 3.2 +
              offset
          ) *
          Math.sin(Math.PI * v) *
          0.11;

        const secondaryFold =
          Math.sin(
            t * Math.PI * 3.4 -
              u * 5.1 +
              offset
          ) * 0.035;

        const position = point
          .clone()
          .addScaledVector(
            across,
            u * localWidth * 0.5
          )
          .addScaledVector(
            depth,
            edgeCurl + fold + secondaryFold
          );

        positions.push(
          position.x,
          position.y,
          position.z
        );

        uvs.push(t, v);
      }
    }

    for (let i = 0; i < lengthSegments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j;
        const b = a + widthSegments + 1;

        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const result = new THREE.BufferGeometry();

    result.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    result.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );

    result.setIndex(indices);
    result.computeVertexNormals();

    return result;
  }, [points, width, offset, folds]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(({ clock, pointer }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();

    // Seguimiento del cursor
    const targetX = pointer.x * 0.22;

    // Movimiento orgánico continuo + respuesta vertical
    const targetY =
      Math.sin(time * speed + offset) * 0.12 +
      pointer.y * 0.1;

    // Rotación suave que reacciona al cursor
    const targetRotation =
      Math.sin(time * speed * 0.7 + offset) * 0.025 +
      pointer.x * 0.018;

    // Interpolación independiente de los FPS
    const easing = 1 - Math.exp(-delta * 3);

    group.position.x +=
      (targetX - group.position.x) * easing;

    group.position.y +=
      (targetY - group.position.y) * easing;

    group.rotation.z +=
      (targetRotation - group.rotation.z) * easing;
  });

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        frustumCulled={false}
      >
        <meshPhysicalMaterial
          color="#BBC5D4"
          metalness={1}
          roughness={0.13}
          clearcoat={1}
          clearcoatRoughness={0.09}
          envMapIntensity={1.7}
          side={THREE.DoubleSide}
          transparent={opacity < 1}
          opacity={opacity}
          depthWrite={opacity === 1}
        />
      </mesh>
    </group>
  );
}
