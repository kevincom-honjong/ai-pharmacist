export default function Header() {
  return (
    <header className="flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="10" rx="5" fill="white" />
          <rect x="12" y="7" width="9" height="10" rx="5" fill="rgba(255,255,255,0.55)" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="rgba(20,184,166,0.3)" strokeWidth="0.5" />
        </svg>
      </div>
      <div>
        <span className="text-sm tracking-tight">
          <span className="font-extrabold text-teal-500">AI</span>
          <span className="font-semibold text-gray-700"> Pharmacist</span>
        </span>
        <p className="text-[9px] text-gray-400 -mt-0.5 tracking-wide">
          Your AI-Powered Pharmacist
        </p>
      </div>
    </header>
  );
}
