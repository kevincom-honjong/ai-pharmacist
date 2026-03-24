import { useState, useEffect } from "react";
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

// Drug country names in each language
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  KR: { ko: "한국", en: "South Korea", vi: "Hàn Quốc" },
  VN: { ko: "베트남", en: "Vietnam", vi: "Việt Nam" },
  US: { ko: "미국", en: "United States", vi: "Hoa Kỳ" },
  JP: { ko: "일본", en: "Japan", vi: "Nhật Bản" },
  TH: { ko: "태국", en: "Thailand", vi: "Thái Lan" },
  PH: { ko: "필리핀", en: "Philippines", vi: "Philippines" },
};

// Only show drug-supported countries (KR, VN, US)
const DRUG_COUNTRIES = SUPPORTED_COUNTRIES.filter((c) =>
  ["KR", "VN", "US"].includes(c.code)
);

export default function CountrySelectScreen({ lang, onSelect }: CountrySelectScreenProps) {
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectCountryByIP().then((code) => {
      setDetectedCode(code);
      setLoading(false);
    });
  }, []);

  const getCountryName = (country: CountryInfo) => {
    return COUNTRY_NAMES[country.code]?.[lang] || country.nameLocal;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center max-w-[480px] mx-auto px-6">
      <div className="mb-8 text-center">
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

      {loading ? (
        <p className="text-sm text-gray-300 animate-pulse">
          {DETECTING[lang] || DETECTING.en}
        </p>
      ) : (
        <div className="w-full space-y-3">
          {DRUG_COUNTRIES.map((country) => {
            const isRecommended = country.code === detectedCode;
            return (
              <button
                key={country.code}
                onClick={() => onSelect(country.code)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition-all active:scale-[0.98] ${
                  isRecommended
                    ? "bg-emerald-50 ring-2 ring-emerald-400 shadow-md"
                    : "bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <span className="text-4xl">{country.flag}</span>
                <div className="flex-1 text-left">
                  <span className={`text-lg font-semibold ${isRecommended ? "text-emerald-700" : "text-gray-700"}`}>
                    {getCountryName(country)}
                  </span>
                </div>
                {isRecommended && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                    {RECOMMENDED[lang] || RECOMMENDED.en}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
