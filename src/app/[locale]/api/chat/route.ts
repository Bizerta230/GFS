import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const message: string =
    typeof body?.message === "string" ? body.message : "";
  const locale: string =
    typeof body?.locale === "string" ? body.locale : "en";

  if (!message.trim()) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 },
    );
  }

  // Placeholder response that imitates a Claude-backed chatbot.
  const reply =
    "Thank you for your question. This is a placeholder response. " +
    "The production version will connect to the Claude API with the full GFS EPM system prompt " +
    "and log this interaction into the CRM. " +
    `Detected locale: ${locale}.`;

  return NextResponse.json({
    reply,
  });
}

