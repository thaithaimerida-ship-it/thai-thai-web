import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import MobileStickyBar from './components/MobileStickyBar';
import AdminDashboard from './components/AdminDashboard';

import { trackConversion } from './utils/analytics';

const ORDER_URL = 'https://www.restaurantlogin.com/api/fb/_y5_p1_j';
const WA_URL = 'https://wa.me/529999317457?text=Hola%2C%20quiero%20hacer%20un%20pedido!';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'admin'
  const [reserveOpen, setReserveOpen] = useState(false);

  const handleOrder = (source) => {
    trackConversion('click_pedir_online', { source, value: 5 });
    window.open(ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = (source) => {
    trackConversion('click_whatsapp', { source, value: 3 });
    window.open(WA_URL, '_blank', 'noopener,noreferrer');
  };

  const openReserve = () => {
    trackConversion('click_reservar', { value: 10 });
    setReserveOpen(true);
  };

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200 font-sans overflow-x-hidden pb-20 md:pb-0">
      {/* Botón secreto — esquina superior izquierda (invisible hasta hover) */}
      <button
        onClick={() => setView('admin')}
        aria-label="Panel interno"
        className="fixed top-3 left-3 z-[60] p-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 cursor-default"
        title="Dashboard interno"
      >
        <ShieldCheck size={20} className="text-emerald-500/40" />
      </button>

      <Navbar
        onReserve={openReserve}
        onOrder={handleOrder}
        onWhatsApp={handleWhatsApp}
      />

      <main>
        <HeroSection onOrder={handleOrder} onReserve={openReserve} />
        <MenuSection onOrder={handleOrder} />
        <ReviewsSection />
      </main>

      <Footer onWhatsApp={handleWhatsApp} onOrder={handleOrder} onReserve={openReserve} />

      <MobileStickyBar onReserve={openReserve} onOrder={handleOrder} />

      <ReservationModal isOpen={reserveOpen} onClose={() => setReserveOpen(false)} />
    </div>
  );
}
