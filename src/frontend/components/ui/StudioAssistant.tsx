
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Mail,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Language = "es" | "en";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type StudioAssistantProps = {
  locale: Language;
};

type ContactPerson = "sara" | "diego";

const CONTACTS = {
  sara: {
    name: "Sara Acosta",
    email: "saragutierrez0823@gmail.com",
    phone: "18254885363",
    color: "violet",
  },
  diego: {
    name: "Diego Galvis",
    email: "diegogalvis682@gmail.com",
    phone: "18253437802",
    color: "cyan",
  },
} as const;

const copy = {
  es: {
    launch: "Pregúntanos",
    close: "Cerrar",
    title: "D/S AI",
    eyebrow: "ASISTENTE DEL ESTUDIO",
    subtitle: "Creatividad + Tecnología",
    intro: "¿Qué podemos crear juntos?",
    description:
      "Conoce nuestros proyectos, explora nuestros servicios y transforma tu idea en una conversación.",
    suggestions: "EMPIEZA POR AQUÍ",
    questions: [
      "¿Qué servicios ofrece D/S Studio?",
      "¿Qué hicieron Sara y Diego para DIALAC?",
      "¿Qué es Tankeco y cómo funciona?",
      "¿Cómo puedo contactarlos?",
    ],
    placeholder: "Escribe tu pregunta...",
    send: "Enviar mensaje",
    sending: "D/S AI está pensando",
    boot: "INICIANDO D/S AI",
    bootDetail: "Conectando creatividad y tecnología",
    footer: "Asistente con inteligencia artificial",
    user: "TÚ",
    assistant: "D/S AI",
    back: "Volver al inicio",
    contactTitle: "HABLEMOS DE TU PROYECTO",
    whatsapp: "WhatsApp",
    email: "Correo electrónico",
    saraRole: "Diseño y audiovisual",
    diegoRole: "Desarrollo y tecnología",
    error:
      "No pude responder en este momento. Puedes contactar a Sara o Diego utilizando sus canales de contacto.",
    limit:
      "Alcanzaste el límite temporal de consultas. Inténtalo nuevamente en unos minutos.",
  },
  en: {
    launch: "Ask us",
    close: "Close",
    title: "D/S AI",
    eyebrow: "STUDIO ASSISTANT",
    subtitle: "Creativity + Technology",
    intro: "What can we create together?",
    description:
      "Discover our projects, explore our services and turn your idea into a conversation.",
    suggestions: "START HERE",
    questions: [
      "What services does D/S Studio offer?",
      "What did Sara and Diego do for DIALAC?",
      "What is Tankeco and how does it work?",
      "How can I contact you?",
    ],
    placeholder: "Type your question...",
    send: "Send message",
    sending: "D/S AI is thinking",
    boot: "STARTING D/S AI",
    bootDetail: "Connecting creativity and technology",
    footer: "AI-powered studio assistant",
    user: "YOU",
    assistant: "D/S AI",
    back: "Back to start",
    contactTitle: "LET'S TALK ABOUT YOUR PROJECT",
    whatsapp: "WhatsApp",
    email: "Email",
    saraRole: "Design and audiovisual",
    diegoRole: "Development and technology",
    error:
      "I couldn't respond right now. You can contact Sara or Diego using their contact channels.",
    limit:
      "You've reached the temporary chat limit. Please try again in a few minutes.",
  },
};

function WhatsAppIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63a11.94 11.94 0 0 0 5.81 1.48h.01C18.64 23.85 24 18.49 24 11.9a11.86 11.86 0 0 0-3.48-8.42ZM12.05 21.83a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.73.98.99-3.63-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.95 9.92Zm5.44-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.87 1.22 3.07c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function getWhatsAppUrl(
  person: ContactPerson,
  locale: Language
) {
  const contact = CONTACTS[person];

  const message =
    locale === "es"
      ? `Hola ${person === "sara" ? "Sara" : "Diego"}, encontré D/S Studio y me gustaría conversar sobre un proyecto.`
      : `Hi ${person === "sara" ? "Sara" : "Diego"}, I found D/S Studio and would like to discuss a project.`;

  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
}

function getContactPeople(
  content: string,
  question: string
): ContactPerson[] {
  const text = `${question} ${content}`.toLowerCase();

  const saraMentioned =
    /\bsara\b|saragutierrez0823|18254885363/.test(text);

  const diegoMentioned =
    /\bdiego\b|diegogalvis682|18253437802/.test(text);

  const creative =
    /diseñ|audiovisual|video|fotograf|catálogo|catalog|graphic|creative|branding|visual/.test(
      question.toLowerCase()
    );

  const technical =
    /web|software|aplicaci|application|program|automat|cloud|inteligencia artificial|\bai\b|desarroll/.test(
      question.toLowerCase()
    );

  if (saraMentioned && diegoMentioned) {
    return ["sara", "diego"];
  }

  if (saraMentioned) return ["sara"];
  if (diegoMentioned) return ["diego"];

  if (creative && technical) return ["sara", "diego"];
  if (creative) return ["sara"];
  if (technical) return ["diego"];

  return ["sara", "diego"];
}

function shouldShowContactCards(
  answer: string,
  question: string
) {
  const text = `${question} ${answer}`.toLowerCase();

  return /contact|whatsapp|correo|email|escribir|message|cotiz|quote|presupuesto|budget|hablar con|reach out|ponerte en contacto|comunicarte/.test(
    text
  );
}

function ContactCards({
  locale,
  people,
}: {
  locale: Language;
  people: ContactPerson[];
}) {
  const t = copy[locale];

  return (
    <div className="mt-3 space-y-2">
      <p className="font-mono text-[10px] font-semibold tracking-[0.15em] text-slate-400">
        {t.contactTitle}
      </p>

      {people.map((person) => {
        const contact = CONTACTS[person];
        const isSara = person === "sara";

        return (
          <div
            key={person}
            className={`overflow-hidden rounded-2xl border bg-[#111827]/90 ${
              isSara
                ? "border-violet-400/25"
                : "border-cyan-400/25"
            }`}
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                  isSara
                    ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                    : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                }`}
              >
                <span className="text-sm font-bold">
                  {isSara ? "SA" : "DG"}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  {contact.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {isSara ? t.saraRole : t.diegoRole}
                </p>
              </div>

              <Check
                size={15}
                className={
                  isSara
                    ? "text-violet-300"
                    : "text-cyan-300"
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-2">
              <a
                href={getWhatsAppUrl(person, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#25D366]/25 bg-[#25D366]/10 px-2 text-xs font-semibold text-[#75EBA1] transition hover:border-[#25D366]/60 hover:bg-[#25D366]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75EBA1]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>{t.whatsapp}</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-2 text-xs font-semibold text-slate-200 transition hover:border-white/35 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail size={15} />
                <span>{t.email}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function StudioAssistant({
  locale,
}: StudioAssistantProps) {
  const t = copy[locale];

  const [open, setOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const hasStarted = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open || !starting) return;

    const timer = window.setTimeout(
      () => {
        setStarting(false);
        hasStarted.current = true;
      },
      reducedMotion ? 500 : 1400
    );

    return () => window.clearTimeout(timer);
  }, [open, starting, reducedMotion]);

  useEffect(() => {
    if (!open || starting) return;

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus({
        preventScroll: true,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [open, starting]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop =
          scrollRef.current.scrollHeight;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [open, messages, loading, starting]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus({
          preventScroll: true,
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeAssistant() {
    setOpen(false);

    requestAnimationFrame(() => {
      launcherRef.current?.focus({
        preventScroll: true,
      });
    });
  }

  function toggleAssistant() {
    if (open) {
      closeAssistant();
      return;
    }

    if (!hasStarted.current) {
      setStarting(true);
    }

    setOpen(true);
  }

  async function sendMessage(question: string) {
    const content = question.trim();

    if (!content || loading || starting) return;

    const updated: Message[] = [
      ...messages,
      {
        role: "user",
        content,
      },
    ];

    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify({
          messages: updated,
        }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "rate_limit"
            : "request_failed"
        );
      }

      const data: { message?: unknown } =
        await response.json();

      if (typeof data.message !== "string") {
        throw new Error("invalid_response");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.message as string,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error &&
            error.message === "rate_limit"
              ? t.limit
              : t.error,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetConversation() {
    setMessages([]);
    setInput("");
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            id="studio-assistant"
            role="dialog"
            aria-modal="false"
            aria-label={t.title}
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                    scale: 0.96,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 12,
                    scale: 0.97,
                  }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.28,
              ease: "easeOut",
            }}
            className="fixed inset-x-3 bottom-[5.25rem] z-[200] flex h-[min(570px,calc(100dvh-6.5rem))] flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[#0B101B] text-white shadow-[0_30px_100px_rgba(0,0,0,0.65),0_0_45px_rgba(90,110,255,0.1)] sm:inset-x-auto sm:right-5 sm:w-[390px]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(150,170,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(150,170,255,.08) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "linear-gradient(to bottom,black,transparent 65%)",
              }}
            />

            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-300 via-indigo-400 to-violet-400" />

            <header className="relative flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#101726]/95 px-4 py-3">
              <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-indigo-300/30 bg-gradient-to-br from-cyan-400/15 to-violet-400/15">
                <Sparkles
                  size={21}
                  className="text-indigo-200"
                />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#101726] bg-cyan-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] font-semibold tracking-[0.17em] text-indigo-200/80">
                  {t.eyebrow}
                </p>

                <h2 className="mt-1 text-base font-bold tracking-tight">
                  {t.title}
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    / {t.subtitle}
                  </span>
                </h2>
              </div>

              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label={t.back}
                  title={t.back}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-cyan-300/50 hover:text-white"
                >
                  <ArrowLeft size={17} />
                </button>
              )}

              <button
                type="button"
                onClick={closeAssistant}
                aria-label={t.close}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-violet-300/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              aria-live="polite"
              aria-relevant="additions text"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {starting ? (
                  <motion.div
                    key="boot"
                    role="status"
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.92,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 1.06,
                          }
                    }
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : 0.22,
                    }}
                    className="flex min-h-full flex-col items-center justify-center text-center"
                  >
                    <div className="relative grid h-[150px] w-[150px] place-items-center">
                      <div className="absolute inset-0 rounded-full border border-cyan-300/25 motion-safe:animate-[spin_12s_linear_infinite]">
                        <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" />
                      </div>

                      <div className="absolute inset-4 rounded-full border border-dashed border-violet-300/55 motion-safe:animate-[spin_5s_linear_infinite_reverse]" />

                      <div className="absolute inset-8 rounded-[24px] border border-indigo-300/40 bg-[#182039] shadow-[0_0_45px_rgba(129,140,248,0.25)]" />

                      <Sparkles className="relative h-10 w-10 text-indigo-200 motion-safe:animate-pulse" />

                      <span className="absolute -bottom-1 rounded-md border border-indigo-300/40 bg-[#111A2B] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-indigo-200">
                        D/S / AI
                      </span>
                    </div>

                    <p className="mt-8 font-mono text-[11px] font-bold tracking-[0.22em] text-indigo-200">
                      {t.boot}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      {t.bootDetail}
                    </p>

                    <div className="mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-indigo-400 to-violet-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reducedMotion
                            ? 0.5
                            : 1.4,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ) : messages.length === 0 ? (
                  <motion.div
                    key="welcome"
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : 0.24,
                    }}
                    className="flex min-h-full flex-col justify-center"
                  >
                    <div className="relative mb-4 grid h-[74px] w-[74px] place-items-center self-center rounded-[22px] border border-indigo-300/25 bg-[#172036] shadow-[0_0_40px_rgba(129,140,248,0.15)]">
                      <span className="absolute inset-1.5 rounded-[17px] border border-dashed border-indigo-300/35" />

                      <Sparkles className="h-8 w-8 text-indigo-200" />

                      <span className="absolute -bottom-1 -right-1 rounded-md bg-indigo-300 px-1.5 py-0.5 font-mono text-[9px] font-black text-[#101726]">
                        AI
                      </span>
                    </div>

                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">
                      {t.eyebrow}
                    </p>

                    <h3 className="mx-auto mt-3 max-w-[310px] text-center text-[25px] font-bold leading-[1.15] tracking-[-0.04em]">
                      {t.intro}
                    </h3>

                    <p className="mx-auto mt-3 max-w-[310px] text-center text-xs leading-5 text-slate-400">
                      {t.description}
                    </p>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300/85">
                        {t.suggestions}
                      </p>

                      <div className="grid gap-2">
                        {t.questions.map(
                          (question, index) => (
                            <button
                              key={question}
                              type="button"
                              onClick={() =>
                                void sendMessage(question)
                              }
                              className="group flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-left text-xs leading-5 text-slate-200 transition hover:border-indigo-300/50 hover:bg-indigo-300/[0.08]"
                            >
                              <span className="font-mono text-[10px] text-indigo-300">
                                0{index + 1}
                              </span>

                              <span className="flex-1">
                                {question}
                              </span>

                              <ArrowUpRight
                                size={15}
                                className="text-indigo-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="conversation"
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : 0.22,
                    }}
                    className="space-y-5"
                  >
                    {messages.map((message, index) => {
                      const isUser =
                        message.role === "user";

                      const previousQuestion =
                        [...messages]
                          .slice(0, index)
                          .reverse()
                          .find(
                            (item) =>
                              item.role === "user"
                          )?.content ?? "";

                      const showContacts =
                        !isUser &&
                        shouldShowContactCards(
                          message.content,
                          previousQuestion
                        );

                      const people = showContacts
                        ? getContactPeople(
                            message.content,
                            previousQuestion
                          )
                        : [];

                      return (
                        <motion.div
                          key={index}
                          initial={
                            reducedMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 8,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: reducedMotion
                              ? 0
                              : 0.24,
                          }}
                          className={`flex flex-col ${
                            isUser
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <p className="mb-1.5 px-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            {isUser
                              ? t.user
                              : t.assistant}
                          </p>

                          <div
                            className={`max-w-[94%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                              isUser
                                ? "rounded-tr-sm bg-gradient-to-br from-cyan-200 to-indigo-200 text-[#101726]"
                                : "rounded-tl-sm border border-indigo-300/20 bg-[#172036] text-slate-200"
                            }`}
                          >
                            {isUser ? (
                              <p className="whitespace-pre-wrap wrap-break-word">
                                {message.content}
                              </p>
                            ) : (
                              <ReactMarkdown
                                components={{
                                  a: ({
                                    href,
                                    children,
                                  }) => (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-semibold text-cyan-200 underline underline-offset-4 transition hover:text-white"
                                    >
                                      {children}
                                    </a>
                                  ),
                                  strong: ({
                                    children,
                                  }) => (
                                    <strong className="font-bold text-white">
                                      {children}
                                    </strong>
                                  ),
                                  ul: ({
                                    children,
                                  }) => (
                                    <ul className="ml-4 list-disc space-y-1">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({
                                    children,
                                  }) => (
                                    <ol className="ml-4 list-decimal space-y-1">
                                      {children}
                                    </ol>
                                  ),
                                  p: ({
                                    children,
                                  }) => (
                                    <p className="mb-2 last:mb-0">
                                      {children}
                                    </p>
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            )}
                          </div>

                          {showContacts && (
                            <div className="w-full max-w-[94%]">
                              <ContactCards
                                locale={locale}
                                people={people}
                              />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    <AnimatePresence>
                      {loading && (
                        <motion.div
                          key="thinking"
                          role="status"
                          initial={
                            reducedMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 10,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={
                            reducedMotion
                              ? undefined
                              : {
                                  opacity: 0,
                                  y: -6,
                                }
                          }
                          className="flex items-start gap-2.5"
                        >
                          <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-indigo-300/40 bg-indigo-300/10 text-indigo-200">
                            <span className="absolute inset-0 rounded-xl border-t border-indigo-300 motion-safe:animate-spin" />
                            <Sparkles
                              size={16}
                              className="motion-safe:animate-pulse"
                            />
                          </div>

                          <div className="rounded-2xl rounded-tl-sm border border-indigo-300/20 bg-[#172036] px-4 py-3">
                            <p className="text-xs text-slate-200">
                              {t.sending}
                              <span className="ml-2 inline-flex gap-1">
                                {[0, 1, 2].map(
                                  (dot) => (
                                    <i
                                      key={dot}
                                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-300"
                                      style={{
                                        animationDelay: `${dot * 120}ms`,
                                      }}
                                    />
                                  )
                                )}
                              </span>
                            </p>

                            <div className="mt-3 h-px w-28 overflow-hidden bg-indigo-200/15">
                              <span className="block h-full w-1/2 bg-gradient-to-r from-cyan-300 to-violet-300 motion-safe:animate-pulse" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!starting && (
              <form
                onSubmit={submit}
                className="relative shrink-0 border-t border-white/10 bg-[#101726] px-3 pb-3 pt-3"
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#0B101B] p-1 transition-colors focus-within:border-indigo-300/60">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    maxLength={700}
                    disabled={loading}
                    aria-label={t.placeholder}
                    placeholder={t.placeholder}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-60"
                  />

                  <button
                    type="submit"
                    disabled={
                      loading || !input.trim()
                    }
                    aria-label={t.send}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-300 to-indigo-300 text-[#101726] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={17} />
                  </button>
                </div>

                <p className="mt-2 text-center font-mono text-[9px] tracking-wide text-slate-500">
                  {t.footer}
                </p>
              </form>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={toggleAssistant}
        aria-controls="studio-assistant"
        aria-expanded={open}
        aria-label={open ? t.close : t.launch}
        className="group fixed bottom-5 right-5 z-[200] flex h-14 items-center gap-2 rounded-[19px] border border-indigo-300/30 bg-[#101726] py-1.5 pl-1.5 pr-3.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(129,140,248,0.15)] transition hover:-translate-y-1 hover:border-indigo-300/60 hover:shadow-[0_16px_45px_rgba(0,0,0,0.5),0_0_35px_rgba(129,140,248,0.25)] motion-reduce:transform-none"
      >
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-cyan-300 to-violet-300 text-[#101726]">
          <span className="absolute inset-1 rounded-[10px] border border-[#101726]/20" />

          {open ? (
            <X size={20} className="relative" />
          ) : (
            <Sparkles
              size={20}
              className="relative"
            />
          )}
        </span>

        <span className="whitespace-nowrap text-xs font-bold tracking-wide">
          {open ? t.close : t.launch}
        </span>
      </button>
    </>
  );
}
