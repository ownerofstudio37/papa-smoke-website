import { NextResponse } from "next/server";
import { generateAiDraft, type DraftType } from "@/lib/ai-drafts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = String(body.topic || "").trim();
    const type = String(body.type || "blog") as DraftType;

    if (!topic) {
      return NextResponse.json({ error: "Enter a topic first." }, { status: 400 });
    }

    if (type !== "blog" && type !== "page") {
      return NextResponse.json({ error: "Invalid draft type." }, { status: 400 });
    }

    const draft = await generateAiDraft(topic, type);
    return NextResponse.json({ draft });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate a draft right now." },
      { status: 500 },
    );
  }
}
