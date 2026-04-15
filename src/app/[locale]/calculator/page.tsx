"use client";

import { useState } from "react";
import { CalculatorForm, type CalculatorValues } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";

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

export default function CalculatorPage() {
  const [values, setValues] = useState<CalculatorValues | null>(null);
  const [runId, setRunId] = useState<string | undefined>();

  async function handleCalculate(v: CalculatorValues) {
    setValues(v);

    const dailyCurrentCost = v.refineryCapacityBpd * v.currentAdditiveCostPerBbl;
    const dailyEpmCost = v.refineryCapacityBpd * v.epmCostPerBbl;
    const dailyAdditiveSavings = Math.max(dailyCurrentCost - dailyEpmCost, 0);
    const hdsDailySavings = v.currentHdsCostBbl
      ? v.refineryCapacityBpd * v.currentHdsCostBbl * 0.35
      : 0;
    const emissionsDailySavings = v.emissionsComplianceAnnual
      ? v.emissionsComplianceAnnual / (v.operatingDaysYear ?? 330)
      : 0;
    const totalDailySavings = dailyAdditiveSavings + hdsDailySavings + emissionsDailySavings;
    const annualSavings = totalDailySavings * (v.operatingDaysYear ?? 330);

    const implementationCost = dailyEpmCost * 30;
    const paybackMonths = totalDailySavings > 0
      ? implementationCost / (totalDailySavings * 30)
      : undefined;

    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          refineryCapacityBpd: v.refineryCapacityBpd,
          currentAdditiveCostBbl: v.currentAdditiveCostPerBbl,
          epmCostBbl: v.epmCostPerBbl,
          fuelType: v.fuelType,
          sulfurContentPpm: v.sulfurContentPpm,
          currentHdsCostBbl: v.currentHdsCostBbl,
          emissionsComplianceAnnual: v.emissionsComplianceAnnual,
          operatingDaysYear: v.operatingDaysYear,
          dailySavings: totalDailySavings,
          annualSavings,
          paybackMonths,
          locale: typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "en",
        }),
      });
      const data = await res.json() as { runId?: string };
      if (data.runId) setRunId(data.runId);
    } catch {
      // Non-critical — calculator still shows results without persistence
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          EPM ROI Calculator
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Enter your refinery parameters to estimate daily and annual savings from
          switching to EPM. Confirmed results contribute to our real-world case study database.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <CalculatorForm onCalculate={(v) => void handleCalculate(v)} />
        {values ? (
          <CalculatorResults {...values} runId={runId} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            Fill in the form to see estimated savings.
          </div>
        )}
      </div>
    </div>
  );
}
