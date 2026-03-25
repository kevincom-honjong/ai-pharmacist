import { useRef, useState } from "react";
import type { MedicalFormData } from "./MedicalFormFlow";

interface Props {
  data: MedicalFormData;
  lang: string;
  onBack: () => void;
  onReset: () => void;
}

function tl(lang: string, kr: string, en: string, vi: string) {
  if (lang === "vi") return vi;
  if (lang.startsWith("en")) return en;
  return kr;
}

const SYMPTOM_MAP: Record<string, { kr: string; en: string; vi: string }> = {
  headache: { kr: "두통", en: "Headache", vi: "Đau đầu" },
  fever: { kr: "발열", en: "Fever", vi: "Sốt" },
  cough: { kr: "기침", en: "Cough", vi: "Ho" },
  runnyNose: { kr: "콧물/코막힘", en: "Runny/stuffy nose", vi: "Sổ mũi/nghẹt mũi" },
  soreThroat: { kr: "인후통", en: "Sore throat", vi: "Đau họng" },
  stomachache: { kr: "복통", en: "Stomachache", vi: "Đau bụng" },
  diarrhea: { kr: "설사", en: "Diarrhea", vi: "Tiêu chảy" },
  indigestion: { kr: "소화불량", en: "Indigestion", vi: "Khó tiêu" },
  nausea: { kr: "구역/구토", en: "Nausea/Vomiting", vi: "Buồn nôn" },
  musclePain: { kr: "근육통", en: "Muscle pain", vi: "Đau cơ" },
  backPain: { kr: "요통", en: "Back pain", vi: "Đau lưng" },
  allergy: { kr: "알레르기", en: "Allergy", vi: "Dị ứng" },
  skinRash: { kr: "피부발진", en: "Skin rash", vi: "Phát ban" },
  menstrualPain: { kr: "생리통", en: "Menstrual pain", vi: "Đau bụng kinh" },
  toothache: { kr: "치통", en: "Toothache", vi: "Đau răng" },
  eyeStrain: { kr: "눈 피로", en: "Eye strain", vi: "Mỏi mắt" },
  heartburn: { kr: "속쓰림", en: "Heartburn", vi: "Ợ nóng" },
  constipation: { kr: "변비", en: "Constipation", vi: "Táo bón" },
  insomnia: { kr: "불면증", en: "Insomnia", vi: "Mất ngủ" },
  jointPain: { kr: "관절통", en: "Joint pain", vi: "Đau khớp" },
  dizziness: { kr: "어지러움", en: "Dizziness", vi: "Chóng mặt" },
  tinnitus: { kr: "이명", en: "Tinnitus", vi: "Ù tai" },
  nosebleed: { kr: "코피", en: "Nosebleed", vi: "Chảy máu mũi" },
  mouthUlcer: { kr: "구내염", en: "Mouth ulcer", vi: "Loét miệng" },
  burn: { kr: "화상", en: "Burn", vi: "Bỏng" },
  wound: { kr: "상처", en: "Wound", vi: "Vết thương" },
  swelling: { kr: "부종", en: "Swelling", vi: "Phù nề" },
  acne: { kr: "여드름", en: "Acne", vi: "Mụn trứng cá" },
  athletesFoot: { kr: "무좀", en: "Athlete's foot", vi: "Nấm chân" },
  stye: { kr: "다래끼", en: "Stye", vi: "Lẹo mắt" },
};

function getSymptomLabel(key: string, lang: string): string {
  const m = SYMPTOM_MAP[key];
  if (!m) return key;
  if (lang === "vi") return m.vi;
  if (lang.startsWith("en")) return m.en;
  return m.kr;
}

const LANG_OPTIONS = [
  { code: "ko", flag: "🇰🇷", name: "한국어" },
  { code: "vi", flag: "🇻🇳", name: "Tiếng Việt" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "th", flag: "🇹🇭", name: "ภาษาไทย" },
  { code: "fil", flag: "🇵🇭", name: "Filipino" },
  { code: "id", flag: "🇮🇩", name: "Bahasa Indonesia" },
  { code: "en-GB", flag: "🇬🇧", name: "English (UK)" },
  { code: "en-AU", flag: "🇦🇺", name: "English (AU)" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "hi", flag: "🇮🇳", name: "हिन्दी" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "es", flag: "🇪🇸", name: "Español" },
];

export default function MedicalFormPreview({ data, lang, onBack, onReset }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([lang]);

  // Render language for the preview (always use current UI lang)
  const renderLang = lang;

  const handleDownloadClick = () => {
    setSelectedLangs([lang]);
    setShowLangModal(true);
  };

  const toggleLang = (code: string) => {
    setSelectedLangs((prev) => {
      if (prev.includes(code)) {
        // Deselect: must keep at least 1
        if (prev.length <= 1) return prev;
        return prev.filter((c) => c !== code);
      } else {
        // Select: max 2
        if (prev.length >= 2) {
          // Replace second with new
          return [prev[0], code];
        }
        return [...prev, code];
      }
    });
  };

  const downloadLang = selectedLangs[0] || lang;
  const downloadLang2 = selectedLangs[1] || "";
  const isDual = selectedLangs.length === 2;

  const executeDownload = async () => {
    if (!printRef.current) return;
    setShowLangModal(false);
    setDownloading(true);

    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        width: 794,
        windowWidth: 794,
      });
      const link = document.createElement("a");
      link.download = `medical-form-${data.date}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tl(lang, "AI Pharmacist 문진표", "AI Pharmacist Medical Form", "Phiếu khám AI Pharmacist"),
          text: tl(lang, "문진표를 공유합니다", "Sharing medical form", "Chia sẻ phiếu khám"),
        });
      } catch {
        // cancelled
      }
    }
  };

  const Row = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex border-b border-gray-100 py-2">
        <span className="w-[140px] text-sm text-gray-500 font-medium shrink-0">{label}</span>
        <span className="text-sm text-gray-800 flex-1">{value}</span>
      </div>
    );
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-teal-600 mb-2 pb-1 border-b-2 border-teal-100">{title}</h3>
      {children}
    </div>
  );

  const severityColor = data.severity <= 3 ? "text-green-600" : data.severity <= 6 ? "text-yellow-600" : "text-red-600";

  // When downloading, use selected language; otherwise use UI lang
  const formLang = downloading ? downloadLang : renderLang;
  const formLang2 = (downloading && isDual) ? downloadLang2 : "";

  // Dual-language row helper
  const DualRow = ({ label1, label2, value }: { label1: string; label2: string; value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex border-b border-gray-100 py-2">
        <div className="w-[140px] shrink-0">
          <span className="text-sm text-gray-500 font-medium">{label1}</span>
          {label2 && <span className="text-xs text-gray-300 block">{label2}</span>}
        </div>
        <span className="text-sm text-gray-800 flex-1">{value}</span>
      </div>
    );
  };

  // Get label in formLang, and optional second label
  const fl = (kr: string, en: string, vi: string) => {
    const primary = tl(formLang, kr, en, vi);
    if (!formLang2) return { l1: primary, l2: "" };
    const secondary = tl(formLang2, kr, en, vi);
    return { l1: primary, l2: secondary !== primary ? secondary : "" };
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 font-medium"
        >
          <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {tl(lang, "뒤로", "Back", "Quay lại")}
        </button>
        <h1 className="text-base font-semibold text-gray-800 flex-1 text-center">
          {tl(lang, "문진표 미리보기", "Form Preview", "Xem trước phiếu")}
        </h1>
        <div className="w-14" />
      </header>

      {/* Printable form */}
      <div ref={printRef} className="bg-white mx-4 mt-3 rounded-2xl shadow-sm overflow-hidden" style={{ fontFamily: "'Pretendard', 'Inter', sans-serif" }}>
        {/* Form header */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg">💊</div>
            <div>
              <h2 className="text-lg font-bold">AI Pharmacist</h2>
              <p className="text-xs opacity-80">
                {tl(formLang, "건강 문진표", "Medical Questionnaire", "Phiếu khám sức khỏe")}
                {formLang2 && ` / ${tl(formLang2, "건강 문진표", "Medical Questionnaire", "Phiếu khám sức khỏe")}`}
              </p>
            </div>
          </div>
          <p className="text-xs opacity-70">{tl(formLang, "작성일", "Date", "Ngày")}: {data.date}</p>
        </div>

        <div className="px-6 py-4">
          {(() => { const h = fl("📋 기본 정보", "📋 Basic Info", "📋 Thông tin cơ bản"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <DualRow label1={fl("성별","Gender","Giới tính").l1} label2={fl("성별","Gender","Giới tính").l2} value={data.gender} />
            <DualRow label1={fl("연령대","Age","Tuổi").l1} label2={fl("연령대","Age","Tuổi").l2} value={data.ageGroup} />
            {data.height && <DualRow label1={fl("키","Height","Chiều cao").l1} label2={fl("키","Height","Chiều cao").l2} value={`${data.height} cm`} />}
            {data.weight && <DualRow label1={fl("몸무게","Weight","Cân nặng").l1} label2={fl("몸무게","Weight","Cân nặng").l2} value={`${data.weight} kg`} />}
          </Section>; })()}

          {(() => { const h = fl("🩺 현재 증상", "🩺 Current Symptoms", "🩺 Triệu chứng hiện tại"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <DualRow label1={fl("증상","Symptoms","Triệu chứng").l1} label2={fl("증상","Symptoms","Triệu chứng").l2}
              value={data.symptoms.map(s => getSymptomLabel(s, formLang)).join(", ")} />
            <DualRow label1={fl("주요 증상","Main","Chính").l1} label2={fl("주요 증상","Main","Chính").l2}
              value={getSymptomLabel(data.mainSymptom, formLang)} />
            <DualRow label1={fl("시작 시점","Onset","Khởi phát").l1} label2={fl("시작 시점","Onset","Khởi phát").l2} value={data.onsetTime} />
            <div className="flex border-b border-gray-100 py-2">
              <div className="w-[140px] shrink-0">
                <span className="text-sm text-gray-500 font-medium">{fl("강도","Severity","Mức độ").l1}</span>
                {fl("강도","Severity","Mức độ").l2 && <span className="text-xs text-gray-300 block">{fl("강도","Severity","Mức độ").l2}</span>}
              </div>
              <span className={`text-sm font-bold ${severityColor}`}>{data.severity} / 10</span>
            </div>
            {data.worseTime.length > 0 && <DualRow label1={fl("악화 시점","Worse when","Nặng hơn khi").l1} label2={fl("악화 시점","Worse when","Nặng hơn khi").l2} value={data.worseTime.join(", ")} />}
            {data.betterTime.length > 0 && <DualRow label1={fl("호전 시점","Better when","Tốt hơn khi").l1} label2={fl("호전 시점","Better when","Tốt hơn khi").l2} value={data.betterTime.join(", ")} />}
          </Section>; })()}

          {(() => { const h = fl("📁 병력", "📁 Medical History", "📁 Tiền sử bệnh"); const none = tl(formLang, "없음", "None", "Không"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <DualRow label1={fl("진단 질환","Diseases","Bệnh").l1} label2={fl("진단 질환","Diseases","Bệnh").l2} value={data.diseases.join(", ") || none} />
            <DualRow label1={fl("수술 경험","Surgery","Phẫu thuật").l1} label2={fl("수술 경험","Surgery","Phẫu thuật").l2} value={data.surgeryHistory || none} />
            <DualRow label1={fl("가족력","Family","Gia đình").l1} label2={fl("가족력","Family","Gia đình").l2} value={data.familyDiseases.join(", ") || none} />
          </Section>; })()}

          {(() => { const h = fl("💊 복용 약물", "💊 Medications", "💊 Thuốc đang dùng"); const none = tl(formLang, "없음", "None", "Không"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <DualRow label1={fl("복용 약","Current","Đang dùng").l1} label2={fl("복용 약","Current","Đang dùng").l2} value={data.currentMeds.join(", ") || none} />
            <DualRow label1={fl("약 알레르기","Drug allergy","Dị ứng thuốc").l1} label2={fl("약 알레르기","Drug allergy","Dị ứng thuốc").l2} value={data.drugAllergies.join(", ") || none} />
            <DualRow label1={fl("음식 알레르기","Food allergy","Dị ứng thực phẩm").l1} label2={fl("음식 알레르기","Food allergy","Dị ứng thực phẩm").l2} value={data.foodAllergies || none} />
          </Section>; })()}

          {data.gender === "female" && (() => { const h = fl("👩 여성 건강", "👩 Women's Health", "👩 Sức khỏe phụ nữ"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            {data.pregnant && <DualRow label1={fl("임신","Pregnancy","Mang thai").l1} label2={fl("임신","Pregnancy","Mang thai").l2} value={data.pregnant} />}
            {data.breastfeeding && <DualRow label1={fl("수유","Breastfeeding","Cho con bú").l1} label2={fl("수유","Breastfeeding","Cho con bú").l2} value={data.breastfeeding} />}
            {data.lastPeriod && <DualRow label1={fl("마지막 생리","Last period","Kỳ kinh cuối").l1} label2={fl("마지막 생리","Last period","Kỳ kinh cuối").l2} value={data.lastPeriod} />}
          </Section>; })()}

          {(() => { const h = fl("🏃 생활 습관", "🏃 Lifestyle", "🏃 Lối sống"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <DualRow label1={fl("음주","Alcohol","Rượu bia").l1} label2={fl("음주","Alcohol","Rượu bia").l2} value={data.alcohol} />
            <DualRow label1={fl("흡연","Smoking","Hút thuốc").l1} label2={fl("흡연","Smoking","Hút thuốc").l2} value={data.smoking} />
          </Section>; })()}

          {data.memo && (() => { const h = fl("📝 추가 메모", "📝 Notes", "📝 Ghi chú"); return <Section title={h.l2 ? `${h.l1} / ${h.l2}` : h.l1}>
            <p className="text-sm text-gray-700 leading-relaxed">{data.memo}</p>
          </Section>; })()}

          <div className="text-center pt-2 pb-1 border-t border-gray-100">
            <p className="text-[10px] text-gray-300">
              Generated by AI Pharmacist · {tl(formLang, "참고용 문진표", "For reference only", "Chỉ để tham khảo")}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-5 space-y-3">
        <button
          onClick={handleDownloadClick}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
        >
          {downloading ? (
            <span>{tl(lang, "다운로드 중...", "Downloading...", "Đang tải...")}</span>
          ) : (
            <>
              <span>📋</span>
              <span>{tl(lang, "문진표 다운로드 (PNG)", "Download Form (PNG)", "Tải phiếu (PNG)")}</span>
            </>
          )}
        </button>

        {navigator.share && (
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold bg-white text-gray-700 hover:shadow-md active:scale-[0.98] transition-all shadow-sm border border-gray-100"
          >
            <span>📤</span>
            <span>{tl(lang, "공유하기", "Share", "Chia sẻ")}</span>
          </button>
        )}

        <button
          onClick={onReset}
          className="w-full py-3 rounded-2xl text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          {tl(lang, "처음으로", "Start over", "Làm lại")}
        </button>
      </div>

      {/* Language selection modal */}
      {showLangModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setShowLangModal(false)}>
          <div
            className="bg-white w-full max-w-[480px] rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-800 mb-1 text-center">
              {tl(lang, "문진표를 어떤 언어로 저장할까요?", "Which language for the form?", "Lưu phiếu bằng ngôn ngữ nào?")}
            </h3>
            <p className="text-xs text-gray-400 text-center mb-4">
              {tl(lang, "1~2개 선택 가능 (이중 언어)", "Select 1-2 languages (bilingual)", "Chọn 1-2 ngôn ngữ (song ngữ)")}
            </p>

            {/* Selected indicator */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {selectedLangs.map((code, i) => {
                const lo = LANG_OPTIONS.find(l => l.code === code);
                return lo ? (
                  <span key={code} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-xs font-semibold text-emerald-700">
                    {lo.flag} {lo.name}
                    {selectedLangs.length > 1 && (
                      <button onClick={() => toggleLang(code)} className="ml-0.5 text-emerald-400 hover:text-emerald-600">×</button>
                    )}
                  </span>
                ) : null;
              })}
              {selectedLangs.length === 1 && (
                <span className="text-xs text-gray-300">+ {tl(lang, "2번째 선택 가능", "select 2nd", "chọn thêm")}</span>
              )}
            </div>

            {/* Single language list - tap to select/deselect (max 2) */}
            <div className="space-y-1.5 mb-4">
              {LANG_OPTIONS.map((lo) => {
                const isSelected = selectedLangs.includes(lo.code);
                const order = selectedLangs.indexOf(lo.code);
                return (
                  <button
                    key={lo.code}
                    onClick={() => toggleLang(lo.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      isSelected
                        ? "bg-emerald-50 border-2 border-emerald-400 text-emerald-700 font-semibold"
                        : "bg-gray-50 border-2 border-transparent text-gray-600"
                    }`}
                  >
                    {isSelected ? (
                      <span className="w-5 h-5 flex items-center justify-center bg-emerald-400 text-white rounded-md text-xs font-bold">{order + 1}</span>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center border-2 border-gray-200 rounded-md" />
                    )}
                    <span className="text-lg">{lo.flag}</span>
                    <span>{lo.name}</span>
                    {isSelected && <span className="ml-auto text-emerald-500">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Download button */}
            <button
              onClick={executeDownload}
              className="w-full py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
            >
              {selectedLangs.length === 2
                ? `📋 ${LANG_OPTIONS.find(l => l.code === selectedLangs[0])?.name || ""} + ${LANG_OPTIONS.find(l => l.code === selectedLangs[1])?.name || ""}`
                : `📋 ${LANG_OPTIONS.find(l => l.code === selectedLangs[0])?.name || ""}`
              }
              {" "}{tl(lang, "다운로드", "Download", "Tải xuống")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
