import { Check, Sparkles, MessageCircle, Settings2 } from "lucide-react";
import { waLink } from "@/lib/contact";

const fmtCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const plans = [
  {
    name: "Plan Básico",
    price: 1549990,
    desc: "Apoyo esencial para mantener tranquilidad diaria.",
    features: [
      "Cuidadora 12 horas",
      "Supervisión básica y de medicamentos",
      "Visita mensual del médico",
      "Informe familiar semanal",
    ],
    highlight: false,
  },
  {
    name: "Plan Integral",
    price: 3199900,
    desc: "El más solicitado por familias que buscan continuidad.",
    features: [
      "Cuidadora 24 horas",
      "Enfermería 2 veces al mes",
      "Médico 1 vez al mes",
      "Coordinación clínica",
      "Informe familiar y seguimiento",
    ],
    highlight: true,
  },
  {
    name: "Plan Premium",
    price: 4199900,
    desc: "Atención clínica completa y personalizada.",
    features: [
      "Atención integral 24/7",
      "Coordinador clínico familiar",
      "Médico y enfermería frecuente",
      "Kinesiología incluida",
      "Reportes y seguimiento premium",
    ],
    highlight: false,
  },
];

export function Plans() {
  return (
    <section id="planes" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Planes mensuales</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Planes de atención a domicilio</h2>
          <p className="mt-4 text-ink">
            Elige el plan que mejor se adapte al cuidado de tu familiar. Todos incluyen evaluación inicial sin costo.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                p.highlight
                  ? "bg-brand-deep text-white shadow-glow scale-[1.02] border border-[color:var(--brand)]"
                  : "card-premium"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[color:var(--whatsapp)] px-4 py-1 text-xs font-display font-semibold text-white shadow-soft">
                  <Sparkles className="h-3.5 w-3.5" /> Más solicitado
                </span>
              )}
              <h3 className={`text-2xl font-display font-bold ${p.highlight ? "text-white" : "text-brand-deep"}`}>
                {p.name}
              </h3>
              <p className={`mt-2 text-sm ${p.highlight ? "text-white/80" : "text-ink"}`}>{p.desc}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className={`text-3xl md:text-4xl font-display font-bold ${p.highlight ? "text-white" : "text-brand-deep"}`}>
                  {fmtCLP(p.price)}
                </span>
                <span className={`text-sm ${p.highlight ? "text-white/70" : "text-ink"}`}>/mes</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 h-6 w-6 rounded-full grid place-items-center shrink-0 ${
                        p.highlight ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className={p.highlight ? "text-white/95" : "text-brand-deep"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(`Hola, quisiera solicitar una evaluación para el ${p.name}.`)}
                target="_blank" rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-white text-brand-deep hover:shadow-card"
                    : "bg-brand-deep text-white hover:bg-[color:var(--brand)] hover:shadow-glow"
                }`}
              >
                Solicitar evaluación
              </a>
            </article>
          ))}
        </div>

        {/* Plan Personalizado */}
        <article className="mt-10 rounded-3xl overflow-hidden border border-[color:var(--brand-soft)] bg-gradient-to-br from-brand-soft to-white shadow-soft">
          <div className="grid md:grid-cols-[1.1fr_1fr] items-center gap-8 p-8 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-display font-semibold text-brand shadow-soft">
                <Settings2 className="h-3.5 w-3.5" /> Plan Personalizado
              </div>
              <h3 className="mt-4 text-3xl md:text-4xl font-display font-bold text-brand-deep leading-tight">
                Diseñamos un plan a la medida de tu familia
              </h3>
              <p className="mt-4 text-ink max-w-xl">
                Si los planes anteriores no se ajustan a tus necesidades, creamos uno personalizado: combinamos horas
                de cuidadora, frecuencia médica, enfermería, kinesiología y acompañamiento — siempre con un
                coordinador clínico dedicado.
              </p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Evaluación clínica gratuita",
                  "Horario y servicios a medida",
                  "Reportes familiares periódicos",
                  "Coordinador clínico dedicado",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-brand-deep">
                    <Check className="h-4 w-4 text-brand" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={waLink("Hola, quisiera diseñar un Plan Personalizado para mi familiar.")}
                  target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> Coordinar mi plan
                </a>
                <a href="tel:+56965824407" className="btn-outline">Solicitar llamada</a>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[color:var(--brand-soft)] p-6 md:p-8 shadow-soft">
              <p className="text-xs font-semibold text-brand uppercase tracking-wider">Cotización a medida</p>
              <p className="mt-3 font-display font-bold text-brand-deep text-2xl">
                Conversemos y diseñamos juntos el plan ideal
              </p>
              <div className="mt-5 space-y-3 text-sm text-ink">
                <p className="flex items-start gap-2"><Check className="h-4 w-4 text-brand mt-0.5" /> Sin costo de evaluación</p>
                <p className="flex items-start gap-2"><Check className="h-4 w-4 text-brand mt-0.5" /> Propuesta clara y detallada</p>
                <p className="flex items-start gap-2"><Check className="h-4 w-4 text-brand mt-0.5" /> Inicio coordinado en menos de 24 hrs</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
