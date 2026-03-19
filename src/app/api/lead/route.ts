import { NextResponse } from "next/server";
import { createLeadInOdoo, type LeadPayload } from "@/lib/api/odoo";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | (LeadPayload & { source: LeadPayload["source"] })
    | null;

  if (!body?.source) {
    return NextResponse.json(
      { error: "Source is required" },
      { status: 400 },
    );
  }

  // In a full implementation we would:
  // - validate fields
  // - enrich data
  // - push via n8n to Odoo CRM
  const lead = await createLeadInOdoo(body);

  return NextResponse.json({ ok: true, leadId: lead.id });
}

