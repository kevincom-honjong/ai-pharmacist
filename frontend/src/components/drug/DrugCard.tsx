import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { DrugInfo } from "../../services/symptomTree";
import { getCountryInfo } from "../../services/countryDetect";

interface DrugCardProps {
  drug: DrugInfo;
  rank: number;
}

export default function DrugCard({ drug, rank }: DrugCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const country = getCountryInfo(drug.countryCode);
  const isFallback = drug.id.startsWith("fallback_");

  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm ${isFallback ? "ring-1 ring-orange-200" : ""}`}>
      <div className="px-5 pt-5 pb-3 flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
          {rank}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base leading-tight">
            {drug.nameLocal}
          </h3>
          {drug.nameLocal !== drug.nameEn && (
            <p className="text-xs text-gray-400 mt-0.5">{drug.nameEn}</p>
          )}
          <p className="text-xs text-emerald-600 mt-1">{drug.activeIngredient}</p>
        </div>
      </div>

      {isFallback && (
        <div className="mx-5 mb-3 px-4 py-2.5 bg-orange-50 rounded-2xl">
          <p className="text-xs text-orange-700">{t("result.ingredientFallback")}</p>
        </div>
      )}

      <div className="px-5 pb-3">
        <div className="flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {drug.dosage}
          </span>
          {drug.otcStatus && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              OTC
            </span>
          )}
        </div>
      </div>

      <div className="px-5 pb-3">
        <p className="text-sm text-gray-600 leading-relaxed">{drug.usage}</p>
      </div>

      {drug.otcStatus && country && (
        <div className="px-5 pb-3">
          <p className="text-xs text-emerald-500">
            {t("result.otcAvailable", { country: country.nameLocal })}
          </p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-3 flex items-center justify-between text-sm text-emerald-600 hover:bg-gray-50/50 transition-colors"
      >
        <span>{t("result.details")}</span>
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
              {t("result.precautions")}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{drug.precautions}</p>
          </div>
          <div className="bg-red-50/50 rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-red-500 mb-1.5">{t("result.sideEffects")}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{drug.sideEffects}</p>
          </div>
        </div>
      )}
    </div>
  );
}
