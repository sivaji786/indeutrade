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
    <div
      className="min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 border shadow-2xl" style={{ backgroundColor: 'var(--accent-glow)', borderColor: 'var(--border-active)' }}>
            <Globe2 style={{ color: 'var(--text-active)' }} size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-heading)' }}>
            INDEUTRADE
          </h1>
          <p className="font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Global Trade Analytics & FTA Insights
          </p>
        </div>

        <div
          className="rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', boxShadow: `0 25px 50px -12px var(--shadow-blue)` }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" style={{ opacity: 'var(--sidebar-bar-opacity)' }}></div>
          
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text-heading)' }}>Secure Access</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-label)' }}>Work Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={20} style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:outline-none transition-all border"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-input)',
                    color: 'var(--text-primary)',
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-label)' }}>Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={20} style={{ color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:outline-none transition-all border"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-input)',
                    color: 'var(--text-primary)',
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm font-bold">
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

          <div className="mt-8 pt-8 border-t text-center" style={{ borderColor: 'var(--separator)' }}>
             <div className="grid grid-cols-2 gap-4">
                <div className="text-left p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Admin Access</p>
                  <p className="text-[11px] font-mono" style={{ color: 'var(--text-active)' }}>admin@indeutrade.com</p>
                </div>
                <div className="text-left p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-2)', borderColor: 'var(--border-card)' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Subscriber Access</p>
                  <p className="text-[11px] text-indigo-500 font-mono">user1@indeutrade.com</p>
                </div>
             </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
          &copy; 2026 Indeutrade Global Intelligence
        </p>
      </div>
    </div>
  )
}

export default LoginPage
