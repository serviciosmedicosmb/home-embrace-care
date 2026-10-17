import {
  MessageCircle,
  ClipboardList,
  Clock,
  UserRoundCheck,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import heroImg from "@/assets/service-doctor.jpg";
import { waLink } from "@/lib/contact";

const benefits = [
  { Icon: Clock, label: "Atención y coordinación 24/7 en Región Metropolitana" },
  { Icon: UserRoundCheck, label: "Cuidadoras, enfermeras y médicos seleccionados y supervisados" },
  { Icon: BadgeCheck, label: "Evaluación inicial sin costo y propuesta personalizada" },
  { Icon: RefreshCw, label: "Reemplazo ante ausencias, según plan contratado" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-semibold text-brand-deep border border-[color:var(--brand-soft)] shadow-soft">
            <span className="h-2 w-2 rounded-full bg-[color:var(--whatsapp)] animate-pulse" />
            Atención y coordinación 24/7 en Región Metropolitana
          </span>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold leading-[1.1] text-brand-deep">
            Cuidado médico y acompañamiento profesional en{" "}
            <span className="text-brand">tu hogar, en Santiago.</span>
          </h1>

          <p className="mt-6 text-lg text-ink max-w-xl leading-relaxed">
            Médico a domicilio, enfermería, cuidadoras de adulto mayor y planes de atención integral
            para familias que necesitan una respuesta rápida, segura y humana.
          </p>

          <p className="mt-4 max-w-xl text-base sm:text-lg font-semibold text-brand-deep leading-relaxed">
            Evaluación inicial sin costo. Inicio coordinado en menos de 24 horas, según disponibilidad.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contacto" className="btn-whatsapp">
              <ClipboardList className="h-5 w-5" /> Agendar evaluación gratuita
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle className="h-5 w-5" /> Hablar por WhatsApp
            </a>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-4 text-sm">
            {benefits.map(({ Icon, label }) => (
              <li key={label} className="flex items-start gap-2 text-brand-deep font-medium">
                <span className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="pt-1">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--brand)]/20 to-transparent blur-2xl" aria-hidden />
          <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white">
            <img
              src={heroImg}
              alt="Médico profesional a domicilio atendiendo con calidez"
              width={1280}
              height={1280}
              className="w-full h-auto object-cover object-[center_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
