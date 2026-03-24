import { useState, useMemo } from "react";
import { SUPPORTED_LANGUAGES } from "../../services/countryDetect";

interface LanguageSelectScreenProps {
  onSelect: (langCode: string) => void;
}

export default function LanguageSelectScreen({ onSelect }: LanguageSelectScreenProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return SUPPORTED_LANGUAGES;
    const q = search.toLowerCase();
    return SUPPORTED_LANGUAGES.filter(
      (l) => l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-md">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="8" width="8" height="8" rx="4" fill="white" />
            <rect x="11" y="8" width="8" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
            <rect x="5.5" y="11" width="3" height="2" rx="0.5" fill="#14b8a6" />
            <rect x="6" y="9.5" width="2" height="5" rx="0.5" fill="#14b8a6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          <span className="text-teal-500 font-extrabold">AI</span> Pharmacist
        </h1>
        <p className="text-xs text-gray-400 mb-6">Your AI-Powered Pharmacist</p>
      </div>

      {/* Search */}
      <div className="px-6 pb-3">
        <div className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-3">
          <svg className="w-4 h-4 text-gray-300 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search language..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Language list */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-2.5">
          {filtered.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="w-full flex items-center gap-3.5 px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <span className="text-[28px] leading-none">{lang.flag}</span>
              <span className="text-base font-semibold text-gray-700">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="px-6 pb-6 text-[10px] text-gray-300 text-center">
        Select your language / 언어를 선택하세요 / Chọn ngôn ngữ
      </p>
    </div>
  );
}
