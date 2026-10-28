const GOOGLE_ADS_WHATSAPP_CONVERSION =
  "AW-18197430103/cviiCL7y5KwdENf-muVD";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
    });
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "conversion",
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION,
    });
  }
}
