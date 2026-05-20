import { Check, Sparkles } from "lucide-react";
import { waLink } from "@/lib/contact";

const plans = [
  {
    name: "Plan Básico",
    desc: "Apoyo esencial para mantener tranquilidad diaria.",
    features: [
      "Cuidadora 12 horas",
      "Supervisión de medicamentos",
      "Control de signos vitales",
      "Informe familiar semanal",
    ],
    highlight: false,
  },
  {
    name: "Plan Integral",
    desc: "El más solicitado por familias que buscan continuidad.",
    features: [
      "Cuidadora 24 horas",
      "Enfermería 2 veces por semana",
      "Médico 1 vez por semana",
      "Coordinación clínica",
      "Informe familiar y seguimiento",
    ],
    highlight: true,
  },
  {
    name: "Plan Premium",
    desc: "Atención clínica completa y personalizada.",
    features: [
      "Atención integral",
      "Coordinador clínico familiar",
      "Seguimiento y reportes",
      "Atención 24/7",
      "Plan personalizado",
    ],
    highlight: false,
  },
];

export function Plans() {
  return (
    <section id="planes" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Planes</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Planes de atención a domicilio</h2>
          <p className="mt-4 text-ink">Elige el plan que mejor se adapte al cuidado de tu familiar. Todos incluyen evaluación inicial sin costo.</p>
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
      </div>
    </section>
  );
}
