import { MessageCircle, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { waLink, EMAIL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-[#07204A] text-white/80">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-white/10 grid place-items-center text-white font-display font-bold">MB</div>
            <span className="font-display font-bold text-white">Servicios Médicos MB</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed">
            Atención médica y cuidado integral a domicilio con estándares de clínica privada premium.
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 !py-3 !px-5 text-sm">
            <MessageCircle className="h-4 w-4" /> Escríbenos por WhatsApp
          </a>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-sm tracking-wide uppercase">Servicios</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href="#servicios" className="hover:text-white transition">Médico a domicilio</a></li>
            <li><a href="#servicios" className="hover:text-white transition">Enfermería domiciliaria</a></li>
            <li><a href="#servicios" className="hover:text-white transition">Cuidado adulto mayor</a></li>
            <li><a href="#servicios" className="hover:text-white transition">Pacientes postrados</a></li>
            <li><a href="#servicios" className="hover:text-white transition">Postoperatorio</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-sm tracking-wide uppercase">Cobertura</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[color:var(--brand)]" /> Región Metropolitana, Santiago</li>
            <li>Atención disponible 24/7</li>
            <li>Respuesta en menos de 24 horas</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-sm tracking-wide uppercase">Contacto</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--brand)]" /> +56 9 6582 4407</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[color:var(--brand)]" /> <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} Servicios Médicos MB. Todos los derechos reservados.</p>
          <p>Cuidado humano · Profesionalismo clínico</p>
        </div>
      </div>
    </footer>
  );
}
