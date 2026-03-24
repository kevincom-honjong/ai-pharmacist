import { SUPPORTED_LANGUAGES } from "../../services/countryDetect";

interface LanguageSelectScreenProps {
  onSelect: (langCode: string) => void;
}

export default function LanguageSelectScreen({ onSelect }: LanguageSelectScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center max-w-[480px] mx-auto px-6">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-md">
          <span className="text-3xl">💊</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">AI Pharmacist</h1>
        <p className="text-sm text-gray-400">Your AI-Powered Pharmacist</p>
      </div>

      <div className="w-full space-y-3">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className="w-full flex items-center gap-4 px-6 py-5 bg-white rounded-3xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <span className="text-4xl">{lang.flag}</span>
            <span className="text-lg font-semibold text-gray-700">{lang.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-300 text-center">
        Select your language / 언어를 선택하세요 / Chọn ngôn ngữ
      </p>
    </div>
  );
}
