import { useState, useEffect } from "react";

interface AnalyzingScreenProps {
  lang: string;
  onComplete: () => void;
}

const MESSAGES: Record<string, string[]> = {
  ko: [
    "증상을 분석하고 있습니다...",
    "적합한 약을 검색하고 있습니다...",
    "최적의 결과를 준비하고 있습니다...",
  ],
  en: [
    "Analyzing your symptoms...",
    "Searching for suitable medicines...",
    "Preparing the best results for you...",
  ],
  vi: [
    "Đang phân tích triệu chứng...",
    "Đang tìm thuốc phù hợp...",
    "Đang chuẩn bị kết quả tốt nhất cho bạn...",
  ],
};

export default function AnalyzingScreen({ lang, onComplete }: AnalyzingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const l = lang.startsWith("en") ? "en" : (["ko", "vi"].includes(lang) ? lang : "en");
  const messages = MESSAGES[l] || MESSAGES.en;

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    // Message rotation
    const msgTimer1 = setTimeout(() => setMsgIndex(1), 800);
    const msgTimer2 = setTimeout(() => setMsgIndex(2), 1600);

    // Auto-complete after 2.5s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(msgTimer1);
      clearTimeout(msgTimer2);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col items-center justify-center px-8">
      {/* Pill animation */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center animate-pulse shadow-lg">
          <span className="text-3xl animate-spin" style={{ animationDuration: "2s" }}>💊</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[280px] h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Messages with fade effect */}
      <div className="h-16 flex items-center">
        <p
          key={msgIndex}
          className="text-sm text-gray-500 text-center leading-relaxed animate-fade-in"
        >
          {messages[msgIndex]}
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
