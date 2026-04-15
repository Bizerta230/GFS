import Anthropic from "@anthropic-ai/sdk";
import { buildSystemBlocks } from "@/lib/ai/system-prompt";
import {
  appendMessage,
  getConversation,
  upsertConversation,
} from "@/lib/ai/conversation-store";
import { detectLeadSignals } from "@/lib/ai/lead-detector";
import { createLeadInOdoo } from "@/lib/api/odoo";
import { retrieveContext } from "@/lib/rag/retrieve";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    message?: string;
    sessionId?: string;
    locale?: string;
  } | null;

  const userMessage =
    typeof body?.message === "string" ? body.message.trim() : "";
  const sessionId =
    typeof body?.sessionId === "string"
      ? body.sessionId
      : crypto.randomUUID();
  const locale = typeof body?.locale === "string" ? body.locale : "en";

  if (!userMessage) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Append user message to conversation history
  const messages = appendMessage(
    sessionId,
    { role: "user", content: userMessage },
    locale,
  );

  // Detect lead signals in the user message
  const detection = detectLeadSignals(userMessage);

  // RAG retrieval — runs in parallel with nothing else, fast enough (~200ms)
  const ragStart = Date.now();
  const { context: ragContext, chunkCount } = await retrieveContext(
    userMessage,
    5,
  );
  const ragMs = Date.now() - ragStart;

  const encoder = new TextEncoder();
  let fullAssistantText = "";
  const streamStart = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = anthropic.messages.stream({
          model: "claude-sonnet-4-5",
          max_tokens: 400,
          system: buildSystemBlocks(
            locale,
            ragContext || undefined,
          ) as Anthropic.TextBlockParam[],
          messages: messages as MessageParam[],
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = event.delta.text;
            fullAssistantText += chunk;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text: chunk })}\n\n`,
              ),
            );
          }
        }

        const finalMessage = await anthropicStream.finalMessage();
        const usage = finalMessage.usage;
        const totalMs = Date.now() - streamStart;

        // Save assistant reply to conversation history
        appendMessage(
          sessionId,
          { role: "assistant", content: fullAssistantText },
          locale,
        );

        // Detect signals in assistant reply too (agent may have offered contact)
        const responseDetection = detectLeadSignals(fullAssistantText);
        const allSignals = Array.from(
          new Set([
            ...detection.signals,
            ...responseDetection.signals,
          ]),
        );

        // Update conversation score
        const existing = getConversation(sessionId);
        const newScore = (existing?.leadScore ?? 0) + detection.score;
        upsertConversation(sessionId, {
          leadScore: newScore,
          detectedSignals: allSignals,
        });

        // CRM escalation when lead score threshold reached
        if (detection.shouldEscalate) {
          createLeadInOdoo({
            source: "contact",
            message: userMessage,
            locale,
            meta: {
              sessionId,
              leadScore: newScore,
              signals: allSignals,
              ragChunks: chunkCount,
              inputTokens: usage.input_tokens,
              cachedTokens: usage.cache_read_input_tokens ?? 0,
              outputTokens: usage.output_tokens,
              latencyMs: totalMs,
            },
          }).catch(console.error);
        }

        // Persist monitoring event to Supabase if configured
        if (process.env.SUPABASE_URL) {
          const { supabase } = await import("@/lib/rag/supabase-client");
          void supabase
            .from("monitoring_events")
            .insert({
              event_type: "chat_turn",
              session_id: sessionId,
              input_tokens: usage.input_tokens,
              cached_input_tokens: usage.cache_read_input_tokens ?? 0,
              output_tokens: usage.output_tokens,
              rag_chunks_retrieved: chunkCount,
              rag_retrieval_ms: ragMs,
              total_latency_ms: totalMs,
              locale,
              lead_score: newScore,
            });
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              done: true,
              sessionId,
              cached: usage.cache_read_input_tokens ?? 0,
              inputTokens: usage.input_tokens,
            })}\n\n`,
          ),
        );
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Session-Id": sessionId,
    },
  });
}
