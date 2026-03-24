export interface CountryInfo {
  code: string;
  nameLocal: string;
  nameEn: string;
  flag: string;
  language: string;
  languageLabel: string;
  emergencyNumber: string;
  hasDB: boolean; // true if drug DB is available for this country
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  // Drug DB available
  { code: "KR", nameLocal: "한국", nameEn: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", language: "ko", languageLabel: "한국어", emergencyNumber: "119", hasDB: true },
  { code: "VN", nameLocal: "Việt Nam", nameEn: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", language: "vi", languageLabel: "Tiếng Việt", emergencyNumber: "115", hasDB: true },
  { code: "US", nameLocal: "United States", nameEn: "United States", flag: "\u{1F1FA}\u{1F1F8}", language: "en", languageLabel: "English", emergencyNumber: "911", hasDB: true },
  // Drug DB preparing
  { code: "JP", nameLocal: "日本", nameEn: "Japan", flag: "\u{1F1EF}\u{1F1F5}", language: "ja", languageLabel: "日本語", emergencyNumber: "119", hasDB: false },
  { code: "TH", nameLocal: "ประเทศไทย", nameEn: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", language: "th", languageLabel: "ไทย", emergencyNumber: "1669", hasDB: false },
  { code: "PH", nameLocal: "Philippines", nameEn: "Philippines", flag: "\u{1F1F5}\u{1F1ED}", language: "en", languageLabel: "English", emergencyNumber: "911", hasDB: false },
  { code: "ID", nameLocal: "Indonesia", nameEn: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", language: "id", languageLabel: "Bahasa", emergencyNumber: "118", hasDB: false },
  { code: "GB", nameLocal: "United Kingdom", nameEn: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", language: "en", languageLabel: "English", emergencyNumber: "999", hasDB: false },
  { code: "AU", nameLocal: "Australia", nameEn: "Australia", flag: "\u{1F1E6}\u{1F1FA}", language: "en", languageLabel: "English", emergencyNumber: "000", hasDB: false },
  { code: "DE", nameLocal: "Deutschland", nameEn: "Germany", flag: "\u{1F1E9}\u{1F1EA}", language: "de", languageLabel: "Deutsch", emergencyNumber: "112", hasDB: false },
  { code: "IN", nameLocal: "India", nameEn: "India", flag: "\u{1F1EE}\u{1F1F3}", language: "en", languageLabel: "English", emergencyNumber: "112", hasDB: false },
  { code: "CN", nameLocal: "中国", nameEn: "China", flag: "\u{1F1E8}\u{1F1F3}", language: "zh", languageLabel: "中文", emergencyNumber: "120", hasDB: false },
  { code: "ES", nameLocal: "España", nameEn: "Spain", flag: "\u{1F1EA}\u{1F1F8}", language: "es", languageLabel: "Español", emergencyNumber: "112", hasDB: false },
];

// Countries with drug DB
export const DB_COUNTRY_CODES = ["KR", "VN", "US"];

const STORAGE_KEY = "otc_selected_country";
const LANG_STORAGE_KEY = "otc_selected_language";

export const SUPPORTED_LANGUAGES = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

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

// Get the drug DB country code (fallback to US for unsupported countries)
export function getDrugCountryCode(code: string): string {
  if (DB_COUNTRY_CODES.includes(code)) return code;
  return "US"; // fallback to US (ingredient-based)
}

export async function detectCountryByIP(): Promise<string> {
  try {
    const res = await fetch("http://ip-api.com/json/?fields=countryCode", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error("IP API failed");
    const data = await res.json();
    const code = data.countryCode as string;
    if (SUPPORTED_COUNTRIES.some((c) => c.code === code)) {
      return code;
    }
    return "US";
  } catch {
    return "US";
  }
}
