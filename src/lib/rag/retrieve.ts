import Anthropic from "@anthropic-ai/sdk";
import { embedText } from "./embeddings";
import { getSupabase } from "./supabase-client";

// Lazy — only instantiated when actually called, avoids crash if key absent
let _anthropic: Anthropic | null = null;
function getAnthropic(): Anthropic {
  if (!_anthropic) _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });
  return _anthropic;
}

/**
 * HyDE — Hypothetical Document Embeddings.
 *
 * Generates a short hypothetical answer to the user query using claude-haiku
 * (cheap and fast), then embeds THAT instead of the raw query.
 * Result: the embedding lands much closer to real knowledge chunks in vector space.
 */
async function hydeExpand(query: string): Promise<string> {
  try {
    const msg = await getAnthropic().messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Write a 1-2 sentence technical answer about EPM fuel additives for this question: "${query}"`,
        },
      ],
    });
    const block = msg.content[0];
    return block.type === "text" ? block.text : query;
  } catch {
    return query; // Fallback to original query on error
  }
}

type ChunkRow = {
  id: string;
  content: string;
  document_id: string;
};

/**
 * Retrieve the top-K most relevant knowledge chunks for a query.
 *
 * Pipeline:
 *  1. HyDE: expand query with hypothetical answer (Haiku, cheap)
 *  2. Hybrid search: call the SQL hybrid_search() function (semantic + FTS + RRF)
 *  3. Return joined chunk texts as a single string for system prompt injection
 */
export async function retrieveContext(
  query: string,
  topK = 5,
): Promise<{ context: string; chunkCount: number }> {
  if (!process.env.SUPABASE_URL || !process.env.OPENAI_API_KEY) {
    // RAG not configured — return empty context, agent will use system prompt alone
    return { context: "", chunkCount: 0 };
  }

  try {
    const db = getSupabase();
    if (!db) return { context: "", chunkCount: 0 };

    const hydeAnswer = await hydeExpand(query);
    const embedding = await embedText(hydeAnswer);

    const { data, error } = await db.rpc("hybrid_search", {
      query_embedding: embedding,
      query_text: query,
      match_count: topK,
    }) as { data: ChunkRow[] | null; error: unknown };

    if (error || !data || data.length === 0) {
      return { context: "", chunkCount: 0 };
    }

    const context = data
      .map((chunk, i) => `[${i + 1}] ${chunk.content}`)
      .join("\n\n");

    return { context, chunkCount: data.length };
  } catch {
    return { context: "", chunkCount: 0 };
  }
}
