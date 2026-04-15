import {
  type LeadSignal,
  calculateLeadScore,
} from "@/lib/lead-scoring";

const SIGNAL_PATTERNS: Array<{ signal: LeadSignal; patterns: RegExp[] }> = [
  {
    signal: "chats_technical",
    patterns: [
      /\b(demulsif|desulfur|combustion|emission|biocide|corrosion|HDS|NOx|SO2|SO₂|viscosity|API gravity)\b/i,
    ],
  },
  {
    signal: "asks_pricing",
    patterns: [
      /\b(price|pricing|cost|how much|per barrel|USD|rate|quote|fee|tariff)\b/i,
    ],
  },
  {
    signal: "asks_pilot",
    patterns: [
      /\b(pilot|trial|test|proof.of.concept|POC|demo|demonstration|sample|evaluate|evaluation)\b/i,
    ],
  },
  {
    signal: "mentions_refinery",
    patterns: [
      /\b(refinery|refiner|bpd|bbl\/day|barrels per day|throughput|crude unit|CDU|VDU)\b/i,
      /\b(our (plant|facility|operation|site|refinery)|we process|our throughput)\b/i,
    ],
  },
  {
    signal: "uses_calculator",
    patterns: [
      /\b(calculat|ROI|return on investment|savings|payback|annual savings|breakeven)\b/i,
    ],
  },
  {
    signal: "provides_email",
    patterns: [/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/],
  },
];

export type LeadDetectionResult = {
  signals: LeadSignal[];
  score: number;
  shouldEscalate: boolean;
};

/**
 * Scan a message for lead intent signals.
 * Returns signals found, total score, and whether to trigger CRM escalation.
 */
export function detectLeadSignals(message: string): LeadDetectionResult {
  const detected = new Set<LeadSignal>();

  for (const { signal, patterns } of SIGNAL_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        detected.add(signal);
        break;
      }
    }
  }

  const signals = Array.from(detected);
  const score = calculateLeadScore(signals);

  return {
    signals,
    score,
    shouldEscalate: score >= 45, // asks_pilot(35) + chats_technical(15) alone triggers it
  };
}
