import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import type { LeadSignal } from "@/lib/lead-scoring";

export type ConversationEntry = {
  messages: MessageParam[];
  leadScore: number;
  detectedSignals: LeadSignal[];
  locale: string;
  lastActivity: number; // Unix ms
};

// In-memory store — sufficient for MVP (one process).
// Upgrade path: replace Map with Redis (single file change).
const store = new Map<string, ConversationEntry>();

const TTL_MS = 30 * 60 * 1_000; // 30 minutes

function cleanup() {
  const now = Date.now();
  for (const [id, entry] of store) {
    if (now - entry.lastActivity > TTL_MS) {
      store.delete(id);
    }
  }
}

// Run cleanup every 10 minutes
setInterval(cleanup, 10 * 60 * 1_000).unref?.();

export function getConversation(sessionId: string): ConversationEntry | undefined {
  const entry = store.get(sessionId);
  if (!entry) return undefined;
  if (Date.now() - entry.lastActivity > TTL_MS) {
    store.delete(sessionId);
    return undefined;
  }
  return entry;
}

export function upsertConversation(
  sessionId: string,
  patch: Partial<ConversationEntry> & { locale?: string },
): ConversationEntry {
  const existing = getConversation(sessionId);
  const updated: ConversationEntry = {
    messages: existing?.messages ?? [],
    leadScore: existing?.leadScore ?? 0,
    detectedSignals: existing?.detectedSignals ?? [],
    locale: existing?.locale ?? patch.locale ?? "en",
    lastActivity: Date.now(),
    ...patch,
  };
  store.set(sessionId, updated);
  return updated;
}

export function appendMessage(
  sessionId: string,
  message: MessageParam,
  locale = "en",
): MessageParam[] {
  const entry = getConversation(sessionId);
  const messages = [...(entry?.messages ?? []), message];
  upsertConversation(sessionId, { messages, locale });
  return messages;
}
