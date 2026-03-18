export type LeadSignal =
  | "visits_technology_page"
  | "uses_calculator"
  | "downloads_white_paper"
  | "chats_technical"
  | "provides_email"
  | "mentions_refinery"
  | "asks_pilot"
  | "asks_pricing"
  | "returns_site"
  | "opens_email";

const scores: Record<LeadSignal, number> = {
  visits_technology_page: 5,
  uses_calculator: 20,
  downloads_white_paper: 15,
  chats_technical: 15,
  provides_email: 20,
  mentions_refinery: 30,
  asks_pilot: 35,
  asks_pricing: 25,
  returns_site: 10,
  opens_email: 5,
};

export function calculateLeadScore(signals: LeadSignal[]): number {
  return signals.reduce((total, signal) => total + (scores[signal] ?? 0), 0);
}

