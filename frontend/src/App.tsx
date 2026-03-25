import { useState, useEffect, useCallback } from "react";
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
import MedicalFormFlow from "./components/medical/MedicalFormFlow";
import MedicalFormPreview from "./components/medical/MedicalFormPreview";
import type { MedicalFormData } from "./components/medical/MedicalFormFlow";
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

type Screen = "home" | "flow" | "allCategories" | "medicalForm" | "medicalPreview";
type OnboardingStep = "language" | "country" | "disclaimer" | "done";

// TODO: 개발 완료 후 localStorage 기반 온보딩 스킵 복원
// function getOnboardingStep(): OnboardingStep {
//   if (!getSavedLanguage()) return "language";
//   if (!getSavedCountry()) return "country";
//   if (localStorage.getItem(DISCLAIMER_KEY) !== "true") return "disclaimer";
//   return "done";
// }

// 개발 중: 매번 언어 선택부터 시작 + localStorage 초기화
function getOnboardingStep(): OnboardingStep {
  localStorage.removeItem("otc_selected_language");
  localStorage.removeItem("otc_selected_country");
  localStorage.removeItem(DISCLAIMER_KEY);
  return "language";
}

function App() {
  const { t, i18n } = useTranslation();

  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(getOnboardingStep);
  const [screen, setScreen] = useState<Screen>("home");
  const [searchValue, setSearchValue] = useState("");
  const [matchedCategory, setMatchedCategory] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<MatchResult[]>([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [countryCode, setCountryCode] = useState<string>(() => getSavedCountry() || "VN");
  const [searchFocused, setSearchFocused] = useState(false);
  const [medicalFormData, setMedicalFormData] = useState<MedicalFormData | null>(null);

  // Restore language
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

  const scrollTop = () => window.scrollTo(0, 0);

  // === History API for browser back button ===

  // Push history entry on screen changes
  const pushState = useCallback((name: string) => {
    window.history.pushState({ screen: name }, "");
  }, []);

  // Get current app state name for history
  const getCurrentStateName = useCallback((): string => {
    if (onboardingStep !== "done") return `onboarding-${onboardingStep}`;
    return screen;
  }, [onboardingStep, screen]);

  // Push initial history entry
  useEffect(() => {
    window.history.replaceState({ screen: "language" }, "");
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Determine what to go back to based on current state
      if (onboardingStep === "country") {
        setOnboardingStep("language");
        scrollTop();
        return;
      }
      if (onboardingStep === "disclaimer") {
        setOnboardingStep("country");
        scrollTop();
        return;
      }

      // Main app screens
      if (screen === "flow") {
        // SymptomFlow handles its own internal back via its own popstate
        // If we reach here, go to home
        setScreen("home");
        setSearchValue("");
        setMatchedCategory(null);
        setNoMatch(false);
        setShowCandidates(false);
        setCandidates([]);
        scrollTop();
        return;
      }
      if (screen === "allCategories") {
        setScreen("home");
        scrollTop();
        return;
      }
      if (screen === "medicalForm") {
        setScreen("home");
        scrollTop();
        return;
      }
      if (screen === "medicalPreview") {
        setScreen("medicalForm");
        scrollTop();
        return;
      }

      // On home screen → push state again to prevent exit
      // (double-back to exit)
      if (screen === "home" && onboardingStep === "done") {
        window.history.pushState({ screen: "home" }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onboardingStep, screen]);

  // === Onboarding handlers ===

  const handleLanguageSelect = (langCode: string) => {
    const i18nCode = getI18nLang(langCode);
    i18n.changeLanguage(i18nCode);
    // TODO: 개발 완료 후 localStorage 저장 복원
    // saveLanguage(langCode);
    setOnboardingStep("country");
    pushState("country");
    scrollTop();
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    // TODO: 개발 완료 후 localStorage 저장 복원
    // saveCountry(code);
    setOnboardingStep("disclaimer");
    pushState("disclaimer");
    scrollTop();
  };

  const handleAgree = () => {
    // TODO: 개발 완료 후 localStorage 저장 복원
    // localStorage.setItem(DISCLAIMER_KEY, "true");
    setOnboardingStep("done");
    pushState("home");
    scrollTop();
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
      pushState("flow");
      scrollTop();
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
    pushState("flow");
    scrollTop();
  };

  const handleTagSelect = (symptom: string) => {
    setSearchValue(symptom);
    const results = matchSymptomScored(symptom);
    if (results.length > 0) {
      setMatchedCategory(results[0].category);
      setScreen("flow");
      setNoMatch(false);
      setShowCandidates(false);
      pushState("flow");
      scrollTop();
    }
  };

  const handleDirectCategorySelect = (category: string) => {
    setMatchedCategory(category);
    setScreen("flow");
    setNoMatch(false);
    setShowCandidates(false);
    setCandidates([]);
    pushState("flow");
    scrollTop();
  };

  const handleReset = () => {
    setScreen("home");
    setSearchValue("");
    setMatchedCategory(null);
    setNoMatch(false);
    setShowCandidates(false);
    setCandidates([]);
    pushState("home");
    scrollTop();
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
        onBack={() => { setOnboardingStep("language"); scrollTop(); }}
      />
    );
  }

  if (onboardingStep === "disclaimer") {
    return (
      <DisclaimerAgreement
        onAgree={handleAgree}
        onBack={() => { setOnboardingStep("country"); scrollTop(); }}
        countryCode={countryCode}
      />
    );
  }

  // === Render: Main app ===

  if (screen === "medicalForm") {
    return (
      <MedicalFormFlow
        lang={i18n.language}
        countryCode={countryCode}
        onComplete={(data) => {
          setMedicalFormData(data);
          setScreen("medicalPreview");
          pushState("medicalPreview");
          scrollTop();
        }}
        onBack={() => { setScreen("home"); pushState("home"); scrollTop(); }}
      />
    );
  }

  if (screen === "medicalPreview" && medicalFormData) {
    return (
      <MedicalFormPreview
        data={medicalFormData}
        lang={i18n.language}
        onBack={() => { setScreen("medicalForm"); scrollTop(); }}
        onReset={() => { setMedicalFormData(null); setScreen("home"); pushState("home"); scrollTop(); }}
      />
    );
  }

  if (screen === "allCategories") {
    return (
      <AllCategorySelector
        onSelect={handleDirectCategorySelect}
        onBack={() => { setScreen("home"); pushState("home"); scrollTop(); }}
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
      <div className={`transition-all duration-300 ease-in-out ${searchFocused ? "max-h-0 overflow-hidden opacity-0" : "max-h-[200px] opacity-100"}`}>
        <Header />
      </div>

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
        <div className={`text-center transition-all duration-300 ease-in-out ${searchFocused ? "max-h-0 overflow-hidden opacity-0 pt-0 pb-0" : "max-h-[400px] opacity-100 pt-3 pb-2"}`}>
          <PharmacyIllustration />
          <h1 className="text-2xl font-bold text-gray-800 mb-1 -mt-4">
            {t("home.greeting")}
          </h1>
          <p className="text-sm text-gray-400">{t("app.slogan")}</p>
        </div>

        <div className={`mb-8 ${searchFocused ? "mt-2" : "mt-6"}`}>
          <SearchInput
            value={searchValue}
            onChange={(v) => {
              setSearchValue(v);
              setNoMatch(false);
              setShowCandidates(false);
            }}
            onSubmit={handleSearch}
            onFocusChange={setSearchFocused}
          />

          {showCandidates && candidates.length > 1 && (
            <MatchCandidates
              candidates={candidates}
              onSelect={handleCandidateSelect}
              onShowAll={() => { setScreen("allCategories"); pushState("allCategories"); scrollTop(); }}
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
                onClick={() => { setScreen("allCategories"); pushState("allCategories"); scrollTop(); }}
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

        {/* Medical Form Button */}
        {!searchFocused && !showCandidates && !noMatch && (
          <div className="mt-6 mb-4">
            <button
              onClick={() => { setScreen("medicalForm"); pushState("medicalForm"); scrollTop(); }}
              className="w-full flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all border border-gray-50"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                📋
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-gray-800">
                  {i18n.language === "ko" ? "문진표 작성하기" : i18n.language === "vi" ? "Tạo phiếu khám" : "Create Medical Form"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {i18n.language === "ko" ? "병원/약국 방문 시 보여줄 문진표를 만들어보세요" : i18n.language === "vi" ? "Tạo phiếu khám để đưa cho bác sĩ/dược sĩ" : "Create a form to show your doctor or pharmacist"}
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </main>

      <Disclaimer />
    </div>
  );
}

export default App;
