import React from 'react';
import { CalendarDays, ShoppingBag } from 'lucide-react';

export default function MobileStickyBar({ onReserve, onOrder }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/96 backdrop-blur-xl border-t border-white/6 p-3 flex gap-3 z-50 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
      <button
        onClick={onReserve}
        className="flex-1 bg-zinc-700 hover:bg-zinc-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all"
      >
        <CalendarDays size={18} /> Reservar
      </button>
      <button
        onClick={() => onOrder('mobile_sticky')}
        className="flex-1 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-orange-900/30"
      >
        <ShoppingBag size={18} /> Pedir Online
      </button>
    </div>
  );
}
