import { Heart, ShieldCheck, Zap } from "lucide-react";

const items = [
  {
    Icon: Heart,
    title: "Trato humano",
    desc: "Cada paciente es atendido con empatía, paciencia y respeto. Cuidamos como cuidaríamos a nuestra propia familia.",
  },
  {
    Icon: ShieldCheck,
    title: "Seguridad y confianza",
    desc: "Equipo clínico certificado, protocolos estrictos y supervisión constante para la tranquilidad de tu familia.",
  },
  {
    Icon: Zap,
    title: "Respuesta rápida",
    desc: "Coordinación inmediata por WhatsApp y atención disponible 24/7 en toda la Región Metropolitana.",
  },
];

export function Trust() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Confianza</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">¿Por qué las familias nos eligen?</h2>
          <p className="mt-4 text-ink">Tres razones por las que somos la elección preferida en cuidado domiciliario premium.</p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map(({ Icon, title, desc }) => (
            <article key={title} className="card-premium p-8 group">
              <div className="h-14 w-14 rounded-2xl bg-brand-soft grid place-items-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-display font-bold">{title}</h3>
              <p className="mt-3 text-ink leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
