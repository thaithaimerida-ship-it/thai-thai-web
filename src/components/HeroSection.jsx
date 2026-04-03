import React from 'react';
import { Flame, ChevronRight, CalendarDays } from 'lucide-react';

export default function HeroSection({ onOrder, onReserve }) {
  return (
    <header className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fondo con gradientes en capas */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/20 to-zinc-950 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/30 z-10" />

      {/* Imagen de fondo */}
      <img
        src="./fondo.png"
        className="absolute inset-0 w-full h-full object-cover opacity-55 animate-slow-zoom"
        alt="Cocina Thai Thai Mérida"
        onError={(e) => {
          e.target.src =
            'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000';
        }}
      />

      {/* Contenido */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 bg-orange-600/15 text-orange-400 px-5 py-2 rounded-full border border-orange-600/25 mb-8 font-bold text-[11px] uppercase tracking-widest backdrop-blur-sm">
          <Flame size={14} className="text-orange-500" />
          Cocina Thai Artesanal
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] drop-shadow-2xl">
          Tailandia despierta
          <br />
          <span className="text-orange-500">en cada plato</span>
        </h1>

        {/* Subtitulo */}
        <p className="animate-fade-up-delay-2 text-slate-300/90 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
          Ingredientes frescos, pastas de arroz artesanales, curries hechos desde cero.
          <br className="hidden sm:block" />
          Cocina tailandesa artesanal preparada al momento.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onOrder('hero')}
            className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black px-10 py-5 rounded-2xl shadow-2xl shadow-orange-900/40 uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all duration-300 animate-glow-pulse"
          >
            Pedir en Línea <ChevronRight size={18} />
          </button>
          <button
            onClick={onReserve}
            className="bg-white/10 hover:bg-white/18 active:scale-95 backdrop-blur-md text-white border border-white/20 font-bold px-10 py-5 rounded-2xl uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all duration-300"
          >
            <CalendarDays size={18} /> Reservar Mesa
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-white">Descubre el menú</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </header>
  );
}
