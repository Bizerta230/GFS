import OpenAI from "openai";

// Lazy singleton — avoids crashing at module load time when key is absent
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "placeholder" });
  }
  return _openai;
}

// In-process cache: avoids re-embedding identical strings within the same process lifetime.
const embeddingCache = new Map<string, number[]>();

/**
 * Embed a single text string using text-embedding-3-small (1536 dimensions).
 * Cost: $0.02 / 1M tokens — cheapest option with excellent quality.
 */
export async function embedText(text: string): Promise<number[]> {
  const cached = embeddingCache.get(text);
  if (cached) return cached;

  const res = await getOpenAI().embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  const embedding = res.data[0].embedding;
  embeddingCache.set(text, embedding);
  return embedding;
}

/**
 * Embed multiple texts in a single API call (up to 100 per batch).
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const results: number[][] = new Array(texts.length);
  const toEmbed: Array<{ index: number; text: string }> = [];

  for (let i = 0; i < texts.length; i++) {
    const cached = embeddingCache.get(texts[i]);
    if (cached) {
      results[i] = cached;
    } else {
      toEmbed.push({ index: i, text: texts[i] });
    }
  }

  // Process in batches of 100
  for (let start = 0; start < toEmbed.length; start += 100) {
    const batch = toEmbed.slice(start, start + 100);
    const res = await getOpenAI().embeddings.create({
      model: "text-embedding-3-small",
      input: batch.map((b) => b.text),
    });

    for (let j = 0; j < batch.length; j++) {
      const embedding = res.data[j].embedding;
      embeddingCache.set(batch[j].text, embedding);
      results[batch[j].index] = embedding;
    }
  }

  return results;
}
