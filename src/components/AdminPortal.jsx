import { ShieldCheck, Users, Database, Plus, Search } from 'lucide-react'
import StatCard from './StatCard'

const AdminPortal = () => {
  return (
    <div className="grid grid-cols-1 gap-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-left">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-heading)' }}>
            Admin <span style={{ color: '#818cf8' }}>Command Center</span>
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Manage infrastructure, tariff datasets, and user permissions.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
          <Plus size={18} />
          Append Dynamic Dataset
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Subscribed Users" 
          value="1,284" 
          trend="+12% this month" 
          trendStatus="up" 
          icon={Users} 
          colorClass="text-blue-400" 
        />
        <StatCard 
          title="System Integrity" 
          value="99.9%" 
          trend="All systems nominal" 
          trendStatus="up" 
          icon={ShieldCheck} 
          colorClass="text-emerald-400" 
        />
        <StatCard 
          title="Data Points Managed" 
          value="8.4M" 
          trend="Real-time sync active" 
          trendStatus="up" 
          icon={Database} 
          colorClass="text-amber-400" 
        />
      </section>

      <section className="rounded-3xl overflow-hidden shadow-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
        <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-card)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>Admin Management Logs</h2>
          <div className="relative group w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: 'var(--text-muted)' }} />
             <input type="text" placeholder="Search logs..." className="rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full border" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="p-12 text-center">
           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-item-hover)', color: 'var(--text-muted)' }}>
              <Database size={32} />
           </div>
           <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>No recent administrative overrides detected.</p>
           <p className="text-xs mt-2 uppercase tracking-widest font-black" style={{ color: 'var(--text-muted)' }}>All datasets current</p>
        </div>
      </section>
    </div>
  )
}

export default AdminPortal
