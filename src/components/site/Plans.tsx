import { Check, Sparkles, MessageCircle, Settings2 } from "lucide-react";
import { waLink } from "@/lib/contact";

const fmtCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const plans = [
  {
    name: "Plan Continuidad 12 horas",
    price: 1549990,
    desc: "Cuidado diario estructurado para adultos mayores con dependencia moderada o familias que necesitan apoyo sostenido durante el día.",
    features: [
      "Cuidadora a domicilio por 12 horas diarias",
      "Apoyo en higiene, alimentación y movilización",
      "Supervisión y recordatorio de medicamentos",
      "Visita mensual de médico",
      "Informe familiar semanal",
      "Coordinación por WhatsApp",
      "Reemplazo ante ausencias, sujeto a disponibilidad",
    ],
    exclusions: "No incluye enfermería, kinesiología, traslados, medicamentos ni procedimientos clínicos.",
    highlight: false,
    cta: "Solicitar evaluación",
  },
  {
    name: "Plan Integral 24 horas",
    price: 3199990,
    desc: "Cuidado continuo para familias que necesitan supervisión clínica periódica y tranquilidad durante todo el día.",
    features: [
      "Cuidado a domicilio durante 24 horas, mediante turnos coordinados",
      "Enfermería 2 veces al mes",
      "Visita médica 1 vez al mes",
      "Coordinación clínica",
      "Informe familiar semanal",
      "Reemplazo ante ausencias, según disponibilidad",
    ],
    exclusions: "No incluye medicamentos, exámenes, traslados, kinesiología ni procedimientos clínicos adicionales.",
    highlight: true,
    cta: "Solicitar evaluación",
  },
  {
    name: "Plan Clínico Premium",
    price: null,
    daily: null,
    desc: "Para casos de alta dependencia, cuidado paliativo, post-alta compleja o familias que requieren un equipo clínico coordinado.",
    features: [
      "Cuidado domiciliario continuo 24/7 mediante turnos coordinados",
      "Coordinador clínico familiar dedicado",
      "Médico y enfermería según evaluación",
      "Kinesiología según necesidad clínica",
      "Plan de cuidado personalizado",
      "Reportes periódicos y seguimiento clínico",
      "Reemplazo prioritario ante ausencias, según disponibilidad",
    ],
    exclusions: "No incluye medicamentos, insumos médicos, exámenes, traslados ni procedimientos fuera de la propuesta.",
    highlight: false,
    cta: "Agendar evaluación clínica",
  },
];

export function Plans() {
  return (
    <section id="planes" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Planes mensuales</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Planes de cuidado a domicilio</h2>
          <p className="mt-4 text-ink leading-relaxed">
            Todos los planes incluyen evaluación inicial sin costo, coordinación por WhatsApp y reportes a la familia.
            Los precios son referenciales y se confirman luego de evaluar el nivel de dependencia, horario y comuna.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                p.highlight
                  ? "bg-brand-deep text-white shadow-glow md:scale-[1.02] border border-[color:var(--brand)]"
                  : "card-premium"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[color:var(--whatsapp)] px-4 py-1 text-xs font-display font-semibold text-white shadow-soft">
                  <Sparkles className="h-3.5 w-3.5" /> Más solicitado
                </span>
              )}
              <h3 className={`text-2xl font-display font-bold ${p.highlight ? "text-white" : "text-brand-deep"}`}>{p.name}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${p.highlight ? "text-white/85" : "text-ink"}`}>{p.desc}</p>

              <div className="mt-6">
                {p.price !== null ? (
                  <>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${p.highlight ? "text-white/75" : "text-brand"}`}>Desde</p>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className={`text-3xl lg:text-4xl font-display font-bold break-words ${p.highlight ? "text-white" : "text-brand-deep"}`}>
                        {fmtCLP(p.price)}
                      </span>
                      <span className={`text-sm ${p.highlight ? "text-white/75" : "text-ink"}`}>/mes</span>
                    </div>
                    <p className={`mt-2 text-xs ${p.highlight ? "text-white/75" : "text-ink"}`}>{p.daily}</p>
                  </>
                ) : (
                  <>
                    <p className={`text-xl font-display font-bold ${p.highlight ? "text-white" : "text-brand-deep"}`}>
                      Cotización según evaluación clínica
                    </p>
                    <p className={`mt-2 text-xs ${p.highlight ? "text-white/75" : "text-ink"}`}>
                      Precio final según frecuencia de profesionales y complejidad del caso.
                    </p>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className={`mt-0.5 h-6 w-6 rounded-full grid place-items-center shrink-0 ${p.highlight ? "bg-white/15 text-white" : "bg-brand-soft text-brand"}`}>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className={`text-sm leading-relaxed ${p.highlight ? "text-white/95" : "text-brand-deep"}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-6 text-xs leading-relaxed ${p.highlight ? "text-white/75" : "text-ink"}`}>{p.exclusions}</p>
              <a
                href={waLink(`Hola, quisiera solicitar una evaluación gratuita para el ${p.name}. ¿Podrían orientarme?`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center text-center gap-2 rounded-full px-5 py-4 font-display font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  p.highlight ? "bg-white text-brand-deep hover:shadow-card" : "bg-brand-deep text-white hover:bg-[color:var(--brand)] hover:shadow-glow"
                }`}
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>

        <article className="mt-10 rounded-3xl overflow-hidden border border-[color:var(--brand-soft)] bg-gradient-to-br from-brand-soft to-white shadow-soft">
          <div className="grid md:grid-cols-[1.1fr_1fr] items-center gap-8 p-6 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-display font-semibold text-brand shadow-soft">
                <Settings2 className="h-3.5 w-3.5" /> Plan Personalizado
              </div>
              <h3 className="mt-4 text-3xl md:text-4xl font-display font-bold text-brand-deep leading-tight">Diseñamos un plan a la medida de tu familia</h3>
              <p className="mt-4 text-ink leading-relaxed">
                Diseñamos un plan según las necesidades específicas de tu familiar: horas de cuidadora, turnos, frecuencia médica,
                enfermería, kinesiología, acompañamiento y nivel de supervisión.
              </p>
              <p className="mt-4 text-xl font-display font-bold text-brand-deep">Desde $49.990 por día</p>
              <p className="mt-1 text-sm text-ink">Según servicios y horario contratado.</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Evaluación inicial gratuita",
                  "Horario y servicios a medida",
                  "Coordinador clínico dedicado",
                  "Reportes familiares periódicos",
                  "Propuesta escrita con servicios, frecuencia y valor",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-brand-deep">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink leading-relaxed">
                <strong>Ideal para:</strong> cuidado de fin de semana, apoyo tras alta hospitalaria, cuidado nocturno,
                acompañamiento temporal o familias que necesitan combinar profesionales.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={waLink("Hola, quisiera solicitar una llamada para diseñar un Plan Personalizado para mi familiar.")}
                  target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> Solicitar llamada
                </a>
                <a href="tel:+56982752313" className="btn-outline">Llamar ahora</a>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[color:var(--brand-soft)] p-6 md:p-8 shadow-soft">
              <p className="text-xs font-semibold text-brand uppercase tracking-wider">Evaluación y cotización a medida</p>
              <h4 className="mt-3 font-display font-bold text-brand-deep text-2xl">¿No sabes qué plan necesita tu familiar?</h4>
              <p className="mt-3 text-sm text-ink leading-relaxed">
                Conversemos y diseñemos juntos el plan adecuado. Te entregamos una propuesta clara, con servicios incluidos,
                horario, frecuencia de profesionales y valor final.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink">
                {[
                  "Evaluación inicial sin costo",
                  "Propuesta escrita y detallada",
                  "Inicio coordinado en menos de 24 horas, según disponibilidad",
                  "Atención en toda la Región Metropolitana",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a href={waLink("Hola, quisiera agendar una evaluación inicial gratuita para definir el plan de cuidado de mi familiar.")}
                  target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center text-center">
                  <MessageCircle className="h-5 w-5" /> Agendar evaluación gratuita
                </a>
                <a href={waLink("Hola, quisiera información sobre los planes de cuidado a domicilio.")}
                  target="_blank" rel="noopener noreferrer" className="btn-outline justify-center text-center">
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
