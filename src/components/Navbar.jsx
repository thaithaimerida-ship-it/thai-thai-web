import React, { useState, useEffect } from 'react';
import { CalendarDays, MessageCircle, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ onReserve, onOrder, onWhatsApp }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    setMenuOpen(false);
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Navbar principal */}
      <nav
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-950/95 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.6)] py-2 border-b border-white/5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" aria-label="Thai Thai Mérida">
            <img
              src="./logo.png"
              className="h-20 w-auto object-contain invert brightness-0 transition-all duration-300 hover:opacity-80"
              alt="Thai Thai Mérida"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollToMenu}
              className="px-4 py-2 text-slate-300 hover:text-white font-semibold text-sm transition-colors rounded-lg hover:bg-white/5"
            >
              Menú
            </button>
            <button
              onClick={onReserve}
              className="px-4 py-2 text-slate-300 hover:text-white font-semibold text-sm transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <CalendarDays size={16} /> Reservar
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <button
              onClick={() => onWhatsApp('navbar')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle size={16} /> WhatsApp
            </button>
            <button
              onClick={() => onOrder('navbar')}
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-900/40 animate-glow-pulse"
            >
              <ShoppingBag size={16} /> Pedir Online
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-zinc-950/98 backdrop-blur-xl flex flex-col transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '88px' }}
      >
        <div className="flex flex-col gap-0 px-6">
          <button
            onClick={scrollToMenu}
            className="text-2xl font-serif text-white text-left py-6 border-b border-white/8 hover:text-orange-500 transition-colors"
          >
            Ver Menú
          </button>
          <button
            onClick={() => { setMenuOpen(false); onReserve(); }}
            className="text-2xl font-serif text-white text-left py-6 border-b border-white/8 hover:text-orange-500 transition-colors"
          >
            Reservar Mesa
          </button>
          <button
            onClick={() => { setMenuOpen(false); onWhatsApp('mobile_menu'); }}
            className="text-2xl font-serif text-white text-left py-6 border-b border-white/8 hover:text-emerald-400 transition-colors flex items-center gap-3"
          >
            <MessageCircle size={24} /> WhatsApp
          </button>
          <button
            onClick={() => { setMenuOpen(false); onOrder('mobile_menu'); }}
            className="mt-6 w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3"
          >
            <ShoppingBag size={22} /> Pedir en Línea
          </button>
        </div>
      </div>
    </>
  );
}
