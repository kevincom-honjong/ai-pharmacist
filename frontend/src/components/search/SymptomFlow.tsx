import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getCategory,
  findCombo,
  getDrugEntries,
  type SymptomComboResult,
  type FollowUpQuestion,
  type DrugEntry,
} from "../../services/symptomData";
import { getCountryInfo } from "../../services/countryDetect";
import CompanionCheckStep from "./CompanionCheckStep";
import NewDrugCard from "../drug/NewDrugCard";
import HospitalWarning from "../common/HospitalWarning";

interface SymptomFlowProps {
  category: string;
  countryCode: string;
  onReset: () => void;
}

type FlowStep = "companion" | "followUp" | "result" | "hospital";

function getQuestionLabel(q: FollowUpQuestion, lang: string) {
  if (lang === "vi") return q.questionVI;
  if (lang === "en") return q.questionEN;
  return q.questionKR;
}

function getOptionLabel(opt: { labelKR: string; labelEN: string; labelVI: string }, lang: string) {
  if (lang === "vi") return opt.labelVI;
  if (lang === "en") return opt.labelEN;
  return opt.labelKR;
}

function getCategoryName(cat: { nameKR: string; nameEN: string; nameVI: string }, lang: string) {
  if (lang === "vi") return cat.nameVI;
  if (lang === "en") return cat.nameEN;
  return cat.nameKR;
}

function getCategoryDesc(cat: { descKR: string; descEN: string; descVI: string }, lang: string) {
  if (lang === "vi") return cat.descVI;
  if (lang === "en") return cat.descEN;
  return cat.descKR;
}

function getWarning(combo: SymptomComboResult, lang: string) {
  if (lang === "vi") return combo.warningVI || "";
  if (lang === "en") return combo.warningEN || "";
  return combo.warningKR || "";
}

export default function SymptomFlow({ category, countryCode, onReset }: SymptomFlowProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cat = getCategory(category);
  const country = getCountryInfo(countryCode);
  const countryName = country?.nameLocal || countryCode;

  const [step, setStep] = useState<FlowStep>("companion");
  const [combo, setCombo] = useState<SymptomComboResult | null>(null);
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState<number[]>([]);
  const [drugs, setDrugs] = useState<[DrugEntry, DrugEntry] | null>(null);

  if (!cat) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <p className="text-gray-400">{t("common.error")}</p>
      </div>
    );
  }

  const categoryName = getCategoryName(cat, lang);

  // Step 1: Companion symptom check
  const handleCompanionSubmit = (selected: string[]) => {
    const foundCombo = findCombo(cat, selected);
    setCombo(foundCombo);

    if (foundCombo.hospitalWarning) {
      setStep("hospital");
      return;
    }

    if (foundCombo.followUpQuestions && foundCombo.followUpQuestions.length > 0) {
      setFollowUpIndex(0);
      setFollowUpAnswers([]);
      setStep("followUp");
    } else {
      resolveDrugs(foundCombo, []);
    }
  };

  // Step 2: Follow-up questions
  const handleFollowUpAnswer = (answerIndex: number) => {
    if (!combo?.followUpQuestions) return;

    const newAnswers = [...followUpAnswers, answerIndex];
    setFollowUpAnswers(newAnswers);

    if (followUpIndex + 1 < combo.followUpQuestions.length) {
      setFollowUpIndex(followUpIndex + 1);
    } else {
      resolveDrugs(combo, newAnswers);
    }
  };

  // Resolve drugs based on combo and answers
  const resolveDrugs = (c: SymptomComboResult, answers: number[]) => {
    // Check if last answer indicates "severe" (index 2 on severity question)
    const lastAnswer = answers[answers.length - 1];
    const matchKey = lastAnswer === 2 ? "severe" : "default";
    const drugMatch = c.drugMatches[matchKey] || c.drugMatches["default"];

    if (drugMatch) {
      const entries = getDrugEntries(drugMatch, countryCode);
      setDrugs(entries);
    }
    setStep("result");
  };

  const handleFollowUpBack = () => {
    if (followUpIndex > 0) {
      setFollowUpIndex(followUpIndex - 1);
      setFollowUpAnswers((prev) => prev.slice(0, -1));
    } else {
      setStep("companion");
      setCombo(null);
    }
  };

  // === Render ===

  if (step === "companion") {
    return (
      <CompanionCheckStep
        categoryName={categoryName}
        companions={cat.companions}
        lang={lang}
        onSubmit={handleCompanionSubmit}
        onBack={onReset}
      />
    );
  }

  if (step === "hospital" && combo) {
    return (
      <HospitalWarning
        message={getWarning(combo, lang)}
        onReset={onReset}
        lang={lang}
      />
    );
  }

  if (step === "followUp" && combo?.followUpQuestions) {
    const question = combo.followUpQuestions[followUpIndex];
    const totalSteps = combo.followUpQuestions.length;
    const progress = ((followUpIndex + 1) / totalSteps) * 100;

    return (
      <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
        <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleFollowUpBack}
            className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-sm text-gray-400 font-medium">
            {followUpIndex + 1} / {totalSteps}
          </span>
        </header>

        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <main className="flex-1 px-5 pt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-8 leading-snug">
            {getQuestionLabel(question, lang)}
          </h2>
          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleFollowUpAnswer(idx)}
                className="w-full text-left px-5 py-4 bg-white rounded-2xl text-base text-gray-700 hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
              >
                {getOptionLabel(opt, lang)}
              </button>
            ))}
          </div>
        </main>

        <footer className="px-4 py-2.5">
          <p className="text-center text-xs text-gray-300">{t("disclaimer.short")}</p>
        </footer>
      </div>
    );
  }

  // Result screen
  const categoryDesc = getCategoryDesc(cat, lang);
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
        <h1 className="text-base font-semibold text-gray-800">{t("result.title")}</h1>
      </header>
      <div className="w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />

      <main className="flex-1 px-5 pt-5 pb-52">
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            {t("result.matchedCategory")}: <span className="font-semibold text-emerald-600">{categoryName}</span>
          </p>
          <p className="text-xs text-gray-300 mt-0.5">{categoryDesc}</p>
          <p className="text-xs text-gray-300 mt-1">{t("result.subtitle")}</p>
        </div>

        {drugs ? (
          <div className="space-y-4">
            <NewDrugCard drug={drugs[0]} rank={1} countryCode={countryCode} lang={lang} countryName={countryName} />
            <NewDrugCard drug={drugs[1]} rank={2} countryCode={countryCode} lang={lang} countryName={countryName} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">{t("common.noResults")}</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
        <div className="max-w-[480px] mx-auto px-5 pt-3 pb-3">
          <div className="bg-amber-50/80 rounded-2xl px-4 py-2.5 mb-3">
            <p className="text-xs text-amber-700 leading-relaxed">{t("disclaimer.full")}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              {t("result.searchAgain")}
            </button>
            <button className="flex-1 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm">
              {t("result.consultPharmacist")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
