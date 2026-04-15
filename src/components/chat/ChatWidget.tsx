"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

function getSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  const key = "gfs_session_id";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

export function ChatWidget() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Restore history from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("gfs_chat_history");
    if (raw) {
      try {
        setMessages(JSON.parse(raw) as Message[]);
      } catch {
        // ignore
      }
    }
  }, []);

  // Persist history and auto-scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't persist while streaming
    if (!isSending) {
      window.sessionStorage.setItem("gfs_chat_history", JSON.stringify(messages));
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const sessionId = getSessionId();

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantId = crypto.randomUUID();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId, locale }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6)) as {
              text?: string;
              done?: boolean;
              error?: string;
            };

            if (payload.error) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: "Sorry, an error occurred. Please try again.", streaming: false }
                    : m,
                ),
              );
            } else if (payload.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + payload.text }
                    : m,
                ),
              );
            } else if (payload.done) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, streaming: false } : m,
                ),
              );
            }
          } catch {
            // ignore malformed SSE line
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: "Could not reach the AI backend. Please check your connection.",
                streaming: false,
              }
            : m,
        ),
      );
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
                Powered by Claude AI.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-secondary text-slate-950"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {m.content}
                  {m.streaming && (
                    <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-slate-400" />
                  )}
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
              {isSending ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
