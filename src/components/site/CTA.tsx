import { useState } from "react";
import { MessageCircle, Phone, CreditCard, Lock } from "lucide-react";
import { waLink } from "@/lib/contact";
import { PaymentModal } from "./PaymentModal";

export function CTA() {
  const [method, setMethod] = useState<"webpay" | "mercadopago" | null>(null);
  return (
    <section id="contacto" className="py-20 md:py-28 bg-brand-deep relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/30 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
          ¿Necesitas ayuda para un familiar?
        </h2>
        <p className="mt-5 text-white/80 text-lg max-w-2xl mx-auto">
          Conversemos hoy. Te orientamos sin compromiso y coordinamos atención en menos de 24 horas.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-5 w-5" /> WhatsApp inmediato
          </a>
          <a href="tel:+56965824407" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
            <Phone className="h-5 w-5" /> Solicitar llamada
          </a>
        </div>

        <div className="mt-14 max-w-2xl mx-auto rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-8">
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-medium">
            <Lock className="h-4 w-4" /> Pago seguro online
          </div>
          <h3 className="mt-3 text-2xl font-display font-bold text-white">Pagar servicio online</h3>
          <p className="mt-2 text-white/70 text-sm">Elige tu medio de pago preferido y completa tus datos.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => setMethod("webpay")} className="inline-flex items-center gap-2 rounded-full bg-white text-brand-deep hover:shadow-card border border-white/15 px-6 py-3 font-display font-semibold text-sm transition hover:-translate-y-0.5">
              <CreditCard className="h-4 w-4" /> Pagar con WebPay
            </button>
            <button onClick={() => setMethod("mercadopago")} className="inline-flex items-center gap-2 rounded-full bg-[#00B1EA] text-white hover:shadow-card border border-white/15 px-6 py-3 font-display font-semibold text-sm transition hover:-translate-y-0.5">
              <CreditCard className="h-4 w-4" /> Pagar con Mercado Pago
            </button>
          </div>
        </div>
      </div>
      <PaymentModal open={!!method} method={method} onClose={() => setMethod(null)} />
    </section>
  );
}
