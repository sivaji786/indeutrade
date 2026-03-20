import React, { useState, useEffect } from 'react'
import { 
  Zap, Globe2, ShieldCheck, Clock, FileText, AlertTriangle, 
  Edit3, Save, X, Plus, RefreshCw, Layers 
} from 'lucide-react'

const ModuleManagementView = () => {
  const [activeSubTab, setActiveSubTab] = useState('FTA Roadmaps')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const tabs = [
    { name: 'FTA Roadmaps', icon: <Clock size={16} />, endpoint: 'fta/roadmaps' },
    { name: 'FTA Corridors', icon: <Globe2 size={16} />, endpoint: 'fta/corridors' },
    { name: 'Regulations Matrix', icon: <FileText size={16} />, endpoint: 'regulations/matrix' },
    { name: 'Regulatory Alerts', icon: <AlertTriangle size={16} />, endpoint: 'regulations/alerts' }
  ]

  const currentTab = tabs.find(t => t.name === activeSubTab)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${currentTab.endpoint}`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeSubTab])

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditForm(item)
  }

  const handleSave = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${currentTab.endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      if (res.ok) {
        setEditingId(null)
        fetchData()
      }
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-4 border-b border-slate-800 pb-6">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => { setActiveSubTab(tab.name); setEditingId(null); }}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
              activeSubTab === tab.name 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-[#0b1120] text-slate-500 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="text-blue-500 animate-spin" size={32} />
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Loading Dataset...</p>
        </div>
      ) : (
        <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity / Title</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Description / Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">MetaData</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {data.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="px-8 py-6">
                      {editingId === item.id ? (
                        <input 
                          type="text" 
                          value={editForm.title || editForm.name || editForm.hsn_chapter || ''} 
                          onChange={(e) => setEditForm({...editForm, title: e.target.value, name: e.target.value, hsn_chapter: e.target.value})}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                        />
                      ) : (
                        <p className="text-sm font-bold text-white">{item.title || item.name || item.hsn_chapter}</p>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      {editingId === item.id ? (
                        <textarea 
                          value={editForm.description || editForm.status || ''} 
                          onChange={(e) => setEditForm({...editForm, description: e.target.value, status: e.target.value})}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full h-20"
                        />
                      ) : (
                        <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                           {item.description || item.status || 'No data'}
                        </p>
                      )}
                    </td>
                    <td className="px-8 py-6">
                       {editingId === item.id ? (
                         <div className="space-y-2">
                            <input 
                               type="text" 
                               value={editForm.date_label || editForm.growth || editForm.protocol || editForm.type || ''} 
                               placeholder="Label/Value"
                               onChange={(e) => setEditForm({...editForm, date_label: e.target.value, growth: e.target.value, protocol: e.target.value, type: e.target.value})}
                               className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-[10px] text-white w-full"
                            />
                            <input 
                               type="text" 
                               value={editForm.icon_type || editForm.duty || editForm.deadline || ''} 
                               placeholder="Icon/Duty/Deadline"
                               onChange={(e) => setEditForm({...editForm, icon_type: e.target.value, duty: e.target.value, deadline: e.target.value})}
                               className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-[10px] text-white w-full"
                            />
                         </div>
                       ) : (
                         <div className="text-[10px] font-black uppercase text-blue-400 space-y-1">
                            <p>{item.date_label || item.growth || item.protocol || item.type}</p>
                            <p className="text-slate-500">{item.icon_type || item.duty || item.deadline || item.risk_level}</p>
                         </div>
                       )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        {editingId === item.id ? (
                          <>
                            <button 
                              onClick={() => handleSave(item.id)}
                              className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-900/20"
                            >
                              <Save size={14} />
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="w-8 h-8 rounded-lg bg-red-600/10 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-900/20"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <Edit3 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModuleManagementView
