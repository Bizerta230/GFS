import type { Usage } from "@anthropic-ai/sdk/resources/messages";

export type CacheStats = {
  inputTokens: number;
  cachedInputTokens: number;
  cacheCreationTokens: number;
  outputTokens: number;
  cacheHitRate: number;        // 0–1
  estimatedCostUsd: number;
  estimatedSavingsUsd: number;
};

// Claude Sonnet 4.5 pricing (USD per 1M tokens)
const PRICE = {
  inputPerM: 3.0,
  cacheWritePerM: 3.75,  // 25% premium on first write
  cacheReadPerM: 0.30,   // 90% discount on cache hit
  outputPerM: 15.0,
};

/**
 * Extract cache statistics from an Anthropic API usage object and
 * compute the effective cost vs. the uncached baseline.
 */
export function extractCacheStats(usage: Usage): CacheStats {
  const inputTokens = usage.input_tokens;
  const cachedInputTokens = (usage as Usage & { cache_read_input_tokens?: number }).cache_read_input_tokens ?? 0;
  const cacheCreationTokens = (usage as Usage & { cache_creation_input_tokens?: number }).cache_creation_input_tokens ?? 0;
  const outputTokens = usage.output_tokens;

  const uncachedInput = inputTokens - cachedInputTokens - cacheCreationTokens;
  const cacheHitRate =
    inputTokens > 0 ? cachedInputTokens / inputTokens : 0;

  // Actual cost
  const estimatedCostUsd =
    (uncachedInput / 1_000_000) * PRICE.inputPerM +
    (cacheCreationTokens / 1_000_000) * PRICE.cacheWritePerM +
    (cachedInputTokens / 1_000_000) * PRICE.cacheReadPerM +
    (outputTokens / 1_000_000) * PRICE.outputPerM;

  // What it would have cost without caching
  const baselineCostUsd =
    (inputTokens / 1_000_000) * PRICE.inputPerM +
    (outputTokens / 1_000_000) * PRICE.outputPerM;

  const estimatedSavingsUsd = Math.max(baselineCostUsd - estimatedCostUsd, 0);

  return {
    inputTokens,
    cachedInputTokens,
    cacheCreationTokens,
    outputTokens,
    cacheHitRate,
    estimatedCostUsd,
    estimatedSavingsUsd,
  };
}
