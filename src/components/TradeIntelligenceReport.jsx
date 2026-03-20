import React from 'react'
import { Shield, Globe, Zap, Clock, BarChart3, Factory } from 'lucide-react'

const TradeIntelligenceReport = ({ product, aiData }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })

  return (
    <div className="hidden print:block bg-white text-slate-900 p-[15mm] font-serif min-h-[297mm] w-[210mm] mx-auto border border-black/5">
      {/* Header */}
      <header className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-blue-800 uppercase mb-1">INDEUTRADE</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Global Trade Intelligence Suite</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold uppercase text-slate-900">Strategic Intelligence Report</h2>
          <p className="text-xs font-medium text-slate-500">Reference: IT-{product.hs_code}-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <p className="text-xs font-medium text-slate-500">Generated: {today}</p>
          <p className="text-[8px] font-black uppercase tracking-widest text-blue-600 mt-2">
             Source: {aiData?.intelligence_metadata?.source || "Optimized AI Analysis"}
          </p>
        </div>
      </header>

      {/* Product Summary */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-black border-l-4 border-blue-600 pl-4">{product.product_name}</h3>
          <span className="text-lg font-bold text-blue-700">HSN: {product.hs_code}</span>
        </div>
        <div className="grid grid-cols-3 gap-8 bg-slate-50 p-6 border border-slate-200 rounded-lg">
          <div>
             <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Category</p>
             <p className="text-sm font-bold">{product.category}</p>
          </div>
          <div>
             <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Trade Origin</p>
             <p className="text-sm font-bold">{product.source_country} → {product.destination_country}</p>
          </div>
          <div>
             <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Status</p>
             <p className="text-sm font-black text-emerald-600 uppercase">Preferential Eligible</p>
          </div>
        </div>
      </section>      {/* AI Synthesis Section */}
      <section className="mb-12">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Zap size={14} className="text-blue-600" /> Executive AI Synthesis
        </h4>
        <div className="text-sm leading-relaxed text-slate-800 space-y-4 text-justify italic border-l-2 border-slate-200 pl-6">
           {aiData?.fta_impact?.description || "Executive intelligence currently being synthesized by the AI Orchestrator."}
        </div>
      </section>

      {/* financial impact */}
      <section className="mb-12">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <BarChart3 size={14} className="text-blue-600" /> Financial & Duty Analysis
        </h4>
        <div className="grid grid-cols-2 gap-10">
           <div className="border border-slate-200 rounded-lg p-6">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-4">Tariff Structure (2025 vs 2026)</p>
              <div className="space-y-3">
                 <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-medium">Standard Import Duty</span>
                    <span className="text-xs font-bold text-red-600">{aiData?.fta_impact?.duty_reduction?.historical || "12.0"}%</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-100 pb-2 bg-emerald-50">
                    <span className="text-xs font-bold">FTA Preferential Rate 2026</span>
                    <span className="text-xs font-black text-emerald-600">{aiData?.fta_impact?.duty_reduction?.current_2026 || "0.0"}%</span>
                 </div>
                 <div className="flex justify-between pt-2">
                    <span className="text-xs font-bold">Net Margin Impact</span>
                    <span className="text-xs font-black text-blue-600">+{aiData?.fta_impact?.duty_reduction?.historical || "12.0"}% Savings</span>
                 </div>
              </div>
           </div>
           <div className="border border-slate-200 rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Strategic Forecast</p>
              <h5 className="text-lg font-black text-blue-600 mb-1">{aiData?.market_intelligence?.growth_hub || "Asia-Pacific Node"}</h5>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{aiData?.market_intelligence?.strategic_competitive_edge || "AI-Projected Value Multiplier"}</p>
           </div>
        </div>
      </section>

      {/* Compliance Roadmap */}
      <section className="mb-12">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Shield size={14} className="text-blue-600" /> Strategic Intelligence Matrix
        </h4>
        <div className="grid grid-cols-2 gap-8">
           <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 italic font-serif">
              <p className="text-[9px] font-black uppercase text-slate-400 mb-4">Historical Framework</p>
              <ul className="space-y-2">
                 {aiData?.requirements_comparison?.historical?.map((item, i) => (
                    <li key={i} className="text-[11px] text-slate-500">• {item}</li>
                 ))}
              </ul>
           </div>
           <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="text-[9px] font-black uppercase text-blue-400 mb-4">2026 AI-Ready Framework</p>
              <ul className="space-y-2">
                 {aiData?.requirements_comparison?.future_2026?.map((item, i) => (
                    <li key={i} className="text-[11px] font-bold text-blue-800">• {item}</li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="mb-12">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Factory size={14} className="text-blue-600" /> Regional Supplier Directory
        </h4>
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-6">
              {aiData?.regional_directory?.map((dir, i) => (
                <div key={i} className="border-b border-slate-100 last:border-0 pb-4">
                   <p className="text-[10px] font-black text-blue-600 uppercase mb-2">{dir.region} Cluster</p>
                   <ul className="space-y-1">
                      {dir.manufacturers.map((m, j) => (
                        <li key={j} className="text-xs font-bold">{m}</li>
                      ))}
                   </ul>
                   <p className="text-[10px] text-slate-500 mt-2 font-serif italic">{dir.specialization}</p>
                </div>
              ))}
           </div>
           <div className="bg-blue-900 border border-blue-800 rounded-lg p-8 text-white text-center flex flex-col justify-center">
              <Globe size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Corridor Forecast (2026-2030)</p>
              <h6 className="text-xl font-black leading-tight">{aiData?.market_intelligence?.forecast_2026_2030 || "+24% CAGR"}</h6>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-10 border-t border-slate-200 flex justify-between items-center opacity-50">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">INDEUTRADE CONFIDENTIAL | SYSTEM GENERATED</p>
        <p className="text-[10px] font-bold text-slate-500">Page 1 of 1</p>
      </footer>
    </div>
  )
}

export default TradeIntelligenceReport
