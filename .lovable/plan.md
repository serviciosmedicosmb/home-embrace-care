
## Objetivo
Insertar una tarjeta promocional premium de "Consulta médica Online" ($19.990) en la home, justo después del Hero y antes de Services, con CTA a WhatsApp.

## Archivos

1. **`src/assets/telemedicina.jpg`** (nuevo) — subir la imagen adjunta como asset del proyecto vía `lovable-assets` desde `/mnt/user-uploads/`.

2. **`src/components/site/Telemedicine.tsx`** (nuevo) — nuevo componente de sección.

3. **`src/routes/index.tsx`** — importar `<Telemedicine />` y colocarlo entre `<Hero />` y `<Services />`.

## Diseño del componente

Tarjeta única centrada, `max-w-6xl`, `rounded-3xl`, fondo blanco con borde `brand-soft` y `shadow-card`, layout grid 2 columnas en `lg:` (colapsa a 1 columna en móvil).

- **Lado izquierdo (imagen)**: contenedor con `rounded-2xl overflow-hidden`, imagen del médico centrada en su rostro (`object-cover object-center`). Detrás, círculo decorativo turquesa (`#00C4A8`) con baja opacidad y blur, animación `pulse` cada 4s.
- **Lado derecho (contenido)**:
  - Chip superior: "NUEVO SERVICIO" (fondo turquesa translúcido, texto `#1E4E8C`, tracking wide, uppercase).
  - H2 Poppins: "Consulta médica Online".
  - Párrafo Inter (`text-ink`): "Recibe orientación médica profesional desde la comodidad y seguridad de tu hogar."
  - Precio destacado grande: "$19.990" en `text-brand-deep` `font-display`.
  - Texto complementario: "Atención cercana, rápida y personalizada."
  - Botón WhatsApp: fondo `#00C4A8`, texto blanco, `rounded-full`, ícono `MessageCircle`, hover más oscuro + `translate-y-[-2px]` + shadow. Texto "AGENDAR TELEMEDICINA".
  - Bajo el botón: "Agenda sencilla por WhatsApp." (`text-sm text-ink`).

## WhatsApp link
Usar `waLink()` de `@/lib/contact` con mensaje precargado: `"Hola, quisiera agendar una consulta médica por telemedicina. ¿Podrían indicarme los horarios disponibles?"`.

## Animaciones
- Entrada: `IntersectionObserver` en el componente → aplica clase que dispara `fade-up` (600-800ms, una sola vez con flag `useState`).
- Círculo decorativo: keyframe `pulse-soft` (opacidad 0.2 → 0.35, escala 1 → 1.05, 4s ease-in-out infinite).
- Botón: hover con transición suave, sombra + traslado.
- Media query `prefers-reduced-motion: reduce` → deshabilitar transform/pulse, mantener sólo opacity.

Definir keyframes en `src/styles.css` bajo `@layer utilities` con clases `.animate-pulse-soft` y `.animate-fade-up-once`. Respetar `prefers-reduced-motion` con `@media (prefers-reduced-motion: reduce)`.

## Responsive
- Mobile: grid pasa a 1 columna, imagen arriba con `aspect-[4/3]`, contenido centrado, botón `w-full`.
- Desktop `lg:`: dos columnas 1:1, contenido `text-left`.

## Guardrails
- No tocar Hero, Services ni otras secciones.
- Reutilizar tokens existentes (`--brand-deep`, `--whatsapp` no aplica aquí; el turquesa `#00C4A8` es específico de esta sección — se usa inline con `bg-[#00C4A8]` para no contaminar el theme global).
- Sin datos médicos ni promociones inventadas.
