export default function Header() {
  return (
    <header className="flex items-center gap-2.5 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <div>
        <span className="font-bold text-gray-800 text-base tracking-tight">
          AI Pharmacist
        </span>
        <p className="text-[10px] text-gray-400 -mt-0.5 tracking-wide">
          Your AI-Powered Pharmacist
        </p>
      </div>
    </header>
  );
}
