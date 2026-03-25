import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MedicalFormData {
  gender: string;
  ageGroup: string;
  height?: string;
  weight?: string;
  symptoms: string[];
  mainSymptom: string;
  onsetTime: string;
  severity: number;
  worseTime: string[];
  betterTime: string[];
  diseases: string[];
  surgeryHistory: string;
  familyDiseases: string[];
  currentMeds: string[];
  drugAllergies: string[];
  foodAllergies: string;
  pregnant?: string;
  breastfeeding?: string;
  lastPeriod?: string;
  alcohol: string;
  smoking: string;
  memo: string;
  date: string;
  country: string;
  language: string;
}

interface MedicalFormFlowProps {
  lang: string;
  countryCode: string;
  onComplete: (data: MedicalFormData) => void;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Translation helper
// ---------------------------------------------------------------------------

function tl(lang: string, kr: string, en: string, vi: string): string {
  if (lang === "vi") return vi;
  if (lang.startsWith("en")) return en;
  return kr;
}

// ---------------------------------------------------------------------------
// Symptom tags (30)
// ---------------------------------------------------------------------------

const SYMPTOM_TAGS: { value: string; kr: string; en: string; vi: string }[] = [
  { value: "headache", kr: "두통", en: "Headache", vi: "Đau đầu" },
  { value: "fever", kr: "발열", en: "Fever", vi: "Sốt" },
  { value: "cough", kr: "기침", en: "Cough", vi: "Ho" },
  { value: "runny_nose", kr: "콧물/코막힘", en: "Runny/Stuffy nose", vi: "Sổ mũi/Nghẹt mũi" },
  { value: "sore_throat", kr: "인후통", en: "Sore throat", vi: "Đau họng" },
  { value: "stomach_pain", kr: "복통", en: "Stomach pain", vi: "Đau bụng" },
  { value: "diarrhea", kr: "설사", en: "Diarrhea", vi: "Tiêu chảy" },
  { value: "indigestion", kr: "소화불량", en: "Indigestion", vi: "Khó tiêu" },
  { value: "nausea", kr: "구역/구토", en: "Nausea/Vomiting", vi: "Buồn nôn/Nôn" },
  { value: "muscle_pain", kr: "근육통", en: "Muscle pain", vi: "Đau cơ" },
  { value: "back_pain", kr: "요통", en: "Back pain", vi: "Đau lưng" },
  { value: "allergy", kr: "알레르기", en: "Allergy", vi: "Dị ứng" },
  { value: "rash", kr: "피부발진", en: "Skin rash", vi: "Phát ban" },
  { value: "menstrual_pain", kr: "생리통", en: "Menstrual pain", vi: "Đau kinh nguyệt" },
  { value: "toothache", kr: "치통", en: "Toothache", vi: "Đau răng" },
  { value: "eye_fatigue", kr: "눈 피로", en: "Eye fatigue", vi: "Mỏi mắt" },
  { value: "heartburn", kr: "속쓰림", en: "Heartburn", vi: "Ợ nóng" },
  { value: "constipation", kr: "변비", en: "Constipation", vi: "Táo bón" },
  { value: "insomnia", kr: "불면증", en: "Insomnia", vi: "Mất ngủ" },
  { value: "joint_pain", kr: "관절통", en: "Joint pain", vi: "Đau khớp" },
  { value: "dizziness", kr: "어지러움", en: "Dizziness", vi: "Chóng mặt" },
  { value: "tinnitus", kr: "이명", en: "Tinnitus", vi: "Ù tai" },
  { value: "nosebleed", kr: "코피", en: "Nosebleed", vi: "Chảy máu mũi" },
  { value: "stomatitis", kr: "구내염", en: "Mouth ulcer", vi: "Viêm miệng" },
  { value: "burn", kr: "화상", en: "Burn", vi: "Bỏng" },
  { value: "wound", kr: "상처", en: "Wound", vi: "Vết thương" },
  { value: "swelling", kr: "부종", en: "Swelling", vi: "Phù nề" },
  { value: "acne", kr: "여드름", en: "Acne", vi: "Mụn trứng cá" },
  { value: "athletes_foot", kr: "무좀", en: "Athlete's foot", vi: "Nấm chân" },
  { value: "stye", kr: "다래끼", en: "Stye", vi: "Lẹo mắt" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MedicalFormFlow({
  lang,
  countryCode,
  onComplete,
  onBack,
}: MedicalFormFlowProps) {
  const [formData, setFormData] = useState<MedicalFormData>({
    gender: "",
    ageGroup: "",
    height: undefined,
    weight: undefined,
    symptoms: [],
    mainSymptom: "",
    onsetTime: "",
    severity: 5,
    worseTime: [],
    betterTime: [],
    diseases: [],
    surgeryHistory: "",
    familyDiseases: [],
    currentMeds: [],
    drugAllergies: [],
    foodAllergies: "",
    pregnant: undefined,
    breastfeeding: undefined,
    lastPeriod: undefined,
    alcohol: "",
    smoking: "",
    memo: "",
    date: new Date().toISOString().slice(0, 10),
    country: countryCode,
    language: lang,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [tempText, setTempText] = useState("");
  const [tempNumber, setTempNumber] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const isFemale = formData.gender === "female";

  const allSteps = [
    "gender",
    "ageGroup",
    "height",
    "weight",
    "symptoms",
    "mainSymptom",
    "onsetTime",
    "severity",
    "worseTime",
    "betterTime",
    "diseases",
    "surgery",
    "family",
    "meds",
    "drugAllergy",
    "foodAllergy",
    ...(isFemale ? ["pregnant", "breastfeeding", "lastPeriod"] : []),
    "alcohol",
    "smoking",
    "memo",
  ];

  const totalSteps = allSteps.length;
  const stepKey = allSteps[Math.min(currentStep, totalSteps - 1)];

  // scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, subStep]);

  // browser back support
  useEffect(() => {
    const stateObj = { step: currentStep, sub: subStep };
    window.history.pushState(stateObj, "");

    const handlePop = () => {
      if (currentStep === 0 && subStep === 0) {
        onBack();
      } else if (subStep > 0) {
        setSubStep(0);
      } else {
        setCurrentStep((s) => Math.max(0, s - 1));
        setSubStep(0);
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [currentStep, subStep, onBack]);

  // --- helpers ---

  const completeForm = useCallback(() => {
    onComplete({
      ...formData,
      date: new Date().toISOString().slice(0, 10),
      country: countryCode,
      language: lang,
    });
  }, [formData, onComplete, countryCode, lang]);

  const advanceStep = useCallback(() => {
    setSubStep(0);
    setTempText("");
    setTempNumber("");
    if (currentStep >= totalSteps - 1) {
      completeForm();
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, totalSteps, completeForm]);

  // advanceStep that also commits temp values
  const goNext = useCallback(() => {
    setFormData((prev) => {
      const next = { ...prev };
      if (stepKey === "height" && tempNumber) next.height = tempNumber;
      if (stepKey === "weight" && tempNumber) next.weight = tempNumber;
      if (stepKey === "lastPeriod" && tempText) next.lastPeriod = tempText;
      if (stepKey === "diseases" && tempText && prev.diseases.includes("other")) {
        next.diseases = [...prev.diseases.filter((d) => d !== "other"), `other:${tempText}`];
      }
      if (stepKey === "family" && tempText && prev.familyDiseases.includes("other")) {
        next.familyDiseases = [...prev.familyDiseases.filter((d) => d !== "other"), `other:${tempText}`];
      }
      if (stepKey === "meds" && tempText && prev.currentMeds.includes("other")) {
        next.currentMeds = [...prev.currentMeds.filter((d) => d !== "other"), `other:${tempText}`];
      }
      if (stepKey === "drugAllergy" && tempText && prev.drugAllergies.includes("other")) {
        next.drugAllergies = [...prev.drugAllergies.filter((d) => d !== "other"), `other:${tempText}`];
      }
      return next;
    });
    advanceStep();
  }, [stepKey, tempNumber, tempText, advanceStep]);

  const goBack = useCallback(() => {
    if (subStep > 0) {
      setSubStep(0);
      return;
    }
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep((s) => s - 1);
      setSubStep(0);
    }
    setTempText("");
    setTempNumber("");
  }, [currentStep, subStep, onBack]);

  const set = useCallback(
    <K extends keyof MedicalFormData>(key: K, val: MedicalFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: val }));
    },
    []
  );

  const toggleMulti = useCallback(
    (key: keyof MedicalFormData, value: string, noneValues: string[] = ["none"]) => {
      setFormData((prev) => {
        const arr = (prev[key] as string[]) || [];
        if (noneValues.includes(value)) {
          return { ...prev, [key]: [value] };
        }
        const filtered = arr.filter((v) => !noneValues.includes(v));
        if (filtered.includes(value)) {
          return { ...prev, [key]: filtered.filter((v) => v !== value) };
        }
        return { ...prev, [key]: [...filtered, value] };
      });
    },
    []
  );

  const autoAdvance = useCallback(() => {
    setTimeout(() => {
      setSelectedIdx(null);
      setSubStep(0);
      setTempText("");
      setTempNumber("");
      setCurrentStep((s) => s + 1);
    }, 500);
  }, []);

  const severityColor = (val: number): string => {
    if (val <= 3) return "#22c55e";
    if (val <= 6) return "#eab308";
    return "#ef4444";
  };

  // ---------------------------------------------------------------------------
  // Reusable UI blocks
  // ---------------------------------------------------------------------------

  const Header = () => (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <button
        onClick={goBack}
        className="flex items-center gap-1 text-sm text-gray-500 active:text-gray-700"
      >
        <span className="text-lg">&larr;</span>
        <span>{tl(lang, "뒤로", "Back", "Quay lại")}</span>
      </button>
      <span className="text-xs text-gray-400 font-medium">
        {currentStep + 1} / {totalSteps}
      </span>
    </div>
  );

  const ProgressBar = () => {
    const pct = ((currentStep + 1) / totalSteps) * 100;
    return (
      <div className="px-4 pb-4">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #34d399, #14b8a6)",
            }}
          />
        </div>
      </div>
    );
  };

  const Question = ({ text, required, hint }: { text: string; required: boolean; hint?: string }) => (
    <div className="px-5 pb-4">
      <h2 className="text-xl font-bold text-gray-800 leading-snug">
        {text}
        {required && <span className="text-red-400 ml-1">*</span>}
      </h2>
      {hint && <p className="text-xs text-gray-400 italic mt-1">{hint}</p>}
    </div>
  );

  const SingleOptions = ({
    options,
    selected,
    onSelect,
  }: {
    options: { value: string; label: string }[];
    selected: string;
    onSelect: (v: string) => void;
  }) => (
    <div className="px-4 flex flex-col gap-2">
      {options.map((o, idx) => {
        const active = selected === o.value || selectedIdx === idx;
        return (
          <button
            key={o.value}
            onClick={() => {
              if (selectedIdx !== null) return;
              setSelectedIdx(idx);
              onSelect(o.value);
            }}
            className={`w-full text-left px-4 py-3.5 rounded-2xl shadow-sm text-sm font-medium transition-all duration-300 flex items-center justify-between ${
              active
                ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700 scale-[1.02] shadow-md"
                : "bg-white border-2 border-transparent text-gray-700 active:scale-[0.98]"
            }`}
          >
            <span>{o.label}</span>
            {active && <span className="text-emerald-500 text-lg">✓</span>}
          </button>
        );
      })}
    </div>
  );

  const MultiOptions = ({
    options,
    selected,
    onToggle,
    pills,
  }: {
    options: { value: string; label: string }[];
    selected: string[];
    onToggle: (v: string) => void;
    pills?: boolean;
  }) =>
    pills ? (
      <div className="px-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o.value);
          return (
            <button
              key={o.value}
              onClick={() => onToggle(o.value)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-[0.97] ${
                active
                  ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700"
                  : "bg-white border-2 border-transparent text-gray-600"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    ) : (
      <div className="px-4 flex flex-col gap-2">
        {options.map((o) => {
          const active = selected.includes(o.value);
          return (
            <button
              key={o.value}
              onClick={() => onToggle(o.value)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl shadow-sm text-sm font-medium transition-all active:scale-[0.98] ${
                active
                  ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700"
                  : "bg-white border-2 border-transparent text-gray-700"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );

  const NextBtn = ({ disabled, label, onClick }: { disabled: boolean; label?: string; onClick?: () => void }) => (
    <div className="px-4 pt-6 pb-8">
      <button
        disabled={disabled}
        onClick={onClick || goNext}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-emerald-500 text-white active:bg-emerald-600 shadow-md"
        }`}
      >
        {label || tl(lang, "다음", "Next", "Tiếp theo")}
      </button>
    </div>
  );

  const SkipBtn = ({ onClick }: { onClick?: () => void }) => (
    <div className="px-4 pt-2 text-center">
      <button
        onClick={onClick || goNext}
        className="text-xs text-gray-400 underline active:text-gray-500"
      >
        {tl(lang, "건너뛰기", "Skip", "Bỏ qua")}
      </button>
    </div>
  );

  const TextInput = ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="px-4 pt-3">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm outline-none border-2 border-emerald-200 focus:border-emerald-400"
      />
    </div>
  );

  // ---------------------------------------------------------------------------
  // Step renderer
  // ---------------------------------------------------------------------------

  const renderStep = () => {
    switch (stepKey) {
      // Q1 - Gender
      case "gender":
        return (
          <>
            <Question
              text={tl(lang, "성별을 선택해주세요", "Select your gender", "Chọn giới tính")}
              required
            />
            <SingleOptions
              options={[
                { value: "male", label: tl(lang, "남성", "Male", "Nam") },
                { value: "female", label: tl(lang, "여성", "Female", "Nữ") },
              ]}
              selected={formData.gender}
              onSelect={(v) => {
                set("gender", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q2 - Age group
      case "ageGroup":
        return (
          <>
            <Question
              text={tl(lang, "연령대를 선택해주세요", "Select your age group", "Chọn nhóm tuổi")}
              required
              hint={tl(lang, "정확한 문진을 위해 필요합니다", "Required for accurate assessment", "Cần thiết để đánh giá chính xác")}
            />
            <SingleOptions
              options={[
                { value: "infant", label: tl(lang, "영유아 (0~5세)", "Infant (0-5)", "Trẻ sơ sinh (0-5)") },
                { value: "child", label: tl(lang, "어린이 (6~12세)", "Child (6-12)", "Trẻ em (6-12)") },
                { value: "teen", label: tl(lang, "청소년 (13~17세)", "Teenager (13-17)", "Thanh thiếu niên (13-17)") },
                { value: "adult", label: tl(lang, "성인 (18~64세)", "Adult (18-64)", "Người lớn (18-64)") },
                { value: "senior", label: tl(lang, "고령자 (65세 이상)", "Senior (65+)", "Người cao tuổi (65+)") },
              ]}
              selected={formData.ageGroup}
              onSelect={(v) => {
                set("ageGroup", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q3 - Height
      case "height":
        return (
          <>
            <Question
              text={tl(lang, "키를 입력해주세요", "Enter your height", "Nhập chiều cao")}
              required={false}
              hint={tl(lang, "선택 사항입니다", "Optional", "Tùy chọn")}
            />
            <div className="px-4">
              <div className="flex items-center gap-2 bg-white rounded-2xl shadow-sm px-4 py-3">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="170"
                  value={tempNumber}
                  onChange={(e) => setTempNumber(e.target.value)}
                  className="flex-1 outline-none text-lg font-medium text-gray-800 bg-transparent"
                />
                <span className="text-sm text-gray-400 font-medium">cm</span>
              </div>
            </div>
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q4 - Weight
      case "weight":
        return (
          <>
            <Question
              text={tl(lang, "체중을 입력해주세요", "Enter your weight", "Nhập cân nặng")}
              required={false}
              hint={tl(lang, "선택 사항입니다", "Optional", "Tùy chọn")}
            />
            <div className="px-4">
              <div className="flex items-center gap-2 bg-white rounded-2xl shadow-sm px-4 py-3">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="65"
                  value={tempNumber}
                  onChange={(e) => setTempNumber(e.target.value)}
                  className="flex-1 outline-none text-lg font-medium text-gray-800 bg-transparent"
                />
                <span className="text-sm text-gray-400 font-medium">kg</span>
              </div>
            </div>
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q5 - Symptoms (multi-select pills)
      case "symptoms":
        return (
          <>
            <Question
              text={tl(lang, "현재 증상을 모두 선택해주세요", "Select all your current symptoms", "Chọn tất cả triệu chứng hiện tại")}
              required
              hint={tl(lang, "여러 개 선택 가능합니다", "You can select multiple", "Có thể chọn nhiều")}
            />
            <MultiOptions
              options={SYMPTOM_TAGS.map((s) => ({
                value: s.value,
                label: tl(lang, s.kr, s.en, s.vi),
              }))}
              selected={formData.symptoms}
              onToggle={(v) => toggleMulti("symptoms", v, [])}
              pills
            />
            <NextBtn disabled={formData.symptoms.length === 0} />
          </>
        );

      // Q6 - Main symptom
      case "mainSymptom":
        return (
          <>
            <Question
              text={tl(lang, "가장 불편한 증상 1개를 선택해주세요", "Select the most bothersome symptom", "Chọn triệu chứng khó chịu nhất")}
              required
            />
            <SingleOptions
              options={formData.symptoms.map((sv) => {
                const tag = SYMPTOM_TAGS.find((t) => t.value === sv);
                return {
                  value: sv,
                  label: tag ? tl(lang, tag.kr, tag.en, tag.vi) : sv,
                };
              })}
              selected={formData.mainSymptom}
              onSelect={(v) => {
                set("mainSymptom", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q7 - Onset time
      case "onsetTime":
        return (
          <>
            <Question
              text={tl(lang, "증상이 시작된 시기는?", "When did the symptoms start?", "Triệu chứng bắt đầu khi nào?")}
              required
            />
            <SingleOptions
              options={[
                { value: "today", label: tl(lang, "오늘", "Today", "Hôm nay") },
                { value: "yesterday", label: tl(lang, "어제", "Yesterday", "Hôm qua") },
                { value: "2-3days", label: tl(lang, "2~3일 전", "2-3 days ago", "2-3 ngày trước") },
                { value: "1week", label: tl(lang, "일주일 전", "A week ago", "1 tuần trước") },
                { value: "2weeks+", label: tl(lang, "2주 이상", "Over 2 weeks", "Hơn 2 tuần") },
                { value: "1month+", label: tl(lang, "한 달 이상", "Over a month", "Hơn 1 tháng") },
              ]}
              selected={formData.onsetTime}
              onSelect={(v) => {
                set("onsetTime", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q8 - Severity slider
      case "severity":
        return (
          <>
            <Question
              text={tl(lang, "증상의 심각도를 선택해주세요", "Rate the severity of your symptoms", "Đánh giá mức độ nghiêm trọng")}
              required
              hint={tl(lang, "1(가벼움) ~ 10(매우 심함)", "1 (mild) ~ 10 (very severe)", "1 (nhẹ) ~ 10 (rất nặng)")}
            />
            <div className="px-6 pt-4">
              <div className="text-center mb-4">
                <span className="text-5xl font-bold" style={{ color: severityColor(formData.severity) }}>
                  {formData.severity}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={formData.severity}
                onChange={(e) => set("severity", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)",
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{tl(lang, "가벼움", "Mild", "Nhẹ")}</span>
                <span>{tl(lang, "매우 심함", "Very severe", "Rất nặng")}</span>
              </div>
            </div>
            <NextBtn disabled={false} />
          </>
        );

      // Q9 - Worse time
      case "worseTime":
        return (
          <>
            <Question
              text={tl(lang, "증상이 더 심해지는 시간이 있나요?", "When do symptoms get worse?", "Khi nào triệu chứng nặng hơn?")}
              required={false}
            />
            <MultiOptions
              options={[
                { value: "morning", label: tl(lang, "아침", "Morning", "Sáng") },
                { value: "daytime", label: tl(lang, "낮", "Daytime", "Ban ngày") },
                { value: "evening", label: tl(lang, "저녁", "Evening", "Chiều tối") },
                { value: "night", label: tl(lang, "밤", "Night", "Ban đêm") },
                { value: "after_meal", label: tl(lang, "식후", "After meals", "Sau khi ăn") },
                { value: "exercise", label: tl(lang, "운동 시", "During exercise", "Khi tập thể dục") },
                { value: "none", label: tl(lang, "특별히 없음", "No particular time", "Không có thời điểm cụ thể") },
              ]}
              selected={formData.worseTime}
              onToggle={(v) => toggleMulti("worseTime", v, ["none"])}
            />
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q10 - Better time
      case "betterTime":
        return (
          <>
            <Question
              text={tl(lang, "증상이 나아지는 때가 있나요?", "When do symptoms get better?", "Khi nào triệu chứng đỡ hơn?")}
              required={false}
            />
            <MultiOptions
              options={[
                { value: "rest", label: tl(lang, "쉴 때", "When resting", "Khi nghỉ ngơi") },
                { value: "after_med", label: tl(lang, "약 먹으면", "After taking medicine", "Sau khi uống thuốc") },
                { value: "after_meal", label: tl(lang, "식후", "After meals", "Sau khi ăn") },
                { value: "none", label: tl(lang, "특별히 없음", "No particular time", "Không có thời điểm cụ thể") },
              ]}
              selected={formData.betterTime}
              onToggle={(v) => toggleMulti("betterTime", v, ["none"])}
            />
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q11 - Current diseases
      case "diseases":
        return (
          <>
            <Question
              text={tl(lang, "현재 앓고 있는 질환이 있나요?", "Do you have any current medical conditions?", "Bạn có bệnh lý nào hiện tại không?")}
              required={false}
              hint={tl(lang, "여러 개 선택 가능합니다", "You can select multiple", "Có thể chọn nhiều")}
            />
            <MultiOptions
              options={[
                { value: "none", label: tl(lang, "없음", "None", "Không có") },
                { value: "hypertension", label: tl(lang, "고혈압", "Hypertension", "Cao huyết áp") },
                { value: "diabetes", label: tl(lang, "당뇨", "Diabetes", "Tiểu đường") },
                { value: "heart", label: tl(lang, "심장질환", "Heart disease", "Bệnh tim") },
                { value: "liver", label: tl(lang, "간질환", "Liver disease", "Bệnh gan") },
                { value: "kidney", label: tl(lang, "신장질환", "Kidney disease", "Bệnh thận") },
                { value: "asthma", label: tl(lang, "천식", "Asthma", "Hen suyễn") },
                { value: "thyroid", label: tl(lang, "갑상선질환", "Thyroid disease", "Bệnh tuyến giáp") },
                { value: "gastro", label: tl(lang, "위장질환", "Gastrointestinal disease", "Bệnh tiêu hóa") },
                { value: "mental", label: tl(lang, "정신건강질환", "Mental health condition", "Bệnh sức khỏe tâm thần") },
                { value: "cancer", label: tl(lang, "암", "Cancer", "Ung thư") },
                { value: "other", label: tl(lang, "기타", "Other", "Khác") },
              ]}
              selected={formData.diseases}
              onToggle={(v) => {
                toggleMulti("diseases", v, ["none"]);
                if (v === "other" && !formData.diseases.includes("other")) setSubStep(1);
              }}
            />
            {subStep === 1 && (
              <TextInput
                placeholder={tl(lang, "질환명을 입력해주세요", "Enter condition name", "Nhập tên bệnh")}
                value={tempText}
                onChange={setTempText}
              />
            )}
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q12 - Surgery history
      case "surgery":
        return (
          <>
            <Question
              text={tl(lang, "수술 이력이 있나요?", "Do you have any surgical history?", "Bạn có tiền sử phẫu thuật không?")}
              required={false}
            />
            {subStep === 0 ? (
              <SingleOptions
                options={[
                  { value: "none", label: tl(lang, "없음", "None", "Không có") },
                  { value: "yes", label: tl(lang, "있음", "Yes", "Có") },
                ]}
                selected={formData.surgeryHistory === "none" ? "none" : formData.surgeryHistory ? "yes" : ""}
                onSelect={(v) => {
                  if (v === "none") {
                    set("surgeryHistory", "none");
                    autoAdvance();
                  } else {
                    setSubStep(1);
                  }
                }}
              />
            ) : (
              <div className="px-4">
                <input
                  type="text"
                  placeholder={tl(lang, "수술 내용을 입력해주세요", "Describe surgery", "Mô tả phẫu thuật")}
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm outline-none border-2 border-emerald-200 focus:border-emerald-400"
                />
                <NextBtn
                  disabled={!tempText.trim()}
                  onClick={() => {
                    set("surgeryHistory", tempText.trim());
                    advanceStep();
                  }}
                />
              </div>
            )}
            <SkipBtn />
          </>
        );

      // Q13 - Family diseases
      case "family":
        return (
          <>
            <Question
              text={tl(lang, "가족력이 있는 질환이 있나요?", "Any family medical history?", "Gia đình có tiền sử bệnh lý không?")}
              required={false}
              hint={tl(lang, "여러 개 선택 가능합니다", "You can select multiple", "Có thể chọn nhiều")}
            />
            <MultiOptions
              options={[
                { value: "none", label: tl(lang, "없음", "None", "Không có") },
                { value: "hypertension", label: tl(lang, "고혈압", "Hypertension", "Cao huyết áp") },
                { value: "diabetes", label: tl(lang, "당뇨", "Diabetes", "Tiểu đường") },
                { value: "heart", label: tl(lang, "심장질환", "Heart disease", "Bệnh tim") },
                { value: "cancer", label: tl(lang, "암", "Cancer", "Ung thư") },
                { value: "other", label: tl(lang, "기타", "Other", "Khác") },
              ]}
              selected={formData.familyDiseases}
              onToggle={(v) => {
                toggleMulti("familyDiseases", v, ["none"]);
                if (v === "other" && !formData.familyDiseases.includes("other")) setSubStep(1);
              }}
            />
            {subStep === 1 && (
              <TextInput
                placeholder={tl(lang, "질환명을 입력해주세요", "Enter condition name", "Nhập tên bệnh")}
                value={tempText}
                onChange={setTempText}
              />
            )}
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q14 - Current medications
      case "meds":
        return (
          <>
            <Question
              text={tl(lang, "현재 복용 중인 약이 있나요?", "Are you currently taking any medications?", "Bạn đang dùng thuốc nào không?")}
              required={false}
              hint={tl(lang, "약물 상호작용 확인을 위해 필요합니다", "Needed to check for drug interactions", "Cần thiết để kiểm tra tương tác thuốc")}
            />
            {subStep === 0 ? (
              <SingleOptions
                options={[
                  { value: "none", label: tl(lang, "없음", "None", "Không có") },
                  { value: "yes", label: tl(lang, "있음", "Yes", "Có") },
                ]}
                selected=""
                onSelect={(v) => {
                  if (v === "none") {
                    set("currentMeds", []);
                    autoAdvance();
                  } else {
                    setSubStep(1);
                  }
                }}
              />
            ) : (
              <>
                <MultiOptions
                  options={[
                    { value: "bp_med", label: tl(lang, "혈압약", "Blood pressure meds", "Thuốc huyết áp") },
                    { value: "diabetes_med", label: tl(lang, "당뇨약", "Diabetes meds", "Thuốc tiểu đường") },
                    { value: "blood_thinner", label: tl(lang, "혈액희석제", "Blood thinners", "Thuốc chống đông máu") },
                    { value: "painkiller", label: tl(lang, "진통제", "Pain relievers", "Thuốc giảm đau") },
                    { value: "antibiotic", label: tl(lang, "항생제", "Antibiotics", "Thuốc kháng sinh") },
                    { value: "stomach_med", label: tl(lang, "위장약", "Stomach meds", "Thuốc dạ dày") },
                    { value: "contraceptive", label: tl(lang, "피임약", "Contraceptive", "Thuốc tránh thai") },
                    { value: "mental_med", label: tl(lang, "정신건강약", "Mental health meds", "Thuốc sức khỏe tâm thần") },
                    { value: "herbal", label: tl(lang, "한약", "Herbal medicine", "Thuốc đông y") },
                    { value: "supplement", label: tl(lang, "건강보조제", "Supplements", "Thực phẩm chức năng") },
                    { value: "other", label: tl(lang, "기타", "Other", "Khác") },
                  ]}
                  selected={formData.currentMeds}
                  onToggle={(v) => {
                    toggleMulti("currentMeds", v, []);
                    if (v === "other" && !formData.currentMeds.includes("other")) setTempText("");
                  }}
                />
                {formData.currentMeds.includes("other") && (
                  <TextInput
                    placeholder={tl(lang, "약 이름을 입력해주세요", "Enter medication name", "Nhập tên thuốc")}
                    value={tempText}
                    onChange={setTempText}
                  />
                )}
                <NextBtn disabled={formData.currentMeds.length === 0} />
              </>
            )}
          </>
        );

      // Q15 - Drug allergies
      case "drugAllergy":
        return (
          <>
            <Question
              text={tl(lang, "약물 알레르기가 있나요?", "Do you have any drug allergies?", "Bạn có dị ứng thuốc nào không?")}
              required={false}
              hint={tl(lang, "안전한 약 추천을 위해 알려주세요", "Please let us know for safe recommendations", "Vui lòng cho biết để đề xuất an toàn")}
            />
            {subStep === 0 ? (
              <SingleOptions
                options={[
                  { value: "none", label: tl(lang, "없음", "None", "Không có") },
                  { value: "unknown", label: tl(lang, "모름", "Unknown", "Không biết") },
                  { value: "yes", label: tl(lang, "있음", "Yes", "Có") },
                ]}
                selected=""
                onSelect={(v) => {
                  if (v === "none" || v === "unknown") {
                    set("drugAllergies", [v]);
                    autoAdvance();
                  } else {
                    setSubStep(1);
                  }
                }}
              />
            ) : (
              <>
                <MultiOptions
                  options={[
                    { value: "aspirin", label: tl(lang, "아스피린", "Aspirin", "Aspirin") },
                    { value: "ibuprofen", label: tl(lang, "이부프로펜", "Ibuprofen", "Ibuprofen") },
                    { value: "penicillin", label: tl(lang, "페니실린", "Penicillin", "Penicillin") },
                    { value: "sulfa", label: tl(lang, "설파제", "Sulfa drugs", "Thuốc Sulfa") },
                    { value: "other", label: tl(lang, "기타", "Other", "Khác") },
                  ]}
                  selected={formData.drugAllergies}
                  onToggle={(v) => {
                    toggleMulti("drugAllergies", v, []);
                    if (v === "other" && !formData.drugAllergies.includes("other")) setTempText("");
                  }}
                />
                {formData.drugAllergies.includes("other") && (
                  <TextInput
                    placeholder={tl(lang, "알레르기 약물 입력", "Enter allergic drug", "Nhập thuốc dị ứng")}
                    value={tempText}
                    onChange={setTempText}
                  />
                )}
                <NextBtn disabled={formData.drugAllergies.length === 0} />
              </>
            )}
          </>
        );

      // Q16 - Food allergies
      case "foodAllergy":
        return (
          <>
            <Question
              text={tl(lang, "음식 알레르기가 있나요?", "Do you have any food allergies?", "Bạn có dị ứng thực phẩm không?")}
              required={false}
            />
            {subStep === 0 ? (
              <SingleOptions
                options={[
                  { value: "none", label: tl(lang, "없음", "None", "Không có") },
                  { value: "yes", label: tl(lang, "있음", "Yes", "Có") },
                ]}
                selected=""
                onSelect={(v) => {
                  if (v === "none") {
                    set("foodAllergies", "none");
                    autoAdvance();
                  } else {
                    setSubStep(1);
                  }
                }}
              />
            ) : (
              <div className="px-4">
                <input
                  type="text"
                  placeholder={tl(lang, "알레르기 음식을 입력해주세요", "Enter food allergies", "Nhập thực phẩm dị ứng")}
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm outline-none border-2 border-emerald-200 focus:border-emerald-400"
                />
                <NextBtn
                  disabled={!tempText.trim()}
                  onClick={() => {
                    set("foodAllergies", tempText.trim());
                    advanceStep();
                  }}
                />
              </div>
            )}
          </>
        );

      // Q17 - Pregnant (female only)
      case "pregnant":
        return (
          <>
            <Question
              text={tl(lang, "현재 임신 상태인가요?", "Are you currently pregnant?", "Bạn hiện có đang mang thai không?")}
              required={false}
            />
            <SingleOptions
              options={[
                { value: "no", label: tl(lang, "아니오", "No", "Không") },
                { value: "yes", label: tl(lang, "임신 중", "Pregnant", "Đang mang thai") },
                { value: "maybe", label: tl(lang, "가능성 있음", "Possibly", "Có thể") },
              ]}
              selected={formData.pregnant || ""}
              onSelect={(v) => {
                set("pregnant", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q18 - Breastfeeding (female only)
      case "breastfeeding":
        return (
          <>
            <Question
              text={tl(lang, "현재 수유 중인가요?", "Are you currently breastfeeding?", "Bạn hiện đang cho con bú không?")}
              required={false}
            />
            <SingleOptions
              options={[
                { value: "no", label: tl(lang, "아니오", "No", "Không") },
                { value: "yes", label: tl(lang, "예", "Yes", "Có") },
              ]}
              selected={formData.breastfeeding || ""}
              onSelect={(v) => {
                set("breastfeeding", v);
                autoAdvance();
              }}
            />
          </>
        );

      // Q19 - Last period (female only)
      case "lastPeriod":
        return (
          <>
            <Question
              text={tl(lang, "마지막 생리일은 언제인가요?", "When was your last period?", "Kỳ kinh cuối cùng của bạn là khi nào?")}
              required={false}
              hint={tl(lang, "선택 사항입니다", "Optional", "Tùy chọn")}
            />
            <div className="px-4">
              <input
                type="date"
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm outline-none border-2 border-emerald-200 focus:border-emerald-400"
              />
              <div className="pt-3">
                <button
                  onClick={() => {
                    set("lastPeriod", tl(lang, "기억나지 않음", "Don't remember", "Không nhớ"));
                    advanceStep();
                  }}
                  className="w-full text-left px-4 py-3.5 rounded-2xl shadow-sm text-sm font-medium bg-white text-gray-600 active:scale-[0.98]"
                >
                  {tl(lang, "기억나지 않음", "Don't remember", "Không nhớ")}
                </button>
              </div>
            </div>
            <NextBtn disabled={false} />
            <SkipBtn />
          </>
        );

      // Q20 - Alcohol
      case "alcohol":
        return (
          <>
            <Question
              text={tl(lang, "음주 습관은 어떤가요?", "What are your drinking habits?", "Thói quen uống rượu của bạn?")}
              required={false}
            />
            <SingleOptions
              options={[
                { value: "none", label: tl(lang, "안 함", "None", "Không uống") },
                { value: "sometimes", label: tl(lang, "가끔 (주 1~2회)", "Sometimes (1-2/week)", "Thỉnh thoảng (1-2 lần/tuần)") },
                { value: "often", label: tl(lang, "자주 (주 3회 이상)", "Often (3+/week)", "Thường xuyên (3+ lần/tuần)") },
              ]}
              selected={formData.alcohol}
              onSelect={(v) => {
                set("alcohol", v);
                autoAdvance();
              }}
            />
            <SkipBtn />
          </>
        );

      // Q21 - Smoking
      case "smoking":
        return (
          <>
            <Question
              text={tl(lang, "흡연 여부를 선택해주세요", "Select your smoking status", "Chọn tình trạng hút thuốc")}
              required={false}
            />
            <SingleOptions
              options={[
                { value: "none", label: tl(lang, "안 함", "None", "Không hút") },
                { value: "current", label: tl(lang, "현재 흡연", "Currently smoking", "Đang hút thuốc") },
                { value: "quit", label: tl(lang, "과거 흡연 (금연 중)", "Former smoker (quit)", "Đã từng hút (đang bỏ)") },
              ]}
              selected={formData.smoking}
              onSelect={(v) => {
                set("smoking", v);
                autoAdvance();
              }}
            />
            <SkipBtn />
          </>
        );

      // Q22 - Memo
      case "memo":
        return (
          <>
            <Question
              text={tl(lang, "의사에게 전달하고 싶은 내용이 있나요?", "Anything else you'd like to tell your doctor?", "Bạn có muốn nói gì thêm với bác sĩ không?")}
              required={false}
              hint={tl(lang, "자유롭게 작성해주세요", "Feel free to write anything", "Hãy viết bất cứ điều gì")}
            />
            <div className="px-4">
              <textarea
                rows={4}
                placeholder={tl(
                  lang,
                  "예: 특정 음식을 먹으면 증상이 심해져요",
                  "e.g., Symptoms worsen after certain foods",
                  "VD: Triệu chứng nặng hơn sau khi ăn một số thực phẩm"
                )}
                value={formData.memo}
                onChange={(e) => set("memo", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm outline-none border-2 border-emerald-200 focus:border-emerald-400 resize-none"
              />
            </div>
            <div className="px-4 pt-6 pb-8">
              <button
                onClick={completeForm}
                className="w-full py-3.5 rounded-2xl text-sm font-bold bg-emerald-500 text-white active:bg-emerald-600 shadow-md transition-all"
              >
                {tl(lang, "문진표 완성", "Complete Form", "Hoàn thành phiếu")}
              </button>
            </div>
            <SkipBtn onClick={completeForm} />
          </>
        );

      default:
        return null;
    }
  };

  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[480px] mx-auto pb-12">
        <Header />
        <ProgressBar />
        {renderStep()}
      </div>
    </div>
  );
}
