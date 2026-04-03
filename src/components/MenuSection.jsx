import React, { useState } from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { menuItems, categories } from '../data/menuData';

export default function MenuSection({ onOrder }) {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filtered =
    activeCategory === 'todos'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const categoryLabel = {
    todos: 'Todos',
    entradas: 'Entradas',
    platos: 'Platos Fuertes',
    postres: 'Postres',
    bebidas: 'Bebidas',
  };

  return (
    <section id="menu-section" className="py-24 bg-zinc-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-display text-white leading-tight mb-2">
              Nuestro Menú
            </h2>
            <p className="font-display text-slate-400 text-lg" style={{ fontWeight: 300 }}>Nuestros favoritos</p>
          </div>
          <button
            onClick={() => onOrder('menu_cta')}
            className="text-orange-500 font-bold flex items-center gap-2 hover:gap-4 transition-all text-xs tracking-widest uppercase group shrink-0"
          >
            Ver menú completo con precios
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/30'
                  : 'bg-zinc-800 text-slate-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {categoryLabel[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-white/5 rounded-[1.75rem] overflow-hidden hover:border-orange-600/30 transition-all duration-500 shadow-2xl flex flex-col group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  style={{ transform: 'scale(1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-orange-400 uppercase tracking-widest border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-grow mb-5">
                  {item.desc}
                </p>
                <button
                  onClick={() => onOrder(`item_${item.name}`)}
                  className="w-full py-3 rounded-xl bg-zinc-800/80 text-white font-bold group-hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest border border-white/5 group-hover:border-orange-500"
                >
                  <ShoppingBag size={14} /> Pedir ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
