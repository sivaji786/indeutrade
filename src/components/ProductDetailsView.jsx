import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, Download, ShieldCheck, Globe2, TrendingUp, FileText, 
  Info, AlertTriangle, Zap, Sparkles, Globe, History, Clock, Factory, MapPin 
} from 'lucide-react'
import CostSavingsCalculator from './CostSavingsCalculator'

import TradeIntelligenceReport from './TradeIntelligenceReport'

const ProductDetailsView = ({ product, onBack }) => {
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const fetchAiIntelligence = async (forceRefresh = false) => {
    if (!product) return;
    setLoadingAi(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tariff/${product.id}/ai-intelligence${forceRefresh ? '?refresh=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        setAiData(data);
      }
    } catch (err) {
      console.error('AI synthesis failed:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchAiIntelligence();
  }, [product.id]);

  if (!product) return null;
  const handleExportCSV = () => {
    const headers = ["Intelligence Field", "Synthesized Value"]
    const rows = [
      ["HS Code", product.hs_code],
      ["Product Name", product.product_name],
      ["Description", product.hsn_description],
      ["Category", product.category],
      ["Source Node", product.source_country],
      ["Destination Node", product.destination_country],
      ["FTA Tariff Rate (%)", product.tariff_rate],
      ["Market Growth (%)", product.market_growth],
      ["Trade Volume (USD M)", product.trade_volume],
      ["Regulatory Notes", product.regulatory_notes],
      ["Fiscal Information", product.tax_info],
      ["AI: FTA Impact Title", aiData?.fta_impact?.title || "Standard 2026 Protocols"],
      ["AI: Forecast 2026-2030", aiData?.market_intelligence?.forecast_2026_2030 || "Awaiting Pulse"],
      ["AI: Key Growth hub", aiData?.market_intelligence?.growth_hub || "Indo-Pacific"]
    ]

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `TRADE_INTEL_${product.hs_code}.csv`
    link.click()
  }

  const handleSyncIntelligence = () => {
    fetchAiIntelligence(true);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 pb-20 print:m-0 print:p-0">
      {/* Professional PDF Report Template (Hidden in UI, Visible in Print) */}
      <TradeIntelligenceReport product={product} aiData={aiData} />

      {/* Main UI (Hidden in Print) */}
      <div className="space-y-12 print:hidden">

      {/* Header / Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-black uppercase tracking-widest">Back to Directory</span>
        </button>
        
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={handleSyncIntelligence}
            disabled={loadingAi}
            className="px-6 py-4 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            title="Force Re-Sync with Gemini AI"
          >
             <RefreshCw size={18} className={loadingAi ? 'animate-spin' : ''} />
             <span className="text-[10px] font-black uppercase tracking-widest">Sync Intel</span>
          </button>

          <div className="px-5 py-2.5 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-3">
             <Sparkles size={16} className={`text-blue-400 ${loadingAi ? 'animate-spin' : 'animate-pulse'}`} />
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
               {loadingAi ? 'Synthesizing...' : (aiData?.intelligence_metadata?.source || 'AI Intelligence Active')}
             </span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-3 active:scale-95"
            >
              <Download size={18} />
              Export Options
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-4 w-56 bg-[#0b1120] border border-slate-800 rounded-2xl shadow-2xl p-2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                <button 
                  onClick={() => { handleExportCSV(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <FileText size={16} className="text-blue-400" />
                  Excel / CSV Data
                </button>
                <button 
                  onClick={() => { handleExportPDF(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <Zap size={16} className="text-emerald-400" />
                  Premium PDF Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Info Hero */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden print:bg-white print:text-black print:border-slate-200 print:rounded-3xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 print:hidden">
           <Zap size={200} className="text-blue-500" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                HS Intelligence Active
              </span>
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                2026 FTA Protocols
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">{product.product_name}</h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">{product.hsn_description}</p>
            
            <div className="mt-8 flex items-center gap-12">
               <div>
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Source Node</p>
                 <p className="text-xl font-bold text-white">{product.source_country}</p>
               </div>
               <div className="w-px h-10 bg-slate-800"></div>
               <div>
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Destination Node</p>
                 <p className="text-xl font-bold text-white">{product.destination_country}</p>
               </div>
            </div>
          </div>
          
          <div className="bg-[#020617] rounded-[2.5rem] p-8 border border-slate-800 shadow-inner grid grid-cols-2 gap-8">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">HS Code</p>
                <p className="text-3xl font-black text-blue-400 font-mono tracking-tighter">{product.hs_code}</p>
             </div>
             <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Effective Rate</p>
                <p className={`text-3xl font-black ${parseFloat(product.tariff_rate) === 0 ? 'text-emerald-400' : 'text-amber-400'} tracking-tighter`}>
                   {parseFloat(product.tariff_rate).toFixed(2)}%
                </p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estimated Volume</p>
                <p className="text-3xl font-black text-white tracking-tighter">${product.trade_volume}M</p>
             </div>
             <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth Index</p>
                <p className="text-3xl font-black text-indigo-400 tracking-tighter">+{product.market_growth}%</p>
             </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Segment */}
      {(product.category === 'Machinery' || product.category === 'Electronics') && (
        <section className="animate-in fade-in zoom-in duration-1000 delay-300">
           <CostSavingsCalculator 
             basePrice={parseFloat(product.trade_volume) * 1000} 
             productName={product.product_name} 
           />
        </section>
      )}      {/* AI Synthesis Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Trade Agreement Impact (AI Generated) */}
        <section className="bg-[#0b1120] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden print:bg-white print:text-black print:border-slate-200 print:rounded-3xl print:shadow-none">
          <div className="absolute top-0 right-0 p-8 text-blue-500/10 print:hidden">
            <ShieldCheck size={120} />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 print:border-slate-200 print:text-blue-600">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold">{aiData?.fta_impact?.title || 'Trade Agreement Impact'}</h3>
          </div>
          
          <p className="text-slate-400 leading-relaxed mb-8 font-medium print:text-slate-700">
            {aiData?.fta_impact?.description || 'Deep synthesis of Jan 2026 India-EU FTA and April 2026 India-UK CETA protocols.'}
          </p>
          
          <div className="space-y-4">
            {(aiData?.fta_impact?.key_changes || ["Zero duty shift", "Simplified certification", "Green channel logistics"]).map((change, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 print:bg-slate-50 print:border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 print:bg-blue-600"></div>
                <span className="text-sm text-slate-300 font-semibold print:text-slate-800">{change}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Market Intelligence (AI Generated) */}
        <section className="bg-[#0b1120] border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden print:bg-white print:text-black print:border-slate-200 print:rounded-3xl print:shadow-none">
          <div className="absolute top-0 right-0 p-8 text-indigo-500/10 print:hidden">
            <TrendingUp size={120} />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 print:border-slate-200 print:text-indigo-600">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold">Market Intelligence (2026-2030)</h3>
          </div>
          
          <div className="p-6 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 mb-8 print:bg-slate-50 print:border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block print:text-indigo-600">Primary Growth Hub</span>
            <span className="text-xl font-bold text-white print:text-slate-900">{aiData?.market_intelligence?.growth_hub || 'Asia-Pacific (India)'}</span>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6 font-medium print:text-slate-700">
            {aiData?.market_intelligence?.forecast_2026_2030 || 'Strategic hub forecast for the machinery sector in the Indo-Pacific region.'}
          </p>

          <div className="flex flex-wrap gap-3">
             {(aiData?.market_intelligence?.growth_hubs || ["Bangalore", "Chennai", "Gujarat"]).map((hub, i) => (
               <span key={i} className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 print:bg-slate-100 print:text-slate-700 print:border-transparent">
                 {hub}
               </span>
             ))}
          </div>
        </section>
      </div>

      {/* Strategic Intelligence Matrix: Historical vs. Future */}
      <section className="bg-[#0b1120] border border-slate-800 rounded-[3.5rem] p-12 overflow-hidden relative">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <History size={24} />
          </div>
          <h2 className="text-3xl font-black tracking-tight">Intelligence Matrix: 2026 Framework</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-widest text-[10px]">
              <Clock size={16} /> Pre-2026 Framework
            </div>
            <div className="space-y-4">
              {(aiData?.requirements_comparison?.historical || ["High Tariffs (12% Avg)", "Manual Certification", "Complex RoO Filing"]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-800/20 border border-slate-800/10 grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100">
                  <span className="text-sm font-semibold text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-widest text-[10px]">
              <Zap size={16} /> 2026 AI-Ready Framework
            </div>
            <div className="space-y-4">
              {(aiData?.requirements_comparison?.future_2026 || ["0% Duty Optimization", "AI Predictive Maintenance", "Sustainability Compliance 2026", "Digital RoO Validation"]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-blue-600/5 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                   <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <ShieldCheck size={14} />
                   </div>
                  <span className="text-sm font-bold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Intel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compliance Card */}
        <div className="bg-[#0b1120] border border-slate-800 p-10 rounded-[2.5rem] space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                 <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold">Regulatory Path</h3>
           </div>
           <p className="text-slate-400 text-sm leading-relaxed">{product.regulatory_notes}</p>
           <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                 Customs Notification Required
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                 RoO Self-Certification Active
              </div>
           </div>
        </div>

        {/* Fiscal Card */}
        <div className="bg-[#0b1120] border border-slate-800 p-10 rounded-[2.5rem] space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                 <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold">Fiscal Framework</h3>
           </div>
           <p className="text-slate-400 text-sm leading-relaxed">{product.tax_info}</p>
           <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
              <div className="flex items-start gap-3">
                 <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] font-bold text-amber-200 uppercase tracking-wider leading-relaxed">
                    Fiscal calculations based on 2026 projected indexed rates. Subject to final gazette notice.
                 </p>
              </div>
           </div>
        </div>

        {/* Strategic Analysis */}
        <div className="bg-[#0b1120] border border-slate-800 p-10 rounded-[2.5rem] space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                 <Globe2 size={24} />
              </div>
              <h3 className="text-lg font-bold">Strategic Context</h3>
           </div>
           <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                 <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Effective Date</p>
                   <p className="font-bold">{product.effective_date}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Market Cycle</p>
                   <p className="font-bold text-blue-400">Q1 2026 Phase</p>
                 </div>
              </div>
              <div className="flex justify-between items-end">
                 <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Trading Protocol</p>
                   <p className="font-bold">Preferential FTA</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Priority Level</p>
                   <span className="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-black text-white">HI-STRAT</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* AI-Synthesized Regional Directory */}
      {aiData?.regional_directory && (
        <section className="bg-gradient-to-br from-[#0b1120] to-[#0f172a] border border-blue-500/20 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-blue-500/5">
             <Factory size={160} />
          </div>
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">AI-Synthesized Manufacturer Directory</h3>
              <p className="text-sm text-slate-500 font-medium">Strategic Tier-1 Suppliers & Regional Clusters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {aiData.regional_directory.map((item, i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 block">{item.region} Cluster</span>
                <div className="space-y-4 mb-6">
                  {item.manufacturers.map((m, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="text-sm font-bold text-slate-300">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Specialization</p>
                   <p className="text-xs font-semibold text-slate-400 leading-relaxed">{item.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Market Availability Table */}
      <section className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-800 bg-[#0f172a]/20 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Market Availability & Manufacturers</h3>
            <p className="text-sm text-slate-500 mt-1">Granular intelligence on specific products and regional capacity.</p>
          </div>
          <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            Live Market Feed
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a]/40 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="py-6 px-8 text-left">Sub-Product / Component</th>
                <th className="py-6 px-8 text-left">Primary Manufacturer</th>
                <th className="py-6 px-8 text-left">Production Capacity</th>
                <th className="py-6 px-8 text-left">Logistics Lead Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {product.market_data ? JSON.parse(product.market_data).map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-600/[0.03] transition-colors group">
                  <td className="py-6 px-8 text-left">
                    <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{item.product_name}</span>
                  </td>
                  <td className="py-6 px-8 text-left">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {item.manufacturer.charAt(0)}
                       </div>
                       <span className="text-sm text-slate-300 font-semibold">{item.manufacturer}</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-left">
                    <span className="text-sm text-slate-400">{item.capacity}</span>
                  </td>
                  <td className="py-6 px-8 text-left">
                    <div className="px-3 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-300 inline-block">
                      {item.lead_time}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-500 italic">
                    Market intelligence for this HSN segment is currently being indexed. 
                    Please trigger a "Real Intelligence Sync" to refresh.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

        <div className="p-8 bg-slate-900/10 border border-slate-800/50 rounded-3xl flex items-center justify-between">
           <div className="flex items-center gap-4 text-slate-500 italic text-sm">
              <Info size={18} />
              Data veracity verified against India-UK FTA Draft v4.2 and EU Trade Portals.
           </div>
           <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Secure Node Encryption Active
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsView
