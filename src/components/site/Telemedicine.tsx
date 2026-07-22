import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import consultaMedicaOnlineImage from "@/assets/consulta-medica-online-v2.webp";

const TELE_MSG =
  "Hola, quisiera agendar una consulta médica por telemedicina. ¿Podrían indicarme los horarios disponibles?";
const teleWaLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(TELE_MSG)}`;

export function Telemedicine() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div
          ref={ref}
          className={`relative rounded-3xl bg-white border border-[color:var(--brand-soft)] shadow-card overflow-hidden transition-all duration-700 ease-out motion-reduce:transition-opacity ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:translate-y-0"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Imagen */}
            <div className="relative min-h-[280px] lg:min-h-[440px]">
              <span
                aria-hidden
                className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#00C4A8]/20 blur-2xl telemed-pulse"
              />
              <span
                aria-hidden
                className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#7CC6FE]/25 blur-2xl"
              />
              <img
                src={telemedicinaImage}
                alt="Médico atendiendo consulta online por videollamada"
                loading="lazy"
                onError={(e) => {
                  console.error("Telemedicine image failed to load");
                  e.currentTarget.style.display = "none";
                }}
                className="relative z-10 w-full h-full object-cover object-center"
              />
            </div>

            {/* Contenido */}
            <div className="p-8 md:p-12 flex flex-col justify-center text-center lg:text-left">
              <span className="inline-flex self-center lg:self-start items-center gap-2 rounded-full bg-[#00C4A8]/12 text-[#1E4E8C] px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00C4A8]" />
                Nuevo servicio
              </span>

              <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight text-brand-deep">
                Consulta médica Online
              </h2>

              <p className="mt-4 text-ink leading-relaxed max-w-lg mx-auto lg:mx-0">
                Recibe orientación médica profesional desde la comodidad y seguridad de tu hogar.
              </p>

              <div className="mt-6 flex items-baseline justify-center lg:justify-start gap-3">
                <span className="font-display font-bold text-4xl md:text-5xl text-brand-deep">
                  $19.990
                </span>
                <span className="text-sm text-ink">por consulta</span>
              </div>

              <p className="mt-2 text-sm text-ink">
                Atención cercana, rápida y personalizada.
              </p>

              <div className="mt-7 flex flex-col items-center lg:items-start gap-3">
                <a
                  href={teleWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar telemedicina por WhatsApp"
                  className="telemed-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#00C4A8] hover:bg-[#00A88F] text-white px-8 py-4 font-display font-semibold tracking-wide shadow-[0_14px_30px_-12px_rgba(0,196,168,0.55)] transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-colors"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  AGENDAR TELEMEDICINA
                </a>
                <span className="text-xs text-ink">Agenda sencilla por WhatsApp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
