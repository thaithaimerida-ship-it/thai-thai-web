import React, { useState, useEffect, useRef } from 'react';
import { X, CalendarDays, Clock, Users, User, Sparkles, CheckCircle, ChevronDown, Mail } from 'lucide-react';
import { trackConversion } from '../utils/analytics';
import { API_BASE_URL } from '../config/api';

const BACKEND_URL = API_BASE_URL;

const WA_RESTAURANT = '529999317457';

const COUNTRIES = [
  { flag: '🇲🇽', name: 'México',               code: '52'  },
  { flag: '🇺🇸', name: 'Estados Unidos',        code: '1'   },
  { flag: '🇨🇦', name: 'Canadá',                code: '1'   },
  { flag: '🇪🇸', name: 'España',                code: '34'  },
  { flag: '🇫🇷', name: 'Francia',               code: '33'  },
  { flag: '🇬🇧', name: 'Reino Unido',           code: '44'  },
  { flag: '🇩🇪', name: 'Alemania',              code: '49'  },
  { flag: '🇮🇹', name: 'Italia',                code: '39'  },
  { flag: '🇳🇱', name: 'Países Bajos',          code: '31'  },
  { flag: '🇧🇪', name: 'Bélgica',               code: '32'  },
  { flag: '🇨🇭', name: 'Suiza',                 code: '41'  },
  { flag: '🇦🇹', name: 'Austria',               code: '43'  },
  { flag: '🇵🇹', name: 'Portugal',              code: '351' },
  { flag: '🇸🇪', name: 'Suecia',                code: '46'  },
  { flag: '🇳🇴', name: 'Noruega',               code: '47'  },
  { flag: '🇩🇰', name: 'Dinamarca',             code: '45'  },
  { flag: '🇫🇮', name: 'Finlandia',             code: '358' },
  { flag: '🇦🇷', name: 'Argentina',             code: '54'  },
  { flag: '🇨🇴', name: 'Colombia',              code: '57'  },
  { flag: '🇨🇱', name: 'Chile',                 code: '56'  },
  { flag: '🇵🇪', name: 'Perú',                  code: '51'  },
  { flag: '🇧🇷', name: 'Brasil',                code: '55'  },
  { flag: '🇻🇪', name: 'Venezuela',             code: '58'  },
  { flag: '🇪🇨', name: 'Ecuador',               code: '593' },
  { flag: '🇺🇾', name: 'Uruguay',               code: '598' },
  { flag: '🇨🇷', name: 'Costa Rica',            code: '506' },
  { flag: '🇵🇦', name: 'Panamá',                code: '507' },
  { flag: '🇬🇹', name: 'Guatemala',             code: '502' },
  { flag: '🇨🇺', name: 'Cuba',                  code: '53'  },
  { flag: '🇩🇴', name: 'Rep. Dominicana',       code: '1'   },
  { flag: '🇵🇷', name: 'Puerto Rico',           code: '1'   },
  { flag: '🇦🇺', name: 'Australia',             code: '61'  },
  { flag: '🇳🇿', name: 'Nueva Zelanda',         code: '64'  },
  { flag: '🇯🇵', name: 'Japón',                 code: '81'  },
  { flag: '🇨🇳', name: 'China',                 code: '86'  },
  { flag: '🇰🇷', name: 'Corea del Sur',         code: '82'  },
  { flag: '🇮🇳', name: 'India',                 code: '91'  },
  { flag: '🇸🇬', name: 'Singapur',              code: '65'  },
  { flag: '🇹🇭', name: 'Tailandia',             code: '66'  },
  { flag: '🇵🇭', name: 'Filipinas',             code: '63'  },
  { flag: '🇮🇱', name: 'Israel',                code: '972' },
  { flag: '🇦🇪', name: 'Emiratos Árabes',       code: '971' },
];

const occasions = [
  'Cumpleaños',
  'Aniversario',
  'Reunión familiar',
  'Cita romántica',
  'Otro',
];

const initialState = {
  name: '',
  email: '',
  countryCode: '52',
  phone: '',
  date: '',
  time: '14:00',
  guests: '2',
  occasion: '',
};

export default function ReservationModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialState);
  const [phoneError, setPhoneError] = useState('');
  const [success, setSuccess] = useState(false);
  const [clientWaUrl, setClientWaUrl] = useState('');
  const [restaurantWaUrl, setRestaurantWaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef(null);
  const detectedRef = useRef(false);

  // Cerrar dropdown de país al hacer clic afuera
  useEffect(() => {
    const handler = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-detección de país por IP (solo la primera vez que se abre)
  useEffect(() => {
    if (isOpen && !detectedRef.current) {
      detectedRef.current = true;
      fetch('https://ipapi.co/json/')
        .then((r) => r.json())
        .then((data) => {
          const raw = (data.country_calling_code || '').replace('+', '');
          if (raw && COUNTRIES.some((c) => c.code === raw)) {
            setForm((prev) => ({ ...prev, countryCode: raw }));
          }
        })
        .catch(() => {}); // silencioso — usa México como default
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setForm(initialState);
      setPhoneError('');
      setSuccess(false);
      setClientWaUrl('');
      setRestaurantWaUrl('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (field) => (e) => {
    if (field === 'phone') {
      const digits = e.target.value.replace(/\D/g, '');
      setForm((prev) => ({ ...prev, phone: digits }));
      if (digits.length > 0 && (digits.length < 9 || digits.length > 15)) {
        setPhoneError('Ingresa entre 9 y 15 dígitos');
      } else {
        setPhoneError('');
      }
      return;
    }
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const selectedCountry = COUNTRIES.find((c) => c.code === form.countryCode) || COUNTRIES[0];
  const fullPhone = `${form.countryCode}${form.phone}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length < 9 || form.phone.length > 15) {
      setPhoneError('Ingresa entre 9 y 15 dígitos');
      return;
    }

    setLoading(true);

    // Guardar en BD y tracking en background (no bloquea nada)
    fetch(`${BACKEND_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: `+${fullPhone}`,
        date: form.date,
        time: form.time,
        guests: form.guests,
        occasion: form.occasion || null,
      }),
    }).catch(() => {});

    // 4. Tracking GA4
    trackConversion('reserva_completada', {
      numero_personas: parseInt(form.guests) || 2,
      tiene_ocasion_especial: !!form.occasion,
      value: 855,
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => onClose(), 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-zinc-900 border border-white/10 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl shadow-black/50 animate-fade-up">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/6 bg-zinc-950/50">
          <div>
            <p className="text-orange-400 font-bold text-[10px] uppercase tracking-widest mb-1">¿Festejas algo especial?</p>
            <h3 className="font-display text-2xl text-white">Reserva tu mesa</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600/15 flex items-center justify-center">
              <CheckCircle size={36} className="text-emerald-400" />
            </div>
            <h4 className="font-display text-xl text-white">Reserva confirmada</h4>
            <p className="font-serif italic text-slate-400 text-sm">Revisa tu WhatsApp</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* 1. Nombre */}
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type="text"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-4 py-4 text-white placeholder-slate-500 outline-none transition-colors text-sm"
              />
            </div>

            {/* 2. Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange('email')}
                className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-4 py-4 text-white placeholder-slate-500 outline-none transition-colors text-sm"
              />
            </div>

            {/* 3. Teléfono con selector de país */}
            <div>
              <div className={`flex bg-zinc-950 border rounded-xl overflow-visible transition-colors ${phoneError ? 'border-red-500/60' : 'border-white/8 hover:border-white/15 focus-within:border-orange-600/50'}`}>
                {/* Dropdown personalizado de país */}
                <div ref={countryRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setCountryOpen((o) => !o)}
                    className="flex items-center gap-1.5 px-3 py-4 text-white text-sm border-r border-white/8 hover:bg-white/5 transition-colors rounded-l-xl"
                    style={{ minWidth: '110px' }}
                  >
                    <span className="text-base leading-none">
                      {COUNTRIES.find((c) => c.code === form.countryCode)?.flag ?? '🌐'}
                    </span>
                    <span className="font-semibold text-white">
                      +{form.countryCode}
                    </span>
                    <ChevronDown size={12} className={`text-slate-400 ml-auto transition-transform ${countryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Lista desplegable */}
                  {countryOpen && (
                    <div className="absolute left-0 top-full mt-1 z-[200] w-64 bg-zinc-800 border border-white/10 rounded-xl shadow-2xl overflow-y-auto max-h-60">
                      {COUNTRIES.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, countryCode: c.code }));
                            setCountryOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-white/10 transition-colors ${form.countryCode === c.code ? 'bg-orange-600/20 text-orange-300' : 'text-white'}`}
                        >
                          <span className="text-base">{c.flag}</span>
                          <span className="flex-1 truncate">{c.name}</span>
                          <span className="text-slate-400 text-xs shrink-0">+{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo número */}
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  placeholder="Número de teléfono"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  maxLength={15}
                  className="flex-1 bg-transparent pl-4 pr-4 py-4 text-white placeholder-slate-500 outline-none text-sm"
                />
              </div>
              {phoneError ? (
                <p className="text-red-400 text-xs mt-1.5 pl-1">{phoneError}</p>
              ) : (
                <p className="text-slate-500 text-xs mt-1.5 pl-1">Te enviaremos la confirmación por WhatsApp a este número</p>
              )}
            </div>

            {/* 3 & 4. Fecha y Hora */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <CalendarDays size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={handleChange('date')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-3 py-4 text-white outline-none transition-colors text-sm"
                />
              </div>
              <div className="relative">
                <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={handleChange('time')}
                  className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-3 py-4 text-white outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* 5. Número de personas */}
            <div className="relative">
              <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={form.guests}
                onChange={handleChange('guests')}
                className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-4 py-4 text-white outline-none transition-colors text-sm appearance-none cursor-pointer"
              >
                {Array.from({ length: 14 }, (_, i) => i + 2).map((n) => (
                  <option key={n} value={n}>{n} personas</option>
                ))}
                <option value="15+">15 o más personas</option>
              </select>
            </div>

            {/* 6. Ocasión (opcional) */}
            <div className="relative">
              <Sparkles size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={form.occasion}
                onChange={handleChange('occasion')}
                className="w-full bg-zinc-950 border border-white/8 hover:border-white/15 focus:border-orange-600/50 rounded-xl pl-11 pr-4 py-4 text-white outline-none transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecciona una ocasión (opcional)</option>
                {occasions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest transition-all duration-300 shadow-lg shadow-emerald-900/30 mt-2"
            >
              {loading ? 'Confirmando...' : 'Confirmar Reserva'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
