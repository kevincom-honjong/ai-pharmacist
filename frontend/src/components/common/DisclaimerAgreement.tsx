import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DisclaimerAgreementProps {
  onAgree: () => void;
}

export default function DisclaimerAgreement({
  onAgree,
}: DisclaimerAgreementProps) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const items = t("onboarding.items", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto flex flex-col">
      {/* Intro */}
      <div className="px-6 pt-14 pb-6 text-center">
        <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 w-[72px] h-[72px] shadow-md">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
            />
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
        <div className="bg-white rounded-3xl p-5 max-h-[240px] overflow-y-auto shadow-sm">
          <ol className="space-y-4">
            {items.map((item, idx) => (
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
