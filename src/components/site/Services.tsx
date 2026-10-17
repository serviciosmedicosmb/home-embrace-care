import { useState } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, Stethoscope, Syringe, Users, Bed, Bandage, Activity } from "lucide-react";
import doctorImg from "@/assets/service-doctor.jpg";
import nurseImg from "@/assets/service-nurse.jpg";
import elderlyImg from "@/assets/service-elderly.jpg";
import bedriddenImg from "@/assets/service-bedridden.jpg";
import postopImg from "@/assets/service-postop.jpg";
import controlImg from "@/assets/service-control.jpg";
import { waLink } from "@/lib/contact";

const services = [
  {
    Icon: Stethoscope, title: "Médico a domicilio", img: doctorImg,
    desc: "Atención médica presencial en tu hogar para evaluación, control de salud, seguimiento de tratamientos o segunda opinión médica.",
    price: "Desde $79.990 por consulta", heading: "Incluye:",
    includes: ["Evaluación clínica en domicilio", "Revisión de antecedentes y medicamentos", "Indicaciones y recomendaciones", "Informe o coordinación con la familia, según caso"],
    note: "No incluye: exámenes, traslados, procedimientos complejos ni medicamentos.",
    cta: "Agendar médico a domicilio", message: "Hola, quisiera agendar una consulta médica a domicilio.",
  },
  {
    Icon: Syringe, title: "Enfermería a domicilio", img: nurseImg,
    desc: "Atención de enfermería para cuidados clínicos programados en el hogar, coordinados según indicación médica y necesidad del paciente.",
    price: "Desde $49.990 por visita", heading: "Puede incluir, según evaluación:",
    includes: ["Control de signos vitales", "Curaciones y manejo de heridas", "Administración de medicamentos indicados", "Apoyo en procedimientos de enfermería"],
    note: "Importante: los procedimientos requieren indicación médica cuando corresponda y son evaluados antes de su realización.",
    cta: "Solicitar enfermería a domicilio", message: "Hola, necesito información sobre enfermería a domicilio.",
  },
  {
    Icon: Users, title: "Cuidadora de adulto mayor a domicilio", img: elderlyImg,
    desc: "Acompañamiento, apoyo en la vida diaria y supervisión para adultos mayores que viven solos, tienen movilidad reducida o requieren apoyo permanente.",
    heading: "Incluye según nivel de dependencia:",
    rates: ["Turno de 8 horas: desde $38.990 por día", "Turno de 12 horas: desde $49.990 por día", "Cuidado de 24 horas: desde $99.990 por día"],
    includes: ["Compañía y estimulación", "Preparación y apoyo en alimentación", "Recordatorio y supervisión de medicamentos", "Apoyo en higiene personal", "Prevención de caídas y acompañamiento en desplazamientos", "Reporte a la familia"],
    note: "No incluye: procedimientos clínicos, curaciones, traslados ni aseo general del hogar.",
    cta: "Solicitar cuidadora a domicilio", message: "Hola, quisiera solicitar una evaluación para el servicio de cuidadora de adulto mayor.",
  },
  {
    Icon: Bed, title: "Cuidado de pacientes postrados", img: bedriddenImg,
    desc: "Atención especializada para personas con movilidad reducida o postración, con foco en confort, prevención de complicaciones y apoyo a la familia.",
    price: "Desde $59.990 por día", heading: "Incluye:",
    includes: ["Cambios posturales y movilizaciones", "Higiene y confort", "Medidas de prevención de lesiones por presión", "Apoyo en alimentación e hidratación", "Vigilancia de cambios en el estado general", "Reporte a la familia"],
    note: "No incluye: curaciones complejas, administración de medicamentos intravenosos ni procedimientos que requieran enfermera o médico; se coordinan por separado.",
    cta: "Solicitar evaluación para paciente postrado", message: "Hola, necesito una evaluación para el cuidado de un paciente postrado.",
  },
  {
    Icon: Bandage, title: "Cuidados postoperatorios a domicilio", img: postopImg,
    desc: "Acompañamiento durante la recuperación luego de una cirugía o alta hospitalaria, con foco en movilidad segura, higiene, alimentación y supervisión del estado general.",
    price: "Desde $69.990 por día", heading: "Incluye:",
    includes: ["Evaluación inicial del caso", "Apoyo en movilización segura", "Higiene y confort", "Apoyo en alimentación", "Supervisión de medicamentos indicados", "Reporte a la familia"],
    note: "No incluye: curaciones, retiro de puntos, manejo de sondas o procedimientos clínicos. Se coordinan con enfermería o médico según indicación.",
    cta: "Solicitar cuidado postoperatorio", message: "Hola, quisiera solicitar cuidado postoperatorio a domicilio.",
  },
  {
    Icon: Activity, title: "Control clínico y seguimiento", img: controlImg,
    desc: "Seguimiento periódico para adultos mayores o pacientes con condiciones de salud que requieren control, organización de medicamentos y comunicación con la familia.",
    price: "Cotización según frecuencia y complejidad", heading: "Puede incluir:",
    includes: ["Control de signos vitales", "Organización y supervisión de medicamentos", "Registro de evolución", "Reportes periódicos a la familia", "Coordinación con médico o enfermera, cuando corresponda"],
    note: "Ideal para: pacientes crónicos, adultos mayores con polifarmacia o familias que necesitan seguimiento estructurado.",
    cta: "Solicitar cotización de control clínico", message: "Hola, quisiera solicitar una cotización de control clínico y seguimiento.",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const { Icon, title, desc, img, price, heading, includes, note, cta, message } = service;
  return (
    <article className="card-premium overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={img} alt={title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105" />
        <div className="absolute top-4 left-4 h-11 w-11 rounded-xl bg-white/95 backdrop-blur grid place-items-center text-brand shadow-soft">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-display font-bold text-brand-deep">{title}</h3>
        <p className="mt-3 text-ink text-sm leading-relaxed">{desc}</p>
        <p className="mt-4 self-start max-w-full rounded-xl bg-brand-soft px-3 py-2 text-sm font-display font-bold text-brand-deep">{price}</p>
        <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className="mt-5 inline-flex items-center justify-between gap-2 text-brand font-semibold text-sm text-left">
          {expanded ? "Ver menos" : "Ver qué incluye"}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {expanded && (
          <div className="mt-4 text-sm text-ink leading-relaxed">
            {"rates" in service && service.rates && (
              <ul className="mb-4 space-y-2 font-semibold text-brand-deep">
                {service.rates.map((rate) => <li key={rate}>{rate}</li>)}
              </ul>
            )}
            <p className="font-semibold text-brand-deep">{heading}</p>
            <ul className="mt-2 space-y-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed">{note}</p>
          </div>
        )}
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 inline-flex items-center gap-2 text-brand font-display font-semibold text-sm group">
          {cta}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Servicios de atención a domicilio</h2>
          <p className="mt-4 text-ink">Elige el servicio que necesita tu familiar. Todos los casos comienzan con una evaluación para definir el nivel de cuidado, el horario y el profesional adecuado.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {services.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
      </div>
    </section>
  );
}
