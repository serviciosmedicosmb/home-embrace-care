import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { waLink } from "@/lib/contact";
import logo from "@/assets/logo.png";

type NavItem =
  | { type: "link"; href: string; label: string; hash?: boolean }
  | { type: "dropdown"; label: string; children: { to: string; label: string }[] };

const nav: NavItem[] = [
  { type: "link", href: "/", label: "Inicio" },
  {
    type: "dropdown",
    label: "Servicios",
    children: [{ to: "/medico-a-domicilio", label: "Médico a Domicilio" }],
  },
  { type: "link", href: "/#nosotros", label: "Nosotros" },
  { type: "link", href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Servicios Médicos MB" className="h-12 w-12 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-brand-deep text-base">Servicios Médicos MB</span>
            <span className="text-[11px] tracking-wide text-ink uppercase">Cuidamos lo que más importa</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) =>
            item.type === "link" ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-brand-deep/80 hover:text-[color:var(--brand)] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:bg-[color:var(--brand)] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="inline-flex items-center gap-1 text-sm font-medium text-brand-deep/80 hover:text-[color:var(--brand)] transition-colors">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[240px] animate-fade">
                    <div className="rounded-2xl bg-white shadow-card border border-[color:var(--brand-soft)] p-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-4 py-3 rounded-xl text-sm font-medium text-brand-deep hover:bg-brand-soft transition"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
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
            {nav.map((item) =>
              item.type === "link" ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 rounded-xl text-brand-deep hover:bg-brand-soft font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <div key={item.label} className="py-1">
                  <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-wider text-ink/70 font-semibold">
                    {item.label}
                  </div>
                  {item.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-3 rounded-xl text-brand-deep hover:bg-brand-soft font-medium"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )
            )}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full">
              <MessageCircle className="h-4 w-4" /> Atención inmediata
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
