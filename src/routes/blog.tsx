import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircle, Search, Clock, ArrowRight, Star, BookOpen, Mail, Sparkles, ClipboardList } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import { POSTS, CATEGORIES, formatDate, type BlogCategory } from "@/lib/blog";
import heroImg from "@/assets/blog-hero.jpg";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog de Salud y Atención Domiciliaria | Servicios Médicos MB" },
      {
        name: "description",
        content:
          "Consejos de salud, atención domiciliaria, enfermería, cuidados paliativos y cuidado de adultos mayores. Información práctica para pacientes y familias.",
      },
      { property: "og:title", content: "Blog de Salud y Atención Domiciliaria | Servicios Médicos MB" },
      {
        property: "og:description",
        content:
          "Guías y recursos sobre médico a domicilio, enfermería, cuidadoras y adulto mayor para familias en Santiago.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://home-embrace-care.lovable.app/blog" }],
  }),
});

const FILTERS = ["Todos", ...CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

function BlogPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [newsletter, setNewsletter] = useState({ name: "", email: "" });

  const featured = useMemo(() => POSTS.filter((p) => p.featured), []);
  const news = useMemo(() => POSTS.filter((p) => p.category === "Noticias y Novedades"), []);
  const articles = useMemo(
    () => POSTS.filter((p) => p.category !== "Noticias y Novedades"),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((p) => {
      const matchesCat = filter === "Todos" || p.category === filter;
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [articles, query, filter]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, quisiera suscribirme al newsletter.\nNombre: ${newsletter.name}\nCorreo: ${newsletter.email}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 radial-glow pointer-events-none" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                <BookOpen className="h-3.5 w-3.5" /> Blog y Recursos de Salud
              </span>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display text-brand-deep leading-[1.05]">
                Blog de Salud y Atención Domiciliaria
              </h1>
              <p className="mt-6 text-lg text-ink max-w-xl">
                Consejos, guías prácticas y recursos para familias que necesitan apoyo médico, enfermería domiciliaria,
                cuidados paliativos o cuidado de adultos mayores.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#articulos" className="btn-primary">
                  Explorar Artículos <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={waLink("Hola, quisiera orientación sobre atención a domicilio.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" /> Solicitar Orientación por WhatsApp
                </a>
              </div>
            </div>
            <div className="relative animate-fade">
              <div className="relative rounded-[2rem] overflow-hidden shadow-glow border border-[color:var(--brand-soft)]">
                <img
                  src={heroImg}
                  alt="Profesional de la salud orientando a una familia en el hogar"
                  width={1536}
                  height={1024}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Destacados</span>
                <h2 className="mt-2 text-3xl md:text-4xl">Artículos Más Leídos</h2>
              </div>
              <p className="text-ink max-w-md">
                Los recursos más consultados por nuestras familias este mes.
              </p>
            </div>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featured.map((p) => (
                <ArticleCard key={p.slug} post={p} highlight />
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH + CATEGORIES */}
        <section id="articulos" className="py-16 md:py-24 bg-surface">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Biblioteca</span>
              <h2 className="mt-2 text-3xl md:text-4xl">Todos los artículos</h2>
              <p className="mt-3 text-ink">
                Filtre por categoría o busque por palabra clave el tema que necesita.
              </p>
            </div>

            <div className="mt-10 max-w-2xl mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Buscar por tema, categoría o palabra clave…"
                className="w-full rounded-full border border-[color:var(--brand-soft)] bg-white pl-14 pr-5 py-4 text-base text-brand-deep placeholder:text-ink/60 shadow-soft focus:outline-none focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/15 transition"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      active
                        ? "bg-brand text-white border-[color:var(--brand)] shadow-soft"
                        : "bg-white text-brand-deep border-[color:var(--brand-soft)] hover:border-[color:var(--brand)] hover:text-brand"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-ink">
                  No encontramos artículos para esa búsqueda. Pruebe otra palabra clave.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* NOTICIAS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Actualidad</span>
                <h2 className="mt-2 text-3xl md:text-4xl">Noticias y Novedades</h2>
              </div>
              <p className="text-ink max-w-md">
                Recomendaciones de temporada, campañas y novedades de Servicios Médicos MB.
              </p>
            </div>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {news.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-brand-deep to-[color:var(--brand)] text-white p-10 md:p-14 shadow-glow relative overflow-hidden">
              <Sparkles className="absolute -top-6 -right-6 h-40 w-40 text-white/10" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                  <Mail className="h-3.5 w-3.5" /> Newsletter
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl text-white">
                  Reciba consejos de salud y cuidado domiciliario
                </h2>
                <p className="mt-3 text-white/85 max-w-xl">
                  Suscríbase y reciba guías prácticas, recomendaciones de temporada y novedades de Servicios Médicos MB.
                </p>
                <form onSubmit={handleNewsletter} className="mt-8 grid sm:grid-cols-[1fr_1fr_auto] gap-3">
                  <input
                    required
                    value={newsletter.name}
                    onChange={(e) => setNewsletter((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Nombre"
                    className="rounded-full bg-white/95 px-5 py-3.5 text-brand-deep placeholder:text-ink/60 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    required
                    type="email"
                    value={newsletter.email}
                    onChange={(e) => setNewsletter((s) => ({ ...s, email: e.target.value }))}
                    placeholder="Correo electrónico"
                    className="rounded-full bg-white/95 px-5 py-3.5 text-brand-deep placeholder:text-ink/60 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-white text-brand-deep font-display font-semibold px-7 py-3.5 hover:-translate-y-0.5 transition-transform shadow-soft"
                  >
                    Suscribirme
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl">¿Necesita ayuda para el cuidado de un familiar?</h2>
            <p className="mt-4 text-lg text-ink max-w-2xl mx-auto">
              Nuestro equipo de médicos, enfermeras, TENS y cuidadoras está disponible para orientarlo y encontrar la
              mejor solución para su situación.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/" hash="contacto" className="btn-primary">
                <ClipboardList className="h-4 w-4" /> Solicitar Evaluación
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
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

function ArticleCard({ post, highlight = false }: { post: (typeof POSTS)[number]; highlight?: boolean }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="card-premium overflow-hidden flex flex-col group"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center bg-gradient-to-br from-brand-soft to-white">
            <BookOpen className="h-12 w-12 text-brand/40" />
          </div>
        )}
        {highlight && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-brand-deep px-3 py-1 text-xs font-semibold shadow-soft">
            <Star className="h-3.5 w-3.5 text-[color:var(--brand)] fill-[color:var(--brand)]" /> Más Leído
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-ink">
          <span className="px-2.5 py-1 rounded-full bg-brand-soft text-brand font-semibold">{post.category}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1 ml-auto">
            <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
          </span>
        </div>
        <h3 className="mt-4 text-xl text-brand-deep leading-snug group-hover:text-brand transition-colors">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-ink line-clamp-3">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Leer Artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export type { BlogCategory };
