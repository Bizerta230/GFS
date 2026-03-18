"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const nextIdRef = useRef(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Restore simple session history
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("gfs_chat_history");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Message[];
        setMessages(parsed);
        nextIdRef.current = parsed.length + 1;
      } catch {
        // ignore
      }
    }
  }, []);

  // Persist history
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
      "gfs_chat_history",
      JSON.stringify(messages),
    );
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const id = nextIdRef.current++;
    const userMessage: Message = { id, role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          locale: "en", // will be wired to next-intl later
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };
      const replyText =
        data.reply ??
        data.error ??
        "The chat service is temporarily unavailable. Please try again later.";

      const assistantMessage: Message = {
        id: nextIdRef.current++,
        role: "assistant",
        content: replyText,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const assistantMessage: Message = {
        id: nextIdRef.current++,
        role: "assistant",
        content:
          "We could not reach the AI backend. In production this will be powered by Claude API.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-slate-950 shadow-lg shadow-black/40 transition hover:bg-secondary/90 md:bottom-6 md:right-6"
      >
        Chat
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 flex w-[min(100%-2rem,380px)] flex-col rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl shadow-black/60 md:bottom-24 md:right-6 md:w-96">
          <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-100">
                GFS Technical Advisor
              </span>
              <span className="text-[10px] text-slate-400">
                AI assistant for EPM questions
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-900 hover:text-slate-100"
            >
              Close
            </button>
          </div>
          <div
            ref={containerRef}
            className="flex min-h-[220px] max-h-[260px] flex-col gap-2 overflow-y-auto px-3 py-3 text-xs text-slate-100"
          >
            {messages.length === 0 && (
              <p className="text-[11px] text-slate-400">
                Ask about EPM technology, ROI, pilot programs, or implementation.
                In production this chat will be powered by the Claude API and
                connected to the CRM.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-secondary text-slate-950"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-slate-800 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              className="flex-1 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
              placeholder="Ask a question about EPM…"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={isSending}
              className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:bg-secondary/60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

