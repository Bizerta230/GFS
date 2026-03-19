export type LeadPayload = {
  source: "contact" | "pilot" | "demo" | "calculator";
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  locale?: string;
  meta?: Record<string, unknown>;
};

export async function createLeadInOdoo(payload: LeadPayload) {
  // Placeholder: in production this will call Odoo's API (or n8n webhook).
  // For now we just log the payload server-side.
  console.log("[Odoo] Lead payload", payload);

  // Simulate created lead id.
  return { id: Math.floor(Math.random() * 1_000_000) };
}

