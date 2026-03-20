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
    <section className="bg-[#0b1120] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-800 bg-[#0f172a]/20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="text-left">
            <h2 className="text-xl font-bold">2026 FTA Tariff Directory</h2>
            <p className="text-sm text-slate-500 mt-1">Deep intelligence for India-UK/EU trade corridors.</p>
          </div>
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by product, HS code or country..." 
              className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0f172a]/40 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
              <th className="py-6 px-8 text-left">Product Intelligence</th>
              <th className="py-6 px-8 text-left">HS Code</th>
              <th className="py-6 px-8 text-left">Trade Corridor</th>
              <th className="py-6 px-8 text-left">Tariff Rate</th>
              <th className="py-6 px-8 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {tariffs.map((t, idx) => (
              <tr 
                key={idx} 
                onClick={() => onViewProduct(t)}
                className="hover:bg-blue-600/[0.03] transition-colors group cursor-pointer"
              >
                <td className="py-6 px-8 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                       <BarChart3 size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors block">{t.product_name}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{t.category}</span>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-8 text-left font-mono text-sm text-slate-500 group-hover:text-slate-300 transition-colors">{t.hs_code}</td>
                <td className="py-6 px-8 text-left">
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <span className="text-slate-300">{t.source_country}</span>
                    <ArrowRight size={14} className="text-blue-500" />
                    <span className="text-white">{t.destination_country}</span>
                  </div>
                </td>
                <td className="py-6 px-8 text-left">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-black shadow-sm ${parseFloat(t.tariff_rate) == 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {parseFloat(t.tariff_rate).toFixed(2)}%
                  </span>
                </td>
                <td className="py-6 px-8 text-left">
                   <button 
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors"
                   >
                     Analytical View <ExternalLink size={14} />
                   </button>
                </td>
              </tr>
            ))}
            
            {loading && (
              <tr><td colSpan="5" className="py-10 text-center text-slate-500 font-medium">Decrypting further intelligence...</td></tr>
            )}
            
            {!loading && hasMore && (
              <tr ref={observerRef}><td colSpan="5" className="h-4"></td></tr>
            )}
            
            {error && (
              <tr><td colSpan="5" className="py-20 text-center text-red-500/80 font-semibold bg-red-500/5">Database Connectivity Issue: {error}</td></tr>
            )}
            
            {!loading && tariffs.length === 0 && (
              <tr><td colSpan="5" className="py-20 text-center text-slate-600 font-bold uppercase tracking-widest">Spectral search yielded no results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TariffTable
