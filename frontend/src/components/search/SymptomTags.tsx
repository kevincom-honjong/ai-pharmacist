import { useState } from "react";
import { useTranslation } from "react-i18next";

const PRIMARY_SYMPTOMS = [
  "headache", "cold", "stomachache", "fever", "allergy", "musclePain",
] as const;

const SECONDARY_SYMPTOMS = [
  "cough", "runnyNose", "soreThroat", "indigestion", "diarrhea", "nausea",
  "backPain", "skinRash", "menstrualPain", "toothache", "eyeStrain",
  "heartburn2", "constipation", "insomnia", "jointPain",
  "dizziness", "tinnitus", "nosebleed", "mouthUlcer", "burn",
  "wound", "swelling", "acne", "athletesFoot", "stye",
] as const;

const TAG_ICONS: Record<string, string> = {
  headache: "🤕", cold: "🤧", stomachache: "🤢", fever: "🌡️",
  allergy: "🤲", musclePain: "💪", cough: "😷", runnyNose: "👃",
  soreThroat: "🗣️", indigestion: "😣", diarrhea: "🚽", nausea: "🤮",
  backPain: "🦴", skinRash: "🩹", menstrualPain: "🩸", toothache: "🦷",
  eyeStrain: "👁️", heartburn2: "🔥", constipation: "😫", insomnia: "😴",
  jointPain: "🦵",
  dizziness: "💫", tinnitus: "👂", nosebleed: "🩸", mouthUlcer: "👄",
  burn: "🔥", wound: "🩹", swelling: "🦶", acne: "😖",
  athletesFoot: "🦶", stye: "👁️",
};

const PASTEL_COLORS: Record<string, string> = {
  headache: "bg-rose-50 hover:bg-rose-100 text-rose-700",
  cold: "bg-sky-50 hover:bg-sky-100 text-sky-700",
  stomachache: "bg-amber-50 hover:bg-amber-100 text-amber-700",
  fever: "bg-orange-50 hover:bg-orange-100 text-orange-700",
  allergy: "bg-violet-50 hover:bg-violet-100 text-violet-700",
  musclePain: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700",
  cough: "bg-teal-50 hover:bg-teal-100 text-teal-700",
  runnyNose: "bg-cyan-50 hover:bg-cyan-100 text-cyan-700",
  soreThroat: "bg-pink-50 hover:bg-pink-100 text-pink-700",
  indigestion: "bg-lime-50 hover:bg-lime-100 text-lime-700",
  diarrhea: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700",
  nausea: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700",
  backPain: "bg-stone-50 hover:bg-stone-100 text-stone-700",
  skinRash: "bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700",
  menstrualPain: "bg-red-50 hover:bg-red-100 text-red-700",
  toothache: "bg-slate-50 hover:bg-slate-100 text-slate-700",
  eyeStrain: "bg-blue-50 hover:bg-blue-100 text-blue-700",
  heartburn2: "bg-orange-50 hover:bg-orange-100 text-orange-700",
  constipation: "bg-amber-50 hover:bg-amber-100 text-amber-700",
  insomnia: "bg-purple-50 hover:bg-purple-100 text-purple-700",
  jointPain: "bg-teal-50 hover:bg-teal-100 text-teal-700",
  dizziness: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700",
  tinnitus: "bg-violet-50 hover:bg-violet-100 text-violet-700",
  nosebleed: "bg-red-50 hover:bg-red-100 text-red-700",
  mouthUlcer: "bg-pink-50 hover:bg-pink-100 text-pink-700",
  burn: "bg-orange-50 hover:bg-orange-100 text-orange-700",
  wound: "bg-rose-50 hover:bg-rose-100 text-rose-700",
  swelling: "bg-cyan-50 hover:bg-cyan-100 text-cyan-700",
  acne: "bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700",
  athletesFoot: "bg-lime-50 hover:bg-lime-100 text-lime-700",
  stye: "bg-sky-50 hover:bg-sky-100 text-sky-700",
};

interface SymptomTagsProps {
  onSelect: (symptom: string) => void;
}

export default function SymptomTags({ onSelect }: SymptomTagsProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const renderTag = (key: string) => (
    <button
      key={key}
      onClick={() => onSelect(t(`symptoms.${key}`))}
      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium shadow-sm active:scale-95 transition-all ${PASTEL_COLORS[key]}`}
    >
      <span className="text-base">{TAG_ICONS[key]}</span>
      {t(`symptoms.${key}`)}
    </button>
  );

  return (
    <div>
      <p className="text-sm font-medium text-gray-400 mb-3">
        {t("home.popularSymptoms")}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {PRIMARY_SYMPTOMS.map(renderTag)}

        {expanded && SECONDARY_SYMPTOMS.map(renderTag)}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mx-auto"
      >
        <span>{expanded ? t("home.showLess") : t("home.showMore")}</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  );
}
