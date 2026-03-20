import { useState, useMemo } from 'react'
import { Calculator, TrendingUp, DollarSign, ArrowRight, Info, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TradeSandboxView = () => {
  const { t } = useTranslation()
  const [params, setParams] = useState({
    currentDuty: 15.0,
    hypotheticalDuty: 0.0,
    monthlyVolume: 500000, // USD
    freightCost: 12500,
    markup: 15.0
  })

  const simulation = useMemo(() => {
    const currentCosts = params.monthlyVolume * (1 + params.currentDuty / 100) + params.freightCost
    const hypotheticalCosts = params.monthlyVolume * (1 + params.hypotheticalDuty / 100) + params.freightCost
    
    const monthlySavings = currentCosts - hypotheticalCosts
    const annualSavings = monthlySavings * 12
    const roiBoost = (monthlySavings / params.monthlyVolume) * 100

    return {
      monthlySavings,
      annualSavings,
      roiBoost,
      currentCosts,
      hypotheticalCosts
    }
  }, [params])

  return (
    <div className="py-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">Advanced Trade Sandbox</h1>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mt-2">Predictive Corridor ROI Modeling & Simulation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Simulation Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600/10 rounded-xl">
                   <Zap size={18} className="text-blue-400" />
                </div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest">Model Parameters</h3>
             </div>

             <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Monthly Trade Volume (USD)</label>
                  <input 
                    type="range" min="10000" max="10000000" step="50000"
                    value={params.monthlyVolume}
                    onChange={(e) => setParams({...params, monthlyVolume: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between mt-2 text-xs font-bold text-white">
                    <span>${(params.monthlyVolume / 1000).toFixed(0)}k</span>
                    <span className="text-blue-400">${(params.monthlyVolume / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Current Duty (%)</label>
                    <input 
                      type="number" step="0.1"
                      value={params.currentDuty}
                      onChange={(e) => setParams({...params, currentDuty: parseFloat(e.target.value)})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-blue-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Target Duty (%)</label>
                    <input 
                      type="number" step="0.1"
                      value={params.hypotheticalDuty}
                      onChange={(e) => setParams({...params, hypotheticalDuty: parseFloat(e.target.value)})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-blue-500/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Admin/Freight Overhead (USD)</label>
                   <input 
                      type="number"
                      value={params.freightCost}
                      onChange={(e) => setParams({...params, freightCost: parseInt(e.target.value)})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-blue-500/50 outline-none transition-all"
                   />
                </div>
             </div>
          </div>
          
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
             <div className="flex gap-4">
                <Info size={20} className="text-blue-400 shrink-0" />
                <p className="text-[11px] text-blue-300 font-medium leading-relaxed uppercase tracking-tighter">
                  This simulation uses 2026 corridor averages to predict ROI boosts following FTA roadmap implementations.
                </p>
             </div>
          </div>
        </div>

        {/* Results Visualization */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={80} className="text-emerald-500" />
                 </div>
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Monthly Cost Savings</h4>
                 <div className="text-4xl font-black text-white mb-2">${simulation.monthlySavings.toLocaleString()}</div>
                 <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <ArrowRight size={14} />
                    {simulation.roiBoost.toFixed(1)}% ROI Boost
                 </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <DollarSign size={80} className="text-blue-500" />
                 </div>
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Annual Projected Surplus</h4>
                 <div className="text-4xl font-black text-white mb-2">${simulation.annualSavings.toLocaleString()}</div>
                 <div className="text-xs font-bold text-blue-400">Optimized for Jan 2026 Corridor</div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                 <Calculator size={18} className="text-blue-400" />
                 Tactical Comparison
              </h3>
              
              <div className="space-y-8">
                 <div className="flex items-end gap-6 h-48 px-4">
                    <div className="flex-1 flex flex-col items-center gap-4">
                       <div className="w-20 bg-slate-800 rounded-t-xl transition-all duration-500" style={{height: '100%'}}></div>
                       <div className="text-center">
                          <div className="text-xs font-black text-white">$ {simulation.currentCosts.toLocaleString()}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">Current</div>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-4">
                       <div className="w-20 bg-blue-600 rounded-t-xl transition-all duration-500 shadow-lg shadow-blue-600/40" style={{height: `${(simulation.hypotheticalCosts / simulation.currentCosts) * 100}%`}}></div>
                       <div className="text-center">
                          <div className="text-xs font-black text-white">$ {simulation.hypotheticalCosts.toLocaleString()}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase mt-1">Simulated</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default TradeSandboxView
