## Objetivo
Reemplazar la imagen de la sección "Consulta médica Online" por el nuevo archivo adjunto, guardándola como `src/assets/consulta-medica-online-v2.webp` con import estático Vite y eliminando toda referencia al archivo anterior.

## Cambios

1. **Convertir y guardar la imagen** (PNG adjunto → WebP):
   - Usar `python -c "from PIL import Image; Image.open('/mnt/user-uploads/file_00000000b978820e986d03e962719e04-2.png').save('src/assets/consulta-medica-online-v2.webp','WEBP',quality=88)"`.
   - Verificar con `ls -la src/assets/consulta-medica-online-v2.webp`.

2. **`src/components/site/Telemedicine.tsx`**:
   - Eliminar `import telemedicinaImage from "@/assets/telemedicina.jpg"`.
   - Añadir `import consultaMedicaOnlineImage from "@/assets/consulta-medica-online-v2.webp"`.
   - Reemplazar el bloque de imagen actual (líneas 43-62 del `<div className="relative min-h-[280px] lg:min-h-[440px]">` con los spans decorativos + `<img>`) por:
     ```tsx
     <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
       <span aria-hidden className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-[#00C4A8]/20 blur-2xl telemed-pulse" />
       <span aria-hidden className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#7CC6FE]/25 blur-2xl" />
       <img
         src={consultaMedicaOnlineImage}
         alt="Médico realizando una consulta médica online"
         className="block w-full h-full object-cover object-center relative z-10"
         loading="eager"
         decoding="async"
         width="900"
         height="675"
         onError={(event) => {
           event.currentTarget.style.visibility = "hidden";
           console.error("No se pudo cargar consulta-medica-online-v2.webp");
         }}
       />
     </div>
     ```
   - Se preservan los círculos decorativos turquesa/celeste (que forman parte del diseño existente) dentro del nuevo contenedor con `aspect-[4/3]` que solicita el usuario.

3. **Eliminar archivo anterior**: `rm src/assets/telemedicina.jpg` para que no queden referencias huérfanas.

4. **Verificación**:
   - `rg -n "telemedicina|telemedicinaImage" src/` debe retornar 0 coincidencias en archivos de imagen (el CSS `telemed-pulse` sí se mantiene, es una animación).
   - `bun run build` para confirmar que el asset WebP se incluye sin 404.
   - Playwright headless a 360/390/430 px cargando `/`, scroll hasta la sección, screenshot del bloque para confirmar render.

## Guardrails
- No tocar textos, precio, botón WhatsApp, colores, tipografías, animaciones ni otras secciones.
- No modificar `src/routes/index.tsx` ni ningún otro componente.
- La variable `src` recibe únicamente el import estático — sin strings de ruta.
