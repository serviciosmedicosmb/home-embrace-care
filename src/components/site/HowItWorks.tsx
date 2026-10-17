import { Phone, ClipboardCheck, FileText, Home } from "lucide-react";

const steps = [
  {
    Icon: Phone,
    n: "01",
    title: "Cuéntanos tu necesidad",
    desc: "Escríbenos por WhatsApp o llámanos. Cuéntanos la situación de tu familiar, la comuna, el horario requerido y si existe alguna urgencia.",
  },
  {
    Icon: ClipboardCheck,
    n: "02",
    title: "Evaluamos el caso",
    desc: "Realizamos una evaluación inicial sin costo para definir el nivel de dependencia, los servicios necesarios y el profesional más adecuado.",
  },
  {
    Icon: FileText,
    n: "03",
    title: "Recibes una propuesta clara",
    desc: "Te enviamos una propuesta con horario, servicios incluidos, frecuencia de visitas clínicas y valor final. Sin compromisos ocultos.",
  },
  {
    Icon: Home,
    n: "04",
    title: "Comenzamos la atención",
    desc: "Coordinamos al equipo y activamos el servicio en menos de 24 horas, según disponibilidad y complejidad del caso.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cómo funciona</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
            Cuatro pasos para comenzar el cuidado
          </h2>
        </div>

        <div className="mt-12 md:mt-16 relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[color:var(--brand)]/40 to-transparent"
            aria-hidden="true"
          />
          {steps.map(({ Icon, n, title, desc }) => (
            <div key={n} className="relative text-center">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-white shadow-card grid place-items-center text-brand relative z-10 border border-[color:var(--brand-soft)]">
                <Icon className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
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
