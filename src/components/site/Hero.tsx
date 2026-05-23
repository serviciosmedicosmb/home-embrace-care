import { MessageCircle, ClipboardList, ShieldCheck, Clock, MapPin } from "lucide-react";
import heroImg from "@/assets/service-doctor.jpg";
import { waLink } from "@/lib/contact";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-semibold text-brand-deep border border-[color:var(--brand-soft)] shadow-soft">
            <span className="h-2 w-2 rounded-full bg-[color:var(--whatsapp)] animate-pulse" />
            Atención disponible 24/7 en Región Metropolitana
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-brand-deep">
            Atención médica y cuidados profesionales en la{" "}
            <span className="text-brand">comodidad de tu hogar</span>.
          </h1>
          <p className="mt-6 text-lg text-ink max-w-xl leading-relaxed">
            Médico a domicilio, enfermería, cuidadoras y atención integral para adultos mayores en Santiago.
            Cuidado humano con estándares de clínica privada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-5 w-5" /> WhatsApp inmediato
            </a>
            <a href="#contacto" className="btn-outline">
              <ClipboardList className="h-5 w-5" /> Solicitar evaluación
            </a>
          </div>

          <ul className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { Icon: Clock, label: "Atención 24/7" },
              { Icon: ShieldCheck, label: "Personal certificado" },
              { Icon: MapPin, label: "Cobertura Región Metropolitana" },
            ].map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-brand-deep font-medium">
                <span className="h-8 w-8 grid place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--brand)]/20 to-transparent blur-2xl" aria-hidden />
          <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white">
            <img
              src={heroImg}
              alt="Profesional de salud cuidando a una adulta mayor en casa"
              width={1280}
              height={1280}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card px-5 py-4 flex items-center gap-3 border border-[color:var(--brand-soft)]">
            <div className="h-12 w-12 rounded-full bg-brand-soft grid place-items-center text-brand">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-ink">Más de</p>
              <p className="font-display font-bold text-brand-deep">+1.500 familias atendidas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
