import { useState, useMemo } from "react";
import {
  SUPPORTED_COUNTRIES,
  type CountryInfo,
} from "../../services/countryDetect";
import BackButton from "../common/BackButton";

function getFlagUrl(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((c) => (0x1f1e6 + c.charCodeAt(0) - 65).toString(16))
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoints}.png`;
}

interface CountrySelectScreenProps {
  lang: string;
  onSelect: (countryCode: string) => void;
  onBack: () => void;
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

const PREPARING: Record<string, string> = {
  ko: "준비중", en: "Coming soon", vi: "Sắp có",
};

const SEARCH_PH: Record<string, string> = {
  ko: "국가 검색...", en: "Search country...", vi: "Tìm quốc gia...",
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

const CODE_COLORS: Record<string, string> = {
  KR: "bg-rose-500", VN: "bg-red-500", US: "bg-blue-500",
  JP: "bg-pink-500", TH: "bg-indigo-500", PH: "bg-sky-500",
  ID: "bg-red-600", GB: "bg-blue-700", AU: "bg-emerald-600",
  DE: "bg-yellow-600", IN: "bg-orange-500", CN: "bg-red-700",
  ES: "bg-amber-500",
};

export default function CountrySelectScreen({ lang, onSelect, onBack }: CountrySelectScreenProps) {
  const [search, setSearch] = useState("");
  const l = lang.startsWith("en") ? "en" : lang;

  const getName = (c: CountryInfo) =>
    COUNTRY_NAMES[c.code]?.[l] || COUNTRY_NAMES[c.code]?.en || c.nameLocal;

  const filtered = useMemo(() => {
    if (!search.trim()) return SUPPORTED_COUNTRIES;
    const q = search.toLowerCase();
    return SUPPORTED_COUNTRIES.filter((c) => {
      const name = getName(c).toLowerCase();
      return name.includes(q) || c.nameEn.toLowerCase().includes(q) || c.nameLocal.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    });
  }, [search, l]);

  // Sort: DB available first, then alphabetical by name
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.hasDB && !b.hasDB) return -1;
      if (!a.hasDB && b.hasDB) return 1;
      return getName(a).localeCompare(getName(b));
    });
  }, [filtered, l]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col max-w-[480px] mx-auto">
      <div className="px-3 pt-3">
        <BackButton onClick={onBack} lang={lang} />
      </div>

      <div className="px-6 pt-2 pb-4 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <span className="text-2xl">📍</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {TITLE[l] || TITLE.en}
        </h1>
        <p className="text-sm text-gray-400">
          {SUBTITLE[l] || SUBTITLE.en}
        </p>
      </div>

      <div className="px-6 pb-3">
        <div className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-3">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={SEARCH_PH[l] || SEARCH_PH.en}
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-2">
          {sorted.map((country) => (
            <button
              key={country.code}
              onClick={() => onSelect(country.code)}
              className="w-full h-14 flex items-center px-4 rounded-[20px] bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <img src={getFlagUrl(country.code)} alt={country.code} className="w-8 h-8 flex-shrink-0 rounded-sm object-contain" loading="lazy" />
              <span className={`ml-3 w-8 py-0.5 rounded-md text-[10px] font-bold text-white text-center flex-shrink-0 ${CODE_COLORS[country.code] || "bg-gray-500"}`}>
                {country.code}
              </span>
              <span className="ml-3 flex-1 text-[15px] font-semibold text-gray-700 text-left truncate">
                {getName(country)}
              </span>
              {!country.hasDB && (
                <span className="ml-2 px-2.5 py-1 bg-gray-400 text-white text-[10px] font-bold rounded-full flex-shrink-0">
                  {PREPARING[l] || PREPARING.en}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
