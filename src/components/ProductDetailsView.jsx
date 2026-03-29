import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, Download, ShieldCheck, Globe2, TrendingUp, FileText, 
  Info, AlertTriangle, Zap, Sparkles, Globe, History, Clock, Factory, MapPin, RefreshCw,
  Target, BarChart2, TrendingDown, Package, DollarSign, Ship, BookOpen, TriangleAlert, Lightbulb, Star
} from 'lucide-react'
import CostSavingsCalculator from './CostSavingsCalculator'
import TradeIntelligenceReport from './TradeIntelligenceReport'

const MarketShareChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;
  
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const colors = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444'];

  return (
    <div className="flex items-center gap-8">
      <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-48 h-48 -rotate-90">
        {data.map((item, i) => {
          const percent = item.value / total;
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = percent > 0.5 ? 1 : 0;
          const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
          ].join(' ');
          return <path key={i} d={pathData} fill={colors[i % colors.length]} className="transition-all hover:opacity-80" />;
        })}
        <circle cx="0" cy="0" r="0.6" fill="var(--bg-card)" />
      </svg>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{item.label} ({Math.round(item.value/total*100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GrowthTrendChart = ({ data }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - min) / (range || 1)) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="w-full h-48 relative mt-4">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points={areaPoints} fill="url(#growthGradient)" />
        {data.map((d, i) => (
          <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - ((d.value - min) / (range || 1)) * 80 - 10} r="1.5" fill="#3b82f6" />
        ))}
      </svg>
      <div className="flex justify-between mt-4">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] font-black tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>{d.year}</span>
        ))}
      </div>
    </div>
  );
};

const MiniBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.volume || d.price || d.value || 0));
  
  return (
    <div className="flex items-end justify-between h-32 gap-2 mt-4">
      {data.map((d, i) => {
        const val = d.volume || d.price || d.value || 0;
        const height = (val / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full bg-blue-600/10 rounded-t-lg relative transition-all group-hover:bg-blue-600/30" style={{ height: `${height}%` }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter" style={{ color: 'var(--text-muted)' }}>{d.year || d.period || d.label}</span>
          </div>
        );
      })}
    </div>
  );
};

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
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const row = (label, value) => [esc(label), esc(value)]
    const sep = (title) => [esc(`--- ${title} ---`), '']

    const rows = [
      sep('PRODUCT DATA'),
      row('HS Code', product.hs_code),
      row('Product Name', product.product_name),
      row('Description', product.hsn_description),
      row('Category', product.category),
      row('Source Node', product.source_country),
      row('Destination Node', product.destination_country),
      row('FTA Tariff Rate (%)', product.tariff_rate),
      row('Market Growth (%)', product.market_growth),
      row('Trade Volume (USD M)', product.trade_volume),
      row('Regulatory Notes', product.regulatory_notes),
      row('Fiscal Information', product.tax_info),

      sep('1. EXECUTIVE SUMMARY'),
      row('Headline', aiData?.executive_summary?.headline || ''),
      row('Overview', aiData?.executive_summary?.overview || ''),
      row('Key Highlights', (aiData?.executive_summary?.key_highlights || []).join(' | ')),
      row('Confidence Score', aiData?.executive_summary?.confidence_score ? `${aiData.executive_summary.confidence_score}%` : ''),

      sep('2. MARKET OVERVIEW'),
      row('Description', aiData?.market_overview?.description || ''),
      row('Market Size (USD)', aiData?.market_overview?.market_size_usd || ''),
      row('Key Players', (aiData?.market_overview?.key_players || []).join(' | ')),
      row('Market Trends', (aiData?.market_overview?.trends || []).join(' | ')),

      sep('3. MARKET SIZE & FORECAST'),
      row('Current Market Size', aiData?.market_size_forecast?.current_size || ''),
      row('Projected 2026', aiData?.market_size_forecast?.projected_2026 || ''),
      row('Projected 2030', aiData?.market_size_forecast?.projected_2030 || ''),
      row('CAGR', aiData?.market_size_forecast?.cagr || ''),
      row('Forecast Notes', aiData?.market_size_forecast?.forecast_notes || ''),

      sep('4. DEMAND ANALYSIS'),
      row('Demand Drivers', (aiData?.demand_analysis?.demand_drivers || []).join(' | ')),
      row('Demand Constraints', (aiData?.demand_analysis?.demand_constraints || []).join(' | ')),
      row('End-User Segments', (aiData?.demand_analysis?.end_user_segments || []).join(' | ')),

      sep('5. SUPPLIER LANDSCAPE'),
      row('Tier-1 Suppliers', (aiData?.supplier_landscape?.tier1 || []).join(' | ')),
      row('Tier-2 Suppliers', (aiData?.supplier_landscape?.tier2 || []).join(' | ')),
      row('Market Concentration', aiData?.supplier_landscape?.market_concentration || ''),
      row('Sourcing Risks', (aiData?.supplier_landscape?.sourcing_risks || []).join(' | ')),

      sep('6. PRICING ANALYSIS'),
      row('Avg Unit Price', aiData?.pricing_analysis?.avg_unit_price || ''),
      row('Price Trend', aiData?.pricing_analysis?.price_trend || ''),
      row('Price Drivers', (aiData?.pricing_analysis?.price_drivers || []).join(' | ')),
      row('Benchmark vs Global', aiData?.pricing_analysis?.benchmark_vs_global || ''),

      sep('7. TRADE ANALYSIS (IMPORT/EXPORT)'),
      row('Import Volume', aiData?.trade_analysis?.import_volume || ''),
      row('Export Volume', aiData?.trade_analysis?.export_volume || ''),
      row('Trade Balance', aiData?.trade_analysis?.trade_balance || ''),
      row('Top Corridors', (aiData?.trade_analysis?.top_corridors || []).join(' | ')),
      row('YoY Growth', aiData?.trade_analysis?.yoy_growth || ''),

      sep('8. REGULATIONS'),
      row('Key Regulations', (aiData?.regulations_detail?.key_regulations || []).join(' | ')),
      row('Compliance Steps', (aiData?.regulations_detail?.compliance_steps || []).join(' | ')),
      row('Certification Bodies', (aiData?.regulations_detail?.certification_bodies || []).join(' | ')),

      sep('9. RISK ANALYSIS'),
      ...((aiData?.risk_analysis?.risks || []).map((r, i) => row(`Risk ${i+1} (${r.level})`, `${r.title}: ${r.description}`))),
      row('Overall Risk Rating', aiData?.risk_analysis?.overall_risk_rating || ''),

      sep('10. OPPORTUNITIES & RECOMMENDATIONS'),
      ...((aiData?.opportunities?.recommendations || []).map((r, i) => row(`Rec ${i+1} (${r.priority})`, `${r.title}: ${r.description}`))),
      row('Implementation Timeline', aiData?.opportunities?.timeline || ''),

      sep('FTA INTELLIGENCE'),
      row('AI: FTA Impact Title', aiData?.fta_impact?.title || ''),
      row('AI: Forecast 2026-2030', aiData?.market_intelligence?.forecast_2026_2030 || ''),
      row('AI: Key Growth Hub', aiData?.market_intelligence?.growth_hub || ''),
    ]

    const csvContent = ['Intelligence Field,Synthesized Value', ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `TRADE_INTEL_${product.hs_code}.csv`
    link.click()
  }

  const handleSyncIntelligence = () => { fetchAiIntelligence(true); };
  const handleExportPDF = () => { window.print(); };

  /* ---- shared inline style helpers ---- */
  const card = { backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }
  const card2 = { backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 pb-20 print:m-0 print:p-0">
      {/* PDF Report (Hidden in UI) */}
      <TradeIntelligenceReport product={product} aiData={aiData} />

      {/* Main UI */}
      <div className="space-y-12 print:hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
          <button
            onClick={onBack}
            className="flex items-center gap-3 group transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"
              style={{ backgroundColor: 'var(--bg-item-hover)', color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-black uppercase tracking-widest">Back to Directory</span>
          </button>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={handleSyncIntelligence}
              disabled={loadingAi}
              className="px-6 py-4 rounded-2xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 border"
              style={{ backgroundColor: 'var(--bg-item-hover)', borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }}
              title="Force Re-Sync with Gemini AI"
            >
              <RefreshCw size={18} className={loadingAi ? 'animate-spin' : ''} />
              <span className="text-[10px] font-black uppercase tracking-widest">Sync Intel</span>
            </button>

            <div className="px-5 py-2.5 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-3">
              <Sparkles size={16} className={`text-blue-500 ${loadingAi ? 'animate-spin' : 'animate-pulse'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
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
                <div
                  className="absolute right-0 top-full mt-4 w-56 rounded-2xl shadow-2xl p-2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300 border"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
                >
                  <button
                    onClick={() => { handleExportCSV(); setShowExportMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest hover:bg-blue-600/10"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <FileText size={16} className="text-blue-500" />
                    Excel / CSV Data
                  </button>
                  <button
                    onClick={() => { handleExportPDF(); setShowExportMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest hover:bg-blue-600/10"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Zap size={16} className="text-emerald-500" />
                    Premium PDF Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Info Hero */}
        <section
          className="rounded-[3rem] p-10 relative overflow-hidden border print:bg-white print:text-black print:border-slate-200 print:rounded-3xl"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 print:hidden">
            <Zap size={200} className="text-blue-500" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  HS Intelligence Active
                </span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  2026 FTA Protocols
                </span>
              </div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter" style={{ color: 'var(--text-heading)' }}>{product.product_name}</h1>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>{product.hsn_description}</p>

              <div className="mt-8 flex items-center gap-12">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Source Node</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>{product.source_country}</p>
                </div>
                <div className="w-px h-10" style={{ backgroundColor: 'var(--border-main)' }}></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Destination Node</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>{product.destination_country}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] p-8 border shadow-inner grid grid-cols-2 gap-8" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>HS Code</p>
                <p className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{product.hs_code}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Effective Rate</p>
                <p className={`text-3xl font-black tracking-tighter ${parseFloat(product.tariff_rate) === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {parseFloat(product.tariff_rate).toFixed(2)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Estimated Volume</p>
                <p className="text-3xl font-black tracking-tighter" style={{ color: 'var(--text-heading)' }}>${product.trade_volume}M</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Growth Index</p>
                <p className="text-3xl font-black text-indigo-500 tracking-tighter">+{product.market_growth}%</p>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        {(product.category === 'Machinery' || product.category === 'Electronics') && (
          <section className="animate-in fade-in zoom-in duration-1000 delay-300">
            <CostSavingsCalculator
              basePrice={parseFloat(product.trade_volume) * 1000}
              productName={product.product_name}
            />
          </section>
        )}

        {/* AI Synthesis Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Trade Agreement Impact */}
          <section className="rounded-[3rem] p-10 relative overflow-hidden border print:bg-white print:text-black" style={card}>
            <div className="absolute top-0 right-0 p-8 text-blue-500/10 print:hidden">
              <ShieldCheck size={120} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>{aiData?.fta_impact?.title || 'Trade Agreement Impact'}</h3>
            </div>
            <p className="leading-relaxed mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>
              {aiData?.fta_impact?.description || 'Deep synthesis of Jan 2026 India-EU FTA and April 2026 India-UK CETA protocols.'}
            </p>
            <div className="space-y-4">
              {(aiData?.fta_impact?.key_changes || ["Zero duty shift", "Simplified certification", "Green channel logistics"]).map((change, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{change}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Market Intelligence */}
          <section className="rounded-[3rem] p-10 relative overflow-hidden border print:bg-white print:text-black" style={card}>
            <div className="absolute top-0 right-0 p-8 text-indigo-500/10 print:hidden">
              <TrendingUp size={120} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Market Intelligence (2026-2030)</h3>
            </div>
            <div className="p-6 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">Primary Growth Hub</span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>{aiData?.market_intelligence?.growth_hub || 'Asia-Pacific (India)'}</span>
            </div>
            <p className="leading-relaxed mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
              {aiData?.market_intelligence?.forecast_2026_2030 || 'Strategic hub forecast for the machinery sector in the Indo-Pacific region.'}
            </p>
            <div className="flex flex-wrap gap-3">
              {(aiData?.market_intelligence?.growth_hubs || ["Bangalore", "Chennai", "Gujarat"]).map((hub, i) => (
                <span key={i} className="px-5 py-2 rounded-full text-xs font-bold border" style={{ backgroundColor: 'var(--bg-item-hover)', borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }}>
                  {hub}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Intelligence Matrix */}
        <section className="rounded-[3.5rem] p-12 overflow-hidden relative border" style={card}>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <History size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-heading)' }}>Intelligence Matrix: 2026 Framework</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-black uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-muted)' }}>
                <Clock size={16} /> Pre-2026 Framework
              </div>
              <div className="space-y-4">
                {(aiData?.requirements_comparison?.historical || ["High Tariffs (12% Avg)", "Manual Certification", "Complex RoO Filing"]).map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-3xl border grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-widest text-[10px]">
                <Zap size={16} /> 2026 AI-Ready Framework
              </div>
              <div className="space-y-4">
                {(aiData?.requirements_comparison?.future_2026 || ["0% Duty Optimization", "AI Predictive Maintenance", "Sustainability Compliance 2026", "Digital RoO Validation"]).map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-blue-600/5 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance Card */}
          <div className="p-10 rounded-[2.5rem] space-y-6 border" style={card}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Regulatory Path</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.regulatory_notes}</p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Customs Notification Required
              </div>
              <div className="flex items-center gap-3 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                RoO Self-Certification Active
              </div>
            </div>
          </div>

          {/* Fiscal Card */}
          <div className="p-10 rounded-[2.5rem] space-y-6 border" style={card}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Fiscal Framework</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.tax_info}</p>
            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider leading-relaxed">
                  Fiscal calculations based on 2026 projected indexed rates. Subject to final gazette notice.
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Context Card */}
          <div className="p-10 rounded-[2.5rem] space-y-6 border" style={card}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Globe2 size={24} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Strategic Context</h3>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b pb-4" style={{ borderColor: 'var(--border-card)' }}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Effective Date</p>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{product.effective_date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Market Cycle</p>
                  <p className="font-bold text-blue-500">Q1 2026 Phase</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Trading Protocol</p>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Preferential FTA</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Priority Level</p>
                  <span className="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-black text-white">HI-STRAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Directory */}
        {aiData?.regional_directory && (
          <section className="rounded-[3rem] p-12 relative overflow-hidden border" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-2) 100%)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <div className="absolute top-0 right-0 p-12 text-blue-500/5">
              <Factory size={160} />
            </div>
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>AI-Synthesized Manufacturer Directory</h3>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Strategic Tier-1 Suppliers & Regional Clusters</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {aiData.regional_directory.map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] hover:shadow-md transition-all group border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4 block">{item.region} Cluster</span>
                  <div className="space-y-4 mb-6">
                    {item.manufacturers.map((m, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full group-hover:bg-blue-500 transition-colors" style={{ backgroundColor: 'var(--border-main)' }}></div>
                        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Specialization</p>
                    <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Market Availability Table */}
        <section className="rounded-[2.5rem] overflow-hidden border" style={card}>
          <div className="p-8 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>Market Availability & Manufacturers</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Granular intelligence on specific products and regional capacity.</p>
            </div>
            <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              Live Market Feed
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: 'var(--bg-card-2)', color: 'var(--text-secondary)' }}>
                  <th className="py-6 px-8 text-left">Sub-Product / Component</th>
                  <th className="py-6 px-8 text-left">Primary Manufacturer</th>
                  <th className="py-6 px-8 text-left">Production Capacity</th>
                  <th className="py-6 px-8 text-left">Logistics Lead Time</th>
                </tr>
              </thead>
              <tbody>
                {product.market_data ? JSON.parse(product.market_data).map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-600/[0.04] transition-colors group border-t" style={{ borderColor: 'var(--border-card)' }}>
                    <td className="py-6 px-8 text-left">
                      <span className="font-bold group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{item.product_name}</span>
                    </td>
                    <td className="py-6 px-8 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border" style={{ backgroundColor: 'var(--bg-item-hover)', borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }}>
                          {item.manufacturer.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.manufacturer}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-left">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.capacity}</span>
                    </td>
                    <td className="py-6 px-8 text-left">
                      <div className="px-3 py-1 rounded-lg text-[10px] font-bold inline-block border" style={{ backgroundColor: 'var(--bg-item-hover)', color: 'var(--text-primary)', borderColor: 'var(--border-main)' }}>
                        {item.lead_time}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center italic" style={{ color: 'var(--text-muted)' }}>
                      Market intelligence for this HSN segment is currently being indexed.
                      Please trigger a "Real Intelligence Sync" to refresh.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* ====== 10 NEW INTELLIGENCE SECTIONS ====== */}

        {/* 1. Executive Summary */}
        {aiData?.executive_summary && (
          <section className="rounded-[3rem] p-10 border relative overflow-hidden" style={card}>
            <div className="absolute top-0 right-0 p-10 opacity-5"><Star size={160} /></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20"><Star size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-1">Section 1</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Executive Summary</h2>
              </div>
              <div className="ml-auto px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-black">
                {aiData.executive_summary.confidence_score}% Confidence
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-active)' }}>{aiData.executive_summary.headline}</h3>
            <p className="leading-relaxed mb-8 text-base" style={{ color: 'var(--text-secondary)' }}>{aiData.executive_summary.overview}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(aiData.executive_summary.key_highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5">{i+1}</div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{h}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Market Overview */}
        {aiData?.market_overview && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><Globe size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Section 2</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Market Overview</h2>
              </div>
              <div className="ml-auto px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-black">
                {aiData.market_overview.market_size_usd}
              </div>
            </div>
            <p className="leading-relaxed mb-8 text-base" style={{ color: 'var(--text-secondary)' }}>{aiData.market_overview.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Market Share Distribution</p>
                <div className="p-8 rounded-[2rem] border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                   <MarketShareChart data={aiData.market_overview.market_share_data} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Key Market Players</p>
                  <div className="space-y-2">
                    {(aiData.market_overview.key_players || []).map((p, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border text-xs" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 font-black">{p.charAt(0)}</div>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Market Trends</p>
                  <div className="flex flex-wrap gap-2">
                    {(aiData.market_overview.trends || []).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full text-[10px] font-bold border" style={{ backgroundColor: 'var(--bg-item-hover)', borderColor: 'var(--border-main)', color: 'var(--text-secondary)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Market Size & Forecast */}
        {aiData?.market_size_forecast && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><BarChart2 size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Section 3</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Market Size & Forecast</h2>
              </div>
              <div className="ml-auto px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black">
                CAGR {aiData.market_size_forecast.cagr}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Current Market Size', value: aiData.market_size_forecast.current_size, color: 'text-slate-500' },
                { label: 'Projected (2026)', value: aiData.market_size_forecast.projected_2026, color: 'text-blue-500' },
                { label: 'Projected (2030)', value: aiData.market_size_forecast.projected_2030, color: 'text-emerald-500' },
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-2xl border text-center" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
                  <p className={`text-3xl font-black tracking-tight ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-8">
              <div className="p-8 rounded-[2.5rem] border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Growth Projection (Indexed)</p>
                <GrowthTrendChart data={aiData.market_size_forecast.growth_trend_data} />
              </div>
              <div className="p-8 rounded-[2.5rem] bg-blue-600/5 border border-blue-500/15">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">Strategic Forecast Analysis</p>
                <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>{aiData.market_size_forecast.forecast_notes}</p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Demand Analysis */}
        {aiData?.demand_analysis && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20"><TrendingUp size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Section 4</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Demand Analysis</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-emerald-600">Demand Drivers</p>
                <div className="space-y-3">
                  {(aiData.demand_analysis.demand_drivers || []).map((d, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-red-500">Demand Constraints</p>
                <div className="space-y-3">
                  {(aiData.demand_analysis.demand_constraints || []).map((d, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/15">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>End-User Segments</p>
              <div className="flex flex-wrap gap-3">
                {(aiData.demand_analysis.end_user_segments || []).map((s, i) => (
                  <span key={i} className="px-5 py-2.5 rounded-full text-xs font-black border bg-indigo-500/5 border-indigo-500/20 text-indigo-600">{s}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Supplier Landscape */}
        {aiData?.supplier_landscape && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20"><Package size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Section 5</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Supplier Landscape</h2>
              </div>
              <div className="ml-auto px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold">
                {aiData.supplier_landscape.market_concentration}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-blue-600">Tier-1 Suppliers</p>
                <div className="space-y-2">
                  {(aiData.supplier_landscape.tier1 || []).map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                      <span className="w-5 h-5 rounded bg-blue-500 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">T1</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Tier-2 Suppliers</p>
                <div className="space-y-2">
                  {(aiData.supplier_landscape.tier2 || []).map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                      <span className="w-5 h-5 rounded border text-[9px] font-black flex items-center justify-center flex-shrink-0" style={{ borderColor: 'var(--border-main)', color: 'var(--text-muted)' }}>T2</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-red-500">Sourcing Risks</p>
              <div className="space-y-3">
                {(aiData.supplier_landscape.sourcing_risks || []).map((r, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/15">
                    <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Pricing Analysis */}
        {aiData?.pricing_analysis && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><DollarSign size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Section 6</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Pricing Analysis</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Historical Price Volatility (Indexed)</p>
                <div className="p-8 rounded-[2.5rem] border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                   <MiniBarChart data={aiData.pricing_analysis.historical_price_data} />
                </div>
              </div>
              <div className="space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Competitive Pricing Context</p>
                 <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{aiData.pricing_analysis.benchmark_vs_global}</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/15">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Price Trend Forecast</p>
                    <div className="flex items-center gap-3">
                      <TrendingDown size={20} className="text-blue-500" />
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{aiData.pricing_analysis.price_trend}</span>
                    </div>
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. Trade Analysis */}
        {aiData?.trade_analysis && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20"><Ship size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Section 7</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Trade Analysis (Import / Export)</h2>
              </div>
              <div className="ml-auto px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-black">
                YoY {aiData.trade_analysis.yoy_growth}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Import Volume', value: aiData.trade_analysis.import_volume, color: 'text-blue-500' },
                { label: 'Export Volume', value: aiData.trade_analysis.export_volume, color: 'text-indigo-500' },
                { label: 'Trade Balance', value: aiData.trade_analysis.trade_balance, color: 'text-amber-500' },
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-2xl border text-center" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Top Trade Corridors</p>
              <div className="space-y-3">
                {(aiData.trade_analysis.top_corridors || []).map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                    <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{i+1}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. Regulations */}
        {aiData?.regulations_detail && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20"><BookOpen size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">Section 8</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Regulations & Compliance</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-purple-500">Key Regulations</p>
                <div className="space-y-3">
                  {(aiData.regulations_detail.key_regulations || []).map((r, i) => (
                    <div key={i} className="p-4 rounded-2xl border bg-purple-500/5 border-purple-500/15">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Compliance Steps</p>
                <div className="space-y-3">
                  {(aiData.regulations_detail.compliance_steps || []).map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-600 text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Certification Bodies</p>
                <div className="space-y-3">
                  {(aiData.regulations_detail.certification_bodies || []).map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                      <ShieldCheck size={16} className="text-purple-500 flex-shrink-0" />
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 9. Risk Analysis */}
        {aiData?.risk_analysis && (
          <section className="rounded-[3rem] p-10 border" style={card}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20"><TriangleAlert size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Section 9</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Risk Analysis</h2>
              </div>
              <div className={`ml-auto px-5 py-2 rounded-full text-xs font-black border ${
                aiData.risk_analysis.overall_risk_rating === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-600' :
                aiData.risk_analysis.overall_risk_rating === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
              }`}>
                Overall: {aiData.risk_analysis.overall_risk_rating} Risk
              </div>
            </div>
            <div className="space-y-4">
              {(aiData.risk_analysis.risks || []).map((r, i) => {
                const colors = r.level === 'High'
                  ? { bg: 'bg-red-500/5', border: 'border-red-500/20', badge: 'bg-red-500 text-white', icon: 'text-red-500' }
                  : r.level === 'Medium'
                  ? { bg: 'bg-amber-500/5', border: 'border-amber-500/20', badge: 'bg-amber-500 text-white', icon: 'text-amber-500' }
                  : { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', badge: 'bg-emerald-500 text-white', icon: 'text-emerald-500' }
                return (
                  <div key={i} className={`flex items-start gap-5 p-6 rounded-2xl border ${colors.bg} ${colors.border}`}>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex-shrink-0 ${colors.badge}`}>{r.level}</span>
                    <div>
                      <p className="font-bold mb-1" style={{ color: 'var(--text-heading)' }}>{r.title}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* 10. Opportunities & Recommendations */}
        {aiData?.opportunities && (
          <section className="rounded-[3rem] p-10 border" style={{ ...card, background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-2) 100%)' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><Lightbulb size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Section 10</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-heading)' }}>Opportunities & Recommendations</h2>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              {(aiData.opportunities.recommendations || []).map((r, i) => {
                const p = r.priority
                const colors = p === 'Critical'
                  ? { border: 'border-red-500/30', bg: 'bg-red-500/5', badge: 'bg-red-500', num: 'bg-red-500/20 text-red-600' }
                  : p === 'High'
                  ? { border: 'border-amber-500/30', bg: 'bg-amber-500/5', badge: 'bg-amber-500', num: 'bg-amber-500/20 text-amber-600' }
                  : { border: 'border-blue-500/30', bg: 'bg-blue-500/5', badge: 'bg-blue-500', num: 'bg-blue-500/20 text-blue-600' }
                return (
                  <div key={i} className={`flex items-start gap-5 p-6 rounded-2xl border ${colors.border} ${colors.bg}`}>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 ${colors.badge}`}>{i+1}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${colors.num}`}>{p}</span>
                    </div>
                    <div>
                      <p className="font-bold mb-1" style={{ color: 'var(--text-heading)' }}>{r.title}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2">
                <Clock size={12} /> Implementation Timeline
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{aiData.opportunities.timeline}</p>
            </div>
          </section>
        )}

        {/* Footer Notice */}
        <div className="p-8 rounded-3xl flex items-center justify-between border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
          <div className="flex items-center gap-4 italic text-sm" style={{ color: 'var(--text-muted)' }}>
            <Info size={18} />
            Data veracity verified against India-UK FTA Draft v4.2 and EU Trade Portals.
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
            Secure Node Encryption Active
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetailsView
