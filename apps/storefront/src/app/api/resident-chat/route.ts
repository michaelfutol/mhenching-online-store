import { NextResponse } from "next/server";
import { answerResidentMessage } from "@/lib/resident-attendant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || !("message" in payload) || typeof payload.message !== "string") {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  const message = payload.message.trim();
  if (!message) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  if (message.length > 600) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const reply = answerResidentMessage(message);
  return NextResponse.json(reply, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
