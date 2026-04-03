import React from 'react';
import { MapPin, Clock, Mail, Phone, MessageCircle, Facebook, Instagram, CalendarDays, ShoppingBag, Sparkles } from 'lucide-react';
import { trackConversion } from '../utils/analytics';

export default function Footer({ onWhatsApp, onOrder, onReserve }) {
  return (
    <footer className="bg-zinc-950 border-t border-white/8">
      {/* CTA band */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto bg-orange-600/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Texto */}
          <div>
            <p className="text-orange-200/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles size={10} /> Thai Thai Mérida
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-1">
              Vive Tailandia en cada bocado
            </h3>
            <p className="font-serif italic text-orange-100/70 text-sm">Reserva tu mesa o pide en línea y disfruta la auténtica cocina thai artesanal</p>
          </div>

          {/* Botones */}
          <div className="flex flex-row gap-3 shrink-0">
            <button
              onClick={() => onOrder('footer_cta')}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 font-bold px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag size={14} /> Pedir Online
            </button>
            <button
              onClick={onReserve}
              className="group bg-zinc-950 hover:bg-zinc-800 text-white font-black px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/40"
            >
              <CalendarDays size={14} /> Reservar
            </button>
          </div>
        </div>
      </div>

      {/* Info columns */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          {/* Brand */}
          <div className="flex flex-col gap-5 items-start">
            <img
              src="./logo.png"
              className="h-14 w-auto object-contain invert brightness-0"
              alt="Thai Thai Mérida"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <p className="text-slate-400 leading-relaxed">
              Cocina thai artesanal en Mérida. Ingredientes frescos,
              recetas originales y mucho sabor en cada platillo.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1C38SeNyYM"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('click_facebook', { value: 1 })}
                className="bg-zinc-900 hover:bg-zinc-800 p-3 rounded-full text-slate-400 hover:text-white transition-all border border-white/5"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/thaithaimid"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('click_instagram', { value: 1 })}
                className="bg-zinc-900 hover:bg-zinc-800 p-3 rounded-full text-slate-400 hover:text-white transition-all border border-white/5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs">
              Información
            </h4>
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin size={18} className="text-orange-600 shrink-0 mt-0.5" />
              <a
                href="https://maps.app.goo.gl/qYaGMBw4PyXAWb8d6"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('click_ubicacion', { value: 2 })}
                className="hover:text-orange-400 transition-colors"
              >
                Calle 30 No. 351 Col. Emiliano Zapata Norte
                <br />
                Mérida, Yucatán CP 97305
              </a>
            </div>
            <div className="flex items-start gap-3 text-slate-400">
              <Clock size={18} className="text-orange-600 shrink-0 mt-0.5" />
              <span>
                Lun – Sáb: 12:00 – 22:00
                <br />
                Dom: 12:00 – 19:00
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail size={18} className="text-orange-600 shrink-0" />
              <a href="mailto:administracion@thaithaimerida.com" className="hover:text-orange-400 transition-colors">administracion@thaithaimerida.com</a>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Phone size={18} className="text-orange-600 shrink-0" />
              <span>+52 999 931 7457</span>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs">
              Contáctanos
            </h4>
            <button
              onClick={() => onWhatsApp('footer')}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/8 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
            >
              <MessageCircle size={20} className="text-emerald-500" />
              WhatsApp Directo
            </button>
            <button
              onClick={() => onOrder('footer')}
              className="w-full bg-orange-600/10 hover:bg-orange-600/20 border border-orange-600/20 text-orange-500 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm"
            >
              Ordenar en Línea
            </button>
            <p className="text-slate-600 text-xs text-center">
              © {new Date().getFullYear()} Thai Thai Mérida. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
