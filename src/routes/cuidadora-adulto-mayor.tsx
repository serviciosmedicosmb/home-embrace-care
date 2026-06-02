import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  HeartPulse,
  MapPin,
  Home,
  Plus,
  Minus,
  Users,
  Bed,
  Moon,
  Droplets,
  Utensils,
  Pill,
  Move,
  CalendarHeart,
  Smile,
  Sparkles,
  HandHeart,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import heroImg from "@/assets/cuidadora-adulto-mayor-hero.jpg";

export const Route = createFileRoute("/cuidadora-adulto-mayor")({
  component: CuidadoraAdultoMayorPage,
  head: () => ({
    meta: [
      { title: "Cuidadoras de Adulto Mayor a Domicilio en Santiago | Servicios Médicos MB" },
      {
        name: "description",
        content:
          "Servicio de cuidadoras de adulto mayor a domicilio en Santiago. Turnos de 12 y 24 horas para pacientes autovalentes, dependientes o postrados. Atención profesional y personalizada.",
      },
      {
        name: "keywords",
        content:
          "cuidadora adulto mayor, cuidadora a domicilio, cuidado adulto mayor santiago, cuidadora 24 horas, cuidadora 12 horas, paciente postrado, acompañamiento adulto mayor",
      },
      { property: "og:title", content: "Cuidadoras de Adulto Mayor a Domicilio en Santiago" },
      {
        property: "og:description",
        content:
          "Acompañamiento, asistencia y cuidados personalizados para adultos mayores en la comodidad del hogar. Turnos 12/24h en toda la Región Metropolitana.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
});

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto h-24 w-24 rounded-3xl bg-brand-soft text-brand grid place-items-center">
      {children}
    </div>
  );
}

function ClockNumberIcon({ hours }: { hours: 12 | 24 }) {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="19" />
      <path d="M24 9v3M24 36v3M9 24h3M36 24h3" />
      <text x="24" y="29" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="800" fontSize={hours === 12 ? 13 : 12} fill="currentColor" stroke="none">{hours}</text>
    </svg>
  );
}

type Item = { title: string; desc: string; icon: ReactNode };

const services: Item[] = [
  { title: "Turnos de 12 horas", desc: "Cuidados y supervisión durante el día o la noche según las necesidades del paciente.", icon: <ClockNumberIcon hours={12} /> },
  { title: "Turnos de 24 horas", desc: "Acompañamiento continuo para pacientes que requieren atención permanente.", icon: <ClockNumberIcon hours={24} /> },
  { title: "Adultos mayores autovalentes", desc: "Apoyo en actividades cotidianas y acompañamiento para mantener la independencia.", icon: <Users className="h-12 w-12" /> },
  { title: "Dependencia parcial", desc: "Asistencia en tareas específicas y supervisión diaria.", icon: <HandHeart className="h-12 w-12" /> },
  { title: "Pacientes postrados", desc: "Cuidados integrales para personas con movilidad reducida o permanencia en cama.", icon: <Bed className="h-12 w-12" /> },
  { title: "Acompañamiento diurno y nocturno", desc: "Compañía permanente para brindar seguridad y tranquilidad.", icon: <Moon className="h-12 w-12" /> },
  { title: "Higiene personal", desc: "Ayuda en aseo, baño, cambio de ropa y cuidados personales.", icon: <Droplets className="h-12 w-12" /> },
  { title: "Alimentación asistida", desc: "Apoyo durante las comidas y control de hábitos alimenticios.", icon: <Utensils className="h-12 w-12" /> },
  { title: "Administración de medicamentos", desc: "Supervisión y apoyo en la administración de tratamientos indicados por profesionales de salud.", icon: <Pill className="h-12 w-12" /> },
  { title: "Movilización y cambios de posición", desc: "Prevención de complicaciones asociadas a la inmovilidad prolongada.", icon: <Move className="h-12 w-12" /> },
  { title: "Acompañamiento a controles médicos", desc: "Traslado y apoyo durante consultas y procedimientos médicos.", icon: <CalendarHeart className="h-12 w-12" /> },
  { title: "Estimulación emocional y compañía", desc: "Conversación, acompañamiento y apoyo emocional para mejorar la calidad de vida.", icon: <Smile className="h-12 w-12" /> },
];

const audiences = [
  "Adultos mayores autovalentes",
  "Personas con movilidad reducida",
  "Pacientes postoperatorios",
  "Pacientes con enfermedades crónicas",
  "Personas con deterioro cognitivo",
  "Personas que requieren supervisión permanente",
  "Pacientes postrados",
  "Familias que necesitan apoyo temporal o permanente",
];

const benefits: Item[] = [
  { title: "Mayor tranquilidad para la familia", desc: "Sabemos que su ser querido está en buenas manos en todo momento.", icon: <ShieldCheck className="h-12 w-12" /> },
  { title: "Atención personalizada", desc: "Plan de cuidados adaptado a las necesidades de cada paciente.", icon: <HeartPulse className="h-12 w-12" /> },
  { title: "Seguridad y supervisión continua", desc: "Acompañamiento permanente y prevención de riesgos en el hogar.", icon: <ShieldCheck className="h-12 w-12" /> },
  { title: "Permanencia en el entorno familiar", desc: "Su familiar permanece en casa, rodeado de afectos y rutinas conocidas.", icon: <Home className="h-12 w-12" /> },
  { title: "Apoyo emocional permanente", desc: "Compañía cálida que mejora el ánimo y combate la soledad.", icon: <Smile className="h-12 w-12" /> },
  { title: "Prevención de accidentes domésticos", desc: "Supervisión activa para evitar caídas y otros incidentes.", icon: <ShieldCheck className="h-12 w-12" /> },
  { title: "Mejora de la calidad de vida", desc: "Bienestar físico, emocional y social en el día a día.", icon: <Sparkles className="h-12 w-12" /> },
  { title: "Cuidado humano y profesional", desc: "Personal capacitado, respetuoso y comprometido con la dignidad del adulto mayor.", icon: <HandHeart className="h-12 w-12" /> },
];

const communes = [
  "Santiago Centro", "Providencia", "Las Condes", "Vitacura", "Lo Barnechea", "Ñuñoa",
  "La Reina", "Macul", "Estación Central",
];

const faqs = [
  { q: "¿Qué funciones realiza una cuidadora de adulto mayor?", a: "Brinda acompañamiento, asistencia en higiene personal, alimentación, movilización, supervisión de medicamentos, compañía y apoyo emocional, adaptando los cuidados a las necesidades del paciente." },
  { q: "¿Ofrecen turnos de 12 y 24 horas?", a: "Sí. Contamos con turnos diurnos, nocturnos, de 12 y 24 horas con relevos profesionales para garantizar continuidad en el cuidado." },
  { q: "¿Atienden pacientes postrados?", a: "Sí. Tenemos cuidadoras con experiencia en pacientes postrados: cambios de posición, higiene, alimentación asistida y prevención de escaras." },
  { q: "¿Pueden acompañar durante la noche?", a: "Sí. Ofrecemos turnos nocturnos para supervisión, asistencia en levantadas, baño y administración de medicamentos." },
  { q: "¿Las cuidadoras administran medicamentos?", a: "Las cuidadoras supervisan y apoyan la administración de medicamentos según las indicaciones del médico tratante. Para procedimientos clínicos contamos con servicio de enfermería." },
  { q: "¿Qué comunas cubren?", a: "Atendemos toda la Región Metropolitana, incluyendo Santiago Centro, Providencia, Las Condes, Vitacura, Lo Barnechea, Ñuñoa, La Reina, Macul y Estación Central, entre otras." },
  { q: "¿Cómo contratar el servicio?", a: "Puede contactarnos por WhatsApp o teléfono. Evaluamos la situación del paciente y enviamos una propuesta personalizada en menos de 24 horas." },
  { q: "¿Puedo solicitar reemplazos o servicios temporales?", a: "Sí. Ofrecemos servicios temporales, reemplazos por vacaciones, postoperatorios o cualquier situación puntual que requiera apoyo." },
];

function CuidadoraAdultoMayorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: "", mensaje: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, solicito cuidadora de adulto mayor.%0A%0ANombre: ${form.nombre}%0ATeléfono: ${form.telefono}%0AServicio: ${form.servicio}%0AMensaje: ${form.mensaje}`;
    window.open(`https://wa.me/56965824407?text=${msg}`, "_blank");
  };

  const trustItems = [
    "Personal capacitado y seleccionado",
    "Turnos de 12 y 24 horas",
    "Atención en toda la Región Metropolitana",
    "Cuidado humano y personalizado",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 radial-glow pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-5 lg:px-8 animate-fade">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--brand)]/20 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white">
                <img src={heroImg} alt="Cuidadora acompañando a adulto mayor en su hogar" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Nuestros servicios de cuidado</h2>
              <p className="mt-4 text-ink">Cuidadoras capacitadas para asistir a su familiar con respeto, paciencia y profesionalismo.</p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <article key={s.title} className="card-premium p-6 text-center">
                  <IconBox>{s.icon}</IconBox>
                  <h3 className="mt-6 text-base font-display font-bold text-brand-deep">{s.title}</h3>
                  <p className="mt-2 text-ink text-sm leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>

            <article className="mt-10 rounded-3xl overflow-hidden border border-[color:var(--brand-soft)] bg-gradient-to-br from-brand-soft to-white shadow-soft">
              <div className="grid md:grid-cols-[1.4fr_1fr] items-center gap-6 p-8 md:p-12">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-display font-semibold text-brand shadow-soft">
                    <Sparkles className="h-3.5 w-3.5" /> Planes de atención
                  </div>
                  <h3 className="mt-4 text-2xl md:text-3xl font-display font-bold text-brand-deep leading-tight">
                    Contamos con planes pensados para cada necesidad
                  </h3>
                  <p className="mt-3 text-ink max-w-xl">
                    Conoce nuestros planes mensuales de atención integral: cuidadora, enfermería, médico y coordinación clínica adaptados a tu familia.
                  </p>
                </div>
                <div className="md:justify-self-end">
                  <a href="/#planes" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display font-semibold bg-brand-deep text-white hover:bg-[color:var(--brand)] hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5">
                    <Sparkles className="h-5 w-5" /> Ver nuestros planes
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">¿Para quién está dirigido?</h2>
              <p className="mt-4 text-ink">Acompañamos a adultos mayores y familias en distintas etapas y necesidades.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {audiences.map((a) => (
                <div key={a} className="card-premium p-5 flex items-start gap-3">
                  <span className="h-9 w-9 grid place-items-center rounded-xl bg-brand-soft text-brand shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-brand-deep leading-snug">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Beneficios</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Beneficios del servicio</h2>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <article key={b.title} className="card-premium p-6 text-center">
                  <IconBox>{b.icon}</IconBox>
                  <h3 className="mt-6 text-base font-display font-bold text-brand-deep">{b.title}</h3>
                  <p className="mt-2 text-ink text-sm leading-relaxed">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cobertura</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Atendemos toda la Región Metropolitana</h2>
              <p className="mt-5 text-ink leading-relaxed max-w-2xl mx-auto">
                Nuestras cuidadoras se desplazan a su domicilio en cualquier comuna de Santiago. Coordinamos turnos puntuales o permanentes según la necesidad del paciente.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {communes.map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-xl bg-white border border-[color:var(--brand-soft)] px-3 py-2.5 text-sm text-brand-deep font-medium shadow-soft">
                  <MapPin className="h-4 w-4 text-brand shrink-0" /> {c}
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={waLink("Hola, quiero confirmar cobertura de cuidadoras en mi comuna.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="h-5 w-5" /> Verificar mi comuna
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Resolvemos tus dudas</h2>
            </div>
            <div className="mt-12 space-y-4">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="card-premium overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display font-semibold text-brand-deep">{f.q}</span>
                      <span className="h-8 w-8 grid place-items-center rounded-full bg-brand-soft text-brand shrink-0">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 -mt-1 text-ink text-sm leading-relaxed animate-fade">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA + FORM */}
        <section id="contacto" className="py-20 md:py-28 bg-brand-deep relative overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                Encuentre la cuidadora ideal para su familiar
              </h2>
              <p className="mt-5 text-white/80 text-lg">
                Nuestro equipo está preparado para brindar acompañamiento, asistencia y cuidados personalizados para mejorar la calidad de vida de sus seres queridos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink("Hola, necesito un presupuesto de cuidadora de adulto mayor.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> Solicitar Presupuesto
                </a>
                <a href={waLink("Hola, quiero hablar con un asesor sobre cuidadoras.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                  <MessageCircle className="h-5 w-5" /> Hablar por WhatsApp
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 md:p-8 space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80">Nombre</label>
                <input
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Teléfono</label>
                <input
                  required
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  placeholder="+56 9 ..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Servicio requerido</label>
                <select
                  required
                  value={form.servicio}
                  onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="" className="text-brand-deep">Selecciona un servicio</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title} className="text-brand-deep">{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Mensaje</label>
                <textarea
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Cuéntenos brevemente la situación de su familiar"
                />
              </div>
              <button type="submit" className="btn-whatsapp w-full justify-center">
                <MessageCircle className="h-4 w-4" /> Enviar solicitud
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
