import { useState, useEffect, useMemo } from "react";
import {
  SUPPORTED_COUNTRIES,
  detectCountryByIP,
  type CountryInfo,
} from "../../services/countryDetect";

interface CountrySelectScreenProps {
  lang: string;
  onSelect: (countryCode: string) => void;
}

const TITLE: Record<string, string> = {
  ko: "어떤 나라의 약 정보를 원하시나요?",
  en: "Which country's drug info do you need?",
  vi: "Bạn cần thông tin thuốc của quốc gia nào?",
};

const SUBTITLE: Record<string, string> = {
  ko: "해당 국가에서 판매되는 약을 안내합니다",
  en: "We'll show drugs available in your selected country",
  vi: "Chúng tôi sẽ hiển thị thuốc có bán tại quốc gia bạn chọn",
};

const DETECTING: Record<string, string> = {
  ko: "위치 감지 중...",
  en: "Detecting location...",
  vi: "Đang xác định vị trí...",
};

const RECOMMENDED: Record<string, string> = {
  ko: "추천",
  en: "Recommended",
  vi: "Đề xuất",
};

const SEARCH_PLACEHOLDER: Record<string, string> = {
  ko: "국가 검색...",
  en: "Search country...",
  vi: "Tìm quốc gia...",
};

const PREPARING: Record<string, string> = {
  ko: "준비 중",
  en: "Coming soon",
  vi: "Sắp ra mắt",
};

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  KR: { ko: "한국", en: "South Korea", vi: "Hàn Quốc" },
  VN: { ko: "베트남", en: "Vietnam", vi: "Việt Nam" },
  US: { ko: "미국", en: "United States", vi: "Hoa Kỳ" },
  JP: { ko: "일본", en: "Japan", vi: "Nhật Bản" },
  TH: { ko: "태국", en: "Thailand", vi: "Thái Lan" },
  PH: { ko: "필리핀", en: "Philippines", vi: "Philippines" },
  ID: { ko: "인도네시아", en: "Indonesia", vi: "Indonesia" },
  GB: { ko: "영국", en: "United Kingdom", vi: "Vương quốc Anh" },
  AU: { ko: "호주", en: "Australia", vi: "Úc" },
  DE: { ko: "독일", en: "Germany", vi: "Đức" },
  IN: { ko: "인도", en: "India", vi: "Ấn Độ" },
  CN: { ko: "중국", en: "China", vi: "Trung Quốc" },
  ES: { ko: "스페인", en: "Spain", vi: "Tây Ban Nha" },
};

export default function CountrySelectScreen({ lang, onSelect }: CountrySelectScreenProps) {
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    detectCountryByIP().then((code) => {
      setDetectedCode(code);
      setLoading(false);
    });
  }, []);

  const getCountryName = (country: CountryInfo) => {
    return COUNTRY_NAMES[country.code]?.[lang] || country.nameLocal;
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return SUPPORTED_COUNTRIES;
    const q = search.toLowerCase();
    return SUPPORTED_COUNTRIES.filter((c) => {
      const name = getCountryName(c).toLowerCase();
      const nameEn = c.nameEn.toLowerCase();
      const nameLocal = c.nameLocal.toLowerCase();
      return name.includes(q) || nameEn.includes(q) || nameLocal.includes(q) || c.code.toLowerCase().includes(q);
    });
  }, [search, lang]);

  // Sort: recommended first, then hasDB, then alphabetical
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.code === detectedCode) return -1;
      if (b.code === detectedCode) return 1;
      if (a.hasDB && !b.hasDB) return -1;
      if (!a.hasDB && b.hasDB) return 1;
      return getCountryName(a).localeCompare(getCountryName(b));
    });
  }, [filtered, detectedCode, lang]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col max-w-[480px] mx-auto">
      <div className="px-6 pt-12 pb-4 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <span className="text-2xl">📍</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {TITLE[lang] || TITLE.en}
        </h1>
        <p className="text-sm text-gray-400">
          {SUBTITLE[lang] || SUBTITLE.en}
        </p>
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
            placeholder={SEARCH_PLACEHOLDER[lang] || SEARCH_PLACEHOLDER.en}
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Country list */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {loading ? (
          <p className="text-sm text-gray-300 animate-pulse text-center py-8">
            {DETECTING[lang] || DETECTING.en}
          </p>
        ) : (
          <div className="space-y-2.5">
            {sorted.map((country) => {
              const isRecommended = country.code === detectedCode;
              return (
                <button
                  key={country.code}
                  onClick={() => onSelect(country.code)}
                  className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all active:scale-[0.98] ${
                    isRecommended
                      ? "bg-emerald-50 ring-2 ring-emerald-400 shadow-md"
                      : "bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <span className={`text-base font-semibold ${isRecommended ? "text-emerald-700" : "text-gray-700"}`}>
                      {getCountryName(country)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!country.hasDB && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-medium rounded-full">
                        {PREPARING[lang] || PREPARING.en}
                      </span>
                    )}
                    {isRecommended && (
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-medium rounded-full">
                        {RECOMMENDED[lang] || RECOMMENDED.en}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
