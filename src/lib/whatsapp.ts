// Centralized WhatsApp lead routing — destination URL is not exposed in UI.
const WA_SHORT_URL = "https://wa.me/message/4ARTFQUNTGHJO1";
const WA_MESSAGE_URL = "https://api.whatsapp.com/message/4ARTFQUNTGHJO1";

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
  // Use the direct WhatsApp endpoint because wa.me/message redirects drop text params.
  let url = WA_SHORT_URL;
  if (payload) {
    const text = formatWhatsAppMessage(payload);
    if (text) {
      const params = new URLSearchParams({ text, autoload: "1", app_absent: "0" });
      url = `${WA_MESSAGE_URL}?${params.toString()}`;
    }
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
  const header = payload.type === "roadmap" || payload.type === "strategy"
    ? "🚀 New Lead From You AI Website"
    : "🚀 New Inquiry From You AI Website";
  const body = payload.fields
    .map((f) => `${f.label}:\n${String(f.value ?? "").trim() || "—"}`)
    .join("\n\n");
  return `${header}\n\n${body}`;
}
