import { useTranslation } from "react-i18next";
import { ALL_CATEGORIES } from "../../services/symptomTree";

interface AllCategorySelectorProps {
  onSelect: (category: string) => void;
  onBack: () => void;
}

const TITLE: Record<string, string> = {
  ko: "아래에서 가장 가까운 증상을 선택해주세요",
  en: "Please select the closest symptom below",
  vi: "Vui lòng chọn triệu chứng gần nhất bên dưới",
};

const BACK: Record<string, string> = {
  ko: "← 뒤로",
  en: "← Back",
  vi: "← Quay lại",
};

const ICONS: Record<string, string> = {
  headache: "🤕", fever: "🌡️", cough: "😷", runnyNose: "👃",
  soreThroat: "🗣️", stomachache: "🤢", diarrhea: "🚽", indigestion: "😣",
  nausea: "🤮", musclePain: "💪", backPain: "🦴", allergy: "🤲",
  skinRash: "🩹", menstrualPain: "🩸", toothache: "🦷", eyeStrain: "👁️",
  heartburn: "🔥", constipation: "😫", insomnia: "😴", jointPain: "🦵",
};

const NAMES: Record<string, Record<string, string>> = {
  headache: { ko: "두통", en: "Headache", vi: "Đau đầu" },
  fever: { ko: "발열/감기", en: "Fever/Cold", vi: "Sốt/Cảm" },
  cough: { ko: "기침", en: "Cough", vi: "Ho" },
  runnyNose: { ko: "콧물/코막힘", en: "Runny/Stuffy Nose", vi: "Sổ mũi/Nghẹt mũi" },
  soreThroat: { ko: "인후통", en: "Sore Throat", vi: "Đau họng" },
  stomachache: { ko: "복통/배탈", en: "Stomachache", vi: "Đau bụng" },
  diarrhea: { ko: "설사", en: "Diarrhea", vi: "Tiêu chảy" },
  indigestion: { ko: "소화불량", en: "Indigestion", vi: "Khó tiêu" },
  nausea: { ko: "구역/구토", en: "Nausea/Vomiting", vi: "Buồn nôn" },
  musclePain: { ko: "근육통", en: "Muscle Pain", vi: "Đau cơ" },
  backPain: { ko: "요통/허리", en: "Back Pain", vi: "Đau lưng" },
  allergy: { ko: "알레르기", en: "Allergy", vi: "Dị ứng" },
  skinRash: { ko: "피부 발진/가려움", en: "Skin Rash/Itching", vi: "Phát ban/Ngứa" },
  menstrualPain: { ko: "생리통", en: "Period Pain", vi: "Đau bụng kinh" },
  toothache: { ko: "치통", en: "Toothache", vi: "Đau răng" },
  eyeStrain: { ko: "눈 피로/충혈", en: "Eye Strain/Redness", vi: "Mỏi mắt/Đỏ mắt" },
  heartburn: { ko: "속쓰림/위산역류", en: "Heartburn/Acid Reflux", vi: "Ợ nóng" },
  constipation: { ko: "변비", en: "Constipation", vi: "Táo bón" },
  insomnia: { ko: "불면증", en: "Insomnia", vi: "Mất ngủ" },
  jointPain: { ko: "관절통", en: "Joint Pain", vi: "Đau khớp" },
};

const DESC: Record<string, Record<string, string>> = {
  headache: { ko: "머리가 아픈 증상", en: "Pain in the head", vi: "Đau đầu" },
  fever: { ko: "체온이 올라가는 상태", en: "Elevated body temperature", vi: "Thân nhiệt tăng" },
  cough: { ko: "목에서 나는 기침", en: "Throat reflex", vi: "Ho" },
  runnyNose: { ko: "코 관련 증상", en: "Nasal symptoms", vi: "Triệu chứng mũi" },
  soreThroat: { ko: "목이 아픈 증상", en: "Throat pain", vi: "Đau họng" },
  stomachache: { ko: "배가 아픈 증상", en: "Abdominal pain", vi: "Đau bụng" },
  diarrhea: { ko: "묽은 변을 자주 보는 상태", en: "Loose stools", vi: "Phân lỏng" },
  indigestion: { ko: "소화가 안 되는 상태", en: "Difficulty digesting", vi: "Khó tiêu hóa" },
  nausea: { ko: "메스껍고 토할 것 같은 느낌", en: "Feeling sick", vi: "Buồn nôn" },
  musclePain: { ko: "근육이 아픈 상태", en: "Muscle aches", vi: "Nhức cơ" },
  backPain: { ko: "허리가 아픈 증상", en: "Back/spine pain", vi: "Đau lưng" },
  allergy: { ko: "과민 반응", en: "Hypersensitivity", vi: "Phản ứng quá mẫn" },
  skinRash: { ko: "피부 이상 증상", en: "Skin problems", vi: "Vấn đề da" },
  menstrualPain: { ko: "생리 중 통증", en: "Period pain", vi: "Đau kinh nguyệt" },
  toothache: { ko: "이/잇몸 통증", en: "Tooth/gum pain", vi: "Đau răng/nướu" },
  eyeStrain: { ko: "눈 관련 불편감", en: "Eye discomfort", vi: "Khó chịu mắt" },
  heartburn: { ko: "속쓰림/위산 역류", en: "Acid reflux", vi: "Trào ngược" },
  constipation: { ko: "배변이 어려운 상태", en: "Hard to pass stool", vi: "Khó đi cầu" },
  insomnia: { ko: "잠이 안 오는 상태", en: "Can't sleep", vi: "Khó ngủ" },
  jointPain: { ko: "관절이 아픈 증상", en: "Joint aches", vi: "Nhức khớp" },
};

export default function AllCategorySelector({ onSelect, onBack }: AllCategorySelectorProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          {BACK[lang] || BACK.en}
        </button>
      </header>

      <main className="flex-1 px-5 pt-4 pb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-5 text-center leading-snug">
          {TITLE[lang] || TITLE.en}
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="flex flex-col items-center gap-1.5 px-3 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-[0.97] transition-all"
            >
              <span className="text-2xl">{ICONS[cat] || "💊"}</span>
              <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                {NAMES[cat]?.[lang] || NAMES[cat]?.en || cat}
              </span>
              <span className="text-[10px] text-gray-400 text-center leading-tight">
                {DESC[cat]?.[lang] || DESC[cat]?.en || ""}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
