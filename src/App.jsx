import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import DashboardView from './components/DashboardView'
import PlaceholderView from './components/PlaceholderView'
import LoginPage from './components/LoginPage'
import AdminPortal from './components/AdminPortal'
import UserManagementView from './components/UserManagementView'
import DataSyncView from './components/DataSyncView'
import ProductDetailsView from './components/ProductDetailsView'
import FTAInsightsView from './components/FTAInsightsView'
import RegulationsView from './components/RegulationsView'
import SettingsView from './components/SettingsView'
import ModuleManagementView from './components/ModuleManagementView'
import AnalyticsView from './components/AnalyticsView'
import AlertsView from './components/AlertsView'
import AuditLogView from './components/AuditLogView'
import TradeSandboxView from './components/TradeSandboxView'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, BarChart3, Globe2, ShieldCheck, Settings, Users, Database, LogOut, Activity, Layers, Bell, Shield, Calculator } from 'lucide-react'

function App() {
  const { t } = useTranslation()
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [tariffs, setTariffs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(user?.role === 'admin' ? 'Admin Portal' : 'Dashboard')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('product_name')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tariffs/categories`)
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchTariffs = async (isNewSearch = false) => {
    if (!user || loading || (!hasMore && !isNewSearch)) return
    
    setLoading(true)
    const offset = isNewSearch ? 0 : page * 20
    const url = new URL(`${import.meta.env.VITE_API_URL}/tariffs`)
    url.searchParams.append('limit', 20)
    url.searchParams.append('offset', offset)
    url.searchParams.append('sort', sortBy)
    url.searchParams.append('order', sortOrder)
    if (searchTerm) url.searchParams.append('search', searchTerm)
    if (selectedCategory) url.searchParams.append('category', selectedCategory)

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch intelligence')
      const data = await res.json()
      
      if (isNewSearch) {
        setTariffs(data)
        setPage(1)
      } else {
        setTariffs(prev => [...prev, ...data])
        setPage(prev => prev + 1)
      }
      
      setHasMore(data.length === 20)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Effect for initial load and search/filter changes
  useEffect(() => {
    if (!user) return
    fetchTariffs(true)
    if (categories.length === 0) fetchCategories()
  }, [user, searchTerm, selectedCategory, sortBy, sortOrder])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setActiveTab(userData.role === 'admin' ? 'Admin Portal' : 'Dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    window.location.reload()
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  const renderContent = () => {
    if (user.role === 'admin') {
      if (activeTab === 'Admin Portal') return <AdminPortal />
      if (activeTab === 'User Management') return <UserManagementView />
      if (activeTab === 'Module Intelligence') return <ModuleManagementView />
      if (activeTab === 'Data Sync') return <DataSyncView />
      if (activeTab === 'Trade Analytics') return <AnalyticsView />
      if (activeTab === 'System Audit') return <AuditLogView />
      if (activeTab === 'Trade Sandbox') return <TradeSandboxView />
      if (activeTab === 'Settings') return <SettingsView user={user} />
      
      const adminIconMap = {
        'User Management': Users,
        'Data Sync': Database,
        'Module Intelligence': Layers,
        'Trade Analytics': BarChart3,
        'Settings': Settings
      }
      
      return (
        <PlaceholderView 
          activeTab={activeTab} 
          icon={adminIconMap[activeTab] || ShieldCheck} 
          onBack={() => setActiveTab('Admin Portal')} 
        />
      )
    }

    // Product Details Logic
    if (selectedProduct) {
        return <ProductDetailsView product={selectedProduct} onBack={() => setSelectedProduct(null)} />
    }

    // Subscriber Content
    if (activeTab === 'Dashboard') {
      return (
        <DashboardView 
          loading={loading} 
          error={error} 
          tariffs={tariffs} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          loadMore={() => fetchTariffs(false)}
          hasMore={hasMore}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onViewProduct={setSelectedProduct}
          categories={categories}
        />
      )
    }

    if (activeTab === 'Trade Analytics') return <AnalyticsView />
    if (activeTab === 'FTA Insights') return <FTAInsightsView />
    if (activeTab === 'Regulations') return <RegulationsView />
    if (activeTab === 'Alerts') return <AlertsView user={user} />
    if (activeTab === 'Trade Sandbox') return <TradeSandboxView />
    if (activeTab === 'Settings') return <SettingsView user={user} />

    const subIconMap = {
      'Trade Analytics': BarChart3,
      'Settings': Settings
    }

    return (
      <PlaceholderView 
        activeTab={activeTab} 
        icon={subIconMap[activeTab] || LayoutDashboard} 
        onBack={() => setActiveTab('Dashboard')} 
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setSelectedProduct(null)
          setActiveTab(tab)
        }} 
        onLogout={() => setShowLogoutConfirm(true)} 
        user={user}
      />

      <main className="flex-1 ml-72 p-10 overflow-y-auto print:ml-0 print:p-0">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {user.role === 'admin' ? 'System ' : 'Good Evening, '} 
              <span className="text-blue-400">{user.role === 'admin' ? 'Admin' : 'Architect'}</span>
            </h1>
            <p className="text-slate-400 mt-1">
              {user.role === 'admin' 
                ? "Manage datasets and monitor real-time sync status." 
                : "Explore what's happening in global 2026 FTA markets."}
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure Live Node</span>
             </div>
          </div>
        </header>

        {renderContent()}
      </main>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <LogOut className="text-red-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">End Session?</h3>
            <p className="text-slate-400 text-sm mb-8">You are about to terminate the current secure connection to the Indeutrade intelligence network.</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 font-black transition-all"
              >
                STAY
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 font-black transition-all shadow-lg shadow-red-600/20"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
