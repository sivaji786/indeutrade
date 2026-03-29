import { Search, BarChart3, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'

const TariffTable = ({ loading, error, tariffs, searchTerm, setSearchTerm, loadMore, hasMore, onViewProduct }) => {
  const observerRef = useRef()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (observerRef.current) observer.observe(observerRef.current)
    return () => { if (observerRef.current) observer.unobserve(observerRef.current) }
  }, [hasMore, loading, loadMore])

  return (
    <section className="rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
      <div className="p-8 border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card-2)' }}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="text-left">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>2026 FTA Tariff Directory</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Deep intelligence for India-UK/EU trade corridors.</p>
          </div>
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by product, HS code or country..." 
              className="w-full rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none transition-all border"
              style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: 'var(--bg-card-2)', color: 'var(--text-secondary)' }}>
              <th className="py-6 px-8 text-left">Product Intelligence</th>
              <th className="py-6 px-8 text-left">HS Code</th>
              <th className="py-6 px-8 text-left">Trade Corridor</th>
              <th className="py-6 px-8 text-left">Tariff Rate</th>
              <th className="py-6 px-8 text-left">Action</th>
            </tr>
          </thead>
          <tbody style={{ borderColor: 'var(--border-card)' }}>
            {tariffs.map((t, idx) => (
              <tr 
                key={idx} 
                onClick={() => onViewProduct(t)}
                className="hover:bg-blue-600/[0.04] transition-colors group cursor-pointer border-t"
                style={{ borderColor: 'var(--border-card)' }}
              >
                <td className="py-6 px-8 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300" style={{ backgroundColor: 'var(--bg-item-hover)', color: 'var(--text-secondary)' }}>
                       <BarChart3 size={18} />
                    </div>
                    <div>
                      <span className="font-bold group-hover:text-blue-500 transition-colors block" style={{ color: 'var(--text-primary)' }}>{t.product_name}</span>
                      <span className="text-[10px] uppercase tracking-widest font-black" style={{ color: 'var(--text-muted)' }}>{t.category}</span>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-8 text-left font-mono text-sm group-hover:text-slate-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>{t.hs_code}</td>
                <td className="py-6 px-8 text-left">
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <span style={{ color: 'var(--text-secondary)' }}>{t.source_country}</span>
                    <ArrowRight size={14} className="text-blue-500" />
                    <span style={{ color: 'var(--text-primary)' }}>{t.destination_country}</span>
                  </div>
                </td>
                <td className="py-6 px-8 text-left">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-black shadow-sm ${parseFloat(t.tariff_rate) == 0 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'}`}>
                    {parseFloat(t.tariff_rate).toFixed(2)}%
                  </span>
                </td>
                <td className="py-6 px-8 text-left">
                   <button 
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-blue-500 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                   >
                     Analytical View <ExternalLink size={14} />
                   </button>
                </td>
              </tr>
            ))}
            
            {loading && (
              <tr><td colSpan="5" className="py-10 text-center font-medium" style={{ color: 'var(--text-muted)' }}>Decrypting further intelligence...</td></tr>
            )}
            
            {!loading && hasMore && (
              <tr ref={observerRef}><td colSpan="5" className="h-4"></td></tr>
            )}
            
            {error && (
              <tr><td colSpan="5" className="py-20 text-center text-red-500/80 font-semibold bg-red-500/5">Database Connectivity Issue: {error}</td></tr>
            )}
            
            {!loading && tariffs.length === 0 && (
              <tr><td colSpan="5" className="py-20 text-center font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Spectral search yielded no results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TariffTable
