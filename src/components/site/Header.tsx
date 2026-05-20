import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#planes", label: "Planes" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-soft" : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-18 md:h-20 flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-deep)] grid place-items-center text-white font-display font-bold shadow-soft">
            MB
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-brand-deep text-base">Servicios Médicos MB</span>
            <span className="text-[11px] tracking-wide text-ink uppercase">Cuidado premium a domicilio</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-deep/80 hover:text-[color:var(--brand)] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:bg-[color:var(--brand)] hover:after:w-full after:transition-all after:duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-5 !py-3 text-sm hidden sm:inline-flex">
            <MessageCircle className="h-4 w-4" /> Atención inmediata
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-11 w-11 rounded-xl border border-[color:var(--brand-soft)] grid place-items-center text-brand-deep"
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--brand-soft)] bg-white animate-fade">
          <nav className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl text-brand-deep hover:bg-brand-soft font-medium"
              >
                {l.label}
              </a>
            ))}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full">
              <MessageCircle className="h-4 w-4" /> Atención inmediata
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
