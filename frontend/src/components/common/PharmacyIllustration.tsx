export default function PharmacyIllustration() {
  return (
    <div className="flex items-center justify-center gap-6 mb-4">
      {/* Pharmacy store */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center shadow-sm">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Roof */}
          <path d="M8 20L24 10L40 20" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#d1fae5" />
          {/* Building */}
          <rect x="12" y="20" width="24" height="18" rx="2" fill="#a7f3d0" stroke="#34d399" strokeWidth="1.5" />
          {/* Door */}
          <rect x="20" y="28" width="8" height="10" rx="1.5" fill="#6ee7b7" stroke="#34d399" strokeWidth="1" />
          {/* Cross */}
          <rect x="22" y="21.5" width="4" height="1.5" rx="0.5" fill="#059669" />
          <rect x="23.25" y="20.5" width="1.5" height="4" rx="0.5" fill="#059669" />
        </svg>
      </div>

      {/* Pharmacist person */}
      <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center shadow-sm">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <circle cx="24" cy="14" r="6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" />
          {/* Body / white coat */}
          <path d="M14 26C14 22.686 16.686 20 20 20H28C31.314 20 34 22.686 34 26V38H14V26Z" fill="white" stroke="#93c5fd" strokeWidth="1.5" />
          {/* Coat lapels */}
          <path d="M20 20L24 26L28 20" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" />
          {/* Pill in hand */}
          <ellipse cx="36" cy="30" rx="3.5" ry="2" fill="#fca5a5" stroke="#f87171" strokeWidth="0.8" />
          <line x1="36" y1="28" x2="36" y2="32" stroke="#f87171" strokeWidth="0.6" />
          {/* Smile */}
          <path d="M22 15C22.5 16.5 25.5 16.5 26 15" stroke="#f59e0b" strokeWidth="0.8" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="22" cy="13" r="0.8" fill="#374151" />
          <circle cx="26" cy="13" r="0.8" fill="#374151" />
        </svg>
      </div>
    </div>
  );
}
