import { useState, useEffect } from 'react'
import { Shield, User, Globe, Activity, Eye, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AuditLogView = () => {
  const { t } = useTranslation()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/audit/logs`)
      if (res.ok) {
        const data = await res.json()
        setLogs(data)
      }
    } catch (err) {
      console.error('Failed to fetch audit logs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  if (loading) return <div className="text-white p-10 font-black uppercase tracking-widest">{t('common.loading')}</div>

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">System Audit Ledger</h1>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mt-2">Governance & Change Tracking Oversight</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Administrator</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Entity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="text-xs font-bold text-slate-400">{new Date(log.created_at).toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">
                      {log.email?.[0]}
                    </div>
                    <span className="text-xs font-bold text-white">{log.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    log.action === 'POST' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    log.action === 'PUT' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{log.entity} #{log.entity_id}</span>
                </td>
                <td className="px-6 py-4 max-w-xs">
                   <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                      <FileText size={14} />
                      <span className="text-[10px] font-medium truncate">{log.payload}</span>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="p-12 text-center">
             <Shield size={32} className="text-slate-700 mx-auto mb-3" />
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No audit entries captured yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuditLogView
