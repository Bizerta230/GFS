"use client";

import { useState } from "react";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";

export default function CalculatorPage() {
  const [values, setValues] = useState<{
    refineryCapacityBpd: number;
    currentAdditiveCostPerBbl: number;
    epmCostPerBbl: number;
  } | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          EPM ROI Calculator (Simplified)
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Enter your refinery throughput and current additive costs to get a first-pass estimate of
          daily savings from consolidating into EPM. Later stages will extend this with
          multi-parameter logic and PDF reporting.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <CalculatorForm onCalculate={setValues} />
        {values ? (
          <CalculatorResults {...values} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
            Fill in the form to see estimated daily additive spend and savings.
          </div>
        )}
      </div>
    </div>
  );
}

