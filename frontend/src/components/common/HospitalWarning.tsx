import { getSpecialty, getSpecialtyName, getMapsUrl } from "../../services/hospitalData";
import { getCountryInfo } from "../../services/countryDetect";

interface HospitalWarningProps {
  message: string;
  comboKey?: string;
  countryCode?: string;
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

const FIND_NEARBY: Record<string, string> = {
  ko: "근처 {{specialty}} 찾기",
  en: "Find {{specialty}} nearby",
  vi: "Tìm {{specialty}} gần đây",
};

const EMERGENCY_CALL: Record<string, string> = {
  ko: "긴급 전화",
  en: "Emergency Call",
  vi: "Gọi cấp cứu",
};

const EMERGENCY_NOTE: Record<string, string> = {
  ko: "생명이 위험한 상황에서만 이용해주세요",
  en: "Use only in life-threatening situations",
  vi: "Chỉ sử dụng trong tình huống nguy hiểm đến tính mạng",
};

export default function HospitalWarning({ message, comboKey, countryCode, onReset, lang }: HospitalWarningProps) {
  const l = lang.startsWith("en") ? "en" : (["ko", "vi"].includes(lang) ? lang : "en");
  const specialty = getSpecialty(comboKey || "");
  const specialtyName = getSpecialtyName(specialty, l);
  const mapsUrl = getMapsUrl(specialty);
  const country = countryCode ? getCountryInfo(countryCode) : null;
  const emergencyNumber = country?.emergencyNumber || "911";

  const findText = (FIND_NEARBY[l] || FIND_NEARBY.en).replace("{{specialty}}", specialtyName);

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col items-center justify-center px-6">
      {/* Warning icon */}
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
        {TITLE[l] || TITLE.en}
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed text-center mb-8 max-w-sm">
        {message}
      </p>

      {/* Action buttons */}
      <div className="w-full max-w-sm space-y-3">
        {/* Find nearby hospital */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
        >
          <span>📍</span>
          <span>{findText}</span>
        </a>

        {/* Emergency call */}
        <a
          href={`tel:${emergencyNumber}`}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition-all shadow-sm"
        >
          <span>🚨</span>
          <span>{EMERGENCY_CALL[l] || EMERGENCY_CALL.en} {emergencyNumber}</span>
        </a>

        <p className="text-[10px] text-gray-400 text-center">
          {EMERGENCY_NOTE[l] || EMERGENCY_NOTE.en}
        </p>

        {/* Back button */}
        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-[0.98] transition-all mt-2"
        >
          {BACK[l] || BACK.en}
        </button>
      </div>
    </div>
  );
}
