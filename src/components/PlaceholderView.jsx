const PlaceholderView = ({ activeTab, icon: Icon, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 mb-6 animate-pulse">
        <Icon size={48} />
      </div>
      <h2 className="text-3xl font-bold text-slate-100">{activeTab}</h2>
      <p className="text-slate-400 mt-2 max-w-md">
        The {activeTab} module is currently being synchronized with live 2026 FTA data. Check back shortly for real-time insights.
      </p>
      <button 
        onClick={onBack}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
      >
        Back to Dashboard
      </button>
    </div>
  )
}

export default PlaceholderView
