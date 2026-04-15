"use client";

import { useState } from "react";

export type CalculatorValues = {
  refineryCapacityBpd: number;
  currentAdditiveCostPerBbl: number;
  epmCostPerBbl: number;
  fuelType: "light_sweet" | "medium_sour" | "heavy_sour";
  sulfurContentPpm: number;
  currentHdsCostBbl?: number;
  emissionsComplianceAnnual?: number;
  operatingDaysYear: number;
};

type CalculatorFormProps = {
  onCalculate: (values: CalculatorValues) => void;
};

const BREAKEVEN: Record<string, number> = {
  light_sweet: 1.71,
  medium_sour: 2.81,
  heavy_sour: 4.68,
};

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fuelType, setFuelType] = useState<"light_sweet" | "medium_sour" | "heavy_sour">("medium_sour");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const get = (name: string) => Number(fd.get(name) || 0);
    const getOpt = (name: string) => {
      const v = fd.get(name);
      return v ? Number(v) : undefined;
    };

    // Auto-suggest EPM cost based on fuel type breakeven if not provided
    const epmRaw = getOpt("epmCostPerBbl");
    const epmCostPerBbl =
      epmRaw && epmRaw > 0 ? epmRaw : BREAKEVEN[fuelType] * 0.9;

    onCalculate({
      refineryCapacityBpd: get("refineryCapacityBpd"),
      currentAdditiveCostPerBbl: get("currentAdditiveCostPerBbl"),
      epmCostPerBbl,
      fuelType,
      sulfurContentPpm: get("sulfurContentPpm"),
      currentHdsCostBbl: getOpt("currentHdsCostBbl"),
      emissionsComplianceAnnual: getOpt("emissionsComplianceAnnual"),
      operatingDaysYear: get("operatingDaysYear") || 330,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100"
    >
      {/* Throughput */}
      <div className="space-y-1.5">
        <label htmlFor="refineryCapacityBpd" className="block text-xs font-medium text-slate-200">
          Refinery throughput (bbl/day)
        </label>
        <input
          id="refineryCapacityBpd" name="refineryCapacityBpd"
          type="number" min={0} required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 150000"
        />
      </div>

      {/* Fuel type */}
      <div className="space-y-1.5">
        <label htmlFor="fuelType" className="block text-xs font-medium text-slate-200">
          Crude type
        </label>
        <select
          id="fuelType" name="fuelType"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value as typeof fuelType)}
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 focus:border-secondary focus:ring-2"
        >
          <option value="light_sweet">Light Sweet (breakeven $1.71/bbl)</option>
          <option value="medium_sour">Medium Sour (breakeven $2.81/bbl)</option>
          <option value="heavy_sour">Heavy Sour (breakeven $4.68/bbl)</option>
        </select>
      </div>

      {/* Current additive cost */}
      <div className="space-y-1.5">
        <label htmlFor="currentAdditiveCostPerBbl" className="block text-xs font-medium text-slate-200">
          Current total additive cost (USD/bbl)
        </label>
        <input
          id="currentAdditiveCostPerBbl" name="currentAdditiveCostPerBbl"
          type="number" min={0} step="0.01" required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 3.20 (demulsifiers + corrosion + biocide)"
        />
      </div>

      {/* EPM cost — optional, auto-suggested */}
      <div className="space-y-1.5">
        <label htmlFor="epmCostPerBbl" className="block text-xs font-medium text-slate-200">
          Projected EPM cost (USD/bbl){" "}
          <span className="text-slate-500">
            — leave blank to use breakeven estimate
          </span>
        </label>
        <input
          id="epmCostPerBbl" name="epmCostPerBbl"
          type="number" min={0} step="0.01"
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder={`e.g. ${(BREAKEVEN[fuelType] * 0.9).toFixed(2)}`}
        />
      </div>

      {/* Sulfur content */}
      <div className="space-y-1.5">
        <label htmlFor="sulfurContentPpm" className="block text-xs font-medium text-slate-200">
          Current sulfur content (ppm)
        </label>
        <input
          id="sulfurContentPpm" name="sulfurContentPpm"
          type="number" min={0} required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 5000 (medium sour is typically 3000–10000 ppm)"
        />
      </div>

      {/* Advanced toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
      >
        <span className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}>▶</span>
        Advanced inputs (optional)
      </button>

      {showAdvanced && (
        <div className="space-y-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
          <div className="space-y-1.5">
            <label htmlFor="currentHdsCostBbl" className="block text-xs font-medium text-slate-300">
              Current HDS operating cost (USD/bbl)
            </label>
            <input
              id="currentHdsCostBbl" name="currentHdsCostBbl"
              type="number" min={0} step="0.01"
              className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
              placeholder="e.g. 0.80"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="emissionsComplianceAnnual" className="block text-xs font-medium text-slate-300">
              Annual emissions compliance cost (USD)
            </label>
            <input
              id="emissionsComplianceAnnual" name="emissionsComplianceAnnual"
              type="number" min={0}
              className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
              placeholder="e.g. 500000 (SCR maintenance etc.)"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="operatingDaysYear" className="block text-xs font-medium text-slate-300">
              Operating days per year
            </label>
            <input
              id="operatingDaysYear" name="operatingDaysYear"
              type="number" min={1} max={365} defaultValue={330}
              className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
      >
        Calculate ROI
      </button>
    </form>
  );
}
