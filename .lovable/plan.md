
## Objetivo
Reemplazar la carga de la imagen de la sección "Consulta médica Online" (hoy vía puntero CDN `telemedicina.png.asset.json`) por un import estático local desde `src/assets/telemedicina.jpg`, y añadir un fallback silencioso para que nunca vuelva a aparecer el texto alternativo ocupando el layout.

## Cambios

1. **Descargar el binario del CDN** (la imagen actual funciona en HTTP 200) y guardarla como `src/assets/telemedicina.jpg` — mismo contenido visual que hoy, sólo cambia el formato de origen (PNG → JPG comprimido) para cumplir el requisito del usuario y tener la imagen realmente dentro del repo.

2. **`src/components/site/Telemedicine.tsx`**:
   - Reemplazar `import teleAsset from "@/assets/telemedicina.png.asset.json"` por `import telemedicinaImage from "@/assets/telemedicina.jpg"`.
   - Cambiar el `<img>` para usar `src={telemedicinaImage}`, `className="w-full h-full object-cover object-center"`, `loading="lazy"`. Se mantienen el `alt` actual y el `z-10` del layout original (dentro del mismo contenedor con círculos decorativos), sin alterar diseño, precio, botón, textos ni animaciones.
   - Añadir handler `onError`: oculta el `<img>` (`e.currentTarget.style.display = 'none'`) y hace `console.error` una sola vez. Así, si por cualquier motivo la imagen falla, no se ve el icono roto ni el alt text — sólo queda el fondo del contenedor (que ya tiene los círculos decorativos turquesa/celeste).

3. **`src/assets/telemedicina.png.asset.json`**: eliminar el puntero al CDN (ya no se referencia) con `lovable-assets delete --file src/assets/telemedicina.png.asset.json` para no dejar el asset huérfano.

## Verificación
- `bun run build` para confirmar que el import resuelve y no hay 404 de `telemedicina.jpg` ni referencias colgantes al `.asset.json`.
- Playwright headless en 360, 390 y 430 px: cargar `/`, hacer scroll a la sección y capturar screenshot del bloque de telemedicina para confirmar que la imagen se renderiza en móvil.

## Guardrails
- No tocar textos, precio, botón, animaciones, márgenes ni otras secciones.
- No modificar la ubicación del componente en `src/routes/index.tsx`.
- No cambiar `Hero`, `Services`, ni ningún otro componente.
