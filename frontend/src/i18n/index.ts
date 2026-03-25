import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./ko/translation.json";
import en from "./en/translation.json";
import vi from "./vi/translation.json";
import ja from "./ja/translation.json";
import th from "./th/translation.json";
import fil from "./fil/translation.json";
import id from "./id/translation.json";
import enGB from "./en-GB/translation.json";
import enAU from "./en-AU/translation.json";
import de from "./de/translation.json";
import hi from "./hi/translation.json";
import zh from "./zh/translation.json";
import es from "./es/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    vi: { translation: vi },
    ja: { translation: ja },
    th: { translation: th },
    fil: { translation: fil },
    id: { translation: id },
    "en-GB": { translation: enGB },
    "en-AU": { translation: enAU },
    de: { translation: de },
    hi: { translation: hi },
    zh: { translation: zh },
    es: { translation: es },
  },
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;
