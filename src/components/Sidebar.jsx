import { LayoutDashboard, BarChart3, Globe2, ShieldCheck, Settings, LogOut, Users, Database, Layers, Languages, Bell, Shield, Calculator, BookOpen, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isAdmin = user?.role === 'admin'
  
  const subscriberMenu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, key: 'dashboard' },
    { name: 'Trade Analytics', icon: <BarChart3 size={20} />, key: 'analytics' },
    { name: 'FTA Insights', icon: <Globe2 size={20} />, key: 'fta' },
    { name: 'Regulations', icon: <ShieldCheck size={20} />, key: 'regulations' },
    { name: 'Alerts', icon: <Bell size={20} />, key: 'alerts' },
    { name: 'Trade Sandbox', icon: <Calculator size={20} />, key: 'sandbox' },
    { name: 'Settings', icon: <Settings size={20} />, key: 'settings' },
  ]

  const adminMenu = [
    { name: 'Admin Portal', icon: <ShieldCheck size={20} />, key: 'admin' },
    { name: 'User Management', icon: <Users size={20} />, key: 'users' },
    { name: 'Module Intelligence', icon: <Layers size={20} />, key: 'modules' },
    { name: 'Data Sync', icon: <Database size={20} />, key: 'sync' },
    { name: 'Wiki Module', icon: <BookOpen size={20} />, key: 'wiki' },
    { name: 'System Audit', icon: <Shield size={20} />, key: 'audit' },
    { name: 'Trade Analytics', icon: <BarChart3 size={20} />, key: 'analytics' },
    { name: 'Trade Sandbox', icon: <Calculator size={20} />, key: 'sandbox' },
    { name: 'Settings', icon: <Settings size={20} />, key: 'settings' },
  ]

  const menuItems = isAdmin ? adminMenu : subscriberMenu

  return (
    <aside
      className="w-72 flex flex-col fixed inset-y-0 shadow-2xl z-20 print:hidden border-r transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-main)' }}
    >
      <div className="p-8 text-left">
        <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 uppercase">
          {isAdmin ? 'I-Admin' : 'Indeutrade'}
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
          {isAdmin ? 'System Control Panel' : 'Global Trade Analytics'}
        </p>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            id={`sidebar-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group border`}
            style={
              activeTab === item.name
                ? {
                    backgroundColor: 'var(--bg-item-active)',
                    color: 'var(--text-active)',
                    borderColor: 'var(--border-active)',
                  }
                : {
                    backgroundColor: 'transparent',
                    color: 'var(--text-item)',
                    borderColor: 'transparent',
                  }
            }
            onMouseEnter={e => {
              if (activeTab !== item.name) {
                e.currentTarget.style.backgroundColor = 'var(--bg-item-hover)'
                e.currentTarget.style.color = 'var(--text-item-hover)'
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== item.name) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--text-item)'
              }
            }}
          >
            <span style={{ color: activeTab === item.name ? 'var(--text-active)' : 'var(--text-muted)' }}>
              {item.icon}
            </span>
            {t(`sidebar.${item.key}`)}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t transition-colors duration-300" style={{ borderColor: 'var(--separator)', backgroundColor: 'var(--bg-card-2)' }}>
        {/* Language + Theme row */}
        <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
               <Languages size={14} style={{ color: 'var(--text-muted)' }} />
               <button 
                  onClick={() => i18n.changeLanguage('en')}
                  className={`text-[10px] font-black tracking-widest uppercase`}
                  style={{ color: i18n.language === 'en' ? 'var(--text-active)' : 'var(--text-muted)' }}
               >
                  EN
               </button>
               <span style={{ color: 'var(--border-main)' }}>|</span>
               <button 
                  onClick={() => i18n.changeLanguage('de')}
                  className={`text-[10px] font-black tracking-widest uppercase`}
                  style={{ color: i18n.language === 'de' ? 'var(--text-active)' : 'var(--text-muted)' }}
               >
                  DE
               </button>
            </div>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 border"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-main)',
                color: 'var(--text-secondary)',
              }}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
        </div>
        <div className="flex items-center gap-3 mb-6 px-2">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-main)', color: 'var(--text-primary)' }}>
              {user?.email?.[0].toUpperCase()}
           </div>
           <div className="flex flex-col">
              <span className="text-[11px] font-black truncate max-w-[120px]" style={{ color: 'var(--text-user)' }}>{user?.email}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-role)' }}>{user?.role}</span>
           </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all duration-200 group border border-transparent hover:border-red-500/20"
        >
          {t('sidebar.logout')}
          <LogOut size={16} className="group-hover:translate-x-1 duration-200" />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
