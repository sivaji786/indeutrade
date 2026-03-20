import { useState, useEffect } from 'react'
import { Users, UserPlus, Mail, ShieldCheck, Trash2, Edit2, Search, X } from 'lucide-react'

const UserManagementView = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ email: '', password: '', role: 'subscriber' })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null) // Stores user ID to delete

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError('Failed to load user intelligence')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = editingUser ? 'PUT' : 'POST'
    const url = editingUser 
      ? `${import.meta.env.VITE_API_URL}/users/${editingUser.id}` 
      : `${import.meta.env.VITE_API_URL}/users`

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingUser(null)
        setFormData({ email: '', password: '', role: 'subscriber' })
        fetchUsers()
      }
    } catch (err) {
      alert('Operation failed')
    }
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) return

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/${showDeleteConfirm}`, { method: 'DELETE' })
      setShowDeleteConfirm(null)
      fetchUsers()
    } catch (err) {
      alert('Deletion failed')
    }
  }

  const openEditModal = (user) => {
    setEditingUser(user)
    setFormData({ email: user.email, password: '', role: user.role })
    setShowModal(true)
  }

  return (
    <div className="space-y-8 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            User <span className="text-blue-400">Intelligence</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage system privileges and authentication protocols.</p>
        </div>
        <button 
          onClick={() => { setShowModal(true); setEditingUser(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 text-sm"
        >
          <UserPlus size={18} />
          Provision New User
        </button>
      </div>

      <div className="bg-[#0b1120] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-slate-800 bg-[#0f172a]/20 flex justify-between items-center">
           <div className="relative group w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
              <input 
                type="text" 
                placeholder="Search encrypted directory..." 
                className="w-full bg-[#020617] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-slate-700"
              />
           </div>
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active Node</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800/50">
                <th className="py-5 px-8">Identity Profile</th>
                <th className="py-5 px-8">Security Role</th>
                <th className="py-5 px-8">Provisioned Date</th>
                <th className="py-5 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan="4" className="py-20 text-center text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Decrypting User Data...</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="hover:bg-blue-600/[0.02] transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-200">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-xs font-mono text-slate-500">
                    {user.created_at}
                  </td>
                  <td className="py-5 px-8 text-right space-x-2">
                    <button 
                      onClick={() => openEditModal(user)}
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-blue-600/20 hover:text-blue-400 transition-all border border-transparent hover:border-blue-500/20"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(user.id)}
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-red-600/20 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0b1120] border border-slate-800 rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <Trash2 className="text-red-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Revoke Access?</h3>
            <p className="text-slate-400 text-sm mb-8">You are about to permanently terminate this identity's access to the intelligence network. This action is logged and irreversible.</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 font-black transition-all"
              >
                CANCEL
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 font-black transition-all shadow-lg shadow-red-600/20"
              >
                TERMINATE
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0b1120] border border-slate-800 rounded-[2rem] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-blue-400" />
                {editingUser ? 'Update Protocol' : 'Provision User'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity Endpoint (Email)</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Access Phrase {editingUser && '(Leave blank to retain original)'}
                </label>
                <input 
                  type="password" 
                  required={!editingUser}
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Security Level (Role)</label>
                <select 
                  className="w-full bg-[#020617] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none appearance-none"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="subscriber">Subscriber (Analytics Access)</option>
                  <option value="admin">Administrator (System Control)</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                  {editingUser ? 'Synchronize Updates' : 'Execute Provisioning'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagementView
