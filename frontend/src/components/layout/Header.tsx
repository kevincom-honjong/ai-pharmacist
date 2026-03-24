export default function Header() {
  return (
    <header className="flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="8" height="8" rx="4" fill="white" />
          <rect x="11" y="8" width="8" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
          <rect x="5.5" y="11" width="3" height="2" rx="0.5" fill="#14b8a6" />
          <rect x="6" y="9.5" width="2" height="5" rx="0.5" fill="#14b8a6" />
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
