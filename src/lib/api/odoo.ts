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
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({})) as { id?: number };
        return { id: data.id ?? Math.floor(Math.random() * 1_000_000) };
      }

      console.warn("[Odoo] Webhook returned non-OK status:", res.status);
    } catch (err) {
      console.error("[Odoo] Webhook error:", err);
    }
  } else {
    // Dev mode: just log
    console.log("[Odoo] Lead payload (set N8N_WEBHOOK_URL to send for real):", payload);
  }

  return { id: Math.floor(Math.random() * 1_000_000) };
}
