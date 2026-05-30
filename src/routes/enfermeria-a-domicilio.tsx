import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Phone, ShieldCheck, Clock, HeartPulse, MapPin, Syringe, Droplet, Bandage, Activity, Stethoscope, UserCheck, Home, Plus, Minus, ClipboardList, Pill, FlaskConical, Scissors, ShieldPlus, HandHeart, Send } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import heroImg from "@/assets/enfermeria-domicilio-hero.jpg";

export const Route = createFileRoute("/enfermeria-a-domicilio")({
  component: EnfermeriaDomicilioPage,
  head: () => ({
    meta: [
      { title: "Enfermería a Domicilio en Santiago — Servicios Médicos MB" },
      { name: "description", content: "Cuidados de enfermería profesionales y procedimientos clínicos en su hogar. TENS, curaciones, vías IV/IM, sondas, vacunas y más en toda la Región Metropolitana." },
      { property: "og:title", content: "Enfermería a Domicilio en Santiago — Servicios Médicos MB" },
      { property: "og:description", content: "Atención de enfermería certificada en casa: procedimientos clínicos, cuidados paliativos y seguimiento humano 24/7." },
    ],
  }),
});

const services = [
  { Icon: Clock, title: "TENS a domicilio 12 horas", desc: "Asistencia técnica de enfermería en turnos de día o noche." },
  { Icon: Clock, title: "TENS a domicilio 24 horas", desc: "Acompañamiento continuo con relevos profesionales." },
  { Icon: Bandage, title: "Curaciones simples", desc: "Limpieza y manejo de heridas no complejas en el hogar." },
  { Icon: ShieldPlus, title: "Curaciones avanzadas", desc: "Heridas crónicas, úlceras por presión y manejo con apósitos especializados." },
  { Icon: Droplet, title: "Medicamentos vía intravenosa (IV)", desc: "Administración segura por enfermería certificada." },
  { Icon: Syringe, title: "Medicamentos vía intramuscular (IM)", desc: "Aplicación de inyectables prescritos por médico tratante." },
  { Icon: Droplet, title: "Instalación de sueros y soluciones IV", desc: "Hidratación parenteral y terapias endovenosas en casa." },
  { Icon: Scissors, title: "Retiro de puntos de sutura", desc: "Procedimiento clínico ambulatorio en tu hogar." },
  { Icon: Pill, title: "Instalación y manejo de sonda Foley", desc: "Instalación, recambio y cuidados de sondaje vesical." },
  { Icon: ShieldPlus, title: "Aplicación de vacunas", desc: "Vacunación a domicilio con cadena de frío garantizada." },
  { Icon: Activity, title: "Control de signos vitales", desc: "Presión, saturación, glicemia, frecuencia y temperatura." },
  { Icon: FlaskConical, title: "Toma de muestras", desc: "Coordinación con laboratorios para análisis clínicos." },
  { Icon: Stethoscope, title: "Monitoreo clínico de pacientes", desc: "Evaluación continua e informe a la familia y médico tratante." },
  { Icon: HeartPulse, title: "Cuidados postoperatorios", desc: "Recuperación segura tras cirugías ambulatorias o mayores." },
];

const benefits = [
  { Icon: Home, title: "Atención en el hogar", desc: "El paciente recibe cuidados en su entorno familiar, seguro y cómodo." },
  { Icon: ShieldCheck, title: "Profesionales capacitados", desc: "Enfermeras y TENS certificados con experiencia clínica." },
  { Icon: HeartPulse, title: "Mayor comodidad", desc: "Menos estrés, mejor descanso y recuperación más rápida." },
  { Icon: UserCheck, title: "Menor riesgo de traslados", desc: "Evitamos desplazamientos innecesarios y exposición a contagios." },
  { Icon: ClipboardList, title: "Seguimiento continuo", desc: "Reportes clínicos y comunicación directa con la familia." },
];

const communes = [
  "Santiago Centro", "Providencia", "Las Condes", "Vitacura", "Lo Barnechea", "Ñuñoa",
  "La Reina", "Macul", "Peñalolén", "La Florida", "Puente Alto", "San Miguel",
  "Maipú", "Estación Central", "Quilicura", "Huechuraba", "Recoleta", "Independencia",
];

const faqs = [
  { q: "¿Qué valor tiene la visita de enfermería?", a: "La consulta de enfermería domiciliaria tiene un valor desde $60.000 CLP. Turnos TENS 12/24 horas y planes mensuales se cotizan según el caso." },
  { q: "¿Necesito una orden médica para los procedimientos?", a: "Para administración de medicamentos, curaciones avanzadas, sondas y terapias IV se requiere indicación médica vigente. Si no la tienes, podemos coordinar una consulta previa." },
  { q: "¿En cuánto tiempo llegan?", a: "Coordinamos la visita en menos de 24 horas. En casos urgentes intentamos llegar el mismo día." },
  { q: "¿Ofrecen turnos nocturnos?", a: "Sí, contamos con TENS y enfermeras para turnos de día, noche y 24 horas con relevos profesionales." },
  { q: "¿Atienden en toda la Región Metropolitana?", a: "Sí, cubrimos todas las comunas de la RM. Confirmamos disponibilidad al momento de coordinar." },
];

function EnfermeriaDomicilioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: "", mensaje: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, solicito enfermería a domicilio.%0A%0ANombre: ${form.nombre}%0ATeléfono: ${form.telefono}%0AServicio: ${form.servicio}%0AMensaje: ${form.mensaje}`;
    window.open(`https://wa.me/56965824407?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 radial-glow pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-semibold text-brand-deep border border-[color:var(--brand-soft)] shadow-soft">
                <span className="h-2 w-2 rounded-full bg-[color:var(--whatsapp)] animate-pulse" />
                Enfermería certificada · 24/7 en Región Metropolitana
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-brand-deep">
                Enfermería a Domicilio en <span className="text-brand">Santiago</span>
              </h1>
              <p className="mt-6 text-lg text-ink max-w-xl leading-relaxed">
                Cuidados de enfermería profesionales y procedimientos clínicos en la comodidad de su hogar.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink("Hola, necesito coordinar enfermería a domicilio.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> WhatsApp inmediato
                </a>
                <a href="tel:+56965824407" className="btn-outline">
                  <Phone className="h-5 w-5" /> Llamar ahora
                </a>
              </div>

              <ul className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
                {[
                  { Icon: Clock, label: "Turnos 12 y 24 hrs" },
                  { Icon: ShieldCheck, label: "Personal certificado" },
                  { Icon: MapPin, label: "Cobertura RM" },
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
                <img src={heroImg} alt="Enfermera profesional atendiendo a paciente en su hogar" width={862} height={1222} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Nuestros servicios de enfermería</h2>
              <p className="mt-4 text-ink">Procedimientos clínicos realizados por enfermeras y TENS certificados, con materiales de calidad hospitalaria.</p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(({ Icon, title, desc }) => (
                <article key={title} className="card-premium p-6">
                  <div className="h-12 w-12 rounded-2xl bg-brand-soft text-brand grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-display font-bold text-brand-deep">{title}</h3>
                  <p className="mt-2 text-ink text-sm leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PALLIATIVE CARE */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--brand)]/15 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white">
                <img src={heroImg} alt="Enfermera entregando cuidados paliativos a paciente" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cuidados paliativos</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Acompañamiento integral en el hogar</h2>
              <p className="mt-5 text-ink leading-relaxed">
                Nuestro equipo de enfermería brinda acompañamiento integral a pacientes con enfermedades avanzadas o terminales, entregando cuidados profesionales, control de síntomas, apoyo a la familia y atención humanizada en el hogar.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Control del dolor y manejo de síntomas",
                  "Apoyo emocional al paciente y su familia",
                  "Coordinación con médico tratante",
                  "Cuidados personalizados según cada etapa",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-brand-deep">
                    <span className="h-6 w-6 grid place-items-center rounded-full bg-brand-soft text-brand shrink-0 mt-0.5">
                      <HandHeart className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
              <a href={waLink("Hola, necesito información sobre cuidados paliativos a domicilio.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
                <MessageCircle className="h-5 w-5" /> Conversar con un profesional
              </a>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 md:py-28 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Beneficios</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">¿Por qué elegir enfermería a domicilio?</h2>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map(({ Icon, title, desc }) => (
                <article key={title} className="card-premium p-7">
                  <div className="h-12 w-12 rounded-2xl bg-brand-soft text-brand grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-display font-bold">{title}</h3>
                  <p className="mt-2 text-ink text-sm leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand uppercase tracking-wider">Cobertura</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Atendemos toda la Región Metropolitana</h2>
              <p className="mt-5 text-ink leading-relaxed">
                Nuestro equipo de enfermería se desplaza a tu domicilio en cualquier comuna de Santiago. Coordinamos visitas puntuales o turnos continuos según la necesidad clínica del paciente.
              </p>
              <a href={waLink("Hola, quiero confirmar cobertura de enfermería en mi comuna.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
                <MessageCircle className="h-5 w-5" /> Verificar mi comuna
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {communes.map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-xl bg-white border border-[color:var(--brand-soft)] px-3 py-2.5 text-sm text-brand-deep font-medium shadow-soft">
                  <MapPin className="h-4 w-4 text-brand shrink-0" /> {c}
                </div>
              ))}
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
        <section className="py-20 md:py-28 bg-brand-deep relative overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                Solicite atención de enfermería a domicilio hoy mismo
              </h2>
              <p className="mt-5 text-white/80 text-lg">
                Coordinamos su visita o turno con personal certificado. Trato humano y respuesta inmediata.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink("Hola, necesito enfermería a domicilio.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
                </a>
                <a href="tel:+56965824407" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                  <Phone className="h-5 w-5" /> Llamar ahora
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
                  <option value="Cuidados paliativos" className="text-brand-deep">Cuidados paliativos</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Mensaje</label>
                <textarea
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Cuéntanos brevemente la situación del paciente"
                />
              </div>
              <button type="submit" className="btn-whatsapp w-full justify-center">
                <Send className="h-4 w-4" /> Enviar solicitud
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
