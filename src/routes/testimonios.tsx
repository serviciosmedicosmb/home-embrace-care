import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Quote, Send, Star, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { StarRating, InteractiveStarRating } from "@/components/site/StarRating";
import { supabase } from "@/integrations/supabase/client";
import { waLink } from "@/lib/contact";
import {
  SERVICES,
  GOOGLE_REVIEWS_URL,
  formatTestimonialDate,
  type Testimonial,
} from "@/lib/testimonials";
import { z } from "zod";

export const Route = createFileRoute("/testimonios")({
  component: TestimoniosPage,
  head: () => ({
    meta: [
      { title: "Testimonios de Pacientes y Familias | Servicios Médicos MB" },
      {
        name: "description",
        content:
          "Experiencias reales de pacientes y familias que han recibido atención médica a domicilio, enfermería, cuidados de adulto mayor y servicios profesionales en casa en Santiago.",
      },
      {
        name: "keywords",
        content:
          "testimonios atención médica a domicilio, reseñas enfermería a domicilio, cuidadoras adulto mayor Santiago, opiniones servicios médicos a domicilio, atención profesional en casa",
      },
      { property: "og:title", content: "Lo que dicen nuestros pacientes — Servicios Médicos MB" },
      {
        property: "og:description",
        content:
          "La confianza de nuestros pacientes es nuestro mayor respaldo. Conoce experiencias reales de atención médica domiciliaria.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Ingrese su nombre completo").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  service: z.string().min(1, "Seleccione un servicio"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10, "Comentario muy corto").max(1000),
});

function TestimoniosPage() {
  const { data: testimonials = [], isLoading, refetch } = useQuery({
    queryKey: ["testimonials", "approved"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await (supabase as any)
        .from("approved_testimonials")
        .select("id,name,relation,service,rating,comment,featured,created_at")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as any[]).map((r) => ({
        ...r,
        email: null,
        status: "approved" as const,
        updated_at: r.created_at,
      })) as Testimonial[];
    },
  });

  const aggregate = useMemo(() => {
    if (!testimonials.length) return { count: 0, avg: 5 };
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return { count: testimonials.length, avg: Math.round((sum / testimonials.length) * 10) / 10 };
  }, [testimonials]);

  const schemaJsonLd = useMemo(() => {
    if (!testimonials.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Servicios Médicos MB",
      areaServed: "Santiago, Chile",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregate.avg,
        reviewCount: aggregate.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: testimonials.slice(0, 10).map((t) => ({
        "@type": "Review",
        author: { "@type": "Person", name: t.name },
        datePublished: t.created_at.slice(0, 10),
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: t.comment,
      })),
    };
  }, [testimonials, aggregate]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloatingWhatsApp />

      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-brand-soft via-white to-brand-soft/40">
          <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-[color:var(--brand-soft)] text-sm text-brand-deep">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{aggregate.avg.toFixed(1)} · {aggregate.count} {aggregate.count === 1 ? "experiencia" : "experiencias"}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold text-brand-deep leading-tight">
              Lo que dicen nuestros pacientes y sus familias
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink/80 max-w-3xl mx-auto leading-relaxed">
              La confianza de nuestros pacientes es nuestro mayor respaldo. Conoce las experiencias de
              quienes han recibido atención profesional en su hogar.
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand)]" />
              </div>
            ) : testimonials.length === 0 ? (
              <p className="text-center text-ink/70 py-16">
                Aún no hay testimonios publicados. ¡Sé el primero en compartir tu experiencia!
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Google Reviews CTA */}
        <section className="py-16 md:py-20 bg-brand-soft/40">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="rounded-3xl bg-white shadow-card border border-[color:var(--brand-soft)] p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white mb-4">
                <Star className="h-7 w-7 fill-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-deep">
                ¿Recibiste atención de nuestro equipo?
              </h2>
              <p className="mt-3 text-ink/80 max-w-2xl mx-auto">
                Tu opinión ayuda a otras familias a encontrar atención médica confiable y de calidad.
              </p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-deep text-white font-semibold hover:bg-brand-deep/90 transition shadow-soft"
              >
                Dejar una reseña en Google <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Submit Form */}
        <SubmitForm onSubmitted={() => refetch()} />

        {/* WhatsApp CTA */}
        <section className="py-16 bg-brand-deep text-white">
          <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              ¿Necesitas atención médica profesional en casa?
            </h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">
              Nuestro equipo está disponible para ayudarte. Atención inmediata vía WhatsApp.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe57] transition"
            >
              <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group relative rounded-2xl bg-white border border-[color:var(--brand-soft)] p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 flex flex-col">
      {t.featured && (
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-amber-400 text-brand-deep text-xs font-bold uppercase tracking-wide shadow">
          Destacado
        </span>
      )}
      <Quote className="h-8 w-8 text-[color:var(--brand)] opacity-30" />
      <StarRating value={t.rating} className="mt-3" />
      <p className="mt-4 text-ink/85 leading-relaxed flex-1">"{t.comment}"</p>
      <footer className="mt-6 pt-4 border-t border-[color:var(--brand-soft)]">
        <p className="font-semibold text-brand-deep">{t.name}</p>
        <p className="text-sm text-ink/70">
          {t.relation || t.service || "Familiar"} · {formatTestimonialDate(t.created_at)}
        </p>
      </footer>
    </article>
  );
}

function SubmitForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", comment: "" });
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = testimonialSchema.safeParse({ ...form, rating });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      service: parsed.data.service,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      status: "pending",
      featured: false,
    });
    setSubmitting(false);
    if (error) {
      setErrors({ form: "No pudimos enviar tu testimonio. Intenta de nuevo." });
      return;
    }
    setSuccess(true);
    setForm({ name: "", email: "", service: "", comment: "" });
    setRating(5);
    onSubmitted();
  }

  return (
    <section id="enviar" className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-deep">
            Comparte tu experiencia
          </h2>
          <p className="mt-3 text-ink/80">
            Tu testimonio será revisado por nuestro equipo antes de publicarse.
          </p>
        </div>

        {success ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
            <h3 className="mt-4 font-display text-xl font-bold text-brand-deep">
              ¡Gracias por compartir tu experiencia!
            </h3>
            <p className="mt-2 text-ink/80">
              Tu testimonio quedó registrado y será revisado antes de publicarse.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 text-sm font-semibold text-[color:var(--brand)] hover:underline"
            >
              Enviar otro testimonio
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[color:var(--brand-soft)] shadow-card p-6 md:p-8 space-y-5">
            <Field label="Nombre completo" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="input"
                required
              />
            </Field>

            <Field label="Correo electrónico" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="input"
                required
              />
            </Field>

            <Field label="Servicio recibido" error={errors.service}>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="input"
                required
              >
                <option value="">Selecciona un servicio</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Calificación">
              <InteractiveStarRating value={rating} onChange={setRating} />
            </Field>

            <Field label="Comentario" error={errors.comment}>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                maxLength={1000}
                rows={5}
                className="input resize-none"
                required
              />
              <p className="mt-1 text-xs text-ink/60">{form.comment.length}/1000</p>
            </Field>

            {errors.form && (
              <p className="text-sm text-red-600">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[color:var(--brand)] text-white font-semibold hover:bg-brand-deep transition disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Enviar Testimonio
            </button>
          </form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--brand-soft);
          background: white;
          color: var(--brand-deep);
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-deep mb-2">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
