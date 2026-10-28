const GOOGLE_ADS_WHATSAPP_CONVERSION =
  "AW-18197430103/cviiCL7y5KwdENf-muVD";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
  });
}
