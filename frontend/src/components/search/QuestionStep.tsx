import { useTranslation } from "react-i18next";

interface QuestionStepProps {
  questionKey: string;
  options: { labelKey: string }[];
  onSelect: (index: number) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export default function QuestionStep({
  questionKey,
  options,
  onSelect,
  onBack,
  step,
  totalSteps,
}: QuestionStepProps) {
  const { t } = useTranslation();
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="text-sm text-gray-400 font-medium">
          {step + 1} / {totalSteps}
        </span>
      </header>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mx-0">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 px-5 pt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-8 leading-snug">
          {t(questionKey)}
        </h2>

        <div className="space-y-3">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className="w-full text-left px-5 py-4 bg-white rounded-2xl text-base text-gray-700 hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </main>

      <footer className="px-4 py-2.5">
        <p className="text-center text-xs text-gray-300">
          {t("disclaimer.short")}
        </p>
      </footer>
    </div>
  );
}
