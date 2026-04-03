# Thai Thai Web — Landing Page

## Qué hace
Landing page del restaurante Thai Thai Mérida. Incluye menú, reservaciones, reseñas y CTA a pedidos online.

## Stack
React 18 + Vite + Tailwind CSS. Desplegada en **Netlify** → `https://thaithaimerida.com`

## Comandos
```bash
npm run dev      # desarrollo local
npm run build    # build (Netlify auto-deploys desde git)
npm run preview  # previsualizar build local
```

## Estructura
```
src/
  components/
    HeroSection.jsx         ← hero con CTAs principales
    Navbar.jsx
    MenuSection.jsx
    ReservationModal.jsx    ← formulario de reservas — llama al backend
    ReviewsSection.jsx
    MobileStickyBar.jsx     ← barra sticky mobile con CTA
    Footer.jsx
    AdminDashboard.jsx      ← dashboard admin embebido
    StatCard.jsx
  utils/
    analytics.js            ← helpers GA4 + Google Ads conversions
    formatters.js
  data/
    menuData.js
    auditData.js
  App.jsx
  main.jsx
```

## Backend
`ReservationModal.jsx` llama directamente a Cloud Run:
```js
const BACKEND_URL = 'https://thai-thai-ads-agent-624172071613.us-central1.run.app';
```
Cold start ~2 minutos en primera llamada del día — es normal. No cambiar esta URL sin actualizar también el backend.

## Tracking de conversiones
Archivo clave: `src/utils/analytics.js`

| Evento | Valor | Destino |
|---|---|---|
| `reserva_completada` | $855 MXN | GA4 + `AW-17126999855/reserva_completada` |
| `click_pedir_online` | $450 MXN | GA4 + `AW-17126999855/click_pedir_online` |

- En desarrollo, los eventos se loguean en consola (`[GA4]`) pero NO se envían a Google Ads
- GTM multidominio: `thaithaimerida.com` + `restaurantlogin.com` (Gloria Food)
- GTM trigger Gloria Food: solo dispara en `/outcome/accepted`

## Gloria Food (pedidos online)
- URL pedidos: `https://www.restaurantlogin.com/api/fb/_y5_p1_j`
- Tracking: GTM `GTM-5CRD9SKL` instalado como 3rd party tracking

## WhatsApp en reservaciones
- Al completar reserva → abre WhatsApp al restaurante: `529999317457`
- ⚠️ NO enviar WhatsApp automático al cliente (acordado — pendiente quitar el código si existe)

## Pendientes acordados (no implementar hasta indicación)
- Quitar self-WhatsApp al cliente si aún existe en ReservationModal
- Agregar archivo `.ics` al email de confirmación del cliente

## Objetivo actual del proyecto
Prioridades actuales:
1. Mejorar conversión — es el proyecto de mayor impacto en ventas
2. Reducir dependencia de Uber Eats de 40% → 20%
3. Fortalecer pedidos via Gloria Food (sin comisión)

## Métricas clave
- Ticket delivery: $450 MXN
- Ticket comedor: $285 MXN
- Mesa promedio: $855 MXN
- Cada reserva completada = $855 MXN de valor

## Áreas sensibles — confirmar antes de modificar
- `src/utils/analytics.js` — cualquier cambio afecta tracking de conversiones en producción
- `ReservationModal.jsx` — lógica de reservas y llamada al backend
- `BACKEND_URL` — no cambiar sin actualizar backend simultáneamente
- `index.html` — contiene tags de GA4 y GTM

## Reglas de testing
- Cambios en `analytics.js` o flujo de reservas: verificar en dev que los eventos aparecen en consola
- No hacer deploy si el modal de reservas no completa el flujo end-to-end

## Cuándo actualizar este archivo
- Al agregar nuevos componentes o rutas
- Al cambiar la URL del backend
- Al resolver los pendientes de WhatsApp / .ics
- Al migrar de Netlify a otro proveedor

Comando: `/claude-md-management`
