import { ArrowUpRight } from 'lucide-react'

const StatCard = ({ title, value, trend, trendStatus, icon: Icon, colorClass }) => {
  return (
    <div className="p-8 rounded-3xl border shadow-xl relative overflow-hidden group text-left transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={64} />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>{title}</p>
      <p className={`text-4xl font-black ${colorClass}`}>{value}</p>
      <div className={`mt-4 flex items-center text-xs font-bold gap-1 ${trendStatus === 'up' ? 'text-emerald-500' : 'text-amber-500'}`}>
        <ArrowUpRight size={14} className={trendStatus === 'down' ? 'rotate-90' : ''} /> {trend}
      </div>
    </div>
  )
}

export default StatCard
