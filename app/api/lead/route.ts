import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead handler (PRD §8).
 *
 * Validates with the shared schema, drops honeypot hits, rate limits by IP,
 * then forwards to whatever `LEAD_WEBHOOK_URL` points at (CRM, Zapier, email
 * service). No provider is hardcoded and no secret reaches the client bundle.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

/** In-memory rate limit. Adequate for a single-instance deploy; swap for Upstash
 *  / Vercel KV if the app is ever scaled to multiple instances. */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { message: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { website, ...lead } = parsed.data;

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (website) return NextResponse.json({ ok: true }, { status: 200 });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Unconfigured is a deployment problem, not a visitor problem: log loudly
    // but never drop the lead silently on the floor.
    console.error("[lead] LEAD_WEBHOOK_URL is not set. Lead received but not forwarded:", lead.email);
    return NextResponse.json(
      { message: "We could not submit your details right now. Please email us directly." },
      { status: 503 },
    );
  }

  try {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "landing-page",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!forwarded.ok) {
      console.error("[lead] Webhook rejected the lead:", forwarded.status, await forwarded.text());
      return NextResponse.json(
        { message: "We could not submit your details right now. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[lead] Webhook request failed:", error);
    return NextResponse.json(
      { message: "We could not submit your details right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
