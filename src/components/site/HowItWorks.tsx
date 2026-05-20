import { Phone, ClipboardCheck, Home } from "lucide-react";

const steps = [
  { Icon: Phone, n: "01", title: "Contáctanos", desc: "Escríbenos por WhatsApp o llámanos. Te respondemos al instante." },
  { Icon: ClipboardCheck, n: "02", title: "Evaluamos el caso", desc: "Un coordinador clínico analiza necesidades y arma una propuesta personalizada." },
  { Icon: Home, n: "03", title: "Comenzamos la atención", desc: "Coordinamos al equipo adecuado y empezamos en menos de 24 horas." },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cómo funciona</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Tres pasos para empezar a cuidar</h2>
        </div>

        <div className="mt-16 relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[color:var(--brand)]/40 to-transparent" aria-hidden />
          {steps.map(({ Icon, n, title, desc }) => (
            <div key={n} className="relative text-center">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-white shadow-card grid place-items-center text-brand relative z-10 border border-[color:var(--brand-soft)]">
                <Icon className="h-8 w-8" strokeWidth={1.6} />
              </div>
              <p className="mt-5 text-xs font-display font-bold tracking-widest text-brand">PASO {n}</p>
              <h3 className="mt-2 text-xl font-display font-bold">{title}</h3>
              <p className="mt-3 text-ink leading-relaxed max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
