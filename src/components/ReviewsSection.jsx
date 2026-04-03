import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    author: 'Ana P.',
    comment:
      'El mejor Pad Thai que he probado fuera de Bangkok. El nivel de especias es perfecto, súper fresco y auténtico.',
    date: 'Hace 2 días',
    stars: 5,
  },
  {
    author: 'Carlos M.',
    comment:
      'Increíble experiencia. El Curry Verde es una locura, el sabor a coco y albahaca es de otro nivel. Ya es mi lugar favorito.',
    date: 'Hace 1 semana',
    stars: 5,
  },
  {
    author: 'Valeria G.',
    comment:
      'Pedimos por WhatsApp y la atención fue de primera. El empaque impecable y las porciones, muy generosas.',
    date: 'Hace 2 semanas',
    stars: 5,
  },
  {
    author: 'Jaime Garza',
    comment:
      'Me lo recomendaron mucho. Uno de los mejores restaurantes de comida tailandesa que he probado. Precios justos, platillos muy bien servidos, bebidas increíbles. Se respira un ambiente con muy buena vibra. Felicidades al personal que son muy amables y sobre todo al Chef, se siente la frescura de los ingredientes.',
    date: 'Hace 4 días',
    stars: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-2">
            Lo que Mérida piensa
          </h2>
          <p className="font-serif italic text-slate-400 text-sm mb-8">La experiencia de nuestros clientes</p>

          {/* Rating badge */}
          <div className="inline-flex flex-col items-center bg-zinc-900 border border-white/8 rounded-2xl px-8 py-4 shadow-xl">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-orange-500 fill-orange-500" />
              ))}
            </div>
            <p className="text-slate-500 text-xs">+1000 reseñas verificadas</p>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="relative bg-zinc-900/60 backdrop-blur-sm p-5 rounded-2xl border border-white/6 hover:border-orange-600/20 transition-all duration-400 group"
            >
              {/* Quote icon */}
              <Quote
                size={22}
                className="text-orange-600/20 group-hover:text-orange-600/30 transition-colors mb-3"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(rev.stars)].map((_, j) => (
                  <Star key={j} size={11} className="text-orange-500 fill-orange-500" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-slate-300 italic text-xs leading-relaxed mb-4">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex justify-between items-center border-t border-white/6 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center text-white text-[10px] font-black">
                    {rev.author.charAt(0)}
                  </div>
                  <span className="font-bold text-white text-xs">{rev.author}</span>
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
