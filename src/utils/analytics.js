/**
 * Google Analytics 4 — helpers de tracking
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...params,
    });
  }
  if (import.meta.env.DEV) {
    console.log(`[GA4] ${eventName}`, params);
  }
};

export const trackConversion = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    // Enviar a GA4
    window.gtag('event', eventName, {
      event_category: 'conversion',
      ...params,
    });

    // Enviar a Google Ads según el tipo de conversión
    if (eventName === 'reserva_completada') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17126999855/reserva_completada',
        value: params.value || 855,
        currency: 'MXN',
      });
    }

    if (eventName === 'click_pedir_online') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17126999855/click_pedir_online',
        value: params.value || 450,
        currency: 'MXN',
      });
    }
  }
  if (import.meta.env.DEV) {
    console.log(`[GA4 + Google Ads conversion] ${eventName}`, params);
  }
};

export const trackPageView = (pagePath) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
    });
  }
};
