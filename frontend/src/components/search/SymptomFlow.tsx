import { useState, useCallback, useEffect } from "react";
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
import { getCategorySpecialty, getSpecialtyName, getMapsUrl } from "../../services/hospitalData";
import CompanionCheckStep from "./CompanionCheckStep";
import NewDrugCard from "../drug/NewDrugCard";
import HospitalWarning from "../common/HospitalWarning";
import AnalyzingScreen from "./AnalyzingScreen";

interface SymptomFlowProps {
  category: string;
  countryCode: string;
  onReset: () => void;
}

type FlowStep = "companion" | "followUp" | "commonQ" | "analyzing" | "result" | "hospital";

// Common follow-up questions (asked after combo or specific follow-ups)
const COMMON_QUESTIONS: FollowUpQuestion[] = [
  {
    id: "common_duration",
    questionKR: "증상이 시작된 지 얼마나 됐나요?",
    questionEN: "How long have you had these symptoms?",
    questionVI: "Bạn có triệu chứng này bao lâu rồi?",
    options: [
      { labelKR: "오늘 시작", labelEN: "Started today", labelVI: "Bắt đầu hôm nay" },
      { labelKR: "2~3일 됐어요", labelEN: "2-3 days", labelVI: "2-3 ngày" },
      { labelKR: "일주일 이상", labelEN: "Over a week", labelVI: "Hơn 1 tuần" },
    ],
  },
  {
    id: "common_severity",
    questionKR: "증상의 정도는 어떤가요?",
    questionEN: "How severe are your symptoms?",
    questionVI: "Mức độ triệu chứng của bạn?",
    options: [
      { labelKR: "가벼움 (일상생활 가능)", labelEN: "Mild (can carry on)", labelVI: "Nhẹ (sinh hoạt bình thường)" },
      { labelKR: "중간 (불편하지만 견딜만함)", labelEN: "Moderate (uncomfortable but bearable)", labelVI: "Trung bình (khó chịu nhưng chịu được)" },
      { labelKR: "심함 (일상생활 어려움)", labelEN: "Severe (hard to function)", labelVI: "Nặng (khó sinh hoạt)" },
    ],
  },
];

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
  const [commonQIndex, setCommonQIndex] = useState(0);
  const [drugs, setDrugs] = useState<[DrugEntry, DrugEntry] | null>(null);

  if (!cat) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <p className="text-gray-400">{t("common.error")}</p>
      </div>
    );
  }

  const categoryName = getCategoryName(cat, lang);
  const scrollTop = () => window.scrollTo(0, 0);
  const pushState = (name: string) => window.history.pushState({ screen: name }, "");

  // Browser back button handler for SymptomFlow internal steps
  useEffect(() => {
    const handlePopState = () => {
      if (step === "result" || step === "analyzing") {
        // Go back from result → reset to home (handled by App)
        onReset();
      } else if (step === "commonQ") {
        if (commonQIndex > 0) {
          setCommonQIndex(commonQIndex - 1);
        } else if (combo?.followUpQuestions && combo.followUpQuestions.length > 0) {
          setFollowUpIndex(combo.followUpQuestions.length - 1);
          setFollowUpAnswers((prev) => prev.slice(0, -1));
          setStep("followUp");
        } else {
          setStep("companion");
          setCombo(null);
        }
        scrollTop();
      } else if (step === "followUp") {
        if (followUpIndex > 0) {
          setFollowUpIndex(followUpIndex - 1);
          setFollowUpAnswers((prev) => prev.slice(0, -1));
        } else {
          setStep("companion");
          setCombo(null);
        }
        scrollTop();
      } else if (step === "hospital") {
        onReset();
      } else {
        // companion step → go back to home (handled by App)
        onReset();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step, followUpIndex, commonQIndex, combo, onReset]);

  // Step 1: Companion symptom check
  const handleCompanionSubmit = (selected: string[]) => {
    const foundCombo = findCombo(cat, selected);
    setCombo(foundCombo);

    if (foundCombo.hospitalWarning) {
      setStep("hospital");
      pushState("hospital");
      scrollTop();
      return;
    }

    if (foundCombo.followUpQuestions && foundCombo.followUpQuestions.length > 0) {
      setFollowUpIndex(0);
      setFollowUpAnswers([]);
      setStep("followUp");
      pushState("followUp-0");
      scrollTop();
    } else {
      setCommonQIndex(0);
      setStep("commonQ");
      pushState("commonQ-0");
      scrollTop();
    }
  };

  // Step 2: Specific follow-up questions
  const handleFollowUpAnswer = (answerIndex: number) => {
    if (!combo?.followUpQuestions) return;

    const newAnswers = [...followUpAnswers, answerIndex];
    setFollowUpAnswers(newAnswers);

    if (followUpIndex + 1 < combo.followUpQuestions.length) {
      setFollowUpIndex(followUpIndex + 1);
      pushState(`followUp-${followUpIndex + 1}`);
      scrollTop();
    } else {
      setCommonQIndex(0);
      setStep("commonQ");
      pushState("commonQ-0");
      scrollTop();
    }
  };

  // Step 3: Common questions (duration + severity)
  const handleCommonAnswer = (answerIndex: number) => {
    if (commonQIndex + 1 < COMMON_QUESTIONS.length) {
      setCommonQIndex(commonQIndex + 1);
      pushState(`commonQ-${commonQIndex + 1}`);
      scrollTop();
    } else {
      // All questions done → resolve drugs and show loading
      if (combo) {
        const lastAnswer = followUpAnswers[followUpAnswers.length - 1];
        const severityAnswer = answerIndex; // last common Q is severity
        const matchKey = (lastAnswer === 2 || severityAnswer === 2) ? "severe" : "default";
        const drugMatch = combo.drugMatches[matchKey] || combo.drugMatches["default"];
        if (drugMatch) {
          const entries = getDrugEntries(drugMatch, countryCode);
          setDrugs(entries);
        }
      }
      setStep("analyzing");
      pushState("analyzing");
      scrollTop();
    }
  };

  const handleFollowUpBack = () => {
    if (followUpIndex > 0) {
      setFollowUpIndex(followUpIndex - 1);
      setFollowUpAnswers((prev) => prev.slice(0, -1));
    } else {
      setStep("companion");
      setCombo(null);
    }
    scrollTop();
  };

  const handleCommonBack = () => {
    if (commonQIndex > 0) {
      setCommonQIndex(commonQIndex - 1);
    } else {
      // Go back to follow-ups or companion
      if (combo?.followUpQuestions && combo.followUpQuestions.length > 0) {
        setFollowUpIndex(combo.followUpQuestions.length - 1);
        setFollowUpAnswers((prev) => prev.slice(0, -1));
        setStep("followUp");
      } else {
        setStep("companion");
        setCombo(null);
      }
    }
    scrollTop();
  };

  const handleAnalyzingComplete = useCallback(() => {
    setStep("result");
    window.history.pushState({ screen: "result" }, "");
    scrollTop();
  }, []);

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
        comboKey={combo.comboKey}
        countryCode={countryCode}
        onReset={onReset}
        lang={lang}
      />
    );
  }

  if (step === "followUp" && combo?.followUpQuestions) {
    const question = combo.followUpQuestions[followUpIndex];
    const totalSteps = combo.followUpQuestions.length + COMMON_QUESTIONS.length;
    const currentStep = followUpIndex + 1;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
        <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleFollowUpBack}
            className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-sm text-gray-400 font-medium">
            {currentStep} / {totalSteps}
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

  if (step === "commonQ") {
    const question = COMMON_QUESTIONS[commonQIndex];
    const specificCount = combo?.followUpQuestions?.length || 0;
    const totalSteps = specificCount + COMMON_QUESTIONS.length;
    const currentStep = specificCount + commonQIndex + 1;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
        <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleCommonBack}
            className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-sm text-gray-400 font-medium">
            {currentStep} / {totalSteps}
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
                onClick={() => handleCommonAnswer(idx)}
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

  if (step === "analyzing") {
    return <AnalyzingScreen lang={lang} onComplete={handleAnalyzingComplete} />;
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
          <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

        {/* Find hospital section */}
        {(() => {
          const catSpecialty = getCategorySpecialty(category);
          const specName = getSpecialtyName(catSpecialty, lang);
          const specUrl = getMapsUrl(catSpecialty);
          const worseLabelMap: Record<string, string> = {
            ko: "증상이 심해지면",
            en: "If symptoms worsen",
            vi: "Nếu triệu chứng nặng hơn",
          };
          const findLabelMap: Record<string, string> = {
            ko: `가까운 ${specName} 찾기`,
            en: `Find ${specName} nearby`,
            vi: `Tìm ${specName} gần đây`,
          };
          const ll = lang.startsWith("en") ? "en" : (["ko", "vi"].includes(lang) ? lang : "en");
          return (
            <div className="mt-6 bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                {worseLabelMap[ll] || worseLabelMap.en}
              </p>
              <a
                href={specUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-teal-600 bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
              >
                <span>📍</span>
                <span>{findLabelMap[ll] || findLabelMap.en}</span>
              </a>
            </div>
          );
        })()}
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
