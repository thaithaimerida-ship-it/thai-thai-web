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
    // Enviar a GA4 (Google Ads importa conversiones vía GA4 linking)
    window.gtag('event', eventName, {
      event_category: 'conversion',
      ...params,
    });
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
