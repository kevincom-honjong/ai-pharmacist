// Specialty mapping: comboKey → specialty info
export interface SpecialtyInfo {
  searchQuery: string; // Google Maps search term
  nameKR: string;
  nameEN: string;
  nameVI: string;
}

// Map hospital warning combo keys to medical specialties
const COMBO_SPECIALTY: Record<string, SpecialtyInfo> = {
  // Headache combos
  "nausea": { searchQuery: "neurology clinic", nameKR: "신경과", nameEN: "Neurology", nameVI: "Khoa thần kinh" },

  // Fever combos
  "rash": { searchQuery: "dermatology clinic", nameKR: "피부과", nameEN: "Dermatology", nameVI: "Khoa da liễu" },

  // Cough combos
  "breathless": { searchQuery: "pulmonology clinic", nameKR: "호흡기내과", nameEN: "Pulmonology", nameVI: "Khoa hô hấp" },

  // Sore throat combos
  "swallowHighFever": { searchQuery: "ENT clinic", nameKR: "이비인후과", nameEN: "ENT", nameVI: "Khoa tai mũi họng" },

  // Stomachache combos (appendicitis)
  "fever": { searchQuery: "emergency hospital", nameKR: "응급실", nameEN: "Emergency Room", nameVI: "Phòng cấp cứu" },

  // Diarrhea combos
  "bloodyStool": { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },

  // Skin combos
  "swellingBreathless": { searchQuery: "emergency hospital", nameKR: "응급실", nameEN: "Emergency Room", nameVI: "Phòng cấp cứu" },

  // Menstrual combos
  "heavyBleeding": { searchQuery: "gynecology clinic", nameKR: "산부인과", nameEN: "Gynecology", nameVI: "Khoa phụ khoa" },

  // Toothache combos
  "gumSwollen": { searchQuery: "dentist", nameKR: "치과", nameEN: "Dentist", nameVI: "Nha khoa" },
  "faceSwelling": { searchQuery: "dentist emergency", nameKR: "치과 응급", nameEN: "Emergency Dentist", nameVI: "Nha khoa cấp cứu" },

  // Back pain combos
  "legNumb": { searchQuery: "orthopedics clinic", nameKR: "정형외과", nameEN: "Orthopedics", nameVI: "Khoa chỉnh hình" },
  "urineIssue": { searchQuery: "urology clinic", nameKR: "비뇨기과", nameEN: "Urology", nameVI: "Khoa tiết niệu" },

  // Eye combos
  "discharge": { searchQuery: "ophthalmology clinic", nameKR: "안과", nameEN: "Ophthalmology", nameVI: "Khoa mắt" },
  "visionChange": { searchQuery: "ophthalmology emergency", nameKR: "안과 응급", nameEN: "Eye Emergency", nameVI: "Cấp cứu mắt" },

  // Allergy combos
  "coughBreathless": { searchQuery: "pulmonology clinic", nameKR: "호흡기내과", nameEN: "Pulmonology", nameVI: "Khoa hô hấp" },

  // Joint combos
  "swellingRedness": { searchQuery: "rheumatology clinic", nameKR: "류마티스내과", nameEN: "Rheumatology", nameVI: "Khoa thấp khớp" },

  // Constipation combos
  // "bloodyStool" already defined above

  // Nausea combos
  "pregnancy": { searchQuery: "gynecology clinic", nameKR: "산부인과", nameEN: "OB/GYN", nameVI: "Khoa phụ sản" },
};

// Default specialty when no specific mapping exists
const DEFAULT_SPECIALTY: SpecialtyInfo = {
  searchQuery: "hospital",
  nameKR: "병원",
  nameEN: "Hospital",
  nameVI: "Bệnh viện",
};

export function getSpecialty(comboKey: string): SpecialtyInfo {
  return COMBO_SPECIALTY[comboKey] || DEFAULT_SPECIALTY;
}

export function getSpecialtyName(specialty: SpecialtyInfo, lang: string): string {
  if (lang === "vi") return specialty.nameVI;
  if (lang === "en") return specialty.nameEN;
  return specialty.nameKR;
}

export function getMapsUrl(specialty: SpecialtyInfo): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(specialty.searchQuery + " near me")}`;
}

// Category-level specialty for result screen "find hospital" button
const CATEGORY_SPECIALTY: Record<string, SpecialtyInfo> = {
  headache: { searchQuery: "neurology clinic", nameKR: "신경과", nameEN: "Neurology", nameVI: "Khoa thần kinh" },
  fever: { searchQuery: "internal medicine clinic", nameKR: "내과", nameEN: "Internal Medicine", nameVI: "Khoa nội" },
  cough: { searchQuery: "pulmonology clinic", nameKR: "호흡기내과", nameEN: "Pulmonology", nameVI: "Khoa hô hấp" },
  runnyNose: { searchQuery: "ENT clinic", nameKR: "이비인후과", nameEN: "ENT", nameVI: "Khoa tai mũi họng" },
  soreThroat: { searchQuery: "ENT clinic", nameKR: "이비인후과", nameEN: "ENT", nameVI: "Khoa tai mũi họng" },
  stomachache: { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },
  diarrhea: { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },
  indigestion: { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },
  nausea: { searchQuery: "internal medicine clinic", nameKR: "내과", nameEN: "Internal Medicine", nameVI: "Khoa nội" },
  musclePain: { searchQuery: "orthopedics clinic", nameKR: "정형외과", nameEN: "Orthopedics", nameVI: "Khoa chỉnh hình" },
  backPain: { searchQuery: "orthopedics clinic", nameKR: "정형외과", nameEN: "Orthopedics", nameVI: "Khoa chỉnh hình" },
  allergy: { searchQuery: "allergy clinic", nameKR: "알레르기내과", nameEN: "Allergist", nameVI: "Khoa dị ứng" },
  skinRash: { searchQuery: "dermatology clinic", nameKR: "피부과", nameEN: "Dermatology", nameVI: "Khoa da liễu" },
  menstrualPain: { searchQuery: "gynecology clinic", nameKR: "산부인과", nameEN: "Gynecology", nameVI: "Khoa phụ khoa" },
  toothache: { searchQuery: "dentist", nameKR: "치과", nameEN: "Dentist", nameVI: "Nha khoa" },
  eyeStrain: { searchQuery: "ophthalmology clinic", nameKR: "안과", nameEN: "Ophthalmology", nameVI: "Khoa mắt" },
  heartburn: { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },
  constipation: { searchQuery: "gastroenterology clinic", nameKR: "소화기내과", nameEN: "Gastroenterology", nameVI: "Khoa tiêu hóa" },
  insomnia: { searchQuery: "psychiatry clinic", nameKR: "정신건강의학과", nameEN: "Psychiatry", nameVI: "Khoa tâm thần" },
  jointPain: { searchQuery: "orthopedics clinic", nameKR: "정형외과", nameEN: "Orthopedics", nameVI: "Khoa chỉnh hình" },
};

export function getCategorySpecialty(categoryId: string): SpecialtyInfo {
  return CATEGORY_SPECIALTY[categoryId] || DEFAULT_SPECIALTY;
}
