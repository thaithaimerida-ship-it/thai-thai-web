import React from 'react';

export default function StatCard({ title, value, icon: Icon, success }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm text-left">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-xl ${success ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-3xl font-black text-slate-900">{value}</div>
    </div>
  );
}
