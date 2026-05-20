import { MessageCircle } from "lucide-react";
import emotionalImg from "@/assets/emotional.jpg";
import { waLink } from "@/lib/contact";

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
            Acompañamos a familias con empatía, profesionalismo y dedicación. Cada visita es una promesa de
            cuidado, respeto y confianza para quienes más queremos.
          </p>

          <ul className="mt-8 space-y-3">
            {["Empatía en cada visita", "Acompañamiento real, no solo asistencia", "Comunicación constante con la familia", "Profesionales seleccionados y supervisados"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-brand-deep">
                <span className="h-2 w-2 rounded-full bg-[color:var(--brand)]" /> {t}
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
