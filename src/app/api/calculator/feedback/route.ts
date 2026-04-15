import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    runId: string;
    confirmedAccurate: boolean;
    actualSavingsPerDay?: number;
    refineryCapacityBpd?: number;
    fuelType?: string;
  } | null;

  if (!body?.runId) {
    return NextResponse.json({ error: "runId is required" }, { status: 400 });
  }

  if (!process.env.SUPABASE_URL) {
    return NextResponse.json({ ok: true, learned: false });
  }

  try {
    const { supabase } = await import("@/lib/rag/supabase-client");

    // Update the run with user feedback
    await supabase
      .from("calculator_runs")
      .update({
        confirmed_accurate: body.confirmedAccurate,
        actual_savings_per_day: body.actualSavingsPerDay ?? null,
      })
      .eq("id", body.runId);

    // Self-learning: if the user confirmed accuracy, add to knowledge base
    if (body.confirmedAccurate && body.refineryCapacityBpd) {
      const savings = body.actualSavingsPerDay ?? null;
      const capacity = body.refineryCapacityBpd.toLocaleString();
      const fuel = body.fuelType ?? "crude";
      const savingsText = savings
        ? `confirmed approximately $${savings.toLocaleString()} per day in savings with EPM`
        : "confirmed that the EPM ROI estimate was accurate for their operation";

      const knowledgeContent = `Real-world EPM case study: A refinery processing ${capacity} barrels per day of ${fuel.replace("_", " ")} crude ${savingsText}. This data was confirmed directly by the facility operator through the GFS ROI calculator.`;

      // Ingest as a new knowledge document
      const { data: docRow } = await supabase
        .from("knowledge_documents")
        .insert({
          title: `Confirmed Case Study: ${capacity} bbl/day ${fuel}`,
          source: "calculator_result",
          locale: "en",
          content: knowledgeContent,
          metadata: {
            runId: body.runId,
            refineryCapacityBpd: body.refineryCapacityBpd,
            fuelType: body.fuelType,
            confirmedSavings: body.actualSavingsPerDay,
          },
        })
        .select("id")
        .single();

      if (docRow) {
        // Update the run to reference the created knowledge document
        await supabase
          .from("calculator_runs")
          .update({ knowledge_doc_id: docRow.id })
          .eq("id", body.runId);

        // Embed and store the chunk so RAG can find it
        if (process.env.OPENAI_API_KEY) {
          const { embedText } = await import("@/lib/rag/embeddings");
          const embedding = await embedText(knowledgeContent);

          await supabase.from("knowledge_chunks").insert({
            document_id: docRow.id,
            chunk_index: 0,
            content: knowledgeContent,
            token_count: Math.ceil(knowledgeContent.length / 4),
            embedding,
          });
        }

        return NextResponse.json({ ok: true, learned: true, docId: docRow.id });
      }
    }

    return NextResponse.json({ ok: true, learned: false });
  } catch (err) {
    console.error("[Calculator Feedback]", err);
    return NextResponse.json({ ok: true, learned: false });
  }
}
