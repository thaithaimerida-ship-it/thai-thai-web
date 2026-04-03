/**
 * Configuración de API — URL del backend centralizada.
 * En desarrollo usa localhost, en producción usa Cloud Run.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL
  || 'https://thai-thai-ads-agent-624172071613.us-central1.run.app';
