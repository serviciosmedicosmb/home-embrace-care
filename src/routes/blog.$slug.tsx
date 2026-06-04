import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Clock, ArrowLeft, BookOpen, Calendar, Tag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { waLink } from "@/lib/contact";
import { getPostBySlug, formatDate, POSTS } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: ArticlePage,
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} | Blog Servicios Médicos MB` : "Artículo | Blog Servicios Médicos MB";
    const description = post?.excerpt ?? "Recurso de salud y atención domiciliaria.";
    return {
      meta: [
        { title: post?.metaTitle ?? title },
        { name: "description", content: post?.metaDescription ?? description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(post?.image ? [{ property: "og:image", content: post.image }] : []),
      ],
      links: [
        { rel: "canonical", href: `https://home-embrace-care.lovable.app/blog/${params.slug}` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Header />
      <div className="text-center px-5">
        <h1 className="text-3xl">Artículo no encontrado</h1>
        <p className="mt-3 text-ink">El artículo que buscas no existe o aún no ha sido publicado.</p>
        <Link to="/blog" className="btn-primary mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-3xl">Ocurrió un error</h1>
        <button onClick={reset} className="btn-primary mt-6">Reintentar</button>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  // Placeholder index/contenido — el contenido completo se publicará próximamente
  const sections = [
    { id: "introduccion", title: "Introducción" },
    { id: "puntos-clave", title: "Puntos clave" },
    { id: "recomendaciones", title: "Recomendaciones" },
    { id: "conclusion", title: "Conclusión" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-28 md:pt-32 pb-12 hero-gradient">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep transition"
            >
              <ArrowLeft className="h-4 w-4" /> Volver al blog
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft text-brand font-semibold">
                <Tag className="h-3.5 w-3.5" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min de lectura
              </span>
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl text-brand-deep leading-[1.1]">{post.title}</h1>
            <p className="mt-5 text-lg text-ink">{post.excerpt}</p>
          </div>
        </section>

        {post.image && (
          <section className="bg-white">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
              <div className="rounded-3xl overflow-hidden shadow-card -mt-4">
                <img
                  src={post.image}
                  alt={post.title}
                  width={1280}
                  height={800}
                  className="w-full h-auto aspect-[16/10] object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* CONTENT + TOC */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-12">
            <article className="prose-custom max-w-none">
              <h2 id="introduccion" className="text-2xl md:text-3xl text-brand-deep">Introducción</h2>
              <p className="mt-4 text-ink leading-relaxed">
                Este artículo forma parte del blog de Servicios Médicos MB. Nuestro equipo está preparando el
                contenido completo de esta guía. Mientras tanto, si tiene una consulta urgente o necesita orientación
                profesional, puede escribirnos por WhatsApp y un especialista lo atenderá a la brevedad.
              </p>

              <h2 id="puntos-clave" className="mt-10 text-2xl md:text-3xl text-brand-deep">Puntos clave</h2>
              <ul className="mt-4 space-y-2 text-ink list-disc pl-6">
                <li>Información práctica orientada a familias.</li>
                <li>Recomendaciones basadas en experiencia clínica.</li>
                <li>Recursos para tomar decisiones informadas.</li>
              </ul>

              <h2 id="recomendaciones" className="mt-10 text-2xl md:text-3xl text-brand-deep">Recomendaciones</h2>
              <p className="mt-4 text-ink leading-relaxed">
                Si su familiar requiere atención médica, de enfermería o acompañamiento permanente, nuestro equipo
                puede ayudarle a evaluar la mejor alternativa en la comodidad del hogar.
              </p>

              <h2 id="conclusion" className="mt-10 text-2xl md:text-3xl text-brand-deep">Conclusión</h2>
              <p className="mt-4 text-ink leading-relaxed">
                Cuidar a un ser querido es una decisión profundamente personal. Estamos para acompañarle en cada paso
                con un equipo profesional, humano y disponible cuando lo necesite.
              </p>

              <div className="mt-10 rounded-3xl bg-brand-soft p-7">
                <h3 className="text-xl text-brand-deep">¿Necesita orientación inmediata?</h3>
                <p className="mt-2 text-ink">Hable con un profesional de nuestro equipo por WhatsApp.</p>
                <a
                  href={waLink(`Hola, leí el artículo "${post.title}" y quisiera orientación.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-5"
                >
                  <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
                </a>
              </div>
            </article>

            {/* TOC */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl border border-[color:var(--brand-soft)] bg-white p-6 shadow-soft">
                <h4 className="text-sm uppercase tracking-[0.2em] text-brand font-semibold">Contenido</h4>
                <nav className="mt-4 flex flex-col gap-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-sm text-brand-deep/80 hover:text-brand transition py-1"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="py-16 md:py-20 bg-surface">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="text-2xl md:text-3xl">Artículos relacionados</h2>
              <div className="mt-8 grid md:grid-cols-3 gap-7">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="card-premium overflow-hidden flex flex-col group"
                  >
                    <div className="aspect-[16/10] bg-brand-soft overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full grid place-items-center">
                          <BookOpen className="h-10 w-10 text-brand/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-brand">{p.category}</span>
                      <h3 className="mt-2 text-lg text-brand-deep group-hover:text-brand transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
