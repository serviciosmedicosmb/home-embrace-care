import { ArrowRight, Stethoscope, Syringe, Users, Bed, Bandage, Activity } from "lucide-react";
import doctorImg from "@/assets/service-doctor.jpg";
import nurseImg from "@/assets/service-nurse.jpg";
import elderlyImg from "@/assets/service-elderly.jpg";
import bedriddenImg from "@/assets/service-bedridden.jpg";
import postopImg from "@/assets/service-postop.jpg";
import controlImg from "@/assets/service-control.jpg";
import { waLink } from "@/lib/contact";

const services = [
  { Icon: Stethoscope, title: "Médico a domicilio", desc: "Consulta médica integral en tu hogar con profesionales colegiados.", img: doctorImg, price: "$80.000 / consulta" },
  { Icon: Syringe, title: "Enfermería domiciliaria", desc: "Curaciones, inyecciones, sueros y procedimientos clínicos seguros.", img: nurseImg, price: "$60.000 / consulta" },
  { Icon: Users, title: "Cuidados adulto mayor", desc: "Acompañamiento, higiene, alimentación y compañía profesional.", img: elderlyImg, price: "$110.000 / día" },
  { Icon: Bed, title: "Pacientes postrados", desc: "Cuidado especializado, prevención de escaras y movilización.", img: bedriddenImg, price: "$120.000 / día" },
  { Icon: Bandage, title: "Cuidados postoperatorios", desc: "Recuperación segura en casa con seguimiento clínico continuo.", img: postopImg, price: "$120.000 / día" },
  { Icon: Activity, title: "Control clínico", desc: "Monitoreo de signos vitales, medicamentos y reportes familiares.", img: controlImg, price: "Cotización a medida" },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Atención integral para tu familia</h2>
          <p className="mt-4 text-ink">Servicios médicos y de cuidado certificados, diseñados para acompañar cada etapa.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ Icon, title, desc, img, price }) => (
            <article key={title} className="card-premium overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 h-11 w-11 rounded-xl bg-white/95 backdrop-blur grid place-items-center text-brand shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-display font-bold">{title}</h3>
                  <span className="shrink-0 text-xs font-display font-semibold text-brand bg-brand-soft px-2.5 py-1 rounded-full">{price}</span>
                </div>
                <p className="mt-2 text-ink text-sm leading-relaxed flex-1">{desc}</p>
                <a
                  href={waLink(`Hola, quiero cotizar el servicio de ${title}.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-brand font-display font-semibold text-sm group"
                >
                  Cotizar servicio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
