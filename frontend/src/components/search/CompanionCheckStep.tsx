import { useState } from "react";
import type { CompanionOption } from "../../services/symptomData";

interface CompanionCheckStepProps {
  categoryName: string;
  companions: CompanionOption[];
  lang: string;
  onSubmit: (selected: string[]) => void;
  onBack: () => void;
}

function getLabel(c: CompanionOption, lang: string) {
  if (lang === "vi") return c.labelVI;
  if (lang === "en") return c.labelEN;
  return c.labelKR;
}

function getDesc(c: CompanionOption, lang: string) {
  if (lang === "vi") return c.descVI;
  if (lang === "en") return c.descEN;
  return c.descKR;
}

const QUESTION: Record<string, string> = {
  ko: "다른 증상이 함께 있나요?",
  en: "Do you have any other symptoms?",
  vi: "Bạn có triệu chứng nào khác không?",
};

const SELECT_HINT: Record<string, string> = {
  ko: "해당하는 항목을 모두 선택하세요",
  en: "Select all that apply",
  vi: "Chọn tất cả các mục phù hợp",
};

const NEXT: Record<string, string> = {
  ko: "다음",
  en: "Next",
  vi: "Tiếp theo",
};

export default function CompanionCheckStep({
  categoryName,
  companions,
  lang,
  onSubmit,
  onBack,
}: CompanionCheckStepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (key === "none") {
        // "None" clears everything
        return new Set(["none"]);
      }
      next.delete("none");
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const result = selected.size === 0 ? ["none"] : Array.from(selected);
    onSubmit(result);
  };

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
        <span className="text-sm text-gray-400 font-medium">{categoryName}</span>
      </header>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-1/3" />
      </div>

      <main className="flex-1 px-5 pt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {QUESTION[lang] || QUESTION.en}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {SELECT_HINT[lang] || SELECT_HINT.en}
        </p>

        <div className="space-y-2.5">
          {companions.map((comp) => {
            const isSelected = selected.has(comp.key);
            const isNone = comp.key === "none";
            const desc = getDesc(comp, lang);

            return (
              <button
                key={comp.key}
                onClick={() => toggle(comp.key)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center gap-3 ${
                  isSelected
                    ? "bg-emerald-50 shadow-sm ring-2 ring-emerald-400"
                    : "bg-white shadow-sm hover:shadow-md"
                } ${isNone ? "mt-3 border-t border-gray-100" : ""}`}
              >
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-base text-gray-700">{getLabel(comp, lang)}</span>
                  {desc && (
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <div className="px-5 py-4">
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className={`w-full py-4 rounded-2xl text-base font-semibold transition-all ${
            selected.size > 0
              ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-sm hover:shadow-md active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {NEXT[lang] || NEXT.en}
        </button>
      </div>
    </div>
  );
}
