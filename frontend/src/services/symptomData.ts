// === Types ===

export interface DrugEntry {
  id: string;
  nameKR: string;
  nameVN: string;
  nameUS: string;
  ingredient: string;
  dosageKR: string;
  dosageVN: string;
  dosageUS: string;
  precautionKR: string;
  precautionVN: string;
  precautionUS: string;
}

export interface DrugMatch {
  KR: [string, string]; // [1st choice id, 2nd choice id]
  VN: [string, string];
  US: [string, string];
}

export interface CompanionOption {
  key: string;
  labelKR: string;
  labelEN: string;
  labelVI: string;
  descKR?: string;
  descEN?: string;
  descVI?: string;
}

export interface FollowUpQuestion {
  id: string;
  questionKR: string;
  questionEN: string;
  questionVI: string;
  options: {
    labelKR: string;
    labelEN: string;
    labelVI: string;
  }[];
}

export interface SymptomComboResult {
  comboKey: string; // sorted companion keys joined, e.g. "fever+runnyNose" or "none"
  hospitalWarning?: boolean;
  warningKR?: string;
  warningEN?: string;
  warningVI?: string;
  followUpQuestions?: FollowUpQuestion[];
  // drug matches keyed by follow-up answer path (e.g. "0-1-2") or "default" for no follow-up
  drugMatches: Record<string, DrugMatch>;
}

export interface SymptomCategory {
  id: string;
  nameKR: string;
  nameEN: string;
  nameVI: string;
  descKR: string;
  descEN: string;
  descVI: string;
  companions: CompanionOption[];
  combos: SymptomComboResult[];
}

// === Drug Database ===

export const DRUGS: Record<string, DrugEntry> = {
  // === Headache drugs ===
  tylenol_500_kr: { id: "tylenol_500_kr", nameKR: "타이레놀 500mg", nameVN: "Tylenol 500mg", nameUS: "Tylenol 500mg", ingredient: "Acetaminophen 500mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "하루 최대 4g, 음주 시 주의", precautionVN: "Tối đa 4g/ngày, tránh rượu", precautionUS: "Max 3g/day, avoid alcohol" },
  brufen_200_kr: { id: "brufen_200_kr", nameKR: "부루펜 200mg", nameVN: "Brufen 200mg", nameUS: "Brufen 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 4~6시간 간격, 식후", dosageVN: "1 viên, cách 4-6 giờ, sau ăn", dosageUS: "1 tablet, every 4-6 hours, with food", precautionKR: "공복 복용 피할 것, 위장장애 주의", precautionVN: "Tránh uống khi đói, cẩn thận dạ dày", precautionUS: "Avoid on empty stomach" },
  panadol_500_vn: { id: "panadol_500_vn", nameKR: "파나돌 500mg", nameVN: "Panadol 500mg", nameUS: "Panadol 500mg", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "하루 최대 8정", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 tablets/day" },
  efferalgan_500_vn: { id: "efferalgan_500_vn", nameKR: "에페랄간 500mg", nameVN: "Efferalgan 500mg", nameUS: "Efferalgan 500mg", ingredient: "Paracetamol 500mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên sủi, hòa nước, cách 4-6 giờ", dosageUS: "1 effervescent tablet, dissolve in water", precautionKR: "간 질환자 주의", precautionVN: "Cẩn thận bệnh gan", precautionUS: "Caution with liver disease" },
  tylenol_500_us: { id: "tylenol_500_us", nameKR: "타이레놀 500mg", nameVN: "Tylenol 500mg", nameUS: "Tylenol 500mg", ingredient: "Acetaminophen 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "하루 최대 3g", precautionVN: "Tối đa 3g/ngày", precautionUS: "Max 3g/day, avoid alcohol" },
  advil_200_us: { id: "advil_200_us", nameKR: "애드빌 200mg", nameVN: "Advil 200mg", nameUS: "Advil 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "공복 복용 피할 것", precautionVN: "Tránh uống khi đói", precautionUS: "Take with food, avoid on empty stomach" },

  // Severe headache
  ezn6_kr: { id: "ezn6_kr", nameKR: "이지엔6", nameVN: "EZN6", nameUS: "EZN6", ingredient: "Ibuprofen 200mg + Acetaminophen 125mg + Caffeine 50mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "위장 장애 주의, 식후 복용", precautionVN: "Cẩn thận dạ dày, uống sau ăn", precautionUS: "Take with food, stomach caution" },
  geborin_kr: { id: "geborin_kr", nameKR: "게보린", nameVN: "Geborin", nameUS: "Geborin", ingredient: "Acetaminophen 300mg + Caffeine + Isopropylantipyrine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "장기 복용 금지, 15세 미만 금지", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term" },
  hapacol_650_vn: { id: "hapacol_650_vn", nameKR: "하파콜 650mg", nameVN: "Hapacol 650mg", nameUS: "Hapacol 650mg", ingredient: "Paracetamol 650mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "하루 최대 6정", precautionVN: "Tối đa 6 viên/ngày", precautionUS: "Max 6 tablets/day" },
  panadol_extra_vn: { id: "panadol_extra_vn", nameKR: "파나돌 엑스트라", nameVN: "Panadol Extra", nameUS: "Panadol Extra", ingredient: "Paracetamol 500mg + Caffeine 65mg", dosageKR: "1~2정, 하루 3~4회", dosageVN: "1-2 viên, 3-4 lần/ngày", dosageUS: "1-2 tablets, 3-4 times/day", precautionKR: "카페인 민감자 주의", precautionVN: "Cẩn thận nếu nhạy cảm caffeine", precautionUS: "Caution if caffeine sensitive" },
  excedrin_us: { id: "excedrin_us", nameKR: "엑세드린", nameVN: "Excedrin", nameUS: "Excedrin", ingredient: "Acetaminophen 250mg + Aspirin 250mg + Caffeine 65mg", dosageKR: "2정, 6시간 간격", dosageVN: "2 viên, cách 6 giờ", dosageUS: "2 tablets, every 6 hours", precautionKR: "위장 출혈 주의, 18세 미만 금지", precautionVN: "Cẩn thận xuất huyết dạ dày", precautionUS: "Risk of stomach bleeding, not for under 18" },
  advil_400_us: { id: "advil_400_us", nameKR: "애드빌 400mg", nameVN: "Advil 400mg", nameUS: "Advil 400mg", ingredient: "Ibuprofen 400mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "고용량 위장 부담, 식후 필수", precautionVN: "Uống sau ăn, cẩn thận dạ dày", precautionUS: "Take with food, higher GI risk" },

  // Cold combination drugs
  pancol_a_kr: { id: "pancol_a_kr", nameKR: "판콜에이", nameVN: "Pancol-A", nameUS: "Pancol-A", ingredient: "Acetaminophen + Chlorpheniramine + Pseudoephedrine + Dextromethorphan", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "졸음 유발 가능, 운전 주의", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },
  tylenol_cold_kr: { id: "tylenol_cold_kr", nameKR: "타이레놀 콜드", nameVN: "Tylenol Cold", nameUS: "Tylenol Cold", ingredient: "Acetaminophen + Pseudoephedrine + Dextromethorphan + Chlorpheniramine", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "운전 주의, 다른 해열제와 중복 금지", precautionVN: "Không lái xe, không dùng với thuốc hạ sốt khác", precautionUS: "Do not drive, avoid other acetaminophen products" },
  decolgen_forte_vn: { id: "decolgen_forte_vn", nameKR: "데콜겐 포르테", nameVN: "Decolgen Forte", nameUS: "Decolgen Forte", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 3~4회", dosageVN: "1 viên, 3-4 lần/ngày", dosageUS: "1 tablet, 3-4 times/day", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "May cause drowsiness" },
  tiffy_vn: { id: "tiffy_vn", nameKR: "티피", nameVN: "Tiffy", nameUS: "Tiffy", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2-3 lần/ngày", dosageUS: "1 tablet, 2-3 times/day", precautionKR: "고혈압 환자 주의", precautionVN: "Cẩn thận bệnh cao huyết áp", precautionUS: "Caution with hypertension" },
  dayquil_us: { id: "dayquil_us", nameKR: "데이퀼", nameVN: "DayQuil", nameUS: "DayQuil", ingredient: "Acetaminophen + Dextromethorphan + Phenylephrine", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "하루 최대 8캡슐", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 capsules/day" },
  tylenol_coldfl_us: { id: "tylenol_coldfl_us", nameKR: "타이레놀 콜드&플루", nameVN: "Tylenol Cold & Flu", nameUS: "Tylenol Cold & Flu", ingredient: "Acetaminophen + Phenylephrine + Dextromethorphan + Guaifenesin", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "다른 아세트아미노펜 제품 병용 금지", precautionVN: "Không dùng với sản phẩm paracetamol khác", precautionUS: "Do not combine with other acetaminophen products" },

  // Migraine
  penzal_kr: { id: "penzal_kr", nameKR: "펜잘", nameVN: "Penzal", nameUS: "Penzal", ingredient: "Ibuprofen Arginine 400mg", dosageKR: "1정, 증상 시작 시 빠르게", dosageVN: "1 viên, uống ngay khi có triệu chứng", dosageUS: "1 tablet at onset", precautionKR: "식후 복용 권장", precautionVN: "Nên uống sau ăn", precautionUS: "Take with food" },
  excedrin_migraine_us: { id: "excedrin_migraine_us", nameKR: "엑세드린 마이그레인", nameVN: "Excedrin Migraine", nameUS: "Excedrin Migraine", ingredient: "Acetaminophen 250mg + Aspirin 250mg + Caffeine 65mg", dosageKR: "2정, 증상 시작 시", dosageVN: "2 viên, khi bắt đầu triệu chứng", dosageUS: "2 tablets at onset of migraine", precautionKR: "하루 2정 초과 금지", precautionVN: "Không quá 2 viên/ngày", precautionUS: "Do not exceed 2 tablets/day" },
  advil_migraine_us: { id: "advil_migraine_us", nameKR: "애드빌 마이그레인", nameVN: "Advil Migraine", nameUS: "Advil Migraine", ingredient: "Ibuprofen 200mg (Solubilized)", dosageKR: "1캡슐, 증상 시작 시", dosageVN: "1 viên nang, khi bắt đầu triệu chứng", dosageUS: "1 capsule at onset", precautionKR: "하루 2캡슐 초과 금지", precautionVN: "Không quá 2 viên/ngày", precautionUS: "Max 2 capsules/day" },

  // Tension headache
  advil_liquigel_kr: { id: "advil_liquigel_kr", nameKR: "애드빌 리퀴겔", nameVN: "Advil Liqui-Gels", nameUS: "Advil Liqui-Gels", ingredient: "Ibuprofen 200mg (Solubilized)", dosageKR: "1캡슐, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 capsule, every 4-6 hours", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take with food" },
  ibuprofen_400_vn: { id: "ibuprofen_400_vn", nameKR: "부루펜 400mg", nameVN: "Gofen 400mg", nameUS: "Motrin IB 400mg", ingredient: "Ibuprofen 400mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "식후 복용 필수", precautionVN: "Phải uống sau ăn", precautionUS: "Must take with food" },
  salonpas_vn: { id: "salonpas_vn", nameKR: "살론파스 패치", nameVN: "Salonpas (Miếng dán)", nameUS: "Salonpas Patch", ingredient: "Methyl Salicylate + Menthol", dosageKR: "1매, 목/어깨 부착, 8시간", dosageVN: "1 miếng, dán cổ/vai, 8 giờ", dosageUS: "1 patch on neck/shoulder, 8 hours", precautionKR: "피부 자극 시 제거, 아스피린 알레르기 주의", precautionVN: "Gỡ nếu kích ứng da", precautionUS: "Remove if skin irritation occurs" },
  aleve_us: { id: "aleve_us", nameKR: "탁센", nameVN: "Anaprox", nameUS: "Aleve", ingredient: "Naproxen Sodium 220mg", dosageKR: "1정, 8~12시간 간격", dosageVN: "1 viên, cách 8-12 giờ", dosageUS: "1 tablet, every 8-12 hours", precautionKR: "위장 질환 시 주의", precautionVN: "Cẩn thận bệnh dạ dày", precautionUS: "Caution with stomach conditions" },

  // === Fever drugs ===
  hwatu_ben_kr: { id: "hwatu_ben_kr", nameKR: "화이투벤", nameVN: "Hwaitu-Ben", nameUS: "Hwaitu-Ben", ingredient: "Acetaminophen + Guaifenesin + Pseudoephedrine + Dextromethorphan", dosageKR: "1캡슐, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 3 times/day", precautionKR: "졸음 주의, 운전 주의", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },
  ameflu_vn: { id: "ameflu_vn", nameKR: "아메플루", nameVN: "Ameflu", nameUS: "Ameflu", ingredient: "Paracetamol + Chlorpheniramine + Phenylephrine", dosageKR: "1~2정, 4시간 간격", dosageVN: "1-2 viên, cách 4 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tablets, every 4 hours", precautionKR: "하루 최대 8정", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 tablets/day" },
  new_ameflu_vn: { id: "new_ameflu_vn", nameKR: "뉴 아메플루 데이타임", nameVN: "New Ameflu Daytime", nameUS: "New Ameflu Daytime", ingredient: "Paracetamol + Phenylephrine + Dextromethorphan", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "졸음 적음 (주간용)", precautionVN: "Ít buồn ngủ (dùng ban ngày)", precautionUS: "Non-drowsy (daytime formula)" },
  nyquil_us: { id: "nyquil_us", nameKR: "나이퀼", nameVN: "NyQuil", nameUS: "NyQuil", ingredient: "Acetaminophen + Dextromethorphan + Doxylamine", dosageKR: "2캡슐, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 capsules at bedtime", precautionKR: "야간 전용, 강한 졸음 유발", precautionVN: "Chỉ dùng ban đêm, rất buồn ngủ", precautionUS: "Nighttime only, causes strong drowsiness" },
  tylenol_coldsevere_us: { id: "tylenol_coldsevere_us", nameKR: "타이레놀 콜드&플루 시비어", nameVN: "Tylenol Cold & Flu Severe", nameUS: "Tylenol Cold & Flu Severe", ingredient: "Acetaminophen + Phenylephrine + Dextromethorphan + Guaifenesin", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "최대 10캡슐/일", precautionVN: "Tối đa 10 viên/ngày", precautionUS: "Max 10 capsules/day" },
  theraflu_us: { id: "theraflu_us", nameKR: "테라플루", nameVN: "Theraflu", nameUS: "Theraflu", ingredient: "Acetaminophen + Pheniramine + Phenylephrine", dosageKR: "1포, 뜨거운 물에 타서 복용", dosageVN: "1 gói, pha nước nóng", dosageUS: "1 packet dissolved in hot water", precautionKR: "하루 최대 4포", precautionVN: "Tối đa 4 gói/ngày", precautionUS: "Max 4 packets/day" },

  // Stomach / diarrhea combos
  jungrowhan_kr: { id: "jungrowhan_kr", nameKR: "정로환", nameVN: "Jungrowhan", nameUS: "Jungrowhan", ingredient: "Berberine + Wood Creosote", dosageKR: "3정, 하루 3회, 식후", dosageVN: "3 viên, 3 lần/ngày, sau ăn", dosageUS: "3 tablets, 3 times/day, after meals", precautionKR: "수분 보충 필수", precautionVN: "Phải bù nước", precautionUS: "Stay hydrated" },
  smecta_kr: { id: "smecta_kr", nameKR: "스멕타", nameVN: "Smecta", nameUS: "Smecta", ingredient: "Diosmectite 3g", dosageKR: "1포, 하루 3회, 식간", dosageVN: "1 gói, 3 lần/ngày, giữa bữa ăn", dosageUS: "1 sachet, 3 times/day, between meals", precautionKR: "다른 약과 2시간 간격", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other medications" },
  berberin_vn: { id: "berberin_vn", nameKR: "베르베린", nameVN: "Berberin", nameUS: "Berberin", ingredient: "Berberine 100mg", dosageKR: "2정, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", precautionKR: "임산부 사용 금지", precautionVN: "Không dùng cho phụ nữ mang thai", precautionUS: "Not for pregnant women" },
  pepto_us: { id: "pepto_us", nameKR: "펩토비스몰", nameVN: "Pepto-Bismol", nameUS: "Pepto-Bismol", ingredient: "Bismuth Subsalicylate 262mg", dosageKR: "2정, 30분~1시간 간격", dosageVN: "2 viên, cách 30-60 phút", dosageUS: "2 tablets, every 30-60 min as needed", precautionKR: "아스피린 알레르기 시 금지, 혀/변 검게 변할 수 있음", precautionVN: "Không dùng nếu dị ứng aspirin", precautionUS: "Avoid if allergic to aspirin, may darken tongue/stool" },
  imodium_us: { id: "imodium_us", nameKR: "이모디움", nameVN: "Imodium", nameUS: "Imodium", ingredient: "Loperamide 2mg", dosageKR: "초회 2정, 이후 1정씩", dosageVN: "Lần đầu 2 viên, sau đó 1 viên", dosageUS: "2 caplets initially, then 1 after each loose stool", precautionKR: "혈변/고열 시 사용 금지", precautionVN: "Không dùng khi phân máu/sốt cao", precautionUS: "Do not use with bloody stool or high fever" },

  // Throat
  strepsils_kr: { id: "strepsils_kr", nameKR: "스트렙실", nameVN: "Strepsils", nameUS: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격, 천천히 녹여", dosageVN: "1 viên, cách 2-3 giờ, ngậm tan", dosageUS: "1 lozenge, every 2-3 hours, dissolve slowly", precautionKR: "하루 8정 이하", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 lozenges/day" },
  cepacol_us: { id: "cepacol_us", nameKR: "세파콜", nameVN: "Cepacol", nameUS: "Cepacol", ingredient: "Benzocaine 15mg + Menthol 3.6mg", dosageKR: "1정, 2시간 간격, 천천히 녹여", dosageVN: "1 viên, cách 2 giờ, ngậm tan", dosageUS: "1 lozenge, every 2 hours, dissolve slowly", precautionKR: "하루 10정 이하", precautionVN: "Tối đa 10 viên/ngày", precautionUS: "Max 10 lozenges/day" },

  // === Cough drugs ===
  codenal_kr: { id: "codenal_kr", nameKR: "코데날 시럽", nameVN: "Codenal Syrup", nameUS: "Codenal Syrup", ingredient: "Dihydrocodeine + Methylephedrine", dosageKR: "5ml, 하루 3회", dosageVN: "5ml, 3 lần/ngày", dosageUS: "5ml, 3 times/day", precautionKR: "졸음 유발, 운전 주의", precautionVN: "Gây buồn ngủ, không lái xe", precautionUS: "May cause drowsiness, do not drive" },
  tushira_kr: { id: "tushira_kr", nameKR: "터시라", nameVN: "Tushira", nameUS: "Tushira", ingredient: "Pentoxyverine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "어지러움 가능", precautionVN: "Có thể gây chóng mặt", precautionUS: "May cause dizziness" },
  bophe_vn: { id: "bophe_vn", nameKR: "보페남하 시럽", nameVN: "Bổ Phế Nam Hà", nameUS: "Bo Phe Nam Ha Syrup", ingredient: "Herbal extract complex", dosageKR: "10ml, 하루 3회", dosageVN: "10ml, 3 lần/ngày", dosageUS: "10ml, 3 times/day", precautionKR: "당뇨 환자는 무설탕 선택", precautionVN: "Bệnh tiểu đường chọn loại không đường", precautionUS: "Diabetics should choose sugar-free version" },
  prospan_vn: { id: "prospan_vn", nameKR: "프로스판 시럽", nameVN: "Prospan", nameUS: "Prospan Syrup", ingredient: "Ivy leaf extract (Hedera helix)", dosageKR: "5ml, 하루 3회", dosageVN: "5ml, 3 lần/ngày", dosageUS: "5ml, 3 times/day", precautionKR: "자연 성분, 부작용 적음", precautionVN: "Thành phần tự nhiên, ít tác dụng phụ", precautionUS: "Natural ingredient, minimal side effects" },
  delsym_us: { id: "delsym_us", nameKR: "델심", nameVN: "Delsym", nameUS: "Delsym", ingredient: "Dextromethorphan Extended-Release", dosageKR: "10ml, 12시간 간격", dosageVN: "10ml, cách 12 giờ", dosageUS: "10ml, every 12 hours", precautionKR: "졸음 가능, 12시간 지속형", precautionVN: "Có thể buồn ngủ, tác dụng 12 giờ", precautionUS: "May cause drowsiness, 12-hour formula" },
  robitussin_dm_us: { id: "robitussin_dm_us", nameKR: "로비투신 DM", nameVN: "Robitussin DM", nameUS: "Robitussin DM", ingredient: "Dextromethorphan + Guaifenesin", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, cách 4 giờ", dosageUS: "10ml, every 4 hours", precautionKR: "하루 최대 6회", precautionVN: "Tối đa 6 lần/ngày", precautionUS: "Max 6 doses/day" },
  mucopect_kr: { id: "mucopect_kr", nameKR: "뮤코펙트", nameVN: "Mucopect", nameUS: "Mucopect", ingredient: "Ambroxol 30mg", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tablet, 3 times/day, after meals", precautionKR: "식후 복용, 수분 충분히 섭취", precautionVN: "Uống sau ăn, uống nhiều nước", precautionUS: "Take after meals, drink plenty of water" },
  copus_kr: { id: "copus_kr", nameKR: "코푸시럽", nameVN: "Copus Syrup", nameUS: "Copus Syrup", ingredient: "Guaifenesin + Bromhexine", dosageKR: "10ml, 하루 3회", dosageVN: "10ml, 3 lần/ngày", dosageUS: "10ml, 3 times/day", precautionKR: "수분 충분히 섭취", precautionVN: "Uống nhiều nước", precautionUS: "Drink plenty of water" },
  acc200_vn: { id: "acc200_vn", nameKR: "ACC 200", nameVN: "ACC 200", nameUS: "ACC 200", ingredient: "Acetylcysteine 200mg", dosageKR: "1포, 하루 2~3회, 물에 녹여", dosageVN: "1 gói, 2-3 lần/ngày, hòa nước", dosageUS: "1 sachet, 2-3 times/day, dissolve in water", precautionKR: "물에 녹여 복용", precautionVN: "Hòa tan trong nước", precautionUS: "Dissolve in water before taking" },
  mucosolvan_vn: { id: "mucosolvan_vn", nameKR: "뮤코솔반", nameVN: "Mucosolvan", nameUS: "Mucosolvan", ingredient: "Ambroxol 30mg", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tablet, 3 times/day, after meals", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals" },
  mucinex_us: { id: "mucinex_us", nameKR: "뮤시넥스", nameVN: "Mucinex", nameUS: "Mucinex", ingredient: "Guaifenesin 600mg Extended-Release", dosageKR: "1정, 12시간 간격", dosageVN: "1 viên, cách 12 giờ", dosageUS: "1 tablet, every 12 hours", precautionKR: "물 많이 마시기, 씹지 말 것", precautionVN: "Uống nhiều nước, không nhai", precautionUS: "Drink plenty of water, do not crush" },
  robitussin_chest_us: { id: "robitussin_chest_us", nameKR: "로비투신 체스트", nameVN: "Robitussin Chest", nameUS: "Robitussin Chest Congestion", ingredient: "Guaifenesin", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, cách 4 giờ", dosageUS: "10ml, every 4 hours", precautionKR: "하루 최대 6회", precautionVN: "Tối đa 6 lần/ngày", precautionUS: "Max 6 doses/day" },
  mokan_kr: { id: "mokan_kr", nameKR: "목앤", nameVN: "Mokan", nameUS: "Mokan", ingredient: "Cetylpyridinium", dosageKR: "수시로 사용", dosageVN: "Dùng khi cần", dosageUS: "Use as needed", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  eugica_vn: { id: "eugica_vn", nameKR: "유지카 캡슐", nameVN: "Eugica", nameUS: "Eugica Capsule", ingredient: "Eucalyptus oil complex", dosageKR: "2캡슐, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 capsules, 3 times/day", precautionKR: "자연 성분", precautionVN: "Thành phần tự nhiên", precautionUS: "Natural ingredients" },
  halls_us: { id: "halls_us", nameKR: "홀스", nameVN: "Halls", nameUS: "Halls", ingredient: "Menthol", dosageKR: "1정, 수시로", dosageVN: "1 viên, khi cần", dosageUS: "1 drop, as needed", precautionKR: "과다 사용 주의", precautionVN: "Không dùng quá nhiều", precautionUS: "Do not overuse" },
  actifed_kr: { id: "actifed_kr", nameKR: "액티피드", nameVN: "Actifed", nameUS: "Actifed", ingredient: "Triprolidine + Pseudoephedrine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "졸음 유발 가능", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },

  // === Runny/Stuffy nose drugs ===
  contac600_kr: { id: "contac600_kr", nameKR: "컨택600", nameVN: "Contac 600", nameUS: "Contac 600", ingredient: "Pseudoephedrine Extended-Release", dosageKR: "1정, 12시간 간격", dosageVN: "1 viên, cách 12 giờ", dosageUS: "1 tablet, every 12 hours", precautionKR: "불면 유발 가능, 취침 전 복용 주의", precautionVN: "Có thể mất ngủ", precautionUS: "May cause insomnia, avoid before bedtime" },
  otrivin_kr: { id: "otrivin_kr", nameKR: "오트리빈 스프레이", nameVN: "Otrivin Spray", nameUS: "Otrivin Spray", ingredient: "Xylometazoline", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "Xịt 1-2 lần, 2-3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", precautionKR: "3일 이상 연속 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 consecutive days" },
  otrivin_vn: { id: "otrivin_vn", nameKR: "오트리빈 스프레이", nameVN: "Otrivin Spray", nameUS: "Otrivin Spray", ingredient: "Xylometazoline", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "Xịt 1-2 lần, 2-3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days of use" },
  coldib_vn: { id: "coldib_vn", nameKR: "콜디-B", nameVN: "Coldi-B", nameUS: "Coldi-B", ingredient: "Naphazoline", dosageKR: "2~3방울, 하루 3회", dosageVN: "2-3 giọt, 3 lần/ngày", dosageUS: "2-3 drops, 3 times/day", precautionKR: "단기 사용만", precautionVN: "Chỉ dùng ngắn hạn", precautionUS: "Short-term use only" },
  sudafed_us: { id: "sudafed_us", nameKR: "수다페드", nameVN: "Sudafed", nameUS: "Sudafed", ingredient: "Pseudoephedrine 30mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "고혈압 환자 주의", precautionVN: "Cẩn thận cao huyết áp", precautionUS: "Caution with high blood pressure" },
  afrin_us: { id: "afrin_us", nameKR: "아프린 스프레이", nameVN: "Afrin Spray", nameUS: "Afrin Nasal Spray", ingredient: "Oxymetazoline", dosageKR: "2~3회 분사, 12시간 간격", dosageVN: "Xịt 2-3 lần, cách 12 giờ", dosageUS: "2-3 sprays, every 12 hours", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days of use" },
  zyrtec_kr: { id: "zyrtec_kr", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness" },
  claritin_kr: { id: "claritin_kr", nameKR: "클라리틴", nameVN: "Claritin", nameUS: "Claritin", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음, 비진정 항히스타민", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy antihistamine" },
  cetirizine_vn: { id: "cetirizine_vn", nameKR: "지르텍", nameVN: "Zyrtec 10mg", nameUS: "Zyrtec 10mg", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness" },
  loratadine_vn: { id: "loratadine_vn", nameKR: "클라리틴", nameVN: "Claritin 10mg", nameUS: "Claritin 10mg", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy" },
  zyrtec_us: { id: "zyrtec_us", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness" },
  claritin_us: { id: "claritin_us", nameKR: "클라리틴", nameVN: "Claritin", nameUS: "Claritin", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy antihistamine" },
  sinechura_kr: { id: "sinechura_kr", nameKR: "시네츄라", nameVN: "Sinechura", nameUS: "Sinechura", ingredient: "Sinupret herbal complex", dosageKR: "2정, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", precautionKR: "한방 복합제, 부작용 적음", precautionVN: "Thảo dược, ít tác dụng phụ", precautionUS: "Herbal complex, minimal side effects" },
  advil_sinus_us: { id: "advil_sinus_us", nameKR: "애드빌 사이너스", nameVN: "Advil Sinus", nameUS: "Advil Sinus Congestion & Pain", ingredient: "Ibuprofen 200mg + Pseudoephedrine 30mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "고혈압 환자 주의, 식후 복용", precautionVN: "Cẩn thận cao huyết áp, uống sau ăn", precautionUS: "Caution with hypertension, take with food" },

  // === Sore throat drugs ===
  chloraseptic_us: { id: "chloraseptic_us", nameKR: "클로라셉틱 스프레이", nameVN: "Chloraseptic Spray", nameUS: "Chloraseptic Spray", ingredient: "Phenol 1.4%", dosageKR: "5회 분사, 2시간 간격", dosageVN: "Xịt 5 lần, cách 2 giờ", dosageUS: "5 sprays, every 2 hours", precautionKR: "삼키지 말 것", precautionVN: "Không nuốt", precautionUS: "Do not swallow" },

  // === Stomachache drugs ===
  buscopan_kr: { id: "buscopan_kr", nameKR: "부스코판", nameVN: "Buscopan", nameUS: "Buscopan", ingredient: "Hyoscine butylbromide 10mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "입 마름 가능, 녹내장 환자 금지", precautionVN: "Có thể khô miệng", precautionUS: "May cause dry mouth, avoid with glaucoma" },
  doctorbear_kr: { id: "doctorbear_kr", nameKR: "닥터베아", nameVN: "Doctor Bear", nameUS: "Doctor Bear", ingredient: "Trimebutine 100mg", dosageKR: "1정, 하루 3회, 식전", dosageVN: "1 viên, 3 lần/ngày, trước ăn", dosageUS: "1 tablet, 3 times/day, before meals", precautionKR: "식전 복용 권장", precautionVN: "Nên uống trước ăn", precautionUS: "Take before meals" },
  buscopan_vn: { id: "buscopan_vn", nameKR: "부스코판", nameVN: "Buscopan", nameUS: "Buscopan", ingredient: "Hyoscine butylbromide 10mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "입 마름 가능", precautionVN: "Có thể khô miệng", precautionUS: "May cause dry mouth" },
  nospa_vn: { id: "nospa_vn", nameKR: "노스파", nameVN: "No-Spa", nameUS: "No-Spa", ingredient: "Drotaverine 40mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "저혈압 환자 주의", precautionVN: "Cẩn thận huyết áp thấp", precautionUS: "Caution with low blood pressure" },
  gasx_us: { id: "gasx_us", nameKR: "가스-X", nameVN: "Gas-X", nameUS: "Gas-X", ingredient: "Simethicone 125mg", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Hầu như không có tác dụng phụ", precautionUS: "Very few side effects" },
  domperidone_kr: { id: "domperidone_kr", nameKR: "맥소롱정", nameVN: "Motilium-M", nameUS: "Motilium", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn, 3 lần/ngày", dosageUS: "1 tablet, before meals, 3 times/day", precautionKR: "심장 질환자 주의", precautionVN: "Cẩn thận bệnh tim", precautionUS: "Caution with heart conditions" },
  gashualmyeongsu_kr: { id: "gashualmyeongsu_kr", nameKR: "가스활명수", nameVN: "Gas Hwal Myeong Su", nameUS: "Gas Hwal Myeong Su", ingredient: "Korean herbal digestive", dosageKR: "1병, 식후", dosageVN: "1 chai, sau ăn", dosageUS: "1 bottle, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  motilium_vn: { id: "motilium_vn", nameKR: "모틸리움", nameVN: "Motilium", nameUS: "Motilium", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn, 3 lần/ngày", dosageUS: "1 tablet, before meals, 3 times/day", precautionKR: "심장 질환자 주의", precautionVN: "Cẩn thận bệnh tim", precautionUS: "Caution with heart conditions" },
  dramamine_us: { id: "dramamine_us", nameKR: "드라마민", nameVN: "Dramamine", nameUS: "Dramamine", ingredient: "Dimenhydrinate 50mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "강한 졸음 유발", precautionVN: "Gây buồn ngủ mạnh", precautionUS: "Causes strong drowsiness" },
  gelpos_kr: { id: "gelpos_kr", nameKR: "겔포스", nameVN: "Gelpos", nameUS: "Gelpos", ingredient: "Aluminium phosphate", dosageKR: "1포, 식간 또는 증상 시", dosageVN: "1 gói, giữa bữa ăn hoặc khi có triệu chứng", dosageUS: "1 sachet, between meals or when symptoms occur", precautionKR: "변비 가능, 장기 복용 주의", precautionVN: "Có thể gây táo bón", precautionUS: "May cause constipation" },
  almagel_kr: { id: "almagel_kr", nameKR: "알마겔", nameVN: "Almagel", nameUS: "Almagel", ingredient: "Aluminium hydroxide + Magnesium hydroxide", dosageKR: "10ml, 식간", dosageVN: "10ml, giữa bữa ăn", dosageUS: "10ml, between meals", precautionKR: "장기 복용 금지", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term" },
  phosphalugel_vn: { id: "phosphalugel_vn", nameKR: "포스팔루겔", nameVN: "Phosphalugel", nameUS: "Phosphalugel", ingredient: "Aluminium phosphate", dosageKR: "1~2포, 식간", dosageVN: "1-2 gói, giữa bữa ăn", dosageUS: "1-2 sachets, between meals", precautionKR: "변비 가능", precautionVN: "Có thể gây táo bón", precautionUS: "May cause constipation" },
  yumangel_vn: { id: "yumangel_vn", nameKR: "유망겔", nameVN: "Yumangel", nameUS: "Yumangel", ingredient: "Sucralfate complex", dosageKR: "1포, 식간", dosageVN: "1 gói, giữa bữa ăn", dosageUS: "1 sachet, between meals", precautionKR: "다른 약과 2시간 간격", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other meds" },
  tums_us: { id: "tums_us", nameKR: "텀스", nameVN: "Tums", nameUS: "Tums", ingredient: "Calcium carbonate 750mg", dosageKR: "2~4정, 증상 시", dosageVN: "2-4 viên, khi có triệu chứng", dosageUS: "2-4 tablets, as symptoms occur", precautionKR: "하루 최대 15정", precautionVN: "Tối đa 15 viên/ngày", precautionUS: "Max 15 tablets/day" },
  pepcid_us: { id: "pepcid_us", nameKR: "펩시드", nameVN: "Pepcid", nameUS: "Pepcid AC", ingredient: "Famotidine 20mg", dosageKR: "1정, 하루 1~2회", dosageVN: "1 viên, 1-2 lần/ngày", dosageUS: "1 tablet, 1-2 times/day", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease" },
  activated_charcoal_vn: { id: "activated_charcoal_vn", nameKR: "노스카본", nameVN: "Nocarbon", nameUS: "CharcoCaps", ingredient: "Activated Charcoal", dosageKR: "2~4정, 식후", dosageVN: "2-4 viên, sau ăn", dosageUS: "2-4 capsules, after meals", precautionKR: "다른 약과 2시간 간격 두기", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other meds" },
  airx_vn: { id: "airx_vn", nameKR: "에어-X", nameVN: "Air-X", nameUS: "Air-X", ingredient: "Simethicone + Activated charcoal", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  beano_us: { id: "beano_us", nameKR: "비노", nameVN: "Beano", nameUS: "Beano", ingredient: "Alpha-galactosidase enzyme", dosageKR: "2~3정, 식전", dosageVN: "2-3 viên, trước ăn", dosageUS: "2-3 tablets, before meals", precautionKR: "콩/채소 먹기 전 복용", precautionVN: "Uống trước khi ăn đậu/rau", precautionUS: "Take before eating beans/vegetables" },

  // === Diarrhea drugs ===
  smecta_vn: { id: "smecta_vn", nameKR: "스멕타", nameVN: "Smecta", nameUS: "Smecta", ingredient: "Diosmectite 3g", dosageKR: "1포, 하루 3회", dosageVN: "1 gói, 3 lần/ngày", dosageUS: "1 sachet, 3 times/day", precautionKR: "물에 녹여 복용", precautionVN: "Hòa tan trong nước", precautionUS: "Dissolve in water" },
  ors_kr: { id: "ors_kr", nameKR: "ORS 경구수액", nameVN: "ORS", nameUS: "ORS", ingredient: "Electrolyte complex (Na, K, Glucose)", dosageKR: "1포를 물 200ml에 타서 수시로", dosageVN: "1 gói pha 200ml nước, uống thường xuyên", dosageUS: "1 sachet in 200ml water, drink frequently", precautionKR: "설사 멈출 때까지 계속", precautionVN: "Tiếp tục đến khi hết tiêu chảy", precautionUS: "Continue until diarrhea stops" },
  pocari_kr: { id: "pocari_kr", nameKR: "포카리스웨트", nameVN: "Pocari Sweat", nameUS: "Pocari Sweat", ingredient: "Electrolyte drink", dosageKR: "수시로 섭취", dosageVN: "Uống thường xuyên", dosageUS: "Drink frequently", precautionKR: "당분 함량 있음", precautionVN: "Có chứa đường", precautionUS: "Contains sugar" },
  oresol_vn: { id: "oresol_vn", nameKR: "오레솔", nameVN: "Oresol", nameUS: "Oresol", ingredient: "Electrolyte complex (ORS)", dosageKR: "1포를 물 1L에 타서 수시로", dosageVN: "1 gói pha 1L nước, uống thường xuyên", dosageUS: "1 sachet in 1L water, drink frequently", precautionKR: "정확한 비율로 타기", precautionVN: "Pha đúng tỉ lệ", precautionUS: "Mix in correct proportions" },
  hydrite_vn: { id: "hydrite_vn", nameKR: "하이드라이트", nameVN: "Hydrite", nameUS: "Hydrite", ingredient: "Electrolyte complex", dosageKR: "1포, 물에 타서", dosageVN: "1 gói, hòa nước", dosageUS: "1 sachet, dissolve in water", precautionKR: "맛이 있어 아이도 복용 가능", precautionVN: "Có vị nên trẻ em cũng uống được", precautionUS: "Flavored, suitable for children" },
  pedialyte_us: { id: "pedialyte_us", nameKR: "페디아라이트", nameVN: "Pedialyte", nameUS: "Pedialyte", ingredient: "Electrolyte solution", dosageKR: "수시로 소량씩", dosageVN: "Uống từng ít một, thường xuyên", dosageUS: "Sip frequently, small amounts", precautionKR: "어린이/성인 모두 가능", precautionVN: "Dùng cho cả trẻ em và người lớn", precautionUS: "For children and adults" },
  dripdrop_us: { id: "dripdrop_us", nameKR: "드립드롭", nameVN: "DripDrop", nameUS: "DripDrop ORS", ingredient: "Medical-grade ORS complex", dosageKR: "1포, 물에 타서", dosageVN: "1 gói, hòa nước", dosageUS: "1 packet, mix in water", precautionKR: "의료 등급 ORS", precautionVN: "ORS cấp y tế", precautionUS: "Medical-grade oral rehydration" },

  // === Indigestion drugs ===
  beaze_kr: { id: "beaze_kr", nameKR: "베아제", nameVN: "Beaze", nameUS: "Beaze", ingredient: "Digestive enzyme complex", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  domperidone_vn: { id: "domperidone_vn", nameKR: "맥소롱정", nameVN: "Motilium-M 10mg", nameUS: "Motilium", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn, 3 lần/ngày", dosageUS: "1 tablet, before meals, 3 times/day", precautionKR: "심장 질환자 주의", precautionVN: "Cẩn thận bệnh tim", precautionUS: "Caution with heart conditions" },
  famotidine_kr: { id: "famotidine_kr", nameKR: "가스터 20mg", nameVN: "Pepcid 20mg", nameUS: "Pepcid AC 20mg", ingredient: "Famotidine 20mg", dosageKR: "1정, 하루 1~2회", dosageVN: "1 viên, 1-2 lần/ngày", dosageUS: "1 tablet, 1-2 times/day", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease" },
  phazyme_us: { id: "phazyme_us", nameKR: "파자임", nameVN: "Phazyme", nameUS: "Phazyme", ingredient: "Simethicone 250mg", dosageKR: "1정, 식후", dosageVN: "1 viên, sau ăn", dosageUS: "1 softgel, after meals", precautionKR: "부작용 적음, 고용량", precautionVN: "Ít tác dụng phụ, liều cao", precautionUS: "Few side effects, high dose" },

  // === Nausea/Vomiting drugs ===
  kimite_kr: { id: "kimite_kr", nameKR: "키미테", nameVN: "Kimite", nameUS: "Kimite", ingredient: "Dimenhydrinate", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발, 운전 금지", precautionVN: "Gây buồn ngủ, không lái xe", precautionUS: "Causes drowsiness, do not drive" },
  bonaring_kr: { id: "bonaring_kr", nameKR: "보나링", nameVN: "Bonaring", nameUS: "Bonaring", ingredient: "Meclizine", dosageKR: "1정, 출발 1시간 전", dosageVN: "1 viên, 1 giờ trước khi đi", dosageUS: "1 tablet, 1 hour before travel", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Less drowsiness than alternatives" },
  nautamine_vn: { id: "nautamine_vn", nameKR: "노타민", nameVN: "Nautamine", nameUS: "Nautamine", ingredient: "Diphenhydramine", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness" },
  dimenhydrinate_vn: { id: "dimenhydrinate_vn", nameKR: "키미테", nameVN: "Dramamine 50mg", nameUS: "Dramamine Original", ingredient: "Dimenhydrinate 50mg", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness" },
  bonine_us: { id: "bonine_us", nameKR: "보닌", nameVN: "Bonine", nameUS: "Bonine", ingredient: "Meclizine 25mg", dosageKR: "1정, 출발 1시간 전", dosageVN: "1 viên, 1 giờ trước khi đi", dosageUS: "1 tablet, 1 hour before travel", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Less drowsy formula" },
  emetrol_us: { id: "emetrol_us", nameKR: "에메트롤", nameVN: "Emetrol", nameUS: "Emetrol", ingredient: "Phosphoric acid + sugar solution", dosageKR: "15~30ml, 15분 간격", dosageVN: "15-30ml, cách 15 phút", dosageUS: "15-30ml, every 15 minutes", precautionKR: "당뇨 환자 주의", precautionVN: "Cẩn thận bệnh tiểu đường", precautionUS: "Caution with diabetes" },

  // === Muscle pain drugs ===
  ibuprofen_200_kr: { id: "ibuprofen_200_kr", nameKR: "부루펜 200mg", nameVN: "Advil 200mg", nameUS: "Advil 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn, 3 lần/ngày", dosageUS: "1 tablet, with food, 3 times/day", precautionKR: "위장 장애 주의, 식후 필수", precautionVN: "Cẩn thận dạ dày, uống sau ăn", precautionUS: "Take with food, stomach caution" },
  ketotop_kr: { id: "ketotop_kr", nameKR: "케토톱 파스", nameVN: "Ketotop Patch", nameUS: "Ketotop Patch", ingredient: "Ketoprofen patch", dosageKR: "1매, 하루 1~2회 부착", dosageVN: "1 miếng, dán 1-2 lần/ngày", dosageUS: "1 patch, apply 1-2 times/day", precautionKR: "햇빛 노출 금지, 피부 자극 주의", precautionVN: "Tránh ánh nắng, cẩn thận kích ứng da", precautionUS: "Avoid sunlight exposure, watch for skin irritation" },
  airpas_kr: { id: "airpas_kr", nameKR: "에어파스", nameVN: "Air Pas", nameUS: "Air Pas", ingredient: "Methyl salicylate spray", dosageKR: "아픈 부위에 분사, 하루 3~4회", dosageVN: "Xịt vào vùng đau, 3-4 lần/ngày", dosageUS: "Spray on affected area, 3-4 times/day", precautionKR: "피부 자극 가능, 상처에 사용 금지", precautionVN: "Có thể kích ứng da, không dùng trên vết thương", precautionUS: "May irritate skin, do not use on wounds" },
  tigerbalm_vn: { id: "tigerbalm_vn", nameKR: "타이거밤", nameVN: "Tiger Balm (Dầu Cù Là)", nameUS: "Tiger Balm", ingredient: "Camphor + Menthol ointment", dosageKR: "아픈 부위에 도포", dosageVN: "Thoa vào vùng đau", dosageUS: "Apply to affected area", precautionKR: "눈 주변 금지, 피부 자극 주의", precautionVN: "Tránh vùng mắt", precautionUS: "Avoid eye area, watch for skin irritation" },
  icyhot_us: { id: "icyhot_us", nameKR: "아이시핫", nameVN: "Icy Hot", nameUS: "Icy Hot", ingredient: "Menthol + Methyl salicylate", dosageKR: "아픈 부위에 도포, 하루 3~4회", dosageVN: "Thoa vào vùng đau, 3-4 lần/ngày", dosageUS: "Apply to affected area, 3-4 times/day", precautionKR: "열 패드와 병용 금지", precautionVN: "Không dùng chung với miếng dán nhiệt", precautionUS: "Do not use with heating pads" },
  bengay_us: { id: "bengay_us", nameKR: "벤게이", nameVN: "Bengay", nameUS: "Bengay", ingredient: "Menthol + Methyl salicylate", dosageKR: "아픈 부위에 도포", dosageVN: "Thoa vào vùng đau", dosageUS: "Apply to affected area", precautionKR: "아스피린 알레르기 시 주의", precautionVN: "Cẩn thận nếu dị ứng aspirin", precautionUS: "Caution if allergic to aspirin" },

  // === Back pain drugs ===
  nacsen_kr: { id: "nacsen_kr", nameKR: "낙센", nameVN: "Anaprox", nameUS: "Aleve", ingredient: "Naproxen Sodium 220mg", dosageKR: "1정, 8~12시간 간격", dosageVN: "1 viên, cách 8-12 giờ", dosageUS: "1 tablet, every 8-12 hours", precautionKR: "장기 복용 금지, 위장 보호제 병용 권장", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term, consider stomach protection" },
  celebrex_vn: { id: "celebrex_vn", nameKR: "셀레브렉스", nameVN: "Celebrex", nameUS: "Celebrex", ingredient: "Celecoxib 200mg", dosageKR: "1캡슐, 하루 1~2회", dosageVN: "1 viên, 1-2 lần/ngày", dosageUS: "1 capsule, 1-2 times/day", precautionKR: "심혈관 질환자 주의", precautionVN: "Cẩn thận bệnh tim mạch", precautionUS: "Caution with cardiovascular disease" },
  arcoxia_vn: { id: "arcoxia_vn", nameKR: "아콕시아", nameVN: "Arcoxia", nameUS: "Arcoxia", ingredient: "Etoricoxib 60mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "고혈압 환자 주의", precautionVN: "Cẩn thận cao huyết áp", precautionUS: "Caution with high blood pressure" },

  // === Allergy drugs ===
  cromolin_kr: { id: "cromolin_kr", nameKR: "크로모글리케이트 안약", nameVN: "Opticrom", nameUS: "Opticrom", ingredient: "Sodium Cromoglicate 2%", dosageKR: "1~2방울, 하루 4회", dosageVN: "1-2 giọt, 4 lần/ngày", dosageUS: "1-2 drops, 4 times/day", precautionKR: "렌즈 빼고 사용, 5분 후 착용", precautionVN: "Tháo kính áp tròng trước khi nhỏ", precautionUS: "Remove contacts before use" },
  hydrocortisone_kr: { id: "hydrocortisone_kr", nameKR: "히드로코르티손 크림", nameVN: "Hydrocortisone cream", nameUS: "Hydrocortisone 1% cream", ingredient: "Hydrocortisone 1%", dosageKR: "얇게 도포, 하루 2~3회", dosageVN: "Thoa mỏng, 2-3 lần/ngày", dosageUS: "Apply thin layer, 2-3 times/day", precautionKR: "7일 이상 사용 금지, 얼굴 사용 주의", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days, avoid face" },
  zaditor_us: { id: "zaditor_us", nameKR: "자디터 안약", nameVN: "Zaditor", nameUS: "Zaditor", ingredient: "Ketotifen fumarate 0.025%", dosageKR: "1방울, 하루 2회", dosageVN: "1 giọt, 2 lần/ngày", dosageUS: "1 drop, twice daily", precautionKR: "렌즈 빼고 사용", precautionVN: "Tháo kính áp tròng", precautionUS: "Remove contacts before use" },
  pataday_us: { id: "pataday_us", nameKR: "파타데이 안약", nameVN: "Pataday", nameUS: "Pataday", ingredient: "Olopatadine 0.2%", dosageKR: "1방울, 하루 1회", dosageVN: "1 giọt, 1 lần/ngày", dosageUS: "1 drop, once daily", precautionKR: "렌즈 빼고 사용", precautionVN: "Tháo kính áp tròng", precautionUS: "Remove contacts before use" },
  benadryl_us: { id: "benadryl_us", nameKR: "베나드릴", nameVN: "Benadryl", nameUS: "Benadryl", ingredient: "Diphenhydramine 25mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "강한 졸음 유발, 운전 금지", precautionVN: "Gây buồn ngủ mạnh, không lái xe", precautionUS: "Causes strong drowsiness, do not drive" },
  phenergan_vn: { id: "phenergan_vn", nameKR: "페너간 크림", nameVN: "Phenergan cream", nameUS: "Phenergan cream", ingredient: "Promethazine cream", dosageKR: "얇게 도포, 하루 2~3회", dosageVN: "Thoa mỏng, 2-3 lần/ngày", dosageUS: "Apply thin layer, 2-3 times/day", precautionKR: "햇빛 노출 주의", precautionVN: "Tránh ánh nắng", precautionUS: "Avoid sun exposure" },
  cortisone10_us: { id: "cortisone10_us", nameKR: "코르티손 10 크림", nameVN: "Cortisone 10", nameUS: "Cortisone 10", ingredient: "Hydrocortisone 1%", dosageKR: "얇게 도포, 하루 2~3회", dosageVN: "Thoa mỏng, 2-3 lần/ngày", dosageUS: "Apply thin layer, 2-3 times/day", precautionKR: "7일 이상 사용 금지", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days" },

  // === Skin rash drugs ===
  mullindi_kr: { id: "mullindi_kr", nameKR: "물린디", nameVN: "Mullindi", nameUS: "Mullindi", ingredient: "Diphenhydramine + Lidocaine", dosageKR: "물린 부위에 도포, 하루 3~4회", dosageVN: "Thoa vào vùng bị cắn, 3-4 lần/ngày", dosageUS: "Apply to bite area, 3-4 times/day", precautionKR: "넓은 면적 사용 금지", precautionVN: "Không dùng trên diện rộng", precautionUS: "Do not apply on large areas" },
  bumugli_kr: { id: "bumugli_kr", nameKR: "버물리", nameVN: "Bumugli", nameUS: "Bumugli", ingredient: "Camphor + Menthol", dosageKR: "물린 부위에 도포", dosageVN: "Thoa vào vùng bị cắn", dosageUS: "Apply to bite area", precautionKR: "눈 주변 금지", precautionVN: "Tránh vùng mắt", precautionUS: "Avoid eye area" },
  benadryl_cream_us: { id: "benadryl_cream_us", nameKR: "베나드릴 크림", nameVN: "Benadryl cream", nameUS: "Benadryl Itch Stopping Cream", ingredient: "Diphenhydramine cream 2%", dosageKR: "물린 부위에 도포, 하루 3~4회", dosageVN: "Thoa vào vùng bị cắn, 3-4 lần/ngày", dosageUS: "Apply to affected area, 3-4 times/day", precautionKR: "넓은 면적 금지", precautionVN: "Không dùng trên diện rộng", precautionUS: "Do not apply on large areas" },
  urea_cream_kr: { id: "urea_cream_kr", nameKR: "유리아 크림", nameVN: "Urea cream", nameUS: "Urea cream", ingredient: "Urea 10-20%", dosageKR: "하루 2~3회 도포", dosageVN: "Thoa 2-3 lần/ngày", dosageUS: "Apply 2-3 times/day", precautionKR: "상처에 바르면 따가움", precautionVN: "Xót nếu thoa lên vết thương", precautionUS: "May sting on broken skin" },
  cetaphil_kr: { id: "cetaphil_kr", nameKR: "세타필 로션", nameVN: "Cetaphil lotion", nameUS: "Cetaphil Moisturizing Lotion", ingredient: "Moisturizing complex", dosageKR: "수시로 도포", dosageVN: "Thoa khi cần", dosageUS: "Apply as needed", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  vaseline_vn: { id: "vaseline_vn", nameKR: "바셀린", nameVN: "Vaseline", nameUS: "Vaseline", ingredient: "Petroleum jelly", dosageKR: "건조 부위에 도포", dosageVN: "Thoa vào vùng khô", dosageUS: "Apply to dry areas", precautionKR: "부작용 없음", precautionVN: "Không có tác dụng phụ", precautionUS: "No side effects" },
  cerave_us: { id: "cerave_us", nameKR: "세라비 크림", nameVN: "CeraVe cream", nameUS: "CeraVe Moisturizing Cream", ingredient: "Ceramides + Hyaluronic acid", dosageKR: "하루 2회 도포", dosageVN: "Thoa 2 lần/ngày", dosageUS: "Apply twice daily", precautionKR: "민감성 피부 사용 가능", precautionVN: "Dùng được cho da nhạy cảm", precautionUS: "Safe for sensitive skin" },
  eucerin_us: { id: "eucerin_us", nameKR: "유세린", nameVN: "Eucerin", nameUS: "Eucerin Original Healing", ingredient: "Urea complex moisturizer", dosageKR: "하루 2회 도포", dosageVN: "Thoa 2 lần/ngày", dosageUS: "Apply twice daily", precautionKR: "건조 피부 전용", precautionVN: "Dành cho da khô", precautionUS: "For dry skin" },

  // === Menstrual pain drugs ===
  eve_kr: { id: "eve_kr", nameKR: "이브", nameVN: "Eve", nameUS: "Eve", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn, 3 lần/ngày", dosageUS: "1 tablet, with food, 3 times/day", precautionKR: "식후 복용, 생리 시작 시 바로 복용이 효과적", precautionVN: "Uống sau ăn, uống ngay khi bắt đầu kinh nguyệt", precautionUS: "Take with food, most effective at period onset" },
  midol_us: { id: "midol_us", nameKR: "미돌", nameVN: "Midol", nameUS: "Midol Complete", ingredient: "Acetaminophen 500mg + Caffeine 60mg + Pyrilamine 15mg", dosageKR: "2정, 6시간 간격", dosageVN: "2 viên, cách 6 giờ", dosageUS: "2 caplets, every 6 hours", precautionKR: "다른 아세트아미노펜 병용 금지", precautionVN: "Không dùng với paracetamol khác", precautionUS: "Do not combine with other acetaminophen" },
  mefenamic_vn: { id: "mefenamic_vn", nameKR: "폰탈 500mg", nameVN: "Ponstan 500mg", nameUS: "Ponstel 500mg", ingredient: "Mefenamic acid 500mg", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tablet, 3 times/day, with food", precautionKR: "식후 필수, 위장 장애 주의", precautionVN: "Phải uống sau ăn", precautionUS: "Must take with food" },
  thermacare_us: { id: "thermacare_us", nameKR: "써마케어 패치", nameVN: "ThermaCare", nameUS: "ThermaCare HeatWraps", ingredient: "Iron-based heat therapy patch", dosageKR: "1매, 8시간 부착", dosageVN: "1 miếng, dán 8 giờ", dosageUS: "1 wrap, wear for 8 hours", precautionKR: "피부 직접 접촉 시 화상 주의", precautionVN: "Cẩn thận bỏng da", precautionUS: "Risk of skin burns with direct contact" },

  // === Toothache drugs ===
  orajel_us: { id: "orajel_us", nameKR: "오라젤", nameVN: "Orajel", nameUS: "Orajel", ingredient: "Benzocaine 20% gel", dosageKR: "아픈 치아/잇몸에 소량 도포", dosageVN: "Thoa ít lên răng/nướu đau", dosageUS: "Apply small amount to painful tooth/gum", precautionKR: "임시 마취 효과, 치과 방문 필요", precautionVN: "Tác dụng gây tê tạm thời, cần đến nha khoa", precautionUS: "Temporary numbing, dental visit needed" },
  gaglin_kr: { id: "gaglin_kr", nameKR: "가글린", nameVN: "Gaglin", nameUS: "Gaglin", ingredient: "Cetylpyridinium chloride gargle", dosageKR: "10~15ml, 하루 2~3회 가글", dosageVN: "10-15ml, súc miệng 2-3 lần/ngày", dosageUS: "10-15ml, gargle 2-3 times/day", precautionKR: "삼키지 말 것", precautionVN: "Không nuốt", precautionUS: "Do not swallow" },
  tantum_kr: { id: "tantum_kr", nameKR: "탄툼 가글", nameVN: "Tantum gargle", nameUS: "Tantum Verde Gargle", ingredient: "Benzydamine HCl 0.15%", dosageKR: "15ml, 하루 2~3회 가글", dosageVN: "15ml, súc miệng 2-3 lần/ngày", dosageUS: "15ml, gargle 2-3 times/day", precautionKR: "30초 가글 후 뱉기", precautionVN: "Súc 30 giây rồi nhổ", precautionUS: "Gargle 30 seconds then spit" },
  anbesol_us: { id: "anbesol_us", nameKR: "앤베솔", nameVN: "Anbesol", nameUS: "Anbesol", ingredient: "Benzocaine 20% gel", dosageKR: "잇몸에 소량 도포", dosageVN: "Thoa ít lên nướu", dosageUS: "Apply small amount to gums", precautionKR: "임시 마취 효과", precautionVN: "Tác dụng gây tê tạm thời", precautionUS: "Temporary numbing effect" },
  betadine_gargle_vn: { id: "betadine_gargle_vn", nameKR: "베타딘 가글", nameVN: "Betadine Gargle", nameUS: "Betadine Gargle", ingredient: "Povidone-iodine 1%", dosageKR: "15ml, 하루 3~4회 가글", dosageVN: "15ml, súc miệng 3-4 lần/ngày", dosageUS: "15ml, gargle 3-4 times/day", precautionKR: "요오드 알레르기 시 금지", precautionVN: "Không dùng nếu dị ứng iod", precautionUS: "Do not use if allergic to iodine" },

  // === Eye care drugs ===
  refresh_kr: { id: "refresh_kr", nameKR: "인공눈물 (리프레쉬)", nameVN: "Refresh Tears", nameUS: "Refresh Tears", ingredient: "Carboxymethylcellulose 0.5%", dosageKR: "1~2방울, 수시로", dosageVN: "1-2 giọt, khi cần", dosageUS: "1-2 drops, as needed", precautionKR: "방부제 없는 1회용 권장", precautionVN: "Nên dùng loại không chất bảo quản", precautionUS: "Preservative-free single-use recommended" },
  hyaluronate_kr: { id: "hyaluronate_kr", nameKR: "히아루론 점안액", nameVN: "Tears Naturale Free", nameUS: "Blink Tears", ingredient: "Sodium hyaluronate 0.1%", dosageKR: "1~2방울, 하루 5~6회", dosageVN: "1-2 giọt, 5-6 lần/ngày", dosageUS: "1-2 drops, 5-6 times/day", precautionKR: "렌즈 위에 사용 가능(무방부제)", precautionVN: "Dùng được trên kính áp tròng (không chất bảo quản)", precautionUS: "Can use with contacts (preservative-free)" },
  systane_vn: { id: "systane_vn", nameKR: "시스테인", nameVN: "Systane", nameUS: "Systane", ingredient: "Polyethylene glycol 400", dosageKR: "1~2방울, 수시로", dosageVN: "1-2 giọt, khi cần", dosageUS: "1-2 drops, as needed", precautionKR: "렌즈 위에 사용 가능", precautionVN: "Dùng được trên kính áp tròng", precautionUS: "Safe with contact lenses" },
  visine_dry_us: { id: "visine_dry_us", nameKR: "바이신 드라이아이", nameVN: "Visine Dry Eye", nameUS: "Visine Dry Eye Relief", ingredient: "Polyethylene glycol 400", dosageKR: "1~2방울, 수시로", dosageVN: "1-2 giọt, khi cần", dosageUS: "1-2 drops, as needed", precautionKR: "건조감 완화용", precautionVN: "Giảm khô mắt", precautionUS: "For dry eye relief" },
  vizuclear_kr: { id: "vizuclear_kr", nameKR: "비주클리어", nameVN: "Vizuclear", nameUS: "Vizuclear", ingredient: "Naphazoline + Chlorpheniramine eye drops", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "3일 이상 연속 사용 금지, 충혈 완화용", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 consecutive days" },
  vrohto_vn: { id: "vrohto_vn", nameKR: "V.로토", nameVN: "V.Rohto", nameUS: "V.Rohto", ingredient: "Naphazoline + Zinc sulfate", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "단기 사용만", precautionVN: "Chỉ dùng ngắn hạn", precautionUS: "Short-term use only" },
  visine_us: { id: "visine_us", nameKR: "바이신 오리지널", nameVN: "Visine Original", nameUS: "Visine Original", ingredient: "Tetrahydrozoline 0.05%", dosageKR: "1~2방울, 하루 4회", dosageVN: "1-2 giọt, 4 lần/ngày", dosageUS: "1-2 drops, up to 4 times/day", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days" },
  cleareyes_us: { id: "cleareyes_us", nameKR: "클리어아이즈", nameVN: "Clear Eyes", nameUS: "Clear Eyes", ingredient: "Naphazoline 0.012%", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "충혈 완화, 3일 초과 금지", precautionVN: "Giảm đỏ mắt, không quá 3 ngày", precautionUS: "Redness relief, do not exceed 3 days" },
  cromolin_vn: { id: "cromolin_vn", nameKR: "크로모글리케이트 안약", nameVN: "Opticrom", nameUS: "Opticrom", ingredient: "Sodium Cromoglicate 2%", dosageKR: "1~2방울, 하루 4회", dosageVN: "1-2 giọt, 4 lần/ngày", dosageUS: "1-2 drops, 4 times/day", precautionKR: "알레르기 예방용", precautionVN: "Phòng ngừa dị ứng", precautionUS: "For allergy prevention" },

  // === Heartburn/Acid reflux drugs ===
  gaviscon_kr: { id: "gaviscon_kr", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Sodium alginate + Sodium bicarbonate", dosageKR: "10~20ml, 식후 + 취침 전", dosageVN: "10-20ml, sau ăn + trước khi ngủ", dosageUS: "10-20ml, after meals + before bed", precautionKR: "나트륨 함량 주의, 고혈압 환자 주의", precautionVN: "Cẩn thận lượng natri", precautionUS: "Watch sodium content, caution with hypertension" },
  lansoprazole_kr: { id: "lansoprazole_kr", nameKR: "란스톤 15mg", nameVN: "Lanzostad 15mg", nameUS: "Prevacid 24HR", ingredient: "Lansoprazole 15mg", dosageKR: "1캡슐, 아침 식전", dosageVN: "1 viên, trước bữa sáng", dosageUS: "1 capsule, before breakfast", precautionKR: "14일 이상 연속 복용 금지", precautionVN: "Không dùng liên tục quá 14 ngày", precautionUS: "Do not use continuously for more than 14 days" },
  omeprazole_vn: { id: "omeprazole_vn", nameKR: "오메가드 20mg", nameVN: "Losec MUPS 20mg", nameUS: "Prilosec OTC 20mg", ingredient: "Omeprazole 20mg", dosageKR: "1캡슐, 아침 식전", dosageVN: "1 viên, trước bữa sáng", dosageUS: "1 capsule, before breakfast", precautionKR: "14일 코스, 장기 복용 시 의사 상담", precautionVN: "Liệu trình 14 ngày, tham khảo bác sĩ nếu dùng lâu", precautionUS: "14-day course, consult doctor for long-term use" },
  gaviscon_vn: { id: "gaviscon_vn", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Sodium alginate", dosageKR: "10~20ml, 식후", dosageVN: "10-20ml, sau ăn", dosageUS: "10-20ml, after meals", precautionKR: "나트륨 주의", precautionVN: "Cẩn thận natri", precautionUS: "Watch sodium content" },
  gaviscon_us: { id: "gaviscon_us", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Aluminium hydroxide + Magnesium carbonate", dosageKR: "10~20ml, 식후", dosageVN: "10-20ml, sau ăn", dosageUS: "10-20ml, after meals", precautionKR: "나트륨 주의", precautionVN: "Cẩn thận natri", precautionUS: "Watch sodium content" },
  prilosec_us: { id: "prilosec_us", nameKR: "프릴로섹 OTC", nameVN: "Prilosec OTC", nameUS: "Prilosec OTC", ingredient: "Omeprazole 20mg", dosageKR: "1정, 아침 식전, 14일 코스", dosageVN: "1 viên, trước bữa sáng, 14 ngày", dosageUS: "1 tablet, before breakfast, 14-day course", precautionKR: "4개월에 1코스 이하 권장", precautionVN: "Khuyến nghị 1 liệu trình mỗi 4 tháng", precautionUS: "Recommended max 1 course per 4 months" },
  mylanta_us: { id: "mylanta_us", nameKR: "마이란타", nameVN: "Mylanta", nameUS: "Mylanta", ingredient: "Aluminium hydroxide + Magnesium hydroxide + Simethicone", dosageKR: "10~20ml, 식간", dosageVN: "10-20ml, giữa bữa ăn", dosageUS: "10-20ml, between meals", precautionKR: "가스 + 위산 동시 완화", precautionVN: "Giảm cả khí và axit", precautionUS: "Relieves both gas and acid" },

  // === Constipation drugs ===
  magmil_kr: { id: "magmil_kr", nameKR: "마그밀", nameVN: "Magmil", nameUS: "Magmil", ingredient: "Magnesium hydroxide", dosageKR: "1~2정, 취침 전, 충분한 물과 함께", dosageVN: "1-2 viên, trước khi ngủ, uống nhiều nước", dosageUS: "1-2 tablets, at bedtime, with plenty of water", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease" },
  dulcolax_kr: { id: "dulcolax_kr", nameKR: "둘코락스", nameVN: "Dulcolax", nameUS: "Dulcolax", ingredient: "Bisacodyl 5mg", dosageKR: "1~2정, 취침 전", dosageVN: "1-2 viên, trước khi ngủ", dosageUS: "1-2 tablets, at bedtime", precautionKR: "장기 복용 금지, 습관성 주의", precautionVN: "Không dùng lâu dài, cẩn thận phụ thuộc", precautionUS: "Do not use long-term, may become habit-forming" },
  duphalac_vn: { id: "duphalac_vn", nameKR: "듀파락", nameVN: "Duphalac", nameUS: "Duphalac", ingredient: "Lactulose syrup", dosageKR: "15~30ml, 하루 1회", dosageVN: "15-30ml, 1 lần/ngày", dosageUS: "15-30ml, once daily", precautionKR: "부작용 적고 안전, 임산부 사용 가능", precautionVN: "Ít tác dụng phụ, an toàn cho bà bầu", precautionUS: "Few side effects, safe for pregnancy" },
  forlax_vn: { id: "forlax_vn", nameKR: "포라락스", nameVN: "Forlax", nameUS: "Forlax", ingredient: "Macrogol 4000 (PEG)", dosageKR: "1~2포, 물에 녹여", dosageVN: "1-2 gói, hòa nước", dosageUS: "1-2 sachets, dissolve in water", precautionKR: "부작용 적음", precautionVN: "Ít tác dụng phụ", precautionUS: "Few side effects" },
  miralax_us: { id: "miralax_us", nameKR: "미라랙스", nameVN: "MiraLAX", nameUS: "MiraLAX", ingredient: "Polyethylene glycol 3350", dosageKR: "1캡(17g), 하루 1회, 물에 녹여", dosageVN: "1 nắp (17g), 1 lần/ngày, hòa nước", dosageUS: "1 cap (17g), once daily, mix in water", precautionKR: "습관성 적음, 1~3일 소요", precautionVN: "Ít gây phụ thuộc, cần 1-3 ngày", precautionUS: "Non-habit forming, takes 1-3 days" },
  metamucil_us: { id: "metamucil_us", nameKR: "메타무실", nameVN: "Metamucil", nameUS: "Metamucil", ingredient: "Psyllium husk fiber", dosageKR: "1스푼, 하루 1~3회, 물에 타서", dosageVN: "1 thìa, 1-3 lần/ngày, pha nước", dosageUS: "1 scoop, 1-3 times/day, mix in water", precautionKR: "충분한 물 필수, 식이섬유 보충", precautionVN: "Phải uống đủ nước", precautionUS: "Must drink plenty of water, fiber supplement" },
  bicogreen_kr: { id: "bicogreen_kr", nameKR: "비코그린 좌약", nameVN: "Bicogreen suppository", nameUS: "Bicogreen suppository", ingredient: "Bisacodyl suppository 10mg", dosageKR: "1개, 항문 삽입, 15~60분 효과", dosageVN: "1 viên, đặt hậu môn, tác dụng 15-60 phút", dosageUS: "1 suppository, rectal insert, works in 15-60 min", precautionKR: "빠른 효과, 습관성 주의", precautionVN: "Tác dụng nhanh, cẩn thận phụ thuộc", precautionUS: "Fast acting, do not use regularly" },

  // === Insomnia drugs ===
  sleepaid_kr: { id: "sleepaid_kr", nameKR: "수면유도제 (약국용)", nameVN: "Sleep Aid (OTC)", nameUS: "Sleep Aid (OTC)", ingredient: "Doxylamine succinate 25mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "7일 이상 사용 금지, 다음날 졸음 가능", precautionVN: "Không dùng quá 7 ngày, có thể buồn ngủ ngày hôm sau", precautionUS: "Do not use more than 7 days, next-day drowsiness" },
  aronamin_kr: { id: "aronamin_kr", nameKR: "아로나민 골드", nameVN: "Aronamin Gold", nameUS: "Aronamin Gold", ingredient: "Vitamin B complex (B1, B2, B6, B12)", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "직접 수면제 아님, 피로 회복 보조", precautionVN: "Không phải thuốc ngủ, hỗ trợ phục hồi mệt mỏi", precautionUS: "Not a sleeping pill, fatigue recovery support" },
  rotunda_vn: { id: "rotunda_vn", nameKR: "로툰다", nameVN: "Rotunda", nameUS: "Rotunda", ingredient: "Rotundin 30mg", dosageKR: "1~2정, 취침 전", dosageVN: "1-2 viên, trước khi ngủ", dosageUS: "1-2 tablets, before bedtime", precautionKR: "운전 금지, 졸음 유발", precautionVN: "Không lái xe, gây buồn ngủ", precautionUS: "Do not drive, causes drowsiness" },
  melatonin_vn: { id: "melatonin_vn", nameKR: "멜라토닌 3mg", nameVN: "Melatonin 3mg", nameUS: "Melatonin 3mg", ingredient: "Melatonin 3mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "단기 사용 권장, 자연 수면 호르몬", precautionVN: "Dùng ngắn hạn, hormone giấc ngủ tự nhiên", precautionUS: "Short-term use recommended, natural sleep hormone" },
  zzzquil_us: { id: "zzzquil_us", nameKR: "쥬퀼", nameVN: "ZzzQuil", nameUS: "ZzzQuil", ingredient: "Diphenhydramine 50mg", dosageKR: "1캡슐, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 capsule, at bedtime", precautionKR: "다음날 졸음, 습관성 주의", precautionVN: "Buồn ngủ ngày hôm sau, cẩn thận phụ thuộc", precautionUS: "Next-day drowsiness, do not use long-term" },
  unisom_us: { id: "unisom_us", nameKR: "유니솜", nameVN: "Unisom", nameUS: "Unisom SleepTabs", ingredient: "Doxylamine succinate 25mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "7일 이상 사용 금지", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days" },
  rediants_kr: { id: "rediants_kr", nameKR: "레디안스", nameVN: "Rediants", nameUS: "Rediants", ingredient: "Valerian extract (herbal)", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 tablets, before bedtime", precautionKR: "자연 성분, 부작용 적음", precautionVN: "Thành phần tự nhiên, ít tác dụng phụ", precautionUS: "Natural ingredient, minimal side effects" },
  pancol_night_kr: { id: "pancol_night_kr", nameKR: "판콜에이 나이트", nameVN: "Pancol-A Night", nameUS: "Pancol-A Night", ingredient: "Acetaminophen + Chlorpheniramine + Pseudoephedrine", dosageKR: "1정, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 tablet, at bedtime", precautionKR: "야간 감기약, 졸음 성분 포함", precautionVN: "Thuốc cảm ban đêm, có chất gây ngủ", precautionUS: "Nighttime cold medicine, contains drowsy ingredient" },
  ameflu_night_vn: { id: "ameflu_night_vn", nameKR: "뉴 아메플루 나이트", nameVN: "New Ameflu Night Time", nameUS: "New Ameflu Night Time", ingredient: "Acetaminophen + Dextromethorphan + Chlorpheniramine", dosageKR: "1정, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 tablet, at bedtime", precautionKR: "야간용, 졸음 유발", precautionVN: "Dùng ban đêm, gây buồn ngủ", precautionUS: "Nighttime formula, causes drowsiness" },
  tylenol_pm_us: { id: "tylenol_pm_us", nameKR: "타이레놀 PM", nameVN: "Tylenol PM", nameUS: "Tylenol PM", ingredient: "Acetaminophen 500mg + Diphenhydramine 25mg", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 tablets, at bedtime", precautionKR: "다른 아세트아미노펜 병용 금지", precautionVN: "Không dùng với paracetamol khác", precautionUS: "Do not combine with other acetaminophen products" },

  // === Joint pain drugs ===
  glucosamine_kr: { id: "glucosamine_kr", nameKR: "관절팔팔", nameVN: "Viartril-S", nameUS: "Osteo Bi-Flex", ingredient: "Glucosamine sulfate 1500mg", dosageKR: "1포/1정, 하루 1회", dosageVN: "1 gói/viên, 1 lần/ngày", dosageUS: "1 sachet/tablet, once daily", precautionKR: "효과 나타나기까지 4~8주, 새우/게 알레르기 주의", precautionVN: "Cần 4-8 tuần để có hiệu quả, cẩn thận dị ứng tôm cua", precautionUS: "Takes 4-8 weeks for effect, shellfish allergy caution" },
  voltaren_vn: { id: "voltaren_vn", nameKR: "볼타렌 젤", nameVN: "Voltaren gel", nameUS: "Voltaren Arthritis Pain Gel", ingredient: "Diclofenac sodium 1% gel", dosageKR: "2~4g, 하루 3~4회 도포", dosageVN: "2-4g, thoa 3-4 lần/ngày", dosageUS: "2-4g, apply 3-4 times/day", precautionKR: "한 관절에 하루 최대 8g, 12세 이상", precautionVN: "Tối đa 8g/ngày mỗi khớp, từ 12 tuổi", precautionUS: "Max 8g/day per joint, age 12+" },
  voltaren_us: { id: "voltaren_us", nameKR: "볼타렌 젤", nameVN: "Voltaren gel", nameUS: "Voltaren Arthritis Pain Gel", ingredient: "Diclofenac sodium 1% gel", dosageKR: "4g, 하루 4회 도포", dosageVN: "4g, thoa 4 lần/ngày", dosageUS: "4g, apply 4 times/day", precautionKR: "한 관절에 하루 최대 16g", precautionVN: "Tối đa 16g/ngày mỗi khớp", precautionUS: "Max 16g/day per joint" },
  aspercreme_us: { id: "aspercreme_us", nameKR: "아스퍼크림", nameVN: "Aspercreme", nameUS: "Aspercreme", ingredient: "Lidocaine 4% cream", dosageKR: "아픈 부위에 도포, 하루 3~4회", dosageVN: "Thoa vào vùng đau, 3-4 lần/ngày", dosageUS: "Apply to affected area, 3-4 times/day", precautionKR: "국소 마취 효과", precautionVN: "Tác dụng gây tê cục bộ", precautionUS: "Topical numbing effect" },
  movefree_us: { id: "movefree_us", nameKR: "무브프리", nameVN: "Move Free", nameUS: "Move Free Advanced", ingredient: "Glucosamine + Chondroitin + MSM", dosageKR: "2정, 하루 1회", dosageVN: "2 viên, 1 lần/ngày", dosageUS: "2 tablets, once daily", precautionKR: "효과 4~8주, 관절 건강 보조", precautionVN: "Cần 4-8 tuần, hỗ trợ sức khỏe khớp", precautionUS: "Takes 4-8 weeks, joint health supplement" },
  aleve_vn: { id: "aleve_vn", nameKR: "탁센", nameVN: "Anaprox 220mg", nameUS: "Aleve", ingredient: "Naproxen Sodium 220mg", dosageKR: "1정, 8~12시간 간격", dosageVN: "1 viên, cách 8-12 giờ", dosageUS: "1 tablet, every 8-12 hours", precautionKR: "위장 주의", precautionVN: "Cẩn thận dạ dày", precautionUS: "Stomach caution" },

  // === Dizziness drugs (21) ===
  meniere_kr: { id: "meniere_kr", nameKR: "메니에르정", nameVN: "Betaserc", nameUS: "Betahistine", ingredient: "Betahistine 8mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals" },
  betaserc_vn: { id: "betaserc_vn", nameKR: "메니에르정", nameVN: "Betaserc 16mg", nameUS: "Betahistine", ingredient: "Betahistine 16mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2-3 lần/ngày", dosageUS: "1 tablet, 2-3 times/day", precautionKR: "위궤양 환자 주의", precautionVN: "Cẩn thận loét dạ dày", precautionUS: "Caution with peptic ulcer" },
  stugeron_vn: { id: "stugeron_vn", nameKR: "스튜제론", nameVN: "Stugeron", nameUS: "Stugeron", ingredient: "Cinnarizine 25mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "May cause drowsiness" },

  // === Tinnitus drugs (22) ===
  ginkgo_kr: { id: "ginkgo_kr", nameKR: "진코밀정", nameVN: "Tanakan", nameUS: "Ginkgo Biloba", ingredient: "Ginkgo biloba extract", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 1-2 times/day", precautionKR: "혈액 희석제 복용 시 주의", precautionVN: "Cẩn thận khi dùng thuốc chống đông", precautionUS: "Caution with blood thinners" },
  tanakan_vn: { id: "tanakan_vn", nameKR: "진코밀정", nameVN: "Tanakan", nameUS: "Ginkgo Biloba", ingredient: "Ginkgo biloba extract", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 1-2 times/day", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals" },
  lipoflavonoid_us: { id: "lipoflavonoid_us", nameKR: "리포플라보노이드", nameVN: "Lipo-Flavonoid", nameUS: "Lipo-Flavonoid Plus", ingredient: "Vitamin B + Bioflavonoid complex", dosageKR: "2캡슐, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 caplets, 3 times/day", precautionKR: "이명 전용 보충제", precautionVN: "Thực phẩm chức năng cho ù tai", precautionUS: "Tinnitus supplement, not a drug" },

  // === Nosebleed drugs (23) ===
  vaseline_kr: { id: "vaseline_kr", nameKR: "바셀린", nameVN: "Vaseline", nameUS: "Vaseline", ingredient: "Petroleum jelly", dosageKR: "코 안쪽에 소량 도포", dosageVN: "Thoa một ít vào bên trong mũi", dosageUS: "Apply small amount inside nostrils", precautionKR: "건조 방지", precautionVN: "Ngăn khô mũi", precautionUS: "Prevents dryness" },
  saline_spray_kr: { id: "saline_spray_kr", nameKR: "식염수 스프레이", nameVN: "NaCl 0.9% spray", nameUS: "Ayr Saline Spray", ingredient: "Normal saline 0.9%", dosageKR: "코에 1~2회 분사, 수시로", dosageVN: "Xịt 1-2 lần vào mũi, thường xuyên", dosageUS: "Spray 2-3 times in nostrils as needed", precautionKR: "부작용 없음", precautionVN: "Không tác dụng phụ", precautionUS: "No side effects" },

  // === Mouth ulcer drugs (24) ===
  oramedi_kr: { id: "oramedi_kr", nameKR: "오라메디 연고", nameVN: "Kamistad gel", nameUS: "Orajel Mouth Sore gel", ingredient: "Triamcinolone acetonide", dosageKR: "환부에 소량 도포, 하루 2~3회", dosageVN: "Thoa lên vết loét, 3 lần/ngày", dosageUS: "Apply to sore, up to 4 times/day", precautionKR: "스테로이드 성분", precautionVN: "Thành phần gây tê cục bộ", precautionUS: "Contains benzocaine" },
  albocil_kr: { id: "albocil_kr", nameKR: "알보칠", nameVN: "Zytee gel", nameUS: "Kanka Mouth Pain Liquid", ingredient: "Policresulen / Choline salicylate", dosageKR: "면봉에 묻혀 환부에 도포", dosageVN: "Thoa lên vết loét", dosageUS: "Apply to sore", precautionKR: "따가움", precautionVN: "Có thể gây rát", precautionUS: "Forms protective coating" },
  kamistad_vn: { id: "kamistad_vn", nameKR: "카미스타드 젤", nameVN: "Kamistad gel", nameUS: "Orajel", ingredient: "Lidocaine + Chamomile", dosageKR: "환부에 도포, 하루 3회", dosageVN: "Thoa lên vết loét, 3 lần/ngày", dosageUS: "Apply to sore, 3 times/day", precautionKR: "국소마취 성분", precautionVN: "Thành phần gây tê", precautionUS: "Contains lidocaine" },
  orajel_mouth_us: { id: "orajel_mouth_us", nameKR: "오라젤 구내염", nameVN: "Orajel Mouth Sore", nameUS: "Orajel Mouth Sore gel", ingredient: "Benzocaine 20%", dosageKR: "환부에 도포, 하루 4회", dosageVN: "Thoa lên vết loét, 4 lần/ngày", dosageUS: "Apply to sore, up to 4 times/day", precautionKR: "국소마취", precautionVN: "Gây tê cục bộ", precautionUS: "Topical anesthetic" },

  // === Burn drugs (25) ===
  fucidin_kr: { id: "fucidin_kr", nameKR: "후시딘", nameVN: "Biafine", nameUS: "Neosporin Burn Relief", ingredient: "Fusidic acid / Trolamine / Neomycin+Pramoxine", dosageKR: "환부에 얇게 도포, 하루 2~3회", dosageVN: "Thoa dày lên vùng bỏng", dosageUS: "Apply to burn, 1-3 times/day", precautionKR: "감염 방지", precautionVN: "Không tác dụng phụ", precautionUS: "Includes pain relief" },
  silvadene_kr: { id: "silvadene_kr", nameKR: "실바덴 크림", nameVN: "Silvirin cream", nameUS: "Aloe Vera gel", ingredient: "Silver sulfadiazine 1% / Aloe vera", dosageKR: "환부에 도포", dosageVN: "Thoa lên vùng bỏng, 1-2 lần/ngày", dosageUS: "Apply to burn as needed", precautionKR: "설파제 알레르기 주의", precautionVN: "Dị ứng sulfa cẩn thận", precautionUS: "Use pure aloe product" },
  biafine_vn: { id: "biafine_vn", nameKR: "비아핀", nameVN: "Biafine", nameUS: "Biafine", ingredient: "Trolamine emulsion", dosageKR: "화상 부위에 두껍게 도포", dosageVN: "Thoa dày lên vùng bỏng", dosageUS: "Apply thickly to burn area", precautionKR: "없음", precautionVN: "Không", precautionUS: "None" },
  neosporin_burn_us: { id: "neosporin_burn_us", nameKR: "네오스포린 번 릴리프", nameVN: "Neosporin Burn", nameUS: "Neosporin Burn Relief", ingredient: "Neomycin + Pramoxine", dosageKR: "환부에 도포, 하루 1~3회", dosageVN: "Thoa 1-3 lần/ngày", dosageUS: "Apply 1-3 times/day", precautionKR: "통증 완화 포함", precautionVN: "Có giảm đau", precautionUS: "Includes pain relief" },

  // === Wound drugs (26) ===
  madecassol_kr: { id: "madecassol_kr", nameKR: "마데카솔 연고", nameVN: "Betadine dung dịch", nameUS: "Neosporin", ingredient: "Centella asiatica / Povidone-iodine / Neomycin+Polymyxin+Bacitracin", dosageKR: "상처에 도포, 하루 1~2회", dosageVN: "Sát trùng vết thương rồi băng", dosageUS: "Apply to wound, 1-3 times/day", precautionKR: "상처 재생", precautionVN: "Dị ứng iodine cẩn thận", precautionUS: "No special precautions" },
  betadine_vn: { id: "betadine_vn", nameKR: "베타딘", nameVN: "Betadine dung dịch", nameUS: "Betadine", ingredient: "Povidone-iodine 10%", dosageKR: "상처 소독 후 거즈", dosageVN: "Sát trùng vết thương", dosageUS: "Disinfect wound", precautionKR: "요오드 알레르기 주의", precautionVN: "Dị ứng iodine cẩn thận", precautionUS: "Iodine allergy caution" },
  fucidin_vn: { id: "fucidin_vn", nameKR: "후시딘 크림", nameVN: "Fucidin cream", nameUS: "Polysporin", ingredient: "Fusidic acid 2%", dosageKR: "상처에 도포, 하루 2~3회", dosageVN: "Thoa lên vết thương, 2-3 lần/ngày", dosageUS: "Apply 2-3 times/day", precautionKR: "감염 방지 항생제", precautionVN: "Kháng sinh ngăn nhiễm trùng", precautionUS: "Antibiotic ointment" },
  neosporin_us2: { id: "neosporin_us2", nameKR: "네오스포린", nameVN: "Neosporin", nameUS: "Neosporin Original", ingredient: "Neomycin + Polymyxin B + Bacitracin", dosageKR: "상처에 도포, 하루 1~3회", dosageVN: "Thoa 1-3 lần/ngày", dosageUS: "Apply 1-3 times/day", precautionKR: "없음", precautionVN: "Không", precautionUS: "None" },
  bandaid_us: { id: "bandaid_us", nameKR: "밴드에이드 + 폴리스포린", nameVN: "Băng cá nhân + Fucidin", nameUS: "Band-Aid + Polysporin", ingredient: "Adhesive bandage + Bacitracin+Polymyxin B", dosageKR: "소독 후 도포 + 밴드", dosageVN: "Sát trùng, thoa thuốc, băng lại", dosageUS: "Clean, apply, bandage", precautionKR: "없음", precautionVN: "Không", precautionUS: "None" },

  // === Swelling drugs (27) ===
  daflon_vn: { id: "daflon_vn", nameKR: "다플론", nameVN: "Daflon", nameUS: "Daflon", ingredient: "Diosmin 900mg + Hesperidin 100mg", dosageKR: "2정, 하루 1회", dosageVN: "2 viên, 1 lần/ngày", dosageUS: "2 tablets, once daily", precautionKR: "정맥순환 개선", precautionVN: "Cải thiện tuần hoàn tĩnh mạch", precautionUS: "Improves venous circulation" },
  antistax_vn: { id: "antistax_vn", nameKR: "안티스탁스", nameVN: "Antistax", nameUS: "Antistax", ingredient: "Red vine leaf extract 360mg", dosageKR: "2캡슐, 아침", dosageVN: "2 viên, buổi sáng", dosageUS: "2 capsules, morning", precautionKR: "자연 성분", precautionVN: "Thành phần tự nhiên", precautionUS: "Natural ingredient" },

  // === Acne drugs (28) ===
  noscarna_kr: { id: "noscarna_kr", nameKR: "노스카나 겔", nameVN: "Benzac AC 2.5%", nameUS: "Neutrogena BP 2.5%", ingredient: "Allantoin+Heparin / Benzoyl peroxide 2.5%", dosageKR: "환부에 도포, 하루 2~3회", dosageVN: "Thoa sau rửa mặt, 1-2 lần/ngày", dosageUS: "Apply after wash, 1-2 times/day", precautionKR: "없음", precautionVN: "Khô/kích ứng, bắt đầu ít", precautionUS: "May cause dryness, start small" },
  pairacne_kr: { id: "pairacne_kr", nameKR: "페어아크네 크림", nameVN: "Dalacin T gel", nameUS: "Differin gel", ingredient: "Ibuprofen piconol / Clindamycin 1% / Adapalene 0.1%", dosageKR: "여드름 부위에 도포, 하루 2~3회", dosageVN: "Thoa lên mụn, 2 lần/ngày", dosageUS: "Apply at bedtime, once daily", precautionKR: "없음", precautionVN: "Kháng sinh", precautionUS: "Sun sensitivity, takes 4-8 weeks" },
  benzac_vn: { id: "benzac_vn", nameKR: "벤작 AC", nameVN: "Benzac AC 2.5%", nameUS: "Neutrogena BP", ingredient: "Benzoyl peroxide 2.5%", dosageKR: "세안 후 도포, 하루 1~2회", dosageVN: "Thoa sau rửa mặt, 1-2 lần/ngày", dosageUS: "Apply 1-2 times/day", precautionKR: "건조/자극 가능, 소량부터", precautionVN: "Có thể khô/kích ứng", precautionUS: "May cause dryness" },
  differin_us: { id: "differin_us", nameKR: "디페린 젤", nameVN: "Differin gel", nameUS: "Differin gel", ingredient: "Adapalene 0.1%", dosageKR: "취침 전 도포, 하루 1회", dosageVN: "Thoa trước khi ngủ, 1 lần/ngày", dosageUS: "Apply at bedtime, once daily", precautionKR: "햇빛 주의, 효과 4~8주", precautionVN: "Tránh nắng, cần 4-8 tuần", precautionUS: "Sun sensitivity, takes 4-8 weeks" },

  // === Athlete's foot drugs (29) ===
  lamisil_kr: { id: "lamisil_kr", nameKR: "라미실 크림", nameVN: "Lamisil cream", nameUS: "Lamisil AT", ingredient: "Terbinafine 1%", dosageKR: "환부에 도포, 하루 1~2회, 2~4주", dosageVN: "Thoa lên vùng bị, 1-2 lần/ngày, 2-4 tuần", dosageUS: "Apply 1-2 times/day, 1-4 weeks", precautionKR: "꾸준히 사용해야 효과", precautionVN: "Phải dùng đều đặn", precautionUS: "Continue even if symptoms improve" },
  canesten_kr: { id: "canesten_kr", nameKR: "카네스텐 크림", nameVN: "Canesten cream", nameUS: "Lotrimin AF", ingredient: "Clotrimazole 1%", dosageKR: "환부에 도포, 하루 2~3회, 4주", dosageVN: "Thoa 2-3 lần/ngày, 4 tuần", dosageUS: "Apply 2 times/day, 4 weeks", precautionKR: "중단 없이 사용", precautionVN: "Không ngừng dùng sớm", precautionUS: "Don't stop early" },

  // === Stye drugs (30) ===
  terramycin_kr: { id: "terramycin_kr", nameKR: "테라마이신 안연고", nameVN: "Tobrex eye drops", nameUS: "Stye Eye Ointment", ingredient: "Oxytetracycline+Polymyxin B / Tobramycin / OTC stye formula", dosageKR: "눈꺼풀에 소량 도포, 하루 2~3회", dosageVN: "1-2 giọt, 4-6 lần/ngày", dosageUS: "Apply to eyelid, 1-2 times/day", precautionKR: "눈 안에 넣지 말 것", precautionVN: "Thuốc kháng sinh nhỏ mắt", precautionUS: "OTC use only" },
  warm_compress: { id: "warm_compress", nameKR: "온찜질", nameVN: "Chườm ấm", nameUS: "Warm compress", ingredient: "Warm towel / Warm compress", dosageKR: "따뜻한 수건으로 10~15분, 하루 3~4회", dosageVN: "Khăn ấm 10-15 phút, 3-4 lần/ngày", dosageUS: "Warm towel 10-15 min, 4 times/day", precautionKR: "가장 효과적인 초기 치료", precautionVN: "Phương pháp hiệu quả nhất", precautionUS: "Most effective initial treatment" },
  tobrex_vn: { id: "tobrex_vn", nameKR: "토브렉스 안약", nameVN: "Tobrex eye drops", nameUS: "Tobrex", ingredient: "Tobramycin 0.3%", dosageKR: "1~2방울, 하루 4~6회", dosageVN: "1-2 giọt, 4-6 lần/ngày", dosageUS: "1-2 drops, 4-6 times/day", precautionKR: "항생제 안약", precautionVN: "Thuốc kháng sinh nhỏ mắt", precautionUS: "Antibiotic eye drops" },

  // === Children's drugs (영유아/어린이용) ===
  child_tylenol_syrup_kr: { id: "child_tylenol_syrup_kr", nameKR: "어린이 타이레놀 시럽", nameVN: "Panadol Children Syrup", nameUS: "Infant's Tylenol Drops", ingredient: "Acetaminophen 32mg/ml (KR) / 120mg/5ml (VN) / 160mg/5ml (US)", dosageKR: "체중 기준 10~15mg/kg, 4~6시간 간격", dosageVN: "Theo cân nặng, cách 4-6 giờ", dosageUS: "By weight, every 4-6 hours", precautionKR: "하루 최대 5회, 동봉 계량컵 사용", precautionVN: "Tối đa 5 lần/ngày, dùng cốc đo", precautionUS: "Max 5 doses/day, use included syringe" },
  child_brufen_syrup_kr: { id: "child_brufen_syrup_kr", nameKR: "챔프 시럽", nameVN: "Nurofen for Children", nameUS: "Children's Advil", ingredient: "Ibuprofen 20mg/ml (KR) / 100mg/5ml (VN,US)", dosageKR: "체중 기준 5~10mg/kg, 6~8시간 간격", dosageVN: "Theo cân nặng, cách 6-8 giờ", dosageUS: "By weight, every 6-8 hours", precautionKR: "6개월 이상부터 사용 가능", precautionVN: "Dùng từ 6 tháng tuổi", precautionUS: "6 months and older" },
  child_tylenol_chew_kr: { id: "child_tylenol_chew_kr", nameKR: "어린이 타이레놀 츄어블", nameVN: "Panadol Children Chewable", nameUS: "Children's Tylenol Chewable", ingredient: "Acetaminophen 160mg chewable", dosageKR: "연령 기준 1~2정, 4~6시간 간격", dosageVN: "1-2 viên theo tuổi, cách 4-6 giờ", dosageUS: "1-2 tablets by age, every 4-6 hours", precautionKR: "씹어서 복용", precautionVN: "Nhai rồi nuốt", precautionUS: "Chew before swallowing" },
  child_cough_syrup_kr: { id: "child_cough_syrup_kr", nameKR: "어린이 코푸시럽", nameVN: "Prospan for Children", nameUS: "Zarbee's Children's Cough", ingredient: "Guaifenesin(KR) / Ivy leaf(VN) / Honey+Ivy(US)", dosageKR: "연령별 용량, 하루 3회", dosageVN: "Theo tuổi, 3 lần/ngày", dosageUS: "By age, as directed", precautionKR: "어린이 전용", precautionVN: "Dành cho trẻ em", precautionUS: "No honey for under 1 year" },
  child_cough2_kr: { id: "child_cough2_kr", nameKR: "어린이 코데날 시럽", nameVN: "Bổ Phế Nam Hà (trẻ em)", nameUS: "Children's Delsym", ingredient: "Dextromethorphan children's formula", dosageKR: "연령별 용량, 하루 3회", dosageVN: "Theo tuổi, 3 lần/ngày", dosageUS: "By age, every 12 hours", precautionKR: "6세 이상", precautionVN: "Trẻ từ 6 tuổi", precautionUS: "Ages 6+" },
  child_ors_kr: { id: "child_ors_kr", nameKR: "ORS 경구수액 (소아용)", nameVN: "Oresol (trẻ em)", nameUS: "Pedialyte", ingredient: "Electrolyte complex (pediatric)", dosageKR: "소량씩 자주, 체중 기준", dosageVN: "Từng ít một, thường xuyên", dosageUS: "Small sips frequently", precautionKR: "탈수 방지가 가장 중요", precautionVN: "Chống mất nước là quan trọng nhất", precautionUS: "Preventing dehydration is priority" },
  child_smecta_kr: { id: "child_smecta_kr", nameKR: "스멕타 (반포)", nameVN: "Smecta (trẻ em)", nameUS: "Pepto Kids", ingredient: "Diosmectite(KR,VN) / Calcium carbonate(US)", dosageKR: "1포의 절반, 하루 3회 (물에 녹여)", dosageVN: "Nửa gói, 3 lần/ngày", dosageUS: "1 tablet chewed, by age", precautionKR: "수분 보충 병행", precautionVN: "Kèm bổ sung nước", precautionUS: "Stay hydrated" },
  child_zyrtec_kr: { id: "child_zyrtec_kr", nameKR: "지르텍 시럽 (소아용)", nameVN: "Cetirizine syrup (trẻ em)", nameUS: "Children's Zyrtec Syrup", ingredient: "Cetirizine 1mg/ml syrup", dosageKR: "2.5ml, 하루 1회 (2~5세) / 5ml (6세 이상)", dosageVN: "2.5ml, 1 lần/ngày (2-5 tuổi)", dosageUS: "2.5ml once daily (2-5yr) / 5ml (6+)", precautionKR: "졸음 가능, 취침 전 권장", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },
  child_claritin_kr: { id: "child_claritin_kr", nameKR: "클라리틴 시럽 (소아용)", nameVN: "Loratadine syrup (trẻ em)", nameUS: "Children's Claritin", ingredient: "Loratadine 1mg/ml syrup", dosageKR: "5ml, 하루 1회 (6세 이상)", dosageVN: "5ml, 1 lần/ngày (từ 6 tuổi)", dosageUS: "5ml once daily (6+)", precautionKR: "졸음 적음", precautionVN: "Ít gây buồn ngủ", precautionUS: "Non-drowsy" },

  // === Hangover drugs (31) ===
  condition_kr: { id: "condition_kr", nameKR: "컨디션 헛개수", nameVN: "RG Hải (giải rượu)", nameUS: "Pedialyte", ingredient: "헛개나무 추출물(KR) / Herbal(VN) / Electrolytes(US)", dosageKR: "1병, 음주 전후", dosageVN: "1 chai, trước/sau uống rượu", dosageUS: "500ml, sip frequently", precautionKR: "해장 음료", precautionVN: "Nước giải rượu", precautionUS: "Rehydration is priority" },
  brufen_hangover_kr: { id: "brufen_hangover_kr", nameKR: "부루펜 200mg", nameVN: "Gofen 400mg", nameUS: "Advil 200mg", ingredient: "Ibuprofen 200mg(KR) / 400mg(VN) / 200mg(US)", dosageKR: "1정, 식후 복용", dosageVN: "1 viên, sau ăn", dosageUS: "1-2 tablets, with food", precautionKR: "⚠️ 타이레놀보다 간에 안전. 위장 자극 가능", precautionVN: "⚠️ An toàn cho gan hơn Paracetamol. Có thể kích ứng dạ dày", precautionUS: "⚠️ Safer for liver than Tylenol. May irritate stomach" },
  hangover_ors_kr: { id: "hangover_ors_kr", nameKR: "ORS 경구수액", nameVN: "Oresol", nameUS: "Pedialyte", ingredient: "전해질 복합(KR) / Electrolytes(VN,US)", dosageKR: "1포, 물에 타서 수시로", dosageVN: "1 gói pha 1L nước, uống thường xuyên", dosageUS: "Sip frequently throughout the day", precautionKR: "숙취 해소 핵심은 수분 보충", precautionVN: "Bù nước là quan trọng nhất", precautionUS: "Rehydration is the #1 hangover cure" },
  hangover_pocari_kr: { id: "hangover_pocari_kr", nameKR: "포카리스웨트", nameVN: "Pocari Sweat", nameUS: "Gatorade", ingredient: "전해질 음료", dosageKR: "수시로", dosageVN: "Uống thường xuyên", dosageUS: "Sip throughout day", precautionKR: "당분 함량 있음", precautionVN: "Có đường", precautionUS: "Contains sugar" },
  hangover_combo_kr: { id: "hangover_combo_kr", nameKR: "컨디션 + 부루펜 + ORS", nameVN: "RG Hải + Gofen + Oresol", nameUS: "Pedialyte + Advil", ingredient: "해장음료 + Ibuprofen + 전해질", dosageKR: "해장음료 + 진통제(식후) + 수분보충", dosageVN: "Giải rượu + giảm đau(sau ăn) + bù nước", dosageUS: "Rehydrate + pain relief(with food)", precautionKR: "⚠️ 타이레놀 대신 이부프로펜 사용", precautionVN: "⚠️ Dùng Ibuprofen thay vì Paracetamol", precautionUS: "⚠️ Use Ibuprofen, NOT Tylenol" },
};

// === Symptom Categories ===

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: "headache",
    nameKR: "두통", nameEN: "Headache", nameVI: "Đau đầu",
    descKR: "머리가 아픈 증상", descEN: "Pain in the head", descVI: "Triệu chứng đau đầu",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt", descKR: "체온이 37.5도 이상 올라간 상태", descEN: "Body temperature above 37.5°C", descVI: "Nhiệt độ trên 37.5°C" },
      { key: "runnyNose", labelKR: "콧물/코막힘", labelEN: "Runny/stuffy nose", labelVI: "Sổ mũi/nghẹt mũi" },
      { key: "cough", labelKR: "기침", labelEN: "Cough", labelVI: "Ho" },
      { key: "soreThroat", labelKR: "인후통", labelEN: "Sore throat", labelVI: "Đau họng", descKR: "목구멍이 아프고 침 삼킬 때 통증", descEN: "Pain when swallowing", descVI: "Đau khi nuốt" },
      { key: "nausea", labelKR: "구역/구토", labelEN: "Nausea/vomiting", labelVI: "Buồn nôn/nôn", descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling sick to stomach", descVI: "Cảm giác muốn nôn" },
      { key: "stiffNeck", labelKR: "목/어깨 뻣뻣", labelEN: "Stiff neck/shoulders", labelVI: "Cứng cổ/vai" },
      { key: "none", labelKR: "없음 (두통만)", labelEN: "None (headache only)", labelVI: "Không có (chỉ đau đầu)" },
    ],
    combos: [
      // Headache only - mild/moderate
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "h_type", questionKR: "어떤 종류의 두통인가요?", questionEN: "What kind of headache?", questionVI: "Bạn bị đau đầu kiểu nào?", options: [
            { labelKR: "욱신욱신 (맥박치듯)", labelEN: "Throbbing (pulsating)", labelVI: "Nhức nhối (theo nhịp mạch)" },
            { labelKR: "찌릿찌릿 (날카롭게)", labelEN: "Sharp (stabbing)", labelVI: "Đau nhói (sắc nhọn)" },
            { labelKR: "묵직함 (눌리는 느낌)", labelEN: "Dull (pressing)", labelVI: "Đau âm ỉ (nặng đầu)" },
            { labelKR: "조이는 느낌", labelEN: "Squeezing/tightness", labelVI: "Cảm giác bóp chặt" },
          ]},
          { id: "h_location", questionKR: "주로 어디가 아프세요?", questionEN: "Where does it hurt most?", questionVI: "Đau chủ yếu ở đâu?", options: [
            { labelKR: "앞머리 (이마)", labelEN: "Forehead / front", labelVI: "Trán / phía trước" },
            { labelKR: "뒷머리 + 목", labelEN: "Back of head + neck", labelVI: "Sau đầu + cổ" },
            { labelKR: "관자놀이 (양쪽)", labelEN: "Temples (both sides)", labelVI: "Thái dương (hai bên)" },
            { labelKR: "전체", labelEN: "All over", labelVI: "Toàn bộ" },
          ]},
          { id: "h_severity", questionKR: "통증 정도는 어떤가요?", questionEN: "How severe is the pain?", questionVI: "Mức độ đau?", options: [
            { labelKR: "가벼움 (일상생활 가능)", labelEN: "Mild (can carry on)", labelVI: "Nhẹ (sinh hoạt bình thường)" },
            { labelKR: "중간 (집중이 어려움)", labelEN: "Moderate (hard to focus)", labelVI: "Trung bình (khó tập trung)" },
            { labelKR: "심함 (일상생활 어려움)", labelEN: "Severe (can't function)", labelVI: "Nặng (khó sinh hoạt)" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"] },
          "severe": { KR: ["ezn6_kr", "geborin_kr"], VN: ["hapacol_650_vn", "panadol_extra_vn"], US: ["excedrin_us", "advil_400_us"] },
          "child": { KR: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], VN: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], US: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"] },
        },
      },
      // Headache + fever + runnyNose (cold)
      {
        comboKey: "fever+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "tylenol_coldfl_us"] },
        },
      },
      // Headache + fever + cough (cold variant)
      {
        comboKey: "cough+fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"] },
        },
      },
      // Headache + fever (just fever combo)
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "tylenol_coldfl_us"] },
        },
      },
      // Headache + nausea (migraine-like)
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["ezn6_kr", "penzal_kr"], VN: ["panadol_extra_vn", "hapacol_650_vn"], US: ["excedrin_migraine_us", "advil_migraine_us"] },
        },
      },
      // Headache + stiff neck (tension)
      {
        comboKey: "stiffNeck",
        drugMatches: {
          "default": { KR: ["brufen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"] },
        },
      },
      // Headache + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "strepsils_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "cepacol_us"] },
        },
      },
      // Fallback: any other combo
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"] },
        },
      },
    ],
  },
  {
    id: "fever",
    nameKR: "발열", nameEN: "Fever", nameVI: "Sốt",
    descKR: "체온이 37.5도 이상 올라간 상태", descEN: "Body temperature above 37.5°C (99.5°F)", descVI: "Nhiệt độ cơ thể trên 37.5°C",
    companions: [
      { key: "cough", labelKR: "기침", labelEN: "Cough", labelVI: "Ho" },
      { key: "runnyNose", labelKR: "콧물/코막힘", labelEN: "Runny/stuffy nose", labelVI: "Sổ mũi/nghẹt mũi" },
      { key: "soreThroat", labelKR: "인후통", labelEN: "Sore throat", labelVI: "Đau họng", descKR: "목구멍이 아픈 증상", descEN: "Pain in the throat", descVI: "Đau rát cổ họng" },
      { key: "bodyAche", labelKR: "근육통 + 오한", labelEN: "Body aches + chills", labelVI: "Đau cơ + ớn lạnh", descKR: "몸이 으슬으슬 춥고 떨리는 느낌", descEN: "Feeling cold and shivery", descVI: "Cảm giác lạnh và run" },
      { key: "stomachDiarrhea", labelKR: "복통 + 설사", labelEN: "Stomach pain + diarrhea", labelVI: "Đau bụng + tiêu chảy" },
      { key: "rash", labelKR: "피부 발진", labelEN: "Skin rash", labelVI: "Phát ban da", descKR: "피부에 붉은 점이나 반점이 나타남", descEN: "Red spots or patches on skin", descVI: "Xuất hiện đốm hoặc mảng đỏ trên da" },
      { key: "none", labelKR: "없음 (발열만)", labelEN: "None (fever only)", labelVI: "Không có (chỉ sốt)" },
    ],
    combos: [
      // Fever only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "f_temp", questionKR: "체온이 어느 정도인가요?", questionEN: "What is your temperature?", questionVI: "Nhiệt độ bao nhiêu?", options: [
            { labelKR: "미열 (37.5~38°C)", labelEN: "Low-grade (37.5-38°C)", labelVI: "Sốt nhẹ (37.5-38°C)" },
            { labelKR: "중등열 (38~39°C)", labelEN: "Moderate (38-39°C)", labelVI: "Sốt vừa (38-39°C)" },
            { labelKR: "고열 (39°C 이상)", labelEN: "High (above 39°C)", labelVI: "Sốt cao (trên 39°C)" },
          ]},
          { id: "f_duration", questionKR: "언제부터 시작됐나요?", questionEN: "When did it start?", questionVI: "Bắt đầu từ khi nào?", options: [
            { labelKR: "오늘", labelEN: "Today", labelVI: "Hôm nay" },
            { labelKR: "2~3일 전", labelEN: "2-3 days ago", labelVI: "2-3 ngày trước" },
            { labelKR: "일주일 이상", labelEN: "Over a week", labelVI: "Hơn 1 tuần" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"] },
          "child": { KR: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], VN: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], US: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"] },
        },
      },
      // Fever + cough + runnyNose
      {
        comboKey: "cough+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"] },
        },
      },
      // Fever + cough
      {
        comboKey: "cough",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"] },
        },
      },
      // Fever + runnyNose
      {
        comboKey: "runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "theraflu_us"] },
        },
      },
      // Fever + bodyAche (flu-like)
      {
        comboKey: "bodyAche",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["tiffy_vn", "new_ameflu_vn"], US: ["nyquil_us", "tylenol_coldsevere_us"] },
        },
      },
      // Fever + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "strepsils_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "cepacol_us"] },
        },
      },
      // Fever + stomachDiarrhea
      {
        comboKey: "stomachDiarrhea",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "jungrowhan_kr"], VN: ["panadol_500_vn", "berberin_vn"], US: ["tylenol_500_us", "pepto_us"] },
        },
      },
      // Fever + rash → HOSPITAL
      {
        comboKey: "rash",
        hospitalWarning: true,
        warningKR: "발열과 피부 발진이 동반되는 경우 감염성 질환의 가능성이 있습니다. 가까운 병원을 방문하세요.",
        warningEN: "Fever with skin rash may indicate an infectious disease. Please visit a hospital immediately.",
        warningVI: "Sốt kèm phát ban da có thể là dấu hiệu bệnh truyền nhiễm. Vui lòng đến bệnh viện ngay.",
        drugMatches: {},
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"] },
        },
      },
    ],
  },
  // === 3. Cough ===
  {
    id: "cough",
    nameKR: "기침", nameEN: "Cough", nameVI: "Ho",
    descKR: "숨을 내쉴 때 목에서 나는 반사 작용", descEN: "A reflex action clearing the throat", descVI: "Phản xạ ho để làm sạch cổ họng",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt", descKR: "체온이 37.5도 이상 올라간 상태", descEN: "Body temperature above 37.5°C", descVI: "Nhiệt độ trên 37.5°C" },
      { key: "runnyNose", labelKR: "콧물/코막힘", labelEN: "Runny/stuffy nose", labelVI: "Sổ mũi/nghẹt mũi" },
      { key: "soreThroat", labelKR: "인후통", labelEN: "Sore throat", labelVI: "Đau họng", descKR: "목구멍이 아픈 증상", descEN: "Pain in the throat", descVI: "Đau rát cổ họng" },
      { key: "phlegm", labelKR: "가래", labelEN: "Phlegm/mucus", labelVI: "Đờm", descKR: "기침할 때 목에서 나오는 끈적한 분비물", descEN: "Sticky secretion from the throat when coughing", descVI: "Chất nhầy dính từ cổ họng khi ho" },
      { key: "breathless", labelKR: "숨참/쌕쌕", labelEN: "Shortness of breath/wheezing", labelVI: "Khó thở/thở khò khè", descKR: "숨쉬기 어렵거나 쌕쌕 소리가 남", descEN: "Difficulty breathing or wheezing sound", descVI: "Khó thở hoặc phát ra tiếng khò khè" },
      { key: "none", labelKR: "없음 (기침만)", labelEN: "None (cough only)", labelVI: "Không có (chỉ ho)" },
    ],
    combos: [
      // Cough only → follow-up
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "c_type", questionKR: "어떤 기침인가요?", questionEN: "What kind of cough?", questionVI: "Bạn bị ho kiểu nào?", options: [
            { labelKR: "마른기침 (가래 없이 콜록콜록)", labelEN: "Dry cough (no phlegm)", labelVI: "Ho khan (không có đờm)" },
            { labelKR: "가래 있는 기침", labelEN: "Wet cough (with phlegm)", labelVI: "Ho có đờm" },
          ]},
          { id: "c_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it lasted?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "1~3일", labelEN: "1-3 days", labelVI: "1-3 ngày" },
            { labelKR: "일주일", labelEN: "About a week", labelVI: "Khoảng 1 tuần" },
            { labelKR: "2주 이상", labelEN: "Over 2 weeks", labelVI: "Hơn 2 tuần" },
          ]},
          { id: "c_severity", questionKR: "기침 강도는?", questionEN: "How severe?", questionVI: "Mức độ?", options: [
            { labelKR: "가벼움", labelEN: "Mild", labelVI: "Nhẹ" },
            { labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
            { labelKR: "심함 (잠을 못 잘 정도)", labelEN: "Severe (can't sleep)", labelVI: "Nặng (không ngủ được)" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["codenal_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"] },
          "severe": { KR: ["codenal_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"] },
          "child": { KR: ["child_cough_syrup_kr", "child_cough2_kr"], VN: ["child_cough_syrup_kr", "child_cough2_kr"], US: ["child_cough_syrup_kr", "child_cough2_kr"] },
        },
      },
      // Cough + phlegm
      {
        comboKey: "phlegm",
        drugMatches: {
          "default": { KR: ["mucopect_kr", "copus_kr"], VN: ["acc200_vn", "mucosolvan_vn"], US: ["mucinex_us", "robitussin_chest_us"] },
        },
      },
      // Cough + fever + runnyNose → cold
      {
        comboKey: "fever+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["new_ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"] },
        },
      },
      // Cough + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["new_ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"] },
        },
      },
      // Cough + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["strepsils_kr", "codenal_kr"], VN: ["strepsils_kr", "bophe_vn"], US: ["cepacol_us", "delsym_us"] },
        },
      },
      // Cough + breathless → HOSPITAL
      {
        comboKey: "breathless",
        hospitalWarning: true,
        warningKR: "기침과 함께 숨이 차거나 쌕쌕 소리가 나는 경우 천식이나 기관지 질환의 가능성이 있습니다. 가까운 병원을 방문하세요.",
        warningEN: "Cough with shortness of breath or wheezing may indicate asthma or bronchial disease. Please visit a hospital.",
        warningVI: "Ho kèm khó thở hoặc thở khò khè có thể là dấu hiệu hen suyễn hoặc bệnh phế quản. Vui lòng đến bệnh viện.",
        drugMatches: {},
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["codenal_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"] },
        },
      },
    ],
  },
  // === 4. Runny/Stuffy Nose ===
  {
    id: "runnyNose",
    nameKR: "콧물/코막힘", nameEN: "Runny/Stuffy Nose", nameVI: "Sổ mũi/Nghẹt mũi",
    descKR: "코에서 물이 나오거나 코가 막혀서 숨쉬기 어려운 상태", descEN: "Nasal discharge or blocked nose making breathing difficult", descVI: "Chảy nước mũi hoặc nghẹt mũi khó thở",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "cough", labelKR: "기침", labelEN: "Cough", labelVI: "Ho" },
      { key: "sneeze", labelKR: "재채기 + 눈 가려움", labelEN: "Sneezing + itchy eyes", labelVI: "Hắt hơi + ngứa mắt", descKR: "알레르기 반응일 수 있어요", descEN: "Could be an allergic reaction", descVI: "Có thể là phản ứng dị ứng" },
      { key: "facePressure", labelKR: "두통 + 얼굴 압박감", labelEN: "Headache + facial pressure", labelVI: "Đau đầu + áp lực mặt", descKR: "이마나 볼 주변이 눌리는 느낌", descEN: "Pressing feeling around forehead/cheeks", descVI: "Cảm giác đè nén quanh trán/má" },
      { key: "soreThroat", labelKR: "인후통", labelEN: "Sore throat", labelVI: "Đau họng" },
      { key: "none", labelKR: "없음 (콧물/코막힘만)", labelEN: "None (nose symptoms only)", labelVI: "Không có (chỉ triệu chứng mũi)" },
    ],
    combos: [
      // Nose only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "n_type", questionKR: "어떤 증상인가요?", questionEN: "What type of symptom?", questionVI: "Triệu chứng gì?", options: [
            { labelKR: "콧물", labelEN: "Runny nose", labelVI: "Sổ mũi" },
            { labelKR: "코막힘", labelEN: "Stuffy nose", labelVI: "Nghẹt mũi" },
            { labelKR: "둘 다", labelEN: "Both", labelVI: "Cả hai" },
          ]},
          { id: "n_color", questionKR: "콧물 색은?", questionEN: "Mucus color?", questionVI: "Màu nước mũi?", options: [
            { labelKR: "맑은 (투명)", labelEN: "Clear", labelVI: "Trong suốt" },
            { labelKR: "노란색", labelEN: "Yellow", labelVI: "Vàng" },
            { labelKR: "초록색", labelEN: "Green", labelVI: "Xanh" },
          ]},
          { id: "n_severity", questionKR: "증상 정도는?", questionEN: "How severe?", questionVI: "Mức độ?", options: [
            { labelKR: "가벼움", labelEN: "Mild", labelVI: "Nhẹ" },
            { labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
            { labelKR: "심함", labelEN: "Severe", labelVI: "Nặng" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["contac600_kr", "otrivin_kr"], VN: ["otrivin_vn", "coldib_vn"], US: ["sudafed_us", "afrin_us"] },
        },
      },
      // Nose + sneeze → allergy
      {
        comboKey: "sneeze",
        drugMatches: {
          "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"] },
        },
      },
      // Nose + fever + cough → cold
      {
        comboKey: "cough+fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"] },
        },
      },
      // Nose + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"] },
        },
      },
      // Nose + facePressure → sinusitis
      {
        comboKey: "facePressure",
        drugMatches: {
          "default": { KR: ["contac600_kr", "sinechura_kr"], VN: ["otrivin_vn", "decolgen_forte_vn"], US: ["advil_sinus_us", "sudafed_us"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["contac600_kr", "otrivin_kr"], VN: ["otrivin_vn", "coldib_vn"], US: ["sudafed_us", "afrin_us"] },
        },
      },
    ],
  },
  // === 5. Sore Throat ===
  {
    id: "soreThroat",
    nameKR: "인후통", nameEN: "Sore Throat", nameVI: "Đau họng",
    descKR: "목구멍이 아프고 침 삼킬 때 통증이 있는 증상", descEN: "Pain in the throat, especially when swallowing", descVI: "Đau rát cổ họng, đặc biệt khi nuốt",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "cough", labelKR: "기침", labelEN: "Cough", labelVI: "Ho" },
      { key: "runnyNose", labelKR: "콧물", labelEN: "Runny nose", labelVI: "Sổ mũi" },
      { key: "swallowHighFever", labelKR: "삼킬 때 심함 + 고열", labelEN: "Severe when swallowing + high fever", labelVI: "Đau nặng khi nuốt + sốt cao", descKR: "편도선이 부었을 수 있어요", descEN: "Tonsils may be swollen", descVI: "Có thể viêm amidan" },
      { key: "voiceChange", labelKR: "목소리 변화", labelEN: "Voice changes", labelVI: "Thay đổi giọng", descKR: "쉰 목소리가 나는 상태", descEN: "Hoarse voice", descVI: "Giọng khàn" },
      { key: "none", labelKR: "없음 (인후통만)", labelEN: "None (sore throat only)", labelVI: "Không có (chỉ đau họng)" },
    ],
    combos: [
      // Sore throat only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "st_type", questionKR: "어떤 느낌인가요?", questionEN: "What does it feel like?", questionVI: "Cảm giác như thế nào?", options: [
            { labelKR: "따끔따끔", labelEN: "Stinging", labelVI: "Châm chích" },
            { labelKR: "타는 듯", labelEN: "Burning", labelVI: "Rát bỏng" },
            { labelKR: "삼킬 때만 아픔", labelEN: "Only hurts when swallowing", labelVI: "Chỉ đau khi nuốt" },
            { labelKR: "항상 아픔", labelEN: "Constant pain", labelVI: "Đau liên tục" },
          ]},
          { id: "st_duration", questionKR: "얼마나 됐나요?", questionEN: "How long?", questionVI: "Đã bao lâu?", options: [
            { labelKR: "오늘 시작", labelEN: "Started today", labelVI: "Bắt đầu hôm nay" },
            { labelKR: "2~3일", labelEN: "2-3 days", labelVI: "2-3 ngày" },
            { labelKR: "일주일 이상", labelEN: "Over a week", labelVI: "Hơn 1 tuần" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["strepsils_kr", "mokan_kr"], VN: ["strepsils_kr", "eugica_vn"], US: ["cepacol_us", "chloraseptic_us"] },
        },
      },
      // Sore throat + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "strepsils_kr"], VN: ["panadol_500_vn", "strepsils_kr"], US: ["tylenol_500_us", "cepacol_us"] },
        },
      },
      // Sore throat + cough
      {
        comboKey: "cough",
        drugMatches: {
          "default": { KR: ["strepsils_kr", "codenal_kr"], VN: ["strepsils_kr", "bophe_vn"], US: ["cepacol_us", "delsym_us"] },
        },
      },
      // Sore throat + swallow + high fever → HOSPITAL
      {
        comboKey: "swallowHighFever",
        hospitalWarning: true,
        warningKR: "심한 인후통과 고열이 함께 나타나는 경우 편도염이나 세균 감염의 가능성이 있습니다. 항생제가 필요할 수 있으므로 병원을 방문하세요.",
        warningEN: "Severe sore throat with high fever may indicate tonsillitis or bacterial infection. Antibiotics may be needed. Please visit a hospital.",
        warningVI: "Đau họng nặng kèm sốt cao có thể là viêm amidan hoặc nhiễm khuẩn. Có thể cần kháng sinh. Vui lòng đến bệnh viện.",
        drugMatches: {},
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["strepsils_kr", "mokan_kr"], VN: ["strepsils_kr", "eugica_vn"], US: ["cepacol_us", "chloraseptic_us"] },
        },
      },
    ],
  },
  // === 6. Stomachache ===
  {
    id: "stomachache",
    nameKR: "복통", nameEN: "Stomachache", nameVI: "Đau bụng",
    descKR: "배가 아픈 증상", descEN: "Pain in the abdomen", descVI: "Đau vùng bụng",
    companions: [
      { key: "diarrhea", labelKR: "설사", labelEN: "Diarrhea", labelVI: "Tiêu chảy", descKR: "묽은 변을 자주 보는 상태", descEN: "Frequent loose stools", descVI: "Đi phân lỏng nhiều lần" },
      { key: "nausea", labelKR: "구역/구토", labelEN: "Nausea/vomiting", labelVI: "Buồn nôn/nôn", descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling sick to stomach", descVI: "Cảm giác muốn nôn" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "heartburn", labelKR: "속쓰림", labelEN: "Heartburn", labelVI: "Ợ nóng", descKR: "명치 부근이 화끈거리는 느낌", descEN: "Burning sensation near the chest", descVI: "Cảm giác nóng rát vùng ngực" },
      { key: "constipation", labelKR: "변비", labelEN: "Constipation", labelVI: "Táo bón", descKR: "대변이 나오지 않는 상태", descEN: "Difficulty passing stool", descVI: "Khó đi đại tiện" },
      { key: "bloating", labelKR: "팽만감", labelEN: "Bloating", labelVI: "Đầy hơi", descKR: "배에 가스가 차서 빵빵한 느낌", descEN: "Feeling of fullness from gas", descVI: "Cảm giác bụng căng đầy hơi" },
      { key: "none", labelKR: "없음 (복통만)", labelEN: "None (stomachache only)", labelVI: "Không có (chỉ đau bụng)" },
    ],
    combos: [
      // Stomach only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "s_loc", questionKR: "어디가 아프세요?", questionEN: "Where does it hurt?", questionVI: "Đau ở đâu?", options: [
            { labelKR: "윗배 (명치)", labelEN: "Upper abdomen (epigastric)", labelVI: "Bụng trên (thượng vị)" },
            { labelKR: "아랫배", labelEN: "Lower abdomen", labelVI: "Bụng dưới" },
            { labelKR: "오른쪽", labelEN: "Right side", labelVI: "Bên phải" },
            { labelKR: "전체", labelEN: "All over", labelVI: "Toàn bộ" },
          ]},
          { id: "s_type", questionKR: "어떤 느낌인가요?", questionEN: "What does it feel like?", questionVI: "Cảm giác thế nào?", options: [
            { labelKR: "쥐어짜는 느낌", labelEN: "Cramping", labelVI: "Co thắt" },
            { labelKR: "콕콕 찌르는 느낌", labelEN: "Stabbing", labelVI: "Đau nhói" },
            { labelKR: "더부룩한 느낌", labelEN: "Dull/bloated", labelVI: "Đầy bụng" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["buscopan_kr", "doctorbear_kr"], VN: ["buscopan_vn", "nospa_vn"], US: ["pepto_us", "gasx_us"] },
        },
      },
      // Stomach + diarrhea
      {
        comboKey: "diarrhea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"] },
        },
      },
      // Stomach + nausea
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "domperidone_kr"], VN: ["buscopan_vn", "motilium_vn"], US: ["pepto_us", "dramamine_us"] },
        },
      },
      // Stomach + heartburn
      {
        comboKey: "heartburn",
        drugMatches: {
          "default": { KR: ["gelpos_kr", "almagel_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"] },
        },
      },
      // Stomach + bloating
      {
        comboKey: "bloating",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "doctorbear_kr"], VN: ["activated_charcoal_vn", "airx_vn"], US: ["gasx_us", "beano_us"] },
        },
      },
      // Stomach + fever (right lower + fever → hospital for appendicitis is handled by the hospital combo below)
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "tylenol_500_kr"], VN: ["buscopan_vn", "panadol_500_vn"], US: ["pepto_us", "tylenol_500_us"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "doctorbear_kr"], VN: ["buscopan_vn", "nospa_vn"], US: ["pepto_us", "gasx_us"] },
        },
      },
    ],
  },
  // === 7. Diarrhea ===
  {
    id: "diarrhea",
    nameKR: "설사", nameEN: "Diarrhea", nameVI: "Tiêu chảy",
    descKR: "묽은 변을 자주 보는 상태", descEN: "Frequent loose or watery stools", descVI: "Đi phân lỏng nhiều lần",
    companions: [
      { key: "nausea", labelKR: "구역/구토", labelEN: "Nausea/vomiting", labelVI: "Buồn nôn/nôn", descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling sick", descVI: "Cảm giác muốn nôn" },
      { key: "stomachPain", labelKR: "복통", labelEN: "Stomach pain", labelVI: "Đau bụng" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "bloodyStool", labelKR: "혈변", labelEN: "Bloody stool", labelVI: "Phân có máu", descKR: "대변에 피가 섞여 나오는 상태", descEN: "Blood in stool", descVI: "Phân có lẫn máu" },
      { key: "none", labelKR: "없음 (설사만)", labelEN: "None (diarrhea only)", labelVI: "Không có (chỉ tiêu chảy)" },
    ],
    combos: [
      // Diarrhea only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "d_freq", questionKR: "하루에 몇 번?", questionEN: "How many times per day?", questionVI: "Bao nhiêu lần/ngày?", options: [
            { labelKR: "3회 미만", labelEN: "Less than 3", labelVI: "Dưới 3 lần" },
            { labelKR: "3~5회", labelEN: "3-5 times", labelVI: "3-5 lần" },
            { labelKR: "5회 이상", labelEN: "More than 5", labelVI: "Hơn 5 lần" },
          ]},
          { id: "d_type", questionKR: "어떤 형태인가요?", questionEN: "What type?", questionVI: "Dạng nào?", options: [
            { labelKR: "묽은 변", labelEN: "Loose stool", labelVI: "Phân lỏng" },
            { labelKR: "물설사", labelEN: "Watery diarrhea", labelVI: "Phân nước" },
            { labelKR: "점액 섞임", labelEN: "With mucus", labelVI: "Có chất nhầy" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"] },
          "severe": { KR: ["ors_kr", "pocari_kr"], VN: ["oresol_vn", "hydrite_vn"], US: ["pedialyte_us", "dripdrop_us"] },
          "child": { KR: ["child_ors_kr", "child_smecta_kr"], VN: ["child_ors_kr", "child_smecta_kr"], US: ["child_ors_kr", "child_smecta_kr"] },
        },
      },
      // Diarrhea + nausea → dehydration risk
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "ors_kr"], VN: ["berberin_vn", "oresol_vn"], US: ["imodium_us", "pedialyte_us"] },
        },
      },
      // Diarrhea + fever → infectious
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "tylenol_500_kr"], VN: ["berberin_vn", "panadol_500_vn"], US: ["imodium_us", "tylenol_500_us"] },
        },
      },
      // Diarrhea + bloody stool → HOSPITAL
      {
        comboKey: "bloodyStool",
        hospitalWarning: true,
        warningKR: "대변에 피가 섞여 나오는 경우 즉시 병원을 방문하세요. 약으로 해결할 수 있는 상태가 아닙니다.",
        warningEN: "Blood in stool requires immediate medical attention. This cannot be resolved with OTC medication.",
        warningVI: "Phân có máu cần được khám ngay. Không thể điều trị bằng thuốc không kê đơn.",
        drugMatches: {},
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"] },
        },
      },
    ],
  },
  // === 8. Indigestion ===
  {
    id: "indigestion",
    nameKR: "소화불량", nameEN: "Indigestion", nameVI: "Khó tiêu",
    descKR: "음식이 잘 안 내려가고 더부룩한 상태", descEN: "Difficulty digesting food, bloated feeling", descVI: "Khó tiêu hóa thức ăn, cảm giác đầy bụng",
    companions: [
      { key: "heartburn", labelKR: "속쓰림", labelEN: "Heartburn", labelVI: "Ợ nóng", descKR: "명치 부근이 화끈거리는 느낌", descEN: "Burning near the chest", descVI: "Nóng rát vùng ngực" },
      { key: "nausea", labelKR: "구역", labelEN: "Nausea", labelVI: "Buồn nôn" },
      { key: "bloating", labelKR: "복부 팽만감", labelEN: "Abdominal bloating", labelVI: "Đầy hơi bụng", descKR: "배가 빵빵하게 부푼 느낌", descEN: "Feeling swollen in the belly", descVI: "Cảm giác bụng căng phồng" },
      { key: "stomachPain", labelKR: "복통", labelEN: "Stomach pain", labelVI: "Đau bụng" },
      { key: "none", labelKR: "없음 (소화불량만)", labelEN: "None (indigestion only)", labelVI: "Không có (chỉ khó tiêu)" },
    ],
    combos: [
      // Indigestion only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "i_type", questionKR: "어떤 증상인가요?", questionEN: "What symptoms?", questionVI: "Triệu chứng gì?", options: [
            { labelKR: "더부룩함", labelEN: "Bloated feeling", labelVI: "Cảm giác đầy bụng" },
            { labelKR: "가스가 참", labelEN: "Gassy", labelVI: "Nhiều hơi" },
            { labelKR: "속이 꽉 찬 느낌", labelEN: "Feeling full", labelVI: "Cảm giác no căng" },
          ]},
          { id: "i_meal", questionKR: "식사와 관련 있나요?", questionEN: "Related to meals?", questionVI: "Liên quan đến bữa ăn?", options: [
            { labelKR: "식후 악화", labelEN: "Worse after eating", labelVI: "Nặng hơn sau ăn" },
            { labelKR: "공복에 악화", labelEN: "Worse on empty stomach", labelVI: "Nặng hơn khi đói" },
            { labelKR: "관계없음", labelEN: "Not related", labelVI: "Không liên quan" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["beaze_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["gasx_us", "beano_us"] },
        },
      },
      // Indigestion + heartburn
      {
        comboKey: "heartburn",
        drugMatches: {
          "default": { KR: ["gelpos_kr", "famotidine_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"] },
        },
      },
      // Indigestion + bloating
      {
        comboKey: "bloating",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "doctorbear_kr"], VN: ["activated_charcoal_vn", "airx_vn"], US: ["gasx_us", "phazyme_us"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["beaze_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["gasx_us", "beano_us"] },
        },
      },
    ],
  },
  // === 9. Nausea/Vomiting ===
  {
    id: "nausea",
    nameKR: "구역/구토", nameEN: "Nausea/Vomiting", nameVI: "Buồn nôn/Nôn",
    descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling sick to stomach or vomiting", descVI: "Cảm giác buồn nôn hoặc nôn",
    companions: [
      { key: "diarrheaPain", labelKR: "설사 + 복통", labelEN: "Diarrhea + stomach pain", labelVI: "Tiêu chảy + đau bụng", descKR: "식중독/장염일 수 있어요", descEN: "Could be food poisoning", descVI: "Có thể ngộ độc thực phẩm" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "headacheDizzy", labelKR: "두통 + 어지러움", labelEN: "Headache + dizziness", labelVI: "Đau đầu + chóng mặt" },
      { key: "pregnancy", labelKR: "임신 가능성", labelEN: "Possible pregnancy", labelVI: "Có thể mang thai", descKR: "입덧일 수 있어요", descEN: "Could be morning sickness", descVI: "Có thể là ốm nghén" },
      { key: "none", labelKR: "없음 (구역/구토만)", labelEN: "None (nausea only)", labelVI: "Không có (chỉ buồn nôn)" },
    ],
    combos: [
      // Nausea only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "nv_state", questionKR: "어떤 상태인가요?", questionEN: "What is the state?", questionVI: "Tình trạng thế nào?", options: [
            { labelKR: "메스꺼움만", labelEN: "Just nausea", labelVI: "Chỉ buồn nôn" },
            { labelKR: "실제 구토 있음", labelEN: "Actually vomiting", labelVI: "Có nôn thực tế" },
          ]},
          { id: "nv_cause", questionKR: "원인이 있나요?", questionEN: "Any known cause?", questionVI: "Có nguyên nhân không?", options: [
            { labelKR: "음식", labelEN: "Food", labelVI: "Thức ăn" },
            { labelKR: "멀미", labelEN: "Motion sickness", labelVI: "Say tàu xe" },
            { labelKR: "약 복용 후", labelEN: "After taking medicine", labelVI: "Sau khi uống thuốc" },
            { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["domperidone_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["dramamine_us", "emetrol_us"] },
        },
      },
      // Motion sickness (detected via follow-up answer "멀미")
      {
        comboKey: "motionSickness",
        drugMatches: {
          "default": { KR: ["kimite_kr", "bonaring_kr"], VN: ["nautamine_vn", "dimenhydrinate_vn"], US: ["dramamine_us", "bonine_us"] },
        },
      },
      // Nausea + diarrhea+pain → food poisoning
      {
        comboKey: "diarrheaPain",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "domperidone_kr"], VN: ["berberin_vn", "motilium_vn"], US: ["pepto_us", "dramamine_us"] },
        },
      },
      // Nausea + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["domperidone_kr", "tylenol_500_kr"], VN: ["domperidone_vn", "panadol_500_vn"], US: ["dramamine_us", "tylenol_500_us"] },
        },
      },
      // Nausea + pregnancy → consult doctor
      {
        comboKey: "pregnancy",
        hospitalWarning: true,
        warningKR: "임신 중 구역/구토가 있는 경우 의사와 상담하세요. 임산부에게 안전한 약을 처방받으시기 바랍니다.",
        warningEN: "If you experience nausea during pregnancy, please consult a doctor for pregnancy-safe medication.",
        warningVI: "Nếu buồn nôn khi mang thai, vui lòng tham khảo bác sĩ để được kê đơn thuốc an toàn.",
        drugMatches: {},
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["domperidone_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["dramamine_us", "emetrol_us"] },
        },
      },
    ],
  },
  // === 10. Muscle Pain ===
  {
    id: "musclePain",
    nameKR: "근육통", nameEN: "Muscle Pain", nameVI: "Đau cơ",
    descKR: "근육이 뻐근하고 아픈 상태", descEN: "Aching or sore muscles", descVI: "Cơ bắp đau nhức",
    companions: [
      { key: "feverChills", labelKR: "발열 + 오한", labelEN: "Fever + chills", labelVI: "Sốt + ớn lạnh", descKR: "몸이 으슬으슬 춥고 떨리는 느낌", descEN: "Feeling cold and shivery", descVI: "Cảm giác lạnh và run" },
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "jointPain", labelKR: "관절통", labelEN: "Joint pain", labelVI: "Đau khớp" },
      { key: "none", labelKR: "없음 (근육통만)", labelEN: "None (muscle pain only)", labelVI: "Không có (chỉ đau cơ)" },
    ],
    combos: [
      // Muscle pain only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "m_loc", questionKR: "어디가 아프세요?", questionEN: "Where does it hurt?", questionVI: "Đau ở đâu?", options: [
            { labelKR: "목/어깨", labelEN: "Neck/shoulders", labelVI: "Cổ/vai" },
            { labelKR: "등/허리", labelEN: "Back/lower back", labelVI: "Lưng/thắt lưng" },
            { labelKR: "팔/다리", labelEN: "Arms/legs", labelVI: "Tay/chân" },
            { labelKR: "전신", labelEN: "All over", labelVI: "Toàn thân" },
          ]},
          { id: "m_cause", questionKR: "원인이 있나요?", questionEN: "Any known cause?", questionVI: "Có nguyên nhân không?", options: [
            { labelKR: "운동 후", labelEN: "After exercise", labelVI: "Sau tập thể dục" },
            { labelKR: "장시간 같은 자세", labelEN: "Long posture", labelVI: "Ngồi/đứng lâu" },
            { labelKR: "원인 모름", labelEN: "Unknown", labelVI: "Không rõ" },
          ]},
          { id: "m_scope", questionKR: "통증 범위는?", questionEN: "Pain scope?", questionVI: "Phạm vi đau?", options: [
            { labelKR: "특정 부위만 (국소)", labelEN: "Specific area (local)", labelVI: "Chỉ một vùng (cục bộ)" },
            { labelKR: "넓은 범위 (전신)", labelEN: "Wide area (systemic)", labelVI: "Rộng (toàn thân)" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"] },
          "severe": { KR: ["ketotop_kr", "airpas_kr"], VN: ["salonpas_vn", "tigerbalm_vn"], US: ["icyhot_us", "bengay_us"] },
        },
      },
      // Muscle pain + fever + chills → flu
      {
        comboKey: "feverChills",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "nyquil_us"] },
        },
      },
      // Muscle pain + headache
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "tylenol_500_us"] },
        },
      },
      // Muscle pain + jointPain
      {
        comboKey: "jointPain",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"] },
        },
      },
    ],
  },
  // === 11. Back Pain ===
  {
    id: "backPain",
    nameKR: "요통/허리통증", nameEN: "Back Pain", nameVI: "Đau lưng",
    descKR: "허리가 아픈 증상", descEN: "Pain in the back/lower back", descVI: "Đau vùng lưng/thắt lưng",
    companions: [
      { key: "legNumb", labelKR: "다리 저림/방사통", labelEN: "Leg numbness/radiating pain", labelVI: "Tê chân/đau lan", descKR: "허리에서 다리로 뻗치는 통증", descEN: "Pain radiating from back to legs", descVI: "Đau lan từ lưng xuống chân" },
      { key: "urineIssue", labelKR: "소변 이상", labelEN: "Urinary problems", labelVI: "Vấn đề tiểu tiện", descKR: "소변 볼 때 아프거나 색이 이상함", descEN: "Pain or abnormal color when urinating", descVI: "Đau hoặc màu bất thường khi đi tiểu" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "none", labelKR: "없음 (요통만)", labelEN: "None (back pain only)", labelVI: "Không có (chỉ đau lưng)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "bp_loc", questionKR: "어디가 아프세요?", questionEN: "Where does it hurt?", questionVI: "Đau ở đâu?", options: [
            { labelKR: "윗허리", labelEN: "Upper back", labelVI: "Lưng trên" },
            { labelKR: "아랫허리 (허리띠 부근)", labelEN: "Lower back", labelVI: "Thắt lưng" },
            { labelKR: "한쪽만", labelEN: "One side only", labelVI: "Một bên" },
          ]},
          { id: "bp_type", questionKR: "어떤 느낌인가요?", questionEN: "What does it feel like?", questionVI: "Cảm giác thế nào?", options: [
            { labelKR: "뻐근함", labelEN: "Stiff/aching", labelVI: "Nhức mỏi" },
            { labelKR: "찌릿찌릿", labelEN: "Tingling/sharp", labelVI: "Tê nhói" },
            { labelKR: "쑤시는 느낌", labelEN: "Throbbing", labelVI: "Nhức nhối" },
          ]},
          { id: "bp_severity", questionKR: "통증 정도는?", questionEN: "How severe?", questionVI: "Mức độ?", options: [
            { labelKR: "가벼움", labelEN: "Mild", labelVI: "Nhẹ" },
            { labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
            { labelKR: "심함", labelEN: "Severe", labelVI: "Nặng" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "tylenol_500_us"] },
          "severe": { KR: ["ezn6_kr", "nacsen_kr"], VN: ["celebrex_vn", "arcoxia_vn"], US: ["aleve_us", "advil_400_us"] },
        },
      },
      { comboKey: "legNumb", hospitalWarning: true, warningKR: "허리 통증과 다리 저림이 함께 나타나면 디스크(추간판 탈출증)의 가능성이 있습니다. 정형외과 또는 신경외과를 방문하세요.", warningEN: "Back pain with leg numbness may indicate a herniated disc. Please visit an orthopedic or neurosurgery clinic.", warningVI: "Đau lưng kèm tê chân có thể là thoát vị đĩa đệm. Vui lòng đến khoa chỉnh hình hoặc thần kinh.", drugMatches: {} },
      { comboKey: "urineIssue", hospitalWarning: true, warningKR: "허리 통증과 소변 이상이 함께 나타나면 신장 결석이나 요로 감염의 가능성이 있습니다. 비뇨기과를 방문하세요.", warningEN: "Back pain with urinary problems may indicate kidney stones or UTI. Please visit a urologist.", warningVI: "Đau lưng kèm vấn đề tiểu tiện có thể là sỏi thận hoặc nhiễm trùng đường tiết niệu. Vui lòng đến khoa tiết niệu.", drugMatches: {} },
      { comboKey: "fever", hospitalWarning: true, warningKR: "허리 통증과 발열이 함께 나타나면 감염의 가능성이 있습니다. 병원을 방문하세요.", warningEN: "Back pain with fever may indicate an infection. Please visit a hospital.", warningVI: "Đau lưng kèm sốt có thể là nhiễm trùng. Vui lòng đến bệnh viện.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"] } } },
    ],
  },
  // === 12. Allergy ===
  {
    id: "allergy",
    nameKR: "알레르기", nameEN: "Allergy", nameVI: "Dị ứng",
    descKR: "특정 물질에 몸이 과민하게 반응하는 것", descEN: "Overreaction of the body to certain substances", descVI: "Cơ thể phản ứng quá mức với một số chất",
    companions: [
      { key: "nasalSneeze", labelKR: "콧물 + 재채기", labelEN: "Runny nose + sneezing", labelVI: "Sổ mũi + hắt hơi", descKR: "코 알레르기일 수 있어요", descEN: "Could be nasal allergy", descVI: "Có thể dị ứng mũi" },
      { key: "eyeItch", labelKR: "눈 가려움/충혈", labelEN: "Itchy/red eyes", labelVI: "Ngứa/đỏ mắt", descKR: "눈 알레르기일 수 있어요", descEN: "Could be eye allergy", descVI: "Có thể dị ứng mắt" },
      { key: "skinRash", labelKR: "피부 발진/가려움", labelEN: "Skin rash/itching", labelVI: "Phát ban/ngứa da", descKR: "피부 알레르기일 수 있어요", descEN: "Could be skin allergy", descVI: "Có thể dị ứng da" },
      { key: "coughBreathless", labelKR: "기침/숨참", labelEN: "Cough/shortness of breath", labelVI: "Ho/khó thở", descKR: "천식 가능성", descEN: "Could be asthma", descVI: "Có thể là hen suyễn" },
      { key: "none", labelKR: "없음", labelEN: "None", labelVI: "Không có" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "al_loc", questionKR: "주로 어디에 증상이 있나요?", questionEN: "Where are the symptoms?", questionVI: "Triệu chứng ở đâu?", options: [
          { labelKR: "코", labelEN: "Nose", labelVI: "Mũi" },
          { labelKR: "눈", labelEN: "Eyes", labelVI: "Mắt" },
          { labelKR: "피부", labelEN: "Skin", labelVI: "Da" },
          { labelKR: "전신", labelEN: "All over", labelVI: "Toàn thân" },
        ]},
        { id: "al_cause", questionKR: "원인이 있나요?", questionEN: "Any known cause?", questionVI: "Có nguyên nhân không?", options: [
          { labelKR: "꽃가루/먼지", labelEN: "Pollen/dust", labelVI: "Phấn hoa/bụi" },
          { labelKR: "음식", labelEN: "Food", labelVI: "Thức ăn" },
          { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
        ]},
      ], drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"] }, "child": { KR: ["child_zyrtec_kr", "child_claritin_kr"], VN: ["child_zyrtec_kr", "child_claritin_kr"], US: ["child_zyrtec_kr", "child_claritin_kr"] } } },
      { comboKey: "nasalSneeze", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"] }, "child": { KR: ["child_zyrtec_kr", "child_claritin_kr"], VN: ["child_zyrtec_kr", "child_claritin_kr"], US: ["child_zyrtec_kr", "child_claritin_kr"] } } },
      { comboKey: "eyeItch", drugMatches: { "default": { KR: ["cromolin_kr", "zyrtec_kr"], VN: ["cromolin_vn", "cetirizine_vn"], US: ["zaditor_us", "pataday_us"] } } },
      { comboKey: "skinRash", drugMatches: { "default": { KR: ["zyrtec_kr", "hydrocortisone_kr"], VN: ["cetirizine_vn", "phenergan_vn"], US: ["benadryl_us", "cortisone10_us"] } } },
      { comboKey: "coughBreathless", hospitalWarning: true, warningKR: "알레르기와 함께 기침이나 숨참이 나타나면 천식의 가능성이 있습니다. 호흡기내과를 방문하세요.", warningEN: "Allergy with cough or shortness of breath may indicate asthma. Please visit a pulmonologist.", warningVI: "Dị ứng kèm ho hoặc khó thở có thể là hen suyễn. Vui lòng đến khoa hô hấp.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"] } } },
    ],
  },
  // === 13. Skin Rash/Itching ===
  {
    id: "skinRash",
    nameKR: "피부 발진/가려움", nameEN: "Skin Rash/Itching", nameVI: "Phát ban/Ngứa da",
    descKR: "피부가 빨갛게 되거나 가려운 상태", descEN: "Red or itchy skin condition", descVI: "Da đỏ hoặc ngứa",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "swellingBreathless", labelKR: "부종/숨참", labelEN: "Swelling/breathing difficulty", labelVI: "Sưng phù/khó thở", descKR: "몸이 붓거나 숨쉬기 어려움 - 응급", descEN: "Swelling or difficulty breathing - EMERGENCY", descVI: "Sưng hoặc khó thở - CẤP CỨU" },
      { key: "sneeze", labelKR: "콧물/재채기", labelEN: "Runny nose/sneezing", labelVI: "Sổ mũi/hắt hơi" },
      { key: "none", labelKR: "없음 (피부만)", labelEN: "None (skin only)", labelVI: "Không có (chỉ da)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "sk_type", questionKR: "어떤 형태인가요?", questionEN: "What does it look like?", questionVI: "Trông như thế nào?", options: [
          { labelKR: "벌레 물림", labelEN: "Bug bite", labelVI: "Côn trùng cắn" },
          { labelKR: "두드러기 (붉고 부풀어오름)", labelEN: "Hives (red, raised bumps)", labelVI: "Mề đay (sưng đỏ)" },
          { labelKR: "건조/각질", labelEN: "Dry/flaky skin", labelVI: "Da khô/bong tróc" },
          { labelKR: "붉은 반점", labelEN: "Red patches", labelVI: "Mảng đỏ" },
        ]},
        { id: "sk_itch", questionKR: "가려움이 있나요?", questionEN: "Is it itchy?", questionVI: "Có ngứa không?", options: [
          { labelKR: "있음", labelEN: "Yes", labelVI: "Có" },
          { labelKR: "없음", labelEN: "No", labelVI: "Không" },
        ]},
      ], drugMatches: { "default": { KR: ["mullindi_kr", "bumugli_kr"], VN: ["tigerbalm_vn", "salonpas_vn"], US: ["benadryl_cream_us", "cortisone10_us"] } } },
      { comboKey: "fever", hospitalWarning: true, warningKR: "피부 발진과 발열이 함께 나타나면 감염성 질환의 가능성이 있습니다. 병원을 방문하세요.", warningEN: "Skin rash with fever may indicate an infectious disease. Please visit a hospital.", warningVI: "Phát ban kèm sốt có thể là bệnh truyền nhiễm. Vui lòng đến bệnh viện.", drugMatches: {} },
      { comboKey: "swellingBreathless", hospitalWarning: true, warningKR: "피부 발진과 함께 부종이나 숨참이 나타나면 아나필락시스(심한 알레르기 응급반응)의 가능성이 있습니다. 즉시 119 또는 현지 응급번호로 전화하세요.", warningEN: "Skin rash with swelling or breathing difficulty may indicate anaphylaxis (severe allergic emergency). Call 911 or local emergency number IMMEDIATELY.", warningVI: "Phát ban kèm sưng hoặc khó thở có thể là sốc phản vệ (cấp cứu dị ứng nặng). Gọi 115 hoặc số cấp cứu địa phương NGAY LẬP TỨC.", drugMatches: {} },
      { comboKey: "sneeze", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"] } } },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["zyrtec_kr", "hydrocortisone_kr"], VN: ["cetirizine_vn", "phenergan_vn"], US: ["benadryl_us", "cortisone10_us"] } } },
    ],
  },
  // === 14. Menstrual Pain ===
  {
    id: "menstrualPain",
    nameKR: "생리통", nameEN: "Menstrual Pain", nameVI: "Đau bụng kinh",
    descKR: "생리 기간 중 아랫배가 아픈 증상", descEN: "Lower abdominal pain during menstruation", descVI: "Đau bụng dưới trong kỳ kinh nguyệt",
    companions: [
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "nausea", labelKR: "구역", labelEN: "Nausea", labelVI: "Buồn nôn", descKR: "메스꺼운 느낌", descEN: "Feeling sick", descVI: "Cảm giác muốn nôn" },
      { key: "backPain", labelKR: "요통", labelEN: "Back pain", labelVI: "Đau lưng", descKR: "허리가 같이 아픈 경우", descEN: "Back hurts too", descVI: "Đau lưng kèm theo" },
      { key: "heavyBleeding", labelKR: "과다출혈", labelEN: "Heavy bleeding", labelVI: "Ra máu nhiều", descKR: "생리양이 비정상적으로 많은 상태", descEN: "Abnormally heavy period flow", descVI: "Lượng kinh nguyệt nhiều bất thường" },
      { key: "none", labelKR: "없음 (생리통만)", labelEN: "None (cramps only)", labelVI: "Không có (chỉ đau bụng kinh)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "mp_sev", questionKR: "통증 강도는?", questionEN: "Pain severity?", questionVI: "Mức độ đau?", options: [
          { labelKR: "가벼움", labelEN: "Mild", labelVI: "Nhẹ" },
          { labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
          { labelKR: "심함 (일상 불가)", labelEN: "Severe (can't function)", labelVI: "Nặng (không sinh hoạt được)" },
        ]},
        { id: "mp_loc", questionKR: "어디가 아프세요?", questionEN: "Where does it hurt?", questionVI: "Đau ở đâu?", options: [
          { labelKR: "아랫배", labelEN: "Lower abdomen", labelVI: "Bụng dưới" },
          { labelKR: "허리", labelEN: "Lower back", labelVI: "Lưng" },
          { labelKR: "둘 다", labelEN: "Both", labelVI: "Cả hai" },
        ]},
      ], drugMatches: {
        "default": { KR: ["eve_kr", "ezn6_kr"], VN: ["ibuprofen_400_vn", "panadol_extra_vn"], US: ["midol_us", "advil_200_us"] },
      } },
      { comboKey: "headache", drugMatches: { "default": { KR: ["eve_kr", "geborin_kr"], VN: ["ibuprofen_400_vn", "hapacol_650_vn"], US: ["midol_us", "excedrin_us"] } } },
      { comboKey: "backPain", drugMatches: { "default": { KR: ["eve_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["midol_us", "thermacare_us"] } } },
      { comboKey: "heavyBleeding", hospitalWarning: true, warningKR: "생리통과 함께 출혈량이 비정상적으로 많은 경우 자궁근종이나 호르몬 이상의 가능성이 있습니다. 산부인과를 방문하세요.", warningEN: "Severe menstrual pain with abnormally heavy bleeding may indicate fibroids or hormonal issues. Please visit a gynecologist.", warningVI: "Đau bụng kinh kèm ra máu nhiều bất thường có thể là u xơ tử cung hoặc rối loạn hormone. Vui lòng đến khoa phụ khoa.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["eve_kr", "ezn6_kr"], VN: ["ibuprofen_400_vn", "panadol_extra_vn"], US: ["midol_us", "advil_200_us"] } } },
    ],
  },
  // === 15. Toothache ===
  {
    id: "toothache",
    nameKR: "치통", nameEN: "Toothache", nameVI: "Đau răng",
    descKR: "이가 아픈 증상", descEN: "Pain in or around a tooth", descVI: "Đau răng hoặc vùng quanh răng",
    companions: [
      { key: "gumSwollen", labelKR: "잇몸 부음/출혈", labelEN: "Swollen/bleeding gums", labelVI: "Nướu sưng/chảy máu", descKR: "잇몸이 빨갛게 붓거나 피가 남", descEN: "Gums are red, swollen or bleeding", descVI: "Nướu đỏ, sưng hoặc chảy máu" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "faceSwelling", labelKR: "얼굴 부종", labelEN: "Facial swelling", labelVI: "Sưng mặt", descKR: "볼이나 턱이 붓는 상태", descEN: "Swelling in cheek or jaw", descVI: "Sưng má hoặc hàm" },
      { key: "none", labelKR: "없음 (치통만)", labelEN: "None (toothache only)", labelVI: "Không có (chỉ đau răng)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "t_type", questionKR: "어떤 느낌인가요?", questionEN: "What does it feel like?", questionVI: "Cảm giác thế nào?", options: [
          { labelKR: "욱신욱신", labelEN: "Throbbing", labelVI: "Nhức nhối" },
          { labelKR: "찌릿 (찬 것에 반응)", labelEN: "Sharp (sensitive to cold)", labelVI: "Nhói (nhạy cảm với lạnh)" },
          { labelKR: "지속적인 통증", labelEN: "Constant pain", labelVI: "Đau liên tục" },
        ]},
        { id: "t_when", questionKR: "언제 심한가요?", questionEN: "When is it worse?", questionVI: "Khi nào nặng hơn?", options: [
          { labelKR: "먹을 때", labelEN: "When eating", labelVI: "Khi ăn" },
          { labelKR: "차가운/뜨거운 것에", labelEN: "With hot/cold", labelVI: "Với nóng/lạnh" },
          { labelKR: "항상", labelEN: "All the time", labelVI: "Luôn luôn" },
        ]},
      ], drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "orajel_us"] } } },
      { comboKey: "gumSwollen", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tantum_kr"], VN: ["ibuprofen_400_vn", "betadine_gargle_vn"], US: ["advil_200_us", "anbesol_us"] } } },
      { comboKey: "fever", hospitalWarning: true, warningKR: "치통과 발열이 함께 나타나면 치아 감염의 가능성이 있습니다. 가능한 빨리 치과를 방문하세요.", warningEN: "Toothache with fever may indicate a dental infection. Please visit a dentist as soon as possible.", warningVI: "Đau răng kèm sốt có thể là nhiễm trùng răng. Vui lòng đến nha khoa sớm nhất có thể.", drugMatches: {} },
      { comboKey: "faceSwelling", hospitalWarning: true, warningKR: "치통과 얼굴 부종이 함께 나타나면 치아 농양의 가능성이 있습니다. 즉시 치과를 방문하세요. 농양은 항생제 치료가 필요합니다.", warningEN: "Toothache with facial swelling may indicate a dental abscess. Visit a dentist immediately. Abscess requires antibiotic treatment.", warningVI: "Đau răng kèm sưng mặt có thể là áp xe răng. Đến nha khoa ngay. Áp xe cần điều trị kháng sinh.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "orajel_us"] } } },
    ],
  },
  // === 16. Eye Strain/Redness ===
  {
    id: "eyeStrain",
    nameKR: "눈 피로/충혈", nameEN: "Eye Strain/Redness", nameVI: "Mỏi mắt/Đỏ mắt",
    descKR: "눈이 피곤하거나 빨갛게 된 상태", descEN: "Tired or red eyes", descVI: "Mắt mệt mỏi hoặc đỏ",
    companions: [
      { key: "allergyNose", labelKR: "가려움 + 콧물", labelEN: "Itchy + runny nose", labelVI: "Ngứa + sổ mũi", descKR: "알레르기일 수 있어요", descEN: "Could be allergy", descVI: "Có thể dị ứng" },
      { key: "discharge", labelKR: "눈곱 많음", labelEN: "Eye discharge", labelVI: "Nhiều ghèn mắt", descKR: "눈에서 분비물이 많이 나옴", descEN: "Excessive eye discharge", descVI: "Tiết dịch mắt nhiều" },
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "visionChange", labelKR: "시력 변화", labelEN: "Vision changes", labelVI: "Thay đổi thị lực", descKR: "갑자기 잘 안 보이는 경우", descEN: "Sudden difficulty seeing", descVI: "Đột ngột nhìn không rõ" },
      { key: "none", labelKR: "없음 (눈 증상만)", labelEN: "None (eye symptoms only)", labelVI: "Không có (chỉ triệu chứng mắt)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "e_type", questionKR: "어떤 증상인가요?", questionEN: "What symptoms?", questionVI: "Triệu chứng gì?", options: [
          { labelKR: "충혈 (빨갛게)", labelEN: "Redness", labelVI: "Đỏ mắt" },
          { labelKR: "건조함", labelEN: "Dryness", labelVI: "Khô mắt" },
          { labelKR: "가려움", labelEN: "Itchiness", labelVI: "Ngứa" },
          { labelKR: "침침함/피로", labelEN: "Blurriness/fatigue", labelVI: "Mờ/mệt mỏi" },
        ]},
        { id: "e_cause", questionKR: "원인이 있나요?", questionEN: "Any known cause?", questionVI: "Có nguyên nhân không?", options: [
          { labelKR: "화면 장시간 사용", labelEN: "Prolonged screen use", labelVI: "Dùng màn hình lâu" },
          { labelKR: "렌즈 착용", labelEN: "Contact lenses", labelVI: "Đeo kính áp tròng" },
          { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
        ]},
      ], drugMatches: { "default": { KR: ["refresh_kr", "hyaluronate_kr"], VN: ["systane_vn", "vrohto_vn"], US: ["visine_dry_us", "visine_us"] } } },
      { comboKey: "allergyNose", drugMatches: { "default": { KR: ["cromolin_kr", "zyrtec_kr"], VN: ["cromolin_vn", "cetirizine_vn"], US: ["zaditor_us", "pataday_us"] } } },
      { comboKey: "discharge", hospitalWarning: true, warningKR: "눈곱이 많이 나오면 결막염의 가능성이 있습니다. 안과를 방문하여 적절한 안약을 처방받으세요. 다른 사람에게 전염될 수 있으니 수건/베개를 구분하세요.", warningEN: "Excessive eye discharge may indicate conjunctivitis. Please visit an eye doctor. It can be contagious - use separate towels.", warningVI: "Nhiều ghèn mắt có thể là viêm kết mạc. Vui lòng đến bác sĩ mắt. Có thể lây - dùng khăn riêng.", drugMatches: {} },
      { comboKey: "visionChange", hospitalWarning: true, warningKR: "갑작스러운 시력 변화는 즉시 안과를 방문하세요.", warningEN: "Sudden vision changes require immediate eye doctor visit.", warningVI: "Thay đổi thị lực đột ngột cần đến bác sĩ mắt ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["refresh_kr", "vizuclear_kr"], VN: ["systane_vn", "vrohto_vn"], US: ["visine_dry_us", "cleareyes_us"] } } },
    ],
  },
  // === 17. Heartburn/Acid Reflux ===
  {
    id: "heartburn",
    nameKR: "속쓰림/위산역류", nameEN: "Heartburn/Acid Reflux", nameVI: "Ợ nóng/Trào ngược axit",
    descKR: "가슴이 타는 듯 화끈거리고 신물이 올라오는 증상", descEN: "Burning sensation in chest with acid rising up", descVI: "Cảm giác nóng rát ngực với axit trào lên",
    companions: [
      { key: "stomachPain", labelKR: "복통", labelEN: "Stomach pain", labelVI: "Đau bụng" },
      { key: "nausea", labelKR: "구역", labelEN: "Nausea", labelVI: "Buồn nôn" },
      { key: "chestPain", labelKR: "가슴 통증", labelEN: "Chest pain", labelVI: "Đau ngực", descKR: "심장 문제와 구별 필요", descEN: "Need to distinguish from heart problems", descVI: "Cần phân biệt với vấn đề tim" },
      { key: "none", labelKR: "없음 (속쓰림만)", labelEN: "None (heartburn only)", labelVI: "Không có (chỉ ợ nóng)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "hb_when", questionKR: "언제 심한가요?", questionEN: "When is it worse?", questionVI: "Khi nào nặng hơn?", options: [
          { labelKR: "식후", labelEN: "After eating", labelVI: "Sau ăn" },
          { labelKR: "누울 때", labelEN: "When lying down", labelVI: "Khi nằm" },
          { labelKR: "공복", labelEN: "On empty stomach", labelVI: "Khi đói" },
        ]},
        { id: "hb_freq", questionKR: "얼마나 자주?", questionEN: "How often?", questionVI: "Bao lâu một lần?", options: [
          { labelKR: "가끔", labelEN: "Occasionally", labelVI: "Thỉnh thoảng" },
          { labelKR: "주 2~3회", labelEN: "2-3 times/week", labelVI: "2-3 lần/tuần" },
          { labelKR: "매일", labelEN: "Daily", labelVI: "Hàng ngày" },
        ]},
      ], drugMatches: {
        "default": { KR: ["gelpos_kr", "gaviscon_kr"], VN: ["phosphalugel_vn", "gaviscon_vn"], US: ["tums_us", "gaviscon_us"] },
        "severe": { KR: ["famotidine_kr", "lansoprazole_kr"], VN: ["famotidine_kr", "omeprazole_vn"], US: ["pepcid_us", "prilosec_us"] },
      } },
      { comboKey: "stomachPain", drugMatches: { "default": { KR: ["gelpos_kr", "almagel_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"] } } },
      { comboKey: "nausea", drugMatches: { "default": { KR: ["gaviscon_kr", "domperidone_kr"], VN: ["gaviscon_vn", "motilium_vn"], US: ["gaviscon_us", "pepto_us"] } } },
      { comboKey: "chestPain", hospitalWarning: true, warningKR: "속쓰림과 함께 심한 가슴 통증이 나타나면 심장 질환과 구별이 필요합니다. 특히 운동 시 악화, 왼팔 저림, 식은땀이 동반되면 즉시 응급실을 방문하세요.", warningEN: "Heartburn with severe chest pain needs to be distinguished from heart disease. If it worsens with exercise, includes left arm numbness, or cold sweats, call emergency services immediately.", warningVI: "Ợ nóng kèm đau ngực nặng cần phân biệt với bệnh tim. Nếu nặng hơn khi vận động, tê cánh tay trái, hoặc đổ mồ hôi lạnh, gọi cấp cứu ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["gelpos_kr", "gaviscon_kr"], VN: ["phosphalugel_vn", "gaviscon_vn"], US: ["tums_us", "gaviscon_us"] } } },
    ],
  },
  // === 18. Constipation ===
  {
    id: "constipation",
    nameKR: "변비", nameEN: "Constipation", nameVI: "Táo bón",
    descKR: "대변이 나오지 않거나 딱딱해서 힘든 상태", descEN: "Difficulty passing stool or hard stool", descVI: "Khó đi đại tiện hoặc phân cứng",
    companions: [
      { key: "bloatingPain", labelKR: "복통 + 팽만감", labelEN: "Stomach pain + bloating", labelVI: "Đau bụng + đầy hơi", descKR: "배가 아프면서 빵빵한 느낌", descEN: "Pain with bloated feeling", descVI: "Đau bụng kèm cảm giác đầy" },
      { key: "bloodyStool", labelKR: "혈변", labelEN: "Blood in stool", labelVI: "Phân có máu", descKR: "대변에 피가 섞이거나 항문 출혈", descEN: "Blood in stool or rectal bleeding", descVI: "Phân có máu hoặc chảy máu hậu môn" },
      { key: "nausea", labelKR: "구역", labelEN: "Nausea", labelVI: "Buồn nôn" },
      { key: "none", labelKR: "없음 (변비만)", labelEN: "None (constipation only)", labelVI: "Không có (chỉ táo bón)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "co_dur", questionKR: "얼마나 됐나요?", questionEN: "How long?", questionVI: "Đã bao lâu?", options: [
          { labelKR: "2~3일", labelEN: "2-3 days", labelVI: "2-3 ngày" },
          { labelKR: "일주일", labelEN: "About a week", labelVI: "Khoảng 1 tuần" },
          { labelKR: "만성 (자주 반복)", labelEN: "Chronic (recurring)", labelVI: "Mãn tính (tái phát)" },
        ]},
        { id: "co_sev", questionKR: "증상 정도는?", questionEN: "Severity?", questionVI: "Mức độ?", options: [
          { labelKR: "가벼움 (불편한 정도)", labelEN: "Mild (uncomfortable)", labelVI: "Nhẹ (khó chịu)" },
          { labelKR: "중간", labelEN: "Moderate", labelVI: "Trung bình" },
          { labelKR: "심함 (전혀 안 나옴)", labelEN: "Severe (no bowel movement)", labelVI: "Nặng (không đi được)" },
        ]},
      ], drugMatches: {
        "default": { KR: ["magmil_kr", "dulcolax_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"] },
        "severe": { KR: ["dulcolax_kr", "bicogreen_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"] },
      } },
      { comboKey: "bloatingPain", drugMatches: { "default": { KR: ["magmil_kr", "gashualmyeongsu_kr"], VN: ["duphalac_vn", "airx_vn"], US: ["miralax_us", "gasx_us"] } } },
      { comboKey: "bloodyStool", hospitalWarning: true, warningKR: "변비와 함께 출혈이 있으면 치질 또는 다른 질환의 가능성이 있습니다. 소화기내과 또는 외과를 방문하세요.", warningEN: "Constipation with bleeding may indicate hemorrhoids or other conditions. Please visit a gastroenterologist or surgeon.", warningVI: "Táo bón kèm chảy máu có thể là trĩ hoặc bệnh khác. Vui lòng đến khoa tiêu hóa hoặc ngoại khoa.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["magmil_kr", "dulcolax_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"] } } },
    ],
  },
  // === 19. Insomnia ===
  {
    id: "insomnia",
    nameKR: "불면증", nameEN: "Insomnia", nameVI: "Mất ngủ",
    descKR: "잠이 잘 오지 않거나 자주 깨는 상태", descEN: "Difficulty falling or staying asleep", descVI: "Khó ngủ hoặc hay thức giấc",
    companions: [
      { key: "anxiety", labelKR: "불안/걱정", labelEN: "Anxiety/worry", labelVI: "Lo lắng", descKR: "마음이 불안하고 걱정이 많은 상태", descEN: "Feeling anxious and worried", descVI: "Cảm giác lo lắng và bồn chồn" },
      { key: "pain", labelKR: "통증 (어디든)", labelEN: "Pain (anywhere)", labelVI: "Đau (bất kỳ đâu)", descKR: "아파서 잠을 못 자는 경우", descEN: "Can't sleep due to pain", descVI: "Không ngủ được vì đau" },
      { key: "coldSymptoms", labelKR: "코막힘/기침", labelEN: "Stuffy nose/cough", labelVI: "Nghẹt mũi/ho", descKR: "감기 때문에 잠을 못 자는 경우", descEN: "Can't sleep due to cold", descVI: "Không ngủ được vì cảm" },
      { key: "none", labelKR: "없음 (불면만)", labelEN: "None (insomnia only)", labelVI: "Không có (chỉ mất ngủ)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "in_type", questionKR: "어떤 유형인가요?", questionEN: "What type?", questionVI: "Kiểu nào?", options: [
          { labelKR: "잠들기 어려움", labelEN: "Difficulty falling asleep", labelVI: "Khó đi vào giấc ngủ" },
          { labelKR: "자주 깸", labelEN: "Waking up frequently", labelVI: "Hay thức giấc" },
          { labelKR: "새벽에 깨서 못 잠", labelEN: "Early morning waking", labelVI: "Thức dậy sớm không ngủ lại được" },
        ]},
        { id: "in_dur", questionKR: "얼마나 됐나요?", questionEN: "How long?", questionVI: "Đã bao lâu?", options: [
          { labelKR: "며칠", labelEN: "A few days", labelVI: "Vài ngày" },
          { labelKR: "몇 주", labelEN: "A few weeks", labelVI: "Vài tuần" },
          { labelKR: "만성 (한 달 이상)", labelEN: "Chronic (over a month)", labelVI: "Mãn tính (hơn 1 tháng)" },
        ]},
      ], drugMatches: {
        "default": { KR: ["sleepaid_kr", "aronamin_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"] },
        "severe": { KR: ["sleepaid_kr", "rediants_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"] },
      } },
      { comboKey: "anxiety", drugMatches: { "default": { KR: ["rediants_kr", "sleepaid_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "benadryl_us"] } } },
      { comboKey: "coldSymptoms", drugMatches: { "default": { KR: ["pancol_night_kr", "tylenol_cold_kr"], VN: ["ameflu_night_vn", "tiffy_vn"], US: ["nyquil_us", "tylenol_pm_us"] } } },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["sleepaid_kr", "rediants_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"] } } },
    ],
  },
  // === 20. Joint Pain ===
  {
    id: "jointPain",
    nameKR: "관절통", nameEN: "Joint Pain", nameVI: "Đau khớp",
    descKR: "관절(무릎, 손가락, 어깨 등)이 아픈 증상", descEN: "Pain in joints (knees, fingers, shoulders, etc.)", descVI: "Đau khớp (đầu gối, ngón tay, vai, v.v.)",
    companions: [
      { key: "swellingRedness", labelKR: "부종 + 발적", labelEN: "Swelling + redness", labelVI: "Sưng + đỏ", descKR: "관절이 붓고 빨갛게 변함", descEN: "Joint is swollen and red", descVI: "Khớp sưng và đỏ" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "musclePain", labelKR: "근육통", labelEN: "Muscle pain", labelVI: "Đau cơ" },
      { key: "none", labelKR: "없음 (관절통만)", labelEN: "None (joint pain only)", labelVI: "Không có (chỉ đau khớp)" },
    ],
    combos: [
      { comboKey: "none", followUpQuestions: [
        { id: "jp_loc", questionKR: "어디가 아프세요?", questionEN: "Where does it hurt?", questionVI: "Đau ở đâu?", options: [
          { labelKR: "무릎", labelEN: "Knee", labelVI: "Đầu gối" },
          { labelKR: "손가락/손목", labelEN: "Fingers/wrist", labelVI: "Ngón tay/cổ tay" },
          { labelKR: "어깨", labelEN: "Shoulder", labelVI: "Vai" },
          { labelKR: "발목", labelEN: "Ankle", labelVI: "Mắt cá chân" },
        ]},
        { id: "jp_type", questionKR: "어떤 느낌인가요?", questionEN: "What does it feel like?", questionVI: "Cảm giác thế nào?", options: [
          { labelKR: "뻑뻑 (뻣뻣)", labelEN: "Stiff", labelVI: "Cứng" },
          { labelKR: "쑤심", labelEN: "Aching", labelVI: "Nhức" },
          { labelKR: "붓기 동반", labelEN: "With swelling", labelVI: "Kèm sưng" },
        ]},
        { id: "jp_dur", questionKR: "얼마나 됐나요?", questionEN: "How long?", questionVI: "Đã bao lâu?", options: [
          { labelKR: "며칠", labelEN: "A few days", labelVI: "Vài ngày" },
          { labelKR: "몇 주", labelEN: "Weeks", labelVI: "Vài tuần" },
          { labelKR: "만성 (몇 달 이상)", labelEN: "Chronic (months+)", labelVI: "Mãn tính (nhiều tháng)" },
        ]},
      ], drugMatches: {
        "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"] },
        "severe": { KR: ["nacsen_kr", "glucosamine_kr"], VN: ["aleve_vn", "voltaren_vn"], US: ["aleve_us", "voltaren_us"] },
      } },
      { comboKey: "musclePain", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"] } } },
      { comboKey: "swellingRedness", hospitalWarning: true, warningKR: "관절이 붓고 빨갛게 변한 경우 통풍이나 관절염의 가능성이 있습니다. 정형외과 또는 류마티스내과를 방문하세요.", warningEN: "Swollen, red joints may indicate gout or arthritis. Please visit an orthopedic or rheumatology clinic.", warningVI: "Khớp sưng đỏ có thể là gout hoặc viêm khớp. Vui lòng đến khoa chỉnh hình hoặc thấp khớp.", drugMatches: {} },
      { comboKey: "fever", hospitalWarning: true, warningKR: "관절통과 발열이 함께 나타나면 감염성 관절염의 가능성이 있습니다. 즉시 병원을 방문하세요.", warningEN: "Joint pain with fever may indicate septic arthritis. Please visit a hospital immediately.", warningVI: "Đau khớp kèm sốt có thể là viêm khớp nhiễm khuẩn. Vui lòng đến bệnh viện ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "voltaren_vn"], US: ["advil_200_us", "voltaren_us"] } } },
    ],
  },
  // === 21. Dizziness ===
  {
    id: "dizziness",
    nameKR: "어지러움", nameEN: "Dizziness", nameVI: "Chóng mặt",
    descKR: "빙빙 도는 느낌이나 균형 잡기 어려운 상태", descEN: "A spinning sensation or difficulty keeping balance", descVI: "Cảm giác quay cuồng hoặc khó giữ thăng bằng",
    companions: [
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "nauseaVomit", labelKR: "구역/구토", labelEN: "Nausea/vomiting", labelVI: "Buồn nôn/nôn", descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling sick to stomach", descVI: "Cảm giác muốn nôn" },
      { key: "tinnitus", labelKR: "이명", labelEN: "Tinnitus", labelVI: "Ù tai", descKR: "귀에서 삐~ 소리가 나는 증상", descEN: "Ringing sound in the ear", descVI: "Triệu chứng nghe tiếng kêu trong tai" },
      { key: "palpitation", labelKR: "가슴 두근거림", labelEN: "Palpitations", labelVI: "Tim đập nhanh", descKR: "심장이 빨리 뛰는 느낌", descEN: "Feeling of rapid heartbeat", descVI: "Cảm giác tim đập nhanh" },
      { key: "none", labelKR: "없음 (어지러움만)", labelEN: "None (dizziness only)", labelVI: "Không có (chỉ chóng mặt)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "dz_type", questionKR: "어떤 어지러움인가요?", questionEN: "What kind of dizziness?", questionVI: "Bạn bị chóng mặt kiểu nào?", options: [
            { labelKR: "빙빙 도는 느낌", labelEN: "Spinning sensation", labelVI: "Cảm giác quay cuồng" },
            { labelKR: "흔들리는 느낌", labelEN: "Swaying sensation", labelVI: "Cảm giác lắc lư" },
            { labelKR: "눈앞이 깜깜", labelEN: "Blacking out", labelVI: "Tối sầm mắt" },
          ]},
          { id: "dz_when", questionKR: "언제 심한가요?", questionEN: "When is it worse?", questionVI: "Khi nào nặng hơn?", options: [
            { labelKR: "일어설 때", labelEN: "When standing up", labelVI: "Khi đứng dậy" },
            { labelKR: "고개 돌릴 때", labelEN: "When turning head", labelVI: "Khi quay đầu" },
            { labelKR: "항상", labelEN: "All the time", labelVI: "Luôn luôn" },
          ]},
          { id: "dz_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it been?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "오늘", labelEN: "Today", labelVI: "Hôm nay" },
            { labelKR: "며칠", labelEN: "A few days", labelVI: "Vài ngày" },
            { labelKR: "반복적", labelEN: "Recurring", labelVI: "Tái phát" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["meniere_kr", "bonaring_kr"], VN: ["betaserc_vn", "stugeron_vn"], US: ["dramamine_us", "bonine_us"] },
        },
      },
      {
        comboKey: "nauseaVomit",
        drugMatches: {
          "default": { KR: ["bonaring_kr", "kimite_kr"], VN: ["stugeron_vn", "nautamine_vn"], US: ["dramamine_us", "bonine_us"] },
        },
      },
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["bonaring_kr", "tylenol_500_kr"], VN: ["stugeron_vn", "panadol_500_vn"], US: ["bonine_us", "tylenol_500_us"] },
        },
      },
      {
        comboKey: "palpitation",
        hospitalWarning: true,
        warningKR: "어지러움과 가슴 두근거림이 함께 나타나면 심장 또는 혈압 관련 문제의 가능성이 있습니다. 내과 또는 심장내과를 방문하세요.",
        warningEN: "Dizziness with palpitations may indicate a heart or blood pressure issue. Please visit an internist or cardiologist.",
        warningVI: "Chóng mặt kèm tim đập nhanh có thể là dấu hiệu vấn đề tim mạch hoặc huyết áp. Vui lòng đến khoa nội hoặc tim mạch.",
        drugMatches: {},
      },
      {
        comboKey: "tinnitus",
        hospitalWarning: true,
        warningKR: "어지러움과 이명이 함께 나타나면 메니에르병 등 귀 관련 질환의 가능성이 있습니다. 이비인후과를 방문하세요.",
        warningEN: "Dizziness with tinnitus may indicate Meniere's disease or other ear conditions. Please visit an ENT specialist.",
        warningVI: "Chóng mặt kèm ù tai có thể là dấu hiệu bệnh Meniere hoặc các bệnh lý tai khác. Vui lòng đến khoa tai mũi họng.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["meniere_kr", "bonaring_kr"], VN: ["betaserc_vn", "stugeron_vn"], US: ["dramamine_us", "bonine_us"] },
        },
      },
    ],
  },
  // === 22. Tinnitus ===
  {
    id: "tinnitus",
    nameKR: "이명", nameEN: "Tinnitus", nameVI: "Ù tai",
    descKR: "귀에서 삐~ 또는 웅~ 소리가 계속 나는 상태", descEN: "Persistent ringing or buzzing sound in the ear", descVI: "Tình trạng nghe tiếng kêu liên tục trong tai",
    companions: [
      { key: "dizziness", labelKR: "어지러움", labelEN: "Dizziness", labelVI: "Chóng mặt" },
      { key: "hearingLoss", labelKR: "청력 저하", labelEN: "Hearing loss", labelVI: "Giảm thính lực", descKR: "소리가 잘 안 들리는 느낌", descEN: "Difficulty hearing sounds", descVI: "Cảm giác nghe không rõ" },
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "none", labelKR: "없음 (이명만)", labelEN: "None (tinnitus only)", labelVI: "Không có (chỉ ù tai)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "tn_type", questionKR: "어떤 소리인가요?", questionEN: "What kind of sound?", questionVI: "Bạn nghe thấy âm thanh gì?", options: [
            { labelKR: "삐~ 고음", labelEN: "High-pitched ringing", labelVI: "Tiếng kêu cao" },
            { labelKR: "웅~ 저음", labelEN: "Low-pitched buzzing", labelVI: "Tiếng ù trầm" },
            { labelKR: "맥박 따라 뛰는 소리", labelEN: "Pulsating sound", labelVI: "Tiếng theo nhịp mạch" },
          ]},
          { id: "tn_side", questionKR: "한쪽인가요?", questionEN: "Which side?", questionVI: "Bên nào?", options: [
            { labelKR: "한쪽", labelEN: "One side", labelVI: "Một bên" },
            { labelKR: "양쪽", labelEN: "Both sides", labelVI: "Cả hai bên" },
          ]},
          { id: "tn_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it been?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "오늘", labelEN: "Today", labelVI: "Hôm nay" },
            { labelKR: "며칠", labelEN: "A few days", labelVI: "Vài ngày" },
            { labelKR: "만성", labelEN: "Chronic", labelVI: "Mạn tính" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["ginkgo_kr", "meniere_kr"], VN: ["tanakan_vn", "betaserc_vn"], US: ["lipoflavonoid_us", "dramamine_us"] },
        },
      },
      {
        comboKey: "dizziness",
        hospitalWarning: true,
        warningKR: "이명과 어지러움이 함께 나타나면 메니에르병의 가능성이 있습니다. 이비인후과를 방문하세요.",
        warningEN: "Tinnitus with dizziness may indicate Meniere's disease. Please visit an ENT specialist.",
        warningVI: "Ù tai kèm chóng mặt có thể là dấu hiệu bệnh Meniere. Vui lòng đến khoa tai mũi họng.",
        drugMatches: {},
      },
      {
        comboKey: "hearingLoss",
        hospitalWarning: true,
        warningKR: "이명과 청력 저하가 함께 나타나면 돌발성 난청의 가능성이 있습니다. 즉시 이비인후과를 방문하세요. 돌발성 난청은 빠른 치료가 중요합니다.",
        warningEN: "Tinnitus with hearing loss may indicate sudden sensorineural hearing loss. Visit an ENT specialist immediately. Early treatment is critical.",
        warningVI: "Ù tai kèm giảm thính lực có thể là dấu hiệu điếc đột ngột. Vui lòng đến khoa tai mũi họng ngay. Điều trị sớm rất quan trọng.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["ginkgo_kr", "meniere_kr"], VN: ["tanakan_vn", "betaserc_vn"], US: ["lipoflavonoid_us", "dramamine_us"] },
        },
      },
    ],
  },
  // === 23. Nosebleed ===
  {
    id: "nosebleed",
    nameKR: "코피", nameEN: "Nosebleed", nameVI: "Chảy máu mũi",
    descKR: "코에서 피가 나는 상태", descEN: "Bleeding from the nose", descVI: "Tình trạng chảy máu từ mũi",
    companions: [
      { key: "headacheHBP", labelKR: "두통 + 고혈압", labelEN: "Headache + high blood pressure", labelVI: "Đau đầu + cao huyết áp", descKR: "혈압이 높을 수 있어요", descEN: "Blood pressure may be elevated", descVI: "Huyết áp có thể cao" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "frequent", labelKR: "잦은 반복", labelEN: "Frequent recurrence", labelVI: "Tái phát thường xuyên", descKR: "코피가 자주 나는 경우", descEN: "Nosebleeds occur frequently", descVI: "Chảy máu mũi xảy ra thường xuyên" },
      { key: "none", labelKR: "없음 (코피만)", labelEN: "None (nosebleed only)", labelVI: "Không có (chỉ chảy máu mũi)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "nb_side", questionKR: "어느 쪽인가요?", questionEN: "Which side?", questionVI: "Bên nào?", options: [
            { labelKR: "한쪽", labelEN: "One side", labelVI: "Một bên" },
            { labelKR: "양쪽", labelEN: "Both sides", labelVI: "Cả hai bên" },
          ]},
          { id: "nb_duration", questionKR: "얼마나 나나요?", questionEN: "How long does it last?", questionVI: "Chảy bao lâu?", options: [
            { labelKR: "금방 멈춤(5분 이내)", labelEN: "Stops quickly (within 5 min)", labelVI: "Ngừng nhanh (trong 5 phút)" },
            { labelKR: "오래 지속", labelEN: "Lasts a long time", labelVI: "Kéo dài" },
          ]},
          { id: "nb_cause", questionKR: "원인 추정", questionEN: "Suspected cause?", questionVI: "Nguyên nhân nghi ngờ?", options: [
            { labelKR: "코 후빔", labelEN: "Nose picking", labelVI: "Ngoáy mũi" },
            { labelKR: "건조한 날씨", labelEN: "Dry weather", labelVI: "Thời tiết khô" },
            { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["vaseline_kr", "saline_spray_kr"], VN: ["vaseline_kr", "saline_spray_kr"], US: ["saline_spray_kr", "vaseline_kr"] },
        },
      },
      {
        comboKey: "headacheHBP",
        hospitalWarning: true,
        warningKR: "코피와 두통이 함께 나타나면 고혈압의 가능성이 있습니다. 내과를 방문하여 혈압을 확인하세요.",
        warningEN: "Nosebleed with headache may indicate high blood pressure. Please visit an internist to check your blood pressure.",
        warningVI: "Chảy máu mũi kèm đau đầu có thể là dấu hiệu cao huyết áp. Vui lòng đến khoa nội để kiểm tra huyết áp.",
        drugMatches: {},
      },
      {
        comboKey: "frequent",
        hospitalWarning: true,
        warningKR: "코피가 자주 반복되면 혈관 문제나 혈액 질환의 가능성이 있습니다. 이비인후과 또는 내과를 방문하세요.",
        warningEN: "Frequent nosebleeds may indicate a vascular or blood disorder. Please visit an ENT specialist or internist.",
        warningVI: "Chảy máu mũi thường xuyên có thể là dấu hiệu bệnh lý mạch máu hoặc bệnh về máu. Vui lòng đến khoa tai mũi họng hoặc khoa nội.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["vaseline_kr", "saline_spray_kr"], VN: ["vaseline_kr", "saline_spray_kr"], US: ["saline_spray_kr", "vaseline_kr"] },
        },
      },
    ],
  },
  // === 24. Mouth ulcer ===
  {
    id: "mouthUlcer",
    nameKR: "구내염", nameEN: "Mouth ulcer", nameVI: "Loét miệng",
    descKR: "입안이 헐어서 아픈 상태", descEN: "Painful sores inside the mouth", descVI: "Tình trạng lở loét đau trong miệng",
    companions: [
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "soreThroat", labelKR: "인후통", labelEN: "Sore throat", labelVI: "Đau họng" },
      { key: "gumBleeding", labelKR: "잇몸 출혈", labelEN: "Gum bleeding", labelVI: "Chảy máu nướu" },
      { key: "none", labelKR: "없음 (구내염만)", labelEN: "None (mouth ulcer only)", labelVI: "Không có (chỉ loét miệng)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "mu_count", questionKR: "몇 개인가요?", questionEN: "How many?", questionVI: "Bao nhiêu vết?", options: [
            { labelKR: "1~2개", labelEN: "1-2", labelVI: "1-2 vết" },
            { labelKR: "여러 개", labelEN: "Several", labelVI: "Nhiều vết" },
            { labelKR: "입 전체", labelEN: "Whole mouth", labelVI: "Toàn bộ miệng" },
          ]},
          { id: "mu_location", questionKR: "어디에 있나요?", questionEN: "Where is it?", questionVI: "Ở đâu?", options: [
            { labelKR: "혀", labelEN: "Tongue", labelVI: "Lưỡi" },
            { labelKR: "볼 안쪽", labelEN: "Inner cheek", labelVI: "Trong má" },
            { labelKR: "잇몸", labelEN: "Gum", labelVI: "Nướu" },
            { labelKR: "입술 안쪽", labelEN: "Inner lip", labelVI: "Trong môi" },
          ]},
          { id: "mu_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it been?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "2~3일", labelEN: "2-3 days", labelVI: "2-3 ngày" },
            { labelKR: "일주일", labelEN: "One week", labelVI: "Một tuần" },
            { labelKR: "2주 이상", labelEN: "Over 2 weeks", labelVI: "Hơn 2 tuần" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["oramedi_kr", "albocil_kr"], VN: ["kamistad_vn", "albocil_kr"], US: ["orajel_mouth_us", "albocil_kr"] },
        },
      },
      {
        comboKey: "fever",
        hospitalWarning: true,
        warningKR: "구내염과 발열이 함께 나타나면 바이러스 감염의 가능성이 있습니다. 내과 또는 이비인후과를 방문하세요.",
        warningEN: "Mouth ulcers with fever may indicate a viral infection. Please visit an internist or ENT specialist.",
        warningVI: "Loét miệng kèm sốt có thể là dấu hiệu nhiễm virus. Vui lòng đến khoa nội hoặc khoa tai mũi họng.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["oramedi_kr", "albocil_kr"], VN: ["kamistad_vn", "albocil_kr"], US: ["orajel_mouth_us", "albocil_kr"] },
        },
      },
    ],
  },
  // === 25. Burn ===
  {
    id: "burn",
    nameKR: "화상", nameEN: "Burn", nameVI: "Bỏng",
    descKR: "뜨거운 것에 데인 상태", descEN: "Injury caused by heat or hot substances", descVI: "Tình trạng tổn thương do nhiệt hoặc chất nóng",
    companions: [
      { key: "blister", labelKR: "물집", labelEN: "Blister", labelVI: "Phỏng nước", descKR: "피부에 물이 찬 동그란 것", descEN: "Fluid-filled bubble on skin", descVI: "Bọng nước trên da" },
      { key: "wideArea", labelKR: "넓은 범위", labelEN: "Wide area", labelVI: "Diện tích rộng", descKR: "손바닥 크기 이상", descEN: "Larger than palm size", descVI: "Lớn hơn lòng bàn tay" },
      { key: "faceJoint", labelKR: "얼굴/관절 부위", labelEN: "Face/joint area", labelVI: "Vùng mặt/khớp" },
      { key: "none", labelKR: "없음 (화상만)", labelEN: "None (burn only)", labelVI: "Không có (chỉ bỏng)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "bn_severity", questionKR: "정도는?", questionEN: "How severe?", questionVI: "Mức độ?", options: [
            { labelKR: "빨갛기만 함", labelEN: "Redness only", labelVI: "Chỉ đỏ da" },
            { labelKR: "물집 생김", labelEN: "Blisters formed", labelVI: "Có phỏng nước" },
            { labelKR: "피부 하얗게 변함", labelEN: "Skin turned white", labelVI: "Da chuyển trắng" },
          ]},
          { id: "bn_area", questionKR: "범위는?", questionEN: "How large?", questionVI: "Diện tích?", options: [
            { labelKR: "동전 크기", labelEN: "Coin-sized", labelVI: "Cỡ đồng xu" },
            { labelKR: "손바닥 크기", labelEN: "Palm-sized", labelVI: "Cỡ lòng bàn tay" },
            { labelKR: "그 이상", labelEN: "Larger", labelVI: "Lớn hơn" },
          ]},
          { id: "bn_cause", questionKR: "원인은?", questionEN: "What caused it?", questionVI: "Nguyên nhân?", options: [
            { labelKR: "뜨거운 물", labelEN: "Hot water", labelVI: "Nước nóng" },
            { labelKR: "기름", labelEN: "Oil", labelVI: "Dầu mỡ" },
            { labelKR: "화학물질", labelEN: "Chemical", labelVI: "Hóa chất" },
            { labelKR: "햇볕", labelEN: "Sunburn", labelVI: "Nắng" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["fucidin_kr", "silvadene_kr"], VN: ["biafine_vn", "silvadene_kr"], US: ["neosporin_burn_us", "silvadene_kr"] },
        },
      },
      {
        comboKey: "blister",
        warningKR: "물집을 터뜨리지 마세요. 감염 위험이 있습니다.",
        warningEN: "Do not pop the blister. There is a risk of infection.",
        warningVI: "Không được chọc vỡ phỏng nước. Có nguy cơ nhiễm trùng.",
        drugMatches: {
          "default": { KR: ["silvadene_kr", "fucidin_kr"], VN: ["silvadene_kr", "biafine_vn"], US: ["neosporin_burn_us", "silvadene_kr"] },
        },
      },
      {
        comboKey: "wideArea",
        hospitalWarning: true,
        warningKR: "화상 범위가 넓거나 얼굴, 관절 부위면 즉시 응급실을 방문하세요.",
        warningEN: "If the burn covers a wide area or affects the face/joints, visit the emergency room immediately.",
        warningVI: "Nếu bỏng diện tích rộng hoặc ở vùng mặt/khớp, hãy đến phòng cấp cứu ngay.",
        drugMatches: {},
      },
      {
        comboKey: "faceJoint",
        hospitalWarning: true,
        warningKR: "얼굴이나 관절 부위의 화상은 즉시 응급실을 방문하세요.",
        warningEN: "Burns on the face or joint areas require immediate emergency room visit.",
        warningVI: "Bỏng ở vùng mặt hoặc khớp cần đến phòng cấp cứu ngay.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["fucidin_kr", "silvadene_kr"], VN: ["biafine_vn", "silvadene_kr"], US: ["neosporin_burn_us", "silvadene_kr"] },
        },
      },
    ],
  },
  // === 26. Wound ===
  {
    id: "wound",
    nameKR: "상처", nameEN: "Wound", nameVI: "Vết thương",
    descKR: "피부가 긁히거나 베인 상태", descEN: "Skin that is scratched or cut", descVI: "Tình trạng da bị trầy xước hoặc đứt",
    companions: [
      { key: "heavyBleeding", labelKR: "출혈 많음", labelEN: "Heavy bleeding", labelVI: "Chảy máu nhiều", descKR: "피가 많이 나는 상태", descEN: "Significant bleeding", descVI: "Tình trạng chảy máu nhiều" },
      { key: "deepWound", labelKR: "깊은 상처", labelEN: "Deep wound", labelVI: "Vết thương sâu", descKR: "살이 벌어진 상태", descEN: "Wound with gaping skin", descVI: "Vết thương hở miệng" },
      { key: "rusty", labelKR: "녹슨 물체에 의한 상처", labelEN: "Wound from rusty object", labelVI: "Vết thương do vật rỉ sét" },
      { key: "none", labelKR: "없음 (상처만)", labelEN: "None (wound only)", labelVI: "Không có (chỉ vết thương)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "wd_type", questionKR: "어떤 상처인가요?", questionEN: "What kind of wound?", questionVI: "Loại vết thương nào?", options: [
            { labelKR: "긁힘", labelEN: "Scratch", labelVI: "Trầy xước" },
            { labelKR: "베임", labelEN: "Cut", labelVI: "Đứt" },
            { labelKR: "찔림", labelEN: "Puncture", labelVI: "Bị đâm" },
          ]},
          { id: "wd_bleeding", questionKR: "출혈은?", questionEN: "How much bleeding?", questionVI: "Mức độ chảy máu?", options: [
            { labelKR: "약간", labelEN: "Slight", labelVI: "Ít" },
            { labelKR: "적당", labelEN: "Moderate", labelVI: "Vừa" },
            { labelKR: "많음", labelEN: "Heavy", labelVI: "Nhiều" },
          ]},
          { id: "wd_clean", questionKR: "깨끗한가요?", questionEN: "Is the wound clean?", questionVI: "Vết thương có sạch không?", options: [
            { labelKR: "깨끗함", labelEN: "Clean", labelVI: "Sạch" },
            { labelKR: "이물질 있음", labelEN: "Has debris", labelVI: "Có dị vật" },
            { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["fucidin_kr", "madecassol_kr"], VN: ["betadine_vn", "fucidin_vn"], US: ["neosporin_us2", "bandaid_us"] },
        },
      },
      {
        comboKey: "heavyBleeding",
        hospitalWarning: true,
        warningKR: "출혈이 많거나 상처가 깊으면 봉합이 필요할 수 있습니다. 깨끗한 천으로 압박하고 응급실을 방문하세요.",
        warningEN: "Heavy bleeding or deep wounds may need stitches. Apply pressure with a clean cloth and visit the emergency room.",
        warningVI: "Chảy máu nhiều hoặc vết thương sâu có thể cần khâu. Dùng vải sạch ấn chặt và đến phòng cấp cứu.",
        drugMatches: {},
      },
      {
        comboKey: "deepWound",
        hospitalWarning: true,
        warningKR: "깊은 상처는 봉합이 필요할 수 있습니다. 응급실을 방문하세요.",
        warningEN: "Deep wounds may require stitches. Please visit the emergency room.",
        warningVI: "Vết thương sâu có thể cần khâu. Vui lòng đến phòng cấp cứu.",
        drugMatches: {},
      },
      {
        comboKey: "rusty",
        hospitalWarning: true,
        warningKR: "녹슨 물체에 의한 상처는 파상풍 위험이 있습니다. 병원에서 파상풍 주사 여부를 확인하세요.",
        warningEN: "Wounds from rusty objects carry a risk of tetanus. Please visit a hospital to check if a tetanus shot is needed.",
        warningVI: "Vết thương do vật rỉ sét có nguy cơ uốn ván. Vui lòng đến bệnh viện để kiểm tra tiêm phòng uốn ván.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["fucidin_kr", "madecassol_kr"], VN: ["betadine_vn", "fucidin_vn"], US: ["neosporin_us2", "bandaid_us"] },
        },
      },
    ],
  },
  // === 27. Swelling ===
  {
    id: "swelling",
    nameKR: "부종", nameEN: "Swelling", nameVI: "Phù nề",
    descKR: "발이나 다리가 붓는 상태", descEN: "Swelling of the feet or legs", descVI: "Tình trạng sưng phù ở chân",
    companions: [
      { key: "pain", labelKR: "통증 동반", labelEN: "Pain", labelVI: "Đau kèm theo" },
      { key: "oneSide", labelKR: "한쪽만 부음", labelEN: "One-sided swelling", labelVI: "Sưng một bên", descKR: "한쪽 다리만 붓는 경우", descEN: "Swelling in only one leg", descVI: "Chỉ sưng một bên chân" },
      { key: "breathChest", labelKR: "숨참/가슴통증", labelEN: "Shortness of breath/chest pain", labelVI: "Khó thở/đau ngực" },
      { key: "none", labelKR: "없음 (부종만)", labelEN: "None (swelling only)", labelVI: "Không có (chỉ phù)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "sw_location", questionKR: "어디가 부었나요?", questionEN: "Where is the swelling?", questionVI: "Sưng ở đâu?", options: [
            { labelKR: "발목", labelEN: "Ankle", labelVI: "Mắt cá chân" },
            { labelKR: "종아리", labelEN: "Calf", labelVI: "Bắp chân" },
            { labelKR: "전체 다리", labelEN: "Whole leg", labelVI: "Toàn bộ chân" },
            { labelKR: "양쪽", labelEN: "Both sides", labelVI: "Cả hai bên" },
          ]},
          { id: "sw_when", questionKR: "언제 심한가요?", questionEN: "When is it worse?", questionVI: "Khi nào nặng hơn?", options: [
            { labelKR: "저녁에", labelEN: "In the evening", labelVI: "Buổi tối" },
            { labelKR: "아침에", labelEN: "In the morning", labelVI: "Buổi sáng" },
            { labelKR: "하루종일", labelEN: "All day", labelVI: "Cả ngày" },
          ]},
          { id: "sw_cause", questionKR: "원인 추정", questionEN: "Suspected cause?", questionVI: "Nguyên nhân nghi ngờ?", options: [
            { labelKR: "오래 서있음", labelEN: "Prolonged standing", labelVI: "Đứng lâu" },
            { labelKR: "비행기 탑승 후", labelEN: "After a flight", labelVI: "Sau chuyến bay" },
            { labelKR: "모름", labelEN: "Unknown", labelVI: "Không rõ" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["brufen_200_kr", "brufen_200_kr"], VN: ["daflon_vn", "antistax_vn"], US: ["advil_200_us", "advil_200_us"] },
        },
      },
      {
        comboKey: "oneSide",
        hospitalWarning: true,
        warningKR: "한쪽 다리만 붓는 경우 심부정맥혈전증(DVT)의 가능성이 있습니다. 즉시 병원을 방문하세요. 특히 비행기 탑승 후라면 더 긴급합니다.",
        warningEN: "One-sided leg swelling may indicate deep vein thrombosis (DVT). Visit a hospital immediately, especially after a flight.",
        warningVI: "Sưng một bên chân có thể là dấu hiệu huyết khối tĩnh mạch sâu (DVT). Hãy đến bệnh viện ngay, đặc biệt nếu vừa đi máy bay.",
        drugMatches: {},
      },
      {
        comboKey: "breathChest",
        hospitalWarning: true,
        warningKR: "부종과 숨참이 함께 나타나면 심장 또는 폐 관련 응급상황일 수 있습니다. 즉시 응급실을 방문하세요.",
        warningEN: "Swelling with shortness of breath may indicate a cardiac or pulmonary emergency. Visit the emergency room immediately.",
        warningVI: "Phù nề kèm khó thở có thể là tình trạng cấp cứu tim hoặc phổi. Hãy đến phòng cấp cứu ngay.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["brufen_200_kr", "brufen_200_kr"], VN: ["daflon_vn", "antistax_vn"], US: ["advil_200_us", "advil_200_us"] },
        },
      },
    ],
  },
  // === 28. Acne ===
  {
    id: "acne",
    nameKR: "여드름", nameEN: "Acne", nameVI: "Mụn trứng cá",
    descKR: "피부에 뾰루지가 나는 상태", descEN: "Skin breakouts or pimples", descVI: "Tình trạng nổi mụn trên da",
    companions: [
      { key: "inflamed", labelKR: "통증/염증", labelEN: "Pain/inflammation", labelVI: "Đau/viêm", descKR: "빨갛고 아픈 여드름", descEN: "Red, painful acne", descVI: "Mụn đỏ và đau" },
      { key: "wideArea", labelKR: "넓은 범위", labelEN: "Wide area", labelVI: "Diện tích rộng", descKR: "얼굴 전체 또는 등까지", descEN: "Whole face or extending to back", descVI: "Toàn bộ mặt hoặc lan đến lưng" },
      { key: "none", labelKR: "없음 (여드름만)", labelEN: "None (acne only)", labelVI: "Không có (chỉ mụn)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "ac_location", questionKR: "어디에 있나요?", questionEN: "Where is it?", questionVI: "Ở đâu?", options: [
            { labelKR: "얼굴", labelEN: "Face", labelVI: "Mặt" },
            { labelKR: "등", labelEN: "Back", labelVI: "Lưng" },
            { labelKR: "가슴", labelEN: "Chest", labelVI: "Ngực" },
          ]},
          { id: "ac_type", questionKR: "어떤 형태인가요?", questionEN: "What type?", questionVI: "Loại nào?", options: [
            { labelKR: "좁쌀 여드름", labelEN: "Whiteheads", labelVI: "Mụn đầu trắng" },
            { labelKR: "빨간 여드름", labelEN: "Red pimples", labelVI: "Mụn đỏ" },
            { labelKR: "곪은 여드름", labelEN: "Pus-filled pimples", labelVI: "Mụn mủ" },
          ]},
          { id: "ac_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it been?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "최근", labelEN: "Recent", labelVI: "Gần đây" },
            { labelKR: "몇 달", labelEN: "A few months", labelVI: "Vài tháng" },
            { labelKR: "만성", labelEN: "Chronic", labelVI: "Mạn tính" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["noscarna_kr", "pairacne_kr"], VN: ["benzac_vn", "pairacne_kr"], US: ["differin_us", "noscarna_kr"] },
        },
      },
      {
        comboKey: "inflamed",
        drugMatches: {
          "default": { KR: ["pairacne_kr", "fucidin_kr"], VN: ["pairacne_kr", "benzac_vn"], US: ["differin_us", "noscarna_kr"] },
        },
      },
      {
        comboKey: "wideArea",
        hospitalWarning: true,
        warningKR: "여드름이 넓은 범위에 걸쳐있거나 만성적이면 피부과 전문 치료가 필요할 수 있습니다. 피부과를 방문하세요.",
        warningEN: "If acne covers a wide area or is chronic, dermatological treatment may be needed. Please visit a dermatologist.",
        warningVI: "Nếu mụn lan rộng hoặc mạn tính, có thể cần điều trị chuyên khoa da liễu. Vui lòng đến bác sĩ da liễu.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["noscarna_kr", "pairacne_kr"], VN: ["benzac_vn", "pairacne_kr"], US: ["differin_us", "noscarna_kr"] },
        },
      },
    ],
  },
  // === 29. Athlete's foot ===
  {
    id: "athletesFoot",
    nameKR: "무좀", nameEN: "Athlete's foot", nameVI: "Nấm chân",
    descKR: "발에 곰팡이가 감염된 상태, 가렵고 피부가 벗겨짐", descEN: "Fungal infection of the foot causing itching and peeling skin", descVI: "Tình trạng nhiễm nấm ở chân, ngứa và bong da",
    companions: [
      { key: "toenail", labelKR: "발톱 변색", labelEN: "Toenail discoloration", labelVI: "Móng chân đổi màu", descKR: "발톱이 노랗거나 두꺼워진 상태", descEN: "Toenails turned yellow or thickened", descVI: "Móng chân vàng hoặc dày lên" },
      { key: "odor", labelKR: "냄새", labelEN: "Odor", labelVI: "Mùi hôi" },
      { key: "cracking", labelKR: "갈라짐/출혈", labelEN: "Cracking/bleeding", labelVI: "Nứt nẻ/chảy máu" },
      { key: "none", labelKR: "없음 (무좀만)", labelEN: "None (athlete's foot only)", labelVI: "Không có (chỉ nấm chân)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "af_location", questionKR: "어디에 있나요?", questionEN: "Where is it?", questionVI: "Ở đâu?", options: [
            { labelKR: "발가락 사이", labelEN: "Between toes", labelVI: "Giữa các ngón chân" },
            { labelKR: "발바닥", labelEN: "Sole", labelVI: "Lòng bàn chân" },
            { labelKR: "발 옆면", labelEN: "Side of foot", labelVI: "Cạnh bàn chân" },
          ]},
          { id: "af_symptom", questionKR: "증상은?", questionEN: "What symptoms?", questionVI: "Triệu chứng?", options: [
            { labelKR: "가려움", labelEN: "Itching", labelVI: "Ngứa" },
            { labelKR: "각질", labelEN: "Flaking", labelVI: "Bong vảy" },
            { labelKR: "물집", labelEN: "Blisters", labelVI: "Phỏng nước" },
            { labelKR: "갈라짐", labelEN: "Cracking", labelVI: "Nứt nẻ" },
          ]},
          { id: "af_duration", questionKR: "얼마나 됐나요?", questionEN: "How long has it been?", questionVI: "Đã bao lâu rồi?", options: [
            { labelKR: "최근", labelEN: "Recent", labelVI: "Gần đây" },
            { labelKR: "몇 주", labelEN: "A few weeks", labelVI: "Vài tuần" },
            { labelKR: "만성", labelEN: "Chronic", labelVI: "Mạn tính" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["lamisil_kr", "canesten_kr"], VN: ["lamisil_kr", "canesten_kr"], US: ["lamisil_kr", "canesten_kr"] },
        },
      },
      {
        comboKey: "toenail",
        hospitalWarning: true,
        warningKR: "발톱까지 감염된 경우 OTC 약으로는 치료가 어렵습니다. 피부과에서 경구 항진균제를 처방받으세요.",
        warningEN: "If the infection has spread to the toenails, OTC medication is insufficient. Please visit a dermatologist for oral antifungal treatment.",
        warningVI: "Nếu nấm đã lan đến móng chân, thuốc không kê đơn không đủ hiệu quả. Vui lòng đến bác sĩ da liễu để được kê thuốc kháng nấm đường uống.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["lamisil_kr", "canesten_kr"], VN: ["lamisil_kr", "canesten_kr"], US: ["lamisil_kr", "canesten_kr"] },
        },
      },
    ],
  },
  // === 30. Stye ===
  {
    id: "stye",
    nameKR: "다래끼", nameEN: "Stye", nameVI: "Lẹo mắt",
    descKR: "눈꺼풀에 작은 혹처럼 염증이 생긴 상태", descEN: "A small inflamed bump on the eyelid", descVI: "Tình trạng viêm nổi cục nhỏ trên mí mắt",
    companions: [
      { key: "visionChange", labelKR: "시력 변화", labelEN: "Vision change", labelVI: "Thay đổi thị lực" },
      { key: "eyeRedPain", labelKR: "눈 전체 충혈/통증", labelEN: "Eye redness/pain", labelVI: "Đỏ mắt/đau mắt toàn bộ" },
      { key: "fever", labelKR: "발열", labelEN: "Fever", labelVI: "Sốt" },
      { key: "none", labelKR: "없음 (다래끼만)", labelEN: "None (stye only)", labelVI: "Không có (chỉ lẹo mắt)" },
    ],
    combos: [
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "st_location", questionKR: "어디에 있나요?", questionEN: "Where is it?", questionVI: "Ở đâu?", options: [
            { labelKR: "윗눈꺼풀", labelEN: "Upper eyelid", labelVI: "Mí mắt trên" },
            { labelKR: "아래눈꺼풀", labelEN: "Lower eyelid", labelVI: "Mí mắt dưới" },
          ]},
          { id: "st_size", questionKR: "크기는?", questionEN: "How large?", questionVI: "Kích thước?", options: [
            { labelKR: "작음(좁쌀)", labelEN: "Small (grain-sized)", labelVI: "Nhỏ (hạt kê)" },
            { labelKR: "중간", labelEN: "Medium", labelVI: "Vừa" },
            { labelKR: "큼", labelEN: "Large", labelVI: "Lớn" },
          ]},
          { id: "st_pus", questionKR: "고름이 보이나요?", questionEN: "Is pus visible?", questionVI: "Có thấy mủ không?", options: [
            { labelKR: "예", labelEN: "Yes", labelVI: "Có" },
            { labelKR: "아니오", labelEN: "No", labelVI: "Không" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["terramycin_kr", "warm_compress"], VN: ["tobrex_vn", "warm_compress"], US: ["terramycin_kr", "warm_compress"] },
        },
      },
      {
        comboKey: "visionChange",
        hospitalWarning: true,
        warningKR: "다래끼와 시력 변화가 함께 나타나면 안과를 즉시 방문하세요.",
        warningEN: "A stye with vision changes requires an immediate visit to an ophthalmologist.",
        warningVI: "Lẹo mắt kèm thay đổi thị lực cần đến bác sĩ nhãn khoa ngay.",
        drugMatches: {},
      },
      {
        comboKey: "fever",
        hospitalWarning: true,
        warningKR: "다래끼와 발열이 함께 나타나면 감염이 퍼졌을 가능성이 있습니다. 안과를 방문하세요.",
        warningEN: "A stye with fever may indicate the infection has spread. Please visit an ophthalmologist.",
        warningVI: "Lẹo mắt kèm sốt có thể là dấu hiệu nhiễm trùng lan rộng. Vui lòng đến bác sĩ nhãn khoa.",
        drugMatches: {},
      },
      {
        comboKey: "eyeRedPain",
        hospitalWarning: true,
        warningKR: "눈 전체 충혈과 통증은 안과 진료가 필요합니다.",
        warningEN: "Full eye redness and pain require an ophthalmologist examination.",
        warningVI: "Đỏ và đau toàn bộ mắt cần được bác sĩ nhãn khoa khám.",
        drugMatches: {},
      },
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["terramycin_kr", "warm_compress"], VN: ["tobrex_vn", "warm_compress"], US: ["terramycin_kr", "warm_compress"] },
        },
      },
    ],
  },
  // === 31. Hangover ===
  {
    id: "hangover",
    nameKR: "숙취", nameEN: "Hangover", nameVI: "Say rượu",
    descKR: "술을 마신 다음 날 머리 아프고 속이 안 좋은 상태", descEN: "Feeling sick after drinking alcohol", descVI: "Cảm giác khó chịu sau khi uống rượu",
    companions: [
      { key: "headache", labelKR: "두통", labelEN: "Headache", labelVI: "Đau đầu" },
      { key: "nausea", labelKR: "구역/구토", labelEN: "Nausea/Vomiting", labelVI: "Buồn nôn", descKR: "메스껍고 토할 것 같은 느낌", descEN: "Feeling nauseous or vomiting", descVI: "Buồn nôn hoặc nôn" },
      { key: "diarrhea", labelKR: "설사", labelEN: "Diarrhea", labelVI: "Tiêu chảy" },
      { key: "thirst", labelKR: "극심한 갈증", labelEN: "Extreme thirst", labelVI: "Khát nước dữ dội", descKR: "입이 마르고 물이 당기는 상태", descEN: "Dry mouth and craving water", descVI: "Khô miệng và thèm nước" },
      { key: "none", labelKR: "없음 (숙취만)", labelEN: "None (hangover only)", labelVI: "Không (chỉ say rượu)" },
    ],
    combos: [
      // Hangover only
      {
        comboKey: "none",
        followUpQuestions: [
          { id: "hg_main", questionKR: "가장 불편한 증상은?", questionEN: "What bothers you most?", questionVI: "Triệu chứng khó chịu nhất?", options: [
            { labelKR: "머리 아픔", labelEN: "Headache", labelVI: "Đau đầu" },
            { labelKR: "속 메스꺼움", labelEN: "Nausea", labelVI: "Buồn nôn" },
            { labelKR: "어지러움", labelEN: "Dizziness", labelVI: "Chóng mặt" },
            { labelKR: "전부 다", labelEN: "Everything", labelVI: "Tất cả" },
          ]},
          { id: "hg_amount", questionKR: "어젯밤 음주량은?", questionEN: "How much did you drink?", questionVI: "Bạn đã uống bao nhiêu?", options: [
            { labelKR: "소량 (1~2잔)", labelEN: "Light (1-2 drinks)", labelVI: "Ít (1-2 ly)" },
            { labelKR: "보통 (3~5잔)", labelEN: "Moderate (3-5 drinks)", labelVI: "Vừa (3-5 ly)" },
            { labelKR: "과음 (6잔 이상)", labelEN: "Heavy (6+ drinks)", labelVI: "Nhiều (6+ ly)" },
          ]},
        ],
        drugMatches: {
          "default": { KR: ["condition_kr", "brufen_hangover_kr"], VN: ["condition_kr", "brufen_hangover_kr"], US: ["hangover_ors_kr", "brufen_hangover_kr"] },
          "severe": { KR: ["hangover_combo_kr", "hangover_ors_kr"], VN: ["hangover_combo_kr", "hangover_ors_kr"], US: ["hangover_combo_kr", "hangover_ors_kr"] },
        },
      },
      // Hangover + headache
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["brufen_hangover_kr", "condition_kr"], VN: ["brufen_hangover_kr", "condition_kr"], US: ["brufen_hangover_kr", "hangover_ors_kr"] },
        },
      },
      // Hangover + nausea
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "domperidone_kr"], VN: ["motilium_vn", "condition_kr"], US: ["pepto_us", "dramamine_us"] },
        },
      },
      // Hangover + thirst (dehydration)
      {
        comboKey: "thirst",
        drugMatches: {
          "default": { KR: ["hangover_ors_kr", "hangover_pocari_kr"], VN: ["hangover_ors_kr", "hangover_pocari_kr"], US: ["hangover_ors_kr", "hangover_pocari_kr"] },
        },
      },
      // Hangover + diarrhea
      {
        comboKey: "diarrhea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "hangover_ors_kr"], VN: ["berberin_vn", "hangover_ors_kr"], US: ["pepto_us", "hangover_ors_kr"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["hangover_combo_kr", "hangover_ors_kr"], VN: ["hangover_combo_kr", "hangover_ors_kr"], US: ["hangover_combo_kr", "hangover_ors_kr"] },
        },
      },
    ],
  },
];

// === Helper functions ===

export function getCategory(id: string): SymptomCategory | undefined {
  return SYMPTOM_CATEGORIES.find((c) => c.id === id);
}

export function findCombo(category: SymptomCategory, selectedCompanions: string[]): SymptomComboResult {
  const filtered = selectedCompanions.filter((k) => k !== "none").sort();
  const comboKey = filtered.length === 0 ? "none" : filtered.join("+");

  // Exact match
  const exact = category.combos.find((c) => c.comboKey === comboKey);
  if (exact) return exact;

  // Partial match: try subsets from longest to shortest
  for (let len = filtered.length; len > 0; len--) {
    for (let i = 0; i <= filtered.length - len; i++) {
      const subset = filtered.slice(i, i + len).join("+");
      const match = category.combos.find((c) => c.comboKey === subset);
      if (match) return match;
    }
  }

  // Fallback
  return category.combos.find((c) => c.comboKey === "_fallback") || category.combos[0];
}

export function getDrugEntries(drugMatch: DrugMatch, countryCode: string): [DrugEntry, DrugEntry] | null {
  const countryKey = countryCode as keyof DrugMatch;
  const ids = drugMatch[countryKey];
  if (!ids) return null;
  const first = DRUGS[ids[0]];
  const second = DRUGS[ids[1]];
  if (!first || !second) return null;
  return [first, second];
}
