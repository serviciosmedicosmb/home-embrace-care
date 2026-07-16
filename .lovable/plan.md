# Diagnóstico

La app **sí monta correctamente** en el preview local: el SSR de TanStack Start responde HTTP 200 con el árbol completo de la página (`__root.tsx` + rutas), sin errores en consola ni logs de Vite. No hay `IntersectionObserver` ni clases `opacity-0` bloqueando contenido en `guia-proteccion.tsx` ni en `cuidadora-adulto-mayor.tsx`.

La pantalla blanca **solo aparece en el dominio publicado** (`home-embrace-care.lovable.app`). Al hacer `curl` a esa URL, el servidor devuelve un `index.html` heredado de una plantilla Vite antigua:

```html
<script type="module" src="/src/main.tsx"></script>
<div id="root"></div>
```

En este proyecto **no existe `src/main.tsx`** (TanStack Start usa `src/routes/__root.tsx` + `src/server.ts`), por lo que el navegador no encuentra el bundle, `#root` queda vacío y se ve toda la web en blanco.

Causas probables del fallo del build publicado:

1. **`nitro: "3.0.260603-beta"` en `dependencies`** de `package.json`. `nitro` no debe ser dependencia directa de un proyecto TanStack Start sobre Cloudflare (`@lovable.dev/vite-tanstack-config` ya provee lo necesario). Al meterse una versión beta rota, el build serverside cae y el deploy termina sirviendo el `index.html` estático como fallback.
2. **`index.html` legado en la raíz**, que sigue apuntando a `/src/main.tsx` inexistente. Aunque TanStack Start no lo necesita, si el SSR no se emite correctamente, Cloudflare devuelve este archivo → pantalla blanca.
3. **`src/routes/vercel.json`** mal ubicado (irrelevante para el árbol de rutas al no ser `.tsx/.ts`, pero fuera de lugar; el archivo `vercel.json` no aplica en este stack Cloudflare).

No hay errores en `routeTree.gen.ts`, `__root.tsx`, `router.tsx`, `server.ts`, ni en las páginas nuevas. **No hace falta regenerar el árbol de rutas ni tocar Supabase.**

# Cambios

## 1. Restaurar el build publicado (causa raíz de la pantalla blanca)

- `package.json`: quitar `"nitro": "3.0.260603-beta"` de `dependencies`. No se toca ninguna otra versión.
- Ejecutar `bun install` para regenerar `bun.lock` sin `nitro`.
- Borrar `index.html` en la raíz (TanStack Start no lo usa; su presencia solo provoca fallbacks a un `main.tsx` inexistente).
- Borrar `src/routes/vercel.json` (archivo huérfano, no aplica en Cloudflare y confunde la estructura de rutas).

No se tocan: `vite.config.ts`, `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routeTree.gen.ts`, `src/styles.css`, ni ninguna otra dependencia.

## 2. Renombrar la página `/guia-proteccion` (Fase 3 — sin cambiar la ruta)

Editar solo `src/routes/guia-proteccion.tsx`:

- SEO `head()`:
  - `title`: `Recurso gratuito para las familias | Servicios Médicos MB`
  - `description` y `og:description`: `Descarga gratuitamente una guía práctica para reconocer y prevenir estafas dirigidas a adultos mayores.`
  - `og:title`: `Recurso gratuito para las familias | Servicios Médicos MB`
- Hero visible:
  - H1: `Recurso gratuito para las familias`
  - Subtítulo: `Una guía creada para ayudar a reconocer estafas, prevenir situaciones de riesgo y proteger a los adultos mayores que más queremos.`

La ruta técnica `/guia-proteccion`, el contenido de la guía, los bloques "Qué encontrarás", el CTA de cuidadoras y el botón de descarga del PDF se conservan intactos.

## 3. Sección en `/cuidadora-adulto-mayor` (Fase 4)

En `src/routes/cuidadora-adulto-mayor.tsx`, insertar una nueva `<section>` **inmediatamente antes** del bloque `id="contacto"` (línea 320).

Contenido estático, sin estado ni observers:

- Título: `Recurso gratuito para las familias`
- Texto corto invitando a descargar la guía.
- Botón `Ver recurso gratuito` que enlaza a `/guia-proteccion` con `<Link to="/guia-proteccion">`.
- Ícono `ShieldCheck` de `lucide-react` (ya disponible).
- Estilo consistente: tarjeta blanca, esquinas redondeadas (`rounded-3xl`), sombra suave, colores `#1E4E8C` y `#00C4A8`, responsive, **sin `opacity-0`**, **sin `IntersectionObserver`**, **sin animaciones que condicionen visibilidad**.

## 4. Verificación (Fase 6)

- `curl` local a `/`, `/cuidadora-adulto-mayor`, `/guia-proteccion`, `/testimonios`, `/medico-a-domicilio` → esperar HTTP 200 con HTML SSR.
- Verificar que `public/guia-proteccion-adultos-mayores.pdf` sigue existiendo y responde 200.
- `code--execute_preview_javascript` para confirmar que el DOM tiene contenido y `document.title` refleja el nuevo título en `/guia-proteccion`.
- Revisar consola del navegador buscando errores.

## 5. Publicación (Fase 7)

Solo si todas las verificaciones locales pasan, publicar con `preview_ui--publish` y confirmar con `curl` al dominio público que:

- La página `/` ya no devuelve el `index.html` con `/src/main.tsx`, sino HTML SSR real.
- `/guia-proteccion` responde con el nuevo título.
- El PDF `/guia-proteccion-adultos-mayores.pdf` responde 200.

# Lo que NO se toca

- Supabase (tablas, RLS, funciones, migraciones).
- Header, Footer, WhatsApp flotante, formularios, navegación existente.
- Diseño global, tipografías, colores, imágenes.
- Página principal, servicios, blog, testimonios, admin.
- Rutas técnicas (`/guia-proteccion` se conserva por Manychat).
- El PDF (nombre, contenido, ubicación).
- Ninguna otra dependencia salvo la eliminación de `nitro`.
