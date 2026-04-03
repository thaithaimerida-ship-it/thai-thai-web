import React from 'react';
import {
  Zap, DollarSign, MousePointerClick, Percent,
  ShieldAlert, ChevronRight, BarChart3, TrendingDown, TrendingUp,
  RefreshCw, Wifi, WifiOff, Clock,
} from 'lucide-react';
import {
  ResponsiveContainer, ComposedChart, CartesianGrid,
  XAxis, YAxis, Tooltip, Bar, Line, Legend,
} from 'recharts';
import StatCard from './StatCard';
import useAuditData from '../hooks/useAuditData';
import { formatCurrency, formatPercent } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-sm">
      <p className="font-black text-slate-800 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.name === 'Gasto MXN' ? formatCurrency(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard({ onBack }) {
  const { data, loading, error, lastUpdate, refetch } = useAuditData();

  // Loading state
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={32} className="text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-semibold">Cargando datos del agente...</p>
        </div>
      </div>
    );
  }

  // Sin datos
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <WifiOff size={32} className="text-rose-400 mx-auto mb-4" />
          <p className="text-slate-700 font-bold mb-2">No se pudo conectar al agente</p>
          <p className="text-slate-500 text-sm mb-4">{error || 'Sin datos disponibles'}</p>
          <button onClick={refetch} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const { summary, campaigns } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
              aria-label="Volver"
            >
              <ChevronRight size={18} className="rotate-180 text-slate-500" />
            </button>
            <div className="bg-slate-900 p-2 rounded-xl">
              <Zap size={18} className="text-emerald-400" />
            </div>
            <div className="leading-tight">
              <span className="block font-black text-base tracking-tight uppercase">Ads Agent Pro</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1">
                <Wifi size={10} /> En Vivo
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdate && (
              <span className="text-[10px] text-slate-400 hidden sm:flex items-center gap-1">
                <Clock size={10} />
                {new Date(lastUpdate).toLocaleString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={refetch}
              className="p-2 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
              title="Actualizar datos"
            >
              <RefreshCw size={14} className={`text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* Error banner (si hay error pero tenemos data vieja) */}
        {error && data && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700">
            Usando datos en caché. Último error: {error}
          </div>
        )}

        {/* Critical alert — solo si hay waste significativo */}
        {summary.estimated_waste > 50 && (
          <div className="bg-rose-50 border border-rose-200 rounded-[2rem] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-5">
              <div className="bg-rose-100 p-4 rounded-full shrink-0">
                <ShieldAlert size={28} className="text-rose-600 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-lg text-rose-950">
                  Fuga Detectada: {formatCurrency(summary.estimated_waste)}
                </h3>
                <p className="text-rose-700 text-sm font-medium mt-1">
                  El agente detectó gasto sin conversiones. Revisa las propuestas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Inversión Global" value={formatCurrency(summary.spend)} icon={DollarSign} />
          <StatCard title="CPA Promedio" value={formatCurrency(summary.cpa)} icon={Zap} success={summary.cpa < 15} />
          <StatCard title="CTR (Relevancia)" value={formatPercent(summary.ctr)} icon={MousePointerClick} />
          <StatCard title="Tasa de Conversión" value={formatPercent(summary.conversion_rate)} icon={Percent} success={summary.conversion_rate > 15} />
        </div>

        {/* Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={20} className="text-slate-400" />
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">
              Rendimiento por Campaña — Gasto vs Conversiones
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={campaigns} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis yAxisId="spend" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `$${v}`} />
                <YAxis yAxisId="conv" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontWeight: 700 }} />
                <Bar yAxisId="spend" dataKey="spend" name="Gasto MXN" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={40} />
                <Line yAxisId="conv" type="monotone" dataKey="conversions" name="Conversiones" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">
              Desglose de Campañas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Campaña', 'Gasto', 'Conversiones', 'CPA', 'Estado'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                    <td className="px-6 py-4 text-slate-600">{formatCurrency(c.spend)}</td>
                    <td className="px-6 py-4 text-slate-600">{c.conversions}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{formatCurrency(c.cpa)}</td>
                    <td className="px-6 py-4">
                      {c.status === 'critical' ? (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          <TrendingDown size={12} /> Crítico
                        </span>
                      ) : c.status === 'warning' ? (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          <Clock size={12} /> Aprendiendo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          <TrendingUp size={12} /> Activo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
