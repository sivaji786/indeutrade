import { LayoutDashboard, BarChart3, Globe2, ShieldCheck, Settings, LogOut, Users, Database, Layers } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
  const isAdmin = user?.role === 'admin'
  
  const subscriberMenu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Trade Analytics', icon: <BarChart3 size={20} /> },
    { name: 'FTA Insights', icon: <Globe2 size={20} /> },
    { name: 'Regulations', icon: <ShieldCheck size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ]

  const adminMenu = [
    { name: 'Admin Portal', icon: <ShieldCheck size={20} /> },
    { name: 'User Management', icon: <Users size={20} /> },
    { name: 'Module Intelligence', icon: <Layers size={20} /> },
    { name: 'Data Sync', icon: <Database size={20} /> },
    { name: 'Trade Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ]

  const menuItems = isAdmin ? adminMenu : subscriberMenu

  return (
    <aside className="w-72 bg-[#0b1120] border-r border-slate-800 flex flex-col fixed inset-y-0 shadow-2xl z-20 print:hidden">
      <div className="p-8 text-left">
        <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 uppercase">
          {isAdmin ? 'I-Admin' : 'Indeutrade'}
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
          {isAdmin ? 'System Control Panel' : 'Global Trade Analytics'}
        </p>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            id={`sidebar-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
              activeTab === item.name 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <span className={`${activeTab === item.name ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 bg-slate-900/20">
        <div className="flex items-center gap-3 mb-6 px-2">
           <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300">
              {user?.email?.[0].toUpperCase()}
           </div>
           <div className="flex flex-col">
              <span className="text-[11px] font-black text-white truncate max-w-[120px]">{user?.email}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role}</span>
           </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all duration-200 group border border-transparent hover:border-red-500/20"
        >
          Logout
          <LogOut size={16} className="group-hover:translate-x-1 duration-200" />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
