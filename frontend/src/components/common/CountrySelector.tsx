import { useState } from "react";
import {
  SUPPORTED_COUNTRIES,
  SUPPORTED_LANGUAGES,
  type CountryInfo,
} from "../../services/countryDetect";

interface CountrySelectorProps {
  currentCountry: CountryInfo;
  currentLang: string;
  onSelectCountry: (code: string) => void;
  onSelectLanguage: (lang: string) => void;
}

export default function CountrySelector({
  currentCountry,
  currentLang,
  onSelectCountry,
  onSelectLanguage,
}: CountrySelectorProps) {
  const [openCountry, setOpenCountry] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const currentLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[1];

  return (
    <div className="flex items-center gap-2">
      {/* Country selector (for drug DB) */}
      <div className="relative">
        <button
          onClick={() => { setOpenCountry(!openCountry); setOpenLang(false); }}
          className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-2xl text-sm text-gray-600 hover:shadow-md transition-all shadow-sm"
        >
          <span className="text-xs text-gray-400">📍</span>
          <span className="text-base">{currentCountry.flag}</span>
          <span className="font-medium text-xs">{currentCountry.nameLocal}</span>
          <svg className={`w-3 h-3 text-gray-400 transition-transform ${openCountry ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {openCountry && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpenCountry(false)} />
            <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-lg z-20 overflow-hidden border border-gray-100/50 py-1 max-h-80 overflow-y-auto">
              <div className="px-4 py-2 border-b border-gray-50 sticky top-0 bg-white">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  {currentLang === "ko" ? "약 추천 기준 국가" : currentLang === "vi" ? "Quốc gia cho thuốc" : "Country for drug info"}
                </p>
              </div>
              {SUPPORTED_COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => { onSelectCountry(country.code); setOpenCountry(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    country.code === currentCountry.code ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className={`flex-1 font-medium text-xs ${country.code === currentCountry.code ? "text-emerald-700" : "text-gray-700"}`}>
                    {country.nameLocal}
                  </span>
                  {!country.hasDB && (
                    <span className="text-[9px] text-gray-300 px-1.5 py-0.5 bg-gray-50 rounded-full">
                      {currentLang === "ko" ? "준비중" : "soon"}
                    </span>
                  )}
                  {country.code === currentCountry.code && (
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Language selector (for UI) */}
      <div className="relative">
        <button
          onClick={() => { setOpenLang(!openLang); setOpenCountry(false); }}
          className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-2xl text-sm text-gray-600 hover:shadow-md transition-all shadow-sm"
        >
          <span className="text-xs text-gray-400">🌐</span>
          <span className="font-medium text-xs">{currentLangInfo.label}</span>
          <svg className={`w-3 h-3 text-gray-400 transition-transform ${openLang ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {openLang && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpenLang(false)} />
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg z-20 overflow-hidden border border-gray-100/50 py-1">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  {currentLang === "ko" ? "언어 선택" : currentLang === "vi" ? "Chọn ngôn ngữ" : "Select language"}
                </p>
              </div>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { onSelectLanguage(lang.code); setOpenLang(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    lang.code === currentLang ? "bg-emerald-50" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className={`flex-1 font-medium text-xs ${lang.code === currentLang ? "text-emerald-700" : "text-gray-700"}`}>
                    {lang.label}
                  </span>
                  {lang.code === currentLang && (
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
