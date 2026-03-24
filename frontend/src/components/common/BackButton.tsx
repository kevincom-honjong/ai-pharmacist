interface BackButtonProps {
  onClick: () => void;
  lang?: string;
}

const LABEL: Record<string, string> = {
  ko: "뒤로",
  en: "Back",
  vi: "Quay lại",
};

export default function BackButton({ onClick, lang = "en" }: BackButtonProps) {
  const l = lang.startsWith("en") ? "en" : lang;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 h-11 px-3 rounded-2xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
    >
      <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <span className="text-sm font-medium text-[#333]">
        {LABEL[l] || LABEL.en}
      </span>
    </button>
  );
}
