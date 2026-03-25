import { useState, useMemo } from "react";
import {
  SUPPORTED_COUNTRIES,
  type CountryInfo,
} from "../../services/countryDetect";
import BackButton from "../common/BackButton";

function getFlagUrl(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((c) => (0x1f1e6 + c.charCodeAt(0) - 65).toString(16))
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoints}.png`;
}

interface CountrySelectScreenProps {
  lang: string;
  onSelect: (countryCode: string) => void;
  onBack: () => void;
}

const TITLE: Record<string, string> = {
  ko: "어떤 나라의 약 정보를 원하시나요?",
  en: "Which country's drug info do you need?",
  vi: "Bạn cần thông tin thuốc của quốc gia nào?",
  ja: "どの国の薬情報が必要ですか？",
  th: "คุณต้องการข้อมูลยาของประเทศไหน?",
  fil: "Aling bansa ang kailangan mong impormasyon sa gamot?",
  id: "Informasi obat negara mana yang Anda butuhkan?",
  de: "Welches Land benötigen Sie Arzneimittelinformationen?",
  hi: "आपको किस देश की दवा जानकारी चाहिए?",
  zh: "您需要哪个国家的药品信息？",
  es: "¿De qué país necesitas información sobre medicamentos?",
};

const SUBTITLE: Record<string, string> = {
  ko: "해당 국가에서 판매되는 약을 안내합니다",
  en: "We'll show drugs available in your selected country",
  vi: "Chúng tôi sẽ hiển thị thuốc có bán tại quốc gia bạn chọn",
  ja: "選択した国で販売されている薬をご案内します",
  th: "เราจะแสดงยาที่มีจำหน่ายในประเทศที่คุณเลือก",
  fil: "Ipapakita namin ang mga gamot na available sa napiling bansa",
  id: "Kami akan menampilkan obat yang tersedia di negara pilihan Anda",
  de: "Wir zeigen Ihnen Medikamente, die in Ihrem Land erhältlich sind",
  hi: "हम आपके चुने हुए देश में उपलब्ध दवाइयाँ दिखाएंगे",
  zh: "我们将展示您所选国家可购买的药品",
  es: "Te mostraremos los medicamentos disponibles en el país seleccionado",
};

const PREPARING: Record<string, string> = {
  ko: "준비중", en: "Coming soon", vi: "Sắp có",
  ja: "準備中", th: "กำลังเตรียม", fil: "Malapit na",
  id: "Segera hadir", de: "Demnächst", hi: "जल्द आ रहा है",
  zh: "即将推出", es: "Próximamente",
};

const SEARCH_PH: Record<string, string> = {
  ko: "국가 검색...", en: "Search country...", vi: "Tìm quốc gia...",
  ja: "国を検索...", th: "ค้นหาประเทศ...", fil: "Maghanap ng bansa...",
  id: "Cari negara...", de: "Land suchen...", hi: "देश खोजें...",
  zh: "搜索国家...", es: "Buscar país...",
};

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  KR: { ko: "한국", en: "South Korea", vi: "Hàn Quốc", ja: "韓国", th: "เกาหลีใต้", fil: "South Korea", id: "Korea Selatan", de: "Südkorea", hi: "दक्षिण कोरिया", zh: "韩国", es: "Corea del Sur" },
  VN: { ko: "베트남", en: "Vietnam", vi: "Việt Nam", ja: "ベトナム", th: "เวียดนาม", fil: "Vietnam", id: "Vietnam", de: "Vietnam", hi: "वियतनाम", zh: "越南", es: "Vietnam" },
  US: { ko: "미국", en: "United States", vi: "Hoa Kỳ", ja: "アメリカ", th: "สหรัฐอเมริกา", fil: "Estados Unidos", id: "Amerika Serikat", de: "USA", hi: "अमेरिका", zh: "美国", es: "Estados Unidos" },
  JP: { ko: "일본", en: "Japan", vi: "Nhật Bản", ja: "日本", th: "ญี่ปุ่น", fil: "Japan", id: "Jepang", de: "Japan", hi: "जापान", zh: "日本", es: "Japón" },
  TH: { ko: "태국", en: "Thailand", vi: "Thái Lan", ja: "タイ", th: "ไทย", fil: "Thailand", id: "Thailand", de: "Thailand", hi: "थाईलैंड", zh: "泰国", es: "Tailandia" },
  PH: { ko: "필리핀", en: "Philippines", vi: "Philippines", ja: "フィリピン", th: "ฟิลิปปินส์", fil: "Pilipinas", id: "Filipina", de: "Philippinen", hi: "फ़िलीपींस", zh: "菲律宾", es: "Filipinas" },
  ID: { ko: "인도네시아", en: "Indonesia", vi: "Indonesia", ja: "インドネシア", th: "อินโดนีเซีย", fil: "Indonesia", id: "Indonesia", de: "Indonesien", hi: "इंडोनेशिया", zh: "印度尼西亚", es: "Indonesia" },
  GB: { ko: "영국", en: "United Kingdom", vi: "Vương quốc Anh", ja: "イギリス", th: "สหราชอาณาจักร", fil: "United Kingdom", id: "Inggris", de: "Vereinigtes Königreich", hi: "यूनाइटेड किंगडम", zh: "英国", es: "Reino Unido" },
  AU: { ko: "호주", en: "Australia", vi: "Úc", ja: "オーストラリア", th: "ออสเตรเลีย", fil: "Australia", id: "Australia", de: "Australien", hi: "ऑस्ट्रेलिया", zh: "澳大利亚", es: "Australia" },
  DE: { ko: "독일", en: "Germany", vi: "Đức", ja: "ドイツ", th: "เยอรมนี", fil: "Germany", id: "Jerman", de: "Deutschland", hi: "जर्मनी", zh: "德国", es: "Alemania" },
  IN: { ko: "인도", en: "India", vi: "Ấn Độ", ja: "インド", th: "อินเดีย", fil: "India", id: "India", de: "Indien", hi: "भारत", zh: "印度", es: "India" },
  CN: { ko: "중국", en: "China", vi: "Trung Quốc", ja: "中国", th: "จีน", fil: "China", id: "Tiongkok", de: "China", hi: "चीन", zh: "中国", es: "China" },
  ES: { ko: "스페인", en: "Spain", vi: "Tây Ban Nha", ja: "スペイン", th: "สเปน", fil: "Spain", id: "Spanyol", de: "Spanien", hi: "स्पेन", zh: "西班牙", es: "España" },
};

const CODE_COLORS: Record<string, string> = {
  KR: "bg-rose-500", VN: "bg-red-500", US: "bg-blue-500",
  JP: "bg-pink-500", TH: "bg-indigo-500", PH: "bg-sky-500",
  ID: "bg-red-600", GB: "bg-blue-700", AU: "bg-emerald-600",
  DE: "bg-yellow-600", IN: "bg-orange-500", CN: "bg-red-700",
  ES: "bg-amber-500",
};

export default function CountrySelectScreen({ lang, onSelect, onBack }: CountrySelectScreenProps) {
  const [search, setSearch] = useState("");
  const l = lang.startsWith("en") ? "en" : lang;

  const getName = (c: CountryInfo) =>
    COUNTRY_NAMES[c.code]?.[l] || COUNTRY_NAMES[c.code]?.en || c.nameLocal;

  const filtered = useMemo(() => {
    if (!search.trim()) return SUPPORTED_COUNTRIES;
    const q = search.toLowerCase();
    return SUPPORTED_COUNTRIES.filter((c) => {
      const name = getName(c).toLowerCase();
      return name.includes(q) || c.nameEn.toLowerCase().includes(q) || c.nameLocal.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    });
  }, [search, l]);

  // Sort: DB available first, then alphabetical by name
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.hasDB && !b.hasDB) return -1;
      if (!a.hasDB && b.hasDB) return 1;
      return getName(a).localeCompare(getName(b));
    });
  }, [filtered, l]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col max-w-[480px] mx-auto">
      <div className="px-3 pt-3">
        <BackButton onClick={onBack} lang={lang} />
      </div>

      <div className="px-6 pt-2 pb-4 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <span className="text-2xl">📍</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {TITLE[l] || TITLE.en}
        </h1>
        <p className="text-sm text-gray-400">
          {SUBTITLE[l] || SUBTITLE.en}
        </p>
      </div>

      <div className="px-6 pb-3">
        <div className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-3">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={SEARCH_PH[l] || SEARCH_PH.en}
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-2">
          {sorted.map((country) => (
            <button
              key={country.code}
              onClick={() => onSelect(country.code)}
              className="w-full h-14 flex items-center px-4 rounded-[20px] bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <img src={getFlagUrl(country.code)} alt={country.code} className="w-8 h-8 flex-shrink-0 rounded-sm object-contain" loading="lazy" />
              <span className={`ml-3 w-8 py-0.5 rounded-md text-[10px] font-bold text-white text-center flex-shrink-0 ${CODE_COLORS[country.code] || "bg-gray-500"}`}>
                {country.code}
              </span>
              <span className="ml-3 flex-1 text-[15px] font-semibold text-gray-700 text-left truncate">
                {getName(country)}
              </span>
              {!country.hasDB && (
                <span className="ml-2 px-2.5 py-1 bg-gray-400 text-white text-[10px] font-bold rounded-full flex-shrink-0">
                  {PREPARING[l] || PREPARING.en}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
