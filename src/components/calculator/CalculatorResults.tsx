"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CalculatorValues } from "./CalculatorForm";

type CalculatorResultsProps = CalculatorValues & {
  runId?: string;
};

export function CalculatorResults({
  refineryCapacityBpd,
  currentAdditiveCostPerBbl,
  epmCostPerBbl,
  fuelType,
  sulfurContentPpm,
  currentHdsCostBbl,
  emissionsComplianceAnnual,
  operatingDaysYear,
  runId,
}: CalculatorResultsProps) {
  const [feedback, setFeedback] = useState<"idle" | "sending" | "done">("idle");
  const [actualInput, setActualInput] = useState("");

  // ── Core additive savings ──────────────────────────────────────
  const dailyCurrentCost = refineryCapacityBpd * currentAdditiveCostPerBbl;
  const dailyEpmCost = refineryCapacityBpd * epmCostPerBbl;
  const dailyAdditiveSavings = Math.max(dailyCurrentCost - dailyEpmCost, 0);

  // ── HDS load reduction savings ────────────────────────────────
  // EPM reduces HDS load by 30–40%; use 35% midpoint
  const hdsDailySavings =
    currentHdsCostBbl && currentHdsCostBbl > 0
      ? refineryCapacityBpd * currentHdsCostBbl * 0.35
      : 0;

  // ── Emissions compliance savings (annual → daily) ─────────────
  const emissionsDailySavings =
    emissionsComplianceAnnual && emissionsComplianceAnnual > 0
      ? emissionsComplianceAnnual / (operatingDaysYear ?? 330)
      : 0;

  // ── Totals ─────────────────────────────────────────────────────
  const totalDailySavings =
    dailyAdditiveSavings + hdsDailySavings + emissionsDailySavings;
  const annualSavings = totalDailySavings * (operatingDaysYear ?? 330);

  // ── Payback period (approximate: pilot = first 30 days) ───────
  // Assume implementation cost ≈ 1 month of EPM spend
  const implementationCost = dailyEpmCost * 30;
  const paybackMonths =
    totalDailySavings > 0
      ? implementationCost / (totalDailySavings * 30)
      : null;

  // ── Desulfurization benefit estimate ─────────────────────────
  const sulfurReductionPpm =
    sulfurContentPpm > 0 ? Math.round(sulfurContentPpm * 0.35) : null;

  const fmt = (n: number) =>
    "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const chartData = [
    { name: "Additives", current: dailyCurrentCost, epm: dailyEpmCost },
    ...(hdsDailySavings > 0
      ? [{ name: "HDS reduction", current: hdsDailySavings / 0.35, epm: hdsDailySavings / 0.35 - hdsDailySavings }]
      : []),
  ];

  async function submitFeedback(confirmed: boolean) {
    if (!runId || feedback !== "idle") return;
    setFeedback("sending");

    try {
      await fetch("/api/calculator/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId,
          confirmedAccurate: confirmed,
          actualSavingsPerDay: actualInput ? Number(actualInput) : undefined,
          refineryCapacityBpd,
          fuelType,
        }),
      });
      setFeedback("done");
    } catch {
      setFeedback("done");
    }
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100">
      {/* Daily savings headline */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Estimated daily savings
        </p>
        <p className="mt-1 text-3xl font-bold text-secondary">
          {fmt(totalDailySavings)}
          <span className="text-base font-normal text-slate-400">/day</span>
        </p>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Annual savings</p>
          <p className="mt-0.5 text-lg font-semibold text-green-400">{fmt(annualSavings)}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Payback period</p>
          <p className="mt-0.5 text-lg font-semibold text-slate-100">
            {paybackMonths != null
              ? paybackMonths < 1
                ? "< 1 month"
                : `~${paybackMonths.toFixed(1)} months`
              : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Additive savings/day</p>
          <p className="mt-0.5 text-base font-semibold text-slate-100">
            {fmt(dailyAdditiveSavings)}
          </p>
        </div>
        {sulfurReductionPpm && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Est. sulfur reduction</p>
            <p className="mt-0.5 text-base font-semibold text-blue-400">
              −{sulfurReductionPpm.toLocaleString()} ppm
            </p>
          </div>
        )}
      </div>

      {/* Bar chart */}
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) =>
                v >= 1_000_000
                  ? `$${(v / 1_000_000).toFixed(1)}M`
                  : `$${(v / 1_000).toFixed(0)}K`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderColor: "#1f2937",
                borderRadius: 8,
                fontSize: 11,
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => fmt(Number(value)) + "/day"}
            />
            <Bar dataKey="current" name="Current" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="epm" name="With EPM" fill="#c4973b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feedback widget — self-learning */}
      {runId && feedback === "idle" && (
        <div className="space-y-2 rounded-xl border border-slate-700/50 bg-slate-900/30 p-3">
          <p className="text-[11px] text-slate-400">
            Does this estimate match your operation?
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void submitFeedback(true)}
              className="rounded-full border border-green-700/40 bg-green-900/20 px-3 py-1 text-[11px] text-green-400 transition hover:bg-green-900/40"
            >
              Yes, looks right
            </button>
            <button
              type="button"
              onClick={() => {
                // Show the actual savings input first
                const el = document.getElementById("actualSavingsInput");
                if (el) el.focus();
              }}
              className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-[11px] text-slate-400 transition hover:bg-slate-800"
            >
              No, actual is closer to…
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="actualSavingsInput"
              type="number"
              min={0}
              value={actualInput}
              onChange={(e) => setActualInput(e.target.value)}
              placeholder="Actual savings $/day"
              className="w-40 rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-xs text-slate-50 outline-none focus:border-secondary"
            />
            {actualInput && (
              <button
                type="button"
                onClick={() => void submitFeedback(false)}
                className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-slate-950"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      {feedback === "sending" && (
        <p className="text-[11px] text-slate-500">Saving your feedback…</p>
      )}
      {feedback === "done" && (
        <p className="text-[11px] text-green-500">
          Thank you — your data helps improve future estimates.
        </p>
      )}

      <p className="text-[11px] text-slate-500">
        Estimates based on additive cost, partial HDS reduction, and emissions compliance.
        All EPM performance data is preliminary. Results may vary.
      </p>
    </div>
  );
}
