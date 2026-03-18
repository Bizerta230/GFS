import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type CalculatorResultsProps = {
  refineryCapacityBpd: number;
  currentAdditiveCostPerBbl: number;
  epmCostPerBbl: number;
};

export function CalculatorResults({
  refineryCapacityBpd,
  currentAdditiveCostPerBbl,
  epmCostPerBbl,
}: CalculatorResultsProps) {
  const dailyCurrentCost = refineryCapacityBpd * currentAdditiveCostPerBbl;
  const dailyEpmCost = refineryCapacityBpd * epmCostPerBbl;
  const dailySavings = Math.max(dailyCurrentCost - dailyEpmCost, 0);

  const chartData = [
    { name: "Current", value: dailyCurrentCost },
    { name: "EPM", value: dailyEpmCost },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Daily additive spend
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-50">
          ${dailyEpmCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
          <span className="text-sm font-normal text-slate-400">
            vs ${dailyCurrentCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Approximate savings:{" "}
          <span className="font-semibold text-secondary">
            ${dailySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day
          </span>
          .
        </p>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderColor: "#1f2937",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value: number) =>
                `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day`
              }
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#c4973b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-slate-500">
        This is a simplified estimate based on additive cost only. Full ROI will also account for
        combustion efficiency, emissions, and operational savings.
      </p>
    </div>
  );
}

