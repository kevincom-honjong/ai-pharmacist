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

export default function MedicalFormPreview({ data, lang, onBack, onReset }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!printRef.current) return;
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
      // Fallback: print
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
                {tl(lang, "건강 문진표", "Medical Questionnaire", "Phiếu khám sức khỏe")}
              </p>
            </div>
          </div>
          <p className="text-xs opacity-70">{tl(lang, "작성일", "Date", "Ngày")}: {data.date}</p>
        </div>

        <div className="px-6 py-4">
          <Section title={tl(lang, "📋 기본 정보", "📋 Basic Info", "📋 Thông tin cơ bản")}>
            <Row label={tl(lang, "성별", "Gender", "Giới tính")} value={data.gender} />
            <Row label={tl(lang, "연령대", "Age", "Tuổi")} value={data.ageGroup} />
            {data.height && <Row label={tl(lang, "키", "Height", "Chiều cao")} value={`${data.height} cm`} />}
            {data.weight && <Row label={tl(lang, "몸무게", "Weight", "Cân nặng")} value={`${data.weight} kg`} />}
          </Section>

          <Section title={tl(lang, "🩺 현재 증상", "🩺 Current Symptoms", "🩺 Triệu chứng hiện tại")}>
            <Row
              label={tl(lang, "증상", "Symptoms", "Triệu chứng")}
              value={data.symptoms.map(s => getSymptomLabel(s, lang)).join(", ")}
            />
            <Row
              label={tl(lang, "주요 증상", "Main", "Chính")}
              value={getSymptomLabel(data.mainSymptom, lang)}
            />
            <Row label={tl(lang, "시작 시점", "Onset", "Khởi phát")} value={data.onsetTime} />
            <div className="flex border-b border-gray-100 py-2">
              <span className="w-[140px] text-sm text-gray-500 font-medium shrink-0">
                {tl(lang, "강도", "Severity", "Mức độ")}
              </span>
              <span className={`text-sm font-bold ${severityColor}`}>{data.severity} / 10</span>
            </div>
            {data.worseTime.length > 0 && (
              <Row label={tl(lang, "악화 시점", "Worse when", "Nặng hơn khi")} value={data.worseTime.join(", ")} />
            )}
            {data.betterTime.length > 0 && (
              <Row label={tl(lang, "호전 시점", "Better when", "Tốt hơn khi")} value={data.betterTime.join(", ")} />
            )}
          </Section>

          <Section title={tl(lang, "📁 병력", "📁 Medical History", "📁 Tiền sử bệnh")}>
            <Row label={tl(lang, "진단 질환", "Diseases", "Bệnh")} value={data.diseases.join(", ") || tl(lang, "없음", "None", "Không")} />
            <Row label={tl(lang, "수술 경험", "Surgery", "Phẫu thuật")} value={data.surgeryHistory || tl(lang, "없음", "None", "Không")} />
            <Row label={tl(lang, "가족력", "Family", "Gia đình")} value={data.familyDiseases.join(", ") || tl(lang, "없음", "None", "Không")} />
          </Section>

          <Section title={tl(lang, "💊 복용 약물", "💊 Medications", "💊 Thuốc đang dùng")}>
            <Row label={tl(lang, "복용 약", "Current", "Đang dùng")} value={data.currentMeds.join(", ") || tl(lang, "없음", "None", "Không")} />
            <Row label={tl(lang, "약 알레르기", "Drug allergy", "Dị ứng thuốc")} value={data.drugAllergies.join(", ") || tl(lang, "없음", "None", "Không")} />
            <Row label={tl(lang, "음식 알레르기", "Food allergy", "Dị ứng thực phẩm")} value={data.foodAllergies || tl(lang, "없음", "None", "Không")} />
          </Section>

          {data.gender === "female" && (
            <Section title={tl(lang, "👩 여성 건강", "👩 Women's Health", "👩 Sức khỏe phụ nữ")}>
              {data.pregnant && <Row label={tl(lang, "임신", "Pregnancy", "Mang thai")} value={data.pregnant} />}
              {data.breastfeeding && <Row label={tl(lang, "수유", "Breastfeeding", "Cho con bú")} value={data.breastfeeding} />}
              {data.lastPeriod && <Row label={tl(lang, "마지막 생리", "Last period", "Kỳ kinh cuối")} value={data.lastPeriod} />}
            </Section>
          )}

          <Section title={tl(lang, "🏃 생활 습관", "🏃 Lifestyle", "🏃 Lối sống")}>
            <Row label={tl(lang, "음주", "Alcohol", "Rượu bia")} value={data.alcohol} />
            <Row label={tl(lang, "흡연", "Smoking", "Hút thuốc")} value={data.smoking} />
          </Section>

          {data.memo && (
            <Section title={tl(lang, "📝 추가 메모", "📝 Notes", "📝 Ghi chú")}>
              <p className="text-sm text-gray-700 leading-relaxed">{data.memo}</p>
            </Section>
          )}

          <div className="text-center pt-2 pb-1 border-t border-gray-100">
            <p className="text-[10px] text-gray-300">
              Generated by AI Pharmacist · {tl(lang, "참고용 문진표", "For reference only", "Chỉ để tham khảo")}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-5 space-y-3">
        <button
          onClick={handleDownload}
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
    </div>
  );
}
