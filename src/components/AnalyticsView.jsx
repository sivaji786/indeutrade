import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Globe, Layers, Zap, Info, ArrowRight, 
  BarChart3, PieChart as PieIcon, Activity, Map as MapIcon
} from 'lucide-react';

const AnalyticsView = () => {
  const [corridorData, setCorridorData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [tradeFlows, setTradeFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [corRes, secRes, flowRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/analytics/corridor-performance`),
          fetch(`${import.meta.env.VITE_API_URL}/analytics/sector-distribution`),
          fetch(`${import.meta.env.VITE_API_URL}/analytics/trade-flows`)
        ]);
        
        setCorridorData(await corRes.json());
        setSectorData(await secRes.json());
        setTradeFlows(await flowRes.json());
      } catch (err) {
        console.error('Analytics Fetch Failure:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) {
     return (
        <div className="h-[600px] flex flex-col items-center justify-center gap-6">
           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse text-xs">Aggregating Visual Intelligence...</p>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                 <Activity className="text-blue-400" size={20} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">Advanced <span className="text-blue-500">Analytics</span></h1>
           </div>
           <p className="text-slate-400 text-sm font-medium">Real-time corridor performance & strategic trade flow mapping (2026 Projections).</p>
        </div>
        
        <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Synthesis</span>
           </div>
           <div className="w-px h-6 bg-slate-800"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Synced: Just Now</span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Active Corridors', value: '12', trend: '+2', icon: Globe, color: 'blue' },
           { label: 'Avg Corridor ROI', value: '14.2x', trend: '+1.4x', icon: Zap, color: 'emerald' },
           { label: 'Trade Density', value: '84%', trend: '+5%', icon: Activity, color: 'amber' },
           { label: 'Analyzed HSN Nodes', value: '1,240', trend: 'Global', icon: Layers, color: 'indigo' }
         ].map((stat, i) => (
           <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                 <stat.icon size={80} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                 <h2 className="text-3xl font-black text-white">{stat.value}</h2>
                 <span className={`text-[10px] font-black px-2 py-1 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                    {stat.trend}
                 </span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Corridor ROI Distribution */}
         <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center gap-3">
               <BarChart3 size={18} className="text-blue-500" /> Corridor ROI Benchmarks
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={corridorData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                     <XAxis dataKey="destination_country" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                     <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '10px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                     />
                     <Bar dataKey="performance_score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Sector Density Analysis */}
         <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center gap-3">
               <Layers size={18} className="text-emerald-500" /> Sector Volume Density
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sectorData}>
                     <PolarGrid stroke="#1e293b" />
                     <PolarAngleAxis dataKey="category" stroke="#64748b" fontSize={9} />
                     <Radar name="Volume" dataKey="volume" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '10px' }}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Trade Flow Sankey (Custom SVG Engine) */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 backdrop-blur-xl">
         <div className="flex justify-between items-center mb-12">
            <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
               <MapIcon size={18} className="text-amber-500" /> High-Fidelity Trade Flow Sankey
            </h3>
            <div className="flex gap-4">
               {['Nodes', 'Flows', 'Density'].map(v => (
                 <div key={v} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{v}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="relative h-[400px] w-full bg-slate-950/50 rounded-2xl p-8 border border-slate-800/50 overflow-hidden">
            {/* SVG Sankey Logic */}
            <svg className="w-full h-full" viewBox="0 0 1000 400">
               {/* Definitions for Gradients */}
               <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                     <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
               </defs>

               {/* Background Decorative Grid */}
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid)" />

               {/* Render Flows */}
               {tradeFlows.map((flow, i) => {
                  const startY = 50 + (i * 60);
                  const endY = 80 + (i * 40);
                  return (
                    <g key={i}>
                       <path 
                          d={`M 150 ${startY} C 450 ${startY}, 550 ${endY}, 850 ${endY}`}
                          fill="none"
                          stroke="url(#flowGradient)"
                          strokeWidth={Math.log(flow.value + 1) * 3}
                          className="opacity-20 hover:opacity-100 transition-opacity duration-300"
                       />
                       {/* Floating Particle Animation (CSS) */}
                       <circle r="2" fill="#fff" className="animate-pulse">
                          <animateMotion 
                             path={`M 150 ${startY} C 450 ${startY}, 550 ${endY}, 850 ${endY}`}
                             dur={`${2 + i}s`}
                             repeatCount="indefinite"
                          />
                       </circle>
                    </g>
                  );
               })}

               {/* Destination Nodes */}
               <g>
                  <rect x="850" y="40" width="100" height="320" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="900" y="200" fill="#10b981" textAnchor="middle" fontSize="10" className="font-black uppercase tracking-widest" transform="rotate(90, 900, 200)">Indo-Pacific Gateway</text>
               </g>

               {/* Source Node */}
               <g>
                   <rect x="50" y="40" width="100" height="320" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                   <text x="100" y="200" fill="#3b82f6" textAnchor="middle" fontSize="10" className="font-black uppercase tracking-widest" transform="rotate(-90, 100, 200)">India Hub (2026)</text>
               </g>
            </svg>

            {/* Overlay Info */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Globe size={16} className="text-white" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Global Node Velocity</p>
                  <p className="text-[8px] text-slate-500 uppercase tracking-tighter">Real-time Trade Pulse</p>
               </div>
            </div>
         </div>
      </div>

      <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-3xl flex items-center justify-between">
         <div className="flex items-center gap-4 text-slate-400 italic text-sm">
            <Info size={18} className="text-blue-500" />
            Intelligence synthesized across 12 corridors and 1,240 HSN nodes using Gemini-1.5-Flash.
         </div>
         <button className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors group">
            <span className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4">Download Intelligence Dump</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
};

export default AnalyticsView;
