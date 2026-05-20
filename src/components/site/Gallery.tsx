import doctor from "@/assets/service-doctor.jpg";
import nurse from "@/assets/service-nurse.jpg";
import elderly from "@/assets/service-elderly.jpg";
import bedridden from "@/assets/service-bedridden.jpg";
import postop from "@/assets/service-postop.jpg";
import control from "@/assets/service-control.jpg";

const imgs = [
  { src: elderly, alt: "Cuidado adulto mayor", span: "row-span-2" },
  { src: doctor, alt: "Médico a domicilio", span: "" },
  { src: nurse, alt: "Enfermería", span: "" },
  { src: control, alt: "Control clínico", span: "row-span-2" },
  { src: postop, alt: "Cuidado postoperatorio", span: "" },
  { src: bedridden, alt: "Atención a paciente postrado", span: "" },
];

export function Gallery() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Galería</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Cuidado humano, en imágenes</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {imgs.map((i, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-2xl shadow-soft group ${i.span}`}>
              <img
                src={i.src}
                alt={i.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
