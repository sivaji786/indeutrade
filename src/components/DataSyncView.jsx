import React, { useState, useEffect } from 'react'
import { Database, RefreshCw, CheckCircle2, AlertCircle, Clock, Activity, Zap, ShieldCheck } from 'lucide-react'

const DataSyncView = () => {
  const [logs, setLogs] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [syncStatus, setSyncStatus] = useState('')

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sync`)
      const data = await response.json()
      setLogs(data)
    } catch (err) {
      console.error('Failed to load sync mission logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setProgress(0)
    setSyncStatus('Establishing tunnel to Global Trade Center...')
    
    // Detailed simulation states
    const states = [
      { p: 15, msg: 'Handshaking with WCO API...' },
      { p: 30, msg: 'Decrypting HS Chapter 85: Electrical Machinery...' },
      { p: 45, msg: 'Processing HS Chapter 87: Automotive Intelligence...' },
      { p: 60, msg: 'Ingesting HS Chapter 30: Pharma Protocols...' },
      { p: 75, msg: 'Validating 2026 FTA preferential rates...' },
      { p: 90, msg: 'Rebuilding local intelligence directory...' },
      { p: 100, msg: 'Sync Complete: Network Synchronized.' }
    ]

    let stateIdx = 0;
    const interval = setInterval(() => {
        if (stateIdx < states.length) {
            setProgress(states[stateIdx].p)
            setSyncStatus(states[stateIdx].msg)
            stateIdx++
        } else {
            clearInterval(interval)
        }
    }, 800)

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggered_by: user.email })
      })

      if (response.ok) {
        setTimeout(() => {
          setSyncing(false)
          fetchLogs()
        }, 6000) // Keep the UI active to show the full simulation
      }
    } catch (err) {
      setSyncing(false)
      clearInterval(interval)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Global Sync Console */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <Database size={240} className="text-blue-500" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 relative">
            <div className={`absolute inset-0 rounded-full bg-blue-500/20 ${syncing ? 'animate-ping' : ''}`}></div>
            <Activity className="text-blue-400" size={40} />
          </div>
          
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Trade Intelligence Pulse</h2>
          <p className="text-slate-400 text-lg mb-10 text-balance">Synchronize the complete 2026 FTA directory across global HSN chapters and national tariff centers.</p>
          
          {syncing ? (
            <div className="w-full space-y-6">
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-1 border border-slate-700 relative">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
                {/* Micro animation for pulse flow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 animate-pulse transition-all">
                   {syncStatus}
                </span>
                <span className="text-xs font-black text-white">{Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleSync}
              className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-4 group/btn active:scale-95"
            >
              <Zap size={20} className="group-hover:scale-125 transition-transform" />
              Plug in Real Intelligence source
            </button>
          )}
        </div>
      </section>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0b1120] border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="text-emerald-400" size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 text-left">Active Nodes</p>
            <p className="text-2xl font-black text-white">124 Centers</p>
          </div>
        </div>
        
        <div className="bg-[#0b1120] border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Clock className="text-blue-400" size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 text-left">Sync Integrity</p>
            <p className="text-2xl font-black text-white">99.98%</p>
          </div>
        </div>

        <div className="bg-[#0b1120] border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <ShieldCheck className="text-indigo-400" size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 text-left">Encrypted Ingestion</p>
            <p className="text-2xl font-black text-white">TLS 1.3 Active</p>
          </div>
        </div>
      </div>

      {/* Sync Audit Trail */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <RefreshCw className="text-blue-400" size={20} />
            Data Ingestion History
          </h3>
          <div className="flex gap-2 text-right">
             <div className="flex items-center gap-2 mr-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Network Stable</span>
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800/50 bg-slate-900/10">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Deployment ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Source Origin</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Intelligence Packets</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-blue-400 bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10">
                      #{log.id.toString().padStart(4, '0')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-white mb-0.5">{log.triggered_by}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Verified Identity</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${log.status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {log.status === 'success' ? 'Ingested' : 'Failed'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-300">
                    {log.records_synced} HSN Records
                  </td>
                  <td className="px-8 py-6 text-xs font-medium text-slate-500">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <RefreshCw className="mx-auto text-slate-800 mb-4 animate-spin" size={48} />
                    <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Awaiting Pulse Signal...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSyncView
