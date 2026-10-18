# Recuperar la compilación de Servicios Médicos MB

## Diagnóstico (confirmado)
- Hay un error que bloquea la compilación en `src/components/site/Trust.tsx`. En el commit "Update Trust.tsx" su contenido se reemplazó por una copia exacta de `Hero.tsx`, así que ahora exporta `Hero` y no `Trust`. La portada (`src/routes/index.tsx`) importa `{ Trust }` y Rollup falla con "Trust is not exported". Todos los commits siguientes (Services, Plans, Emotional, HowItWorks, CTA y Footer) heredan este error, aunque esos archivos no tienen problemas propios.
- Hay un error secundario de tipos en `src/routes/__root.tsx`: tras la actualización de TanStack Router, `errorComponent` espera `ErrorComponentProps`. No bloquea `vite build`, pero sí la verificación de tipos.

## Cambios
1. **Trust.tsx**: restaurar la sección anterior "¿Por qué las familias nos eligen?" (Trato humano, Seguridad y confianza, Respuesta rápida), con `export function Trust()` y el mismo texto y estilos que tenía antes del commit roto.
2. **__root.tsx**: tipar `ErrorComponent` con `ErrorComponentProps` de `@tanstack/react-router`. No cambia nada visible.
3. No se toca nada más. Hero, Telemedicine, Services, Plans, Emotional, HowItWorks, CTA, Footer, los precios, las imágenes, WhatsApp, las redes sociales, los formularios y WebPay/Mercado Pago se quedan como están.

## Validación
- Ejecutar `npm run build` y la verificación de tipos, y confirmar que terminan sin errores.
- Revisar que no falten imports ni exports en `src/components/site/*`.
- Abrir la portada y confirmar que cada sección aparece una sola vez y en orden.
- Si aparece otro error en el build, corregirlo con el mismo criterio mínimo.

## GitHub y Cloudflare
- Los cambios se sincronizan solos con el repositorio GitHub conectado.
- No tengo acceso a tu cuenta de Cloudflare. Con el nuevo commit, Cloudflare debería volver a compilar por sí solo. Si no lo hace, hay que pulsar "Retry deployment" en el panel de Cloudflare.
