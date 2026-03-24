import { useState } from "react";
import type { DrugEntry } from "../../services/symptomData";

interface NewDrugCardProps {
  drug: DrugEntry;
  rank: number;
  countryCode: string;
  lang: string;
  countryName: string;
}

const LABELS: Record<string, Record<string, string>> = {
  details: { ko: "상세 정보 보기", en: "View details", vi: "Xem chi tiết" },
  precautions: { ko: "주의사항", en: "Precautions", vi: "Lưu ý" },
  otcMsg: { ko: "이 약은 {{c}}에서 처방전 없이 구매 가능한 일반의약품입니다", en: "Available over-the-counter without prescription in {{c}}", vi: "Có thể mua không cần đơn tại {{c}}" },
  altMsg: { ko: "이 약을 찾을 수 없다면 약사에게 다음 성분이 포함된 약을 요청하세요", en: "If unavailable, ask your pharmacist for a product containing", vi: "Nếu không tìm thấy, hãy hỏi dược sĩ về sản phẩm chứa" },
};

function l(key: string, lang: string) {
  return LABELS[key]?.[lang] || LABELS[key]?.en || key;
}

function getName(drug: DrugEntry, countryCode: string) {
  if (countryCode === "VN") return drug.nameVN;
  if (countryCode === "US") return drug.nameUS;
  return drug.nameKR;
}

function getDosage(drug: DrugEntry, lang: string) {
  if (lang === "vi") return drug.dosageVN;
  if (lang === "en") return drug.dosageUS;
  return drug.dosageKR;
}

function getPrecaution(drug: DrugEntry, lang: string) {
  if (lang === "vi") return drug.precautionVN;
  if (lang === "en") return drug.precautionUS;
  return drug.precautionKR;
}

export default function NewDrugCard({ drug, rank, countryCode, lang, countryName }: NewDrugCardProps) {
  const [expanded, setExpanded] = useState(false);
  const name = getName(drug, countryCode);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <div className="px-5 pt-5 pb-3 flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
          {rank}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base leading-tight">{name}</h3>
          <p className="text-xs text-emerald-600 mt-1">{drug.ingredient}</p>
        </div>
      </div>

      <div className="px-5 pb-3">
        <div className="flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {getDosage(drug, lang)}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            OTC
          </span>
        </div>
      </div>

      <div className="px-5 pb-3">
        <p className="text-xs text-emerald-500">
          {l("otcMsg", lang).replace("{{c}}", countryName)}
        </p>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-3 flex items-center justify-between text-sm text-emerald-600 hover:bg-gray-50/50 transition-colors"
      >
        <span>{l("details", lang)}</span>
        <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3 pt-1">
          <div className="bg-orange-50/70 rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-orange-600 mb-1.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
              {l("precautions", lang)}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{getPrecaution(drug, lang)}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              {l("altMsg", lang)}: <span className="font-medium text-gray-700">{drug.ingredient}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
