import React, { useState } from 'react'
import { User, Shield, Zap, Bell, Globe, Database, Key, CheckCircle2, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react'

const SettingsView = ({ user }) => {
  const [activeSection, setActiveSection] = useState('Profile')
  const [aiVerified, setAiVerified] = useState(true)

  const sections = [
    { name: 'Profile', icon: <User size={18} /> },
    { name: 'Intelligence', icon: <Zap size={18} /> },
    { name: 'Security', icon: <Shield size={18} /> },
    { name: 'Notifications', icon: <Bell size={18} /> },
    { name: 'Data Pipeline', icon: <Database size={18} /> }
  ]

  return (
    <div className="flex gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Navigation Sidebar (Inner) */}
      <aside className="w-64 space-y-2">
        {sections.map(s => (
          <button
            key={s.name}
            onClick={() => setActiveSection(s.name)}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group ${
              activeSection === s.name 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-4 text-sm font-bold">
              {s.icon}
              {s.name}
            </div>
            {activeSection === s.name && <ChevronRight size={14} />}
          </button>
        ))}
      </aside>

      {/* Content Area */}
      <main className="flex-1 max-w-3xl">
        {activeSection === 'Profile' && (
          <div className="space-y-10">
            <section className="bg-[#0b1120] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 text-blue-500/10 scale-150">
                  <User size={120} />
               </div>
               <h3 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-6">Account Identity</h3>
               <div className="flex items-center gap-8 mb-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/20">
                     {user?.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{user?.email}</h4>
                    <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">{user?.role} Access Mode</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Full Name</label>
                     <input type="text" value="Premium Subscriber" readOnly className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-slate-300" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Organization</label>
                     <input type="text" value="Global Trade Systems Inc." readOnly className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-slate-300" />
                  </div>
               </div>
            </section>
          </div>
        )}

        {activeSection === 'Intelligence' && (
          <div className="space-y-10">
             <section className="bg-gradient-to-br from-[#0b1120] to-[#0f172a] border border-blue-500/20 rounded-[3rem] p-10">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                   <h3 className="text-2xl font-black text-white flex items-center gap-4">
                      <Zap className="text-blue-500" size={24} />
                      AI Orchestrator Control
                   </h3>
                   <div className={`px-4 py-1.5 rounded-full flex items-center gap-3 border ${aiVerified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      {aiVerified ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{aiVerified ? 'Active Pipeline' : 'Key Missing'}</span>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group hover:border-blue-500/20 transition-all">
                      <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                               <Key size={18} />
                            </div>
                            <div>
                               <h4 className="text-sm font-black text-white">Google Gemini 1.5 Flash</h4>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Primary Synthesis Engine</p>
                            </div>
                         </div>
                         <button className="text-blue-400 hover:text-white transition-colors">
                            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                         </button>
                      </div>
                      <div className="relative">
                         <input 
                           type="password" 
                           value="••••••••••••••••••••••••••••••••" 
                           readOnly 
                           className="w-full bg-[#020617] border border-slate-800 rounded-2xl px-6 py-4 text-xs font-mono text-slate-500 focus:outline-none" 
                         />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-lg">
                            Verified
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-8 bg-[#0b1120] border border-slate-800 rounded-[2.5rem] space-y-4">
                         <h5 className="text-xs font-black text-white uppercase tracking-widest">Synthesis Speed</h5>
                         <p className="text-2xl font-black text-blue-400">1.2s <span className="text-[10px] text-slate-500">Avg</span></p>
                         <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">Optimized for high-concurrency requests.</p>
                      </div>
                      <div className="p-8 bg-[#0b1120] border border-slate-800 rounded-[2.5rem] space-y-4">
                         <h5 className="text-xs font-black text-white uppercase tracking-widest">Analysis Depth</h5>
                         <p className="text-2xl font-black text-emerald-400">Premium</p>
                         <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">Multi-layered FTA correlation active.</p>
                      </div>
                   </div>
                </div>
             </section>
          </div>
        )}

        {['Security', 'Notifications', 'Data Pipeline'].includes(activeSection) && (
          <div className="bg-[#0b1120] border border-slate-800 rounded-[3rem] p-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
             <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <RefreshCw size={32} className="animate-spin" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Configuring {activeSection}</h3>
                <p className="text-slate-500 font-medium">This module is currently establishing its secure connection. Features expected in Phase 14.</p>
             </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SettingsView
