import { useTranslation } from "react-i18next";
import type { DrugInfo } from "../../services/symptomTree";
import DrugCard from "./DrugCard";

interface ResultScreenProps {
  drugs: DrugInfo[];
  symptomCategory: string;
  onReset: () => void;
}

export default function ResultScreen({
  drugs,
  symptomCategory,
  onReset,
}: ResultScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
        <button
          onClick={onReset}
          className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-gray-800">
          {t("result.title")}
        </h1>
      </header>

      <div className="w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />

      <main className="flex-1 px-5 pt-5 pb-52">
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            {t("result.matchedCategory")}: <span className="font-semibold text-emerald-600">{t(`symptoms.${symptomCategory}`)}</span>
          </p>
          <p className="text-xs text-gray-300 mt-1">{t("result.subtitle")}</p>
        </div>

        <div className="space-y-4">
          {drugs.map((drug, idx) => (
            <DrugCard key={drug.id} drug={drug} rank={idx + 1} />
          ))}
        </div>

        {drugs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">{t("common.noResults")}</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
        <div className="max-w-[480px] mx-auto px-5 pt-3 pb-3">
          <div className="bg-amber-50/80 rounded-2xl px-4 py-2.5 mb-3">
            <p className="text-xs text-amber-700 leading-relaxed">
              {t("disclaimer.full")}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              {t("result.searchAgain")}
            </button>
            <a
              href="https://www.google.com/maps/search/pharmacy+near+me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm no-underline"
            >
              <span>💊</span>
              <span>{t("result.findPharmacy")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
