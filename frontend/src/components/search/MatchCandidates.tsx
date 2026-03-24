import { useTranslation } from "react-i18next";
import type { MatchResult } from "../../services/symptomTree";

interface MatchCandidatesProps {
  candidates: MatchResult[];
  onSelect: (category: string) => void;
  onShowAll: () => void;
}

const LABELS: Record<string, string> = {
  ko: "혹시 이 중에 해당하는 증상이 있나요?",
  en: "Do any of these match your symptom?",
  vi: "Có triệu chứng nào dưới đây phù hợp không?",
};

const OTHER: Record<string, string> = {
  ko: "다른 증상 찾기",
  en: "Look for other symptoms",
  vi: "Tìm triệu chứng khác",
};

const CATEGORY_ICONS: Record<string, string> = {
  headache: "🤕", fever: "🌡️", cough: "😷", runnyNose: "👃",
  soreThroat: "🗣️", stomachache: "🤢", diarrhea: "🚽", indigestion: "😣",
  nausea: "🤮", musclePain: "💪", backPain: "🦴", allergy: "🤲",
  skinRash: "🩹", menstrualPain: "🩸", toothache: "🦷", eyeStrain: "👁️",
  heartburn: "🔥", constipation: "😫", insomnia: "😴", jointPain: "🦵",
};

function getCategoryName(categoryId: string, lang: string, t: (key: string) => string): string {
  const key = `symptoms.${categoryId}`;
  const translated = t(key);
  if (translated !== key) return translated;

  const fallbackMap: Record<string, Record<string, string>> = {
    headache: { ko: "두통", en: "Headache", vi: "Đau đầu" },
    fever: { ko: "발열", en: "Fever", vi: "Sốt" },
    cough: { ko: "기침", en: "Cough", vi: "Ho" },
    runnyNose: { ko: "콧물/코막힘", en: "Runny Nose", vi: "Sổ mũi" },
    soreThroat: { ko: "인후통", en: "Sore Throat", vi: "Đau họng" },
    stomachache: { ko: "배탈/복통", en: "Stomachache", vi: "Đau bụng" },
    diarrhea: { ko: "설사", en: "Diarrhea", vi: "Tiêu chảy" },
    indigestion: { ko: "소화불량", en: "Indigestion", vi: "Khó tiêu" },
    nausea: { ko: "구역/구토", en: "Nausea", vi: "Buồn nôn" },
    musclePain: { ko: "근육통", en: "Muscle Pain", vi: "Đau cơ" },
    backPain: { ko: "요통/허리", en: "Back Pain", vi: "Đau lưng" },
    allergy: { ko: "알레르기", en: "Allergy", vi: "Dị ứng" },
    skinRash: { ko: "피부 발진", en: "Skin Rash", vi: "Phát ban" },
    menstrualPain: { ko: "생리통", en: "Period Pain", vi: "Đau bụng kinh" },
    toothache: { ko: "치통", en: "Toothache", vi: "Đau răng" },
    eyeStrain: { ko: "눈 피로", en: "Eye Strain", vi: "Mỏi mắt" },
    heartburn: { ko: "속쓰림", en: "Heartburn", vi: "Ợ nóng" },
    constipation: { ko: "변비", en: "Constipation", vi: "Táo bón" },
    insomnia: { ko: "불면증", en: "Insomnia", vi: "Mất ngủ" },
    jointPain: { ko: "관절통", en: "Joint Pain", vi: "Đau khớp" },
  };
  return fallbackMap[categoryId]?.[lang] || fallbackMap[categoryId]?.en || categoryId;
}

export default function MatchCandidates({ candidates, onSelect, onShowAll }: MatchCandidatesProps) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="mt-4 animate-in fade-in">
      <p className="text-sm font-medium text-gray-500 mb-3 text-center">
        {LABELS[lang] || LABELS.en}
      </p>
      <div className="space-y-2">
        {candidates.map((c) => (
          <button
            key={c.category}
            onClick={() => onSelect(c.category)}
            className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left"
          >
            <span className="text-xl">{CATEGORY_ICONS[c.category] || "💊"}</span>
            <span className="flex-1 text-base font-medium text-gray-700">
              {getCategoryName(c.category, lang, t)}
            </span>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
      <button
        onClick={onShowAll}
        className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
      >
        {OTHER[lang] || OTHER.en}
      </button>
    </div>
  );
}
