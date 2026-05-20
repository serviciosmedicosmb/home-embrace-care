import { Star } from "lucide-react";
import t1 from "@/assets/test1.jpg";
import t2 from "@/assets/test2.jpg";
import t3 from "@/assets/test3.jpg";

const items = [
  {
    img: t1,
    name: "María González",
    role: "Hija de paciente",
    text: "El equipo cuidó a mi madre con una dedicación increíble. Pude trabajar tranquila sabiendo que estaba en buenas manos.",
  },
  {
    img: t2,
    name: "Carlos Rojas",
    role: "Hijo de paciente",
    text: "Respuesta inmediata, profesionales muy capacitados y un trato humano excepcional. Los recomiendo totalmente.",
  },
  {
    img: t3,
    name: "Camila Pérez",
    role: "Nieta de paciente",
    text: "La coordinación clínica y los reportes familiares nos dieron la tranquilidad que tanto necesitábamos.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Testimonios</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Familias que hoy viven más tranquilas</h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <article key={t.name} className="card-premium p-7 flex flex-col">
              <div className="flex gap-0.5 text-[color:var(--brand)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-brand-deep leading-relaxed flex-1">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-[color:var(--brand-soft)]">
                <img src={t.img} alt={t.name} loading="lazy" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-display font-bold text-brand-deep text-sm">{t.name}</p>
                  <p className="text-xs text-ink">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
