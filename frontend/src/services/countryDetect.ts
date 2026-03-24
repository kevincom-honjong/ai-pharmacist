export interface CountryInfo {
  code: string;
  nameLocal: string; // displayed in that country's language
  nameEn: string;
  flag: string;
  language: string;
  languageLabel: string; // e.g. "한국어", "English"
  emergencyNumber: string;
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  { code: "KR", nameLocal: "한국", nameEn: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", language: "ko", languageLabel: "한국어", emergencyNumber: "119" },
  { code: "VN", nameLocal: "Việt Nam", nameEn: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", language: "vi", languageLabel: "Tiếng Việt", emergencyNumber: "115" },
  { code: "US", nameLocal: "United States", nameEn: "United States", flag: "\u{1F1FA}\u{1F1F8}", language: "en", languageLabel: "English", emergencyNumber: "911" },
  { code: "JP", nameLocal: "日本", nameEn: "Japan", flag: "\u{1F1EF}\u{1F1F5}", language: "ja", languageLabel: "日本語", emergencyNumber: "119" },
  { code: "TH", nameLocal: "ประเทศไทย", nameEn: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", language: "th", languageLabel: "ไทย", emergencyNumber: "1669" },
  { code: "PH", nameLocal: "Philippines", nameEn: "Philippines", flag: "\u{1F1F5}\u{1F1ED}", language: "en", languageLabel: "English", emergencyNumber: "911" },
];

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
    return "VN";
  } catch {
    return "VN";
  }
}
