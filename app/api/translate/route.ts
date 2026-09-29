import { NextResponse } from "next/server";

const SYSTEM = `You are the Nuralhadith Translation Engine. Translate Hadith, Qur'an and authentic Islamic texts with maximum fidelity. Accuracy of meaning comes before fluency. Preserve Islamic terminology where appropriate. For Hadith, preserve Isnad and Matn structure when present. Never invent, omit, add opinions, weak narrations, or cultural interpretations. Distinguish source text from explanation. The requested mode controls style: literal = close to wording; meaning = natural but faithful; scholarly = faithful translation plus only brief necessary clarifying notes. Return JSON only with keys translation and notes. notes must be an array of short strings and only contain necessary clarifications about genuine ambiguity or terminology. Do not fabricate citations.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const source = typeof body.source === "string" ? body.source : "auto";
    const target = typeof body.target === "string" ? body.target : "en";
    const mode = typeof body.mode === "string" ? body.mode : "meaning";
    if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
    if (text.length > 30000) return NextResponse.json({ error: "Please translate a shorter passage (30,000 characters maximum)." }, { status: 413 });
    const key = process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ error: "Translation engine is not configured yet. Add OPENAI_API_KEY to the Vercel environment variables." }, { status: 503 });

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_TRANSLATION_MODEL || "gpt-5-mini",
        input: [
          { role: "system", content: [{ type: "input_text", text: SYSTEM }] },
          { role: "user", content: [{ type: "input_text", text: `Source language: ${source}\nTarget language: ${target}\nTranslation mode: ${mode}\n\nSOURCE TEXT:\n${text}` }] }
        ],
        text: { format: { type: "json_schema", name: "nuralhadith_translation", strict: true, schema: { type: "object", properties: { translation: { type: "string" }, notes: { type: "array", items: { type: "string" } } }, required: ["translation","notes"], additionalProperties: false } } }
      })
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI translation error", detail);
      return NextResponse.json({ error: "The translation service could not complete this request." }, { status: 502 });
    }
    const data = await response.json();
    const output = data.output?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || []).find((item: { type?: string }) => item.type === "output_text")?.text;
    if (!output) return NextResponse.json({ error: "No translation was returned." }, { status: 502 });
    const parsed = JSON.parse(output);
    return NextResponse.json({ translation: parsed.translation, notes: parsed.notes || [] });
  } catch {
    return NextResponse.json({ error: "Invalid translation request." }, { status: 400 });
  }
}
