import StatCard from './StatCard'
import TariffTable from './TariffTable'
import { Globe2, BarChart3, LayoutDashboard } from 'lucide-react'

const DashboardView = ({ 
    loading, error, tariffs, searchTerm, setSearchTerm, 
    loadMore, hasMore, selectedCategory, setSelectedCategory,
    onViewProduct, categories = []
}) => {

  return (
    <div className="grid grid-cols-1 gap-10">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Active FTAs" 
          value="12" 
          trend="+3 vs last quarter" 
          trendStatus="up" 
          icon={Globe2} 
          colorClass="text-indigo-400" 
        />
        <StatCard 
          title="Avg. Tariff Reduction" 
          value="-4.2%" 
          trend="Higher impact in tech sector" 
          trendStatus="up" 
          icon={BarChart3} 
          colorClass="text-emerald-400" 
        />
        <StatCard 
          title="Projected Growth (2026)" 
          value="+15.8%" 
          trend="Driven by UK-India FTA" 
          trendStatus="up" 
          icon={LayoutDashboard} 
          colorClass="text-amber-400" 
        />
      </section>

      {/* Category Nav Layer */}
      <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 scrollbar-none">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
        >
          All Intelligence
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <TariffTable 
        loading={loading} 
        error={error} 
        tariffs={tariffs} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        loadMore={loadMore}
        hasMore={hasMore}
        onViewProduct={onViewProduct}
      />
    </div>
  )
}

export default DashboardView
