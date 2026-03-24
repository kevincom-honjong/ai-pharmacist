import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/layout/Header";
import SearchInput from "./components/search/SearchInput";
import SymptomTags from "./components/search/SymptomTags";
import Disclaimer from "./components/common/Disclaimer";
import DisclaimerAgreement from "./components/common/DisclaimerAgreement";
import SymptomFlow from "./components/search/SymptomFlow";
import CountrySelector from "./components/common/CountrySelector";
import PharmacyIllustration from "./components/common/PharmacyIllustration";
import MatchCandidates from "./components/search/MatchCandidates";
import AllCategorySelector from "./components/search/AllCategorySelector";
import LanguageSelectScreen from "./components/onboarding/LanguageSelectScreen";
import CountrySelectScreen from "./components/onboarding/CountrySelectScreen";
import {
  matchSymptomScored,
  getMatchCandidates,
  type MatchResult,
} from "./services/symptomTree";
import {
  getSavedCountry,
  saveCountry,
  getSavedLanguage,
  saveLanguage,
  getCountryInfo,
  getDrugCountryCode,
  getI18nLang,
  type CountryInfo,
} from "./services/countryDetect";

const DISCLAIMER_KEY = "otc_disclaimer_agreed";

type Screen = "home" | "flow" | "allCategories";

// TODO: 개발 완료 후 localStorage 기반 온보딩 스킵 복원
// function getOnboardingStep(): "language" | "country" | "disclaimer" | "done" {
//   if (!getSavedLanguage()) return "language";
//   if (!getSavedCountry()) return "country";
//   if (localStorage.getItem(DISCLAIMER_KEY) !== "true") return "disclaimer";
//   return "done";
// }

// 개발 중: 매번 언어 선택부터 시작 + localStorage 초기화
function getOnboardingStep(): "language" | "country" | "disclaimer" | "done" {
  localStorage.removeItem("otc_selected_language");
  localStorage.removeItem("otc_selected_country");
  localStorage.removeItem(DISCLAIMER_KEY);
  return "language";
}

function App() {
  const { t, i18n } = useTranslation();

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState<"language" | "country" | "disclaimer" | "done">(
    () => getOnboardingStep()
  );

  // Main app state
  const [screen, setScreen] = useState<Screen>("home");
  const [searchValue, setSearchValue] = useState("");
  const [matchedCategory, setMatchedCategory] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<MatchResult[]>([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const [countryCode, setCountryCode] = useState<string>(
    () => getSavedCountry() || "VN"
  );

  // Restore language on mount if saved
  if (onboardingStep === "done" || onboardingStep === "country" || onboardingStep === "disclaimer") {
    const savedLang = getSavedLanguage();
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }

  const currentCountry: CountryInfo = getCountryInfo(countryCode) || {
    code: "VN", nameLocal: "Việt Nam", nameEn: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}", language: "vi", languageLabel: "Tiếng Việt",
    emergencyNumber: "115",
  };

  // === Onboarding handlers ===

  const handleLanguageSelect = (langCode: string) => {
    const i18nCode = getI18nLang(langCode);
    i18n.changeLanguage(i18nCode);
    // TODO: 개발 완료 후 localStorage 저장 복원
    // saveLanguage(langCode);
    setOnboardingStep("country");
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    // TODO: 개발 완료 후 localStorage 저장 복원
    // saveCountry(code);
    setOnboardingStep("disclaimer");
  };

  const handleAgree = () => {
    // TODO: 개발 완료 후 localStorage 저장 복원
    // localStorage.setItem(DISCLAIMER_KEY, "true");
    setOnboardingStep("done");
  };

  // === Main app handlers ===

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    saveCountry(code);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    saveLanguage(lang);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    const results = matchSymptomScored(searchValue);
    if (results.length === 0) {
      setNoMatch(true);
      setShowCandidates(false);
      setCandidates([]);
      return;
    }
    const topCandidates = getMatchCandidates(searchValue);
    if (topCandidates.length <= 1) {
      setMatchedCategory(topCandidates[0].category);
      setScreen("flow");
      setNoMatch(false);
      setShowCandidates(false);
    } else {
      setCandidates(topCandidates);
      setShowCandidates(true);
      setNoMatch(false);
    }
  };

  const handleCandidateSelect = (category: string) => {
    setMatchedCategory(category);
    setScreen("flow");
    setShowCandidates(false);
    setCandidates([]);
    setNoMatch(false);
  };

  const handleTagSelect = (symptom: string) => {
    setSearchValue(symptom);
    const results = matchSymptomScored(symptom);
    if (results.length > 0) {
      setMatchedCategory(results[0].category);
      setScreen("flow");
      setNoMatch(false);
      setShowCandidates(false);
    }
  };

  const handleDirectCategorySelect = (category: string) => {
    setMatchedCategory(category);
    setScreen("flow");
    setNoMatch(false);
    setShowCandidates(false);
    setCandidates([]);
  };

  const handleReset = () => {
    setScreen("home");
    setSearchValue("");
    setMatchedCategory(null);
    setNoMatch(false);
    setShowCandidates(false);
    setCandidates([]);
  };

  // === Render: Onboarding flow ===

  if (onboardingStep === "language") {
    return <LanguageSelectScreen onSelect={handleLanguageSelect} />;
  }

  if (onboardingStep === "country") {
    return (
      <CountrySelectScreen
        lang={getSavedLanguage() || i18n.language}
        onSelect={handleCountrySelect}
        onBack={() => setOnboardingStep("language")}
      />
    );
  }

  if (onboardingStep === "disclaimer") {
    return (
      <DisclaimerAgreement
        onAgree={handleAgree}
        onBack={() => setOnboardingStep("country")}
      />
    );
  }

  // === Render: Main app ===

  if (screen === "allCategories") {
    return (
      <AllCategorySelector
        onSelect={handleDirectCategorySelect}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "flow" && matchedCategory) {
    return (
      <SymptomFlow
        category={matchedCategory}
        countryCode={getDrugCountryCode(countryCode)}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto relative">
      <Header />

      <div className="px-5 pt-2">
        <CountrySelector
          currentCountry={currentCountry}
          currentLang={i18n.language}
          onSelectCountry={handleCountryChange}
          onSelectLanguage={handleLanguageChange}
        />
        {!currentCountry.hasDB && (
          <div className="mt-2 px-4 py-2.5 bg-amber-50/80 rounded-2xl">
            <p className="text-xs text-amber-600 leading-relaxed">
              {i18n.language === "ko"
                ? `${currentCountry.nameLocal}의 약 DB는 준비 중입니다. 성분명 기반으로 안내해드립니다.`
                : i18n.language === "vi"
                ? `Cơ sở dữ liệu thuốc của ${currentCountry.nameLocal} đang được chuẩn bị. Chúng tôi sẽ hướng dẫn theo tên thành phần.`
                : `Drug database for ${currentCountry.nameEn} is being prepared. We'll guide you by ingredient name.`}
            </p>
          </div>
        )}
      </div>

      <main className="px-5 pb-16">
        <div className="pt-8 pb-2 text-center">
          <PharmacyIllustration />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {t("home.greeting")}
          </h1>
          <p className="text-sm text-gray-400">{t("app.slogan")}</p>
        </div>

        <div className="mt-6 mb-8">
          <SearchInput
            value={searchValue}
            onChange={(v) => {
              setSearchValue(v);
              setNoMatch(false);
              setShowCandidates(false);
            }}
            onSubmit={handleSearch}
          />

          {showCandidates && candidates.length > 1 && (
            <MatchCandidates
              candidates={candidates}
              onSelect={handleCandidateSelect}
              onShowAll={() => setScreen("allCategories")}
            />
          )}

          {noMatch && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-3">
                {i18n.language === "ko"
                  ? "아래에서 가장 가까운 증상을 선택해주세요"
                  : i18n.language === "vi"
                  ? "Vui lòng chọn triệu chứng gần nhất bên dưới"
                  : "Please select the closest symptom below"}
              </p>
              <button
                onClick={() => setScreen("allCategories")}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-md active:scale-[0.98] transition-all shadow-sm"
              >
                {i18n.language === "ko"
                  ? "전체 증상 보기"
                  : i18n.language === "vi"
                  ? "Xem tất cả triệu chứng"
                  : "View all symptoms"}
              </button>
            </div>
          )}
        </div>

        {!showCandidates && !noMatch && (
          <SymptomTags onSelect={handleTagSelect} />
        )}
      </main>

      <Disclaimer />
    </div>
  );
}

export default App;
