import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ShieldCheck, AlertTriangle, HeartHandshake, LifeBuoy, MessageCircle, FileText } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import logo from "@/assets/logo.png";

const PDF_URL = "/guia-proteccion-adultos-mayores.pdf";
const WA_MSG = "Hola, descargué la guía de protección para adultos mayores y quisiera recibir información sobre el servicio de cuidadoras domiciliarias.";

export const Route = createFileRoute("/guia-proteccion")({
  component: GuiaProteccion,
  head: () => ({
    meta: [
      { title: "Recurso gratuito para las familias | Servicios Médicos MB" },
      { name: "description", content: "Descarga gratuitamente una guía práctica para reconocer y prevenir estafas dirigidas a adultos mayores." },
      { property: "og:title", content: "Recurso gratuito para las familias | Servicios Médicos MB" },
      { property: "og:description", content: "Descarga gratuitamente una guía práctica para reconocer y prevenir estafas dirigidas a adultos mayores." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://home-embrace-care.lovable.app/guia-proteccion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://home-embrace-care.lovable.app/guia-proteccion" }],
  }),
});

function GuiaProteccion() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#17324D]">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Servicios Médicos MB" className="h-11 w-11 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-[#1E4E8C] text-base">Servicios Médicos MB</span>
              <span className="text-[11px] tracking-wide text-[#5F6F7F] uppercase">Cuidamos lo que más importa</span>
            </div>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#1E4E8C] text-white">
          <div aria-hidden className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-[#00C4A8]/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#7CC6FE]/20 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-5 lg:px-8 py-16 md:py-24 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#00C4A8]/15 border border-[#00C4A8]/40 mb-6">
              <ShieldCheck className="h-8 w-8 text-[#00C4A8]" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Recurso gratuito para las familias
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Una guía creada para ayudar a reconocer estafas, prevenir situaciones de riesgo y proteger a los adultos mayores que más queremos.
            </p>
            <p className="mt-4 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
              Esta guía fue creada para ayudar a las familias a identificar señales de alerta, actuar con mayor seguridad y conversar con los adultos mayores sobre situaciones de riesgo.
            </p>
          </div>
        </section>

        {/* Tarjeta descarga */}
        <section className="px-5 lg:px-8 -mt-14 md:-mt-16 relative z-10">
          <div className="mx-auto max-w-2xl bg-white rounded-3xl shadow-[0_20px_60px_-25px_rgba(30,78,140,0.35)] border border-[#E6ECF7] p-7 md:p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-[#00C4A8]/10 grid place-items-center">
              <FileText className="h-7 w-7 text-[#00C4A8]" />
            </div>
            <h2 className="mt-5 font-display font-bold text-2xl md:text-3xl text-[#17324D]">
              Guía para proteger a los adultos mayores de estafas
            </h2>
            <p className="mt-3 text-[#5F6F7F] text-base leading-relaxed">
              Un recurso práctico y gratuito con recomendaciones claras para reconocer engaños, prevenir pérdidas de dinero y saber cómo actuar ante una situación sospechosa.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="guia-proteccion-adultos-mayores.pdf"
              className="mt-7 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-[#00C4A8] hover:bg-[#00b298] transition-colors px-8 py-4 font-display font-semibold text-white text-base shadow-[0_10px_30px_-10px_rgba(0,196,168,0.6)] focus:outline-none focus:ring-4 focus:ring-[#00C4A8]/30"
            >
              <Download className="h-5 w-5" />
              Descargar guía gratuita
            </a>
            <p className="mt-4 text-xs text-[#5F6F7F]">
              Documento PDF · Acceso gratuito · Lectura aproximada de pocos minutos
            </p>
          </div>
        </section>

        {/* Qué encontrarás */}
        <section className="px-5 lg:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display font-bold text-2xl md:text-3xl text-[#17324D]">
              Qué encontrarás
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {[
                { icon: AlertTriangle, title: "Señales de alerta", text: "Aprende a identificar llamadas, mensajes y solicitudes que podrían esconder una estafa." },
                { icon: ShieldCheck, title: "Cómo protegerlos", text: "Conoce acciones simples para reducir riesgos y mejorar la seguridad cotidiana." },
                { icon: LifeBuoy, title: "Qué hacer", text: "Descubre cómo reaccionar y a quién recurrir cuando una situación parece sospechosa." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white rounded-2xl border border-[#E6ECF7] p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-[#00C4A8]/10 grid place-items-center">
                    <Icon className="h-6 w-6 text-[#00C4A8]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg text-[#17324D]">{title}</h3>
                  <p className="mt-2 text-sm text-[#5F6F7F] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mensaje emocional */}
        <section className="px-5 lg:px-8 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <HeartHandshake className="h-10 w-10 text-[#00C4A8] mx-auto" strokeWidth={1.5} />
            <p className="mt-5 font-display text-xl md:text-2xl text-[#17324D] leading-relaxed">
              Proteger a nuestros padres y abuelos también significa ayudarlos a sentirse seguros, escuchados y acompañados.
            </p>
            <p className="mt-4 text-[#5F6F7F] text-base">
              Una conversación a tiempo puede evitar una situación difícil.
            </p>
          </div>
        </section>

        {/* CTA cuidadoras */}
        <section className="px-5 lg:px-8 pb-20">
          <div className="mx-auto max-w-4xl bg-white rounded-3xl border border-[#E6ECF7] shadow-sm p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#17324D]">
              ¿Necesitas apoyo para cuidar a un adulto mayor?
            </h2>
            <p className="mt-4 text-[#5F6F7F] max-w-2xl mx-auto">
              En Servicios Médicos MB contamos con cuidadoras domiciliarias que brindan acompañamiento, asistencia y apoyo personalizado en el hogar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cuidadora-adulto-mayor"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4E8C] hover:bg-[#173e70] transition-colors px-7 py-4 font-display font-semibold text-white"
              >
                Conocer servicio de cuidadoras
              </Link>
              <a
                href={waLink(WA_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fbb59] transition-colors px-7 py-4 font-display font-semibold text-white"
              >
                <MessageCircle className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
