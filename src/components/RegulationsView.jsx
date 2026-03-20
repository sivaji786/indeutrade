import React, { useState, useEffect } from 'react'
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2, Factory, Globe, Zap, ArrowUpRight, Search, RefreshCw } from 'lucide-react'

const RegulationsView = () => {
  const [matrix, setMatrix] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matRes, alertRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/regulations/matrix`),
          fetch(`${import.meta.env.VITE_API_URL}/regulations/alerts`)
        ])
        if (matRes.ok && alertRes.ok) {
          const [matData, alertData] = await Promise.all([matRes.json(), alertRes.json()])
          setMatrix(matData)
          setAlerts(alertData)
        }
      } catch (err) {
        console.error('Failed to fetch Regulations data:', err)
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
           <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Synchronizing Compliance Nodes...</p>
        </div>
     )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 w-full max-w-xl relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-400 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search Compliance Protocols (e.g. DSCSA, EU-FMD, Sustainability)..."
            className="w-full bg-[#0b1120] border border-slate-800 rounded-3xl py-5 pl-16 pr-8 text-sm font-bold placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all shadow-2xl"
          />
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Compliance Nodes Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Compliance Matrix */}
        <section className="lg:col-span-2 bg-[#0b1120] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
           <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
              <h3 className="text-2xl font-bold flex items-center gap-4">
                 <FileText className="text-blue-500" size={24} />
                 Compliance Matrix 2026
              </h3>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Real-time sync</span>
              </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-800/50 bg-slate-900/10">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Chapter</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Deadline</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Level</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/30">
                 {matrix.map((item, i) => (
                   <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-10 py-8">
                         <p className="text-sm font-bold text-white mb-1">{item.hsn_chapter}</p>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.status}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-xs font-black text-blue-400 border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-lg">{item.protocol}</span>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-300">{item.deadline}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                           item.risk_level === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                           item.risk_level === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                           'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                           <AlertTriangle size={12} />
                           {item.risk_level}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <button className="text-slate-500 hover:text-white transition-colors">
                           <ArrowUpRight size={20} />
                        </button>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </section>

        {/* Regulatory Alerts Sidebar */}
        <div className="space-y-10">
           <section className="bg-gradient-to-br from-red-900/40 to-slate-900/40 border border-red-500/20 rounded-[3rem] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-red-500/10 group-hover:scale-110 transition-transform">
                <AlertTriangle size={100} />
              </div>
              <h4 className="text-xl font-black text-white mb-8 border-b border-white/10 pb-4">Critical Alerts</h4>
              <div className="space-y-8 relative z-10">
                 {alerts.map((alert, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white tracking-widest">{alert.type}</span>
                         <h5 className="text-sm font-black text-white">{alert.title}</h5>
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{alert.description}</p>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#0b1120] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-8 text-emerald-500/5">
                <ShieldCheck size={120} />
              </div>
              <h4 className="text-xl font-black text-white mb-8">Verification Node</h4>
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6 relative z-10">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Digital Seal Status</span>
                    <CheckCircle2 className="text-emerald-500" size={20} />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Serialization Active</span>
                    <Zap className="text-yellow-500" size={20} />
                 </div>
                 <div className="pt-6 border-t border-white/5">
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all">
                       Audit My Compliance Profile
                    </button>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  )
}

export default RegulationsView
