import { useEffect, useState } from 'react';

const CONSENT_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ status: 'granted', date: new Date().toISOString() })
    );
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ status: 'denied', date: new Date().toISOString() })
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed left-0 right-0 bottom-20 md:bottom-0 z-[60] bg-zinc-900/97 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-5xl mx-auto px-5 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-slate-300 leading-relaxed flex-1">
          Usamos cookies para mejorar tu experiencia y entender qué contenido te
          es más útil. Al aceptar, nos ayudas a optimizar el sitio.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={reject}
            className="flex-1 md:flex-none px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="flex-1 md:flex-none px-6 py-2 text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg shadow-orange-900/30"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
