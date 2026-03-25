import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  getCategory,
  findCombo,
  getDrugEntries,
  type SymptomComboResult,
  type FollowUpQuestion,
  type DrugEntry,
} from "../../services/symptomData";
import { getCountryInfo, getEmergencyNumber } from "../../services/countryDetect";
import { getCategorySpecialty, getSpecialtyName, getMapsUrl } from "../../services/hospitalData";
import { parseSymptomInput, type ParsedInput } from "../../services/inputParser";
import CompanionCheckStep from "./CompanionCheckStep";
import NewDrugCard from "../drug/NewDrugCard";
import HospitalWarning from "../common/HospitalWarning";
import AnalyzingScreen from "./AnalyzingScreen";

interface SymptomFlowProps {
  category: string;
  countryCode: string;
  inputText?: string;
  onReset: () => void;
}

type FlowStep = "companion" | "followUp" | "medicalQ" | "medSubSelect" | "analyzing" | "result" | "hospital";

// --- Medical Questionnaire Types & Data ---

interface MedicalProfile {
  ageGroup: string;
  gender: string;
  duration: string;
  severity: string;
  currentMedications: string[];
  allergies: string[];
  healthConditions: string[];
}

interface MedicalOption {
  value: string;
  labelKR: string;
  labelEN: string;
  labelVI: string;
}

interface MedicalQuestion {
  id: keyof MedicalProfile;
  questionKR: string;
  questionEN: string;
  questionVI: string;
  hintKR?: string;
  hintEN?: string;
  hintVI?: string;
  type: "single" | "multi" | "conditional";
  options: MedicalOption[];
  /** For conditional questions: sub-options shown when a specific trigger value is selected */
  triggerValue?: string;
  subOptions?: MedicalOption[];
}

const MEDICAL_QUESTIONS: MedicalQuestion[] = [
  {
    id: "ageGroup",
    questionKR: "연령대를 선택해주세요",
    questionEN: "Please select your age group",
    questionVI: "Vui lòng chọn nhóm tuổi của bạn",
    hintKR: "정확한 약 추천을 위해 필요해요",
    hintEN: "Needed for accurate drug recommendations",
    hintVI: "Cần thiết để đề xuất thuốc chính xác",
    type: "single",
    options: [
      { value: "infant", labelKR: "영유아 (0~5세)", labelEN: "Infant (0-5)", labelVI: "Trẻ sơ sinh (0-5)" },
      { value: "child", labelKR: "어린이 (6~12세)", labelEN: "Child (6-12)", labelVI: "Trẻ em (6-12)" },
      { value: "teen", labelKR: "청소년 (13~17세)", labelEN: "Teenager (13-17)", labelVI: "Thanh thiếu niên (13-17)" },
      { value: "adult", labelKR: "성인 (18~64세)", labelEN: "Adult (18-64)", labelVI: "Người lớn (18-64)" },
      { value: "senior", labelKR: "고령자 (65세 이상)", labelEN: "Senior (65+)", labelVI: "Người cao tuổi (65+)" },
    ],
  },
  {
    id: "gender",
    questionKR: "성별을 선택해주세요",
    questionEN: "Please select your gender",
    questionVI: "Vui lòng chọn giới tính của bạn",
    type: "single",
    options: [
      { value: "male", labelKR: "남성", labelEN: "Male", labelVI: "Nam" },
      { value: "female", labelKR: "여성", labelEN: "Female", labelVI: "Nữ" },
    ],
  },
  {
    id: "duration",
    questionKR: "증상이 시작된 지 얼마나 됐나요?",
    questionEN: "How long have you had these symptoms?",
    questionVI: "Bạn có triệu chứng này bao lâu rồi?",
    hintKR: "대략적인 기간을 선택해주세요",
    hintEN: "Select the approximate duration",
    hintVI: "Chọn khoảng thời gian gần đúng",
    type: "single",
    options: [
      { value: "today", labelKR: "오늘 처음", labelEN: "Started today", labelVI: "Bắt đầu hôm nay" },
      { value: "2-3days", labelKR: "2~3일", labelEN: "2-3 days", labelVI: "2-3 ngày" },
      { value: "1week", labelKR: "일주일 정도", labelEN: "About a week", labelVI: "Khoảng 1 tuần" },
      { value: "2weeks+", labelKR: "2주 이상", labelEN: "Over 2 weeks", labelVI: "Hơn 2 tuần" },
      { value: "1month+", labelKR: "한 달 이상", labelEN: "Over a month", labelVI: "Hơn 1 tháng" },
    ],
  },
  {
    id: "severity",
    questionKR: "증상의 정도는 어떤가요?",
    questionEN: "How severe are your symptoms?",
    questionVI: "Mức độ triệu chứng của bạn?",
    type: "single",
    options: [
      { value: "mild", labelKR: "가벼움", labelEN: "Mild", labelVI: "Nhẹ" },
      { value: "moderate", labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
      { value: "severe", labelKR: "심함", labelEN: "Severe", labelVI: "Nặng" },
      { value: "very_severe", labelKR: "매우 심함", labelEN: "Very severe", labelVI: "Rất nặng" },
    ],
  },
  {
    id: "currentMedications",
    questionKR: "현재 복용 중인 약이 있나요?",
    questionEN: "Are you currently taking any medications?",
    questionVI: "Bạn hiện đang dùng thuốc nào không?",
    hintKR: "약물 상호작용 확인을 위해 필요해요",
    hintEN: "Needed to check for drug interactions",
    hintVI: "Cần thiết để kiểm tra tương tác thuốc",
    type: "conditional",
    options: [
      { value: "none", labelKR: "없음", labelEN: "None", labelVI: "Không có" },
      { value: "yes", labelKR: "있음", labelEN: "Yes", labelVI: "Có" },
    ],
    triggerValue: "yes",
    subOptions: [
      { value: "혈압약", labelKR: "혈압약", labelEN: "Blood pressure meds", labelVI: "Thuốc huyết áp" },
      { value: "당뇨약", labelKR: "당뇨약", labelEN: "Diabetes meds", labelVI: "Thuốc tiểu đường" },
      { value: "혈액희석제", labelKR: "혈액희석제", labelEN: "Blood thinners", labelVI: "Thuốc chống đông máu" },
      { value: "진통제", labelKR: "진통제", labelEN: "Pain relievers", labelVI: "Thuốc giảm đau" },
      { value: "항생제", labelKR: "항생제", labelEN: "Antibiotics", labelVI: "Thuốc kháng sinh" },
      { value: "위장약", labelKR: "위장약", labelEN: "Stomach meds", labelVI: "Thuốc dạ dày" },
    ],
  },
  {
    id: "allergies",
    questionKR: "약물 알레르기가 있나요?",
    questionEN: "Do you have any drug allergies?",
    questionVI: "Bạn có dị ứng thuốc nào không?",
    hintKR: "안전한 약 추천을 위해 알려주세요",
    hintEN: "Please let us know for safe recommendations",
    hintVI: "Vui lòng cho biết để đề xuất thuốc an toàn",
    type: "conditional",
    options: [
      { value: "none", labelKR: "없음", labelEN: "None", labelVI: "Không có" },
      { value: "unknown", labelKR: "모름", labelEN: "Unknown", labelVI: "Không biết" },
      { value: "yes", labelKR: "있음", labelEN: "Yes", labelVI: "Có" },
    ],
    triggerValue: "yes",
    subOptions: [
      { value: "아스피린", labelKR: "아스피린", labelEN: "Aspirin", labelVI: "Aspirin" },
      { value: "이부프로펜", labelKR: "이부프로펜", labelEN: "Ibuprofen", labelVI: "Ibuprofen" },
      { value: "페니실린", labelKR: "페니실린", labelEN: "Penicillin", labelVI: "Penicillin" },
      { value: "설파제", labelKR: "설파제", labelEN: "Sulfa drugs", labelVI: "Thuốc Sulfa" },
    ],
  },
  {
    id: "healthConditions",
    questionKR: "해당하는 건강 상태를 모두 선택해주세요",
    questionEN: "Select all health conditions that apply",
    questionVI: "Chọn tất cả tình trạng sức khỏe phù hợp",
    hintKR: "복수 선택 가능합니다",
    hintEN: "You can select multiple",
    hintVI: "Bạn có thể chọn nhiều mục",
    type: "multi",
    options: [
      { value: "임신 중", labelKR: "임신 중", labelEN: "Pregnant", labelVI: "Đang mang thai" },
      { value: "수유 중", labelKR: "수유 중", labelEN: "Breastfeeding", labelVI: "Đang cho con bú" },
      { value: "고혈압", labelKR: "고혈압", labelEN: "High blood pressure", labelVI: "Huyết áp cao" },
      { value: "당뇨", labelKR: "당뇨", labelEN: "Diabetes", labelVI: "Tiểu đường" },
      { value: "간질환", labelKR: "간질환", labelEN: "Liver disease", labelVI: "Bệnh gan" },
      { value: "신장질환", labelKR: "신장질환", labelEN: "Kidney disease", labelVI: "Bệnh thận" },
      { value: "위장질환", labelKR: "위장질환", labelEN: "Gastrointestinal disease", labelVI: "Bệnh tiêu hóa" },
      { value: "심장질환", labelKR: "심장질환", labelEN: "Heart disease", labelVI: "Bệnh tim" },
      { value: "천식", labelKR: "천식", labelEN: "Asthma", labelVI: "Hen suyễn" },
      { value: "해당없음", labelKR: "해당없음", labelEN: "None", labelVI: "Không có" },
    ],
  },
];

const MEDICAL_Q_COUNT = MEDICAL_QUESTIONS.length; // 7

// --- Helpers ---

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

function getMedQuestionLabel(q: MedicalQuestion, lang: string) {
  if (lang === "vi") return q.questionVI;
  if (lang === "en") return q.questionEN;
  return q.questionKR;
}

function getMedHintLabel(q: MedicalQuestion, lang: string) {
  if (lang === "vi") return q.hintVI || "";
  if (lang === "en") return q.hintEN || "";
  return q.hintKR || "";
}

function getMedOptionLabel(opt: MedicalOption, lang: string) {
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

function getSkipLabel(lang: string) {
  if (lang === "vi") return "Bỏ qua";
  if (lang === "en") return "Skip";
  return "건너뛰기";
}

function getNextLabel(lang: string) {
  if (lang === "vi") return "Tiếp theo";
  if (lang === "en") return "Next";
  return "다음";
}

/** Build the summary line for medical profile display */
function buildMedicalSummary(profile: MedicalProfile, lang: string) {
  const ageMap: Record<string, { kr: string; en: string; vi: string }> = {
    infant: { kr: "영유아 (0~5세)", en: "Infant (0-5)", vi: "Trẻ sơ sinh (0-5)" },
    child: { kr: "어린이 (6~12세)", en: "Child (6-12)", vi: "Trẻ em (6-12)" },
    teen: { kr: "청소년 (13~17세)", en: "Teenager (13-17)", vi: "Thanh thiếu niên (13-17)" },
    adult: { kr: "성인 (18~64세)", en: "Adult (18-64)", vi: "Người lớn (18-64)" },
    senior: { kr: "고령자 (65+)", en: "Senior (65+)", vi: "Người cao tuổi (65+)" },
  };
  const genderMap: Record<string, { kr: string; en: string; vi: string }> = {
    male: { kr: "남성", en: "Male", vi: "Nam" },
    female: { kr: "여성", en: "Female", vi: "Nữ" },
  };
  const durationMap: Record<string, { kr: string; en: string; vi: string }> = {
    today: { kr: "오늘 처음", en: "Today", vi: "Hôm nay" },
    "2-3days": { kr: "2~3일", en: "2-3 days", vi: "2-3 ngày" },
    "1week": { kr: "일주일", en: "~1 week", vi: "~1 tuần" },
    "2weeks+": { kr: "2주 이상", en: "2+ weeks", vi: "2+ tuần" },
    "1month+": { kr: "한 달 이상", en: "1+ month", vi: "1+ tháng" },
  };
  const severityMap: Record<string, { kr: string; en: string; vi: string }> = {
    mild: { kr: "가벼움", en: "Mild", vi: "Nhẹ" },
    moderate: { kr: "중간", en: "Moderate", vi: "Trung bình" },
    severe: { kr: "심함", en: "Severe", vi: "Nặng" },
    very_severe: { kr: "매우 심함", en: "Very severe", vi: "Rất nặng" },
  };

  const l = lang === "vi" ? "vi" : lang === "en" ? "en" : "kr";

  const age = ageMap[profile.ageGroup]?.[l] || profile.ageGroup || "-";
  const gender = genderMap[profile.gender]?.[l] || profile.gender || "-";
  const duration = durationMap[profile.duration]?.[l] || profile.duration || "-";
  const severity = severityMap[profile.severity]?.[l] || profile.severity || "-";

  const medsLabel = profile.currentMedications.length > 0 ? profile.currentMedications.join(", ") : (l === "kr" ? "없음" : l === "vi" ? "Không" : "None");
  const allergyLabel = profile.allergies.length > 0 ? profile.allergies.join(", ") : (l === "kr" ? "없음" : l === "vi" ? "Không" : "None");
  const conditionsLabel = profile.healthConditions.filter(c => c !== "해당없음").length > 0
    ? profile.healthConditions.filter(c => c !== "해당없음").join(", ")
    : "";

  const durationTitle = l === "kr" ? "증상 기간" : l === "vi" ? "Thời gian" : "Duration";
  const severityTitle = l === "kr" ? "강도" : l === "vi" ? "Mức độ" : "Severity";
  const medsTitle = l === "kr" ? "복용약" : l === "vi" ? "Thuốc" : "Meds";
  const allergyTitle = l === "kr" ? "알레르기" : l === "vi" ? "Dị ứng" : "Allergies";
  const condTitle = l === "kr" ? "주의" : l === "vi" ? "Lưu ý" : "Note";

  return { age, gender, duration, severity, medsLabel, allergyLabel, conditionsLabel, durationTitle, severityTitle, medsTitle, allergyTitle, condTitle };
}

/** Build warnings based on medical profile */
function getMedicalWarnings(profile: MedicalProfile, lang: string): string[] {
  const warnings: string[] = [];
  const l = lang === "vi" ? "vi" : lang === "en" ? "en" : "kr";

  if (profile.duration === "2weeks+" || profile.duration === "1month+") {
    const msg = {
      kr: "장기 지속 증상은 병원 방문을 권장합니다",
      en: "Prolonged symptoms — we recommend visiting a doctor",
      vi: "Triệu chứng kéo dài — nên đi khám bác sĩ",
    };
    warnings.push(msg[l]);
  }
  if (profile.severity === "very_severe") {
    const msg = {
      kr: "증상이 매우 심한 경우 병원 방문을 강력히 권장합니다",
      en: "Very severe symptoms — strongly recommend visiting a hospital",
      vi: "Triệu chứng rất nặng — khuyến khích đi bệnh viện ngay",
    };
    warnings.push(msg[l]);
  }
  if (profile.healthConditions.includes("임신 중")) {
    const msg = {
      kr: "임신 중에는 약사와 반드시 상담하세요",
      en: "Please consult a pharmacist during pregnancy",
      vi: "Vui lòng tham khảo dược sĩ khi mang thai",
    };
    warnings.push(msg[l]);
  }
  if (profile.allergies.length > 0) {
    const items = profile.allergies.join(", ");
    const msg = {
      kr: `알레르기 성분 확인 후 복용하세요: ${items}`,
      en: `Check for allergens before taking: ${items}`,
      vi: `Kiểm tra dị ứng trước khi dùng: ${items}`,
    };
    warnings.push(msg[l]);
  }
  return warnings;
}

// --- Component ---

export default function SymptomFlow({ category, countryCode, inputText, onReset }: SymptomFlowProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cat = getCategory(category);
  const country = getCountryInfo(countryCode);
  const countryName = country?.nameLocal || countryCode;

  // Parse input text for auto-detection
  const parsed = useMemo<ParsedInput>(() => inputText ? parseSymptomInput(inputText) : {}, [inputText]);
  const [autoDetected, setAutoDetected] = useState<Record<string, { label: string; source: string }>>({});
  const [editedFields, setEditedFields] = useState<Set<string>>(new Set()); // fields user manually edited after auto-detect

  const [step, setStep] = useState<FlowStep>("companion");
  const [combo, setCombo] = useState<SymptomComboResult | null>(null);
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState<number[]>([]);
  const [drugs, setDrugs] = useState<[DrugEntry, DrugEntry] | null>(null);

  // Medical questionnaire state
  const [medicalQIndex, setMedicalQIndex] = useState(0);
  const [medicalProfile, setMedicalProfile] = useState<MedicalProfile>({
    ageGroup: "",
    gender: "",
    duration: "",
    severity: "",
    currentMedications: [],
    allergies: [],
    healthConditions: [],
  });
  const [medSubStep, setMedSubStep] = useState(false);
  const [multiSelectTemp, setMultiSelectTemp] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [ageWarning, setAgeWarning] = useState<"child" | "elderly" | null>(null);

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

  // Total steps for progress calculation
  const followUpCount = combo?.followUpQuestions?.length || 0;
  const totalSteps = followUpCount + MEDICAL_Q_COUNT;

  // Browser back button handler
  useEffect(() => {
    const handlePopState = () => {
      if (step === "result" || step === "analyzing") {
        onReset();
      } else if (step === "medSubSelect") {
        // Go back from sub-select to the parent medicalQ question
        setMedSubStep(false);
        setMultiSelectTemp([]);
        setStep("medicalQ");
        scrollTop();
      } else if (step === "medicalQ") {
        if (medicalQIndex > 0) {
          setMedicalQIndex(medicalQIndex - 1);
          setMedSubStep(false);
          setMultiSelectTemp([]);
        } else if (followUpCount > 0) {
          setFollowUpIndex(followUpCount - 1);
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
        onReset();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step, followUpIndex, medicalQIndex, medSubStep, combo, onReset, followUpCount]);

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
      setMedicalQIndex(0);
      setMedSubStep(false);
      setMultiSelectTemp([]);
      setStep("medicalQ");
      pushState("medicalQ-0");
      scrollTop();
    }
  };

  // Step 2: Specific follow-up questions
  const handleFollowUpAnswer = (answerIndex: number) => {
    if (!combo?.followUpQuestions) return;
    setSelectedIdx(answerIndex);

    setTimeout(() => {
      setSelectedIdx(null);
      const newAnswers = [...followUpAnswers, answerIndex];
      setFollowUpAnswers(newAnswers);

      if (followUpIndex + 1 < combo.followUpQuestions.length) {
        setFollowUpIndex(followUpIndex + 1);
        pushState(`followUp-${followUpIndex + 1}`);
        scrollTop();
      } else {
        setMedicalQIndex(0);
        setMedSubStep(false);
        setMultiSelectTemp([]);
        setStep("medicalQ");
        pushState("medicalQ-0");
        scrollTop();
      }
    }, 500);
  };

  // Step 3: Medical questionnaire answer handlers

  const updateProfile = (field: keyof MedicalProfile, value: string | string[]) => {
    setMedicalProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Check if a medical question can be auto-answered from parsed input
  const tryAutoAnswer = (nextIdx: number): boolean => {
    if (nextIdx >= MEDICAL_Q_COUNT) return false;
    const q = MEDICAL_QUESTIONS[nextIdx];

    // Don't auto-skip fields the user already manually edited
    if (editedFields.has(q.id)) return false;

    // Auto-fill duration
    if (q.id === "duration" && parsed.duration) {
      updateProfile("duration", parsed.duration.value);
      setAutoDetected(prev => ({ ...prev, duration: { label: parsed.duration!.label, source: parsed.duration!.source } }));
      return true;
    }
    // Auto-fill severity
    if (q.id === "severity" && parsed.severity) {
      updateProfile("severity", parsed.severity.value);
      setAutoDetected(prev => ({ ...prev, severity: { label: parsed.severity!.label, source: parsed.severity!.source } }));
      return true;
    }
    return false;
  };

  const advanceMedicalQ = () => {
    let nextIdx = medicalQIndex + 1;

    // Skip auto-detected questions
    while (nextIdx < MEDICAL_Q_COUNT && tryAutoAnswer(nextIdx)) {
      nextIdx++;
    }

    if (nextIdx < MEDICAL_Q_COUNT) {
      setMedicalQIndex(nextIdx);
      setMedSubStep(false);
      setMultiSelectTemp([]);
      pushState(`medicalQ-${nextIdx}`);
      scrollTop();
    } else {
      resolveDrugsAndAnalyze();
    }
  };

  const skipMedicalQ = () => {
    // Leave field as default (empty string or empty array)
    advanceMedicalQ();
  };

  const handleMedicalSingleAnswer = (question: MedicalQuestion, opt: MedicalOption, optIdx: number) => {
    if (question.type === "conditional") {
      setSelectedIdx(optIdx);
      setTimeout(() => {
        setSelectedIdx(null);
        if (opt.value === question.triggerValue) {
          updateProfile(question.id, []);
          setMultiSelectTemp([]);
          setMedSubStep(true);
          setStep("medSubSelect");
          pushState(`medSubSelect-${question.id}`);
          scrollTop();
        } else {
          updateProfile(question.id, []);
          advanceMedicalQ();
        }
      }, 500);
      return;
    }
    // Normal single select with highlight delay
    setSelectedIdx(optIdx);
    setTimeout(() => {
      setSelectedIdx(null);
      updateProfile(question.id, opt.value);
      advanceMedicalQ();
    }, 500);
  };

  const handleMultiSelectToggle = (value: string, question: MedicalQuestion) => {
    // For healthConditions: "해당없음" clears others
    if (question.id === "healthConditions") {
      if (value === "해당없음") {
        setMultiSelectTemp(["해당없음"]);
        return;
      }
      setMultiSelectTemp((prev) => {
        const without = prev.filter((v) => v !== "해당없음");
        return without.includes(value) ? without.filter((v) => v !== value) : [...without, value];
      });
      return;
    }
    // Normal toggle
    setMultiSelectTemp((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleMultiSelectSubmit = (question: MedicalQuestion) => {
    updateProfile(question.id, multiSelectTemp);
    if (step === "medSubSelect") {
      setMedSubStep(false);
      setStep("medicalQ");
    }
    advanceMedicalQ();
  };

  const resolveDrugsAndAnalyze = () => {
    if (combo) {
      const lastAnswer = followUpAnswers[followUpAnswers.length - 1];
      const severityVal = medicalProfile.severity;
      const isSevere = severityVal === "severe" || severityVal === "very_severe";
      const age = medicalProfile.ageGroup;
      const isChild = age === "infant" || age === "child";

      // Age-based drug matching: infant/child get children's drugs
      let matchKey = (lastAnswer === 2 || isSevere) ? "severe" : "default";
      if (isChild && combo.drugMatches["child"]) {
        matchKey = "child";
      }

      const drugMatch = combo.drugMatches[matchKey] || combo.drugMatches["default"];
      if (drugMatch) {
        const entries = getDrugEntries(drugMatch, countryCode);
        setDrugs(entries);

        // Set age warning flag for result display
        if (isChild) {
          setAgeWarning("child");
        } else if (age === "elderly") {
          setAgeWarning("elderly");
        } else {
          setAgeWarning(null);
        }
      }
    }
    setStep("analyzing");
    pushState("analyzing");
    scrollTop();
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

  const handleMedicalBack = () => {
    if (medSubStep) {
      // Go back from sub-select to the main question
      setMedSubStep(false);
      setMultiSelectTemp([]);
      setStep("medicalQ");
      scrollTop();
      return;
    }
    if (medicalQIndex > 0) {
      setMedicalQIndex(medicalQIndex - 1);
      setMultiSelectTemp([]);
    } else {
      // Go back to follow-ups or companion
      if (followUpCount > 0) {
        setFollowUpIndex(followUpCount - 1);
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
            {question.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              return (
              <button
                key={idx}
                onClick={() => selectedIdx === null && handleFollowUpAnswer(idx)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-base transition-all duration-300 shadow-sm flex items-center justify-between ${
                  isSelected
                    ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700 scale-[1.02] shadow-md"
                    : "bg-white text-gray-700 border-2 border-transparent hover:shadow-md active:scale-[0.98]"
                }`}
              >
                <span>{getOptionLabel(opt, lang)}</span>
                {isSelected && <span className="text-emerald-500 text-lg">✓</span>}
              </button>
              );
            })}
          </div>
        </main>

        <footer className="px-4 py-2.5">
          <p className="text-center text-xs text-gray-300">{t("disclaimer.short")}</p>
        </footer>
      </div>
    );
  }

  // Medical questionnaire step (single / conditional initial)
  if (step === "medicalQ") {
    const question = MEDICAL_QUESTIONS[medicalQIndex];
    const currentStep = followUpCount + medicalQIndex + 1;
    const progress = (currentStep / totalSteps) * 100;
    const hint = getMedHintLabel(question, lang);

    // For multi-select type (healthConditions)
    if (question.type === "multi") {
      // Filter options based on gender for healthConditions
      let visibleOptions = question.options;
      if (question.id === "healthConditions" && medicalProfile.gender === "male") {
        visibleOptions = question.options.filter(
          (o) => o.value !== "임신 중" && o.value !== "수유 중"
        );
      }

      return (
        <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
          <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
            <button
              onClick={handleMedicalBack}
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
            <h2 className="text-xl font-bold text-gray-800 mb-2 leading-snug">
              {getMedQuestionLabel(question, lang)}
            </h2>
            {hint && (
              <p className="text-sm text-gray-400 italic mb-8">{hint}</p>
            )}
            <div className="space-y-3">
              {visibleOptions.map((opt) => {
                const selected = multiSelectTemp.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleMultiSelectToggle(opt.value, question)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-base transition-all shadow-sm flex items-center gap-3 ${
                      selected
                        ? "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400"
                        : "bg-white text-gray-700 hover:shadow-md"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      selected ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                    }`}>
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {getMedOptionLabel(opt, lang)}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleMultiSelectSubmit(question)}
              className="w-full mt-6 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
            >
              {getNextLabel(lang)}
            </button>

            <button
              onClick={skipMedicalQ}
              className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-500 transition-colors"
            >
              {getSkipLabel(lang)}
            </button>
          </main>

          <footer className="px-4 py-2.5">
            <p className="text-center text-xs text-gray-300">{t("disclaimer.short")}</p>
          </footer>
        </div>
      );
    }

    // Single select or conditional (initial choice)
    return (
      <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
        <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleMedicalBack}
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
          <h2 className="text-xl font-bold text-gray-800 mb-2 leading-snug">
            {getMedQuestionLabel(question, lang)}
          </h2>
          {hint && (
            <p className="text-sm text-gray-400 italic mb-8">{hint}</p>
          )}
          {!hint && <div className="mb-6" />}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              return (
              <button
                key={opt.value}
                onClick={() => selectedIdx === null && handleMedicalSingleAnswer(question, opt, idx)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-base transition-all duration-300 shadow-sm flex items-center justify-between ${
                  isSelected
                    ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700 scale-[1.02] shadow-md"
                    : "bg-white text-gray-700 border-2 border-transparent hover:shadow-md active:scale-[0.98]"
                }`}
              >
                <span>{getMedOptionLabel(opt, lang)}</span>
                {isSelected && <span className="text-emerald-500 text-lg">✓</span>}
              </button>
              );
            })}
          </div>

          <button
            onClick={skipMedicalQ}
            className="w-full mt-6 py-2 text-sm text-gray-400 hover:text-gray-500 transition-colors"
          >
            {getSkipLabel(lang)}
          </button>
        </main>

        <footer className="px-4 py-2.5">
          <p className="text-center text-xs text-gray-300">{t("disclaimer.short")}</p>
        </footer>
      </div>
    );
  }

  // Sub-select step for conditional questions (medication tags / allergy tags)
  if (step === "medSubSelect") {
    const question = MEDICAL_QUESTIONS[medicalQIndex];
    const currentStep = followUpCount + medicalQIndex + 1;
    const progress = (currentStep / totalSteps) * 100;
    const subOptions = question.subOptions || [];

    const subQuestionLabel: Record<string, Record<string, string>> = {
      currentMedications: {
        kr: "복용 중인 약을 모두 선택해주세요",
        en: "Select all medications you are taking",
        vi: "Chọn tất cả thuốc bạn đang dùng",
      },
      allergies: {
        kr: "알레르기가 있는 성분을 모두 선택해주세요",
        en: "Select all substances you are allergic to",
        vi: "Chọn tất cả chất bạn bị dị ứng",
      },
    };

    const l = lang === "vi" ? "vi" : lang === "en" ? "en" : "kr";
    const subTitle = subQuestionLabel[question.id]?.[l] || "";

    return (
      <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
        <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm">
          <button
            onClick={handleMedicalBack}
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
            {subTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {subOptions.map((opt) => {
              const selected = multiSelectTemp.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    setMultiSelectTemp((prev) =>
                      prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
                    )
                  }
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selected
                      ? "bg-emerald-500 text-white shadow-md"
                      : "bg-white text-gray-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  {getMedOptionLabel(opt, lang)}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleMultiSelectSubmit(question)}
            className="w-full mt-8 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
          >
            {getNextLabel(lang)}
          </button>

          <button
            onClick={skipMedicalQ}
            className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-500 transition-colors"
          >
            {getSkipLabel(lang)}
          </button>
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
  const summary = buildMedicalSummary(medicalProfile, lang);
  const warnings = getMedicalWarnings(medicalProfile, lang);

  // Add age-specific warnings
  if (ageWarning === "child") {
    const ll = lang === "vi" ? "vi" : lang.startsWith("en") ? "en" : "kr";
    const childMsg = { kr: "어린이용 약이 추천되었습니다. 반드시 체중 기준 용량을 확인하고 약사와 상담하세요.", en: "Children's medications recommended. Always verify weight-based dosing with a pharmacist.", vi: "Thuốc dành cho trẻ em. Luôn xác nhận liều theo cân nặng với dược sĩ." };
    warnings.unshift(childMsg[ll]);
  } else if (ageWarning === "elderly") {
    const ll = lang === "vi" ? "vi" : lang.startsWith("en") ? "en" : "kr";
    const elderlyMsg = { kr: "고령자는 간/신장 기능 저하 가능성이 있으므로 최소 용량부터 시작하세요.", en: "Elderly patients: start with minimum dosage due to possible reduced liver/kidney function.", vi: "Người cao tuổi: bắt đầu với liều tối thiểu do chức năng gan/thận có thể giảm." };
    warnings.unshift(elderlyMsg[ll]);
  }
  const summaryTitle = lang === "vi" ? "Tóm tắt khảo sát" : lang === "en" ? "Questionnaire Summary" : "문진 요약";

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

        {/* Medical profile summary card */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-2">{summaryTitle}</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              {summary.age} | {summary.gender} | {summary.durationTitle}: {summary.duration}
              {autoDetected.duration && <span className="ml-1 text-emerald-500">(✓ {lang === "ko" ? "자동감지" : "auto"})</span>}
              {" | "}{summary.severityTitle}: {summary.severity}
              {autoDetected.severity && <span className="ml-1 text-emerald-500">(✓ {lang === "ko" ? "자동감지" : "auto"})</span>}
            </p>
            <p>
              {summary.medsTitle}: {summary.medsLabel} | {summary.allergyTitle}: {summary.allergyLabel}
            </p>
            {summary.conditionsLabel && (
              <p>{summary.condTitle}: {summary.conditionsLabel}</p>
            )}
          </div>
          {Object.keys(autoDetected).length > 0 && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-emerald-400">
                {lang === "ko" ? "✓ 입력에서 자동 감지된 항목이 있습니다" : lang === "vi" ? "✓ Một số mục được tự động nhận diện" : "✓ Some fields were auto-detected from your input"}
              </p>
              <button
                onClick={() => {
                  const durationIdx = MEDICAL_QUESTIONS.findIndex(q => q.id === "duration");
                  const severityIdx = MEDICAL_QUESTIONS.findIndex(q => q.id === "severity");
                  const targetIdx = autoDetected.duration ? durationIdx : severityIdx;
                  if (targetIdx >= 0) {
                    // Mark all auto-detected fields as edited so they won't be skipped again
                    const newEdited = new Set(editedFields);
                    if (autoDetected.duration) newEdited.add("duration");
                    if (autoDetected.severity) newEdited.add("severity");
                    setEditedFields(newEdited);
                    setAutoDetected({});
                    setMedicalQIndex(targetIdx);
                    setStep("medicalQ");
                    pushState(`medicalQ-${targetIdx}`);
                    scrollTop();
                  }
                }}
                className="text-[10px] text-emerald-500 underline font-medium"
              >
                {lang === "ko" ? "수정하기" : lang === "vi" ? "Chỉnh sửa" : "Edit"}
              </button>
            </div>
          )}
        </div>

        {/* Medical warnings */}
        {warnings.length > 0 && (
          <div className="bg-red-50 rounded-2xl p-4 mb-4 space-y-2">
            {warnings.map((w, i) => (
              <p key={i} className="text-xs text-red-600 font-medium flex items-start gap-1.5">
                <span className="flex-shrink-0 mt-0.5">&#9888;</span>
                <span>{w}</span>
              </p>
            ))}
          </div>
        )}

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
            <p className="text-xs text-amber-700 leading-relaxed">{t("disclaimer.full", { emergencyNumber: getEmergencyNumber(countryCode) })}</p>
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
