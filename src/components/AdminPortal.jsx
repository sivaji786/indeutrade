import { ShieldCheck, Users, Database, ArrowUpRight, Plus, Search } from 'lucide-react'
import StatCard from './StatCard'

const AdminPortal = () => {
  return (
    <div className="grid grid-cols-1 gap-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Admin <span className="text-indigo-400">Command Center</span>
          </h1>
          <p className="text-slate-400 mt-1">Manage infrastructure, tariff datasets, and user permissions.</p>
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

      <section className="bg-[#0b1120] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Management Logs</h2>
          <div className="relative group w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
             <input type="text" placeholder="Search logs..." className="bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full" />
          </div>
        </div>
        <div className="p-12 text-center">
           <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Database size={32} />
           </div>
           <p className="text-slate-400 font-medium">No recent administrative overrides detected.</p>
           <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest font-black">All datasets current</p>
        </div>
      </section>
    </div>
  )
}

export default AdminPortal
