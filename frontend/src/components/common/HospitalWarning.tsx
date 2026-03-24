interface HospitalWarningProps {
  message: string;
  onReset: () => void;
  lang: string;
}

const TITLE: Record<string, string> = {
  ko: "병원 방문을 권장합니다",
  en: "Please visit a hospital",
  vi: "Vui lòng đến bệnh viện",
};

const BACK: Record<string, string> = {
  ko: "다시 검색",
  en: "Search Again",
  vi: "Tìm lại",
};

export default function HospitalWarning({ message, onReset, lang }: HospitalWarningProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col items-center justify-center px-6">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
        {TITLE[lang] || TITLE.en}
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed text-center mb-8 max-w-sm">
        {message}
      </p>

      <button
        onClick={onReset}
        className="px-8 py-3.5 rounded-2xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        {BACK[lang] || BACK.en}
      </button>
    </div>
  );
}
