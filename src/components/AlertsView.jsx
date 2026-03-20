import { useState, useEffect } from 'react'
import { Bell, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AlertsView = ({ user }) => {
  const { t } = useTranslation()
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/alerts?user_id=${user.id}`)
      if (res.ok) {
        const data = await res.json()
        setAlerts(data)
      }
    } catch (err) {
      console.error('Failed to fetch alerts:', err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/alerts/${id}/read`, { method: 'PUT' })
      if (res.ok) {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_read: true } : a))
      }
    } catch (err) {
      console.error('Failed to mark alert as read:', err)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  if (loading) return <div className="text-white p-10 font-black uppercase tracking-widest">{t('common.loading')}</div>

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Proactive Alerts</h1>
          <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs mt-1">Compliance & Duty Shift Monitoring</p>
        </div>
        <div className="bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
          <Bell size={18} className="text-blue-400" />
          <span className="text-blue-400 font-bold text-sm">{alerts.filter(a => !a.is_read).length} Unread</span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
             <Bell size={48} className="text-slate-700 mx-auto mb-4" />
             <p className="text-slate-500 font-bold">No active alerts at this moment.</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id}
              className={`p-6 rounded-3xl border transition-all ${alert.is_read ? 'bg-slate-900/30 border-slate-800/50 opacity-60' : 'bg-slate-900 border-slate-800 shadow-xl'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-xl ${alert.alert_type === 'compliance' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {alert.alert_type === 'compliance' ? <AlertTriangle size={20} /> : <Clock size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {alert.alert_type} • {new Date(alert.created_at).toLocaleDateString()}
                    </span>
                    {!alert.is_read && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <CheckCircle size={12} />
                        Mark as Read
                      </button>
                    )}
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">{alert.message}</p>
                  {alert.deadline && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-lg">
                      <Clock size={12} className="text-red-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Deadline: {alert.deadline}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AlertsView
