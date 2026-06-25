// Centralized WhatsApp lead routing — destination URL is not exposed in UI.
const WA_URL = "https://wa.me/message/4ARTFQUNTGHJO1";

export type WAField = { label: string; value: string };
export type WAType = "roadmap" | "strategy" | "assessment" | "roi" | "contact" | "quote";
export type WAPayload = { type: WAType; fields: WAField[] };

type WindowWithDataLayer = Window & { dataLayer?: Array<Record<string, unknown>> };

export function trackCta(event: string, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const data = { ...detail, event, ts: Date.now() };
    window.dispatchEvent(new CustomEvent("yai:cta_click", { detail: data }));
    const w = window as WindowWithDataLayer;
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ ...data, event: "cta_click" });
  } catch {
    /* analytics is best-effort */
  }
}

export function openWhatsApp(payload?: WAPayload) {
  if (typeof window === "undefined") return;
  trackCta("whatsapp_open", { type: payload?.type });
  // Build a prefilled WhatsApp deep-link with the structured summary.
  // The destination URL is constructed in JS so it is never rendered in the DOM.
  let url = WA_URL;
  if (payload) {
    const text = formatWhatsAppMessage(payload);
    if (text) url = `${WA_URL}?text=${encodeURIComponent(text)}`;
  }
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (w) w.opener = null;
}

export function formatSummary(payload: WAPayload): string {
  return payload.fields
    .filter((f) => f.value && String(f.value).trim().length > 0)
    .map((f) => `${f.label}: ${f.value}`)
    .join("\n");
}

// Full WhatsApp message: branded header + structured summary.
export function formatWhatsAppMessage(payload: WAPayload): string {
  const header = "You AI — New Lead";
  const body = formatSummary(payload);
  return `${header}\n\n${body}`;
}
