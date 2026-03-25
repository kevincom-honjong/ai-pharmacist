import { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "./BackButton";
import { getEmergencyNumber } from "../../services/countryDetect";

interface DisclaimerAgreementProps {
  onAgree: () => void;
  onBack?: () => void;
  countryCode: string;
}

export default function DisclaimerAgreement({
  onAgree,
  onBack,
  countryCode,
}: DisclaimerAgreementProps) {
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState(false);

  const emergencyNumber = getEmergencyNumber(countryCode);
  const items = t("onboarding.items", { returnObjects: true }) as string[];
  const processedItems = items.map((item) =>
    item.replace("{{emergencyNumber}}", emergencyNumber)
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      {onBack && (
        <div className="px-3 pt-3">
          <BackButton onClick={onBack} lang={i18n.language} />
        </div>
      )}
      {/* Intro */}
      <div className={`px-6 ${onBack ? "pt-2" : "pt-14"} pb-6 text-center`}>
        <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 w-[72px] h-[72px] shadow-md">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="7" width="18" height="10" rx="5" fill="white" />
            <rect x="12" y="7" width="9" height="10" rx="5" fill="rgba(255,255,255,0.55)" />
            <line x1="12" y1="8" x2="12" y2="16" stroke="rgba(20,184,166,0.3)" strokeWidth="0.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          AI Pharmacist
        </h1>
        <p className="text-xs text-gray-400 mb-3">Your AI-Powered Pharmacist</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t("onboarding.intro")}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {t("onboarding.introSub")}
        </p>
      </div>

      {/* Disclaimer box */}
      <div className="flex-1 px-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          {t("onboarding.disclaimerTitle")}
        </h2>
        <div className="bg-white rounded-3xl p-5 max-h-[280px] overflow-y-auto shadow-sm">
          <ol className="space-y-4">
            {processedItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Agreement */}
      <div className="px-6 pt-5 pb-8">
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-5 h-5 rounded-lg border-gray-300 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
          />
          <span className="text-sm text-gray-700">
            {t("onboarding.agreeCheck")}
          </span>
        </label>
        <button
          onClick={onAgree}
          disabled={!checked}
          className={`w-full py-4 rounded-2xl text-base font-semibold transition-all ${
            checked
              ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] shadow-sm"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {t("onboarding.agreeButton")}
        </button>
      </div>
    </div>
  );
}
