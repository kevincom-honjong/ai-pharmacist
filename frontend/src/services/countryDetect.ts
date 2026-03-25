export interface CountryInfo {
  code: string;
  nameLocal: string;
  nameEn: string;
  flag: string;
  language: string;
  languageLabel: string;
  emergencyNumber: string;
  hasDB: boolean;
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  { code: "KR", nameLocal: "한국", nameEn: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", language: "ko", languageLabel: "한국어", emergencyNumber: "119", hasDB: true },
  { code: "VN", nameLocal: "Việt Nam", nameEn: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", language: "vi", languageLabel: "Tiếng Việt", emergencyNumber: "115", hasDB: true },
  { code: "US", nameLocal: "United States", nameEn: "United States", flag: "\u{1F1FA}\u{1F1F8}", language: "en", languageLabel: "English", emergencyNumber: "911", hasDB: true },
  { code: "JP", nameLocal: "日本", nameEn: "Japan", flag: "\u{1F1EF}\u{1F1F5}", language: "ja", languageLabel: "日本語", emergencyNumber: "119", hasDB: true },
  { code: "TH", nameLocal: "ประเทศไทย", nameEn: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", language: "th", languageLabel: "ไทย", emergencyNumber: "1669", hasDB: false },
  { code: "PH", nameLocal: "Philippines", nameEn: "Philippines", flag: "\u{1F1F5}\u{1F1ED}", language: "en", languageLabel: "English", emergencyNumber: "911", hasDB: false },
  { code: "ID", nameLocal: "Indonesia", nameEn: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", language: "id", languageLabel: "Bahasa", emergencyNumber: "118", hasDB: true },
  { code: "GB", nameLocal: "United Kingdom", nameEn: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", language: "en", languageLabel: "English", emergencyNumber: "999", hasDB: true },
  { code: "AU", nameLocal: "Australia", nameEn: "Australia", flag: "\u{1F1E6}\u{1F1FA}", language: "en", languageLabel: "English", emergencyNumber: "000", hasDB: true },
  { code: "DE", nameLocal: "Deutschland", nameEn: "Germany", flag: "\u{1F1E9}\u{1F1EA}", language: "de", languageLabel: "Deutsch", emergencyNumber: "112", hasDB: false },
  { code: "IN", nameLocal: "India", nameEn: "India", flag: "\u{1F1EE}\u{1F1F3}", language: "en", languageLabel: "English", emergencyNumber: "112", hasDB: false },
  { code: "CN", nameLocal: "中国", nameEn: "China", flag: "\u{1F1E8}\u{1F1F3}", language: "zh", languageLabel: "中文", emergencyNumber: "120", hasDB: false },
  { code: "ES", nameLocal: "España", nameEn: "Spain", flag: "\u{1F1EA}\u{1F1F8}", language: "es", languageLabel: "Español", emergencyNumber: "112", hasDB: false },
];

export const DB_COUNTRY_CODES = ["KR", "VN", "US", "JP"];

export interface LanguageOption {
  code: string;       // i18n language code (ko, en, vi)
  label: string;      // Native label
  flag: string;
  countryHint: string; // Country code hint for flag display
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "ko", label: "한국어", flag: "\u{1F1F0}\u{1F1F7}", countryHint: "KR" },
  { code: "vi", label: "Tiếng Việt", flag: "\u{1F1FB}\u{1F1F3}", countryHint: "VN" },
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}", countryHint: "US" },
  { code: "ja", label: "日本語", flag: "\u{1F1EF}\u{1F1F5}", countryHint: "JP" },
  { code: "th", label: "ภาษาไทย", flag: "\u{1F1F9}\u{1F1ED}", countryHint: "TH" },
  { code: "fil", label: "Filipino", flag: "\u{1F1F5}\u{1F1ED}", countryHint: "PH" },
  { code: "id", label: "Bahasa Indonesia", flag: "\u{1F1EE}\u{1F1E9}", countryHint: "ID" },
  { code: "en-GB", label: "English (UK)", flag: "\u{1F1EC}\u{1F1E7}", countryHint: "GB" },
  { code: "en-AU", label: "English (AU)", flag: "\u{1F1E6}\u{1F1FA}", countryHint: "AU" },
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}", countryHint: "DE" },
  { code: "hi", label: "हिन्दी", flag: "\u{1F1EE}\u{1F1F3}", countryHint: "IN" },
  { code: "zh", label: "中文", flag: "\u{1F1E8}\u{1F1F3}", countryHint: "CN" },
  { code: "es", label: "Español", flag: "\u{1F1EA}\u{1F1F8}", countryHint: "ES" },
];

// Map non-supported i18n codes to supported ones
export function getI18nLang(langCode: string): string {
  const supported = ["ko", "en", "vi", "ja", "th", "fil", "id", "de", "hi", "zh", "es", "en-GB", "en-AU"];
  if (supported.includes(langCode)) return langCode;
  if (langCode.startsWith("en")) return "en";
  return "en";
}

const STORAGE_KEY = "otc_selected_country";
const LANG_STORAGE_KEY = "otc_selected_language";

export function getSavedCountry(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function saveCountry(code: string): void {
  localStorage.setItem(STORAGE_KEY, code);
}

export function getSavedLanguage(): string | null {
  return localStorage.getItem(LANG_STORAGE_KEY);
}

export function saveLanguage(lang: string): void {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function getCountryInfo(code: string): CountryInfo | undefined {
  return SUPPORTED_COUNTRIES.find((c) => c.code === code);
}

export function getEmergencyNumber(code: string): string {
  const country = SUPPORTED_COUNTRIES.find((c) => c.code === code);
  return country?.emergencyNumber || "112";
}

export function getDrugCountryCode(code: string): string {
  if (DB_COUNTRY_CODES.includes(code)) return code;
  return "US";
}

export async function detectCountryByIP(): Promise<string> {
  try {
    const res = await fetch("http://ip-api.com/json/?fields=countryCode", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error("IP API failed");
    const data = await res.json();
    const code = data.countryCode as string;
    if (SUPPORTED_COUNTRIES.some((c) => c.code === code)) return code;
    return "US";
  } catch {
    return "US";
  }
}
