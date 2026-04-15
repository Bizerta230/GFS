import { NextResponse } from "next/server";

export type CalculatorRunPayload = {
  sessionId?: string;
  refineryCapacityBpd: number;
  currentAdditiveCostBbl: number;
  epmCostBbl: number;
  fuelType?: "light_sweet" | "medium_sour" | "heavy_sour";
  sulfurContentPpm?: number;
  currentHdsCostBbl?: number;
  emissionsComplianceAnnual?: number;
  operatingDaysYear?: number;
  dailySavings: number;
  annualSavings: number;
  paybackMonths?: number;
  locale?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CalculatorRunPayload | null;

  if (!body || !body.refineryCapacityBpd || !body.currentAdditiveCostBbl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.SUPABASE_URL) {
    // Supabase not configured — return a mock run ID for dev
    return NextResponse.json({
      ok: true,
      runId: crypto.randomUUID(),
      persisted: false,
    });
  }

  try {
    const { supabase } = await import("@/lib/rag/supabase-client");

    const { data, error } = await supabase
      .from("calculator_runs")
      .insert({
        session_id: body.sessionId,
        refinery_capacity_bpd: body.refineryCapacityBpd,
        current_additive_cost_bbl: body.currentAdditiveCostBbl,
        epm_cost_bbl: body.epmCostBbl,
        fuel_type: body.fuelType,
        sulfur_content_ppm: body.sulfurContentPpm,
        current_hds_cost_bbl: body.currentHdsCostBbl,
        emissions_compliance_annual: body.emissionsComplianceAnnual,
        operating_days_year: body.operatingDaysYear ?? 330,
        daily_savings: body.dailySavings,
        annual_savings: body.annualSavings,
        payback_months: body.paybackMonths,
        inputs_json: body,
        locale: body.locale ?? "en",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[Calculator] DB error:", error);
      return NextResponse.json({ ok: true, runId: crypto.randomUUID(), persisted: false });
    }

    return NextResponse.json({ ok: true, runId: data.id, persisted: true });
  } catch (err) {
    console.error("[Calculator] Unexpected error:", err);
    return NextResponse.json({ ok: true, runId: crypto.randomUUID(), persisted: false });
  }
}
