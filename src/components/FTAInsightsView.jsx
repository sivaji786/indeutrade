import React, { useState, useEffect } from 'react'
import { Globe2, TrendingUp, Zap, Clock, ShieldCheck, ArrowRight, BarChart3, Map, RefreshCw } from 'lucide-react'

const iconMap = {
  Zap: <Zap className="text-emerald-400" />,
  Globe2: <Globe2 className="text-blue-400" />,
  ShieldCheck: <ShieldCheck className="text-indigo-400" />,
  Clock: <Clock className="text-slate-400" />
}

const FTAInsightsView = () => {
  const [roadmaps, setRoadmaps] = useState([])
  const [corridors, setCorridors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roadRes, corrRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/fta/roadmaps`),
          fetch(`${import.meta.env.VITE_API_URL}/fta/corridors`)
        ])
        if (roadRes.ok && corrRes.ok) {
          const [roadData, corrData] = await Promise.all([roadRes.json(), corrRes.json()])
          setRoadmaps(roadData)
          setCorridors(corrData)
        }
      } catch (err) {
        console.error('Failed to fetch FTA data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
     return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
           <RefreshCw className="text-blue-500 animate-spin" size={48} />
           <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Synchronizing Intelligence...</p>
        </div>
     )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Analytics */}
      <section className="bg-gradient-to-br from-[#0b1120] to-[#0f172a] border border-blue-500/20 rounded-[3rem] p-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-700">
            <Globe2 size={240} />
         </div>
         <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                  <BarChart3 size={24} />
               </div>
               <span className="text-sm font-black uppercase tracking-widest text-blue-400">2026 FTA Intelligence</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">Strategic Corridor <span className="text-blue-500">Analytics</span></h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
               Monitor high-fidelity duty correlations and market entry protocols across the new India-Europe trade landscape. Real-time insights Synthesized for 2026 compliance.
            </p>
            <div className="flex gap-6">
               <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">Live FTA Node Active</span>
               </div>
            </div>
         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Jan 2026 Roadmap */}
        <section className="lg:col-span-2 bg-[#0b1120] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden">
           <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-8">
              <h3 className="text-2xl font-bold flex items-center gap-4">
                 <Clock className="text-blue-500" />
                 Implementation Roadmap
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10">Cycle: 2026-2027</span>
           </div>
           
           <div className="space-y-10 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800"></div>
              {roadmaps.map((step, i) => (
                <div key={i} className="flex gap-8 relative z-10 group">
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                      {iconMap[step.icon_type] || <Clock className="text-slate-400" />}
                   </div>
                   <div className="flex-1 pb-10 border-b border-slate-800/50 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{step.title}</h4>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{step.date_label}</span>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{step.description}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Global Performance Cards */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-indigo-500/20 rounded-[2.5rem] p-8 group">
              <TrendingUp className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-3xl font-black mb-2">$8.4B</h4>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">Total Projected FTA Volume</p>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full w-3/4 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
           </div>

           <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] p-8">
              <Map className="text-blue-400 mb-6" size={40} />
              <h4 className="text-xl font-bold mb-4">Strategic Corridors</h4>
              <div className="space-y-6">
                 {corridors.map((c, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-default">
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{c.name}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{c.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-emerald-400">{c.growth}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Duty: {c.duty}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Chapter Intensity Map Placeholder */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 text-center relative overflow-hidden group">
         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8">
               <Zap className="text-blue-400 animate-pulse" size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Industry Pulse: Preference Intensity</h3>
            <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-balance">
               AI-Driven heatmap comparing duty-savings intensity across Machinery, Chemicals, and Automotive Chapter entries for 2026.
            </p>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center gap-4">
               Access High-Intensity Map
               <ArrowRight size={18} />
            </button>
         </div>
      </section>
    </div>
  )
}

export default FTAInsightsView
