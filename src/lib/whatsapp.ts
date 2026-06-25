// Centralized WhatsApp lead routing.
// Use the direct recipient number so every submission can carry a dynamic text payload.
const WA_PHONE_NUMBER = "201038290203";

export type WAField = { label: string; value: string };
export type WAType = "roadmap" | "strategy" | "assessment" | "roi" | "contact" | "quote";
export type WAPayload = { type: WAType; fields: WAField[] };
export type WhatsAppTarget = "mobile" | "desktop";
export type WhatsAppOpenResult = {
  url: string;
  message: string;
  encodedMessage: string;
  target: WhatsAppTarget;
};

type WindowWithDataLayer = Window & { dataLayer?: Array<Record<string, unknown>> };
type WindowWithWhatsAppDebug = WindowWithDataLayer & {
  __youAiLastWhatsAppUrl?: string;
  __youAiLastWhatsAppMessage?: string;
};

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

export function openWhatsApp(payload: WAPayload): WhatsAppOpenResult | undefined {
  if (typeof window === "undefined") return;
  const result = buildWhatsAppUrl(payload);

  trackCta("whatsapp_open", {
    type: payload.type,
    target: result.target,
    messageLength: result.message.length,
  });

  exposeWhatsAppDebug(result);

  if (result.target === "mobile") {
    const opened = window.open(result.url, "_blank", "noopener,noreferrer");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(result.url);
    }
    return result;
  }

  const opened = window.open(result.url, "_blank", "noopener,noreferrer");
  if (opened) {
    opened.opener = null;
  } else {
    window.location.assign(result.url);
  }

  return result;
}

export function buildWhatsAppUrl(payload: WAPayload, target: WhatsAppTarget = getWhatsAppTarget()): WhatsAppOpenResult {
  const message = formatWhatsAppMessage(payload);
  verifyPayloadInMessage(payload, message);

  const encodedMessage = encodeURIComponent(message);
  const url = target === "mobile"
    ? `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${WA_PHONE_NUMBER}&text=${encodedMessage}`;

  return { url, message, encodedMessage, target };
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

function getWhatsAppTarget(): WhatsAppTarget {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent || "";
  const isMobileUa = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(ua);
  const isSmallTouchDevice = window.matchMedia?.("(max-width: 767px)").matches && navigator.maxTouchPoints > 0;

  return isMobileUa || isSmallTouchDevice ? "mobile" : "desktop";
}

function verifyPayloadInMessage(payload: WAPayload, message: string) {
  const missingLabels = payload.fields
    .map((field) => `${field.label}:`)
    .filter((label) => !message.includes(label));
  const missingValues = payload.fields
    .map((field) => String(field.value ?? "").trim())
    .filter((value) => value.length > 0 && !message.includes(value));

  if (missingLabels.length > 0 || missingValues.length > 0) {
    throw new Error(
      `WhatsApp message verification failed. Missing fields: ${[
        ...missingLabels,
        ...missingValues,
      ].join(", ")}`,
    );
  }
}

function exposeWhatsAppDebug(result: WhatsAppOpenResult) {
  const w = window as WindowWithWhatsAppDebug;
  w.__youAiLastWhatsAppUrl = result.url;
  w.__youAiLastWhatsAppMessage = result.message;
  window.dispatchEvent(new CustomEvent("yai:whatsapp_url", { detail: result }));
  console.info("[You AI] WhatsApp URL generated:", result.url);
  console.info("[You AI] WhatsApp message generated:", result.message);
}
