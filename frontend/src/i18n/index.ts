import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./ko/translation.json";
import en from "./en/translation.json";
import vi from "./vi/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;
