type CalculatorFormProps = {
  onCalculate: (values: {
    refineryCapacityBpd: number;
    currentAdditiveCostPerBbl: number;
    epmCostPerBbl: number;
  }) => void;
};

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  function handleSubmit(formData: FormData) {
    const refineryCapacityBpd = Number(formData.get("refineryCapacityBpd") || 0);
    const currentAdditiveCostPerBbl = Number(
      formData.get("currentAdditiveCostPerBbl") || 0,
    );
    const epmCostPerBbl = Number(formData.get("epmCostPerBbl") || 0);

    onCalculate({
      refineryCapacityBpd,
      currentAdditiveCostPerBbl,
      epmCostPerBbl,
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-100"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="refineryCapacityBpd"
          className="block text-xs font-medium text-slate-200"
        >
          Refinery throughput (bbl/day)
        </label>
        <input
          id="refineryCapacityBpd"
          name="refineryCapacityBpd"
          type="number"
          min={0}
          required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 150000"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="currentAdditiveCostPerBbl"
          className="block text-xs font-medium text-slate-200"
        >
          Current additive cost (USD/bbl)
        </label>
        <input
          id="currentAdditiveCostPerBbl"
          name="currentAdditiveCostPerBbl"
          type="number"
          min={0}
          step="0.01"
          required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 3.20"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="epmCostPerBbl"
          className="block text-xs font-medium text-slate-200"
        >
          Projected EPM cost (USD/bbl)
        </label>
        <input
          id="epmCostPerBbl"
          name="epmCostPerBbl"
          type="number"
          min={0}
          step="0.01"
          required
          className="w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-secondary/40 placeholder:text-slate-500 focus:border-secondary focus:ring-2"
          placeholder="e.g. 2.40"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-secondary/90"
      >
        Calculate ROI
      </button>
    </form>
  );
}

