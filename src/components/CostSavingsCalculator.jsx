import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const CostSavingsCalculator = ({ basePrice = 50000, productName = "Machinery" }) => {
  const [importValue, setImportValue] = useState(basePrice);
  const [historicalDuty, setHistoricalDuty] = useState(12);
  const [futureDuty, setFutureDuty] = useState(0);

  const historicalTotal = importValue * (1 + historicalDuty / 100);
  const futureTotal = importValue * (1 + futureDuty / 100);
  const savings = historicalTotal - futureTotal;

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-blue-500/30 rounded-[2.5rem] p-10 backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500 font-black flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Calculator size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                Cost Savings Calculator
              </h3>
              <p className="text-sm text-slate-400 font-medium">ROI Projection: German-India Machinery Corridor</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 ml-1">
                Import Value (USD)
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={importValue}
                onChange={(e) => setImportValue(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-4">
                <span className="text-3xl font-black text-white">$ {importValue.toLocaleString()}</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                   <TrendingDown size={12} /> Live Duty Shift
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
                <span className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">Historical Duty (Old)</span>
                <span className="text-2xl font-bold text-slate-300">12.00%</span>
              </div>
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                <span className="block text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400 mb-2">2026 FTA Duty (New)</span>
                <span className="text-2xl font-black text-emerald-400">0.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-80 p-8 bg-blue-600 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Total Projected Savings</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-black">$</span>
              <span className="text-5xl font-black tracking-tighter tabular-nums">{savings.toLocaleString()}</span>
            </div>
            <p className="mt-6 text-sm text-blue-100 leading-relaxed font-medium">
              Significant ROI discovered. The 2026 India-EU FTA eliminates all foundational tariffs for your {productName} procurement.
            </p>
          </div>

          <div className="relative z-10 mt-10 space-y-4">
            <div className="flex items-center gap-3 text-xs font-bold text-blue-100">
               <ShieldCheck size={16} /> 100% Verified Compliance
            </div>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg">
              Secure Locked-In Rate <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSavingsCalculator;
