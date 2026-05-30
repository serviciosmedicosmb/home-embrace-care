import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, ShieldCheck, Clock, Stethoscope, HeartPulse, MapPin, ClipboardList, Activity, ThermometerSun, Pill, Bandage, UserCheck, Home, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import heroImg from "@/assets/service-doctor.jpg";

export const Route = createFileRoute("/medico-a-domicilio")({
  component: MedicoDomicilioPage,
  head: () => ({
    meta: [
      { title: "Médico a Domicilio en Santiago — Servicios Médicos MB" },
      { name: "description", content: "Atención médica profesional en la comodidad de su hogar. Consultas médicas a domicilio en toda la Región Metropolitana, 24/7." },
      { property: "og:title", content: "Médico a Domicilio en Santiago — Servicios Médicos MB" },
      { property: "og:description", content: "Médicos colegiados que atienden en tu casa. Diagnóstico, tratamiento y seguimiento clínico premium." },
    ],
  }),
});

const benefits = [
  { Icon: Home, title: "Atención en tu hogar", desc: "Evita traslados, esperas y riesgos de contagio en clínicas u hospitales." },
  { Icon: Clock, title: "Disponibilidad 24/7", desc: "Coordinamos la visita médica en menos de 24 horas, incluso fines de semana." },
  { Icon: ShieldCheck, title: "Médicos colegiados", desc: "Profesionales certificados con experiencia clínica y trato humano." },
  { Icon: ClipboardList, title: "Informe clínico completo", desc: "Diagnóstico, receta, indicaciones y seguimiento entregado a la familia." },
  { Icon: HeartPulse, title: "Atención integral", desc: "Coordinamos enfermería, exámenes y especialistas si tu caso lo requiere." },
  { Icon: UserCheck, title: "Cuidado humano", desc: "Acompañamos a cada paciente y su familia con cercanía y empatía." },
];

const conditions = [
  { Icon: ThermometerSun, title: "Cuadros virales y resfríos" },
  { Icon: Activity, title: "Hipertensión y control crónico" },
  { Icon: Pill, title: "Renovación de recetas médicas" },
  { Icon: Bandage, title: "Heridas, curaciones y suturas" },
  { Icon: Stethoscope, title: "Infecciones respiratorias" },
  { Icon: HeartPulse, title: "Dolor torácico y malestar general" },
  { Icon: ClipboardList, title: "Certificados y licencias médicas" },
  { Icon: UserCheck, title: "Control adulto mayor en domicilio" },
];

const communes = [
  "Santiago Centro", "Providencia", "Las Condes", "Vitacura", "Lo Barnechea", "Ñuñoa",
  "La Reina", "Macul", "Peñalolén", "La Florida", "Puente Alto", "San Miguel",
  "Maipú", "Estación Central", "Quilicura", "Huechuraba", "Recoleta", "Independencia",
];

const faqs = [
  { q: "¿Cuánto demora el médico en llegar?", a: "Coordinamos la visita en menos de 24 horas. En urgencias domiciliarias buscamos llegar el mismo día según disponibilidad." },
  { q: "¿Qué incluye la consulta médica a domicilio?", a: "Evaluación clínica completa, diagnóstico, indicaciones terapéuticas, receta médica y, si corresponde, certificado o licencia." },
  { q: "¿Cuál es el valor de la consulta?", a: "La consulta médica a domicilio tiene un valor de $80.000 CLP. Si requieres servicios adicionales (enfermería, exámenes) los cotizamos a medida." },
  { q: "¿Atienden en toda la Región Metropolitana?", a: "Sí, cubrimos todas las comunas de la Región Metropolitana. Confirmamos disponibilidad al momento de coordinar la visita." },
  { q: "¿Puedo pagar con WebPay o Mercado Pago?", a: "Sí, aceptamos WebPay, Mercado Pago, transferencia y efectivo. Puedes pagar antes o después de la visita." },
];

function MedicoDomicilioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 radial-glow pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-semibold text-brand-deep border border-[color:var(--brand-soft)] shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[color:var(--whatsapp)] animate-pulse" />
                Disponible 24/7 · Toda la Región Metropolitana
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-brand-deep">
                Médico a Domicilio en <span className="text-brand">Santiago</span>
              </h1>
              <p className="mt-6 text-lg text-ink max-w-xl leading-relaxed">
                Atención médica profesional en la comodidad de su hogar. Médicos colegiados, diagnóstico clínico, receta y seguimiento integral para toda la familia.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink("Hola, quiero coordinar una consulta médica a domicilio.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> WhatsApp inmediato
                </a>
                <a href="tel:+56965824407" className="btn-outline">
                  <Phone className="h-5 w-5" /> Llamar ahora
                </a>
              </div>

              <ul className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
                {[
                  { Icon: Clock, label: "Atención 24/7" },
                  { Icon: ShieldCheck, label: "Médicos certificados" },
                  { Icon: MapPin, label: "Cobertura RM" },
                ].map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-brand-deep font-medium">
                    <span className="h-8 w-8 grid place-items-center rounded-full bg-brand-soft text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative animate-fade">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--brand)]/20 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white">
                <img src={heroImg} alt="Médico profesional atendiendo a paciente en su hogar" width={1280} height={1280} className="w-full h-auto object-cover object-[center_25%]" />
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Beneficios</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">¿Por qué elegir un médico a domicilio?</h2>
              <p className="mt-4 text-ink">Atención médica con la calidez del hogar y los estándares de una clínica privada.</p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map(({ Icon, title, desc }) => (
                <article key={title} className="card-premium p-7">
                  <div className="h-12 w-12 rounded-2xl bg-brand-soft text-brand grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-display font-bold">{title}</h3>
                  <p className="mt-2 text-ink text-sm leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONDITIONS */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Qué atendemos</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Enfermedades y situaciones frecuentes</h2>
              <p className="mt-4 text-ink">Nuestros médicos están preparados para abordar la mayoría de los motivos de consulta domiciliaria.</p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {conditions.map(({ Icon, title }) => (
                <div key={title} className="card-premium p-6 flex items-center gap-4">
                  <span className="h-11 w-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display font-semibold text-brand-deep text-sm">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cobertura</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Atendemos toda la Región Metropolitana</h2>
              <p className="mt-5 text-ink leading-relaxed">
                Nuestro equipo médico se desplaza a tu domicilio en cualquier comuna de Santiago. Coordinamos la visita en menos de 24 horas y confirmamos disponibilidad al momento de tu solicitud.
              </p>
              <a href={waLink("Hola, quiero confirmar cobertura de médico a domicilio en mi comuna.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
                <MessageCircle className="h-5 w-5" /> Verificar mi comuna
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {communes.map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-xl bg-white border border-[color:var(--brand-soft)] px-3 py-2.5 text-sm text-brand-deep font-medium shadow-soft">
                  <MapPin className="h-4 w-4 text-brand shrink-0" /> {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Resolvemos tus dudas</h2>
            </div>
            <div className="mt-12 space-y-4">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="card-premium overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display font-semibold text-brand-deep">{f.q}</span>
                      <span className="h-8 w-8 grid place-items-center rounded-full bg-brand-soft text-brand shrink-0">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 -mt-1 text-ink text-sm leading-relaxed animate-fade">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 md:py-28 bg-brand-deep relative overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              ¿Necesitas un médico hoy mismo?
            </h2>
            <p className="mt-5 text-white/80 text-lg max-w-2xl mx-auto">
              Coordinamos tu consulta médica a domicilio con un profesional certificado. Atención rápida, humana y segura.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={waLink("Hola, necesito un médico a domicilio.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
              </a>
              <a href="tel:+56965824407" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                <Phone className="h-5 w-5" /> Llamar ahora
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
