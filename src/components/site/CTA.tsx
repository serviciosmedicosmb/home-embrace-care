import { useState } from "react";
import { Check, MessageCircle, CreditCard, Lock, ChevronDown } from "lucide-react";
import { waLink } from "@/lib/contact";
import { PaymentModal } from "./PaymentModal";

const contactBenefits = [
  "Atención en toda la Región Metropolitana",
  "Evaluación inicial sin costo",
  "Coordinación por WhatsApp o teléfono",
];

const paymentBenefits = [
  "Confirmación del servicio antes del pago",
  "Detalle de servicios, horarios y frecuencia",
  "Coordinación del inicio con la familia",
  "Soporte por WhatsApp durante todo el proceso",
];

export function CTA() {
  const [method, setMethod] = useState<"webpay" | "mercadopago" | null>(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  return (
    <section id="contacto" className="py-20 md:py-28 bg-brand-deep relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/30 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
          ¿Necesitas apoyo para un familiar adulto mayor?
        </h2>
        <p className="mt-5 text-white/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Te orientamos sin compromiso y te ayudamos a definir el nivel de cuidado adecuado.
          Agenda una evaluación gratuita y recibe una propuesta clara para comenzar la atención
          en menos de 24 horas, según disponibilidad.
        </p>

        <ul className="mt-7 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-x-6 text-sm text-white/90">
          {contactBenefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-left">
              <Check className="h-4 w-4 shrink-0 text-[#00C4A8]" aria-hidden />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={waLink("Hola, quisiera agendar una evaluación inicial gratuita para el cuidado de un familiar adulto mayor.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Agendar evaluación gratuita
          </a>
          <a
            href={waLink("Hola, quisiera recibir orientación sobre los servicios de Servicios Médicos MB.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Escribir por WhatsApp
          </a>
        </div>

        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 text-white/75 text-sm font-medium">
            <Lock className="h-4 w-4" aria-hidden /> Pago coordinado
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-display font-bold text-white">
            Pago seguro y coordinado
          </h3>
          <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Una vez aprobada tu propuesta y confirmada la asignación del profesional,
            podrás realizar el pago del servicio por transferencia, tarjeta o el medio disponible.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-left text-sm text-white/90">
            {paymentBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#00C4A8]" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={showPaymentMethods}
            aria-controls="payment-methods"
            onClick={() => setShowPaymentMethods((previous) => !previous)}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-deep px-7 py-3.5 font-display font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
          >
            Ver medios de pago
            <ChevronDown className={`h-4 w-4 transition-transform ${showPaymentMethods ? "rotate-180" : ""}`} aria-hidden />
          </button>

          {showPaymentMethods && (
            <div id="payment-methods" className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setMethod("webpay")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#E60028] hover:shadow-card border-2 border-[#E60028] px-6 py-3 font-display font-semibold text-sm transition hover:-translate-y-0.5"
              >
                <CreditCard className="h-4 w-4" aria-hidden /> Pagar con WebPay
              </button>
              <button
                type="button"
                onClick={() => setMethod("mercadopago")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00B1EA] text-white hover:shadow-card border border-white/15 px-6 py-3 font-display font-semibold text-sm transition hover:-translate-y-0.5"
              >
                <CreditCard className="h-4 w-4" aria-hidden /> Pagar con Mercado Pago
              </button>
            </div>
          )}
        </div>
      </div>
      <PaymentModal open={!!method} method={method} onClose={() => setMethod(null)} />
    </section>
  );
}
