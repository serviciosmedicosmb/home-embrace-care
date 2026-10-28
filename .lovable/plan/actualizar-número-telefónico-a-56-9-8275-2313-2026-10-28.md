## Actualizar número telefónico a +56 9 8275 2313

Ya actualizados: `src/lib/contact.ts` (todos los botones WhatsApp que usan waLink), pie de página y Planes.

Quedan 7 apariciones del número antiguo (+56 9 6582 4407):

- `src/routes/medico-a-domicilio.tsx` — 2 enlaces "tel:" (líneas 83 y 227).
- `src/routes/enfermeria-a-domicilio.tsx` — formulario WhatsApp (línea 213) y 2 enlaces "tel:" (240, 396).
- `src/routes/cuidadora-adulto-mayor.tsx` — formulario WhatsApp (línea 138).

### Cambios
- Enlaces "tel:" → `tel:+56982752313`.
- Formularios → usar `WHATSAPP_NUMBER` de `src/lib/contact.ts` para que no vuelva a quedar desfasado.
- Sin cambios en diseño, textos, precios, imágenes, redes sociales, Webpay ni Mercado Pago.

### Verificación
- Buscar de nuevo en todo el proyecto que no quede el número antiguo.
- Ejecutar la compilación y TypeScript.
- La sincronización con GitHub es automática al guardar; Cloudflare publicará desde ese repositorio.
