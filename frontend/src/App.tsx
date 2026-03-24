import { useState, useEffect } from "react";
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
import {
  matchSymptomScored,
  getMatchCandidates,
  type MatchResult,
} from "./services/symptomTree";
import {
  detectCountryByIP,
  getSavedCountry,
  saveCountry,
  getSavedLanguage,
  saveLanguage,
  getCountryInfo,
  type CountryInfo,
} from "./services/countryDetect";

const STORAGE_KEY = "otc_disclaimer_agreed";
const FALLBACK_LANG_MAP: Record<string, string> = {
  ko: "ko", vi: "vi", en: "en", ja: "en", th: "en",
};

type Screen = "home" | "flow" | "allCategories";

function App() {
  const { t, i18n } = useTranslation();
  const [agreed, setAgreed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );
  const [screen, setScreen] = useState<Screen>("home");
  const [searchValue, setSearchValue] = useState("");
  const [matchedCategory, setMatchedCategory] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<MatchResult[]>([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  // Country = drug DB filter, Language = UI text (independent)
  const [countryCode, setCountryCode] = useState<string>(
    () => getSavedCountry() || "VN"
  );
  const [countryLoading, setCountryLoading] = useState(!getSavedCountry());

  // Initialize language and country on first load
  useEffect(() => {
    const savedLang = getSavedLanguage();
    const savedCountry = getSavedCountry();

    if (savedCountry && savedLang) {
      // Both saved: restore independently
      i18n.changeLanguage(savedLang);
      return;
    }

    if (savedCountry && !savedLang) {
      // Country saved but no language: derive from country
      const country = getCountryInfo(savedCountry);
      const lang = FALLBACK_LANG_MAP[country?.language || "en"] || "en";
      i18n.changeLanguage(lang);
      saveLanguage(lang);
      return;
    }

    // Nothing saved: detect by IP
    setCountryLoading(true);
    detectCountryByIP().then((code) => {
      setCountryCode(code);
      saveCountry(code);
      const country = getCountryInfo(code);
      const lang = FALLBACK_LANG_MAP[country?.language || "en"] || "en";
      i18n.changeLanguage(lang);
      saveLanguage(lang);
      setCountryLoading(false);
    });
  }, []);

  const currentCountry: CountryInfo = getCountryInfo(countryCode) || {
    code: "VN", nameLocal: "Việt Nam", nameEn: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}", language: "vi", languageLabel: "Tiếng Việt",
    emergencyNumber: "115",
  };

  // Country change: only affects drug DB, language stays the same
  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    saveCountry(code);
  };

  // Language change: only affects UI text, country stays the same
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    saveLanguage(lang);
  };

  const handleAgree = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setAgreed(true);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    const results = matchSymptomScored(searchValue);

    if (results.length === 0) {
      // No match at all → show fallback
      setNoMatch(true);
      setShowCandidates(false);
      setCandidates([]);
      return;
    }

    const topCandidates = getMatchCandidates(searchValue);

    if (topCandidates.length === 1 && topCandidates[0].score >= 80) {
      // Strong single match → go directly
      setMatchedCategory(topCandidates[0].category);
      setScreen("flow");
      setNoMatch(false);
      setShowCandidates(false);
    } else if (topCandidates.length === 1) {
      // Weak single match → still go directly but could show candidates
      setMatchedCategory(topCandidates[0].category);
      setScreen("flow");
      setNoMatch(false);
      setShowCandidates(false);
    } else {
      // Multiple close matches → show candidates
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

  if (!agreed) {
    return <DisclaimerAgreement onAgree={handleAgree} />;
  }

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
        countryCode={countryCode}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] max-w-[480px] mx-auto relative">
      <Header />

      <div className="px-5 pt-2">
        {countryLoading ? (
          <span className="text-xs text-gray-300">{t("country.detecting")}</span>
        ) : (
          <CountrySelector
            currentCountry={currentCountry}
            currentLang={i18n.language}
            onSelectCountry={handleCountryChange}
            onSelectLanguage={handleLanguageChange}
          />
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

          {/* Multiple candidates */}
          {showCandidates && candidates.length > 1 && (
            <MatchCandidates
              candidates={candidates}
              onSelect={handleCandidateSelect}
              onShowAll={() => setScreen("allCategories")}
            />
          )}

          {/* No match → show all categories */}
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
