export default function PharmacyIllustration() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-14 h-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-2xl shadow-sm">
        💊
      </div>
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-sm">
        <svg className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5v3m-1.5-1.5h3" />
        </svg>
      </div>
      <div className="w-14 h-14 rounded-3xl bg-blue-50 flex items-center justify-center text-2xl shadow-sm">
        🩺
      </div>
    </div>
  );
}
