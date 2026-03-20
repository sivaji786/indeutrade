import { useState } from 'react'
import { LogIn, Mail, Lock, ShieldCheck, Globe2 } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.messages?.error || 'Authentication failed')
      }

      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600/10 mb-6 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <Globe2 className="text-blue-400" size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            INDEUTRADE
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">
            Global Trade Analytics & FTA Insights
          </p>
        </div>

        <div className="bg-[#0b1120] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50"></div>
          
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Secure Access</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-blue-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm font-bold animate-shake">
                <ShieldCheck size={18} />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-black transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <LogIn size={20} />
                  Explore Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
             <div className="grid grid-cols-2 gap-4">
                <div className="text-left bg-slate-800/20 p-3 rounded-xl border border-slate-800/50">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Admin Access</p>
                  <p className="text-[11px] text-blue-400 font-mono">admin@indeutrade.com</p>
                </div>
                <div className="text-left bg-slate-800/20 p-3 rounded-xl border border-slate-800/50">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Subscriber Access</p>
                  <p className="text-[11px] text-indigo-400 font-mono">user1@indeutrade.com</p>
                </div>
             </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Indeutrade Global Intelligence
        </p>
      </div>
    </div>
  )
}

export default LoginPage
