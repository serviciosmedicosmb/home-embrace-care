import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/googleAds";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      aria-label="WhatsApp atención inmediata"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[color:var(--whatsapp)] text-white grid place-items-center shadow-glow whatsapp-pulse hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
