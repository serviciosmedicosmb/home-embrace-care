import { MessageCircle } from "lucide-react";
import emotionalImg from "@/assets/emotional.jpg";
import { waLink } from "@/lib/contact";

const commitments = [
  {
    title: "Empatía en cada visita",
    description: "Atención respetuosa, paciente y centrada en la persona.",
  },
  {
    title: "Acompañamiento real",
    description: "No solo asistencia física; también compañía, rutinas y bienestar emocional.",
  },
  {
    title: "Comunicación constante",
    description: "La familia recibe información sobre la evolución y el cumplimiento del plan.",
  },
  {
    title: "Profesionales seleccionados",
    description: "Cuidadoras, enfermeras y médicos evaluados antes de su asignación.",
  },
  {
    title: "Protocolos claros",
    description: "Definimos desde el inicio medicación, contactos de emergencia, alergias y preferencias del paciente.",
  },
];

export function Emotional() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-brand-soft">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-white/60 blur-2xl" aria-hidden />
          <div className="relative rounded-[2rem] overflow-hidden shadow-card">
            <img
              src={emotionalImg}
              alt="Adulto mayor sonriendo junto a profesional de salud"
              loading="lazy"
              width={1280}
              height={1024}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Nuestro compromiso</p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
            La tranquilidad de saber que tu familiar está en <span className="text-brand">buenas manos</span>.
          </h2>
          <p className="mt-6 text-lg text-ink leading-relaxed">
            Acompañamos a las familias con empatía, profesionalismo y comunicación constante. Nuestro objetivo
            es que tu familiar reciba un cuidado digno, seguro y personalizado, mientras tú tienes claridad
            sobre qué está ocurriendo en cada etapa.
          </p>

          <ul className="mt-8 space-y-4">
            {commitments.map(({ title, description }) => (
              <li key={title} className="flex items-start gap-3 text-brand-deep">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand)]"
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base leading-relaxed">
                  <strong className="font-semibold">{title}:</strong> {description}
                </span>
              </li>
            ))}
          </ul>

          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10">
            <MessageCircle className="h-5 w-5" /> Hablar con un profesional
          </a>
        </div>
      </div>
    </section>
  );
}
