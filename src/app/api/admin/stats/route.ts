import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Simple secret-based auth — set ADMIN_SECRET in .env.local
  const secret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_URL) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { supabase } = await import("@/lib/rag/supabase-client");

  // Run all queries in parallel
  const [chatsResult, calcResult, monitorResult, learnedResult] =
    await Promise.all([
      // Total conversations and average lead score
      supabase
        .from("chat_conversations")
        .select("lead_score, locale, created_at")
        .order("created_at", { ascending: false })
        .limit(1000),

      // Calculator runs and confirmed accuracy rate
      supabase
        .from("calculator_runs")
        .select("confirmed_accurate, fuel_type, daily_savings, created_at")
        .order("created_at", { ascending: false })
        .limit(1000),

      // Last 100 monitoring events
      supabase
        .from("monitoring_events")
        .select(
          "input_tokens, cached_input_tokens, output_tokens, rag_chunks_retrieved, total_latency_ms, locale",
        )
        .order("created_at", { ascending: false })
        .limit(100),

      // Self-learned knowledge documents
      supabase
        .from("knowledge_documents")
        .select("source, title, created_at")
        .eq("source", "calculator_result"),
    ]);

  const conversations = chatsResult.data ?? [];
  const calcRuns = calcResult.data ?? [];
  const events = monitorResult.data ?? [];
  const learned = learnedResult.data ?? [];

  // Cache hit rate
  const totalInput = events.reduce((s, e) => s + (e.input_tokens ?? 0), 0);
  const totalCached = events.reduce((s, e) => s + (e.cached_input_tokens ?? 0), 0);
  const cacheHitRate =
    totalInput > 0 ? Math.round((totalCached / totalInput) * 100) : 0;

  // Average latency
  const latencies = events
    .map((e) => e.total_latency_ms)
    .filter(Boolean) as number[];
  const avgLatencyMs =
    latencies.length > 0
      ? Math.round(latencies.reduce((s, v) => s + v, 0) / latencies.length)
      : null;

  // Lead score distribution
  const avgLeadScore =
    conversations.length > 0
      ? Math.round(
          conversations.reduce((s, c) => s + (c.lead_score ?? 0), 0) /
            conversations.length,
        )
      : 0;
  const highIntentCount = conversations.filter(
    (c) => (c.lead_score ?? 0) >= 45,
  ).length;

  // Calculator stats
  const confirmed = calcRuns.filter((r) => r.confirmed_accurate === true).length;
  const confirmRate =
    calcRuns.length > 0
      ? Math.round((confirmed / calcRuns.length) * 100)
      : 0;

  return NextResponse.json({
    overview: {
      totalConversations: conversations.length,
      avgLeadScore,
      highIntentLeads: highIntentCount,
      totalCalculatorRuns: calcRuns.length,
      confirmedAccurateRate: `${confirmRate}%`,
      selfLearnedDocuments: learned.length,
    },
    performance: {
      cacheHitRate: `${cacheHitRate}%`,
      avgLatencyMs,
      sampleSize: events.length,
      totalInputTokens: totalInput,
      totalCachedTokens: totalCached,
    },
    recentLearned: learned.slice(0, 5).map((d) => ({
      title: d.title,
      createdAt: d.created_at,
    })),
  });
}
