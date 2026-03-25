// === Types ===

export interface DrugEntry {
  id: string;
  nameKR: string;
  nameVN: string;
  nameUS: string;
  nameJP?: string;
  nameLocal?: string; // original local script name (e.g. パブロンゴールドA)
  pronKR?: string; // pronunciation guide in Korean (e.g. 파부론 고루도 에이)
  pronEN?: string; // pronunciation guide in English (e.g. pa-bu-ron go-ru-do ei)
  ingredient: string;
  dosageKR: string;
  dosageVN: string;
  dosageUS: string;
  dosageJP?: string;
  precautionKR: string;
  precautionVN: string;
  precautionUS: string;
  precautionJP?: string;
  nameTH?: string;
  dosageTH?: string;
  precautionTH?: string;
  nameID?: string;
  dosageID?: string;
  precautionID?: string;
  namePH?: string;
  dosagePH?: string;
  precautionPH?: string;
  nameGB?: string;
  dosageGB?: string;
  precautionGB?: string;
  nameAU?: string;
  dosageAU?: string;
  precautionAU?: string;
  nameDE?: string;
  dosageDE?: string;
  precautionDE?: string;
}

export interface DrugMatch {
  KR: [string, string]; // [1st choice id, 2nd choice id]
  VN: [string, string];
  US: [string, string];
  JP?: [string, string];
  TH?: [string, string];
  ID?: [string, string];
  PH?: [string, string];
  GB?: [string, string];
  AU?: [string, string];
  DE?: [string, string];
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
  tylenol_500_kr: { id: "tylenol_500_kr", nameKR: "타이레놀 500mg", nameVN: "Tylenol 500mg", nameUS: "Tylenol 500mg", ingredient: "Acetaminophen 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "하루 최대 4g, 음주 시 주의. 600개 넘는 약에 아세트아미노펜 함유, 중복 복용 주의. 음주자 간독성 위험", precautionVN: "Tối đa 4g/ngày, tránh rượu", precautionUS: "Max 3g/day, avoid alcohol" },
  brufen_200_kr: { id: "brufen_200_kr", nameKR: "부루펜 200mg", nameVN: "Brufen 200mg", nameUS: "Brufen 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 4~6시간 간격, 식후", dosageVN: "1 viên, cách 4-6 giờ, sau ăn", dosageUS: "1 tablet, every 4-6 hours, with food", precautionKR: "공복 복용 피할 것, 위장장애 주의", precautionVN: "Tránh uống khi đói, cẩn thận dạ dày", precautionUS: "Avoid on empty stomach", pronEN: "bu-ru-pen" },
  panadol_500_vn: { id: "panadol_500_vn", nameKR: "파나돌 500mg", nameVN: "Panadol 500mg", nameUS: "Panadol 500mg", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "하루 최대 8정", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 tablets/day", pronKR: "파나돌" },
  efferalgan_500_vn: { id: "efferalgan_500_vn", nameKR: "에페랄간 500mg", nameVN: "Efferalgan 500mg", nameUS: "Efferalgan 500mg", ingredient: "Paracetamol 500mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên sủi, hòa nước, cách 4-6 giờ", dosageUS: "1 effervescent tablet, dissolve in water", precautionKR: "간 질환자 주의", precautionVN: "Cẩn thận bệnh gan", precautionUS: "Caution with liver disease", pronKR: "에페랄간" },
  tylenol_500_us: { id: "tylenol_500_us", nameKR: "타이레놀 500mg", nameVN: "Tylenol 500mg", nameUS: "Tylenol 500mg", ingredient: "Acetaminophen 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "라벨 권장 최대 3g (6정), FDA 절대 상한 4g. 600개 이상 제품에 아세트아미노펜 함유, 중복 복용 주의", precautionVN: "Tối đa 3g/ngày", precautionUS: "Max 3g/day, avoid alcohol" },
  advil_200_us: { id: "advil_200_us", nameKR: "애드빌 200mg", nameVN: "Advil 200mg", nameUS: "Advil 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "공복 복용 피할 것", precautionVN: "Tránh uống khi đói", precautionUS: "Take with food, avoid on empty stomach" },

  // Severe headache
  ezn6_kr: { id: "ezn6_kr", nameKR: "이지엔6", nameVN: "EZN6", nameUS: "EZN6", ingredient: "Ibuprofen 200mg + Pamabrom 25mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "위장 장애 주의, 식후 복용", precautionVN: "Cẩn thận dạ dày, uống sau ăn", precautionUS: "Take with food, stomach caution", pronEN: "i-ji-en-shik-su" },
  geborin_kr: { id: "geborin_kr", nameKR: "게보린", nameVN: "Geborin", nameUS: "Geborin", ingredient: "Acetaminophen 300mg + Caffeine + Isopropylantipyrine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "장기 복용 금지, 15세 미만 금지. 15세 미만 복용 금지, 피린계 알레르기 주의, 공복 피할 것", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term", pronEN: "ge-bo-rin" },
  hapacol_650_vn: { id: "hapacol_650_vn", nameKR: "하파콜 650mg", nameVN: "Hapacol 650mg", nameUS: "Hapacol 650mg", ingredient: "Paracetamol 650mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "하루 최대 6정", precautionVN: "Tối đa 6 viên/ngày", precautionUS: "Max 6 tablets/day", pronKR: "하파콜" },
  panadol_extra_vn: { id: "panadol_extra_vn", nameKR: "파나돌 엑스트라", nameVN: "Panadol Extra", nameUS: "Panadol Extra", ingredient: "Paracetamol 500mg + Caffeine 65mg", dosageKR: "1~2정, 하루 3~4회", dosageVN: "1-2 viên, 3-4 lần/ngày", dosageUS: "1-2 tablets, 3-4 times/day", precautionKR: "카페인 민감자 주의", precautionVN: "Cẩn thận nếu nhạy cảm caffeine", precautionUS: "Caution if caffeine sensitive" },
  excedrin_us: { id: "excedrin_us", nameKR: "엑세드린", nameVN: "Excedrin", nameUS: "Excedrin", ingredient: "Acetaminophen 250mg + Aspirin 250mg + Caffeine 65mg", dosageKR: "2정, 6시간 간격", dosageVN: "2 viên, cách 6 giờ", dosageUS: "2 tablets, every 6 hours", precautionKR: "위장 출혈 주의, 18세 미만 금지. 18세 미만 금기 (아스피린→Reye 증후군), 혈액 희석제 병용 주의", precautionVN: "Cẩn thận xuất huyết dạ dày", precautionUS: "Risk of stomach bleeding, not for under 18" },
  advil_400_us: { id: "advil_400_us", nameKR: "애드빌 400mg", nameVN: "Advil 400mg", nameUS: "Advil 400mg", ingredient: "Ibuprofen 400mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "고용량 위장 부담, 식후 필수", precautionVN: "Uống sau ăn, cẩn thận dạ dày", precautionUS: "Take with food, higher GI risk" },

  // Cold combination drugs
  pancol_a_kr: { id: "pancol_a_kr", nameKR: "판콜에이", nameVN: "Pancol-A", nameUS: "Pancol-A", ingredient: "Acetaminophen 300mg + Phenylephrine 10mg + Pentoxyverine 15mg + Guaifenesin 80mg + Chlorpheniramine 2.5mg + Caffeine 30mg", dosageKR: "1병(30ml), 하루 3회", dosageVN: "1 chai (30ml), 3 lần/ngày", dosageUS: "1 bottle (30ml), 3 times/day", precautionKR: "졸음 유발 가능, 운전 주의", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", pronEN: "pan-kol-ei" },
  tylenol_cold_kr: { id: "tylenol_cold_kr", nameKR: "타이레놀 콜드", nameVN: "Tylenol Cold", nameUS: "Tylenol Cold", ingredient: "Acetaminophen + Pseudoephedrine + Dextromethorphan + Chlorpheniramine", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "운전 주의, 다른 해열제와 중복 금지", precautionVN: "Không lái xe, không dùng với thuốc hạ sốt khác", precautionUS: "Do not drive, avoid other acetaminophen products" },
  decolgen_forte_vn: { id: "decolgen_forte_vn", nameKR: "데콜겐 포르테", nameVN: "Decolgen Forte", nameUS: "Decolgen Forte", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1~2정, 하루 3~4회, 24시간 최대 6정", dosageVN: "1-2 viên, 3-4 lần/ngày, tối đa 6 viên/24 giờ", dosageUS: "1-2 tablets, 3-4 times/day, max 6 in 24 hours", precautionKR: "졸음 유발. 졸음→운전금지, 고혈압/당뇨/갑상선 금기, 임산부 금기", precautionVN: "Gây buồn ngủ", precautionUS: "May cause drowsiness", pronKR: "데꼴겐 포르떼" },
  tiffy_vn: { id: "tiffy_vn", nameKR: "티피 데이", nameVN: "Tiffy Dey", nameUS: "Tiffy Dey", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "고혈압 환자 주의. 6세 미만 금기, 고혈압 주의, 만성 음주자 간독성", precautionVN: "Cẩn thận bệnh cao huyết áp", precautionUS: "Caution with hypertension", pronKR: "티피 데이" },
  dayquil_us: { id: "dayquil_us", nameKR: "데이퀼", nameVN: "DayQuil", nameUS: "DayQuil", ingredient: "Acetaminophen + Dextromethorphan + Phenylephrine", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "하루 최대 8캡슐. FDA가 경구 페닐에프린 코막힘 효과 없다고 발표. 코막힘엔 Sudafed 또는 Afrin 권장", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 capsules/day" },
  tylenol_coldfl_us: { id: "tylenol_coldfl_us", nameKR: "타이레놀 콜드&플루", nameVN: "Tylenol Cold & Flu", nameUS: "Tylenol Cold & Flu", ingredient: "Acetaminophen + Phenylephrine + Dextromethorphan + Guaifenesin", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "다른 아세트아미노펜 제품 병용 금지", precautionVN: "Không dùng với sản phẩm paracetamol khác", precautionUS: "Do not combine with other acetaminophen products" },

  // Migraine
  penzal_kr: { id: "penzal_kr", nameKR: "펜잘", nameVN: "Penzal", nameUS: "Penzal", ingredient: "Ibuprofen Arginine 400mg", dosageKR: "1정, 증상 시작 시 빠르게", dosageVN: "1 viên, uống ngay khi có triệu chứng", dosageUS: "1 tablet at onset", precautionKR: "식후 복용 권장", precautionVN: "Nên uống sau ăn", precautionUS: "Take with food" },
  excedrin_migraine_us: { id: "excedrin_migraine_us", nameKR: "엑세드린 마이그레인", nameVN: "Excedrin Migraine", nameUS: "Excedrin Migraine", ingredient: "Acetaminophen 250mg + Aspirin 250mg + Caffeine 65mg", dosageKR: "2정, 증상 시작 시", dosageVN: "2 viên, khi bắt đầu triệu chứng", dosageUS: "2 tablets at onset of migraine", precautionKR: "하루 2정 초과 금지", precautionVN: "Không quá 2 viên/ngày", precautionUS: "Do not exceed 2 tablets/day" },
  advil_migraine_us: { id: "advil_migraine_us", nameKR: "애드빌 마이그레인", nameVN: "Advil Migraine", nameUS: "Advil Migraine", ingredient: "Ibuprofen 200mg (Solubilized)", dosageKR: "1캡슐, 증상 시작 시", dosageVN: "1 viên nang, khi bắt đầu triệu chứng", dosageUS: "1 capsule at onset", precautionKR: "하루 2캡슐 초과 금지", precautionVN: "Không quá 2 viên/ngày", precautionUS: "Max 2 capsules/day" },

  // Tension headache
  advil_liquigel_kr: { id: "advil_liquigel_kr", nameKR: "애드빌 리퀴겔", nameVN: "Advil Liqui-Gels", nameUS: "Advil Liqui-Gels", ingredient: "Ibuprofen 200mg (Solubilized)", dosageKR: "1캡슐, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 capsule, every 4-6 hours", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take with food" },
  ibuprofen_400_vn: { id: "ibuprofen_400_vn", nameKR: "부루펜 400mg", nameVN: "Gofen 400mg", nameUS: "Motrin IB 400mg", ingredient: "Ibuprofen 400mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "식후 복용 필수. 위궤양/위장출혈 위험, 반드시 식후 복용, 아스피린 알레르기 금기. 한국 OTC(200mg)보다 2배 높은 용량", precautionVN: "Phải uống sau ăn", precautionUS: "Must take with food", pronKR: "고편" },
  salonpas_vn: { id: "salonpas_vn", nameKR: "살론파스 패치", nameVN: "Salonpas (Miếng dán)", nameUS: "Salonpas Patch", ingredient: "Methyl Salicylate + Menthol", dosageKR: "1매, 목/어깨 부착, 8시간", dosageVN: "1 miếng, dán cổ/vai, 8 giờ", dosageUS: "1 patch on neck/shoulder, 8 hours", precautionKR: "피부 자극 시 제거, 아스피린 알레르기 주의", precautionVN: "Gỡ nếu kích ứng da", precautionUS: "Remove if skin irritation occurs", pronKR: "살론파스" },
  aleve_us: { id: "aleve_us", nameKR: "탁센", nameVN: "Anaprox", nameUS: "Aleve", ingredient: "Naproxen Sodium 220mg", dosageKR: "1정, 8~12시간 간격", dosageVN: "1 viên, cách 8-12 giờ", dosageUS: "1 tablet, every 8-12 hours", precautionKR: "위장 질환 시 주의", precautionVN: "Cẩn thận bệnh dạ dày", precautionUS: "Caution with stomach conditions" },

  // === Fever drugs ===
  hwatu_ben_kr: { id: "hwatu_ben_kr", nameKR: "화이투벤", nameVN: "Hwaitu-Ben", nameUS: "Hwaitu-Ben", ingredient: "Acetaminophen + Guaifenesin + Pseudoephedrine + Dextromethorphan", dosageKR: "1캡슐, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 3 times/day", precautionKR: "졸음 주의, 운전 주의", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },
  ameflu_vn: { id: "ameflu_vn", nameKR: "아메플루", nameVN: "Ameflu", nameUS: "Ameflu", ingredient: "Paracetamol + Chlorpheniramine + Phenylephrine", dosageKR: "1~2정, 4시간 간격", dosageVN: "1-2 viên, cách 4 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tablets, every 4 hours", precautionKR: "하루 최대 8정", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 tablets/day", pronKR: "아메플루" },
  new_ameflu_vn: { id: "new_ameflu_vn", nameKR: "뉴 아메플루 데이타임", nameVN: "New Ameflu Daytime", nameUS: "New Ameflu Daytime", ingredient: "Paracetamol + Phenylephrine + Dextromethorphan", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "졸음 적음 (주간용)", precautionVN: "Ít buồn ngủ (dùng ban ngày)", precautionUS: "Non-drowsy (daytime formula)" },
  nyquil_us: { id: "nyquil_us", nameKR: "나이퀼", nameVN: "NyQuil", nameUS: "NyQuil", ingredient: "Acetaminophen + Dextromethorphan + Doxylamine", dosageKR: "2캡슐, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 capsules at bedtime", precautionKR: "야간 전용, 강한 졸음 유발. 강한 졸음→운전 금지, 음주 병용 금지", precautionVN: "Chỉ dùng ban đêm, rất buồn ngủ", precautionUS: "Nighttime only, causes strong drowsiness" },
  tylenol_coldsevere_us: { id: "tylenol_coldsevere_us", nameKR: "타이레놀 콜드&플루 시비어", nameVN: "Tylenol Cold & Flu Severe", nameUS: "Tylenol Cold & Flu Severe", ingredient: "Acetaminophen + Phenylephrine + Dextromethorphan + Guaifenesin", dosageKR: "2캡슐, 4시간 간격", dosageVN: "2 viên, cách 4 giờ", dosageUS: "2 capsules, every 4 hours", precautionKR: "최대 10캡슐/일", precautionVN: "Tối đa 10 viên/ngày", precautionUS: "Max 10 capsules/day" },
  theraflu_us: { id: "theraflu_us", nameKR: "테라플루", nameVN: "Theraflu", nameUS: "Theraflu", ingredient: "Acetaminophen + Pheniramine + Phenylephrine", dosageKR: "1포, 뜨거운 물에 타서 복용", dosageVN: "1 gói, pha nước nóng", dosageUS: "1 packet dissolved in hot water", precautionKR: "하루 최대 4포", precautionVN: "Tối đa 4 gói/ngày", precautionUS: "Max 4 packets/day" },

  // Stomach / diarrhea combos
  jungrowhan_kr: { id: "jungrowhan_kr", nameKR: "정로환", nameVN: "Jungrowhan", nameUS: "Jungrowhan", ingredient: "Berberine + Wood Creosote", dosageKR: "3정, 하루 3회, 식후", dosageVN: "3 viên, 3 lần/ngày, sau ăn", dosageUS: "3 tablets, 3 times/day, after meals", precautionKR: "수분 보충 필수", precautionVN: "Phải bù nước", precautionUS: "Stay hydrated", pronEN: "jung-ro-hwan" },
  smecta_kr: { id: "smecta_kr", nameKR: "스멕타", nameVN: "Smecta", nameUS: "Smecta", ingredient: "Diosmectite 3g", dosageKR: "1포, 하루 3회, 식간", dosageVN: "1 gói, 3 lần/ngày, giữa bữa ăn", dosageUS: "1 sachet, 3 times/day, between meals", precautionKR: "다른 약과 2시간 간격", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other medications", pronEN: "seu-mek-ta" },
  berberin_vn: { id: "berberin_vn", nameKR: "베르베린", nameVN: "Berberin", nameUS: "Berberin", ingredient: "Berberine 100mg", dosageKR: "2정, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", precautionKR: "임산부 사용 금지", precautionVN: "Không dùng cho phụ nữ mang thai", precautionUS: "Not for pregnant women", pronKR: "베르베린" },
  pepto_us: { id: "pepto_us", nameKR: "펩토비스몰", nameVN: "Pepto-Bismol", nameUS: "Pepto-Bismol", ingredient: "Bismuth Subsalicylate 262mg", dosageKR: "2정, 30분~1시간 간격", dosageVN: "2 viên, cách 30-60 phút", dosageUS: "2 tablets, every 30-60 min as needed", precautionKR: "아스피린 알레르기 시 금지, 혀/변 검게 변할 수 있음. 18세 미만 바이러스 감염 시 금기 (Reye), 아스피린 알레르기 주의", precautionVN: "Không dùng nếu dị ứng aspirin", precautionUS: "Avoid if allergic to aspirin, may darken tongue/stool" },
  imodium_us: { id: "imodium_us", nameKR: "이모디움", nameVN: "Imodium", nameUS: "Imodium", ingredient: "Loperamide 2mg", dosageKR: "초회 2정, 이후 1정씩", dosageVN: "Lần đầu 2 viên, sau đó 1 viên", dosageUS: "2 caplets initially, then 1 after each loose stool", precautionKR: "혈변/고열 시 사용 금지. 발열/혈변 동반 시 사용 금지, 하루 최대 16mg", precautionVN: "Không dùng khi phân máu/sốt cao", precautionUS: "Do not use with bloody stool or high fever" },

  // Throat
  strepsils_kr: { id: "strepsils_kr", nameKR: "스트렙실", nameVN: "Strepsils", nameUS: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격, 천천히 녹여", dosageVN: "1 viên, cách 2-3 giờ, ngậm tan", dosageUS: "1 lozenge, every 2-3 hours, dissolve slowly", precautionKR: "하루 8정 이하", precautionVN: "Tối đa 8 viên/ngày", precautionUS: "Max 8 lozenges/day", pronEN: "seu-teu-rep-shil" },
  cepacol_us: { id: "cepacol_us", nameKR: "세파콜", nameVN: "Cepacol", nameUS: "Cepacol", ingredient: "Benzocaine 15mg + Menthol 3.6mg", dosageKR: "1정, 2시간 간격, 천천히 녹여", dosageVN: "1 viên, cách 2 giờ, ngậm tan", dosageUS: "1 lozenge, every 2 hours, dissolve slowly", precautionKR: "하루 10정 이하", precautionVN: "Tối đa 10 viên/ngày", precautionUS: "Max 10 lozenges/day" },

  // === Cough drugs ===
  copus_syrup_kr: { id: "copus_syrup_kr", nameKR: "코푸시럽에스", nameVN: "Copus Syrup S", nameUS: "Copus Syrup S", ingredient: "dl-Methylephedrine + Guaifenesin + Chlorpheniramine", dosageKR: "10ml, 하루 3회", dosageVN: "10ml, 3 lần/ngày", dosageUS: "10ml, 3 times/day", precautionKR: "졸음 가능, 운전 주의", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", pronEN: "ko-pu-shi-reop" },
  tushira_kr: { id: "tushira_kr", nameKR: "터시라", nameVN: "Tushira", nameUS: "Tushira", ingredient: "Pentoxyverine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "어지러움 가능", precautionVN: "Có thể gây chóng mặt", precautionUS: "May cause dizziness" },
  bophe_vn: { id: "bophe_vn", nameKR: "보페남하 시럽", nameVN: "Bổ Phế Nam Hà", nameUS: "Bo Phe Nam Ha Syrup", ingredient: "Herbal extract complex", dosageKR: "10ml, 하루 3회", dosageVN: "10ml, 3 lần/ngày", dosageUS: "10ml, 3 times/day", precautionKR: "당뇨 환자는 무설탕 선택", precautionVN: "Bệnh tiểu đường chọn loại không đường", precautionUS: "Diabetics should choose sugar-free version", pronKR: "보페 남하" },
  prospan_vn: { id: "prospan_vn", nameKR: "프로스판 시럽", nameVN: "Prospan", nameUS: "Prospan Syrup", ingredient: "Ivy leaf extract (Hedera helix)", dosageKR: "5ml, 하루 3회", dosageVN: "5ml, 3 lần/ngày", dosageUS: "5ml, 3 times/day", precautionKR: "자연 성분, 부작용 적음", precautionVN: "Thành phần tự nhiên, ít tác dụng phụ", precautionUS: "Natural ingredient, minimal side effects", pronKR: "프로스판" },
  delsym_us: { id: "delsym_us", nameKR: "델심", nameVN: "Delsym", nameUS: "Delsym", ingredient: "Dextromethorphan Extended-Release", dosageKR: "10ml, 12시간 간격", dosageVN: "10ml, cách 12 giờ", dosageUS: "10ml, every 12 hours", precautionKR: "졸음 가능, 12시간 지속형", precautionVN: "Có thể buồn ngủ, tác dụng 12 giờ", precautionUS: "May cause drowsiness, 12-hour formula" },
  robitussin_dm_us: { id: "robitussin_dm_us", nameKR: "로비투신 DM", nameVN: "Robitussin DM", nameUS: "Robitussin DM", ingredient: "Dextromethorphan + Guaifenesin", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, cách 4 giờ", dosageUS: "10ml, every 4 hours", precautionKR: "하루 최대 6회", precautionVN: "Tối đa 6 lần/ngày", precautionUS: "Max 6 doses/day" },
  mucopect_kr: { id: "mucopect_kr", nameKR: "뮤코펙트", nameVN: "Mucopect", nameUS: "Mucopect", ingredient: "Ambroxol 30mg", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tablet, 3 times/day, after meals", precautionKR: "식후 복용, 수분 충분히 섭취", precautionVN: "Uống sau ăn, uống nhiều nước", precautionUS: "Take after meals, drink plenty of water", pronEN: "myu-ko-pek-teu" },
  copus_kr: { id: "copus_kr", nameKR: "코푸시럽", nameVN: "Copus Syrup", nameUS: "Copus Syrup", ingredient: "Guaifenesin + Bromhexine", dosageKR: "10ml, 하루 3회", dosageVN: "10ml, 3 lần/ngày", dosageUS: "10ml, 3 times/day", precautionKR: "수분 충분히 섭취", precautionVN: "Uống nhiều nước", precautionUS: "Drink plenty of water" },
  acc200_vn: { id: "acc200_vn", nameKR: "ACC 200", nameVN: "ACC 200", nameUS: "ACC 200", ingredient: "Acetylcysteine 200mg", dosageKR: "1포, 하루 2~3회, 물에 녹여", dosageVN: "1 gói, 2-3 lần/ngày, hòa nước", dosageUS: "1 sachet, 2-3 times/day, dissolve in water", precautionKR: "물에 녹여 복용", precautionVN: "Hòa tan trong nước", precautionUS: "Dissolve in water before taking", pronKR: "에이씨씨" },
  mucosolvan_vn: { id: "mucosolvan_vn", nameKR: "뮤코솔반", nameVN: "Mucosolvan", nameUS: "Mucosolvan", ingredient: "Ambroxol 30mg", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tablet, 3 times/day, after meals", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals", pronKR: "무코솔반" },
  mucinex_us: { id: "mucinex_us", nameKR: "뮤시넥스", nameVN: "Mucinex", nameUS: "Mucinex", ingredient: "Guaifenesin 600mg Extended-Release", dosageKR: "1정, 12시간 간격", dosageVN: "1 viên, cách 12 giờ", dosageUS: "1 tablet, every 12 hours", precautionKR: "물 많이 마시기, 씹지 말 것", precautionVN: "Uống nhiều nước, không nhai", precautionUS: "Drink plenty of water, do not crush" },
  robitussin_chest_us: { id: "robitussin_chest_us", nameKR: "로비투신 체스트", nameVN: "Robitussin Chest", nameUS: "Robitussin Chest Congestion", ingredient: "Guaifenesin", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, cách 4 giờ", dosageUS: "10ml, every 4 hours", precautionKR: "하루 최대 6회", precautionVN: "Tối đa 6 lần/ngày", precautionUS: "Max 6 doses/day" },
  mokan_kr: { id: "mokan_kr", nameKR: "목앤", nameVN: "Mokan", nameUS: "Mokan", ingredient: "Cetylpyridinium", dosageKR: "수시로 사용", dosageVN: "Dùng khi cần", dosageUS: "Use as needed", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects" },
  eugica_vn: { id: "eugica_vn", nameKR: "유지카 캡슐", nameVN: "Eugica", nameUS: "Eugica Capsule", ingredient: "Eucalyptus oil complex", dosageKR: "2캡슐, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 capsules, 3 times/day", precautionKR: "자연 성분", precautionVN: "Thành phần tự nhiên", precautionUS: "Natural ingredients", pronKR: "유지카" },
  halls_us: { id: "halls_us", nameKR: "홀스", nameVN: "Halls", nameUS: "Halls", ingredient: "Menthol", dosageKR: "1정, 수시로", dosageVN: "1 viên, khi cần", dosageUS: "1 drop, as needed", precautionKR: "과다 사용 주의", precautionVN: "Không dùng quá nhiều", precautionUS: "Do not overuse" },
  actifed_kr: { id: "actifed_kr", nameKR: "액티피드", nameVN: "Actifed", nameUS: "Actifed", ingredient: "Triprolidine + Pseudoephedrine", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "졸음 유발 가능", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness" },

  // === Runny/Stuffy nose drugs ===
  contac600_kr: { id: "contac600_kr", nameKR: "컨택600", nameVN: "Contac 600", nameUS: "Contac 600", ingredient: "Pseudoephedrine Extended-Release", dosageKR: "1정, 12시간 간격", dosageVN: "1 viên, cách 12 giờ", dosageUS: "1 tablet, every 12 hours", precautionKR: "불면 유발 가능, 취침 전 복용 주의. 고혈압/심장질환/갑상선항진증 환자 금기", precautionVN: "Có thể mất ngủ", precautionUS: "May cause insomnia, avoid before bedtime", pronEN: "kon-taek" },
  otrivin_kr: { id: "otrivin_kr", nameKR: "오트리빈 스프레이", nameVN: "Otrivin Spray", nameUS: "Otrivin Spray", ingredient: "Xylometazoline", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "Xịt 1-2 lần, 2-3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", precautionKR: "3일 이상 연속 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 consecutive days", pronEN: "o-teu-ri-bin" },
  otrivin_vn: { id: "otrivin_vn", nameKR: "오트리빈 스프레이", nameVN: "Otrivin Spray", nameUS: "Otrivin Spray", ingredient: "Xylometazoline", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "Xịt 1-2 lần, 2-3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days of use", pronKR: "오트리빈" },
  coldib_vn: { id: "coldib_vn", nameKR: "콜디-B", nameVN: "Coldi-B", nameUS: "Coldi-B", ingredient: "Naphazoline", dosageKR: "2~3방울, 하루 3회", dosageVN: "2-3 giọt, 3 lần/ngày", dosageUS: "2-3 drops, 3 times/day", precautionKR: "단기 사용만", precautionVN: "Chỉ dùng ngắn hạn", precautionUS: "Short-term use only" },
  sudafed_us: { id: "sudafed_us", nameKR: "수다페드", nameVN: "Sudafed", nameUS: "Sudafed", ingredient: "Pseudoephedrine 30mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "Behind-the-Counter: 약국 카운터에서 신분증 제시 필요. 고혈압 환자 금기", precautionVN: "Cẩn thận cao huyết áp", precautionUS: "Caution with high blood pressure" },
  afrin_us: { id: "afrin_us", nameKR: "아프린 스프레이", nameVN: "Afrin Spray", nameUS: "Afrin Nasal Spray", ingredient: "Oxymetazoline", dosageKR: "2~3회 분사, 12시간 간격", dosageVN: "Xịt 2-3 lần, cách 12 giờ", dosageUS: "2-3 sprays, every 12 hours", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days of use" },
  zyrtec_kr: { id: "zyrtec_kr", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness", pronEN: "ji-reu-tek" },
  claritin_kr: { id: "claritin_kr", nameKR: "클라리틴", nameVN: "Claritin", nameUS: "Claritin", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음, 비진정 항히스타민", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy antihistamine", pronEN: "keul-la-ri-tin" },
  cetirizine_vn: { id: "cetirizine_vn", nameKR: "지르텍", nameVN: "Zyrtec 10mg", nameUS: "Zyrtec 10mg", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness", pronKR: "세티리진" },
  loratadine_vn: { id: "loratadine_vn", nameKR: "클라리틴", nameVN: "Claritin 10mg", nameUS: "Claritin 10mg", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy", pronKR: "로라타딘" },
  zyrtec_us: { id: "zyrtec_us", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 가능", precautionVN: "Có thể buồn ngủ", precautionUS: "May cause drowsiness" },
  claritin_us: { id: "claritin_us", nameKR: "클라리틴", nameVN: "Claritin", nameUS: "Claritin", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Non-drowsy antihistamine" },
  sinechura_kr: { id: "sinechura_kr", nameKR: "시네츄라", nameVN: "Sinechura", nameUS: "Sinechura", ingredient: "Sinupret herbal complex", dosageKR: "2정, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", precautionKR: "한방 복합제, 부작용 적음", precautionVN: "Thảo dược, ít tác dụng phụ", precautionUS: "Herbal complex, minimal side effects" },
  advil_sinus_us: { id: "advil_sinus_us", nameKR: "애드빌 사이너스", nameVN: "Advil Sinus", nameUS: "Advil Sinus Congestion & Pain", ingredient: "Ibuprofen 200mg + Pseudoephedrine 30mg", dosageKR: "1정, 4~6시간 간격", dosageVN: "1 viên, cách 4-6 giờ", dosageUS: "1 tablet, every 4-6 hours", precautionKR: "고혈압 환자 주의, 식후 복용", precautionVN: "Cẩn thận cao huyết áp, uống sau ăn", precautionUS: "Caution with hypertension, take with food" },

  // === Sore throat drugs ===
  chloraseptic_us: { id: "chloraseptic_us", nameKR: "클로라셉틱 스프레이", nameVN: "Chloraseptic Spray", nameUS: "Chloraseptic Spray", ingredient: "Phenol 1.4%", dosageKR: "5회 분사, 2시간 간격", dosageVN: "Xịt 5 lần, cách 2 giờ", dosageUS: "5 sprays, every 2 hours", precautionKR: "삼키지 말 것", precautionVN: "Không nuốt", precautionUS: "Do not swallow" },

  // === Stomachache drugs ===
  buscopan_kr: { id: "buscopan_kr", nameKR: "부스코판", nameVN: "Buscopan", nameUS: "Buscopan", ingredient: "Hyoscine butylbromide 10mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "입 마름 가능, 녹내장 환자 금지", precautionVN: "Có thể khô miệng", precautionUS: "May cause dry mouth, avoid with glaucoma", pronEN: "bu-seu-ko-pan" },
  doctorbear_kr: { id: "doctorbear_kr", nameKR: "닥터베아", nameVN: "Doctor Bear", nameUS: "Doctor Bear", ingredient: "Trimebutine 100mg", dosageKR: "1정, 하루 3회, 식전", dosageVN: "1 viên, 3 lần/ngày, trước ăn", dosageUS: "1 tablet, 3 times/day, before meals", precautionKR: "식전 복용 권장", precautionVN: "Nên uống trước ăn", precautionUS: "Take before meals", pronEN: "dak-teo-be-ah" },
  buscopan_vn: { id: "buscopan_vn", nameKR: "부스코판", nameVN: "Buscopan", nameUS: "Buscopan", ingredient: "Hyoscine butylbromide 10mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "입 마름 가능", precautionVN: "Có thể khô miệng", precautionUS: "May cause dry mouth", pronKR: "부스코판" },
  nospa_vn: { id: "nospa_vn", nameKR: "노스파", nameVN: "No-Spa", nameUS: "No-Spa", ingredient: "Drotaverine 40mg", dosageKR: "1~2정, 하루 3회", dosageVN: "1-2 viên, 3 lần/ngày", dosageUS: "1-2 tablets, 3 times/day", precautionKR: "저혈압 환자 주의", precautionVN: "Cẩn thận huyết áp thấp", precautionUS: "Caution with low blood pressure", pronKR: "노스파" },
  gasx_us: { id: "gasx_us", nameKR: "가스-X", nameVN: "Gas-X", nameUS: "Gas-X", ingredient: "Simethicone 125mg", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Hầu như không có tác dụng phụ", precautionUS: "Very few side effects" },

  gashualmyeongsu_kr: { id: "gashualmyeongsu_kr", nameKR: "가스활명수", nameVN: "Gas Hwal Myeong Su", nameUS: "Gas Hwal Myeong Su", ingredient: "Korean herbal digestive", dosageKR: "1병, 식후", dosageVN: "1 chai, sau ăn", dosageUS: "1 bottle, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects", pronEN: "ga-seu-hwal-myeong-su" },
  motilium_vn: { id: "motilium_vn", nameKR: "모틸리움", nameVN: "Motilium", nameUS: "Motilium", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn, 3 lần/ngày", dosageUS: "1 tablet, before meals, 3 times/day", precautionKR: "심장 질환자 주의. QT 연장 심장 위험, 7일 이상 연속 복용 금지", precautionVN: "Cẩn thận bệnh tim", precautionUS: "Caution with heart conditions", pronKR: "모틸리움" },
  dramamine_us: { id: "dramamine_us", nameKR: "드라마민", nameVN: "Dramamine", nameUS: "Dramamine", ingredient: "Dimenhydrinate 50mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "강한 졸음 유발", precautionVN: "Gây buồn ngủ mạnh", precautionUS: "Causes strong drowsiness" },
  gelpos_kr: { id: "gelpos_kr", nameKR: "겔포스", nameVN: "Gelpos", nameUS: "Gelpos", ingredient: "Aluminium phosphate", dosageKR: "1포, 식간 또는 증상 시", dosageVN: "1 gói, giữa bữa ăn hoặc khi có triệu chứng", dosageUS: "1 sachet, between meals or when symptoms occur", precautionKR: "변비 가능, 장기 복용 주의", precautionVN: "Có thể gây táo bón", precautionUS: "May cause constipation", pronEN: "gel-po-seu" },
  almagel_kr: { id: "almagel_kr", nameKR: "알마겔", nameVN: "Almagel", nameUS: "Almagel", ingredient: "Aluminium hydroxide + Magnesium hydroxide", dosageKR: "10ml, 식간", dosageVN: "10ml, giữa bữa ăn", dosageUS: "10ml, between meals", precautionKR: "장기 복용 금지", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term" },
  phosphalugel_vn: { id: "phosphalugel_vn", nameKR: "포스팔루겔", nameVN: "Phosphalugel", nameUS: "Phosphalugel", ingredient: "Aluminium phosphate", dosageKR: "1~2포, 식간", dosageVN: "1-2 gói, giữa bữa ăn", dosageUS: "1-2 sachets, between meals", precautionKR: "변비 가능", precautionVN: "Có thể gây táo bón", precautionUS: "May cause constipation", pronKR: "포스팔루겔" },
  yumangel_vn: { id: "yumangel_vn", nameKR: "유망겔", nameVN: "Yumangel", nameUS: "Yumangel", ingredient: "Sucralfate complex", dosageKR: "1포, 식간", dosageVN: "1 gói, giữa bữa ăn", dosageUS: "1 sachet, between meals", precautionKR: "다른 약과 2시간 간격", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other meds", pronKR: "유망겔" },
  tums_us: { id: "tums_us", nameKR: "텀스", nameVN: "Tums", nameUS: "Tums", ingredient: "Calcium carbonate 750mg", dosageKR: "2~4정, 증상 시", dosageVN: "2-4 viên, khi có triệu chứng", dosageUS: "2-4 tablets, as symptoms occur", precautionKR: "하루 최대 15정", precautionVN: "Tối đa 15 viên/ngày", precautionUS: "Max 15 tablets/day" },
  pepcid_us: { id: "pepcid_us", nameKR: "펩시드", nameVN: "Pepcid", nameUS: "Pepcid AC", ingredient: "Famotidine 20mg", dosageKR: "1정, 하루 1~2회", dosageVN: "1 viên, 1-2 lần/ngày", dosageUS: "1 tablet, 1-2 times/day", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease" },
  activated_charcoal_vn: { id: "activated_charcoal_vn", nameKR: "노스카본", nameVN: "Nocarbon", nameUS: "CharcoCaps", ingredient: "Activated Charcoal", dosageKR: "2~4정, 식후", dosageVN: "2-4 viên, sau ăn", dosageUS: "2-4 capsules, after meals", precautionKR: "다른 약과 2시간 간격 두기", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "Take 2 hours apart from other meds", pronKR: "활성탄" },
  airx_vn: { id: "airx_vn", nameKR: "에어-X", nameVN: "Air-X", nameUS: "Air-X", ingredient: "Simethicone + Activated charcoal", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects", pronKR: "에어엑스" },
  beano_us: { id: "beano_us", nameKR: "비노", nameVN: "Beano", nameUS: "Beano", ingredient: "Alpha-galactosidase enzyme", dosageKR: "2~3정, 식전", dosageVN: "2-3 viên, trước ăn", dosageUS: "2-3 tablets, before meals", precautionKR: "콩/채소 먹기 전 복용", precautionVN: "Uống trước khi ăn đậu/rau", precautionUS: "Take before eating beans/vegetables" },

  // === Diarrhea drugs ===
  smecta_vn: { id: "smecta_vn", nameKR: "스멕타", nameVN: "Smecta", nameUS: "Smecta", ingredient: "Diosmectite 3g", dosageKR: "1포, 하루 3회", dosageVN: "1 gói, 3 lần/ngày", dosageUS: "1 sachet, 3 times/day", precautionKR: "물에 녹여 복용", precautionVN: "Hòa tan trong nước", precautionUS: "Dissolve in water", pronKR: "스멙타" },
  ors_kr: { id: "ors_kr", nameKR: "ORS 경구수액", nameVN: "ORS", nameUS: "ORS", ingredient: "Electrolyte complex (Na, K, Glucose)", dosageKR: "1포를 물 200ml에 타서 수시로", dosageVN: "1 gói pha 200ml nước, uống thường xuyên", dosageUS: "1 sachet in 200ml water, drink frequently", precautionKR: "설사 멈출 때까지 계속", precautionVN: "Tiếp tục đến khi hết tiêu chảy", precautionUS: "Continue until diarrhea stops" },
  pocari_kr: { id: "pocari_kr", nameKR: "포카리스웨트", nameVN: "Pocari Sweat", nameUS: "Pocari Sweat", ingredient: "Electrolyte drink", dosageKR: "수시로 섭취", dosageVN: "Uống thường xuyên", dosageUS: "Drink frequently", precautionKR: "당분 함량 있음", precautionVN: "Có chứa đường", precautionUS: "Contains sugar" },
  oresol_vn: { id: "oresol_vn", nameKR: "오레솔", nameVN: "Oresol", nameUS: "Oresol", ingredient: "Electrolyte complex (ORS)", dosageKR: "1포를 물 1L에 타서 수시로", dosageVN: "1 gói pha 1L nước, uống thường xuyên", dosageUS: "1 sachet in 1L water, drink frequently", precautionKR: "정확한 비율로 타기", precautionVN: "Pha đúng tỉ lệ", precautionUS: "Mix in correct proportions", pronKR: "오레솔" },
  hydrite_vn: { id: "hydrite_vn", nameKR: "하이드라이트", nameVN: "Hydrite", nameUS: "Hydrite", ingredient: "Electrolyte complex", dosageKR: "1포, 물에 타서", dosageVN: "1 gói, hòa nước", dosageUS: "1 sachet, dissolve in water", precautionKR: "맛이 있어 아이도 복용 가능", precautionVN: "Có vị nên trẻ em cũng uống được", precautionUS: "Flavored, suitable for children", pronKR: "하이드라이트" },
  pedialyte_us: { id: "pedialyte_us", nameKR: "페디아라이트", nameVN: "Pedialyte", nameUS: "Pedialyte", ingredient: "Electrolyte solution", dosageKR: "수시로 소량씩", dosageVN: "Uống từng ít một, thường xuyên", dosageUS: "Sip frequently, small amounts", precautionKR: "어린이/성인 모두 가능", precautionVN: "Dùng cho cả trẻ em và người lớn", precautionUS: "For children and adults" },
  dripdrop_us: { id: "dripdrop_us", nameKR: "드립드롭", nameVN: "DripDrop", nameUS: "DripDrop ORS", ingredient: "Medical-grade ORS complex", dosageKR: "1포, 물에 타서", dosageVN: "1 gói, hòa nước", dosageUS: "1 packet, mix in water", precautionKR: "의료 등급 ORS", precautionVN: "ORS cấp y tế", precautionUS: "Medical-grade oral rehydration" },

  // === Indigestion drugs ===
  beaze_kr: { id: "beaze_kr", nameKR: "베아제", nameVN: "Beaze", nameUS: "Beaze", ingredient: "Digestive enzyme complex", dosageKR: "1~2정, 식후", dosageVN: "1-2 viên, sau ăn", dosageUS: "1-2 tablets, after meals", precautionKR: "부작용 거의 없음", precautionVN: "Ít tác dụng phụ", precautionUS: "Minimal side effects", pronEN: "be-a-je" },
  domperidone_vn: { id: "domperidone_vn", nameKR: "맥소롱정", nameVN: "Motilium-M 10mg", nameUS: "Motilium", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn, 3 lần/ngày", dosageUS: "1 tablet, before meals, 3 times/day", precautionKR: "심장 질환자 주의", precautionVN: "Cẩn thận bệnh tim", precautionUS: "Caution with heart conditions", pronKR: "도페리돈" },
  famotidine_kr: { id: "famotidine_kr", nameKR: "가스터 20mg", nameVN: "Pepcid 20mg", nameUS: "Pepcid AC 20mg", ingredient: "Famotidine 20mg", dosageKR: "1정, 하루 1~2회", dosageVN: "1 viên, 1-2 lần/ngày", dosageUS: "1 tablet, 1-2 times/day", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease" },
  phazyme_us: { id: "phazyme_us", nameKR: "파자임", nameVN: "Phazyme", nameUS: "Phazyme", ingredient: "Simethicone 250mg", dosageKR: "1정, 식후", dosageVN: "1 viên, sau ăn", dosageUS: "1 softgel, after meals", precautionKR: "부작용 적음, 고용량", precautionVN: "Ít tác dụng phụ, liều cao", precautionUS: "Few side effects, high dose" },

  // === Nausea/Vomiting drugs ===
  kimite_kr: { id: "kimite_kr", nameKR: "키미테", nameVN: "Kimite", nameUS: "Kimite", ingredient: "Dimenhydrinate", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발, 운전 금지", precautionVN: "Gây buồn ngủ, không lái xe", precautionUS: "Causes drowsiness, do not drive" },
  bonaring_kr: { id: "bonaring_kr", nameKR: "보나링", nameVN: "Bonaring", nameUS: "Bonaring", ingredient: "Meclizine", dosageKR: "1정, 출발 1시간 전", dosageVN: "1 viên, 1 giờ trước khi đi", dosageUS: "1 tablet, 1 hour before travel", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Less drowsiness than alternatives" },
  nautamine_vn: { id: "nautamine_vn", nameKR: "노타민", nameVN: "Nautamine", nameUS: "Nautamine", ingredient: "Dimenhydrinate", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", pronKR: "노타민" },
  dimenhydrinate_vn: { id: "dimenhydrinate_vn", nameKR: "키미테", nameVN: "Dramamine 50mg", nameUS: "Dramamine Original", ingredient: "Dimenhydrinate 50mg", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before travel", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness" },
  bonine_us: { id: "bonine_us", nameKR: "보닌", nameVN: "Bonine", nameUS: "Bonine", ingredient: "Meclizine 25mg", dosageKR: "1정, 출발 1시간 전", dosageVN: "1 viên, 1 giờ trước khi đi", dosageUS: "1 tablet, 1 hour before travel", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Less drowsy formula" },
  emetrol_us: { id: "emetrol_us", nameKR: "에메트롤", nameVN: "Emetrol", nameUS: "Emetrol", ingredient: "Phosphoric acid + sugar solution", dosageKR: "15~30ml, 15분 간격", dosageVN: "15-30ml, cách 15 phút", dosageUS: "15-30ml, every 15 minutes", precautionKR: "당뇨 환자 주의", precautionVN: "Cẩn thận bệnh tiểu đường", precautionUS: "Caution with diabetes" },

  // === Muscle pain drugs ===
  ibuprofen_200_kr: { id: "ibuprofen_200_kr", nameKR: "부루펜 200mg", nameVN: "Advil 200mg", nameUS: "Advil 200mg", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn, 3 lần/ngày", dosageUS: "1 tablet, with food, 3 times/day", precautionKR: "위장 장애 주의, 식후 필수", precautionVN: "Cẩn thận dạ dày, uống sau ăn", precautionUS: "Take with food, stomach caution" },
  ketotop_kr: { id: "ketotop_kr", nameKR: "케토톱 파스", nameVN: "Ketotop Patch", nameUS: "Ketotop Patch", ingredient: "Ketoprofen patch", dosageKR: "1매, 하루 1~2회 부착", dosageVN: "1 miếng, dán 1-2 lần/ngày", dosageUS: "1 patch, apply 1-2 times/day", precautionKR: "햇빛 노출 금지, 피부 자극 주의. 부착 부위 햇빛 노출 절대 금지 (광과민성)", precautionVN: "Tránh ánh nắng, cẩn thận kích ứng da", precautionUS: "Avoid sunlight exposure, watch for skin irritation", pronEN: "ke-to-top" },
  airpas_kr: { id: "airpas_kr", nameKR: "에어파스", nameVN: "Air Pas", nameUS: "Air Pas", ingredient: "Methyl salicylate spray", dosageKR: "아픈 부위에 분사, 하루 3~4회", dosageVN: "Xịt vào vùng đau, 3-4 lần/ngày", dosageUS: "Spray on affected area, 3-4 times/day", precautionKR: "피부 자극 가능, 상처에 사용 금지", precautionVN: "Có thể kích ứng da, không dùng trên vết thương", precautionUS: "May irritate skin, do not use on wounds", pronEN: "e-eo-pa-seu" },
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
  benadryl_us: { id: "benadryl_us", nameKR: "베나드릴", nameVN: "Benadryl", nameUS: "Benadryl", ingredient: "Diphenhydramine 25mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1-2 viên, cách 4-6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", precautionKR: "강한 졸음 유발, 운전 금지. 65세 이상 낙상/인지기능 저하 위험 (Beers Criteria)", precautionVN: "Gây buồn ngủ mạnh, không lái xe", precautionUS: "Causes strong drowsiness, do not drive" },
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
  eve_kr: { id: "eve_kr", nameKR: "이브", nameVN: "Eve", nameUS: "Eve", ingredient: "Ibuprofen 200mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn, 3 lần/ngày", dosageUS: "1 tablet, with food, 3 times/day", precautionKR: "식후 복용, 생리 시작 시 바로 복용이 효과적", precautionVN: "Uống sau ăn, uống ngay khi bắt đầu kinh nguyệt", precautionUS: "Take with food, most effective at period onset", pronEN: "i-beu" },
  midol_us: { id: "midol_us", nameKR: "미돌", nameVN: "Midol", nameUS: "Midol Complete", ingredient: "Acetaminophen 500mg + Caffeine 60mg + Pyrilamine Maleate 15mg", dosageKR: "2정, 6시간 간격", dosageVN: "2 viên, cách 6 giờ", dosageUS: "2 caplets, every 6 hours", precautionKR: "다른 아세트아미노펜 병용 금지. 하루 최대 6캡슐, 카페인 과다 주의", precautionVN: "Không dùng với paracetamol khác", precautionUS: "Do not combine with other acetaminophen" },
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
  systane_vn: { id: "systane_vn", nameKR: "시스테인", nameVN: "Systane", nameUS: "Systane", ingredient: "Polyethylene glycol 400", dosageKR: "1~2방울, 수시로", dosageVN: "1-2 giọt, khi cần", dosageUS: "1-2 drops, as needed", precautionKR: "렌즈 위에 사용 가능", precautionVN: "Dùng được trên kính áp tròng", precautionUS: "Safe with contact lenses", pronKR: "시스테인" },
  visine_dry_us: { id: "visine_dry_us", nameKR: "바이신 드라이아이", nameVN: "Visine Dry Eye", nameUS: "Visine Dry Eye Relief", ingredient: "Polyethylene glycol 400", dosageKR: "1~2방울, 수시로", dosageVN: "1-2 giọt, khi cần", dosageUS: "1-2 drops, as needed", precautionKR: "건조감 완화용", precautionVN: "Giảm khô mắt", precautionUS: "For dry eye relief" },
  vizuclear_kr: { id: "vizuclear_kr", nameKR: "비주클리어", nameVN: "Vizuclear", nameUS: "Vizuclear", ingredient: "Naphazoline + Chlorpheniramine eye drops", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "3일 이상 연속 사용 금지, 충혈 완화용", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 consecutive days" },
  vrohto_vn: { id: "vrohto_vn", nameKR: "V.로토", nameVN: "V.Rohto", nameUS: "V.Rohto", ingredient: "Naphazoline + Zinc sulfate", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "단기 사용만", precautionVN: "Chỉ dùng ngắn hạn", precautionUS: "Short-term use only", pronKR: "브이로토" },
  visine_us: { id: "visine_us", nameKR: "바이신 오리지널", nameVN: "Visine Original", nameUS: "Visine Original", ingredient: "Tetrahydrozoline 0.05%", dosageKR: "1~2방울, 하루 4회", dosageVN: "1-2 giọt, 4 lần/ngày", dosageUS: "1-2 drops, up to 4 times/day", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not exceed 3 days" },
  cleareyes_us: { id: "cleareyes_us", nameKR: "클리어아이즈", nameVN: "Clear Eyes", nameUS: "Clear Eyes", ingredient: "Naphazoline 0.012%", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1-2 giọt, 3-4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", precautionKR: "충혈 완화, 3일 초과 금지", precautionVN: "Giảm đỏ mắt, không quá 3 ngày", precautionUS: "Redness relief, do not exceed 3 days" },
  cromolin_vn: { id: "cromolin_vn", nameKR: "크로모글리케이트 안약", nameVN: "Opticrom", nameUS: "Opticrom", ingredient: "Sodium Cromoglicate 2%", dosageKR: "1~2방울, 하루 4회", dosageVN: "1-2 giọt, 4 lần/ngày", dosageUS: "1-2 drops, 4 times/day", precautionKR: "알레르기 예방용", precautionVN: "Phòng ngừa dị ứng", precautionUS: "For allergy prevention" },

  // === Heartburn/Acid reflux drugs ===
  gaviscon_kr: { id: "gaviscon_kr", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Sodium alginate + Sodium bicarbonate", dosageKR: "10~20ml, 식후 + 취침 전", dosageVN: "10-20ml, sau ăn + trước khi ngủ", dosageUS: "10-20ml, after meals + before bed", precautionKR: "나트륨 함량 주의, 고혈압 환자 주의", precautionVN: "Cẩn thận lượng natri", precautionUS: "Watch sodium content, caution with hypertension" },
  lansoprazole_kr: { id: "lansoprazole_kr", nameKR: "란스톤 15mg", nameVN: "Lanzostad 15mg", nameUS: "Prevacid 24HR", ingredient: "Lansoprazole 15mg", dosageKR: "1캡슐, 아침 식전", dosageVN: "1 viên, trước bữa sáng", dosageUS: "1 capsule, before breakfast", precautionKR: "14일 이상 연속 복용 금지", precautionVN: "Không dùng liên tục quá 14 ngày", precautionUS: "Do not use continuously for more than 14 days" },
  omeprazole_vn: { id: "omeprazole_vn", nameKR: "오메가드 20mg", nameVN: "Losec MUPS 20mg", nameUS: "Prilosec OTC 20mg", ingredient: "Omeprazole 20mg", dosageKR: "1캡슐, 아침 식전", dosageVN: "1 viên, trước bữa sáng", dosageUS: "1 capsule, before breakfast", precautionKR: "14일 코스, 장기 복용 시 의사 상담", precautionVN: "Liệu trình 14 ngày, tham khảo bác sĩ nếu dùng lâu", precautionUS: "14-day course, consult doctor for long-term use" },
  gaviscon_vn: { id: "gaviscon_vn", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Sodium alginate", dosageKR: "10~20ml, 식후", dosageVN: "10-20ml, sau ăn", dosageUS: "10-20ml, after meals", precautionKR: "나트륨 주의", precautionVN: "Cẩn thận natri", precautionUS: "Watch sodium content", pronKR: "개비스콘" },
  gaviscon_us: { id: "gaviscon_us", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", ingredient: "Aluminium hydroxide + Magnesium carbonate", dosageKR: "10~20ml, 식후", dosageVN: "10-20ml, sau ăn", dosageUS: "10-20ml, after meals", precautionKR: "나트륨 주의", precautionVN: "Cẩn thận natri", precautionUS: "Watch sodium content" },
  prilosec_us: { id: "prilosec_us", nameKR: "프릴로섹 OTC", nameVN: "Prilosec OTC", nameUS: "Prilosec OTC", ingredient: "Omeprazole 20mg", dosageKR: "1정, 아침 식전, 14일 코스", dosageVN: "1 viên, trước bữa sáng, 14 ngày", dosageUS: "1 tablet, before breakfast, 14-day course", precautionKR: "4개월에 1코스 이하 권장", precautionVN: "Khuyến nghị 1 liệu trình mỗi 4 tháng", precautionUS: "Recommended max 1 course per 4 months" },
  mylanta_us: { id: "mylanta_us", nameKR: "마이란타", nameVN: "Mylanta", nameUS: "Mylanta", ingredient: "Aluminium hydroxide + Magnesium hydroxide + Simethicone", dosageKR: "10~20ml, 식간", dosageVN: "10-20ml, giữa bữa ăn", dosageUS: "10-20ml, between meals", precautionKR: "가스 + 위산 동시 완화", precautionVN: "Giảm cả khí và axit", precautionUS: "Relieves both gas and acid" },

  // === Constipation drugs ===
  magmil_kr: { id: "magmil_kr", nameKR: "마그밀", nameVN: "Magmil", nameUS: "Magmil", ingredient: "Magnesium hydroxide", dosageKR: "1~2정, 취침 전, 충분한 물과 함께", dosageVN: "1-2 viên, trước khi ngủ, uống nhiều nước", dosageUS: "1-2 tablets, at bedtime, with plenty of water", precautionKR: "신장 질환자 주의", precautionVN: "Cẩn thận bệnh thận", precautionUS: "Caution with kidney disease", pronEN: "mag-mil" },
  dulcolax_kr: { id: "dulcolax_kr", nameKR: "둘코락스", nameVN: "Dulcolax", nameUS: "Dulcolax", ingredient: "Bisacodyl 5mg", dosageKR: "1~2정, 취침 전", dosageVN: "1-2 viên, trước khi ngủ", dosageUS: "1-2 tablets, at bedtime", precautionKR: "장기 복용 금지, 습관성 주의", precautionVN: "Không dùng lâu dài, cẩn thận phụ thuộc", precautionUS: "Do not use long-term, may become habit-forming", pronEN: "dul-ko-lak-seu" },
  duphalac_vn: { id: "duphalac_vn", nameKR: "듀파락", nameVN: "Duphalac", nameUS: "Duphalac", ingredient: "Lactulose syrup", dosageKR: "15~30ml, 하루 1회", dosageVN: "15-30ml, 1 lần/ngày", dosageUS: "15-30ml, once daily", precautionKR: "부작용 적고 안전, 임산부 사용 가능", precautionVN: "Ít tác dụng phụ, an toàn cho bà bầu", precautionUS: "Few side effects, safe for pregnancy", pronKR: "듀팔락" },
  forlax_vn: { id: "forlax_vn", nameKR: "포라락스", nameVN: "Forlax", nameUS: "Forlax", ingredient: "Macrogol 4000 (PEG)", dosageKR: "1~2포, 물에 녹여", dosageVN: "1-2 gói, hòa nước", dosageUS: "1-2 sachets, dissolve in water", precautionKR: "부작용 적음", precautionVN: "Ít tác dụng phụ", precautionUS: "Few side effects", pronKR: "포르락스" },
  miralax_us: { id: "miralax_us", nameKR: "미라랙스", nameVN: "MiraLAX", nameUS: "MiraLAX", ingredient: "Polyethylene glycol 3350", dosageKR: "1캡(17g), 하루 1회, 물에 녹여", dosageVN: "1 nắp (17g), 1 lần/ngày, hòa nước", dosageUS: "1 cap (17g), once daily, mix in water", precautionKR: "습관성 적음, 1~3일 소요", precautionVN: "Ít gây phụ thuộc, cần 1-3 ngày", precautionUS: "Non-habit forming, takes 1-3 days" },
  metamucil_us: { id: "metamucil_us", nameKR: "메타무실", nameVN: "Metamucil", nameUS: "Metamucil", ingredient: "Psyllium husk fiber", dosageKR: "1스푼, 하루 1~3회, 물에 타서", dosageVN: "1 thìa, 1-3 lần/ngày, pha nước", dosageUS: "1 scoop, 1-3 times/day, mix in water", precautionKR: "충분한 물 필수, 식이섬유 보충", precautionVN: "Phải uống đủ nước", precautionUS: "Must drink plenty of water, fiber supplement" },
  bicogreen_kr: { id: "bicogreen_kr", nameKR: "비코그린 좌약", nameVN: "Bicogreen suppository", nameUS: "Bicogreen suppository", ingredient: "Bisacodyl suppository 10mg", dosageKR: "1개, 항문 삽입, 15~60분 효과", dosageVN: "1 viên, đặt hậu môn, tác dụng 15-60 phút", dosageUS: "1 suppository, rectal insert, works in 15-60 min", precautionKR: "빠른 효과, 습관성 주의", precautionVN: "Tác dụng nhanh, cẩn thận phụ thuộc", precautionUS: "Fast acting, do not use regularly" },

  // === Insomnia drugs ===
  sleepaid_kr: { id: "sleepaid_kr", nameKR: "수면유도제 (약국용)", nameVN: "Sleep Aid (OTC)", nameUS: "Sleep Aid (OTC)", ingredient: "Doxylamine succinate 25mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "7일 이상 사용 금지, 다음날 졸음 가능", precautionVN: "Không dùng quá 7 ngày, có thể buồn ngủ ngày hôm sau", precautionUS: "Do not use more than 7 days, next-day drowsiness" },
  aronamin_kr: { id: "aronamin_kr", nameKR: "아로나민 골드", nameVN: "Aronamin Gold", nameUS: "Aronamin Gold", ingredient: "Vitamin B complex (B1, B2, B6, B12)", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", precautionKR: "직접 수면제 아님, 피로 회복 보조", precautionVN: "Không phải thuốc ngủ, hỗ trợ phục hồi mệt mỏi", precautionUS: "Not a sleeping pill, fatigue recovery support" },
  rotunda_vn: { id: "rotunda_vn", nameKR: "로툰다", nameVN: "Rotunda", nameUS: "Rotunda", ingredient: "Rotundin 30mg", dosageKR: "1~2정, 취침 전", dosageVN: "1-2 viên, trước khi ngủ", dosageUS: "1-2 tablets, before bedtime", precautionKR: "운전 금지, 졸음 유발", precautionVN: "Không lái xe, gây buồn ngủ", precautionUS: "Do not drive, causes drowsiness", pronKR: "로툴다" },
  melatonin_vn: { id: "melatonin_vn", nameKR: "멜라토닌 3mg", nameVN: "Melatonin 3mg", nameUS: "Melatonin 3mg", ingredient: "Melatonin 3mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "단기 사용 권장, 자연 수면 호르몬", precautionVN: "Dùng ngắn hạn, hormone giấc ngủ tự nhiên", precautionUS: "Short-term use recommended, natural sleep hormone", pronKR: "멜라토닌" },
  zzzquil_us: { id: "zzzquil_us", nameKR: "쥬퀼", nameVN: "ZzzQuil", nameUS: "ZzzQuil", ingredient: "Diphenhydramine 50mg", dosageKR: "1캡슐, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 capsule, at bedtime", precautionKR: "다음날 졸음, 습관성 주의. 7일 이상 연속 금지, 65세 이상 낙상/인지기능 저하 위험", precautionVN: "Buồn ngủ ngày hôm sau, cẩn thận phụ thuộc", precautionUS: "Next-day drowsiness, do not use long-term" },
  unisom_us: { id: "unisom_us", nameKR: "유니솜", nameVN: "Unisom", nameUS: "Unisom SleepTabs", ingredient: "Doxylamine succinate 25mg", dosageKR: "1정, 취침 30분 전", dosageVN: "1 viên, 30 phút trước khi ngủ", dosageUS: "1 tablet, 30 min before bedtime", precautionKR: "7일 이상 사용 금지. 7일 이상 연속 금지, 65세 이상 낙상/인지기능 저하 위험", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days" },
  rediants_kr: { id: "rediants_kr", nameKR: "레디안스", nameVN: "Rediants", nameUS: "Rediants", ingredient: "Valerian extract (herbal)", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 tablets, before bedtime", precautionKR: "자연 성분, 부작용 적음", precautionVN: "Thành phần tự nhiên, ít tác dụng phụ", precautionUS: "Natural ingredient, minimal side effects" },
  pancol_night_kr: { id: "pancol_night_kr", nameKR: "판콜에이 나이트", nameVN: "Pancol-A Night", nameUS: "Pancol-A Night", ingredient: "Acetaminophen + Chlorpheniramine + Pseudoephedrine", dosageKR: "1정, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 tablet, at bedtime", precautionKR: "야간 감기약, 졸음 성분 포함", precautionVN: "Thuốc cảm ban đêm, có chất gây ngủ", precautionUS: "Nighttime cold medicine, contains drowsy ingredient" },
  ameflu_night_vn: { id: "ameflu_night_vn", nameKR: "뉴 아메플루 나이트", nameVN: "New Ameflu Night Time", nameUS: "New Ameflu Night Time", ingredient: "Acetaminophen + Dextromethorphan + Chlorpheniramine", dosageKR: "1정, 취침 전", dosageVN: "1 viên, trước khi ngủ", dosageUS: "1 tablet, at bedtime", precautionKR: "야간용, 졸음 유발", precautionVN: "Dùng ban đêm, gây buồn ngủ", precautionUS: "Nighttime formula, causes drowsiness" },
  tylenol_pm_us: { id: "tylenol_pm_us", nameKR: "타이레놀 PM", nameVN: "Tylenol PM", nameUS: "Tylenol PM", ingredient: "Acetaminophen 500mg + Diphenhydramine 25mg", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 tablets, at bedtime", precautionKR: "다른 아세트아미노펜 병용 금지", precautionVN: "Không dùng với paracetamol khác", precautionUS: "Do not combine with other acetaminophen products" },

  // === Joint pain drugs ===
  glucosamine_kr: { id: "glucosamine_kr", nameKR: "관절팔팔", nameVN: "Viartril-S", nameUS: "Osteo Bi-Flex", ingredient: "Glucosamine sulfate 1500mg", dosageKR: "1포/1정, 하루 1회", dosageVN: "1 gói/viên, 1 lần/ngày", dosageUS: "1 sachet/tablet, once daily", precautionKR: "효과 나타나기까지 4~8주, 새우/게 알레르기 주의", precautionVN: "Cần 4-8 tuần để có hiệu quả, cẩn thận dị ứng tôm cua", precautionUS: "Takes 4-8 weeks for effect, shellfish allergy caution" },
  voltaren_vn: { id: "voltaren_vn", nameKR: "볼타렌 젤", nameVN: "Voltaren gel", nameUS: "Voltaren Arthritis Pain Gel", ingredient: "Diclofenac sodium 1% gel", dosageKR: "2~4g, 하루 3~4회 도포", dosageVN: "2-4g, thoa 3-4 lần/ngày", dosageUS: "2-4g, apply 3-4 times/day", precautionKR: "한 관절에 하루 최대 8g, 12세 이상", precautionVN: "Tối đa 8g/ngày mỗi khớp, từ 12 tuổi", precautionUS: "Max 8g/day per joint, age 12+", pronKR: "볼타렌" },
  voltaren_us: { id: "voltaren_us", nameKR: "볼타렌 젤", nameVN: "Voltaren gel", nameUS: "Voltaren Arthritis Pain Gel", ingredient: "Diclofenac sodium 1% gel", dosageKR: "4g, 하루 4회 도포", dosageVN: "4g, thoa 4 lần/ngày", dosageUS: "4g, apply 4 times/day", precautionKR: "한 관절에 하루 최대 16g", precautionVN: "Tối đa 16g/ngày mỗi khớp", precautionUS: "Max 16g/day per joint" },
  aspercreme_us: { id: "aspercreme_us", nameKR: "아스퍼크림", nameVN: "Aspercreme", nameUS: "Aspercreme", ingredient: "Lidocaine 4% cream", dosageKR: "아픈 부위에 도포, 하루 3~4회", dosageVN: "Thoa vào vùng đau, 3-4 lần/ngày", dosageUS: "Apply to affected area, 3-4 times/day", precautionKR: "국소 마취 효과", precautionVN: "Tác dụng gây tê cục bộ", precautionUS: "Topical numbing effect" },
  movefree_us: { id: "movefree_us", nameKR: "무브프리", nameVN: "Move Free", nameUS: "Move Free Advanced", ingredient: "Glucosamine + Chondroitin + MSM", dosageKR: "2정, 하루 1회", dosageVN: "2 viên, 1 lần/ngày", dosageUS: "2 tablets, once daily", precautionKR: "효과 4~8주, 관절 건강 보조", precautionVN: "Cần 4-8 tuần, hỗ trợ sức khỏe khớp", precautionUS: "Takes 4-8 weeks, joint health supplement" },
  aleve_vn: { id: "aleve_vn", nameKR: "탁센", nameVN: "Anaprox 220mg", nameUS: "Aleve", ingredient: "Naproxen Sodium 220mg", dosageKR: "1정, 8~12시간 간격", dosageVN: "1 viên, cách 8-12 giờ", dosageUS: "1 tablet, every 8-12 hours", precautionKR: "위장 주의", precautionVN: "Cẩn thận dạ dày", precautionUS: "Stomach caution" },

  // === Dizziness drugs (21) ===
  meniere_kr: { id: "meniere_kr", nameKR: "메니에르정", nameVN: "Betaserc", nameUS: "Betahistine", ingredient: "Betahistine 8mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals" },
  betaserc_vn: { id: "betaserc_vn", nameKR: "메니에르정", nameVN: "Betaserc 16mg", nameUS: "Betahistine", ingredient: "Betahistine 16mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2-3 lần/ngày", dosageUS: "1 tablet, 2-3 times/day", precautionKR: "위궤양 환자 주의", precautionVN: "Cẩn thận loét dạ dày", precautionUS: "Caution with peptic ulcer", pronKR: "베타서크" },
  stugeron_vn: { id: "stugeron_vn", nameKR: "스튜제론", nameVN: "Stugeron", nameUS: "Stugeron", ingredient: "Cinnarizine 25mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", precautionKR: "졸음 유발", precautionVN: "Gây buồn ngủ", precautionUS: "May cause drowsiness", pronKR: "스투게론" },

  // === Tinnitus drugs (22) ===
  ginkgo_kr: { id: "ginkgo_kr", nameKR: "진코밀정", nameVN: "Tanakan", nameUS: "Ginkgo Biloba", ingredient: "Ginkgo biloba extract", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 1-2 times/day", precautionKR: "혈액 희석제 복용 시 주의", precautionVN: "Cẩn thận khi dùng thuốc chống đông", precautionUS: "Caution with blood thinners" },
  tanakan_vn: { id: "tanakan_vn", nameKR: "진코밀정", nameVN: "Tanakan", nameUS: "Ginkgo Biloba", ingredient: "Ginkgo biloba extract", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 capsule, 1-2 times/day", precautionKR: "식후 복용", precautionVN: "Uống sau ăn", precautionUS: "Take after meals", pronKR: "타나칸" },
  lipoflavonoid_us: { id: "lipoflavonoid_us", nameKR: "리포플라보노이드", nameVN: "Lipo-Flavonoid", nameUS: "Lipo-Flavonoid Plus", ingredient: "Vitamin B + Bioflavonoid complex", dosageKR: "2캡슐, 하루 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 caplets, 3 times/day", precautionKR: "이명 전용 보충제", precautionVN: "Thực phẩm chức năng cho ù tai", precautionUS: "Tinnitus supplement, not a drug" },

  // === Nosebleed drugs (23) ===
  vaseline_kr: { id: "vaseline_kr", nameKR: "바셀린", nameVN: "Vaseline", nameUS: "Vaseline", ingredient: "Petroleum jelly", dosageKR: "코 안쪽에 소량 도포", dosageVN: "Thoa một ít vào bên trong mũi", dosageUS: "Apply small amount inside nostrils", precautionKR: "건조 방지", precautionVN: "Ngăn khô mũi", precautionUS: "Prevents dryness" },
  saline_spray_kr: { id: "saline_spray_kr", nameKR: "식염수 스프레이", nameVN: "NaCl 0.9% spray", nameUS: "Ayr Saline Spray", ingredient: "Normal saline 0.9%", dosageKR: "코에 1~2회 분사, 수시로", dosageVN: "Xịt 1-2 lần vào mũi, thường xuyên", dosageUS: "Spray 2-3 times in nostrils as needed", precautionKR: "부작용 없음", precautionVN: "Không tác dụng phụ", precautionUS: "No side effects" },

  // === Mouth ulcer drugs (24) ===
  oramedi_kr: { id: "oramedi_kr", nameKR: "오라메디 연고", nameVN: "Kamistad gel", nameUS: "Orajel Mouth Sore gel", ingredient: "Triamcinolone acetonide", dosageKR: "환부에 소량 도포, 하루 2~3회", dosageVN: "Thoa lên vết loét, 3 lần/ngày", dosageUS: "Apply to sore, up to 4 times/day", precautionKR: "스테로이드 성분", precautionVN: "Thành phần gây tê cục bộ", precautionUS: "Contains benzocaine" },
  albocil_kr: { id: "albocil_kr", nameKR: "알보칠", nameVN: "Zytee gel", nameUS: "Kanka Mouth Pain Liquid", ingredient: "Policresulen / Choline salicylate", dosageKR: "면봉에 묻혀 환부에 도포", dosageVN: "Thoa lên vết loét", dosageUS: "Apply to sore", precautionKR: "따가움", precautionVN: "Có thể gây rát", precautionUS: "Forms protective coating" },
  kamistad_vn: { id: "kamistad_vn", nameKR: "카미스타드 젤", nameVN: "Kamistad gel", nameUS: "Orajel", ingredient: "Lidocaine + Chamomile", dosageKR: "환부에 도포, 하루 3회", dosageVN: "Thoa lên vết loét, 3 lần/ngày", dosageUS: "Apply to sore, 3 times/day", precautionKR: "국소마취 성분", precautionVN: "Thành phần gây tê", precautionUS: "Contains lidocaine", pronKR: "카미스타드" },
  orajel_mouth_us: { id: "orajel_mouth_us", nameKR: "오라젤 구내염", nameVN: "Orajel Mouth Sore", nameUS: "Orajel Mouth Sore gel", ingredient: "Benzocaine 20%", dosageKR: "환부에 도포, 하루 4회", dosageVN: "Thoa lên vết loét, 4 lần/ngày", dosageUS: "Apply to sore, up to 4 times/day", precautionKR: "국소마취", precautionVN: "Gây tê cục bộ", precautionUS: "Topical anesthetic" },

  // === Burn drugs (25) ===
  fucidin_kr: { id: "fucidin_kr", nameKR: "후시딘", nameVN: "Biafine", nameUS: "Neosporin Burn Relief", ingredient: "Fusidic acid / Trolamine / Neomycin+Pramoxine", dosageKR: "환부에 얇게 도포, 하루 2~3회", dosageVN: "Thoa dày lên vùng bỏng", dosageUS: "Apply to burn, 1-3 times/day", precautionKR: "감염 방지", precautionVN: "Không tác dụng phụ", precautionUS: "Includes pain relief" },
  silvadene_kr: { id: "silvadene_kr", nameKR: "실바덴 크림", nameVN: "Silvirin cream", nameUS: "Aloe Vera gel", ingredient: "Silver sulfadiazine 1% / Aloe vera", dosageKR: "환부에 도포", dosageVN: "Thoa lên vùng bỏng, 1-2 lần/ngày", dosageUS: "Apply to burn as needed", precautionKR: "설파제 알레르기 주의", precautionVN: "Dị ứng sulfa cẩn thận", precautionUS: "Use pure aloe product" },
  biafine_vn: { id: "biafine_vn", nameKR: "비아핀", nameVN: "Biafine", nameUS: "Biafine", ingredient: "Trolamine emulsion", dosageKR: "화상 부위에 두껍게 도포", dosageVN: "Thoa dày lên vùng bỏng", dosageUS: "Apply thickly to burn area", precautionKR: "없음", precautionVN: "Không", precautionUS: "None", pronKR: "비아핀" },
  neosporin_burn_us: { id: "neosporin_burn_us", nameKR: "네오스포린 번 릴리프", nameVN: "Neosporin Burn", nameUS: "Neosporin Burn Relief", ingredient: "Neomycin + Pramoxine", dosageKR: "환부에 도포, 하루 1~3회", dosageVN: "Thoa 1-3 lần/ngày", dosageUS: "Apply 1-3 times/day", precautionKR: "통증 완화 포함", precautionVN: "Có giảm đau", precautionUS: "Includes pain relief" },

  // === Wound drugs (26) ===
  madecassol_kr: { id: "madecassol_kr", nameKR: "마데카솔 연고", nameVN: "Betadine dung dịch", nameUS: "Neosporin", ingredient: "Centella asiatica / Povidone-iodine / Neomycin+Polymyxin+Bacitracin", dosageKR: "상처에 도포, 하루 1~2회", dosageVN: "Sát trùng vết thương rồi băng", dosageUS: "Apply to wound, 1-3 times/day", precautionKR: "상처 재생", precautionVN: "Dị ứng iodine cẩn thận", precautionUS: "No special precautions" },
  betadine_vn: { id: "betadine_vn", nameKR: "베타딘", nameVN: "Betadine dung dịch", nameUS: "Betadine", ingredient: "Povidone-iodine 10%", dosageKR: "상처 소독 후 거즈", dosageVN: "Sát trùng vết thương", dosageUS: "Disinfect wound", precautionKR: "요오드 알레르기 주의", precautionVN: "Dị ứng iodine cẩn thận", precautionUS: "Iodine allergy caution", pronKR: "베타딘" },
  fucidin_vn: { id: "fucidin_vn", nameKR: "후시딘 크림", nameVN: "Fucidin cream", nameUS: "Polysporin", ingredient: "Fusidic acid 2%", dosageKR: "상처에 도포, 하루 2~3회", dosageVN: "Thoa lên vết thương, 2-3 lần/ngày", dosageUS: "Apply 2-3 times/day", precautionKR: "감염 방지 항생제", precautionVN: "Kháng sinh ngăn nhiễm trùng", precautionUS: "Antibiotic ointment", pronKR: "후시딘" },
  neosporin_us2: { id: "neosporin_us2", nameKR: "네오스포린", nameVN: "Neosporin", nameUS: "Neosporin Original", ingredient: "Neomycin + Polymyxin B + Bacitracin", dosageKR: "상처에 도포, 하루 1~3회", dosageVN: "Thoa 1-3 lần/ngày", dosageUS: "Apply 1-3 times/day", precautionKR: "없음", precautionVN: "Không", precautionUS: "None" },
  bandaid_us: { id: "bandaid_us", nameKR: "밴드에이드 + 폴리스포린", nameVN: "Băng cá nhân + Fucidin", nameUS: "Band-Aid + Polysporin", ingredient: "Adhesive bandage + Bacitracin+Polymyxin B", dosageKR: "소독 후 도포 + 밴드", dosageVN: "Sát trùng, thoa thuốc, băng lại", dosageUS: "Clean, apply, bandage", precautionKR: "없음", precautionVN: "Không", precautionUS: "None" },

  // === Swelling drugs (27) ===
  daflon_vn: { id: "daflon_vn", nameKR: "다플론", nameVN: "Daflon", nameUS: "Daflon", ingredient: "Diosmin 900mg + Hesperidin 100mg", dosageKR: "2정, 하루 1회", dosageVN: "2 viên, 1 lần/ngày", dosageUS: "2 tablets, once daily", precautionKR: "정맥순환 개선", precautionVN: "Cải thiện tuần hoàn tĩnh mạch", precautionUS: "Improves venous circulation", pronKR: "다플론" },
  antistax_vn: { id: "antistax_vn", nameKR: "안티스탁스", nameVN: "Antistax", nameUS: "Antistax", ingredient: "Red vine leaf extract 360mg", dosageKR: "2캡슐, 아침", dosageVN: "2 viên, buổi sáng", dosageUS: "2 capsules, morning", precautionKR: "자연 성분", precautionVN: "Thành phần tự nhiên", precautionUS: "Natural ingredient" },

  // === Acne drugs (28) ===
  noscarna_kr: { id: "noscarna_kr", nameKR: "노스카나 겔", nameVN: "Benzac AC 2.5%", nameUS: "Neutrogena BP 2.5%", ingredient: "Allantoin+Heparin / Benzoyl peroxide 2.5%", dosageKR: "환부에 도포, 하루 2~3회", dosageVN: "Thoa sau rửa mặt, 1-2 lần/ngày", dosageUS: "Apply after wash, 1-2 times/day", precautionKR: "없음", precautionVN: "Khô/kích ứng, bắt đầu ít", precautionUS: "May cause dryness, start small" },
  pairacne_kr: { id: "pairacne_kr", nameKR: "페어아크네 크림", nameVN: "Dalacin T gel", nameUS: "Differin gel", ingredient: "Ibuprofen piconol / Clindamycin 1% / Adapalene 0.1%", dosageKR: "여드름 부위에 도포, 하루 2~3회", dosageVN: "Thoa lên mụn, 2 lần/ngày", dosageUS: "Apply at bedtime, once daily", precautionKR: "없음", precautionVN: "Kháng sinh", precautionUS: "Sun sensitivity, takes 4-8 weeks" },
  benzac_vn: { id: "benzac_vn", nameKR: "벤작 AC", nameVN: "Benzac AC 2.5%", nameUS: "Neutrogena BP", ingredient: "Benzoyl peroxide 2.5%", dosageKR: "세안 후 도포, 하루 1~2회", dosageVN: "Thoa sau rửa mặt, 1-2 lần/ngày", dosageUS: "Apply 1-2 times/day", precautionKR: "건조/자극 가능, 소량부터", precautionVN: "Có thể khô/kích ứng", precautionUS: "May cause dryness", pronKR: "벤작" },
  differin_us: { id: "differin_us", nameKR: "디페린 젤", nameVN: "Differin gel", nameUS: "Differin gel", ingredient: "Adapalene 0.1%", dosageKR: "취침 전 도포, 하루 1회", dosageVN: "Thoa trước khi ngủ, 1 lần/ngày", dosageUS: "Apply at bedtime, once daily", precautionKR: "햇빛 주의, 효과 4~8주", precautionVN: "Tránh nắng, cần 4-8 tuần", precautionUS: "Sun sensitivity, takes 4-8 weeks" },

  // === Athlete's foot drugs (29) ===
  lamisil_kr: { id: "lamisil_kr", nameKR: "라미실 크림", nameVN: "Lamisil cream", nameUS: "Lamisil AT", ingredient: "Terbinafine 1%", dosageKR: "환부에 도포, 하루 1~2회, 2~4주", dosageVN: "Thoa lên vùng bị, 1-2 lần/ngày, 2-4 tuần", dosageUS: "Apply 1-2 times/day, 1-4 weeks", precautionKR: "꾸준히 사용해야 효과", precautionVN: "Phải dùng đều đặn", precautionUS: "Continue even if symptoms improve" },
  canesten_kr: { id: "canesten_kr", nameKR: "카네스텐 크림", nameVN: "Canesten cream", nameUS: "Lotrimin AF", ingredient: "Clotrimazole 1%", dosageKR: "환부에 도포, 하루 2~3회, 4주", dosageVN: "Thoa 2-3 lần/ngày, 4 tuần", dosageUS: "Apply 2 times/day, 4 weeks", precautionKR: "중단 없이 사용", precautionVN: "Không ngừng dùng sớm", precautionUS: "Don't stop early" },

  // === Stye drugs (30) ===
  terramycin_kr: { id: "terramycin_kr", nameKR: "테라마이신 안연고", nameVN: "Tobrex eye drops", nameUS: "Stye Eye Ointment", ingredient: "Oxytetracycline+Polymyxin B / Tobramycin / OTC stye formula", dosageKR: "눈꺼풀에 소량 도포, 하루 2~3회", dosageVN: "1-2 giọt, 4-6 lần/ngày", dosageUS: "Apply to eyelid, 1-2 times/day", precautionKR: "눈 안에 넣지 말 것", precautionVN: "Thuốc kháng sinh nhỏ mắt", precautionUS: "OTC use only" },
  warm_compress: { id: "warm_compress", nameKR: "온찜질", nameVN: "Chườm ấm", nameUS: "Warm compress", ingredient: "Warm towel / Warm compress", dosageKR: "따뜻한 수건으로 10~15분, 하루 3~4회", dosageVN: "Khăn ấm 10-15 phút, 3-4 lần/ngày", dosageUS: "Warm towel 10-15 min, 4 times/day", precautionKR: "가장 효과적인 초기 치료", precautionVN: "Phương pháp hiệu quả nhất", precautionUS: "Most effective initial treatment" },
  tobrex_vn: { id: "tobrex_vn", nameKR: "토브렉스 안약", nameVN: "Tobrex eye drops", nameUS: "Tobrex", ingredient: "Tobramycin 0.3%", dosageKR: "1~2방울, 하루 4~6회", dosageVN: "1-2 giọt, 4-6 lần/ngày", dosageUS: "1-2 drops, 4-6 times/day", precautionKR: "항생제 안약", precautionVN: "Thuốc kháng sinh nhỏ mắt", precautionUS: "Antibiotic eye drops", pronKR: "토브렉스" },

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

  // === Japanese (JP) Drug Database ===

  // --- Pain/Fever ---
  eve_a_jp: { id: "eve_a_jp", nameKR: "이브 A정", nameVN: "EVE A", nameUS: "EVE A Tablets", nameJP: "イブA錠", ingredient: "Ibuprofen 150mg + Allylisopropylacetylurea + Caffeine", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "졸음 가능. 졸음 유발→운전 금지, 복용 전후 음주 금지, 임신 예정일 12주 이내 금기. 지정 제2류 의약품", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", precautionJP: "眠気が出ることがあります", nameLocal: "イブA錠", pronKR: "이부 에이 조", pronEN: "i-bu ei joh" },
  loxonin_s_jp: { id: "loxonin_s_jp", nameKR: "록소닌 S", nameVN: "Loxonin S", nameUS: "Loxonin S", nameJP: "ロキソニンS", ingredient: "Loxoprofen 60mg", dosageKR: "1정, 1일 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageJP: "1錠、1日3回", precautionKR: "위장 부담, 공복 피하기. 소장/대장 협착/폐색 부작용 보고. 약사 대면 구매 필수 (제1류 의약품)", precautionVN: "Nặng dạ dày, tránh uống khi đói", precautionUS: "GI burden, avoid on empty stomach", precautionJP: "胃腸に負担、空腹時を避ける", nameLocal: "ロキソニンS", pronKR: "로키소닌 에스", pronEN: "ro-ki-so-nin esu" },
  bufferin_a_jp: { id: "bufferin_a_jp", nameKR: "버퍼린 A", nameVN: "Bufferin A", nameUS: "Bufferin A", nameJP: "バファリンA", ingredient: "Aspirin 330mg + Buffer", dosageKR: "2정, 1일 2회 한도, 복용 간격 6시간 이상", dosageVN: "2 viên, tối đa 2 lần/ngày, cách ít nhất 6 giờ", dosageUS: "2 tablets, max 2 times/day, at least 6 hours apart", dosageJP: "2錠、1日2回まで、6時間以上間隔", precautionKR: "15세 미만 금지. 15세 미만 Reye 증후군 위험, 아스피린 천식 금기. 제2류 의약품", precautionVN: "Cấm dưới 15 tuổi", precautionUS: "Not for under 15", precautionJP: "15歳未満は服用しないこと", nameLocal: "バファリンA", pronKR: "바파린 에이", pronEN: "ba-fa-rin ei" },
  tylenol_a_jp: { id: "tylenol_a_jp", nameKR: "타이레놀 A", nameVN: "Tylenol A", nameUS: "Tylenol A (JP)", nameJP: "タイレノールA", ingredient: "Acetaminophen 300mg", dosageKR: "1정, 1일 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageJP: "1錠、1日3回", precautionKR: "간 부담", precautionVN: "Gánh nặng cho gan", precautionUS: "Liver burden", precautionJP: "肝臓に負担", nameLocal: "タイレノールA", pronKR: "타이레노루 에이", pronEN: "tai-re-no-ru ei" },

  // --- Cold ---
  pabron_gold_jp: { id: "pabron_gold_jp", nameKR: "파브론 골드 A", nameVN: "Pabron Gold A", nameUS: "Pabron Gold A", nameJP: "パブロンゴールドA", ingredient: "Guaifenesin 60mg + Dihydrocodeine 8mg + dl-Methylephedrine 20mg + Acetaminophen 300mg + Chlorpheniramine 2.5mg + Caffeine 25mg + Vitamin B2 4mg", dosageKR: "1포 또는 3정, 1일 3회", dosageVN: "1 gói hoặc 3 viên, 3 lần/ngày", dosageUS: "1 packet or 3 tablets, 3 times/day", dosageJP: "1包または3錠、1日3回", precautionKR: "졸음 유발. 해외 반입 규제 성분 포함(디히드로코데인/메틸에페드린), 12세 미만 금기, 운전 금지, 수유부 금기. 지정 제2류 의약품", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", precautionJP: "眠気を催すことがあります", nameLocal: "パブロンゴールドA", pronKR: "파부론 고루도 에이", pronEN: "pa-bu-ron go-ru-do ei" },
  lulu_attack_jp: { id: "lulu_attack_jp", nameKR: "루루어텍 EX", nameVN: "Lulu Attack EX", nameUS: "Lulu Attack EX", nameJP: "ルルアタックEX", ingredient: "Ibuprofen + Tranexamic acid + Clemastine", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "졸음 가능", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", precautionJP: "眠気が出ることがあります", nameLocal: "ルルアタックEX", pronKR: "루루 아탓쿠 이엑스", pronEN: "ru-ru a-tak-ku ii-ek-su" },
  benza_block_jp: { id: "benza_block_jp", nameKR: "벤자블록 프리미엄", nameVN: "Benza Block Premium", nameUS: "Benza Block Premium", nameJP: "ベンザブロックプレミアム", ingredient: "Ibuprofen + Dihydrocodeine + Pseudoephedrine", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "졸음", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", precautionJP: "眠気を催します", nameLocal: "ベンザブロックプレミアム", pronKR: "벤자 부록쿠 프레미아무", pronEN: "ben-za bu-rok-ku pu-re-mi-a-mu" },
  kakkonto_jp: { id: "kakkonto_jp", nameKR: "갈근탕", nameVN: "Kakkonto", nameUS: "Kakkonto (Kampo)", nameJP: "葛根湯", ingredient: "갈근탕 한방 추출물", dosageKR: "1포, 1일 3회", dosageVN: "1 gói, 3 lần/ngày", dosageUS: "1 packet, 3 times/day", dosageJP: "1包、1日3回", precautionKR: "감기 초기에 효과적", precautionVN: "Hiệu quả khi cảm mới bắt đầu", precautionUS: "Effective at early stage of cold", precautionJP: "風邪の初期に効果的", nameLocal: "葛根湯", pronKR: "갓콘토", pronEN: "kak-kon-toh" },

  // --- Cough ---
  ryukakusan_jp: { id: "ryukakusan_jp", nameKR: "용각산", nameVN: "Ryukakusan", nameUS: "Ryukakusan", nameJP: "龍角散", ingredient: "도라지 + 세네가 등 생약", dosageKR: "1스푼, 1일 3~6회", dosageVN: "1 thìa, 3-6 lần/ngày", dosageUS: "1 spoonful, 3-6 times/day", dosageJP: "1さじ、1日3〜6回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "龍角散", pronKR: "류카쿠산", pronEN: "ryu-ka-ku-san" },
  ryukakusan_direct_jp: { id: "ryukakusan_direct_jp", nameKR: "용각산 다이렉트", nameVN: "Ryukakusan Direct", nameUS: "Ryukakusan Direct Stick", nameJP: "龍角散ダイレクト", ingredient: "생약 파우더 스틱", dosageKR: "1포 수시로", dosageVN: "1 gói, khi cần", dosageUS: "1 stick as needed", dosageJP: "1包、随時", precautionKR: "물 없이 복용", precautionVN: "Uống không cần nước", precautionUS: "Take without water", precautionJP: "水なしで服用", nameLocal: "龍角散ダイレクト", pronKR: "류카쿠산 다이렉토", pronEN: "ryu-ka-ku-san dai-rek-to" },
  aneton_jp: { id: "aneton_jp", nameKR: "아네톤 기침지", nameVN: "Aneton Cough", nameUS: "Aneton Cough Suppressant", nameJP: "アネトン咳止め", ingredient: "Dextromethorphan + Bromhexine", dosageKR: "3정, 1일 3회", dosageVN: "3 viên, 3 lần/ngày", dosageUS: "3 tablets, 3 times/day", dosageJP: "3錠、1日3回", precautionKR: "졸음 가능", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", precautionJP: "眠気が出ることがあります", nameLocal: "アネトン咳止め", pronKR: "아네톤 세키도메", pronEN: "a-ne-ton se-ki-do-me" },

  // --- Sore Throat ---
  harenace_jp: { id: "harenace_jp", nameKR: "하레나스", nameVN: "Harenace", nameUS: "Harenace", nameJP: "ハレナース", ingredient: "Tranexamic acid + Kanzo extract", dosageKR: "1포, 1일 3회", dosageVN: "1 gói, 3 lần/ngày", dosageUS: "1 packet, 3 times/day", dosageJP: "1包、1日3回", precautionKR: "물 없이 복용", precautionVN: "Uống không cần nước", precautionUS: "Take without water", precautionJP: "水なしで服用", nameLocal: "ハレナース", pronKR: "하레나스", pronEN: "ha-re-na-su" },
  perak_t_jp: { id: "perak_t_jp", nameKR: "페라크 T 로젠지", nameVN: "Perak T Lozenge", nameUS: "Perak T Lozenge", nameJP: "ペラックT錠", ingredient: "Tranexamic acid + Canzo + Vitamin B", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ペラックT錠", pronKR: "페락쿠 티 조", pronEN: "pe-rak-ku tii joh" },

  // --- Runny/Stuffy Nose + Allergy ---
  allegra_fx_jp: { id: "allegra_fx_jp", nameKR: "알레그라 FX", nameVN: "Allegra FX", nameUS: "Allegra FX", nameJP: "アレグラFX", ingredient: "Fexofenadine 60mg", dosageKR: "1정, 1일 2회", dosageVN: "1 viên, 2 lần/ngày", dosageUS: "1 tablet, 2 times/day", dosageJP: "1錠、1日2回", precautionKR: "졸음 적음. 제2류 의약품 (제1류 아님). 제산제 병용 금지, 수유부 금기", precautionVN: "Ít gây buồn ngủ", precautionUS: "Low drowsiness", precautionJP: "眠くなりにくい", nameLocal: "アレグラFX", pronKR: "아레구라 에프엑스", pronEN: "a-re-gu-ra ef-ek-su" },
  pabron_nasal_jp: { id: "pabron_nasal_jp", nameKR: "파브론 비엔", nameVN: "Pabron Nasal", nameUS: "Pabron Nasal", nameJP: "パブロン鼻炎", ingredient: "Pseudoephedrine + Chlorpheniramine", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "졸음", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", precautionJP: "眠気を催します", nameLocal: "パブロン鼻炎", pronKR: "파부론 비엔", pronEN: "pa-bu-ron bi-en" },
  nazal_spray_jp: { id: "nazal_spray_jp", nameKR: "나자루 스프레이", nameVN: "Nazal Spray", nameUS: "Nazal Spray", nameJP: "ナザールスプレー", ingredient: "Naphazoline", dosageKR: "1~2회 분사, 1일 1~2회", dosageVN: "1-2 lần xịt, 1-2 lần/ngày", dosageUS: "1-2 sprays, 1-2 times/day", dosageJP: "1〜2回噴霧、1日1〜2回", precautionKR: "3일 이상 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 days", precautionJP: "3日以上の使用は避ける", nameLocal: "ナザールスプレー", pronKR: "나자루 스프레", pronEN: "na-za-ru su-pu-rei" },
  ag_nose_jp: { id: "ag_nose_jp", nameKR: "AG 노즈", nameVN: "AG Nose", nameUS: "AG Nose Spray", nameJP: "AGノーズ", ingredient: "Beclomethasone", dosageKR: "1~2회 분사, 1일 2회", dosageVN: "1-2 lần xịt, 2 lần/ngày", dosageUS: "1-2 sprays, 2 times/day", dosageJP: "1〜2回噴霧、1日2回", precautionKR: "스테로이드", precautionVN: "Steroid", precautionUS: "Steroid nasal spray", precautionJP: "ステロイド", nameLocal: "エージーノーズ", pronKR: "에지 노즈", pronEN: "ei-jii no-zu" },

  // --- Stomach/Digestion ---
  ohta_isan_jp: { id: "ohta_isan_jp", nameKR: "오타이산", nameVN: "Ohta Isan", nameUS: "Ohta's Isan", nameJP: "太田胃散", ingredient: "탄산수소나트륨 + 생약", dosageKR: "1포, 식후/식간", dosageVN: "1 gói, sau ăn/giữa bữa", dosageUS: "1 packet, after/between meals", dosageJP: "1包、食後/食間", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "太田胃散", pronKR: "오타 이산", pronEN: "oh-ta i-san" },
  gaster_10_jp: { id: "gaster_10_jp", nameKR: "가스터 10", nameVN: "Gaster 10", nameUS: "Gaster 10", nameJP: "ガスター10", ingredient: "Famotidine 10mg", dosageKR: "1정, 1일 2회", dosageVN: "1 viên, 2 lần/ngày", dosageUS: "1 tablet, 2 times/day", dosageJP: "1錠、1日2回", precautionKR: "약사 상담 필요. 약사 대면 설명 의무 (제1류 의약품), 2주 이상 연속 금지", precautionVN: "Cần tư vấn dược sĩ", precautionUS: "Consult pharmacist", precautionJP: "薬剤師に相談が必要", nameLocal: "ガスター10", pronKR: "가스타 쥬", pronEN: "ga-su-ta juu" },
  cabagin_jp: { id: "cabagin_jp", nameKR: "캬베진 코와 알파", nameVN: "Cabagin Kowa Alpha", nameUS: "Cabagin Kowa Alpha", nameJP: "キャベジンコーワα", ingredient: "MMSC + 제산제", dosageKR: "2정, 1일 3회", dosageVN: "2 viên, 3 lần/ngày", dosageUS: "2 tablets, 3 times/day", dosageJP: "2錠、1日3回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "キャベジンコーワα", pronKR: "캬베진 코와 알파", pronEN: "kya-be-jin koh-wa a-ru-fa" },
  seirogan_jp: { id: "seirogan_jp", nameKR: "세이로간", nameVN: "Seirogan", nameUS: "Seirogan", nameJP: "正露丸", ingredient: "목크레오소트", dosageKR: "3알, 1일 3회", dosageVN: "3 viên, 3 lần/ngày", dosageUS: "3 pills, 3 times/day", dosageJP: "3粒、1日3回", precautionKR: "독특한 냄새", precautionVN: "Có mùi đặc trưng", precautionUS: "Distinctive smell", precautionJP: "独特の臭いがあります", nameLocal: "正露丸", pronKR: "세이로간", pronEN: "sei-ro-gan" },
  wakamoto_jp: { id: "wakamoto_jp", nameKR: "강력 와카모토", nameVN: "Wakamoto", nameUS: "Strong Wakamoto", nameJP: "強力わかもと", ingredient: "소화효소 + 유산균 + 맥주효모", dosageKR: "9정, 1일 3회", dosageVN: "9 viên, 3 lần/ngày", dosageUS: "9 tablets, 3 times/day", dosageJP: "9錠、1日3回", precautionKR: "소화+정장+영양", precautionVN: "Tiêu hóa + chỉnh trang + dinh dưỡng", precautionUS: "Digestion + intestinal + nutrition", precautionJP: "消化＋整腸＋栄養", nameLocal: "強力わかもと", pronKR: "쿄료쿠 와카모토", pronEN: "kyoh-ryo-ku wa-ka-mo-to" },

  // --- Diarrhea ---
  stoppa_jp: { id: "stoppa_jp", nameKR: "스톱파", nameVN: "Stoppa", nameUS: "Stoppa", nameJP: "ストッパ", ingredient: "Loperamide", dosageKR: "1정 (물 없이)", dosageVN: "1 viên (không cần nước)", dosageUS: "1 tablet (without water)", dosageJP: "1錠（水なし）", precautionKR: "급성 설사에", precautionVN: "Dùng cho tiêu chảy cấp", precautionUS: "For acute diarrhea", precautionJP: "急な下痢に", nameLocal: "ストッパ", pronKR: "스톳파", pronEN: "su-top-pa" },
  biofermin_jp: { id: "biofermin_jp", nameKR: "비오페르민", nameVN: "Biofermin", nameUS: "Biofermin", nameJP: "ビオフェルミン", ingredient: "Bifidobacterium + Lactobacillus", dosageKR: "3정, 1일 3회", dosageVN: "3 viên, 3 lần/ngày", dosageUS: "3 tablets, 3 times/day", dosageJP: "3錠、1日3回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ビオフェルミン", pronKR: "비오페루민", pronEN: "bi-o-fe-ru-min" },

  // --- Nausea/Motion Sickness ---
  aneron_jp: { id: "aneron_jp", nameKR: "아네론", nameVN: "Aneron", nameUS: "Aneron", nameJP: "アネロン", ingredient: "Pheniramine 30mg + Scopolamine 0.2mg + Aminobenzoate 50mg + Caffeine 20mg + Vitamin B6 5mg", dosageKR: "1캡슐, 출발 30분 전", dosageVN: "1 viên nang, 30 phút trước khi đi", dosageUS: "1 capsule, 30 min before departure", dosageJP: "1カプセル、出発30分前", precautionKR: "1일 1회, 졸음. 15세 미만 금기, 녹내장/전립선비대 금기, 운전 금지. 지정 제2류 의약품", precautionVN: "1 lần/ngày, gây buồn ngủ", precautionUS: "Once daily, causes drowsiness", precautionJP: "1日1回、眠気あり", nameLocal: "アネロン", pronKR: "아네론", pronEN: "a-ne-ron" },
  travelmin_jp: { id: "travelmin_jp", nameKR: "트래베루민", nameVN: "Travelmin", nameUS: "Travelmin", nameJP: "トラベルミン", ingredient: "Diphenhydramine + Diphenidol", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tablet, 30 min before departure", dosageJP: "1錠、出発30分前", precautionKR: "졸음", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", precautionJP: "眠気を催します", nameLocal: "トラベルミン", pronKR: "토라베루민", pronEN: "to-ra-be-ru-min" },

  // --- Skin/Itch/Insect Bite ---
  muhi_s_jp: { id: "muhi_s_jp", nameKR: "무히 S", nameVN: "Muhi S", nameUS: "Muhi S", nameJP: "ムヒS", ingredient: "Diphenhydramine + Hydrocortisone", dosageKR: "환부에 도포, 수시로", dosageVN: "Thoa lên vùng bị, khi cần", dosageUS: "Apply to affected area as needed", dosageJP: "患部に塗布、随時", precautionKR: "스테로이드 (약함)", precautionVN: "Steroid (nhẹ)", precautionUS: "Steroid (mild)", precautionJP: "ステロイド（弱め）", nameLocal: "ムヒS", pronKR: "무히 에스", pronEN: "mu-hi esu" },
  unakowa_jp: { id: "unakowa_jp", nameKR: "신우나코와", nameVN: "Shin Unakowa", nameUS: "Shin Unakowa", nameJP: "新ウナコーワ", ingredient: "Lidocaine + Diphenhydramine + Menthol", dosageKR: "스펀지로 도포", dosageVN: "Thoa bằng miếng bọt", dosageUS: "Apply with sponge", dosageJP: "スポンジで塗布", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "新ウナコーワクール", pronKR: "신 우나코와 쿠루", pronEN: "shin u-na-koh-wa kuu-ru" },
  oronine_jp: { id: "oronine_jp", nameKR: "오로나인 H", nameVN: "Oronine H", nameUS: "Oronine H Ointment", nameJP: "オロナインH軟膏", ingredient: "Chlorhexidine gluconate", dosageKR: "환부에 도포", dosageVN: "Thoa lên vùng bị", dosageUS: "Apply to affected area", dosageJP: "患部に塗布", precautionKR: "만능 연고", precautionVN: "Thuốc mỡ đa năng", precautionUS: "All-purpose ointment", precautionJP: "万能軟膏", nameLocal: "オロナインH軟膏", pronKR: "오로나인 에이치 난코", pronEN: "o-ro-na-in eichi nan-koh" },
  muhi_alpha_jp: { id: "muhi_alpha_jp", nameKR: "무히 알파 EX", nameVN: "Muhi Alpha EX", nameUS: "Muhi Alpha EX", nameJP: "ムヒアルファEX", ingredient: "Prednisolone + Diphenhydramine", dosageKR: "환부에 도포", dosageVN: "Thoa lên vùng bị", dosageUS: "Apply to affected area", dosageJP: "患部に塗布", precautionKR: "스테로이드 (중간)", precautionVN: "Steroid (trung bình)", precautionUS: "Steroid (medium strength)", precautionJP: "ステロイド（中程度）", nameLocal: "ムヒアルファEX", pronKR: "무히 아루파 이엑스", pronEN: "mu-hi a-ru-fa ii-ek-su" },

  // --- Patch/Muscle/Joint (External) ---
  salonpas_jp: { id: "salonpas_jp", nameKR: "살론파스", nameVN: "Salonpas", nameUS: "Salonpas (JP)", nameJP: "サロンパス", ingredient: "Methyl salicylate + Menthol", dosageKR: "1매, 부착", dosageVN: "1 miếng, dán", dosageUS: "1 patch, apply", dosageJP: "1枚、貼付", precautionKR: "상처 부위 금지", precautionVN: "Không dán lên vết thương", precautionUS: "Do not apply on wounds", precautionJP: "傷口には使用しないこと", nameLocal: "サロンパス", pronKR: "사론파스", pronEN: "sa-ron-pa-su" },
  feitas_jp: { id: "feitas_jp", nameKR: "페이타스", nameVN: "Feitas", nameUS: "Feitas", nameJP: "フェイタス", ingredient: "Felbinac 70mg", dosageKR: "1매, 1일 2회 교체", dosageVN: "1 miếng, thay 2 lần/ngày", dosageUS: "1 patch, replace 2 times/day", dosageJP: "1枚、1日2回貼り替え", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "フェイタス", pronKR: "페이타스", pronEN: "fei-ta-su" },
  voltaren_gel_jp: { id: "voltaren_gel_jp", nameKR: "볼타렌 겔", nameVN: "Voltaren Gel", nameUS: "Voltaren Gel (JP)", nameJP: "ボルタレンゲル", ingredient: "Diclofenac 1%", dosageKR: "적량, 1일 3~4회", dosageVN: "Lượng vừa, 3-4 lần/ngày", dosageUS: "Apply 3-4 times/day", dosageJP: "適量、1日3〜4回", precautionKR: "15세 이상. 도포 부위 햇빛 금지 (광과민성), 15세 미만 금기", precautionVN: "Từ 15 tuổi trở lên", precautionUS: "Ages 15+", precautionJP: "15歳以上", nameLocal: "ボルタレンゲル", pronKR: "보루타렌 게루", pronEN: "bo-ru-ta-ren ge-ru" },

  // --- Eye Drops ---
  rohto_v_jp: { id: "rohto_v_jp", nameKR: "로토 V", nameVN: "Rohto V", nameUS: "Rohto V Eye Drops", nameJP: "ロートV", ingredient: "Naphazoline + Chlorpheniramine + VitB6", dosageKR: "1~2방울, 1일 5~6회", dosageVN: "1-2 giọt, 5-6 lần/ngày", dosageUS: "1-2 drops, 5-6 times/day", dosageJP: "1〜2滴、1日5〜6回", precautionKR: "3일 이상 충혈 시 안과", precautionVN: "Nếu đỏ mắt trên 3 ngày, đến bác sĩ mắt", precautionUS: "See eye doctor if redness persists over 3 days", precautionJP: "3日以上充血が続く場合は眼科へ", nameLocal: "ロートV", pronKR: "로토 브이", pronEN: "roh-to bui" },
  sante_fx_jp: { id: "sante_fx_jp", nameKR: "산테 FX 네오", nameVN: "Sante FX Neo", nameUS: "Sante FX Neo", nameJP: "サンテFXネオ", ingredient: "Naphazoline + Taurine + VitB6", dosageKR: "1~2방울, 1일 5~6회", dosageVN: "1-2 giọt, 5-6 lần/ngày", dosageUS: "1-2 drops, 5-6 times/day", dosageJP: "1〜2滴、1日5〜6回", precautionKR: "렌즈 빼고 사용", precautionVN: "Tháo kính áp tròng trước khi dùng", precautionUS: "Remove contact lenses before use", precautionJP: "レンズを外して使用", nameLocal: "サンテFXネオ", pronKR: "산테 에프엑스 네오", pronEN: "san-te ef-ek-su ne-o" },
  smile_40_jp: { id: "smile_40_jp", nameKR: "스마일 40 프리미엄", nameVN: "Smile 40 Premium", nameUS: "Smile 40 Premium", nameJP: "スマイル40プレミアム", ingredient: "Vitamin A + Chondroitin + 10成分", dosageKR: "1~3방울, 1일 5~6회", dosageVN: "1-3 giọt, 5-6 lần/ngày", dosageUS: "1-3 drops, 5-6 times/day", dosageJP: "1〜3滴、1日5〜6回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "スマイル40プレミアム", pronKR: "스마이루 요쥬 프레미아무", pronEN: "su-mai-ru yon-juu pu-re-mi-a-mu" },
  soft_santia_jp: { id: "soft_santia_jp", nameKR: "소프트 산티아", nameVN: "Soft Santear", nameUS: "Soft Santear", nameJP: "ソフトサンティア", ingredient: "인공눈물", dosageKR: "수시로", dosageVN: "Khi cần", dosageUS: "As needed", dosageJP: "随時", precautionKR: "방부제 무첨가, 렌즈 OK", precautionVN: "Không chất bảo quản, dùng được với kính áp tròng", precautionUS: "Preservative-free, OK with contacts", precautionJP: "防腐剤無添加、レンズOK", nameLocal: "ソフトサンティア", pronKR: "소프토 산티아", pronEN: "so-fu-to san-ti-a" },

  // --- Heartburn/Acid ---
  gaviscon_jp: { id: "gaviscon_jp", nameKR: "개비스콘 (JP)", nameVN: "Gaviscon (JP)", nameUS: "Gaviscon (JP)", nameJP: "ギャビスコン", ingredient: "Sodium alginate", dosageKR: "10~20ml, 식후", dosageVN: "10-20ml, sau ăn", dosageUS: "10-20ml, after meals", dosageJP: "10〜20ml、食後", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし" },

  // --- Mouth Ulcer ---
  traful_direct_jp: { id: "traful_direct_jp", nameKR: "트라풀 다이렉트", nameVN: "Traful Direct", nameUS: "Traful Direct Patch", nameJP: "トラフルダイレクト", ingredient: "Triamcinolone acetonide patch", dosageKR: "환부에 부착, 1일 1~2회", dosageVN: "Dán lên vùng bị, 1-2 lần/ngày", dosageUS: "Apply to affected area, 1-2 times/day", dosageJP: "患部に貼付、1日1〜2回", precautionKR: "스테로이드", precautionVN: "Steroid", precautionUS: "Steroid patch", precautionJP: "ステロイド", nameLocal: "トラフルダイレクト", pronKR: "토라후루 다이렉토", pronEN: "to-ra-fu-ru dai-rek-to" },
  chocola_bb_jp: { id: "chocola_bb_jp", nameKR: "쇼코라 BB 플러스", nameVN: "Chocola BB Plus", nameUS: "Chocola BB Plus", nameJP: "チョコラBBプラス", ingredient: "Vitamin B2 + B6 + B1 + Nicotinamide", dosageKR: "1정, 1일 2회", dosageVN: "1 viên, 2 lần/ngày", dosageUS: "1 tablet, 2 times/day", dosageJP: "1錠、1日2回", precautionKR: "소변 노랗게 변함", precautionVN: "Nước tiểu có thể vàng", precautionUS: "Urine may turn yellow", precautionJP: "尿が黄色くなることがあります", nameLocal: "チョコラBBプラス", pronKR: "초코라 비비 프라스", pronEN: "cho-ko-ra bii-bii pu-ra-su" },

  // --- Constipation ---
  colac_jp: { id: "colac_jp", nameKR: "코락", nameVN: "Colac", nameUS: "Colac", nameJP: "コーラック", ingredient: "Bisacodyl 5mg", dosageKR: "1~3정, 취침 전", dosageVN: "1-3 viên, trước khi ngủ", dosageUS: "1-3 tablets, at bedtime", dosageJP: "1〜3錠、就寝前", precautionKR: "장기 복용 금지", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term", precautionJP: "長期連用しないこと", nameLocal: "コーラック", pronKR: "코락쿠", pronEN: "koh-rak-ku" },
  biofermin_constip_jp: { id: "biofermin_constip_jp", nameKR: "비오페르민 변비약", nameVN: "Biofermin Constipation", nameUS: "Biofermin Constipation", nameJP: "ビオフェルミン便秘薬", ingredient: "Sennoside + 유산균", dosageKR: "2~3정, 취침 전", dosageVN: "2-3 viên, trước khi ngủ", dosageUS: "2-3 tablets, at bedtime", dosageJP: "2〜3錠、就寝前", precautionKR: "자연스러운 배변", precautionVN: "Đại tiện tự nhiên", precautionUS: "Natural bowel movement", precautionJP: "自然なお通じ", nameLocal: "ビオフェルミン便秘薬", pronKR: "비오페루민 벤피야쿠", pronEN: "bi-o-fe-ru-min ben-pi-ya-ku" },

  // --- Insomnia ---
  drewell_jp: { id: "drewell_jp", nameKR: "드리엘", nameVN: "Drewell", nameUS: "Drewell", nameJP: "ドリエル", ingredient: "Diphenhydramine 50mg", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước khi ngủ", dosageUS: "2 tablets, at bedtime", dosageJP: "2錠、就寝前", precautionKR: "7일 이상 금지. 65세 이상 주의. 제2류 의약품", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days", precautionJP: "7日以上の服用は避ける", nameLocal: "ドリエル", pronKR: "도리에루", pronEN: "do-ri-e-ru" },

  // --- Hangover ---
  heparize_jp: { id: "heparize_jp", nameKR: "헤파리제", nameVN: "Heparize", nameUS: "Heparize", nameJP: "ヘパリーゼ", ingredient: "간장 가수분해물 + 우르소데옥시콜산", dosageKR: "1병/3정, 음주 전후", dosageVN: "1 chai/3 viên, trước/sau uống rượu", dosageUS: "1 bottle/3 tablets, before/after drinking", dosageJP: "1本/3錠、飲酒前後", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ヘパリーゼ", pronKR: "헤파리제", pronEN: "he-pa-rii-ze" },
  ukon_jp: { id: "ukon_jp", nameKR: "우콘의 힘", nameVN: "Ukon no Chikara", nameUS: "Ukon Power", nameJP: "ウコンの力", ingredient: "강황 추출물", dosageKR: "1병, 음주 전", dosageVN: "1 chai, trước khi uống rượu", dosageUS: "1 bottle, before drinking", dosageJP: "1本、飲酒前", precautionKR: "식품", precautionVN: "Thực phẩm chức năng", precautionUS: "Health food supplement", precautionJP: "食品", nameLocal: "ウコンの力", pronKR: "우콘노 치카라", pronEN: "u-kon-no chi-ka-ra" },
  solmac_jp: { id: "solmac_jp", nameKR: "소루맥", nameVN: "Solmac", nameUS: "Solmac", nameJP: "ソルマック", ingredient: "한방 생약 복합", dosageKR: "1병, 음주 전후", dosageVN: "1 chai, trước/sau uống rượu", dosageUS: "1 bottle, before/after drinking", dosageJP: "1本、飲酒前後", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ソルマック", pronKR: "소루맛쿠", pronEN: "so-ru-mak-ku" },

  // --- Athlete's Foot ---
  butenafine_jp: { id: "butenafine_jp", nameKR: "부테나로크 V알파", nameVN: "Butenafine V Alpha", nameUS: "Butenalock V Alpha", nameJP: "ブテナロックVα", ingredient: "Butenafine 1%", dosageKR: "환부에 도포, 1일 1회", dosageVN: "Thoa lên vùng bị, 1 lần/ngày", dosageUS: "Apply to affected area, once daily", dosageJP: "患部に塗布、1日1回", precautionKR: "4주 이상 사용", precautionVN: "Dùng trên 4 tuần", precautionUS: "Use for 4+ weeks", precautionJP: "4週間以上使用すること", nameLocal: "ブテナロックVα", pronKR: "부테나록쿠 브이 알파", pronEN: "bu-te-na-rok-ku bui a-ru-fa" },
  lamisil_at_jp: { id: "lamisil_at_jp", nameKR: "라미실 AT (JP)", nameVN: "Lamisil AT (JP)", nameUS: "Lamisil AT (JP)", nameJP: "ラミシールAT", ingredient: "Terbinafine 1%", dosageKR: "환부에 도포, 1일 1회", dosageVN: "Thoa lên vùng bị, 1 lần/ngày", dosageUS: "Apply to affected area, once daily", dosageJP: "患部に塗布、1日1回", precautionKR: "2~4주", precautionVN: "Dùng 2-4 tuần", precautionUS: "Use for 2-4 weeks", precautionJP: "2〜4週間使用", nameLocal: "ラミシールAT", pronKR: "라미시루 에이티", pronEN: "ra-mi-shii-ru ei-tii" },

  // --- Acne ---
  pair_acne_jp: { id: "pair_acne_jp", nameKR: "페어 아크네 크림", nameVN: "Pair Acne Cream", nameUS: "Pair Acne Cream", nameJP: "ペアアクネクリーム", ingredient: "Ibuprofen piconol + Isopropylmethylphenol", dosageKR: "환부에 도포, 1일 2~3회", dosageVN: "Thoa lên vùng bị, 2-3 lần/ngày", dosageUS: "Apply 2-3 times/day", dosageJP: "患部に塗布、1日2〜3回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ペアアクネクリームW", pronKR: "페아 아쿠네 크리무 더블유", pronEN: "pe-a a-ku-ne ku-rii-mu da-bu-ryuu" },
  clearasil_jp: { id: "clearasil_jp", nameKR: "클레아라실", nameVN: "Clearasil", nameUS: "Clearasil (JP)", nameJP: "クレアラシル", ingredient: "Sulfur + Resorcinol", dosageKR: "세안 후 도포", dosageVN: "Thoa sau khi rửa mặt", dosageUS: "Apply after washing face", dosageJP: "洗顔後に塗布", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "クレアラシル", pronKR: "쿠레아라시루", pronEN: "ku-re-a-ra-shi-ru" },

  // --- Stye ---
  rohto_antibac_jp: { id: "rohto_antibac_jp", nameKR: "로토 항균 안약", nameVN: "Rohto Antibacterial", nameUS: "Rohto Antibacterial Eye Drops", nameJP: "ロート抗菌目薬", ingredient: "Sulfamethoxazole", dosageKR: "1~2방울, 1일 5~6회", dosageVN: "1-2 giọt, 5-6 lần/ngày", dosageUS: "1-2 drops, 5-6 times/day", dosageJP: "1〜2滴、1日5〜6回", precautionKR: "없음", precautionVN: "Không có", precautionUS: "None", precautionJP: "なし", nameLocal: "ロート抗菌目薬", pronKR: "로토 코킨 메구스리", pronEN: "roh-to koh-kin me-gu-su-ri" },

  // --- Children's ---
  bufferin_child_jp: { id: "bufferin_child_jp", nameKR: "버퍼린 소아용", nameVN: "Bufferin Children", nameUS: "Bufferin for Children", nameJP: "小児用バファリン", ingredient: "Acetaminophen 50mg", dosageKR: "연령별 (3세~)", dosageVN: "Theo tuổi (từ 3 tuổi)", dosageUS: "By age (3 years+)", dosageJP: "年齢別（3歳〜）", precautionKR: "씹어먹는 타입", precautionVN: "Loại nhai", precautionUS: "Chewable type", precautionJP: "かみくだくタイプ", nameLocal: "バファリンCII", pronKR: "바파린 시 투", pronEN: "ba-fa-rin shii tsuu" },
  pabron_kids_jp: { id: "pabron_kids_jp", nameKR: "파브론 키즈 시럽", nameVN: "Pabron Kids Syrup", nameUS: "Pabron Kids Syrup", nameJP: "パブロンキッズシロップ", ingredient: "Guaifenesin 등 (카페인 무)", dosageKR: "연령별 (3개월~)", dosageVN: "Theo tuổi (từ 3 tháng)", dosageUS: "By age (3 months+)", dosageJP: "年齢別（3ヶ月〜）", precautionKR: "딸기맛", precautionVN: "Vị dâu tây", precautionUS: "Strawberry flavor", precautionJP: "いちご味", nameLocal: "パブロンキッズかぜシロップ", pronKR: "파부론 킷즈 카제 시롭푸", pronEN: "pa-bu-ron kit-zu ka-ze shi-rop-pu" },
  travelmin_jr_jp: { id: "travelmin_jr_jp", nameKR: "트래베루민 주니어", nameVN: "Travelmin Junior", nameUS: "Travelmin Junior", nameJP: "トラベルミンジュニア", ingredient: "Diphenhydramine (어린이용)", dosageKR: "5세 이상", dosageVN: "Từ 5 tuổi", dosageUS: "Ages 5+", dosageJP: "5歳以上", precautionKR: "졸음", precautionVN: "Gây buồn ngủ", precautionUS: "Causes drowsiness", precautionJP: "眠気を催します", nameLocal: "トラベルミンジュニア", pronKR: "토라베루민 주니아", pronEN: "to-ra-be-ru-min ju-ni-a" },

  // === Thailand (TH) Drugs ===
  sara_th: { id: "sara_th", nameKR: "사라", nameVN: "Sara", nameUS: "Sara", nameTH: "Sara (ซาร่า)", nameLocal: "ซาร่า", pronKR: "싸-라", pronEN: "sah-rah", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1~2 viên, mỗi 4~6 giờ", dosageUS: "1~2 tablets, every 4~6 hours", dosageTH: "1~2 เม็ด ทุก 4~6 ชั่วโมง", precautionKR: "하루 최대 8정, 음주 시 간독성 주의", precautionVN: "Tối đa 8 viên/ngày, cẩn thận khi uống rượu", precautionUS: "Max 8 tablets/day, liver risk with alcohol", precautionTH: "ไม่เกิน 8 เม็ด/วัน ระวังตับเมื่อดื่มแอลกอฮอล์" },
  sara_kids_th: { id: "sara_kids_th", nameKR: "사라 키즈 시럽", nameVN: "Sara for Kids", nameUS: "Sara for Kids Syrup", nameTH: "Sara for Kids", nameLocal: "ซาร่า สำหรับเด็ก", pronKR: "싸-라 폴 킷", pronEN: "sah-rah for kids", ingredient: "Paracetamol 120mg/5ml", dosageKR: "체중 기준, 4~6시간 간격", dosageVN: "Theo cân nặng, mỗi 4~6 giờ", dosageUS: "Weight-based, every 4~6 hours", dosageTH: "ตามน้ำหนัก ทุก 4~6 ชั่วโมง", precautionKR: "오렌지맛, 정확한 용량 측정 필수", precautionVN: "Vị cam, đo liều chính xác", precautionUS: "Orange flavor, measure dose precisely", precautionTH: "รสส้ม วัดปริมาณให้ถูกต้อง" },
  ibuprofen_gpo_th: { id: "ibuprofen_gpo_th", nameKR: "이부프로펜 GPO", nameVN: "Ibuprofen GPO", nameUS: "Ibuprofen (GPO)", nameTH: "Ibuprofen GPO", ingredient: "Ibuprofen 200~400mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn 3 lần/ngày", dosageUS: "1 tablet, after meals 3x/day", dosageTH: "1 เม็ด หลังอาหาร 3 ครั้ง/วัน", precautionKR: "⚠️ 태국 발열 시 뎅기열 의심 가능. NSAIDs 금지, Sara 사용. 위장 자극 주의", precautionVN: "⚠️ Sốt ở Thái Lan có thể là sốt xuất huyết. Cấm NSAID, dùng Sara", precautionUS: "⚠️ Fever in Thailand may be dengue. Avoid NSAIDs, use Sara. GI irritation risk", precautionTH: "⚠️ ไข้ในไทยอาจเป็นไข้เลือดออก ห้ามใช้ NSAIDs ใช้ Sara แทน" },
  ponstan_th: { id: "ponstan_th", nameKR: "폰스탄", nameVN: "Ponstan", nameUS: "Ponstan", nameTH: "Ponstan", ingredient: "Mefenamic acid 500mg", dosageKR: "1정, 식후 하루 3회", dosageVN: "1 viên, sau ăn 3 lần/ngày", dosageUS: "1 tablet, after meals 3x/day", dosageTH: "1 เม็ด หลังอาหาร 3 ครั้ง/วัน", precautionKR: "⚠️ 뎅기열 의심 시 금지. 7일 초과 금지, 임신 3분기 금기, 위장관 출혈 위험", precautionVN: "⚠️ Cấm khi nghi sốt xuất huyết. Không quá 7 ngày", precautionUS: "⚠️ Avoid if dengue suspected. Max 7 days, contraindicated in 3rd trimester", precautionTH: "⚠️ ห้ามใช้เมื่อสงสัยไข้เลือดออก ไม่เกิน 7 วัน ห้ามใช้ในไตรมาส 3" },
  tiffy_th: { id: "tiffy_th", nameKR: "티피", nameVN: "Tiffy", nameUS: "Tiffy", nameTH: "Tiffy (ทิฟฟี่)", nameLocal: "ทิฟฟี่", pronKR: "띠-피", pronEN: "tif-fee", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2~3 lần/ngày", dosageUS: "1 tablet, 2~3 times/day", dosageTH: "1 เม็ด 2~3 ครั้ง/วัน", precautionKR: "졸음 유발, 운전 금지. 약국에서만 구매. 임산부/수유부 금기, 심장질환/당뇨/녹내장/전립선비대/천식 환자 금기", precautionVN: "Gây buồn ngủ, không lái xe. Chỉ mua tại nhà thuốc", precautionUS: "Causes drowsiness, no driving. Pharmacy only (not 7-Eleven since 2023)", precautionTH: "ทำให้ง่วง ห้ามขับรถ ซื้อได้เฉพาะร้านยา ห้ามในหญิงตั้งครรภ์" },
  tiffy_dey_th: { id: "tiffy_dey_th", nameKR: "티피 데이", nameVN: "Tiffy Dey", nameUS: "Tiffy Dey", nameTH: "Tiffy Dey", ingredient: "Paracetamol 500mg + Phenylephrine 7.5mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2~3 lần/ngày", dosageUS: "1 tablet, 2~3 times/day", dosageTH: "1 เม็ด 2~3 ครั้ง/วัน", precautionKR: "Chlorpheniramine 여전히 함유, 졸음 있음. 약국 구매", precautionVN: "Vẫn chứa Chlorpheniramine, gây buồn ngủ", precautionUS: "Still contains Chlorpheniramine, causes drowsiness", precautionTH: "ยังมี Chlorpheniramine ทำให้ง่วงได้" },
  coldapress_th: { id: "coldapress_th", nameKR: "콜다프레스", nameVN: "ColdaPress", nameUS: "ColdaPress", nameTH: "ColdaPress", ingredient: "Paracetamol + Pseudoephedrine + Dextromethorphan", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageTH: "1 เม็ด 3 ครั้ง/วัน", precautionKR: "고혈압 환자 주의", precautionVN: "Cẩn thận với cao huyết áp", precautionUS: "Caution with hypertension", precautionTH: "ระวังในผู้ป่วยความดันสูง" },
  benadryl_cough_th: { id: "benadryl_cough_th", nameKR: "베나드릴 기침 시럽", nameVN: "Benadryl Cough Syrup", nameUS: "Benadryl Cough Syrup", nameTH: "Benadryl Cough Syrup", ingredient: "Diphenhydramine + Ammonium chloride", dosageKR: "10ml, 하루 3~4회", dosageVN: "10ml, 3~4 lần/ngày", dosageUS: "10ml, 3~4 times/day", dosageTH: "10 มล. 3~4 ครั้ง/วัน", precautionKR: "강한 졸음 유발", precautionVN: "Gây buồn ngủ nhiều", precautionUS: "Causes significant drowsiness", precautionTH: "ทำให้ง่วงนอนมาก" },
  woods_cough_th: { id: "woods_cough_th", nameKR: "우즈 페퍼민트 기침 시럽", nameVN: "Woods' Peppermint", nameUS: "Woods' Peppermint Cough Syrup", nameTH: "Woods' Peppermint", ingredient: "Dextromethorphan + Menthol", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, mỗi 4 giờ", dosageUS: "10ml, every 4 hours", dosageTH: "10 มล. ทุก 4 ชั่วโมง", precautionKR: "마른기침에 효과적", precautionVN: "Hiệu quả với ho khan", precautionUS: "Effective for dry cough", precautionTH: "ได้ผลดีกับไอแห้ง" },
  mucosolvan_th: { id: "mucosolvan_th", nameKR: "뮤코솔반", nameVN: "Mucosolvan", nameUS: "Mucosolvan", nameTH: "Mucosolvan", ingredient: "Ambroxol 30mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageTH: "1 เม็ด 3 ครั้ง/วัน", precautionKR: "가래 있는 기침에", precautionVN: "Cho ho có đờm", precautionUS: "For productive cough", precautionTH: "สำหรับไอมีเสมหะ" },
  strepsils_th: { id: "strepsils_th", nameKR: "스트렙실", nameVN: "Strepsils", nameUS: "Strepsils", nameTH: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격", dosageVN: "1 viên, mỗi 2~3 giờ", dosageUS: "1 lozenge, every 2~3 hours", dosageTH: "1 เม็ด ทุก 2~3 ชั่วโมง", precautionKR: "하루 최대 12정", precautionVN: "Tối đa 12 viên/ngày", precautionUS: "Max 12 lozenges/day", precautionTH: "ไม่เกิน 12 เม็ด/วัน" },
  difflam_th: { id: "difflam_th", nameKR: "디플람 스프레이", nameVN: "Difflam Spray", nameUS: "Difflam Spray", nameTH: "Difflam Spray", ingredient: "Benzydamine", dosageKR: "4~8회 분사, 1.5~3시간 간격", dosageVN: "4~8 lần xịt, mỗi 1.5~3 giờ", dosageUS: "4~8 sprays, every 1.5~3 hours", dosageTH: "ฉีด 4~8 ครั้ง ทุก 1.5~3 ชั่วโมง", precautionKR: "삼키지 말 것", precautionVN: "Không nuốt", precautionUS: "Do not swallow", precautionTH: "อย่ากลืน" },
  clarityne_th: { id: "clarityne_th", nameKR: "클라리틴", nameVN: "Clarityne", nameUS: "Clarityne", nameTH: "Clarityne", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", dosageTH: "1 เม็ด วันละ 1 ครั้ง", precautionKR: "졸음 적음", precautionVN: "Ít buồn ngủ", precautionUS: "Low drowsiness", precautionTH: "ง่วงน้อย" },
  zyrtec_th: { id: "zyrtec_th", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", nameTH: "Zyrtec", ingredient: "Cetirizine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tablet, once daily", dosageTH: "1 เม็ด วันละ 1 ครั้ง", precautionKR: "졸음 가능", precautionVN: "Có thể gây buồn ngủ", precautionUS: "May cause drowsiness", precautionTH: "อาจทำให้ง่วง" },
  telfast_th: { id: "telfast_th", nameKR: "텔패스트", nameVN: "Telfast", nameUS: "Telfast", nameTH: "Telfast", ingredient: "Fexofenadine 60mg", dosageKR: "1정, 하루 2회", dosageVN: "1 viên, 2 lần/ngày", dosageUS: "1 tablet, twice daily", dosageTH: "1 เม็ด วันละ 2 ครั้ง", precautionKR: "졸음 없음", precautionVN: "Không gây buồn ngủ", precautionUS: "Non-drowsy", precautionTH: "ไม่ทำให้ง่วง" },
  iliadin_th: { id: "iliadin_th", nameKR: "일리아딘 스프레이", nameVN: "Iliadin Spray", nameUS: "Iliadin Spray", nameTH: "Iliadin Spray", ingredient: "Oxymetazoline", dosageKR: "2~3회 분사, 12시간 간격", dosageVN: "2~3 lần xịt, mỗi 12 giờ", dosageUS: "2~3 sprays, every 12 hours", dosageTH: "ฉีด 2~3 ครั้ง ทุก 12 ชั่วโมง", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 days", precautionTH: "ห้ามใช้เกิน 3 วัน" },
  eno_th: { id: "eno_th", nameKR: "이노", nameVN: "ENO", nameUS: "ENO", nameTH: "ENO (อีโน)", nameLocal: "อีโน", pronKR: "이-노", pronEN: "ee-no", ingredient: "Sodium bicarbonate + Citric acid", dosageKR: "1포, 물에 녹여", dosageVN: "1 gói, hòa nước", dosageUS: "1 sachet, dissolve in water", dosageTH: "1 ซอง ละลายน้ำ", precautionKR: "편의점 구매 가능", precautionVN: "Mua tại 7-Eleven", precautionUS: "Available at 7-Eleven", precautionTH: "ซื้อได้ที่ 7-Eleven" },
  gaviscon_th: { id: "gaviscon_th", nameKR: "가비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", nameTH: "Gaviscon", ingredient: "Sodium alginate", dosageKR: "10~20ml, 식후", dosageVN: "10~20ml, sau ăn", dosageUS: "10~20ml, after meals", dosageTH: "10~20 มล. หลังอาหาร", precautionKR: "나트륨 함량 주의", precautionVN: "Cẩn thận natri", precautionUS: "Watch sodium content", precautionTH: "ระวังปริมาณโซเดียม" },
  omeprazole_th: { id: "omeprazole_th", nameKR: "오메프라졸", nameVN: "Omeprazole", nameUS: "Omeprazole (GPO)", nameTH: "Omeprazole (GPO)", ingredient: "Omeprazole 20mg", dosageKR: "1캡슐, 아침 식전", dosageVN: "1 viên, trước ăn sáng", dosageUS: "1 capsule, before breakfast", dosageTH: "1 แคปซูล ก่อนอาหารเช้า", precautionKR: "14일 초과 자가 복용 금지, 증상 지속 시 의사 진료", precautionVN: "Không tự dùng quá 14 ngày", precautionUS: "Do not self-medicate beyond 14 days", precautionTH: "ห้ามใช้เกิน 14 วัน ถ้ายังไม่ดีขึ้นควรพบแพทย์" },
  airx_th: { id: "airx_th", nameKR: "에어엑스", nameVN: "Air-X", nameUS: "Air-X", nameTH: "Air-X", ingredient: "Simethicone 80mg", dosageKR: "1~2정, 식후", dosageVN: "1~2 viên, sau ăn", dosageUS: "1~2 tablets, after meals", dosageTH: "1~2 เม็ด หลังอาหาร", precautionKR: "가스/팽만감에", precautionVN: "Cho đầy hơi", precautionUS: "For gas/bloating", precautionTH: "สำหรับท้องอืด" },
  imodium_th: { id: "imodium_th", nameKR: "이모디움", nameVN: "Imodium", nameUS: "Imodium", nameTH: "Imodium", ingredient: "Loperamide 2mg", dosageKR: "첫 2정, 이후 설사마다 1정", dosageVN: "2 viên đầu, sau mỗi lần tiêu chảy 1 viên", dosageUS: "2 tablets first, then 1 per episode", dosageTH: "2 เม็ดแรก จากนั้น 1 เม็ดทุกครั้งที่ถ่าย", precautionKR: "발열/혈변 동반 시 사용 금지", precautionVN: "Không dùng khi sốt/phân có máu", precautionUS: "Do not use with fever/bloody stool", precautionTH: "ห้ามใช้เมื่อมีไข้/ถ่ายเป็นเลือด" },
  smecta_th: { id: "smecta_th", nameKR: "스멕타", nameVN: "Smecta", nameUS: "Smecta", nameTH: "Smecta", ingredient: "Diosmectite 3g", dosageKR: "1포, 하루 3회", dosageVN: "1 gói, 3 lần/ngày", dosageUS: "1 sachet, 3 times/day", dosageTH: "1 ซอง 3 ครั้ง/วัน", precautionKR: "물에 녹여 복용", precautionVN: "Hòa nước uống", precautionUS: "Dissolve in water", precautionTH: "ละลายน้ำก่อนดื่ม" },
  ors_th: { id: "ors_th", nameKR: "ORS 전해질", nameVN: "ORS เกลือแร่", nameUS: "ORS Electrolyte", nameTH: "ORS (เกลือแร่)", nameLocal: "เกลือแร่", pronKR: "끌르-애", pronEN: "kluea-rae", ingredient: "Oral Rehydration Salts", dosageKR: "1포, 물에 타서 수시로", dosageVN: "1 gói, hòa nước uống", dosageUS: "1 sachet, dissolve in water", dosageTH: "1 ซอง ผสมน้ำดื่ม", precautionKR: "편의점 구매 가능. 탈수 방지 최우선", precautionVN: "Mua tại 7-Eleven", precautionUS: "Available at 7-Eleven. Rehydration priority", precautionTH: "ซื้อได้ที่ 7-Eleven ป้องกันขาดน้ำ" },
  activated_charcoal_th: { id: "activated_charcoal_th", nameKR: "활성탄", nameVN: "Activated Charcoal", nameUS: "Activated Charcoal", nameTH: "Activated Charcoal (ถ่านกัมมันต์)", nameLocal: "ถ่านกัมมันต์", ingredient: "Activated charcoal", dosageKR: "2~4정, 식후", dosageVN: "2~4 viên, sau ăn", dosageUS: "2~4 tablets, after meals", dosageTH: "2~4 เม็ด หลังอาหาร", precautionKR: "다른 약과 2시간 간격", precautionVN: "Cách thuốc khác 2 giờ", precautionUS: "2 hours apart from other meds", precautionTH: "ห่างจากยาอื่น 2 ชั่วโมง" },
  domperidone_th: { id: "domperidone_th", nameKR: "돔페리돈 (모틸리움)", nameVN: "Motilium", nameUS: "Motilium", nameTH: "Motilium (Domperidone)", ingredient: "Domperidone 10mg", dosageKR: "1정, 식전 하루 3회", dosageVN: "1 viên, trước ăn 3 lần/ngày", dosageUS: "1 tablet, before meals 3x/day", dosageTH: "1 เม็ด ก่อนอาหาร 3 ครั้ง/วัน", precautionKR: "QT 연장 위험, 7일 이상 연속 주의, 간부전 금기", precautionVN: "Nguy cơ QT kéo dài, không quá 7 ngày", precautionUS: "QT prolongation risk, max 7 days, liver failure contraindicated", precautionTH: "เสี่ยง QT prolongation ห้ามใช้เกิน 7 วัน" },
  navamed_th: { id: "navamed_th", nameKR: "나바메드", nameVN: "Navamed", nameUS: "Navamed", nameTH: "Navamed (นาวาเมด)", nameLocal: "นาวาเมด", pronKR: "나-와-멧", pronEN: "nah-wah-med", ingredient: "Dimenhydrinate 50mg", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước", dosageUS: "1 tablet, 30 min before travel", dosageTH: "1 เม็ด 30 นาทีก่อนเดินทาง", precautionKR: "편의점 구매 가능 (5바트), 졸음 유발", precautionVN: "Mua tại 7-Eleven (5 Baht)", precautionUS: "Available at 7-Eleven (5 Baht), causes drowsiness", precautionTH: "ซื้อได้ที่ 7-Eleven (5 บาท) ทำให้ง่วง" },
  salonpas_th: { id: "salonpas_th", nameKR: "살론파스", nameVN: "Salonpas", nameUS: "Salonpas", nameTH: "Salonpas", ingredient: "Methyl salicylate + Menthol", dosageKR: "1매, 8시간 부착", dosageVN: "1 miếng, dán 8 giờ", dosageUS: "1 patch, apply 8 hours", dosageTH: "1 แผ่น แปะ 8 ชั่วโมง", precautionKR: "상처에 붙이지 말 것", precautionVN: "Không dán lên vết thương", precautionUS: "Do not apply on wounds", precautionTH: "ห้ามแปะบนแผล" },
  tiger_balm_th: { id: "tiger_balm_th", nameKR: "타이거 밤", nameVN: "Tiger Balm", nameUS: "Tiger Balm", nameTH: "Tiger Balm (ยาหม่องตราเสือ)", nameLocal: "ยาหม่องตราเสือ", pronKR: "야-몽 뜨라-쓰아", pronEN: "yah-mong trah-suea", ingredient: "Camphor + Menthol", dosageKR: "아픈 부위에 도포", dosageVN: "Thoa vùng đau", dosageUS: "Apply to affected area", dosageTH: "ทาบริเวณที่ปวด", precautionKR: "빨간색(온열)/흰색(쿨링), 눈 주변 금지", precautionVN: "Đỏ (nóng)/Trắng (mát)", precautionUS: "Red (warming)/White (cooling), avoid eyes", precautionTH: "แดง(ร้อน)/ขาว(เย็น) หลีกเลี่ยงรอบดวงตา" },
  yellow_balm_th: { id: "yellow_balm_th", nameKR: "옐로우 밤", nameVN: "Yellow Balm", nameUS: "Yellow Balm", nameTH: "Yellow Balm (ยาหม่องเหลือง)", nameLocal: "ยาหม่องเหลือง", pronKR: "야-몽 르앙", pronEN: "yah-mong leuang", ingredient: "Ginger + Kaffir lime (태국 전통)", dosageKR: "아픈 부위에 도포", dosageVN: "Thoa vùng đau", dosageUS: "Apply to affected area", dosageTH: "ทาบริเวณที่ปวด", precautionKR: "태국 전통 약, 자연 성분", precautionVN: "Thuốc truyền thống Thái", precautionUS: "Thai traditional medicine", precautionTH: "ยาแผนไทย สมุนไพร" },
  counterpain_th: { id: "counterpain_th", nameKR: "카운터페인", nameVN: "Counterpain", nameUS: "Counterpain", nameTH: "Counterpain (เคาเตอร์เพน)", nameLocal: "เคาเตอร์เพน", pronKR: "카우-떠-뻰", pronEN: "coun-ter-pain", ingredient: "Methyl salicylate + Menthol + Eugenol", dosageKR: "하루 3~4회 도포", dosageVN: "Thoa 3~4 lần/ngày", dosageUS: "Apply 3~4 times/day", dosageTH: "ทา 3~4 ครั้ง/วัน", precautionKR: "태국 대표 근육통 연고", precautionVN: "Kem giảm đau cơ nổi tiếng Thái", precautionUS: "Iconic Thai muscle pain cream", precautionTH: "ยาทาแก้ปวดกล้ามเนื้อยอดนิยม" },
  voltaren_gel_th: { id: "voltaren_gel_th", nameKR: "볼타렌 젤", nameVN: "Voltaren Gel", nameUS: "Voltaren Gel", nameTH: "Voltaren Gel", ingredient: "Diclofenac 1%", dosageKR: "하루 3~4회 도포", dosageVN: "Thoa 3~4 lần/ngày", dosageUS: "Apply 3~4 times/day", dosageTH: "ทา 3~4 ครั้ง/วัน", precautionKR: "15세 미만 금기, 햇빛 노출 금지", precautionVN: "Cấm dưới 15 tuổi", precautionUS: "Not for under 15, avoid sun on area", precautionTH: "ห้ามในเด็กต่ำกว่า 15 ปี หลีกเลี่ยงแสงแดด" },
  siang_pure_th: { id: "siang_pure_th", nameKR: "씨앙 퓨어 오일", nameVN: "Siang Pure Oil", nameUS: "Siang Pure Oil", nameTH: "Siang Pure Oil (เซียงเพียว)", nameLocal: "น้ำมันเซียงเพียว", pronKR: "씨앙-삐여우", pronEN: "see-ang pee-ow", ingredient: "Menthol + Camphor + Peppermint oil", dosageKR: "물린 부위나 관자놀이에 소량 도포", dosageVN: "Thoa ít lên vùng bị cắn hoặc thái dương", dosageUS: "Apply small amount to bite or temples", dosageTH: "ทาเล็กน้อยบริเวณที่ถูกกัดหรือขมับ", precautionKR: "태국 만능 오일, 벌레물림/두통/멀미에", precautionVN: "Dầu đa năng Thái", precautionUS: "Thai multi-purpose oil for bites/headache/motion sickness", precautionTH: "น้ำมันอเนกประสงค์ แก้ยุงกัด/ปวดหัว/เมารถ" },
  calamine_th: { id: "calamine_th", nameKR: "칼라민 로션", nameVN: "Calamine Lotion", nameUS: "Calamine Lotion", nameTH: "Calamine Lotion", ingredient: "Calamine + Zinc oxide", dosageKR: "가려운 부위에 도포", dosageVN: "Thoa vùng ngứa", dosageUS: "Apply to itchy area", dosageTH: "ทาบริเวณที่คัน", precautionKR: "눈/점막 피할 것", precautionVN: "Tránh mắt/niêm mạc", precautionUS: "Avoid eyes/mucous membranes", precautionTH: "หลีกเลี่ยงตา/เยื่อเมือก" },
  hydrocortisone_th: { id: "hydrocortisone_th", nameKR: "히드로코르티손 크림", nameVN: "Hydrocortisone cream", nameUS: "Hydrocortisone cream 1%", nameTH: "Hydrocortisone cream 1%", ingredient: "Hydrocortisone 1%", dosageKR: "하루 2~3회 얇게 도포", dosageVN: "Thoa mỏng 2~3 lần/ngày", dosageUS: "Apply thin layer 2~3 times/day", dosageTH: "ทาบางๆ 2~3 ครั้ง/วัน", precautionKR: "7일 이상 사용 금지, 스테로이드", precautionVN: "Không dùng quá 7 ngày", precautionUS: "Do not use more than 7 days, steroid", precautionTH: "ห้ามใช้เกิน 7 วัน สเตียรอยด์" },
  visine_th: { id: "visine_th", nameKR: "바이신", nameVN: "Visine", nameUS: "Visine Original", nameTH: "Visine Original", ingredient: "Tetrahydrozoline", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1~2 giọt, 3~4 lần/ngày", dosageUS: "1~2 drops, 3~4 times/day", dosageTH: "1~2 หยด 3~4 ครั้ง/วัน", precautionKR: "3일 초과 사용 금지", precautionVN: "Không dùng quá 3 ngày", precautionUS: "Do not use more than 3 days", precautionTH: "ห้ามใช้เกิน 3 วัน" },
  systane_th: { id: "systane_th", nameKR: "시스테인", nameVN: "Systane", nameUS: "Systane", nameTH: "Systane", ingredient: "Polyethylene glycol", dosageKR: "1~2방울, 수시로", dosageVN: "1~2 giọt, khi cần", dosageUS: "1~2 drops, as needed", dosageTH: "1~2 หยด เมื่อต้องการ", precautionKR: "인공눈물, 렌즈 착용 중 사용 가능", precautionVN: "Nước mắt nhân tạo", precautionUS: "Artificial tears, can use with contacts", precautionTH: "น้ำตาเทียม ใช้กับคอนแทคเลนส์ได้" },
  kamistad_th: { id: "kamistad_th", nameKR: "카미스타드 겔", nameVN: "Kamistad gel", nameUS: "Kamistad gel", nameTH: "Kamistad gel", ingredient: "Lidocaine + Chamomile", dosageKR: "환부에 도포, 하루 3회", dosageVN: "Thoa vết loét, 3 lần/ngày", dosageUS: "Apply to ulcer, 3 times/day", dosageTH: "ทาแผล 3 ครั้ง/วัน", precautionKR: "국소마취 성분 포함", precautionVN: "Chứa thuốc tê", precautionUS: "Contains local anesthetic", precautionTH: "มียาชาเฉพาะที่" },
  oramed_th: { id: "oramed_th", nameKR: "오라메드", nameVN: "Oramed", nameUS: "Oramed", nameTH: "Oramed", ingredient: "Triamcinolone acetonide", dosageKR: "환부에 도포, 하루 2~3회", dosageVN: "Thoa vết loét, 2~3 lần/ngày", dosageUS: "Apply to ulcer, 2~3 times/day", dosageTH: "ทาแผล 2~3 ครั้ง/วัน", precautionKR: "스테로이드 성분", precautionVN: "Thành phần steroid", precautionUS: "Steroid component", precautionTH: "มีสเตียรอยด์" },
  dulcolax_th: { id: "dulcolax_th", nameKR: "둘코락스", nameVN: "Dulcolax", nameUS: "Dulcolax", nameTH: "Dulcolax", ingredient: "Bisacodyl 5mg", dosageKR: "1~2정, 취침 전", dosageVN: "1~2 viên, trước ngủ", dosageUS: "1~2 tablets, at bedtime", dosageTH: "1~2 เม็ด ก่อนนอน", precautionKR: "장기 복용 금지", precautionVN: "Không dùng lâu dài", precautionUS: "Do not use long-term", precautionTH: "ห้ามใช้ระยะยาว" },
  lactulose_th: { id: "lactulose_th", nameKR: "락툴로스 시럽", nameVN: "Lactulose Syrup", nameUS: "Lactulose Syrup", nameTH: "Lactulose Syrup", ingredient: "Lactulose", dosageKR: "15~30ml, 하루 1회", dosageVN: "15~30ml, 1 lần/ngày", dosageUS: "15~30ml, once daily", dosageTH: "15~30 มล. วันละ 1 ครั้ง", precautionKR: "부작용 적고 안전", precautionVN: "Ít tác dụng phụ, an toàn", precautionUS: "Few side effects, safe", precautionTH: "ผลข้างเคียงน้อย ปลอดภัย" },
  betadine_th: { id: "betadine_th", nameKR: "베타딘", nameVN: "Betadine", nameUS: "Betadine", nameTH: "Betadine", ingredient: "Povidone-iodine", dosageKR: "상처 소독 후 거즈", dosageVN: "Sát trùng vết thương", dosageUS: "Disinfect wound then bandage", dosageTH: "ฆ่าเชื้อแผลแล้วปิดผ้าก๊อซ", precautionKR: "요오드 알레르기 주의", precautionVN: "Cẩn thận dị ứng iốt", precautionUS: "Caution with iodine allergy", precautionTH: "ระวังแพ้ไอโอดีน" },
  fucidin_th: { id: "fucidin_th", nameKR: "후시딘 크림", nameVN: "Fucidin cream", nameUS: "Fucidin cream", nameTH: "Fucidin cream", ingredient: "Fusidic acid 2%", dosageKR: "하루 2~3회 도포", dosageVN: "Thoa 2~3 lần/ngày", dosageUS: "Apply 2~3 times/day", dosageTH: "ทา 2~3 ครั้ง/วัน", precautionKR: "항생제 성분, 감염 방지", precautionVN: "Kháng sinh, chống nhiễm trùng", precautionUS: "Antibiotic, prevents infection", precautionTH: "ยาปฏิชีวนะ ป้องกันการติดเชื้อ" },
  benadryl_sleep_th: { id: "benadryl_sleep_th", nameKR: "베나드릴 (수면)", nameVN: "Benadryl", nameUS: "Benadryl", nameTH: "Benadryl (Diphenhydramine)", ingredient: "Diphenhydramine 25mg", dosageKR: "1~2정, 취침 전", dosageVN: "1~2 viên, trước ngủ", dosageUS: "1~2 tablets, at bedtime", dosageTH: "1~2 เม็ด ก่อนนอน", precautionKR: "7일 이상 연속 금지, 강한 졸음", precautionVN: "Không dùng quá 7 ngày, rất buồn ngủ", precautionUS: "Max 7 days, significant drowsiness", precautionTH: "ห้ามใช้เกิน 7 วัน ง่วงมาก" },
  canesten_th: { id: "canesten_th", nameKR: "카네스텐", nameVN: "Canesten", nameUS: "Canesten", nameTH: "Canesten", ingredient: "Clotrimazole 1%", dosageKR: "하루 2~3회 도포, 4주", dosageVN: "Thoa 2~3 lần/ngày, 4 tuần", dosageUS: "Apply 2~3 times/day, 4 weeks", dosageTH: "ทา 2~3 ครั้ง/วัน 4 สัปดาห์", precautionKR: "꾸준히 사용해야 효과", precautionVN: "Dùng đều đặn để có hiệu quả", precautionUS: "Use consistently for effect", precautionTH: "ใช้สม่ำเสมอเพื่อผลลัพธ์" },
  lamisil_th: { id: "lamisil_th", nameKR: "라미실", nameVN: "Lamisil", nameUS: "Lamisil", nameTH: "Lamisil", ingredient: "Terbinafine 1%", dosageKR: "하루 1~2회 도포, 2~4주", dosageVN: "Thoa 1~2 lần/ngày, 2~4 tuần", dosageUS: "Apply 1~2 times/day, 2~4 weeks", dosageTH: "ทา 1~2 ครั้ง/วัน 2~4 สัปดาห์", precautionKR: "증상 없어져도 완치까지 사용", precautionVN: "Dùng đến hết dù hết triệu chứng", precautionUS: "Continue until cured even if symptoms gone", precautionTH: "ใช้ต่อจนหายแม้อาการจะหายแล้ว" },
  benzac_th: { id: "benzac_th", nameKR: "벤작 AC", nameVN: "Benzac AC", nameUS: "Benzac AC", nameTH: "Benzac AC", ingredient: "Benzoyl peroxide 2.5%", dosageKR: "세안 후 하루 1~2회 도포", dosageVN: "Thoa sau rửa mặt, 1~2 lần/ngày", dosageUS: "Apply after cleansing, 1~2 times/day", dosageTH: "ทาหลังล้างหน้า 1~2 ครั้ง/วัน", precautionKR: "건조/자극 가능, 소량부터 시작", precautionVN: "Có thể khô/kích ứng, bắt đầu từ ít", precautionUS: "May cause dryness/irritation, start small", precautionTH: "อาจทำให้แห้ง/ระคายเคือง เริ่มจากน้อย" },
  clinda_m_th: { id: "clinda_m_th", nameKR: "클린다-M 겔", nameVN: "Clinda-M gel", nameUS: "Clinda-M gel", nameTH: "Clinda-M gel", ingredient: "Clindamycin 1%", dosageKR: "환부에 하루 2회 도포", dosageVN: "Thoa 2 lần/ngày", dosageUS: "Apply twice daily", dosageTH: "ทา 2 ครั้ง/วัน", precautionKR: "항생제 성분, 약사 상담 권장. 내성 주의", precautionVN: "Kháng sinh, nên hỏi dược sĩ", precautionUS: "Antibiotic, consult pharmacist. Resistance risk", precautionTH: "ยาปฏิชีวนะ ควรปรึกษาเภสัชกร ระวังดื้อยา" },
  stugeron_th: { id: "stugeron_th", nameKR: "스투제론", nameVN: "Stugeron", nameUS: "Stugeron", nameTH: "Stugeron (สทูเจรอน)", nameLocal: "สทูเจรอน", pronKR: "싸-뚜-져-론", pronEN: "stu-jer-on", ingredient: "Cinnarizine 25mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageTH: "1 เม็ด 3 ครั้ง/วัน", precautionKR: "졸음 유발. 고령자 장기 복용 시 파킨슨 유사 부작용 위험", precautionVN: "Gây buồn ngủ. Người cao tuổi cẩn thận Parkinson", precautionUS: "Drowsiness. Elderly: Parkinsonism risk with long-term use", precautionTH: "ทำให้ง่วง ผู้สูงอายุใช้นานเสี่ยงพาร์กินสัน" },
  daflon_th: { id: "daflon_th", nameKR: "다플론", nameVN: "Daflon", nameUS: "Daflon", nameTH: "Daflon", ingredient: "Diosmin + Hesperidin", dosageKR: "500mg: 1정 하루 2회(아침/저녁) 또는 1000mg: 1정 하루 1회", dosageVN: "500mg: 1 viên 2 lần/ngày hoặc 1000mg: 1 viên/ngày", dosageUS: "500mg: 1 tab twice daily or 1000mg: 1 tab daily", dosageTH: "500mg: 1 เม็ด 2 ครั้ง/วัน หรือ 1000mg: 1 เม็ด/วัน", precautionKR: "정맥순환 개선", precautionVN: "Cải thiện tuần hoàn tĩnh mạch", precautionUS: "Improves venous circulation", precautionTH: "ปรับปรุงการไหลเวียนเลือดดำ" },
  chloramphenicol_eye_th: { id: "chloramphenicol_eye_th", nameKR: "클로람페니콜 점안액", nameVN: "Chloramphenicol eye drops", nameUS: "Chloramphenicol eye drops", nameTH: "Chloramphenicol eye drops", ingredient: "Chloramphenicol", dosageKR: "1~2방울, 하루 4회", dosageVN: "1~2 giọt, 4 lần/ngày", dosageUS: "1~2 drops, 4 times/day", dosageTH: "1~2 หยด 4 ครั้ง/วัน", precautionKR: "⚠️ 골수 독성(재생불량성 빈혈) 위험. 장기 사용 금지. 렌즈 빼고 사용. 개선 없으면 즉시 안과", precautionVN: "⚠️ Nguy cơ độc tủy xương. Không dùng lâu dài. Tháo kính áp tròng", precautionUS: "⚠️ Bone marrow toxicity risk. No long-term use. Remove contacts", precautionTH: "⚠️ เสี่ยงพิษไขกระดูก ห้ามใช้ระยะยาว ถอดคอนแทคเลนส์" },
  poysian_th: { id: "poysian_th", nameKR: "뽀이씨안 흡입기", nameVN: "Poy-Sian", nameUS: "Poy-Sian Inhaler", nameTH: "Poy-Sian (ยาดมโพยเซียน)", nameLocal: "ยาดมโพยเซียน", pronKR: "뽀이-씨안", pronEN: "poy-see-an", ingredient: "Menthol + Camphor + Borneol", dosageKR: "코에 대고 흡입, 수시로", dosageVN: "Hít qua mũi, khi cần", dosageUS: "Inhale through nose, as needed", dosageTH: "สูดทางจมูก เมื่อต้องการ", precautionKR: "태국 문화 대표 아이템, 편의점 10~20 THB", precautionVN: "Biểu tượng văn hóa Thái, 10~20 THB tại 7-Eleven", precautionUS: "Iconic Thai product, 10~20 THB at convenience stores", precautionTH: "สินค้าไทยยอดนิยม 10~20 บาท ที่ร้านสะดวกซื้อ" },
  fa_talay_jone_th: { id: "fa_talay_jone_th", nameKR: "파 탈라이 존 (안드로그라피스)", nameVN: "Fah Talai Jone", nameUS: "Andrographis Capsules", nameTH: "ฟ้าทะลายโจร", nameLocal: "ฟ้าทะลายโจร", pronKR: "파-타-라이-쫀", pronEN: "fah-tah-lai-jone", ingredient: "Andrographis paniculata extract", dosageKR: "2~3캡슐, 하루 3~4회, 감기 초기에", dosageVN: "2~3 viên, 3~4 lần/ngày, khi cảm lạnh mới", dosageUS: "2~3 capsules, 3~4 times/day, at onset of cold", dosageTH: "2~3 แคปซูล 3~4 ครั้ง/วัน เมื่อเริ่มเป็นหวัด", precautionKR: "태국 전통 허브약, 초기 감기에 효과, 쓴맛", precautionVN: "Thuốc thảo dược Thái, hiệu quả khi cảm sớm", precautionUS: "Thai herbal medicine, effective early cold, bitter taste", precautionTH: "สมุนไพรไทย ได้ผลเมื่อเป็นหวัดใหม่ๆ รสขม" },
  // === Indonesia (ID) Drugs ===
  panadol_id: { id: "panadol_id", nameKR: "파나돌", nameVN: "Panadol", nameUS: "Panadol", nameID: "Panadol", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1~2 viên, cách 4~6 giờ", dosageUS: "1-2 tablets, every 4-6 hours", dosageID: "1~2 tablet, setiap 4~6 jam", precautionKR: "하루 최대 8정(4g). 음주 시 간독성. 🦟 뎅기열 의심 시 파라세타몰만 사용", precautionVN: "Tối đa 8 viên/ngày. Nguy cơ gan khi uống rượu", precautionUS: "Max 8 tabs/day (4g). Liver risk with alcohol", precautionID: "Maks 8 tablet/hari (4g). Risiko hati jika minum alkohol. 🦟 Jika demam berdarah, hanya paracetamol" },
  bodrex_id: { id: "bodrex_id", nameKR: "보드렉스", nameVN: "Bodrex", nameUS: "Bodrex", nameID: "Bodrex", nameLocal: "Bodrex", pronKR: "보드렉스", pronEN: "bod-reks", ingredient: "Paracetamol 600mg + Caffeine 50mg", dosageKR: "1정, 하루 3~4회", dosageVN: "1 viên, 3~4 lần/ngày", dosageUS: "1 tablet, 3-4 times/day", dosageID: "1 tablet, 3~4 kali/hari", precautionKR: "하루 최대 8정. 카페인 함유→불면 가능. 🦟 뎅기열 의심 시 Panadol 사용 권장", precautionVN: "Tối đa 8 viên/ngày. Chứa caffein", precautionUS: "Max 8 tabs/day. Contains caffeine", precautionID: "Maks 8 tablet/hari. Mengandung kafein. 🦟 Demam berdarah: pakai Panadol saja" },
  bodrex_extra_id: { id: "bodrex_extra_id", nameKR: "보드렉스 엑스트라", nameVN: "Bodrex Extra", nameUS: "Bodrex Extra", nameID: "Bodrex Extra", ingredient: "Paracetamol 350mg + Ibuprofen 200mg + Caffeine 50mg", dosageKR: "1~2정, 하루 3~4회, 식후", dosageVN: "1~2 viên, 3~4 lần/ngày, sau ăn", dosageUS: "1-2 tabs, 3-4 times/day, after meals", dosageID: "1~2 tablet, 3~4 kali/hari, sesudah makan", precautionKR: "🦟 뎅기열 의심 시 절대 금지(이부프로펜). 공복 금지. 임신 20주 이후 금기", precautionVN: "🦟 Cấm khi nghi sốt xuất huyết. Không uống lúc đói", precautionUS: "🦟 NEVER with suspected dengue. Not on empty stomach", precautionID: "🦟 DILARANG jika dicurigai demam berdarah. Jangan saat perut kosong" },
  paramex_id: { id: "paramex_id", nameKR: "파라멕스", nameVN: "Paramex", nameUS: "Paramex", nameID: "Paramex", nameLocal: "Paramex", pronKR: "파라멕스", pronEN: "pa-ra-meks", ingredient: "Paracetamol 250mg + Propyphenazone 150mg + Caffeine 50mg + Dexchlorpheniramine 1mg", dosageKR: "1정, 하루 2~3회, 식후", dosageVN: "1 viên, 2~3 lần/ngày, sau ăn", dosageUS: "1 tab, 2-3 times/day, after meals", dosageID: "1 tablet, 2~3 kali/hari, sesudah makan", precautionKR: "졸음 유발→운전 금지. 피린계 알레르기 금기. 🦟 뎅기열 의심 시 금기(Propyphenazone=NSAID)", precautionVN: "Gây buồn ngủ. Dị ứng pyrin cấm dùng", precautionUS: "Drowsiness. Pyrazolone allergy contraindicated", precautionID: "Mengantuk→jangan mengemudi. Alergi pirin dilarang. 🦟 Dilarang jika demam berdarah" },
  procold_id: { id: "procold_id", nameKR: "프로콜드", nameVN: "Procold", nameUS: "Procold", nameID: "Procold", nameLocal: "Procold", pronKR: "프로콜드", pronEN: "pro-cold", ingredient: "Paracetamol 500mg + Pseudoephedrine 30mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tablet, 3 times/day", dosageID: "1 tablet, 3 kali/hari", precautionKR: "졸음→운전 금지. 고혈압·당뇨·갑상선·녹내장·전립선비대 금기. 다른 파라세타몰 약 병용 금지", precautionVN: "Gây buồn ngủ. Cao huyết áp cẩn thận", precautionUS: "Drowsy. Hypertension/diabetes/thyroid/glaucoma caution", precautionID: "Mengantuk→jangan mengemudi. Hipertensi/diabetes/tiroid/glaukoma dilarang" },
  decolgen_id: { id: "decolgen_id", nameKR: "데콜겐 포르테", nameVN: "Decolgen Forte", nameUS: "Decolgen Forte", nameID: "Decolgen Forte", ingredient: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg", dosageKR: "1정, 하루 3~4회", dosageVN: "1 viên, 3~4 lần/ngày", dosageUS: "1 tab, 3-4 times/day", dosageID: "1 tablet, 3~4 kali/hari", precautionKR: "졸음→운전 금지. 다른 파라세타몰 약 병용 금지. 고혈압 주의", precautionVN: "Gây buồn ngủ. Không dùng chung paracetamol khác", precautionUS: "Drowsy. No other paracetamol products", precautionID: "Mengantuk. Jangan gabung obat paracetamol lain" },
  obh_combi_id: { id: "obh_combi_id", nameKR: "OBH 콤비", nameVN: "OBH Combi", nameUS: "OBH Combi", nameID: "OBH Combi", nameLocal: "OBH Combi", pronKR: "오베하 콤비", pronEN: "oh-beh-ha com-bee", ingredient: "Dextromethorphan 15mg + Guaifenesin 150mg + Bromhexine 10mg (per 15ml)", dosageKR: "성인 15ml, 하루 3회", dosageVN: "Người lớn 15ml, 3 lần/ngày", dosageUS: "Adults 15ml, 3 times/day", dosageID: "Dewasa 15ml, 3 kali/hari", precautionKR: "졸음 가능. MAO 억제제 병용 금기", precautionVN: "Có thể gây buồn ngủ. Cấm dùng với MAOI", precautionUS: "May cause drowsiness. No MAOIs", precautionID: "Bisa mengantuk. Jangan dengan MAOI" },
  woods_id: { id: "woods_id", nameKR: "우즈 기침 시럽", nameVN: "Woods' Cough Syrup", nameUS: "Woods' Cough Syrup", nameID: "Woods' Cough Syrup", ingredient: "Dextromethorphan (blue) or Bromhexine+Guaifenesin (green)", dosageKR: "5~10ml, 4~6시간 간격", dosageVN: "5~10ml, cách 4~6 giờ", dosageUS: "5-10ml, every 4-6 hours", dosageID: "5~10ml, setiap 4~6 jam", precautionKR: "파란색=마른기침, 초록색=가래기침. 혼동 금지", precautionVN: "Xanh dương=ho khan, xanh lá=ho đờm", precautionUS: "Blue=dry cough, Green=wet cough", precautionID: "Biru=batuk kering, Hijau=batuk berdahak" },
  promag_id: { id: "promag_id", nameKR: "프로막", nameVN: "Promag", nameUS: "Promag", nameID: "Promag", nameLocal: "Promag", pronKR: "프로막", pronEN: "pro-mag", ingredient: "Hydrotalcite 200mg + Mg hydroxide 150mg + Simethicone 50mg", dosageKR: "1~2정 씹어서, 식후 1시간 및 취침 전", dosageVN: "1~2 viên nhai, 1 giờ sau ăn và trước ngủ", dosageUS: "1-2 chewable tabs, 1hr after meals & bedtime", dosageID: "1~2 tablet kunyah, 1 jam setelah makan & sebelum tidur", precautionKR: "신장질환 금기. 항생제와 2시간 간격. 14일 이상 시 의사 상담", precautionVN: "Bệnh thận cấm. Cách kháng sinh 2 giờ", precautionUS: "Kidney disease contraindicated. Space antibiotics 2hrs", precautionID: "Penyakit ginjal dilarang. Jarak 2 jam dari antibiotik" },
  mylanta_id: { id: "mylanta_id", nameKR: "밀란타", nameVN: "Mylanta", nameUS: "Mylanta", nameID: "Mylanta", ingredient: "Al hydroxide 200mg + Mg hydroxide 200mg + Simethicone 20mg", dosageKR: "1~2정 또는 시럽 10~15ml, 식후 1시간", dosageVN: "1~2 viên hoặc 10~15ml, 1 giờ sau ăn", dosageUS: "1-2 tabs or 10-15ml syrup, 1hr after meals", dosageID: "1~2 tablet atau 10~15ml sirup, 1 jam setelah makan", precautionKR: "신장질환 금기. 다른 약과 2시간 간격", precautionVN: "Bệnh thận cấm. Cách thuốc khác 2 giờ", precautionUS: "Kidney disease contraindicated. Space other meds 2hrs", precautionID: "Penyakit ginjal dilarang. Jarak 2 jam dari obat lain" },
  diatabs_id: { id: "diatabs_id", nameKR: "다이아탭스", nameVN: "New Diatabs", nameUS: "New Diatabs", nameID: "New Diatabs", nameLocal: "New Diatabs", pronKR: "다이아탭스", pronEN: "dai-a-tabs", ingredient: "Activated Attapulgite 600mg", dosageKR: "2정, 설사 후마다. 최대 하루 12정", dosageVN: "2 viên sau mỗi lần tiêu chảy. Tối đa 12 viên/ngày", dosageUS: "2 tabs after each loose stool. Max 12/day", dosageID: "2 tablet setiap diare. Maks 12 tablet/hari", precautionKR: "다른 약과 2~3시간 간격. 2일 이상 또는 고열 시 의사 진료", precautionVN: "Cách thuốc khác 2~3 giờ. Trên 2 ngày hoặc sốt cao→bác sĩ", precautionUS: "Space other meds 2-3hrs. Over 2 days or fever→doctor", precautionID: "Jarak 2~3 jam dari obat lain. Lebih 2 hari atau demam tinggi→dokter" },
  oralit_id: { id: "oralit_id", nameKR: "오랄릿 (ORS)", nameVN: "Oralit (ORS)", nameUS: "Oralit (ORS)", nameID: "Oralit", nameLocal: "Oralit", pronKR: "오랄릿", pronEN: "o-ra-lit", ingredient: "Elektrolit (Na, K, Cl, Citrate, Glucose)", dosageKR: "1포, 물 200ml에 타서 소량씩", dosageVN: "1 gói pha 200ml nước, uống từng chút", dosageUS: "1 sachet in 200ml water, sip frequently", dosageID: "1 sachet dalam 200ml air, minum sedikit-sedikit", precautionKR: "끓인 물 또는 생수. 제조 후 24시간 내 사용", precautionVN: "Nước đun sôi hoặc đóng chai. Dùng trong 24 giờ", precautionUS: "Boiled or bottled water. Use within 24hrs", precautionID: "Air matang atau kemasan. Gunakan dalam 24 jam" },
  actifed_id: { id: "actifed_id", nameKR: "액티피드", nameVN: "Actifed", nameUS: "Actifed", nameID: "Actifed/Rhinofed", ingredient: "Pseudoephedrine 60mg + Triprolidine 2.5mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2~3 lần/ngày", dosageUS: "1 tab, 2-3 times/day", dosageID: "1 tablet, 2~3 kali/hari", precautionKR: "졸음→운전 금지. 고혈압·심장·갑상선·녹내장·전립선비대 금기", precautionVN: "Gây buồn ngủ. Cao huyết áp/tim cẩn thận", precautionUS: "Drowsy. Hypertension/heart/thyroid/glaucoma caution", precautionID: "Mengantuk→jangan mengemudi. Hipertensi/jantung/tiroid dilarang" },
  cetirizine_id: { id: "cetirizine_id", nameKR: "세티리진", nameVN: "Cetirizine", nameUS: "Cetirizine", nameID: "Cetirizine", ingredient: "Cetirizine HCl 10mg", dosageKR: "1정, 하루 1회(취침 전)", dosageVN: "1 viên, 1 lần/ngày (trước ngủ)", dosageUS: "1 tab, once daily (bedtime)", dosageID: "1 tablet, 1 kali/hari (sebelum tidur)", precautionKR: "졸음 가능. 신장질환 시 용량 조절", precautionVN: "Có thể buồn ngủ. Bệnh thận điều chỉnh liều", precautionUS: "May cause drowsiness. Adjust dose for kidney disease", precautionID: "Bisa mengantuk. Penyakit ginjal perlu penyesuaian dosis" },
  loratadine_id: { id: "loratadine_id", nameKR: "로라타딘", nameVN: "Loratadine", nameUS: "Loratadine", nameID: "Loratadine", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageID: "1 tablet, 1 kali/hari", precautionKR: "졸음 매우 적음. 간질환 시 격일 복용", precautionVN: "Ít gây buồn ngủ. Bệnh gan uống cách ngày", precautionUS: "Very low drowsiness. Liver disease: every other day", precautionID: "Sangat sedikit mengantuk. Penyakit hati: minum selang hari" },
  antimo_id: { id: "antimo_id", nameKR: "안티모", nameVN: "Antimo", nameUS: "Antimo", nameID: "Antimo", nameLocal: "Antimo", pronKR: "안티모", pronEN: "an-tee-mo", ingredient: "Dimenhydrinate 50mg", dosageKR: "1정, 출발 30분 전", dosageVN: "1 viên, 30 phút trước khi đi", dosageUS: "1 tab, 30min before departure", dosageID: "1 tablet, 30 menit sebelum berangkat", precautionKR: "졸음→운전 금지. 녹내장·전립선비대 금기", precautionVN: "Gây buồn ngủ. Glôcôm/phì đại tuyến tiền liệt cấm", precautionUS: "Drowsy. Glaucoma/prostate enlargement contraindicated", precautionID: "Mengantuk→jangan mengemudi. Glaukoma/prostat dilarang" },
  salonpas_id: { id: "salonpas_id", nameKR: "살론파스", nameVN: "Salonpas", nameUS: "Salonpas", nameID: "Salonpas", ingredient: "Methyl salicylate + Menthol", dosageKR: "패치 부착, 8~12시간", dosageVN: "Dán miếng, 8~12 giờ", dosageUS: "Apply patch, 8-12 hours", dosageID: "Tempel koyo, 8~12 jam", precautionKR: "상처 부위 금지. 가열 패드 병용 금지. 아스피린 알레르기 주의", precautionVN: "Không dán lên vết thương. Cẩn thận dị ứng aspirin", precautionUS: "Not on wounds. No heat pads. Aspirin allergy caution", precautionID: "Jangan di luka. Jangan dengan bantalan panas. Hati-hati alergi aspirin" },
  voltaren_id: { id: "voltaren_id", nameKR: "볼타렌 겔", nameVN: "Voltaren Gel", nameUS: "Voltaren Gel", nameID: "Voltaren Gel", ingredient: "Diclofenac sodium 1%", dosageKR: "하루 3~4회 도포", dosageVN: "Thoa 3~4 lần/ngày", dosageUS: "Apply 3-4 times/day", dosageID: "Oleskan 3~4 kali/hari", precautionKR: "도포 부위 햇빛 주의(광과민성). 임신 30주 이후 금기", precautionVN: "Tránh nắng vùng thoa. Cấm sau 30 tuần thai", precautionUS: "Sun sensitivity on applied area. No after 30wks pregnancy", precautionID: "Hindari sinar matahari di area oles. Dilarang setelah kehamilan 30 minggu" },
  counterpain_id: { id: "counterpain_id", nameKR: "카운터페인", nameVN: "Counterpain", nameUS: "Counterpain", nameID: "Counterpain", ingredient: "Methyl salicylate 14% + Eugenol 1.2% + Menthol 6%", dosageKR: "아픈 부위에 하루 3~4회 도포", dosageVN: "Thoa vùng đau, 3~4 lần/ngày", dosageUS: "Apply to pain area, 3-4 times/day", dosageID: "Oleskan ke area nyeri, 3~4 kali/hari", precautionKR: "눈·점막 접촉 금지. 상처 부위 금지", precautionVN: "Không tiếp xúc mắt/niêm mạc/vết thương", precautionUS: "No eye/mucous membrane/wound contact", precautionID: "Jangan kontak mata/selaput lendir/luka" },
  kayu_putih_id: { id: "kayu_putih_id", nameKR: "카유 푸티 오일", nameVN: "Minyak Kayu Putih", nameUS: "Cajuput Oil", nameID: "Minyak Kayu Putih", nameLocal: "Minyak Kayu Putih", pronKR: "미냑 카유 푸티", pronEN: "min-yak ka-yu pu-tih", ingredient: "Cajuput oil (백리향·유칼립투스 계열 정유)", dosageKR: "아픈 부위에 마사지 또는 코에 흡입", dosageVN: "Xoa vùng đau hoặc hít qua mũi", dosageUS: "Massage on pain area or inhale", dosageID: "Pijat di area nyeri atau hirup lewat hidung", precautionKR: "2세 미만 흡입 금지. 눈·점막 금지", precautionVN: "Trẻ dưới 2 tuổi không hít. Tránh mắt", precautionUS: "No inhalation under 2yo. No eye contact", precautionID: "Bayi di bawah 2 tahun jangan dihirup. Hindari mata" },
  caladine_id: { id: "caladine_id", nameKR: "칼라딘", nameVN: "Caladine", nameUS: "Caladine", nameID: "Caladine", nameLocal: "Caladine", pronKR: "칼라딘", pronEN: "ca-la-dine", ingredient: "Calamine + Diphenhydramine", dosageKR: "환부에 하루 3~4회 도포", dosageVN: "Thoa vùng bị, 3~4 lần/ngày", dosageUS: "Apply to affected area, 3-4 times/day", dosageID: "Oleskan ke area yang terkena, 3~4 kali/hari", precautionKR: "넓은 면적 도포 시 졸음 가능. 2세 미만 금지", precautionVN: "Thoa diện rộng có thể buồn ngủ. Trẻ dưới 2 tuổi cấm", precautionUS: "Wide area application may cause drowsiness. No under 2yo", precautionID: "Area luas bisa mengantuk. Anak di bawah 2 tahun dilarang" },
  insto_id: { id: "insto_id", nameKR: "인스토", nameVN: "Insto", nameUS: "Insto", nameID: "Insto", nameLocal: "Insto", pronKR: "인스토", pronEN: "in-sto", ingredient: "Tetrahydrozoline HCl", dosageKR: "1~2방울, 하루 3~4회", dosageVN: "1~2 giọt, 3~4 lần/ngày", dosageUS: "1-2 drops, 3-4 times/day", dosageID: "1~2 tetes, 3~4 kali/hari", precautionKR: "3일 이상 연속 금지(반동성 충혈). 녹내장 금지. 렌즈 빼고 사용", precautionVN: "Không dùng quá 3 ngày. Glôcôm cấm. Tháo kính áp tròng", precautionUS: "No more than 3 days. Glaucoma prohibited. Remove contacts", precautionID: "Jangan lebih 3 hari. Glaukoma dilarang. Lepas kontak lensa" },
  kamillosan_id: { id: "kamillosan_id", nameKR: "카밀로산", nameVN: "Kamillosan", nameUS: "Kamillosan", nameID: "Kamillosan", ingredient: "Chamomile extract", dosageKR: "가글 또는 환부 도포, 하루 3~4회", dosageVN: "Súc miệng hoặc thoa, 3~4 lần/ngày", dosageUS: "Gargle or apply, 3-4 times/day", dosageID: "Kumur atau oles, 3~4 kali/hari", precautionKR: "국화과 알레르기 주의", precautionVN: "Cẩn thận dị ứng họ cúc", precautionUS: "Asteraceae allergy caution", precautionID: "Hati-hati alergi keluarga krisan" },
  albothyl_id: { id: "albothyl_id", nameKR: "알보틸", nameVN: "Albothyl", nameUS: "Albothyl", nameID: "Albothyl", ingredient: "Policresulen 36%", dosageKR: "면봉으로 환부에 도포", dosageVN: "Dùng tăm bông thoa vào vết loét", dosageUS: "Apply with cotton swab to ulcer", dosageID: "Oleskan dengan kapas ke sariawan", precautionKR: "따가움 강함. 정상 조직 접촉 주의. 임산부 금기", precautionVN: "Rất xót. Cẩn thận mô bình thường. Thai phụ cấm", precautionUS: "Very stinging. Avoid healthy tissue. Pregnancy contraindicated", precautionID: "Sangat perih. Hindari jaringan sehat. Ibu hamil dilarang" },
  dulcolax_id: { id: "dulcolax_id", nameKR: "둘코락스", nameVN: "Dulcolax", nameUS: "Dulcolax", nameID: "Dulcolax", ingredient: "Bisacodyl 5mg", dosageKR: "1~2정, 취침 전", dosageVN: "1~2 viên, trước ngủ", dosageUS: "1-2 tabs, at bedtime", dosageID: "1~2 tablet, sebelum tidur", precautionKR: "장기 복용 금지(장 의존성). 우유·제산제와 1시간 간격. 6세 미만 금지", precautionVN: "Không dùng lâu dài. Cách sữa/antacid 1 giờ. Trẻ dưới 6 tuổi cấm", precautionUS: "No long-term use. Space milk/antacids 1hr. No under 6yo", precautionID: "Jangan jangka panjang. Jarak 1 jam dari susu/antasida. Anak di bawah 6 tahun dilarang" },
  betadine_id: { id: "betadine_id", nameKR: "베타딘", nameVN: "Betadine", nameUS: "Betadine", nameID: "Betadine", ingredient: "Povidone-iodine 10%", dosageKR: "상처 소독, 적당량 도포", dosageVN: "Sát trùng vết thương, thoa vừa đủ", dosageUS: "Wound disinfection, apply adequately", dosageID: "Disinfeksi luka, oleskan secukupnya", precautionKR: "갑상선질환 주의(요오드). 요오드 알레르기 금기", precautionVN: "Bệnh tuyến giáp cẩn thận. Dị ứng iốt cấm", precautionUS: "Thyroid disease caution. Iodine allergy prohibited", precautionID: "Penyakit tiroid hati-hati. Alergi yodium dilarang" },
  bioplacenton_id: { id: "bioplacenton_id", nameKR: "바이오플라센톤", nameVN: "Bioplacenton", nameUS: "Bioplacenton", nameID: "Bioplacenton", nameLocal: "Bioplacenton", pronKR: "바이오플라센톤", pronEN: "bi-o-pla-sen-ton", ingredient: "Neomycin sulfate 0.5% + Placenta extract 10%", dosageKR: "환부에 하루 1~2회 도포", dosageVN: "Thoa 1~2 lần/ngày", dosageUS: "Apply 1-2 times/day", dosageID: "Oleskan 1~2 kali/hari", precautionKR: "네오마이신 알레르기 금기. 돼지 태반 유래(Halal 확인)", precautionVN: "Dị ứng neomycin cấm. Chiết xuất nhau thai heo", precautionUS: "Neomycin allergy prohibited. Contains porcine placenta extract", precautionID: "Alergi neomycin dilarang. Mengandung ekstrak plasenta babi (perhatikan Halal)" },
  enzyplex_id: { id: "enzyplex_id", nameKR: "엔지플렉스", nameVN: "Enzyplex", nameUS: "Enzyplex", nameID: "Enzyplex", nameLocal: "Enzyplex", pronKR: "엔지플렉스", pronEN: "en-zi-pleks", ingredient: "Pancreatin 200mg + Ox Bile Extract 50mg + Simethicone", dosageKR: "1~2정, 식후", dosageVN: "1~2 viên, sau ăn", dosageUS: "1-2 tabs, after meals", dosageID: "1~2 tablet, sesudah makan", precautionKR: "급성 췌장염 금기. 돼지 유래 성분 포함(종교 고려)", precautionVN: "Viêm tụy cấp cấm. Chứa thành phần từ heo", precautionUS: "Acute pancreatitis contraindicated. Contains porcine-derived ingredient", precautionID: "Pankreatitis akut dilarang. Mengandung bahan dari babi (pertimbangan halal)" },
  tolak_angin_id: { id: "tolak_angin_id", nameKR: "똘락 앙인", nameVN: "Tolak Angin", nameUS: "Tolak Angin", nameID: "Tolak Angin", nameLocal: "Tolak Angin", pronKR: "똘-락 아-응인", pronEN: "to-lak a-ngin", ingredient: "생강+민트+회향+정향+꿀 허브 복합", dosageKR: "3~4포, 하루", dosageVN: "3~4 gói/ngày", dosageUS: "3-4 sachets/day", dosageID: "3~4 sachet/hari", precautionKR: "임산부 금기. 당뇨환자 꿀(당분) 주의", precautionVN: "Thai phụ cấm. Tiểu đường cẩn thận (mật ong)", precautionUS: "Pregnancy contraindicated. Diabetics: honey/sugar content", precautionID: "Ibu hamil dilarang. Diabetes: hati-hati kandungan madu" },
  canesten_id: { id: "canesten_id", nameKR: "카네스텐", nameVN: "Canesten", nameUS: "Canesten", nameID: "Canesten", ingredient: "Clotrimazole 1%", dosageKR: "하루 2~3회, 4주 이상", dosageVN: "2~3 lần/ngày, trên 4 tuần", dosageUS: "2-3 times/day, 4+ weeks", dosageID: "2~3 kali/hari, minimal 4 minggu", precautionKR: "증상 없어져도 2주 더 사용(재발 방지). 점막 금지", precautionVN: "Dùng thêm 2 tuần sau hết triệu chứng. Tránh niêm mạc", precautionUS: "Continue 2 weeks after symptoms clear. No mucous membranes", precautionID: "Lanjutkan 2 minggu setelah gejala hilang. Hindari selaput lendir" },
  kalpanax_id: { id: "kalpanax_id", nameKR: "칼파낙스", nameVN: "Kalpanax", nameUS: "Kalpanax", nameID: "Kalpanax", nameLocal: "Kalpanax", pronKR: "칼파낙스", pronEN: "kal-pa-naks", ingredient: "Miconazole nitrate 2% + Salicylic acid 3%", dosageKR: "환부에 하루 2회, 2~4주", dosageVN: "Thoa 2 lần/ngày, 2~4 tuần", dosageUS: "Apply twice daily, 2-4 weeks", dosageID: "Oleskan 2 kali/hari, 2~4 minggu", precautionKR: "얼굴·점막 주의. 살리실산→임산부 주의", precautionVN: "Cẩn thận mặt/niêm mạc. Acid salicylic→thai phụ cẩn thận", precautionUS: "Caution face/mucous. Salicylic acid→pregnancy caution", precautionID: "Hati-hati wajah/selaput lendir. Asam salisilat→ibu hamil hati-hati" },
  acnes_id: { id: "acnes_id", nameKR: "아크네스", nameVN: "Acnes", nameUS: "Acnes", nameID: "Acnes", nameLocal: "Acnes", pronKR: "아크네스", pronEN: "ak-nes", ingredient: "Sulfur + Resorcinol", dosageKR: "세안 후 하루 1~2회 도포", dosageVN: "Thoa sau rửa mặt, 1~2 lần/ngày", dosageUS: "Apply after cleansing, 1-2 times/day", dosageID: "Oleskan setelah cuci muka, 1~2 kali/hari", precautionKR: "Resorcinol 넓은 면적 장기 사용 시 갑상선 영향. 자외선 차단 병용", precautionVN: "Resorcinol dùng rộng lâu dài ảnh hưởng tuyến giáp", precautionUS: "Resorcinol: thyroid concern with wide long-term use. Use sunscreen", precautionID: "Resorcinol: pengaruh tiroid jika area luas jangka panjang. Pakai sunscreen" },
  benzolac_id: { id: "benzolac_id", nameKR: "벤조락", nameVN: "Benzolac", nameUS: "Benzolac", nameID: "Benzolac", nameLocal: "Benzolac", pronKR: "벤조락", pronEN: "ben-zo-lac", ingredient: "Benzoyl peroxide 2.5~5%", dosageKR: "세안 후 하루 1~2회 도포", dosageVN: "Thoa sau rửa mặt, 1~2 lần/ngày", dosageUS: "Apply after cleansing, 1-2 times/day", dosageID: "Oleskan setelah cuci muka, 1~2 kali/hari", precautionKR: "옷·침구 탈색 주의. 눈·입술·점막 금지. 소량 테스트 후 사용", precautionVN: "Cẩn thận tẩy màu quần áo/chăn. Tránh mắt/môi", precautionUS: "Bleaches fabrics. No eyes/lips/mucous. Patch test first", precautionID: "Bisa memutihkan kain. Hindari mata/bibir. Tes sedikit dulu" },
  sanmol_id: { id: "sanmol_id", nameKR: "산몰 시럽 (어린이)", nameVN: "Sanmol Syrup (trẻ em)", nameUS: "Sanmol Syrup (children)", nameID: "Sanmol Sirup (anak)", nameLocal: "Sanmol Sirup", pronKR: "산몰", pronEN: "san-mol", ingredient: "Paracetamol 120mg/5ml", dosageKR: "체중 기준(10~15mg/kg), 4~6시간 간격, 하루 최대 5회", dosageVN: "Theo cân nặng, cách 4~6 giờ, tối đa 5 lần/ngày", dosageUS: "Weight-based, every 4-6hrs, max 5 times/day", dosageID: "Sesuai berat badan, setiap 4~6 jam, maks 5 kali/hari", precautionKR: "3일 이상 발열 시 의사 진료. 하루 5회 초과 금지", precautionVN: "Sốt trên 3 ngày→bác sĩ. Không quá 5 lần/ngày", precautionUS: "Fever over 3 days→doctor. No more than 5 times/day", precautionID: "Demam lebih 3 hari→dokter. Jangan lebih 5 kali/hari" },
  strepsils_id: { id: "strepsils_id", nameKR: "스트렙실", nameVN: "Strepsils", nameUS: "Strepsils", nameID: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격, 하루 최대 8정", dosageVN: "1 viên, cách 2~3 giờ, tối đa 8 viên/ngày", dosageUS: "1 lozenge, every 2-3hrs, max 8/day", dosageID: "1 tablet hisap, setiap 2~3 jam, maks 8/hari", precautionKR: "6세 미만 금지", precautionVN: "Trẻ dưới 6 tuổi cấm", precautionUS: "No under 6yo", precautionID: "Anak di bawah 6 tahun dilarang" },
  fg_troches_id: { id: "fg_troches_id", nameKR: "FG 트로키", nameVN: "FG Troches", nameUS: "FG Troches", nameID: "FG Troches", nameLocal: "FG Troches", pronKR: "에프-지 트로키", pronEN: "ef-jee tro-keys", ingredient: "Fradiomycin sulfate + Tyrothricin", dosageKR: "1정, 2~3시간 간격", dosageVN: "1 viên, cách 2~3 giờ", dosageUS: "1 lozenge, every 2-3hrs", dosageID: "1 tablet hisap, setiap 2~3 jam", precautionKR: "항생제 성분→내성 주의, 필요시에만. 네오마이신 알레르기 금기", precautionVN: "Kháng sinh→cẩn thận kháng thuốc. Dị ứng neomycin cấm", precautionUS: "Antibiotic→resistance risk, use only when needed. Neomycin allergy prohibited", precautionID: "Antibiotik→hati-hati resistensi. Alergi neomycin dilarang" },
  // === United Kingdom (GB) Drugs ===
  paracetamol_gb: { id: "paracetamol_gb", nameKR: "파라세타몰", nameVN: "Paracetamol", nameUS: "Paracetamol", nameGB: "Paracetamol 500mg", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격, 하루 최대 8정", dosageVN: "1~2 viên, cách 4~6 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tabs, every 4-6hrs, max 8/day", dosageGB: "1-2 tablets, every 4-6 hours, max 8 tablets/day (4g)", precautionKR: "음주 시 간독성. 다른 파라세타몰 약 중복 금지. 구매 제한: 약국 32정, 슈퍼 16정", precautionVN: "Nguy cơ gan khi uống rượu. Không dùng chung paracetamol khác", precautionUS: "Liver risk with alcohol. No other paracetamol products", precautionGB: "Liver risk with alcohol. No other paracetamol products. Purchase limit: 32 tabs pharmacy, 16 tabs supermarket" },
  nurofen_gb: { id: "nurofen_gb", nameKR: "뉴로펜", nameVN: "Nurofen", nameUS: "Nurofen", nameGB: "Nurofen", nameLocal: "Nurofen", pronKR: "뉴로펜", pronEN: "new-ro-fen", ingredient: "Ibuprofen 200mg", dosageKR: "1~2정, 식후, 4~6시간 간격", dosageVN: "1~2 viên, sau ăn, cách 4~6 giờ", dosageUS: "1-2 tabs, with food, every 4-6hrs", dosageGB: "1-2 tablets, with food, every 4-6 hours", precautionKR: "공복 금지. 임신 30주 이후 금기. 아스피린 알레르기 교차반응", precautionVN: "Không uống lúc đói. Cấm sau 30 tuần thai", precautionUS: "Not on empty stomach. No after 30wks pregnancy", precautionGB: "Take with food. Contraindicated after 30 weeks pregnancy. Aspirin allergy cross-reaction" },
  anadin_extra_gb: { id: "anadin_extra_gb", nameKR: "아나딘 엑스트라", nameVN: "Anadin Extra", nameUS: "Anadin Extra", nameGB: "Anadin Extra", nameLocal: "Anadin Extra", pronKR: "아나딘 엑스트라", pronEN: "an-a-din ex-tra", ingredient: "Aspirin 300mg + Paracetamol 200mg + Caffeine 45mg", dosageKR: "1~2정, 4시간 간격, 하루 최대 8정", dosageVN: "1~2 viên, cách 4 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tabs, every 4hrs, max 8/day", dosageGB: "1-2 tablets, every 4 hours, max 8 tablets/day", precautionKR: "16세 미만 금지(Reye 증후군). 위장 출혈 주의. 와파린 병용 주의", precautionVN: "Cấm dưới 16 tuổi (Reye). Nguy cơ chảy máu dạ dày", precautionUS: "No under 16 (Reye syndrome). GI bleeding risk", precautionGB: "Not for under 16 (Reye syndrome risk). GI bleeding risk. Warfarin interaction" },
  calpol_gb: { id: "calpol_gb", nameKR: "칼폴 (어린이)", nameVN: "Calpol (trẻ em)", nameUS: "Calpol (children)", nameGB: "Calpol Infant Suspension", nameLocal: "Calpol", pronKR: "칼폴", pronEN: "cal-pol", ingredient: "Paracetamol 120mg/5ml (infant) or 250mg/5ml (6+)", dosageKR: "체중/연령 기준, 4~6시간 간격, 하루 최대 4회", dosageVN: "Theo cân nặng/tuổi, cách 4~6 giờ, tối đa 4 lần/ngày", dosageUS: "Weight/age based, every 4-6hrs, max 4 times/day", dosageGB: "Weight/age based (2 months+, min 4kg), every 4-6 hours, max 4 doses/day", precautionKR: "2개월 미만 금지. 다른 파라세타몰 중복 금지. 48시간 이상 발열 시 의사", precautionVN: "Cấm dưới 2 tháng. Không dùng chung paracetamol khác", precautionUS: "No under 2 months. No other paracetamol products", precautionGB: "Not for under 2 months or under 4kg. No other paracetamol. Fever over 48hrs→GP" },
  lemsip_gb: { id: "lemsip_gb", nameKR: "렘십 맥스", nameVN: "Lemsip Max", nameUS: "Lemsip Max", nameGB: "Lemsip Max", nameLocal: "Lemsip Max", pronKR: "렘십 맥스", pronEN: "lem-sip max", ingredient: "Paracetamol 1000mg + Phenylephrine 12.2mg", dosageKR: "1포, 뜨거운 물에 타서, 4~6시간 간격, 하루 최대 4포", dosageVN: "1 gói pha nước nóng, cách 4~6 giờ, tối đa 4 gói/ngày", dosageUS: "1 sachet in hot water, every 4-6hrs, max 4/day", dosageGB: "1 sachet in hot (not boiling) water, every 4-6 hours, max 4 sachets/day", precautionKR: "⚠️ 1포당 파라세타몰 1g 고용량! 다른 파라세타몰 약 절대 병용 금지. 16세 미만 금지. 고혈압·심장질환 금기", precautionVN: "⚠️ 1g paracetamol/gói! Cấm dùng chung paracetamol khác. Cấm dưới 16 tuổi", precautionUS: "⚠️ 1g paracetamol per sachet! No other paracetamol. No under 16. Heart/BP caution", precautionGB: "⚠️ 1g paracetamol per sachet! Never with other paracetamol products. Not for under 16. Heart disease/hypertension contraindicated" },
  beechams_gb: { id: "beechams_gb", nameKR: "비챔스 올인원", nameVN: "Beechams All-in-One", nameUS: "Beechams All-in-One", nameGB: "Beechams All-in-One", ingredient: "Paracetamol 500mg + Guaifenesin 100mg + Phenylephrine 6.1mg", dosageKR: "2캡슐, 4~6시간 간격, 하루 최대 4회", dosageVN: "2 viên, cách 4~6 giờ, tối đa 4 lần/ngày", dosageUS: "2 capsules, every 4-6hrs, max 4 times/day", dosageGB: "2 capsules, every 4-6 hours, max 4 times/day. Not for under 12", precautionKR: "다른 파라세타몰 약 병용 금지. 12세 미만 금지. 고혈압 주의", precautionVN: "Không dùng chung paracetamol khác. Cấm dưới 12 tuổi", precautionUS: "No other paracetamol. No under 12. Hypertension caution", precautionGB: "No other paracetamol products. Not for under 12. Hypertension/heart disease caution" },
  covonia_gb: { id: "covonia_gb", nameKR: "코보니아", nameVN: "Covonia", nameUS: "Covonia", nameGB: "Covonia Dry Cough", nameLocal: "Covonia", pronKR: "코보니아", pronEN: "co-vo-ni-a", ingredient: "Dextromethorphan + Menthol", dosageKR: "10ml, 4시간 간격", dosageVN: "10ml, cách 4 giờ", dosageUS: "10ml, every 4 hours", dosageGB: "10ml, every 4 hours", precautionKR: "MAO 억제제 병용 금기. ⚠️ Pholcodine 함유 버전은 2023년 리콜됨→DXM 버전만 사용", precautionVN: "Cấm dùng với MAOI. ⚠️ Phiên bản Pholcodine đã thu hồi 2023", precautionUS: "No MAOIs. ⚠️ Pholcodine versions recalled 2023→DXM only", precautionGB: "No MAOIs. ⚠️ Pholcodine versions recalled March 2023 by MHRA. Only DXM-based versions available" },
  benylin_gb: { id: "benylin_gb", nameKR: "베닐린", nameVN: "Benylin", nameUS: "Benylin", nameGB: "Benylin", ingredient: "Dextromethorphan (dry) or Guaifenesin (chesty)", dosageKR: "10ml, 하루 4회", dosageVN: "10ml, 4 lần/ngày", dosageUS: "10ml, 4 times/day", dosageGB: "10ml, 4 times daily. Not for under 12 (adult versions)", precautionKR: "야간용 Diphenhydramine→강한 졸음. 12세 미만 금지(성인용)", precautionVN: "Bản đêm gây buồn ngủ mạnh. Cấm dưới 12 tuổi", precautionUS: "Night version: strong drowsiness. No under 12 (adult)", precautionGB: "Night Cough (Diphenhydramine): strong drowsiness. Not for under 12 (adult formulas)" },
  strepsils_gb: { id: "strepsils_gb", nameKR: "스트렙실스", nameVN: "Strepsils", nameUS: "Strepsils", nameGB: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격, 하루 최대 8정", dosageVN: "1 viên, cách 2~3 giờ, tối đa 8 viên/ngày", dosageUS: "1 lozenge, every 2-3hrs, max 8/day", dosageGB: "1 lozenge, every 2-3 hours, max 8 lozenges/day", precautionKR: "6세 미만 금지", precautionVN: "Cấm dưới 6 tuổi", precautionUS: "No under 6", precautionGB: "Not for children under 6 years" },
  difflam_gb: { id: "difflam_gb", nameKR: "디플럼 스프레이", nameVN: "Difflam Spray", nameUS: "Difflam Spray", nameGB: "Difflam Spray", ingredient: "Benzydamine HCl 0.15%", dosageKR: "4~8회 분사, 1.5~3시간 간격", dosageVN: "4~8 lần xịt, cách 1.5~3 giờ", dosageUS: "4-8 sprays, every 1.5-3hrs", dosageGB: "4-8 sprays, every 1.5-3 hours", precautionKR: "12세 미만 소아 전용 제품 사용. 임산부 의사 상담", precautionVN: "Dưới 12 tuổi dùng sản phẩm trẻ em. Thai phụ hỏi bác sĩ", precautionUS: "Under 12: use children's version. Pregnancy: consult doctor", precautionGB: "Under 12: use paediatric version. Pregnancy/breastfeeding: consult pharmacist" },
  sudafed_gb: { id: "sudafed_gb", nameKR: "수다페드", nameVN: "Sudafed", nameUS: "Sudafed", nameGB: "Sudafed Decongestant", nameLocal: "Sudafed", pronKR: "수다페드", pronEN: "su-da-fed", ingredient: "Pseudoephedrine HCl 60mg", dosageKR: "1정, 4~6시간 간격, 하루 최대 4회", dosageVN: "1 viên, cách 4~6 giờ, tối đa 4 lần/ngày", dosageUS: "1 tab, every 4-6hrs, max 4/day", dosageGB: "1 tablet (60mg), every 4-6 hours, max 4 tablets/day. Pharmacy only (P)", precautionKR: "약국에서만 구매(P 분류). 고혈압·심장·갑상선·당뇨·녹내장·전립선비대 금기. MAO 억제제 금기", precautionVN: "Chỉ bán tại nhà thuốc. Cao huyết áp/tim/giáp/tiểu đường cấm", precautionUS: "Pharmacy only. Hypertension/heart/thyroid/diabetes/glaucoma contraindicated", precautionGB: "Pharmacy only (P medicine). Contraindicated: severe hypertension, heart disease, thyroid, diabetes, glaucoma, prostate enlargement, MAOIs" },
  otrivine_gb: { id: "otrivine_gb", nameKR: "오트리빈", nameVN: "Otrivine", nameUS: "Otrivine", nameGB: "Otrivine", ingredient: "Xylometazoline HCl", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "1~2 lần xịt, 2~3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", dosageGB: "1-2 sprays per nostril, 2-3 times daily", precautionKR: "7일 이상 연속 금지(3~5일 권장). 반동성 코막힘 위험. 6세 미만 소아용 농도 사용", precautionVN: "Không dùng quá 7 ngày (khuyến nghị 3~5 ngày). Trẻ dưới 6 tuổi dùng nồng độ trẻ em", precautionUS: "No more than 7 days (3-5 days recommended). Under 6: use children's strength", precautionGB: "Do not use for more than 7 consecutive days (3-5 days recommended). Rebound congestion risk. Under 6: children's 0.05% formulation" },
  piriteze_gb: { id: "piriteze_gb", nameKR: "피리티즈", nameVN: "Piriteze", nameUS: "Piriteze", nameGB: "Piriteze (Cetirizine)", nameLocal: "Piriteze", pronKR: "피리티즈", pronEN: "pi-ri-teez", ingredient: "Cetirizine HCl 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageGB: "1 tablet, once daily", precautionKR: "졸음 가능. 신장질환 시 용량 조절", precautionVN: "Có thể buồn ngủ. Bệnh thận điều chỉnh liều", precautionUS: "May cause drowsiness. Kidney disease: dose adjustment", precautionGB: "May cause drowsiness. Kidney disease: dose adjustment needed. Alcohol may enhance drowsiness" },
  clarityn_gb: { id: "clarityn_gb", nameKR: "클래리틴", nameVN: "Clarityn", nameUS: "Clarityn", nameGB: "Clarityn", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageGB: "1 tablet, once daily", precautionKR: "졸음 매우 적음. 간질환 시 격일 복용", precautionVN: "Ít gây buồn ngủ. Bệnh gan uống cách ngày", precautionUS: "Very low drowsiness. Liver disease: every other day", precautionGB: "Very low drowsiness. Severe liver disease: every other day dosing" },
  piriton_gb: { id: "piriton_gb", nameKR: "피리톤", nameVN: "Piriton", nameUS: "Piriton", nameGB: "Piriton", nameLocal: "Piriton", pronKR: "피리톤", pronEN: "pi-ri-ton", ingredient: "Chlorphenamine Maleate 4mg", dosageKR: "1정, 4~6시간 간격, 하루 최대 6정", dosageVN: "1 viên, cách 4~6 giờ, tối đa 6 viên/ngày", dosageUS: "1 tab, every 4-6hrs, max 6/day", dosageGB: "1 tablet, every 4-6 hours, max 6 tablets/day", precautionKR: "강한 졸음(1세대). 운전 금지. 전립선비대·녹내장 금기. 1세 미만 금지", precautionVN: "Rất buồn ngủ. Không lái xe. Glôcôm/tiền liệt tuyến cấm", precautionUS: "Strong drowsiness. No driving. Glaucoma/prostate contraindicated", precautionGB: "Strong drowsiness (1st gen antihistamine). Do not drive. Glaucoma/prostate enlargement contraindicated. Not for under 1 year" },
  gaviscon_gb: { id: "gaviscon_gb", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", nameGB: "Gaviscon", ingredient: "Sodium Alginate + Calcium Carbonate", dosageKR: "10~20ml, 식후 및 취침 전", dosageVN: "10~20ml, sau ăn và trước ngủ", dosageUS: "10-20ml, after meals & bedtime", dosageGB: "10-20ml, after meals and at bedtime", precautionKR: "저나트륨 식이 주의(나트륨). 신장질환 의사 상담", precautionVN: "Chế độ ít natri cẩn thận. Bệnh thận hỏi bác sĩ", precautionUS: "Low sodium diet caution. Kidney disease: consult doctor", precautionGB: "Low sodium diet: caution (contains sodium). Kidney disease: consult pharmacist. NHS recommended" },
  rennie_gb: { id: "rennie_gb", nameKR: "레니", nameVN: "Rennie", nameUS: "Rennie", nameGB: "Rennie", nameLocal: "Rennie", pronKR: "레니", pronEN: "ren-ee", ingredient: "Calcium Carbonate 680mg + Magnesium Carbonate 80mg", dosageKR: "1~2정 씹어먹기, 증상 시, 하루 최대 16정", dosageVN: "1~2 viên nhai, khi có triệu chứng, tối đa 16 viên/ngày", dosageUS: "1-2 chewable tabs, as needed, max 16/day", dosageGB: "1-2 tablets chewed, when symptoms occur, max 16 tablets/day", precautionKR: "신장질환 장기 복용 금기. 고칼슘혈증 금기", precautionVN: "Bệnh thận không dùng lâu dài. Tăng canxi máu cấm", precautionUS: "Kidney disease: no long-term. Hypercalcemia contraindicated", precautionGB: "Kidney disease: no long-term use. Hypercalcaemia contraindicated" },
  imodium_gb: { id: "imodium_gb", nameKR: "이모디움", nameVN: "Imodium", nameUS: "Imodium", nameGB: "Imodium", ingredient: "Loperamide HCl 2mg", dosageKR: "초회 2정, 이후 설사마다 1정, 하루 최대 8정", dosageVN: "Đầu tiên 2 viên, sau mỗi lần tiêu chảy 1 viên, tối đa 8/ngày", dosageUS: "First 2 tabs, then 1 after each loose stool, max 8/day", dosageGB: "Initially 2 capsules, then 1 after each loose stool, max 8 capsules/day (16mg)", precautionKR: "12세 미만 금지. 혈변·발열 시 금지. 48시간 이내 개선 없으면 의사", precautionVN: "Cấm dưới 12 tuổi. Máu trong phân/sốt cấm dùng", precautionUS: "No under 12. No with bloody stool/fever. 48hrs no improvement→doctor", precautionGB: "Not for under 12. Do not use with bloody diarrhoea or high fever. If no improvement within 48 hours, see GP" },
  dioralyte_gb: { id: "dioralyte_gb", nameKR: "다이오랄라이트 (ORS)", nameVN: "Dioralyte (ORS)", nameUS: "Dioralyte (ORS)", nameGB: "Dioralyte", nameLocal: "Dioralyte", pronKR: "다이오랄라이트", pronEN: "die-o-ra-lite", ingredient: "Oral Rehydration Salts (Na, K, Cl, Glucose, Citrate)", dosageKR: "1포, 물 200ml에 타서 소량씩", dosageVN: "1 gói pha 200ml nước, uống từng chút", dosageUS: "1 sachet in 200ml water, sip frequently", dosageGB: "1 sachet dissolved in 200ml water, sip frequently. Use cooled boiled or bottled water", precautionKR: "끓인 후 식힌 물 또는 생수. 1시간 이내 사용(냉장 24시간)", precautionVN: "Nước đun sôi để nguội. Dùng trong 1 giờ", precautionUS: "Boiled cooled water. Use within 1 hour", precautionGB: "Use cooled boiled or bottled water. Use within 1 hour (24hrs if refrigerated). NHS recommended for dehydration" },
  kwells_gb: { id: "kwells_gb", nameKR: "크웰스", nameVN: "Kwells", nameUS: "Kwells", nameGB: "Kwells", nameLocal: "Kwells", pronKR: "크웰스", pronEN: "kwells", ingredient: "Hyoscine Hydrobromide 300mcg", dosageKR: "1정, 출발 20~30분 전, 혀 밑에 녹여 복용", dosageVN: "1 viên, 20~30 phút trước đi, ngậm dưới lưỡi", dosageUS: "1 tab, 20-30min before travel, dissolve under tongue", dosageGB: "1 tablet, 20-30 minutes before travel, suck or chew. Max 3 tablets in 24 hours", precautionKR: "10세 미만 금지(성인용). 녹내장·전립선비대 금기. 운전 금지", precautionVN: "Cấm dưới 10 tuổi. Glôcôm/tiền liệt tuyến cấm. Không lái xe", precautionUS: "No under 10. Glaucoma/prostate contraindicated. No driving", precautionGB: "Not for under 10 (use Kwells Junior 150mcg for 4+). Glaucoma/prostate enlargement contraindicated. May cause drowsiness—do not drive" },
  nurofen_gel_gb: { id: "nurofen_gel_gb", nameKR: "뉴로펜 겔", nameVN: "Nurofen Gel", nameUS: "Nurofen Gel", nameGB: "Nurofen Gel", ingredient: "Ibuprofen 5%", dosageKR: "아픈 부위에 하루 3~4회, 최대 2주", dosageVN: "Thoa vùng đau 3~4 lần/ngày, tối đa 2 tuần", dosageUS: "Apply to pain area 3-4 times/day, max 2 weeks", dosageGB: "Apply to affected area 3-4 times daily, max 2 weeks", precautionKR: "상처·발진 부위 금지. 아스피린 알레르기 주의", precautionVN: "Không thoa lên vết thương/phát ban. Dị ứng aspirin cẩn thận", precautionUS: "Not on wounds/rash. Aspirin allergy caution", precautionGB: "Not on broken skin/rash/eczema. Aspirin allergy caution" },
  voltarol_gb: { id: "voltarol_gb", nameKR: "볼타롤 겔", nameVN: "Voltarol Gel", nameUS: "Voltarol Gel", nameGB: "Voltarol (Diclofenac Gel)", nameLocal: "Voltarol", pronKR: "볼타롤", pronEN: "vol-ta-rol", ingredient: "Diclofenac Diethylammonium gel", dosageKR: "하루 3~4회 도포", dosageVN: "Thoa 3~4 lần/ngày", dosageUS: "Apply 3-4 times/day", dosageGB: "Apply 3-4 times daily", precautionKR: "광과민성→도포 부위 햇빛 주의. 임신 30주 이후 금기", precautionVN: "Tránh nắng vùng thoa. Cấm sau 30 tuần thai", precautionUS: "Sun sensitivity. No after 30wks pregnancy", precautionGB: "Photosensitivity—cover treated area from sunlight. Contraindicated after 30 weeks pregnancy" },
  deep_heat_gb: { id: "deep_heat_gb", nameKR: "딥 히트", nameVN: "Deep Heat", nameUS: "Deep Heat", nameGB: "Deep Heat", nameLocal: "Deep Heat", pronKR: "딥 히트", pronEN: "deep heat", ingredient: "Methyl Salicylate 30% + Menthol 8%", dosageKR: "아픈 부위에 하루 3~4회 도포", dosageVN: "Thoa vùng đau 3~4 lần/ngày", dosageUS: "Apply to pain area 3-4 times/day", dosageGB: "Apply to affected area 3-4 times daily. Massage gently", precautionKR: "상처 금지. 열 패드 병용 금지(화상 위험). 아스피린 알레르기 주의", precautionVN: "Không thoa lên vết thương. Không dùng với miếng nhiệt", precautionUS: "Not on wounds. No heat pads (burn risk). Aspirin allergy caution", precautionGB: "Not on broken skin. Do not use with heat pads/bandages (burn risk). Aspirin allergy: caution (salicylate)" },
  anthisan_gb: { id: "anthisan_gb", nameKR: "안티산", nameVN: "Anthisan", nameUS: "Anthisan", nameGB: "Anthisan Cream", nameLocal: "Anthisan", pronKR: "안티산", pronEN: "an-thi-san", ingredient: "Mepyramine Maleate 2%", dosageKR: "물린 부위에 하루 2~3회 도포", dosageVN: "Thoa vùng bị cắn 2~3 lần/ngày", dosageUS: "Apply to bite area 2-3 times/day", dosageGB: "Apply to affected area 2-3 times daily", precautionKR: "3세 미만 금지. 넓은 면적 도포 시 전신 흡수 가능", precautionVN: "Cấm dưới 3 tuổi. Thoa diện rộng có thể hấp thụ toàn thân", precautionUS: "No under 3. Wide area: systemic absorption possible", precautionGB: "Not for children under 3. Wide area application: systemic absorption risk" },
  bonjela_gb: { id: "bonjela_gb", nameKR: "본젤라", nameVN: "Bonjela", nameUS: "Bonjela", nameGB: "Bonjela", nameLocal: "Bonjela", pronKR: "본젤라", pronEN: "bon-jel-a", ingredient: "Choline Salicylate 8.7%", dosageKR: "환부에 소량 도포, 하루 3~4회", dosageVN: "Thoa ít lên vết loét, 3~4 lần/ngày", dosageUS: "Apply small amount to ulcer, 3-4 times/day", dosageGB: "Apply a small amount to affected area, 3-4 times daily (after meals and at bedtime)", precautionKR: "16세 미만 금지(Reye 증후군, 살리실산). 문지르지 말 것", precautionVN: "Cấm dưới 16 tuổi (Reye, salicylate). Không chà xát", precautionUS: "No under 16 (Reye syndrome). Do not rub in", precautionGB: "Not for under 16 (Reye syndrome risk—salicylate). Do not rub. Pregnancy: consult pharmacist. Use Bonjela Junior (Lidocaine) for under 16" },
  savlon_gb: { id: "savlon_gb", nameKR: "사블론", nameVN: "Savlon", nameUS: "Savlon", nameGB: "Savlon Antiseptic Cream", nameLocal: "Savlon", pronKR: "사블론", pronEN: "sav-lon", ingredient: "Chlorhexidine Gluconate 0.1% + Cetrimide 0.5%", dosageKR: "상처 소독 후 도포", dosageVN: "Thoa sau sát trùng vết thương", dosageUS: "Apply after wound cleaning", dosageGB: "Clean wound, then apply cream. Cover with plaster if needed", precautionKR: "눈·귀 안 금지. 심부 열상·동물 교상은 의사", precautionVN: "Không dùng trong mắt/tai. Vết thương sâu→bác sĩ", precautionUS: "Not in eyes/ears. Deep wounds/animal bites→doctor", precautionGB: "Not in eyes or ears. Deep cuts, animal bites, serious burns→A&E or GP" },
  sudocrem_gb: { id: "sudocrem_gb", nameKR: "수도크림", nameVN: "Sudocrem", nameUS: "Sudocrem", nameGB: "Sudocrem Antiseptic Healing Cream", nameLocal: "Sudocrem", pronKR: "수도크림", pronEN: "su-do-krem", ingredient: "Zinc Oxide 15.25% + Benzyl Alcohol + Lanolin", dosageKR: "환부에 소량 얇게 도포", dosageVN: "Thoa lượng nhỏ mỏng lên vùng bị", dosageUS: "Apply thin layer to affected area", dosageGB: "Apply a thin layer to affected area", precautionKR: "라놀린 알레르기 주의. 눈·점막 금지", precautionVN: "Dị ứng lanolin cẩn thận. Tránh mắt/niêm mạc", precautionUS: "Lanolin allergy caution. No eyes/mucous", precautionGB: "Lanolin allergy caution. Avoid eyes and mucous membranes. Established 1931" },
  nytol_gb: { id: "nytol_gb", nameKR: "나이톨", nameVN: "Nytol", nameUS: "Nytol", nameGB: "Nytol One-A-Night", nameLocal: "Nytol", pronKR: "나이톨", pronEN: "ny-tol", ingredient: "Diphenhydramine HCl 50mg", dosageKR: "1캡슐, 취침 20분 전", dosageVN: "1 viên, 20 phút trước ngủ", dosageUS: "1 capsule, 20min before bed", dosageGB: "1 capsule (50mg), 20 minutes before bedtime", precautionKR: "7일 이상 연속 금지. 65세 이상 주의. 전립선비대·녹내장 금기. 음주 금지", precautionVN: "Không dùng quá 7 ngày. Người 65+ cẩn thận. Không uống rượu", precautionUS: "No more than 7 days. 65+ caution. Glaucoma/prostate contraindicated. No alcohol", precautionGB: "Do not use for more than 7 consecutive nights. Over 65: increased risk of confusion/falls. Glaucoma/prostate enlargement contraindicated. Never with alcohol" },
  lamisil_gb: { id: "lamisil_gb", nameKR: "라미실", nameVN: "Lamisil", nameUS: "Lamisil", nameGB: "Lamisil AT Cream", ingredient: "Terbinafine HCl 1%", dosageKR: "하루 1~2회, 1~2주", dosageVN: "1~2 lần/ngày, 1~2 tuần", dosageUS: "1-2 times/day, 1-2 weeks", dosageGB: "Once or twice daily, 1-2 weeks (athlete's foot)", precautionKR: "완치 후 1주 추가 도포. 점막 금지", precautionVN: "Dùng thêm 1 tuần sau khi khỏi. Tránh niêm mạc", precautionUS: "Continue 1 week after cure. No mucous membranes", precautionGB: "Continue 1 week after symptoms clear. Avoid eyes and mucous membranes" },
  canesten_gb: { id: "canesten_gb", nameKR: "카네스텐", nameVN: "Canesten", nameUS: "Canesten", nameGB: "Canesten Cream", ingredient: "Clotrimazole 1%", dosageKR: "하루 2~3회, 4주", dosageVN: "2~3 lần/ngày, 4 tuần", dosageUS: "2-3 times/day, 4 weeks", dosageGB: "2-3 times daily, at least 4 weeks", precautionKR: "증상 후 2주 더 사용. 콘돔·다이어프램 손상 가능", precautionVN: "Dùng thêm 2 tuần. Có thể hỏng bao cao su", precautionUS: "Continue 2 weeks after symptoms clear. May damage condoms", precautionGB: "Continue 2 weeks after symptoms resolve. May damage latex condoms/diaphragms" },
  freederm_gb: { id: "freederm_gb", nameKR: "프리덤 겔", nameVN: "Freederm Gel", nameUS: "Freederm Gel", nameGB: "Freederm Gel", nameLocal: "Freederm", pronKR: "프리덤", pronEN: "free-derm", ingredient: "Nicotinamide 4%", dosageKR: "하루 2회 도포", dosageVN: "Thoa 2 lần/ngày", dosageUS: "Apply twice daily", dosageGB: "Apply twice daily to affected area", precautionKR: "처음 사용 시 자극·홍조 가능. 항생제 내성 없음", precautionVN: "Lần đầu có thể kích ứng/đỏ. Không kháng thuốc", precautionUS: "Initial irritation/redness possible. No antibiotic resistance risk", precautionGB: "Initial irritation/redness possible—start with small area. No antibiotic resistance risk. GSL product" },
  dulcoease_gb: { id: "dulcoease_gb", nameKR: "둘코이즈", nameVN: "Dulcoease", nameUS: "Dulcoease", nameGB: "Dulcoease", nameLocal: "Dulcoease", pronKR: "둘코이즈", pronEN: "dul-co-ease", ingredient: "Docusate Sodium 100mg", dosageKR: "1~3캡슐, 하루 1~3회", dosageVN: "1~3 viên, 1~3 lần/ngày", dosageUS: "1-3 capsules, 1-3 times/day", dosageGB: "1-3 capsules, 1-3 times daily", precautionKR: "광물성 기름과 병용 금지", precautionVN: "Không dùng chung dầu khoáng", precautionUS: "No mineral oil combination", precautionGB: "Do not use with mineral oil (liquid paraffin). Stool softener—suitable after surgery/haemorrhoids" },
  senokot_gb: { id: "senokot_gb", nameKR: "세노콧", nameVN: "Senokot", nameUS: "Senokot", nameGB: "Senokot", nameLocal: "Senokot", pronKR: "세노콧", pronEN: "sen-o-kot", ingredient: "Sennosides 7.5mg (Senna)", dosageKR: "2정, 취침 전", dosageVN: "2 viên, trước ngủ", dosageUS: "2 tabs, at bedtime", dosageGB: "2 tablets, at bedtime. Effect in 8-12 hours", precautionKR: "장기 복용 금지(장 의존성). 복통·장폐색 시 금지. 2세 미만 금지", precautionVN: "Không dùng lâu dài. Đau bụng/tắc ruột cấm. Dưới 2 tuổi cấm", precautionUS: "No long-term use. Abdominal pain/obstruction prohibited. No under 2", precautionGB: "Do not use long-term (bowel dependency). Not with abdominal pain/obstruction. Not for under 2" },
  // === Australia (AU) Drugs ===
  panadol_au: { id: "panadol_au", nameKR: "파나돌", nameVN: "Panadol", nameUS: "Panadol", nameAU: "Panadol", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격, 하루 최대 8정", dosageVN: "1~2 viên, cách 4~6 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tabs, every 4-6hrs, max 8/day", dosageAU: "1-2 tablets, every 4-6 hours, max 8 tablets/day (4g). S2 Pharmacy Medicine", precautionKR: "음주 시 간독성. 다른 파라세타몰 약 중복 금지. 🦟 QLD 북부 뎅기열 의심 시 파라세타몰만 사용", precautionVN: "Nguy cơ gan khi uống rượu. Không dùng chung paracetamol khác", precautionUS: "Liver risk with alcohol. No other paracetamol products", precautionAU: "Liver risk with alcohol. No other paracetamol products. S2—available on pharmacy shelf. 🦟 Dengue (nth QLD): paracetamol only, no NSAIDs" },
  
  nurofen_au: { id: "nurofen_au", nameKR: "뉴로펜", nameVN: "Nurofen", nameUS: "Nurofen", nameAU: "Nurofen", ingredient: "Ibuprofen 200mg", dosageKR: "1~2정, 식후, 4~6시간 간격", dosageVN: "1~2 viên, sau ăn, cách 4~6 giờ", dosageUS: "1-2 tabs, with food, every 4-6hrs", dosageAU: "1-2 tablets, with food, every 4-6 hours. S2 Pharmacy Medicine", precautionKR: "공복 금지. 임신 20주 이후 금기. 🦟 뎅기열 의심 시 금지", precautionVN: "Không uống lúc đói. Cấm sau 20 tuần thai. 🦟 Sốt xuất huyết cấm", precautionUS: "Not on empty stomach. No after 20wks pregnancy. 🦟 No with dengue", precautionAU: "Take with food. Not after 20 weeks pregnancy. 🦟 Contraindicated with suspected dengue" },
  
  panadol_extra_au: { id: "panadol_extra_au", nameKR: "파나돌 엑스트라", nameVN: "Panadol Extra", nameUS: "Panadol Extra", nameAU: "Panadol Extra", ingredient: "Paracetamol 500mg + Caffeine 65mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1~2 viên, cách 4~6 giờ", dosageUS: "1-2 tabs, every 4-6hrs", dosageAU: "1-2 tablets, every 4-6 hours. S2", precautionKR: "카페인 민감자 주의. 다른 파라세타몰 약 중복 금지", precautionVN: "Người nhạy cảm caffein cẩn thận. Không dùng chung paracetamol khác", precautionUS: "Caffeine sensitive caution. No other paracetamol", precautionAU: "Caffeine sensitive caution. No other paracetamol products" },
  
  codral_au: { id: "codral_au", nameKR: "코드랄 데이/나이트", nameVN: "Codral Day/Night", nameUS: "Codral Day/Night", nameAU: "Codral Cold & Flu Day/Night", nameLocal: "Codral", pronKR: "코드랄", pronEN: "cod-ral", ingredient: "Day: Paracetamol 500mg+Phenylephrine 5mg+DXM 10mg / Night: Paracetamol 500mg+Chlorphenamine 2mg+DXM 10mg", dosageKR: "Day 2캡슐 4~6시간 / Night 2캡슐 취침 전", dosageVN: "Ngày 2 viên cách 4~6 giờ / Đêm 2 viên trước ngủ", dosageUS: "Day 2 caps every 4-6hrs / Night 2 caps at bedtime", dosageAU: "Day: 2 capsules every 4-6hrs (max 6/day). Night: 2 capsules at bedtime (max 2/day). S2. Not for under 12", precautionKR: "12세 미만 금지. 다른 파라세타몰 약 병용 금지. Night→졸음→운전 금지", precautionVN: "Cấm dưới 12 tuổi. Không dùng chung paracetamol khác. Đêm→buồn ngủ", precautionUS: "No under 12. No other paracetamol. Night→drowsy→no driving", precautionAU: "Not for under 12. No other paracetamol products. Night capsules cause drowsiness—do not drive. S2" },
  
  codral_original_au: { id: "codral_original_au", nameKR: "코드랄 오리지널", nameVN: "Codral Original", nameUS: "Codral Original", nameAU: "Codral Original Day/Night", ingredient: "Day: Paracetamol 500mg+Pseudoephedrine 30mg / Night: +Triprolidine 1.25mg", dosageKR: "Day 2정(오전/오후) / Night 2정 취침 전", dosageVN: "Ngày 2 viên / Đêm 2 viên trước ngủ", dosageUS: "Day 2 tabs / Night 2 tabs at bedtime", dosageAU: "Day: 2 tablets (morning & afternoon). Night: 2 tablets at bedtime. S3—pharmacist consultation required", precautionKR: "S3 약사 상담 필수. 고혈압·심장·갑상선·당뇨·녹내장·전립선비대 금기", precautionVN: "S3 phải hỏi dược sĩ. Cao huyết áp/tim/giáp/tiểu đường cấm", precautionUS: "S3 pharmacist only. Hypertension/heart/thyroid/diabetes contraindicated", precautionAU: "S3 Pharmacist Only—must consult pharmacist. Contraindicated: hypertension, heart disease, thyroid, diabetes, glaucoma, prostate. ID verification required" },
  
  durotuss_au: { id: "durotuss_au", nameKR: "듀로터스", nameVN: "Duro-Tuss", nameUS: "Duro-Tuss", nameAU: "Duro-Tuss", nameLocal: "Duro-Tuss", pronKR: "듀로터스", pronEN: "dew-ro-tus", ingredient: "Dextromethorphan (dry cough) or Guaifenesin+Bromhexine (chesty)", dosageKR: "10ml, 하루 3~4회", dosageVN: "10ml, 3~4 lần/ngày", dosageUS: "10ml, 3-4 times/day", dosageAU: "10ml, 3-4 times daily. S2 (basic) / S3 (night/forte). Not for under 2", precautionKR: "야간용 Doxylamine→졸음→운전 금지. MAO 억제제 금기. 2세 미만 금지", precautionVN: "Bản đêm gây buồn ngủ. MAOI cấm. Dưới 2 tuổi cấm", precautionUS: "Night version: drowsy. No MAOIs. No under 2", precautionAU: "Night version (Doxylamine): drowsiness—do not drive. MAOIs contraindicated. Not for under 2" },
  
  bisolvon_au: { id: "bisolvon_au", nameKR: "비솔본", nameVN: "Bisolvon", nameUS: "Bisolvon", nameAU: "Bisolvon Chesty Forte", nameLocal: "Bisolvon", pronKR: "비솔본", pronEN: "bi-sol-von", ingredient: "Bromhexine HCl 8mg", dosageKR: "1정, 하루 3회", dosageVN: "1 viên, 3 lần/ngày", dosageUS: "1 tab, 3 times/day", dosageAU: "1 tablet, 3 times daily. S2. Drink plenty of water", precautionKR: "충분한 수분 섭취. 소화성 궤양 주의", precautionVN: "Uống nhiều nước. Loét dạ dày cẩn thận", precautionUS: "Drink plenty of water. Peptic ulcer caution", precautionAU: "Drink plenty of fluids to help loosen mucus. Peptic ulcer caution" },
  
  telfast_au: { id: "telfast_au", nameKR: "텔패스트", nameVN: "Telfast", nameUS: "Telfast", nameAU: "Telfast", nameLocal: "Telfast", pronKR: "텔패스트", pronEN: "tel-fast", ingredient: "Fexofenadine HCl 180mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageAU: "1 tablet (180mg), once daily. S2. Non-drowsy", precautionKR: "졸음 없음. 제산제와 동시 복용 금지(흡수 40% 감소). 자몽주스 주의", precautionVN: "Không buồn ngủ. Không dùng chung antacid. Cẩn thận nước bưởi", precautionUS: "Non-drowsy. No antacids simultaneously (40% reduced absorption). Grapefruit juice caution", precautionAU: "Non-drowsy. Do not take with aluminium/magnesium antacids (40% reduced absorption). Avoid grapefruit juice" },
  
  zyrtec_au: { id: "zyrtec_au", nameKR: "지르텍", nameVN: "Zyrtec", nameUS: "Zyrtec", nameAU: "Zyrtec", ingredient: "Cetirizine HCl 10mg", dosageKR: "1정, 하루 1회(취침 전)", dosageVN: "1 viên, 1 lần/ngày (trước ngủ)", dosageUS: "1 tab, once daily (bedtime)", dosageAU: "1 tablet, once daily (preferably at bedtime). S2", precautionKR: "졸음 가능. 신장질환 시 용량 조절", precautionVN: "Có thể buồn ngủ. Bệnh thận điều chỉnh liều", precautionUS: "May cause drowsiness. Kidney disease: dose adjustment", precautionAU: "May cause drowsiness. Kidney disease: dose adjustment. Alcohol may enhance drowsiness" },
  
  claratyne_au: { id: "claratyne_au", nameKR: "클래러타인", nameVN: "Claratyne", nameUS: "Claratyne", nameAU: "Claratyne", nameLocal: "Claratyne", pronKR: "클래러타인", pronEN: "cla-ra-tine", ingredient: "Loratadine 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageAU: "1 tablet, once daily. S2. Non-drowsy", precautionKR: "졸음 매우 적음. 간질환 시 격일 복용", precautionVN: "Ít gây buồn ngủ. Bệnh gan uống cách ngày", precautionUS: "Very low drowsiness. Liver disease: every other day", precautionAU: "Very low drowsiness. Severe liver disease: every other day dosing" },
  
  gaviscon_au: { id: "gaviscon_au", nameKR: "개비스콘", nameVN: "Gaviscon", nameUS: "Gaviscon", nameAU: "Gaviscon Extra Strength", ingredient: "Sodium Alginate 1000mg + Potassium Bicarbonate 200mg + Calcium Carbonate 200mg", dosageKR: "10~20ml, 식후 및 취침 전", dosageVN: "10~20ml, sau ăn và trước ngủ", dosageUS: "10-20ml, after meals & bedtime", dosageAU: "10-20ml, after meals and at bedtime. S2. Note: AU formula differs from UK (no Al hydroxide)", precautionKR: "저칼륨 식이 주의(K Bicarbonate). 신장질환 의사 상담. 다른 약과 2시간 간격", precautionVN: "Chế độ ít kali cẩn thận. Bệnh thận hỏi bác sĩ", precautionUS: "Low potassium diet caution. Kidney disease: consult doctor. Space other meds 2hrs", precautionAU: "Low potassium diet caution. Kidney disease: consult pharmacist. Space 2hrs from other medicines. AU formula: no aluminium hydroxide" },
  
  nexium_au: { id: "nexium_au", nameKR: "넥시움 24HR", nameVN: "Nexium 24HR", nameUS: "Nexium 24HR", nameAU: "Nexium 24HR", nameLocal: "Nexium 24HR", pronKR: "넥시움", pronEN: "nex-ee-um", ingredient: "Esomeprazole 20mg", dosageKR: "1정, 하루 1회, 최소 7일~최대 14일", dosageVN: "1 viên, 1 lần/ngày, 7~14 ngày", dosageUS: "1 tab, once daily, 7-14 days", dosageAU: "1 tablet daily, minimum 7 days up to 14 days. S2 Pharmacy Medicine (not S3)", precautionKR: "14일 초과 자가 복용 금지. 18세 미만 금지. 클로피도그렐 병용 주의. 수유부 금기", precautionVN: "Không quá 14 ngày. Cấm dưới 18 tuổi. Cho con bú cấm", precautionUS: "No more than 14 days. No under 18. Clopidogrel interaction. Breastfeeding contraindicated", precautionAU: "Max 14 days self-treatment. Not for under 18. Clopidogrel interaction. Breastfeeding contraindicated. S2—pharmacy shelf purchase" },
  
  imodium_au: { id: "imodium_au", nameKR: "이모디움", nameVN: "Imodium", nameUS: "Imodium", nameAU: "Imodium", ingredient: "Loperamide HCl 2mg", dosageKR: "초회 2정, 이후 설사마다 1정, 하루 최대 8정", dosageVN: "Đầu tiên 2 viên, sau mỗi lần 1 viên, tối đa 8/ngày", dosageUS: "First 2 tabs, then 1 per stool, max 8/day", dosageAU: "Initially 2 capsules, then 1 after each loose stool, max 8/day (16mg). S2", precautionKR: "12세 미만 금지. 혈변·발열 시 금지. 48시간 이내 개선 없으면 의사", precautionVN: "Cấm dưới 12 tuổi. Máu/sốt cấm. 48 giờ không cải thiện→bác sĩ", precautionUS: "No under 12. No with bloody stool/fever. 48hrs→doctor", precautionAU: "Not for under 12. Do not use with bloody diarrhoea or fever. 48hrs no improvement→see GP" },
  
  hydralyte_au: { id: "hydralyte_au", nameKR: "하이드랄라이트 (ORS)", nameVN: "Hydralyte (ORS)", nameUS: "Hydralyte (ORS)", nameAU: "Hydralyte", nameLocal: "Hydralyte", pronKR: "하이드랄라이트", pronEN: "hi-dra-lite", ingredient: "Oral Rehydration Salts (Na, K, Cl, Glucose, Citrate)", dosageKR: "발포정 또는 1포, 물에 타서 소량씩", dosageVN: "Viên sủi hoặc 1 gói, pha nước, uống từng chút", dosageUS: "Effervescent tab or 1 sachet in water, sip frequently", dosageAU: "Effervescent tablet or powder sachet dissolved in water, sip frequently. Available in multiple forms (tablet, powder, icy pole, ready-to-drink)", precautionKR: "끓인 후 식힌 물. 24시간 내 사용", precautionVN: "Nước đun sôi để nguội. Dùng trong 24 giờ", precautionUS: "Boiled cooled water. Use within 24hrs", precautionAU: "Use cooled boiled water. Use within 24hrs. AU's leading ORS brand" },
  
  kwells_au: { id: "kwells_au", nameKR: "크웰스", nameVN: "Kwells", nameUS: "Kwells", nameAU: "Kwells", ingredient: "Hyoscine Hydrobromide 300mcg", dosageKR: "1정, 출발 20~30분 전, 혀 밑에 녹여", dosageVN: "1 viên, 20~30 phút trước đi, ngậm dưới lưỡi", dosageUS: "1 tab, 20-30min before travel, under tongue", dosageAU: "1 tablet, 20-30 minutes before travel, suck or chew. Max 3 in 24hrs. S3 Pharmacist Only", precautionKR: "S3 약사 상담 필수. 10세 미만 금지. 녹내장·전립선비대 금기. 운전 금지", precautionVN: "S3 phải hỏi dược sĩ. Cấm dưới 10 tuổi. Glôcôm cấm", precautionUS: "S3 pharmacist only. No under 10. Glaucoma/prostate contraindicated", precautionAU: "S3 Pharmacist Only Medicine. Not for under 10 (use Kwells Kids 150mcg for 4+). Glaucoma/prostate contraindicated. May cause drowsiness" },
  
  stingose_au: { id: "stingose_au", nameKR: "스팅고즈", nameVN: "Stingose", nameUS: "Stingose", nameAU: "Stingose", nameLocal: "Stingose", pronKR: "스팅고즈", pronEN: "sting-oze", ingredient: "Aluminium Sulfate 20%", dosageKR: "물린/쏘인 부위에 스프레이 또는 도포", dosageVN: "Xịt hoặc thoa vào vùng bị đốt/cắn", dosageUS: "Spray or apply to bite/sting area", dosageAU: "Spray or apply to insect bite/sting area immediately. S2", precautionKR: "2세 미만 금지. 깊은 상처 금지. ⚠️ 박스 해파리는 Stingose 불가→즉시 000 호출", precautionVN: "Cấm dưới 2 tuổi. Không dùng cho vết thương sâu. ⚠️ Sứa hộp→gọi 000 ngay", precautionUS: "No under 2. Not for deep wounds. ⚠️ Box jellyfish→call 000 immediately", precautionAU: "Not for under 2. Not for deep wounds. ⚠️ Box jellyfish (nth QLD): Stingose insufficient→call 000 immediately. Essential AU travel item" },
  
  nurofen_gel_au: { id: "nurofen_gel_au", nameKR: "뉴로펜 겔", nameVN: "Nurofen Gel", nameUS: "Nurofen Gel", nameAU: "Nurofen Gel", ingredient: "Ibuprofen 5%", dosageKR: "아픈 부위에 하루 3~4회, 최대 2주", dosageVN: "Thoa vùng đau 3~4 lần/ngày, tối đa 2 tuần", dosageUS: "Apply 3-4 times/day, max 2 weeks", dosageAU: "Apply to affected area 3-4 times daily, max 2 weeks. S2", precautionKR: "상처·발진 부위 금지. 아스피린 알레르기 주의", precautionVN: "Không thoa lên vết thương. Dị ứng aspirin cẩn thận", precautionUS: "Not on wounds/rash. Aspirin allergy caution", precautionAU: "Not on broken skin/rash. Aspirin allergy caution" },
  
  voltaren_au: { id: "voltaren_au", nameKR: "볼타렌 에멀젤", nameVN: "Voltaren Emulgel", nameUS: "Voltaren Emulgel", nameAU: "Voltaren Emulgel", ingredient: "Diclofenac Diethylammonium 1.16%", dosageKR: "하루 3~4회 도포", dosageVN: "Thoa 3~4 lần/ngày", dosageUS: "Apply 3-4 times/day", dosageAU: "Apply 3-4 times daily. S2. ⚠️ AU strong UV—cover treated area from sun", precautionKR: "광과민성→도포 부위 햇빛 주의(호주 자외선 특히 강함!). 임신 30주 이후 금기", precautionVN: "Tránh nắng vùng thoa (UV Úc rất mạnh!). Cấm sau 30 tuần thai", precautionUS: "Photosensitivity—cover from sun. No after 30wks pregnancy", precautionAU: "Photosensitivity—protect treated area from sunlight (AU UV is extremely strong!). Not after 30 weeks pregnancy" },
  
  restavit_au: { id: "restavit_au", nameKR: "레스타빗", nameVN: "Restavit", nameUS: "Restavit", nameAU: "Restavit", nameLocal: "Restavit", pronKR: "레스타빗", pronEN: "res-ta-vit", ingredient: "Doxylamine Succinate 25mg", dosageKR: "1~2정, 취침 20분 전", dosageVN: "1~2 viên, 20 phút trước ngủ", dosageUS: "1-2 tabs, 20min before bed", dosageAU: "1-2 tablets, 20 minutes before bedtime. S3 Pharmacist Only Medicine", precautionKR: "S3 약사 상담 필수. 7일 이상 금지. 녹내장·전립선비대 금기. 음주 금지. 다음 날 졸음 주의", precautionVN: "S3 phải hỏi dược sĩ. Không quá 7 ngày. Glôcôm cấm. Không uống rượu", precautionUS: "S3 pharmacist only. No more than 7 days. Glaucoma/prostate contraindicated. No alcohol", precautionAU: "S3 Pharmacist Only. Do not use for more than a few days at a time. Glaucoma/prostate enlargement contraindicated. Never with alcohol. Next-day drowsiness possible—do not drive" },
  
  coloxyl_senna_au: { id: "coloxyl_senna_au", nameKR: "콜록실+센나", nameVN: "Coloxyl+Senna", nameUS: "Coloxyl+Senna", nameAU: "Coloxyl with Senna", nameLocal: "Coloxyl with Senna", pronKR: "콜록실 위드 센나", pronEN: "co-lox-il with sen-na", ingredient: "Docusate Sodium + Sennosides", dosageKR: "1~2정, 취침 전", dosageVN: "1~2 viên, trước ngủ", dosageUS: "1-2 tabs, at bedtime", dosageAU: "1-2 tablets, at bedtime. Effect in 8-12 hours. S2", precautionKR: "장기 복용 금지(장 의존성). 복통·장폐색 시 금지", precautionVN: "Không dùng lâu dài. Đau bụng/tắc ruột cấm", precautionUS: "No long-term use. Abdominal pain/obstruction prohibited", precautionAU: "Do not use long-term (bowel dependency). Not with abdominal pain or suspected obstruction. S2" },
  
  strepsils_au: { id: "strepsils_au", nameKR: "스트렙실스", nameVN: "Strepsils", nameUS: "Strepsils", nameAU: "Strepsils", ingredient: "Amylmetacresol + Dichlorobenzyl alcohol", dosageKR: "1정, 2~3시간 간격, 하루 최대 8정", dosageVN: "1 viên, cách 2~3 giờ, tối đa 8 viên/ngày", dosageUS: "1 lozenge, every 2-3hrs, max 8/day", dosageAU: "1 lozenge, every 2-3 hours, max 8/day. S2", precautionKR: "6세 미만 금지", precautionVN: "Cấm dưới 6 tuổi", precautionUS: "No under 6", precautionAU: "Not for children under 6" },
  
  panadol_children_au: { id: "panadol_children_au", nameKR: "파나돌 칠드런 (어린이)", nameVN: "Panadol Children (trẻ em)", nameUS: "Panadol Children", nameAU: "Panadol Children", ingredient: "Paracetamol 120mg/5ml (1-5yr) or 250mg/5ml (5-12yr)", dosageKR: "체중 기준(10~15mg/kg), 4~6시간, 하루 최대 5회", dosageVN: "Theo cân nặng, cách 4~6 giờ, tối đa 5 lần/ngày", dosageUS: "Weight-based, every 4-6hrs, max 5/day", dosageAU: "Weight-based (10-15mg/kg), every 4-6 hours, max 5 doses/day. S2. Not for under 1 month without GP", precautionKR: "1세 미만 의사 처방 필요. 하루 5회 초과 금지. 48시간 이상 발열→의사", precautionVN: "Dưới 1 tuổi cần bác sĩ. Không quá 5 lần/ngày. Sốt 48 giờ→bác sĩ", precautionUS: "Under 1: doctor required. Max 5/day. Fever 48hrs→doctor", precautionAU: "Under 1 month: GP prescription required. Max 5 doses/day. Fever persisting 48hrs→see GP" },
  
  betadine_au: { id: "betadine_au", nameKR: "베타딘", nameVN: "Betadine", nameUS: "Betadine", nameAU: "Betadine", ingredient: "Povidone-iodine 10%", dosageKR: "상처 소독, 도포", dosageVN: "Sát trùng vết thương, thoa", dosageUS: "Wound disinfection, apply", dosageAU: "Apply to wound for disinfection. S2", precautionKR: "갑상선질환 주의. 요오드 알레르기 금기", precautionVN: "Bệnh tuyến giáp cẩn thận. Dị ứng iốt cấm", precautionUS: "Thyroid disease caution. Iodine allergy prohibited", precautionAU: "Thyroid disease caution (iodine absorption). Iodine allergy contraindicated" },
  
  burnaid_au: { id: "burnaid_au", nameKR: "번에이드 (화상 전용)", nameVN: "Burnaid", nameUS: "Burnaid", nameAU: "Burnaid", nameLocal: "Burnaid", pronKR: "번에이드", pronEN: "burn-aid", ingredient: "Melaleuca (Tea Tree) oil + Hydrogel base", dosageKR: "화상 부위에 도포 (20분 냉각 후)", dosageVN: "Thoa vùng bỏng (sau khi làm mát 20 phút)", dosageUS: "Apply to burn (after 20min cooling)", dosageAU: "Apply to burn after cooling under running water for 20 minutes. S2. For minor (1st degree) burns only", precautionKR: "2도 이상·넓은 면적·얼굴 화상→즉시 병원. Tea Tree 알레르기 주의", precautionVN: "Bỏng nặng/diện rộng/mặt→bệnh viện ngay. Dị ứng Tea Tree cẩn thận", precautionUS: "Severe/wide/face burns→hospital immediately. Tea tree allergy caution", precautionAU: "2nd degree+ burns, large area, or face→call 000 or go to ED. Tea tree allergy caution. AU burn care essential" },
  
  canesten_au: { id: "canesten_au", nameKR: "카네스텐", nameVN: "Canesten", nameUS: "Canesten", nameAU: "Canesten", ingredient: "Clotrimazole 1%", dosageKR: "하루 2~3회, 4주 이상", dosageVN: "2~3 lần/ngày, trên 4 tuần", dosageUS: "2-3 times/day, 4+ weeks", dosageAU: "2-3 times daily, at least 4 weeks. S2", precautionKR: "증상 후 2주 더 사용. 콘돔 손상 가능", precautionVN: "Dùng thêm 2 tuần. Có thể hỏng bao cao su", precautionUS: "Continue 2 weeks after symptoms clear. May damage condoms", precautionAU: "Continue 2 weeks after symptoms resolve. May damage latex condoms/diaphragms" },
  
  benzac_au: { id: "benzac_au", nameKR: "벤작 AC", nameVN: "Benzac AC", nameUS: "Benzac AC", nameAU: "Benzac AC", ingredient: "Benzoyl Peroxide 2.5% or 5%", dosageKR: "세안 후 하루 1~2회 도포", dosageVN: "Thoa sau rửa mặt, 1~2 lần/ngày", dosageUS: "Apply after cleansing, 1-2 times/day", dosageAU: "Apply after cleansing, 1-2 times daily. S3 Pharmacist Only Medicine", precautionKR: "S3 약사 상담 필수. 옷 탈색 주의. 눈·입술 금지. 소량 테스트 후 사용", precautionVN: "S3 phải hỏi dược sĩ. Tẩy màu quần áo. Tránh mắt/môi", precautionUS: "S3 pharmacist only. Bleaches fabrics. No eyes/lips. Patch test first", precautionAU: "S3 Pharmacist Only. Bleaches fabrics/towels. Avoid eyes/lips/mucous membranes. Start with 2.5% and small area" },

  // === Germany (DE) Drugs ===
  ibuprofen_400_de: { id: "ibuprofen_400_de", nameKR: "이부프로펜 400mg", nameVN: "Ibuprofen 400mg", nameUS: "Ibuprofen 400mg", nameDE: "Ibuprofen 400 ratiopharm", ingredient: "Ibuprofen 400mg", dosageKR: "1정, 식후, 하루 최대 3회(1200mg)", dosageVN: "1 viên, sau ăn, tối đa 3 lần/ngày", dosageUS: "1 tab, with food, max 3 times/day (1200mg)", dosageDE: "1 Tablette, nach dem Essen, max. 3x täglich (1200mg). Apothekenpflichtig", precautionKR: "공복 금지. 임신 20주 이후 금기. 위궤양·위장출혈 금기", precautionVN: "Không uống lúc đói. Cấm sau 20 tuần thai", precautionUS: "Not on empty stomach. No after 20wks pregnancy", precautionDE: "Nicht auf nüchternen Magen. Kontraindiziert ab 20. SSW. Magen-Darm-Blutung Risiko" },
  
  aspirin_de: { id: "aspirin_de", nameKR: "아스피린", nameVN: "Aspirin", nameUS: "Aspirin", nameDE: "Aspirin 500mg", nameLocal: "Aspirin", ingredient: "Acetylsalicylsäure (ASS) 500mg", dosageKR: "1~2정, 4~6시간 간격", dosageVN: "1~2 viên, cách 4~6 giờ", dosageUS: "1-2 tabs, every 4-6hrs", dosageDE: "1-2 Tabletten, alle 4-6 Stunden. Apothekenpflichtig", precautionKR: "12세 미만 금기(Reye 증후군). 위장 출혈 주의. 항응고제 병용 주의", precautionVN: "Cấm dưới 12 tuổi (Reye). Chảy máu dạ dày cẩn thận", precautionUS: "No under 12 (Reye). GI bleeding risk. Anticoagulant interaction", precautionDE: "Unter 12 Jahren kontraindiziert (Reye-Syndrom). GI-Blutungsrisiko. Antikoagulanzien-Wechselwirkung" },
  
  paracetamol_de: { id: "paracetamol_de", nameKR: "파라세타몰 (벤유론)", nameVN: "Paracetamol (ben-u-ron)", nameUS: "Paracetamol (ben-u-ron)", nameDE: "Paracetamol 500mg ratiopharm / ben-u-ron", nameLocal: "ben-u-ron", pronKR: "벤유론", pronEN: "ben-u-ron", ingredient: "Paracetamol 500mg", dosageKR: "1~2정, 4~6시간 간격, 하루 최대 8정(4g)", dosageVN: "1~2 viên, cách 4~6 giờ, tối đa 8 viên/ngày", dosageUS: "1-2 tabs, every 4-6hrs, max 8/day (4g)", dosageDE: "1-2 Tabletten, alle 4-6 Stunden, max. 8/Tag (4g). Apothekenpflichtig", precautionKR: "간독성, 음주자 주의. 다른 파라세타몰 약 중복 금지", precautionVN: "Nguy cơ gan, người uống rượu cẩn thận. Không dùng chung paracetamol khác", precautionUS: "Liver toxicity, alcohol users caution. No other paracetamol products", precautionDE: "Lebertoxizität, Alkohol-Vorsicht. Keine anderen Paracetamol-Produkte gleichzeitig" },
  
  thomapyrin_de: { id: "thomapyrin_de", nameKR: "토마피린 클라식", nameVN: "Thomapyrin Classic", nameUS: "Thomapyrin Classic", nameDE: "Thomapyrin CLASSIC", nameLocal: "Thomapyrin CLASSIC", pronKR: "토마피린 클라식", pronEN: "to-ma-py-rin clas-sic", ingredient: "ASS 250mg + Paracetamol 200mg + Coffein 50mg", dosageKR: "1~2정, 4~8시간 간격, 하루 최대 6정", dosageVN: "1~2 viên, cách 4~8 giờ, tối đa 6 viên/ngày", dosageUS: "1-2 tabs, every 4-8hrs, max 6/day", dosageDE: "1-2 Tabletten, alle 4-8 Stunden, max. 6 Tabletten/Tag. Ab 12 Jahren", precautionKR: "12세 미만 금기(ASS→Reye). 다른 파라세타몰/ASS 약 병용 금지. 임신 3분기 금기. 장기복용→약물남용성 두통", precautionVN: "Cấm dưới 12 tuổi. Không dùng chung paracetamol/ASS khác. Cấm 3 tháng cuối thai kỳ", precautionUS: "No under 12 (Reye). No other paracetamol/ASS. No in 3rd trimester. Long-term→MOH risk", precautionDE: "Unter 12 Jahren kontraindiziert (Reye). Keine anderen Paracetamol/ASS-Produkte. 3. Trimenon kontraindiziert. Langfristig→Medikamenten-Übergebrauchskopfschmerz" },
  
  grippostad_de: { id: "grippostad_de", nameKR: "그리포스타트 C", nameVN: "Grippostad C", nameUS: "Grippostad C", nameDE: "Grippostad C", nameLocal: "Grippostad C", pronKR: "그리포스타트 체", pronEN: "grip-po-stat tsay", ingredient: "Paracetamol 200mg + Vitamin C 150mg + Coffein 25mg + Chlorphenamin 2.5mg (per capsule)", dosageKR: "2캡슐, 하루 3회, 12세 이상", dosageVN: "2 viên, 3 lần/ngày, từ 12 tuổi", dosageUS: "2 capsules, 3 times/day, 12+ years", dosageDE: "2 Kapseln, 3x täglich. Ab 12 Jahren. Apothekenpflichtig", precautionKR: "졸음→운전 금지. 다른 파라세타몰 약 병용 금지. 임산부·수유부 금기. 3일 이상 금지", precautionVN: "Buồn ngủ→không lái xe. Không dùng chung paracetamol khác. Thai phụ cấm", precautionUS: "Drowsy→no driving. No other paracetamol. Pregnancy/breastfeeding contraindicated. Max 3 days", precautionDE: "Schläfrigkeit→nicht fahren. Keine anderen Paracetamol-Produkte. Schwangerschaft/Stillzeit kontraindiziert. Max. 3 Tage" },
  
  aspirin_complex_de: { id: "aspirin_complex_de", nameKR: "아스피린 콤플렉스", nameVN: "Aspirin Complex", nameUS: "Aspirin Complex", nameDE: "Aspirin Complex", nameLocal: "Aspirin Complex", pronKR: "아스피린 콤플렉스", pronEN: "as-pi-rin com-plex", ingredient: "ASS 500mg + Pseudoephedrin HCl 30mg", dosageKR: "1포, 물에 녹여, 하루 3~4회", dosageVN: "1 gói pha nước, 3~4 lần/ngày", dosageUS: "1 sachet dissolved, 3-4 times/day", dosageDE: "1 Beutel in Wasser lösen, 3-4x täglich. Ab 16 Jahren", precautionKR: "16세 미만 금기. 고혈압·심장·갑상선 금기. MAO 억제제 금기. 위장 출혈 위험", precautionVN: "Cấm dưới 16 tuổi. Cao huyết áp/tim/giáp cấm", precautionUS: "No under 16. Hypertension/heart/thyroid contraindicated. No MAOIs", precautionDE: "Unter 16 Jahren kontraindiziert. Hypertonie/Herz/Schilddrüse kontraindiziert. Keine MAO-Hemmer" },
  
  wick_daymed_de: { id: "wick_daymed_de", nameKR: "빅 데이메드", nameVN: "WICK DayMed", nameUS: "WICK DayMed", nameDE: "WICK DayMed", nameLocal: "WICK DayMed", pronKR: "빅 데이메드", pronEN: "vik day-med", ingredient: "Paracetamol 500mg + Phenylephrin 10mg + DXM 10mg", dosageKR: "1캡슐, 하루 3~4회", dosageVN: "1 viên, 3~4 lần/ngày", dosageUS: "1 capsule, 3-4 times/day", dosageDE: "1 Kapsel, 3-4x täglich. Apothekenpflichtig", precautionKR: "다른 파라세타몰 약 병용 금지. MAO 억제제 금기", precautionVN: "Không dùng chung paracetamol khác. MAOI cấm", precautionUS: "No other paracetamol. No MAOIs", precautionDE: "Keine anderen Paracetamol-Produkte. Keine MAO-Hemmer" },
  
  sinupret_de: { id: "sinupret_de", nameKR: "시누프렛 포르테", nameVN: "Sinupret forte", nameUS: "Sinupret forte", nameDE: "Sinupret forte", nameLocal: "Sinupret forte", pronKR: "지누프렛 포르테", pronEN: "zi-nu-pret for-te", ingredient: "Gentian+Primrose+Verbena+Elderflower+Sorrel (Phytopharmaka)", dosageKR: "1정, 하루 3회, 식후", dosageVN: "1 viên, 3 lần/ngày, sau ăn", dosageUS: "1 tab, 3 times/day, after meals", dosageDE: "1 Tablette, 3x täglich, nach dem Essen. Pflanzliches Arzneimittel", precautionKR: "부비동염·코막힘 식물성 의약품. 임산부 의사 상담", precautionVN: "Thuốc thảo dược viêm xoang. Thai phụ hỏi bác sĩ", precautionUS: "Herbal sinusitis medicine. Pregnancy: consult doctor", precautionDE: "Pflanzliches Sinusitis-Mittel. Schwangerschaft: Arzt konsultieren" },
  
  mucosolvan_de: { id: "mucosolvan_de", nameKR: "무코솔반", nameVN: "Mucosolvan", nameUS: "Mucosolvan", nameDE: "Mucosolvan", nameLocal: "Mucosolvan", pronKR: "무코솔반", pronEN: "mu-ko-sol-van", ingredient: "Ambroxol HCl 30mg", dosageKR: "1정, 하루 2~3회", dosageVN: "1 viên, 2~3 lần/ngày", dosageUS: "1 tab, 2-3 times/day", dosageDE: "1 Tablette, 2-3x täglich. Ausreichend trinken", precautionKR: "충분한 수분 섭취. 소화성 궤양 주의", precautionVN: "Uống nhiều nước. Loét dạ dày cẩn thận", precautionUS: "Drink plenty of water. Peptic ulcer caution", precautionDE: "Ausreichend Flüssigkeit trinken. Magengeschwür Vorsicht" },
  
  acc_600_de: { id: "acc_600_de", nameKR: "ACC 아쿠트 600", nameVN: "ACC Akut 600", nameUS: "ACC Akut 600", nameDE: "ACC akut 600 Brausetabletten", nameLocal: "ACC akut 600", pronKR: "아체체 아쿠트", pronEN: "ah-tse-tse a-koot", ingredient: "Acetylcystein 600mg", dosageKR: "1포(발포정), 물에 녹여, 하루 1회", dosageVN: "1 viên sủi pha nước, 1 lần/ngày", dosageUS: "1 effervescent tab in water, once daily", dosageDE: "1 Brausetablette in Wasser lösen, 1x täglich", precautionKR: "소화성 궤양 주의. 천식 환자 기관지 경련 가능", precautionVN: "Loét dạ dày cẩn thận. Hen suyễn: co thắt phế quản có thể xảy ra", precautionUS: "Peptic ulcer caution. Asthma: bronchospasm possible", precautionDE: "Magengeschwür Vorsicht. Asthma: Bronchospasmus möglich" },
  
  gelomyrtol_de: { id: "gelomyrtol_de", nameKR: "겔로미르톨 포르테", nameVN: "Gelomyrtol forte", nameUS: "Gelomyrtol forte", nameDE: "GeloMyrtol forte", nameLocal: "GeloMyrtol forte", pronKR: "겔로뮈르톨 포르테", pronEN: "ge-lo-myr-tol for-te", ingredient: "Myrtol standardized extract (Eucalyptus+Orange+Myrtle+Lemon oils)", dosageKR: "1캡슐, 식전 30분, 하루 3~4회", dosageVN: "1 viên, 30 phút trước ăn, 3~4 lần/ngày", dosageUS: "1 capsule, 30min before meals, 3-4 times/day", dosageDE: "1 Kapsel, 30 Min. vor dem Essen, 3-4x täglich. Pflanzliches Arzneimittel", precautionKR: "반드시 식전 복용! 5세 이상 소아용(GeloMyrtol 300) 별도", precautionVN: "Phải uống trước ăn! Trẻ 5+ dùng GeloMyrtol 300", precautionUS: "Must take before meals! Children 5+: use GeloMyrtol 300", precautionDE: "Unbedingt vor dem Essen einnehmen! Kinder ab 5: GeloMyrtol 300 verwenden" },
  
  doloDobendan_de: { id: "doloDobendan_de", nameKR: "돌로도벤단", nameVN: "Dolo-Dobendan", nameUS: "Dolo-Dobendan", nameDE: "Dolo-Dobendan", nameLocal: "Dolo-Dobendan", pronKR: "돌로도벤단", pronEN: "do-lo-do-ben-dan", ingredient: "Benzocaine 1.5mg + Cetylpyridiniumchlorid 0.3mg", dosageKR: "1정, 2~3시간 간격, 하루 최대 8정", dosageVN: "1 viên, cách 2~3 giờ, tối đa 8 viên/ngày", dosageUS: "1 lozenge, every 2-3hrs, max 8/day", dosageDE: "1 Lutschtablette, alle 2-3 Stunden, max. 8/Tag", precautionKR: "Benzocaine→메트헤모글로빈혈증 위험(드묾). 2세 미만 금지", precautionVN: "Benzocaine→nguy cơ methemoglobin (hiếm). Cấm dưới 2 tuổi", precautionUS: "Benzocaine→methemoglobinemia risk (rare). No under 2", precautionDE: "Benzocain→Methämoglobinämie-Risiko (selten). Unter 2 Jahren kontraindiziert" },
  
  neoAngin_de: { id: "neoAngin_de", nameKR: "네오앙긴", nameVN: "Neo-Angin", nameUS: "Neo-Angin", nameDE: "Neo-Angin", nameLocal: "Neo-Angin", pronKR: "네오앙긴", pronEN: "ne-o-an-gin", ingredient: "Amylmetacresol + Dichlorobenzylalkohol + Menthol", dosageKR: "1정, 2~3시간 간격", dosageVN: "1 viên, cách 2~3 giờ", dosageUS: "1 lozenge, every 2-3hrs", dosageDE: "1 Lutschtablette, alle 2-3 Stunden", precautionKR: "6세 미만 금지", precautionVN: "Cấm dưới 6 tuổi", precautionUS: "No under 6", precautionDE: "Unter 6 Jahren kontraindiziert" },
  
  xylometazoline_de: { id: "xylometazoline_de", nameKR: "코 스프레이 (자일로메타졸린)", nameVN: "Nasenspray Xylometazoline", nameUS: "Nasal Spray Xylometazoline", nameDE: "Nasenspray ratiopharm Erwachsene", ingredient: "Xylometazolin HCl 0.1%", dosageKR: "1~2회 분사, 하루 2~3회", dosageVN: "1~2 lần xịt, 2~3 lần/ngày", dosageUS: "1-2 sprays, 2-3 times/day", dosageDE: "1-2 Sprühstöße je Nasenloch, 2-3x täglich. Max. 7 Tage", precautionKR: "7일 초과 금지(반동성 코막힘). 6세 미만 소아용 0.05% 사용", precautionVN: "Không dùng quá 7 ngày. Trẻ dưới 6 tuổi dùng 0.05%", precautionUS: "No more than 7 days. Under 6: use 0.05% children's", precautionDE: "Nicht länger als 7 Tage (Rhinitis medicamentosa). Unter 6 Jahren: 0,05% Kinderversion" },
  
  cetirizin_de: { id: "cetirizin_de", nameKR: "세티리진", nameVN: "Cetirizin", nameUS: "Cetirizine", nameDE: "Cetirizin ratiopharm 10mg", ingredient: "Cetirizin HCl 10mg", dosageKR: "1정, 하루 1회(취침 전)", dosageVN: "1 viên, 1 lần/ngày (trước ngủ)", dosageUS: "1 tab, once daily (bedtime)", dosageDE: "1 Tablette, 1x täglich (abends). Apothekenpflichtig", precautionKR: "졸음 가능. 신장질환 시 용량 조절", precautionVN: "Có thể buồn ngủ. Bệnh thận điều chỉnh liều", precautionUS: "May cause drowsiness. Kidney disease: dose adjustment", precautionDE: "Kann Schläfrigkeit verursachen. Nierenerkrankung: Dosisanpassung" },
  
  loratadin_de: { id: "loratadin_de", nameKR: "로라타딘", nameVN: "Loratadin", nameUS: "Loratadine", nameDE: "Loratadin ratiopharm 10mg", ingredient: "Loratadin 10mg", dosageKR: "1정, 하루 1회", dosageVN: "1 viên, 1 lần/ngày", dosageUS: "1 tab, once daily", dosageDE: "1 Tablette, 1x täglich. Apothekenpflichtig", precautionKR: "졸음 매우 적음. 간질환 시 격일 복용", precautionVN: "Ít gây buồn ngủ. Bệnh gan uống cách ngày", precautionUS: "Very low drowsiness. Liver disease: every other day", precautionDE: "Sehr geringe Schläfrigkeit. Lebererkrankung: jeden 2. Tag" },
  
  iberogast_de: { id: "iberogast_de", nameKR: "이베로가스트", nameVN: "Iberogast", nameUS: "Iberogast", nameDE: "Iberogast", nameLocal: "Iberogast", pronKR: "이베로가스트", pronEN: "ee-be-ro-gast", ingredient: "9 Pflanzenextrakte (Iberis amara + 8 weitere)", dosageKR: "20방울, 식전/식간, 하루 3회", dosageVN: "20 giọt, trước/giữa bữa ăn, 3 lần/ngày", dosageUS: "20 drops, before/between meals, 3 times/day", dosageDE: "20 Tropfen, vor/zwischen den Mahlzeiten, 3x täglich", precautionKR: "⚠️ 간독성 위험! Schöllkraut(애기똥풀) 함유→BfArM 경고(2018). 간질환자·임산부 금기. 알코올 31% 함유", precautionVN: "⚠️ Nguy cơ gan! Chứa Schöllkraut→cảnh báo BfArM. Bệnh gan/thai phụ cấm. Cồn 31%", precautionUS: "⚠️ Liver toxicity risk! Contains Chelidonium→BfArM warning(2018). Liver disease/pregnancy contraindicated. 31% alcohol", precautionDE: "⚠️ Lebertoxizitätsrisiko! Enthält Schöllkraut→BfArM-Warnung (2018). Lebererkrankung/Schwangerschaft kontraindiziert. 31 Vol.-% Alkohol" },
  
  maaloxan_de: { id: "maaloxan_de", nameKR: "말록산", nameVN: "Maaloxan", nameUS: "Maaloxan", nameDE: "Maaloxan 25mVal", nameLocal: "Maaloxan", pronKR: "말록산", pronEN: "ma-lox-an", ingredient: "Aluminium hydroxide + Magnesium hydroxide", dosageKR: "1~2정 씹어먹기, 식후 1시간", dosageVN: "1~2 viên nhai, 1 giờ sau ăn", dosageUS: "1-2 chewable tabs, 1hr after meals", dosageDE: "1-2 Kautabletten, 1 Stunde nach dem Essen", precautionKR: "신장질환 금기(Al·Mg 축적). 항생제와 2시간 간격. 14일 이상 시 의사", precautionVN: "Bệnh thận cấm. Cách kháng sinh 2 giờ", precautionUS: "Kidney disease contraindicated. Space antibiotics 2hrs. Over 14 days→doctor", precautionDE: "Niereninsuffizienz kontraindiziert. 2 Stunden Abstand zu Antibiotika. Über 14 Tage→Arzt" },
  
  omeprazol_de: { id: "omeprazol_de", nameKR: "오메프라졸", nameVN: "Omeprazol", nameUS: "Omeprazole", nameDE: "Omeprazol ratiopharm 20mg", ingredient: "Omeprazol 20mg", dosageKR: "1정, 아침 식전, 14일 코스", dosageVN: "1 viên, trước bữa sáng, 14 ngày", dosageUS: "1 tab, before breakfast, 14-day course", dosageDE: "1 Tablette, vor dem Frühstück, 14 Tage. Apothekenpflichtig", precautionKR: "14일 초과 자가 복용 금지. 클로피도그렐 병용 금기", precautionVN: "Không quá 14 ngày tự dùng. Clopidogrel cấm dùng chung", precautionUS: "No more than 14 days self-treatment. Clopidogrel contraindicated", precautionDE: "Max. 14 Tage Selbstmedikation. Clopidogrel kontraindiziert" },
  
  imodium_de: { id: "imodium_de", nameKR: "이모디움 아쿠트", nameVN: "Imodium akut", nameUS: "Imodium akut", nameDE: "Imodium akut", ingredient: "Loperamid HCl 2mg", dosageKR: "초회 2정, 이후 설사마다 1정, 하루 최대 8정", dosageVN: "Đầu tiên 2 viên, sau mỗi lần 1 viên, tối đa 8/ngày", dosageUS: "First 2 tabs, then 1 per stool, max 8/day", dosageDE: "Anfangs 2 Tabletten, dann 1 nach jedem Stuhl, max. 8/Tag", precautionKR: "12세 미만 금지. 혈변·발열 시 금지. 48시간 이내 개선 없으면 의사", precautionVN: "Cấm dưới 12 tuổi. Máu/sốt cấm. 48 giờ→bác sĩ", precautionUS: "No under 12. No bloody stool/fever. 48hrs→doctor", precautionDE: "Unter 12 Jahren kontraindiziert. Kein Blut im Stuhl/Fieber. 48 Stunden→Arzt" },
  
  perenterol_de: { id: "perenterol_de", nameKR: "페렌테롤", nameVN: "Perenterol", nameUS: "Perenterol", nameDE: "Perenterol forte 250mg", nameLocal: "Perenterol", pronKR: "페렌테롤", pronEN: "pe-ren-te-rol", ingredient: "Saccharomyces cerevisiae HANSEN CBS 5926 (medizinische Hefe)", dosageKR: "1~2캡슐, 하루 1~2회", dosageVN: "1~2 viên, 1~2 lần/ngày", dosageUS: "1-2 capsules, 1-2 times/day", dosageDE: "1-2 Kapseln, 1-2x täglich. Apothekenpflichtig", precautionKR: "면역저하 환자 진균 혈증 위험→의사 상담. 중앙정맥 카테터 환자 금기", precautionVN: "Người suy giảm miễn dịch→hỏi bác sĩ. Catheter tĩnh mạch trung tâm cấm", precautionUS: "Immunocompromised: fungemia risk→consult doctor. Central venous catheter contraindicated", precautionDE: "Immunsupprimierte: Fungämie-Risiko→Arzt konsultieren. Zentralvenöser Katheter kontraindiziert" },
  
  elotrans_de: { id: "elotrans_de", nameKR: "엘로트란스 (ORS)", nameVN: "Elotrans (ORS)", nameUS: "Elotrans (ORS)", nameDE: "Elotrans Pulver", nameLocal: "Elotrans", pronKR: "엘로트란스", pronEN: "e-lo-trans", ingredient: "Elektrolyte (Na, K, Cl, Citrat, Glucose)", dosageKR: "1포, 물에 타서 소량씩", dosageVN: "1 gói pha nước, uống từng chút", dosageUS: "1 sachet in water, sip frequently", dosageDE: "1 Beutel in Wasser auflösen, schluckweise trinken. Auch beliebt als Kater-Mittel!", precautionKR: "끓인 후 식힌 물. 24시간 내 사용. 독일인 숙취 해소 인기 제품!", precautionVN: "Nước đun sôi để nguội. Dùng trong 24 giờ. Người Đức hay dùng trị hangover!", precautionUS: "Boiled cooled water. Use within 24hrs. Popular hangover remedy in Germany!", precautionDE: "Abgekochtes, abgekühltes Wasser. Innerhalb 24 Stunden verbrauchen. Beliebtes Kater-Mittel!" },
  
  vomex_de: { id: "vomex_de", nameKR: "보멕스 A", nameVN: "Vomex A", nameUS: "Vomex A", nameDE: "Vomex A", nameLocal: "Vomex A", pronKR: "보멕스 아", pronEN: "vo-meks ah", ingredient: "Dimenhydrinat 50mg", dosageKR: "1정, 출발 30분 전, 하루 최대 8정", dosageVN: "1 viên, 30 phút trước đi, tối đa 8 viên/ngày", dosageUS: "1 tab, 30min before travel, max 8/day", dosageDE: "1 Tablette, 30 Min. vor der Reise, max. 8/Tag (400mg). Apothekenpflichtig", precautionKR: "졸음→운전 금지. 녹내장·전립선비대 금기. 음주 금지", precautionVN: "Buồn ngủ→không lái xe. Glôcôm/tiền liệt tuyến cấm. Không uống rượu", precautionUS: "Drowsy→no driving. Glaucoma/prostate contraindicated. No alcohol", precautionDE: "Schläfrigkeit→nicht fahren. Glaukom/Prostatahyperplasie kontraindiziert. Kein Alkohol" },
  
  voltaren_de: { id: "voltaren_de", nameKR: "볼타렌 슈메르츠겔", nameVN: "Voltaren Schmerzgel", nameUS: "Voltaren Schmerzgel", nameDE: "Voltaren Schmerzgel", nameLocal: "Voltaren Schmerzgel", pronKR: "볼타렌 슈메르츠겔", pronEN: "vol-ta-ren shmertz-gel", ingredient: "Diclofenac Diethylammonium (1% Diclofenac-Na)", dosageKR: "하루 3~4회 도포, 최대 2주", dosageVN: "Thoa 3~4 lần/ngày, tối đa 2 tuần", dosageUS: "Apply 3-4 times/day, max 2 weeks", dosageDE: "3-4x täglich auftragen, max. 2 Wochen. Apothekenpflichtig", precautionKR: "광과민성→도포 부위 햇빛 주의. 임신 30주 이후 금기", precautionVN: "Tránh nắng vùng thoa. Cấm sau 30 tuần thai", precautionUS: "Photosensitivity. No after 30wks pregnancy", precautionDE: "Photosensitivität→behandelte Stelle vor Sonne schützen. Ab 30. SSW kontraindiziert" },
  
  fenistil_de: { id: "fenistil_de", nameKR: "페니스틸 겔", nameVN: "Fenistil Gel", nameUS: "Fenistil Gel", nameDE: "Fenistil Gel", nameLocal: "Fenistil", pronKR: "페니스틸", pronEN: "fe-nis-til", ingredient: "Dimetindenmaleat 0.1%", dosageKR: "환부에 하루 2~4회 도포", dosageVN: "Thoa 2~4 lần/ngày", dosageUS: "Apply 2-4 times/day", dosageDE: "2-4x täglich auftragen. Apothekenpflichtig", precautionKR: "2세 미만 의사 상담. 눈·점막 금지", precautionVN: "Dưới 2 tuổi hỏi bác sĩ. Tránh mắt/niêm mạc", precautionUS: "Under 2: consult doctor. No eyes/mucous", precautionDE: "Unter 2 Jahren: Arzt konsultieren. Nicht an Augen/Schleimhäuten" },
  
  bepanthen_eye_de: { id: "bepanthen_eye_de", nameKR: "베판텐 안약", nameVN: "Bepanthen Augentropfen", nameUS: "Bepanthen Eye Drops", nameDE: "Bepanthen Augentropfen", nameLocal: "Bepanthen Augentropfen", pronKR: "베판텐 아우겐트롭펜", pronEN: "be-pan-ten ow-gen-trop-fen", ingredient: "Dexpanthenol 50mg/ml (5%)", dosageKR: "1방울, 하루 수회", dosageVN: "1 giọt, nhiều lần/ngày", dosageUS: "1 drop, several times/day", dosageDE: "1 Tropfen, mehrmals täglich. Apothekenpflichtig", precautionKR: "렌즈 빼고 사용, 15분 후 재착용", precautionVN: "Tháo kính áp tròng, đeo lại sau 15 phút", precautionUS: "Remove contacts, reinsert after 15min", precautionDE: "Kontaktlinsen entfernen, nach 15 Min. wieder einsetzen" },
  
  kamistad_de: { id: "kamistad_de", nameKR: "카미스타트 겔", nameVN: "Kamistad Gel", nameUS: "Kamistad Gel", nameDE: "Kamistad Gel", nameLocal: "Kamistad", pronKR: "카미스타트", pronEN: "ka-mi-stat", ingredient: "Lidocain HCl + Kamillenblüten-Extrakt", dosageKR: "환부에 소량 도포, 하루 3회", dosageVN: "Thoa ít lên vết loét, 3 lần/ngày", dosageUS: "Apply small amount, 3 times/day", dosageDE: "Erbsengroße Menge auftragen, 3x täglich", precautionKR: "국화과 알레르기 주의(캐모마일)", precautionVN: "Dị ứng họ cúc cẩn thận (hoa cúc)", precautionUS: "Asteraceae allergy caution (chamomile)", precautionDE: "Korbblütler-Allergie beachten (Kamille)" },
  
  dulcolax_de: { id: "dulcolax_de", nameKR: "둘코락스", nameVN: "Dulcolax", nameUS: "Dulcolax", nameDE: "Dulcolax Dragées", ingredient: "Bisacodyl 5mg", dosageKR: "1~2정, 취침 전", dosageVN: "1~2 viên, trước ngủ", dosageUS: "1-2 tabs, at bedtime", dosageDE: "1-2 Dragées, abends vor dem Schlafengehen", precautionKR: "장기 복용 금지. 우유·제산제와 1시간 간격. 6세 미만 금지", precautionVN: "Không dùng lâu dài. Cách sữa/antacid 1 giờ. Dưới 6 tuổi cấm", precautionUS: "No long-term use. Space milk/antacids 1hr. No under 6", precautionDE: "Nicht dauerhaft einnehmen. 1 Stunde Abstand zu Milch/Antazida. Unter 6 Jahren kontraindiziert" },
  
  movicol_de: { id: "movicol_de", nameKR: "모비콜", nameVN: "Movicol", nameUS: "Movicol", nameDE: "Movicol", nameLocal: "Movicol", pronKR: "모비콜", pronEN: "mo-vi-col", ingredient: "Macrogol 3350 13.125g + Elektrolyte", dosageKR: "1포, 물 125ml에, 하루 1~3회", dosageVN: "1 gói pha 125ml nước, 1~3 lần/ngày", dosageUS: "1 sachet in 125ml water, 1-3 times/day", dosageDE: "1 Beutel in 125ml Wasser, 1-3x täglich. Keine Gewöhnung", precautionKR: "충분한 수분. 장폐색 금기. 의존성 없음", precautionVN: "Uống đủ nước. Tắc ruột cấm. Không gây lệ thuộc", precautionUS: "Adequate fluids. Bowel obstruction contraindicated. No dependency", precautionDE: "Ausreichend trinken. Darmverschluss kontraindiziert. Keine Gewöhnung" },
  
  bepanthen_de: { id: "bepanthen_de", nameKR: "베판텐 상처연고", nameVN: "Bepanthen Wundsalbe", nameUS: "Bepanthen Wound Ointment", nameDE: "Bepanthen Wund- und Heilsalbe", nameLocal: "Bepanthen", pronKR: "베판텐", pronEN: "be-pan-ten", ingredient: "Dexpanthenol 5% (50mg/g)", dosageKR: "환부에 하루 수회 도포", dosageVN: "Thoa nhiều lần/ngày", dosageUS: "Apply several times/day", dosageDE: "Mehrmals täglich dünn auftragen. Deutschlands beliebteste Wundsalbe", precautionKR: "감염 상처는 먼저 소독 필요", precautionVN: "Vết thương nhiễm trùng cần sát trùng trước", precautionUS: "Infected wounds need disinfection first", precautionDE: "Infizierte Wunden zuerst desinfizieren" },
  
  betaisodona_de: { id: "betaisodona_de", nameKR: "베타이소도나", nameVN: "Betaisodona", nameUS: "Betaisodona", nameDE: "Betaisodona Salbe/Lösung", nameLocal: "Betaisodona", pronKR: "베타이소도나", pronEN: "be-ta-ee-so-do-na", ingredient: "Povidon-Iod 10%", dosageKR: "상처 소독, 도포", dosageVN: "Sát trùng vết thương, thoa", dosageUS: "Wound disinfection, apply", dosageDE: "Zur Wunddesinfektion auftragen. Apothekenpflichtig", precautionKR: "갑상선질환 주의(요오드). 요오드 알레르기 금기", precautionVN: "Bệnh tuyến giáp cẩn thận. Dị ứng iốt cấm", precautionUS: "Thyroid disease caution. Iodine allergy prohibited", precautionDE: "Schilddrüsenerkrankung Vorsicht (Jodaufnahme). Jodallergie kontraindiziert" },
  
  hoggar_de: { id: "hoggar_de", nameKR: "호가 나이트", nameVN: "Hoggar Night", nameUS: "Hoggar Night", nameDE: "Hoggar Night", nameLocal: "Hoggar Night", pronKR: "호가 나이트", pronEN: "ho-gar night", ingredient: "Doxylaminsuccinat 25mg", dosageKR: "반~1정, 취침 30분 전", dosageVN: "½~1 viên, 30 phút trước ngủ", dosageUS: "½-1 tab, 30min before bed", dosageDE: "½-1 Tablette, 30 Min. vor dem Schlafengehen. Max. 7 Tage. Apothekenpflichtig", precautionKR: "7일 이상 금지. 녹내장·전립선비대 금기. 음주 금지. 65세 이상 낙상·인지저하 위험", precautionVN: "Không quá 7 ngày. Glôcôm/tiền liệt tuyến cấm. Không rượu. 65+ ngã/suy giảm nhận thức", precautionUS: "No more than 7 days. Glaucoma/prostate contraindicated. No alcohol. 65+: fall/cognitive risk", precautionDE: "Max. 7 Tage. Glaukom/Prostatahyperplasie kontraindiziert. Kein Alkohol. 65+: Sturzgefahr/kognitive Beeinträchtigung" },
  
  canesten_de: { id: "canesten_de", nameKR: "카네스텐", nameVN: "Canesten", nameUS: "Canesten", nameDE: "Canesten Creme", ingredient: "Clotrimazol 1%", dosageKR: "하루 2~3회, 4주 이상", dosageVN: "2~3 lần/ngày, trên 4 tuần", dosageUS: "2-3 times/day, 4+ weeks", dosageDE: "2-3x täglich, mindestens 4 Wochen. Bayer-Produkt (deutsches Unternehmen!)", precautionKR: "증상 후 2주 더 사용(재발 방지). Bayer 본사 제품!", precautionVN: "Dùng thêm 2 tuần sau khi hết. Sản phẩm Bayer (công ty Đức!)", precautionUS: "Continue 2 weeks after symptoms clear. Bayer product (German company!)", precautionDE: "2 Wochen nach Symptomfreiheit weiter anwenden. Bayer-Produkt!" },
  
  lamisil_de: { id: "lamisil_de", nameKR: "라미실", nameVN: "Lamisil", nameUS: "Lamisil", nameDE: "Lamisil Creme", ingredient: "Terbinafin HCl 1%", dosageKR: "하루 1~2회, 1~2주", dosageVN: "1~2 lần/ngày, 1~2 tuần", dosageUS: "1-2 times/day, 1-2 weeks", dosageDE: "1-2x täglich, 1-2 Wochen", precautionKR: "완치 후 1주 추가 도포", precautionVN: "Dùng thêm 1 tuần sau khi khỏi", precautionUS: "Continue 1 week after cure", precautionDE: "1 Woche nach Abheilung weiter anwenden" },
  
  benzaknen_de: { id: "benzaknen_de", nameKR: "벤작넨", nameVN: "Benzaknen", nameUS: "Benzaknen", nameDE: "Benzaknen 5%", nameLocal: "Benzaknen", pronKR: "벤작넨", pronEN: "ben-zak-nen", ingredient: "Benzoylperoxid 5%", dosageKR: "세안 후 하루 1~2회 도포", dosageVN: "Thoa sau rửa mặt, 1~2 lần/ngày", dosageUS: "Apply after cleansing, 1-2 times/day", dosageDE: "Nach Reinigung 1-2x täglich auftragen. Apothekenpflichtig", precautionKR: "옷 탈색 주의. 눈·점막 금지. 소량 테스트 후 시작", precautionVN: "Cẩn thận tẩy màu quần áo. Tránh mắt/niêm mạc", precautionUS: "Bleaches fabrics. No eyes/mucous. Patch test first", precautionDE: "Bleicht Textilien. Nicht an Augen/Schleimhäuten. Erst mit kleiner Fläche testen" },
  
  nurofen_junior_de: { id: "nurofen_junior_de", nameKR: "뉴로펜 주니어 시럽 (어린이)", nameVN: "Nurofen Junior Fiebersaft (trẻ em)", nameUS: "Nurofen Junior Syrup (children)", nameDE: "Nurofen Junior Fiebersaft", ingredient: "Ibuprofen 20mg/ml (2-8yr) or 40mg/ml (6-12yr)", dosageKR: "체중 기준(3개월+, 5kg+), 6~8시간 간격", dosageVN: "Theo cân nặng (3 tháng+), cách 6~8 giờ", dosageUS: "Weight-based (3mo+, 5kg+), every 6-8hrs", dosageDE: "Gewichtsbasiert (ab 3 Monaten, min. 5kg), alle 6-8 Stunden. Apothekenpflichtig", precautionKR: "6개월 미만 금기. 어린이용 제형만 사용", precautionVN: "Cấm dưới 6 tháng. Chỉ dùng dạng trẻ em", precautionUS: "No under 6 months. Children's formulation only", precautionDE: "Unter 6 Monaten kontraindiziert. Nur Kinder-Darreichungsform verwenden" },
  
  ben_u_ron_de: { id: "ben_u_ron_de", nameKR: "벤유론 시럽 (어린이)", nameVN: "ben-u-ron Saft (trẻ em)", nameUS: "ben-u-ron Syrup (children)", nameDE: "ben-u-ron Saft", nameLocal: "ben-u-ron Saft", pronKR: "벤유론 잡트", pronEN: "ben-u-ron zaft", ingredient: "Paracetamol 200mg/5ml", dosageKR: "체중/연령 기준, 4~6시간 간격", dosageVN: "Theo cân nặng/tuổi, cách 4~6 giờ", dosageUS: "Weight/age based, every 4-6hrs", dosageDE: "Gewichts-/altersbasiert, alle 4-6 Stunden. Deutsches Kinder-Fiebermittel", precautionKR: "다른 파라세타몰 약 중복 금지", precautionVN: "Không dùng chung paracetamol khác", precautionUS: "No other paracetamol products", precautionDE: "Keine anderen Paracetamol-Produkte gleichzeitig" },
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
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["sara_th", "ibuprofen_gpo_th"], ID: ["panadol_id", "bodrex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["ezn6_kr", "geborin_kr"], VN: ["hapacol_650_vn", "panadol_extra_vn"], US: ["excedrin_us", "advil_400_us"], JP: ["loxonin_s_jp", "eve_a_jp"] , TH: ["ponstan_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "paramex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "child": { KR: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], VN: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], US: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], JP: ["bufferin_child_jp", "bufferin_child_jp"] , TH: ["sara_kids_th", "sara_kids_th"], ID: ["sanmol_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + fever + runnyNose (cold)
      {
        comboKey: "fever+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "tylenol_coldfl_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "tiffy_dey_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + fever + cough (cold variant)
      {
        comboKey: "cough+fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + fever (just fever combo)
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "tylenol_coldfl_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "tiffy_dey_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + nausea (migraine-like)
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["ezn6_kr", "penzal_kr"], VN: ["panadol_extra_vn", "hapacol_650_vn"], US: ["excedrin_migraine_us", "advil_migraine_us"], JP: ["loxonin_s_jp", "eve_a_jp"] , TH: ["ponstan_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "paramex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + stiff neck (tension)
      {
        comboKey: "stiffNeck",
        drugMatches: {
          "default": { KR: ["brufen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "counterpain_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Headache + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "strepsils_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "cepacol_us"], JP: ["tylenol_a_jp", "perak_t_jp"] , TH: ["sara_th", "strepsils_th"], ID: ["panadol_id", "strepsils_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback: any other combo
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["sara_th", "ibuprofen_gpo_th"], ID: ["panadol_id", "bodrex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["sara_th", "ibuprofen_gpo_th"], ID: ["panadol_id", "bodrex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "child": { KR: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], VN: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], US: ["child_tylenol_syrup_kr", "child_brufen_syrup_kr"], JP: ["bufferin_child_jp", "bufferin_child_jp"] , TH: ["sara_kids_th", "sara_kids_th"], ID: ["sanmol_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + cough + runnyNose
      {
        comboKey: "cough+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + cough
      {
        comboKey: "cough",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + runnyNose
      {
        comboKey: "runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "theraflu_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "tiffy_dey_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + bodyAche (flu-like)
      {
        comboKey: "bodyAche",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["tiffy_vn", "new_ameflu_vn"], US: ["nyquil_us", "tylenol_coldsevere_us"], JP: ["pabron_gold_jp", "benza_block_jp"] , TH: ["tiffy_th", "sara_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "strepsils_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "cepacol_us"], JP: ["pabron_gold_jp", "perak_t_jp"] , TH: ["sara_th", "strepsils_th"], ID: ["panadol_id", "strepsils_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fever + stomachDiarrhea
      {
        comboKey: "stomachDiarrhea",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "jungrowhan_kr"], VN: ["panadol_500_vn", "berberin_vn"], US: ["tylenol_500_us", "pepto_us"], JP: ["tylenol_a_jp", "seirogan_jp"] , TH: ["sara_th", "ors_th"], ID: ["panadol_id", "diatabs_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["tylenol_500_kr", "brufen_200_kr"], VN: ["panadol_500_vn", "efferalgan_500_vn"], US: ["tylenol_500_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["sara_th", "ibuprofen_gpo_th"], ID: ["panadol_id", "bodrex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["copus_syrup_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"], JP: ["ryukakusan_jp", "aneton_jp"] , TH: ["woods_cough_th", "benadryl_cough_th"], ID: ["obh_combi_id", "woods_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["copus_syrup_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"], JP: ["ryukakusan_jp", "aneton_jp"] , TH: ["woods_cough_th", "benadryl_cough_th"], ID: ["obh_combi_id", "woods_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "child": { KR: ["child_cough_syrup_kr", "child_cough2_kr"], VN: ["child_cough_syrup_kr", "child_cough2_kr"], US: ["child_cough_syrup_kr", "child_cough2_kr"], JP: ["pabron_kids_jp", "pabron_kids_jp"] , TH: ["sara_kids_th", "sara_kids_th"], ID: ["sanmol_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Cough + phlegm
      {
        comboKey: "phlegm",
        drugMatches: {
          "default": { KR: ["mucopect_kr", "copus_kr"], VN: ["acc200_vn", "mucosolvan_vn"], US: ["mucinex_us", "robitussin_chest_us"], JP: ["ryukakusan_jp", "ryukakusan_direct_jp"] , TH: ["mucosolvan_th", "woods_cough_th"], ID: ["obh_combi_id", "woods_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Cough + fever + runnyNose → cold
      {
        comboKey: "fever+runnyNose",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["new_ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Cough + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "hwatu_ben_kr"], VN: ["new_ameflu_vn", "decolgen_forte_vn"], US: ["dayquil_us", "theraflu_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Cough + soreThroat
      {
        comboKey: "soreThroat",
        drugMatches: {
          "default": { KR: ["strepsils_kr", "copus_syrup_kr"], VN: ["strepsils_kr", "bophe_vn"], US: ["cepacol_us", "delsym_us"], JP: ["harenace_jp", "ryukakusan_jp"] , TH: ["strepsils_th", "woods_cough_th"], ID: ["strepsils_id", "obh_combi_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["copus_syrup_kr", "tushira_kr"], VN: ["bophe_vn", "prospan_vn"], US: ["delsym_us", "robitussin_dm_us"], JP: ["ryukakusan_jp", "aneton_jp"] , TH: ["woods_cough_th", "benadryl_cough_th"], ID: ["obh_combi_id", "woods_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["contac600_kr", "otrivin_kr"], VN: ["otrivin_vn", "coldib_vn"], US: ["sudafed_us", "afrin_us"], JP: ["pabron_nasal_jp", "nazal_spray_jp"] , TH: ["iliadin_th", "poysian_th"], ID: ["actifed_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nose + sneeze → allergy
      {
        comboKey: "sneeze",
        drugMatches: {
          "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nose + fever + cough → cold
      {
        comboKey: "cough+fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "coldapress_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nose + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "ameflu_vn"], US: ["dayquil_us", "tylenol_coldfl_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "tiffy_dey_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nose + facePressure → sinusitis
      {
        comboKey: "facePressure",
        drugMatches: {
          "default": { KR: ["contac600_kr", "sinechura_kr"], VN: ["otrivin_vn", "decolgen_forte_vn"], US: ["advil_sinus_us", "sudafed_us"], JP: ["pabron_nasal_jp", "eve_a_jp"] , TH: ["iliadin_th", "sara_th"], ID: ["actifed_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["contac600_kr", "otrivin_kr"], VN: ["otrivin_vn", "coldib_vn"], US: ["sudafed_us", "afrin_us"], JP: ["pabron_nasal_jp", "nazal_spray_jp"] , TH: ["iliadin_th", "poysian_th"], ID: ["actifed_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["strepsils_kr", "mokan_kr"], VN: ["strepsils_kr", "eugica_vn"], US: ["cepacol_us", "chloraseptic_us"], JP: ["harenace_jp", "perak_t_jp"] , TH: ["strepsils_th", "difflam_th"], ID: ["strepsils_id", "fg_troches_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Sore throat + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["tylenol_500_kr", "strepsils_kr"], VN: ["panadol_500_vn", "strepsils_kr"], US: ["tylenol_500_us", "cepacol_us"], JP: ["tylenol_a_jp", "perak_t_jp"] , TH: ["sara_th", "strepsils_th"], ID: ["panadol_id", "strepsils_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Sore throat + cough
      {
        comboKey: "cough",
        drugMatches: {
          "default": { KR: ["strepsils_kr", "copus_syrup_kr"], VN: ["strepsils_kr", "bophe_vn"], US: ["cepacol_us", "delsym_us"], JP: ["harenace_jp", "ryukakusan_jp"] , TH: ["strepsils_th", "woods_cough_th"], ID: ["strepsils_id", "obh_combi_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["strepsils_kr", "mokan_kr"], VN: ["strepsils_kr", "eugica_vn"], US: ["cepacol_us", "chloraseptic_us"], JP: ["harenace_jp", "perak_t_jp"] , TH: ["strepsils_th", "difflam_th"], ID: ["strepsils_id", "fg_troches_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["buscopan_kr", "doctorbear_kr"], VN: ["buscopan_vn", "nospa_vn"], US: ["pepto_us", "gasx_us"], JP: ["ohta_isan_jp", "cabagin_jp"] , TH: ["sara_th", "eno_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Stomach + diarrhea
      {
        comboKey: "diarrhea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"], JP: ["seirogan_jp", "stoppa_jp"] , TH: ["imodium_th", "smecta_th"], ID: ["diatabs_id", "oralit_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Stomach + nausea
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "doctorbear_kr"], VN: ["buscopan_vn", "motilium_vn"], US: ["pepto_us", "dramamine_us"], JP: ["ohta_isan_jp", "aneron_jp"] , TH: ["domperidone_th", "eno_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Stomach + heartburn
      {
        comboKey: "heartburn",
        drugMatches: {
          "default": { KR: ["gelpos_kr", "almagel_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"], JP: ["gaster_10_jp", "ohta_isan_jp"] , TH: ["eno_th", "gaviscon_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Stomach + bloating
      {
        comboKey: "bloating",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "doctorbear_kr"], VN: ["activated_charcoal_vn", "airx_vn"], US: ["gasx_us", "beano_us"], JP: ["ohta_isan_jp", "wakamoto_jp"] , TH: ["eno_th", "airx_th"], ID: ["promag_id", "enzyplex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Stomach + fever (right lower + fever → hospital for appendicitis is handled by the hospital combo below)
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "tylenol_500_kr"], VN: ["buscopan_vn", "panadol_500_vn"], US: ["pepto_us", "tylenol_500_us"], JP: ["ohta_isan_jp", "tylenol_a_jp"] , TH: ["sara_th", "eno_th"], ID: ["promag_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["buscopan_kr", "doctorbear_kr"], VN: ["buscopan_vn", "nospa_vn"], US: ["pepto_us", "gasx_us"], JP: ["ohta_isan_jp", "cabagin_jp"] , TH: ["sara_th", "eno_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"], JP: ["seirogan_jp", "stoppa_jp"] , TH: ["imodium_th", "smecta_th"], ID: ["diatabs_id", "oralit_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["ors_kr", "pocari_kr"], VN: ["oresol_vn", "hydrite_vn"], US: ["pedialyte_us", "dripdrop_us"], JP: ["biofermin_jp", "stoppa_jp"] , TH: ["ors_th", "smecta_th"], ID: ["oralit_id", "diatabs_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "child": { KR: ["child_ors_kr", "child_smecta_kr"], VN: ["child_ors_kr", "child_smecta_kr"], US: ["child_ors_kr", "child_smecta_kr"], JP: ["biofermin_jp", "biofermin_jp"] , TH: ["ors_th", "smecta_th"], ID: ["oralit_id", "diatabs_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Diarrhea + nausea → dehydration risk
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "ors_kr"], VN: ["berberin_vn", "oresol_vn"], US: ["imodium_us", "pedialyte_us"], JP: ["seirogan_jp", "biofermin_jp"] , TH: ["ors_th", "imodium_th"], ID: ["diatabs_id", "oralit_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Diarrhea + fever → infectious
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "tylenol_500_kr"], VN: ["berberin_vn", "panadol_500_vn"], US: ["imodium_us", "tylenol_500_us"], JP: ["seirogan_jp", "tylenol_a_jp"] , TH: ["imodium_th", "sara_th"], ID: ["diatabs_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["jungrowhan_kr", "smecta_kr"], VN: ["berberin_vn", "smecta_vn"], US: ["imodium_us", "pepto_us"], JP: ["seirogan_jp", "stoppa_jp"] , TH: ["imodium_th", "smecta_th"], ID: ["diatabs_id", "oralit_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["beaze_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["gasx_us", "beano_us"], JP: ["ohta_isan_jp", "wakamoto_jp"] , TH: ["eno_th", "domperidone_th"], ID: ["promag_id", "enzyplex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Indigestion + heartburn
      {
        comboKey: "heartburn",
        drugMatches: {
          "default": { KR: ["gelpos_kr", "famotidine_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"], JP: ["gaster_10_jp", "ohta_isan_jp"] , TH: ["gaviscon_th", "omeprazole_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Indigestion + bloating
      {
        comboKey: "bloating",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "doctorbear_kr"], VN: ["activated_charcoal_vn", "airx_vn"], US: ["gasx_us", "phazyme_us"], JP: ["ohta_isan_jp", "wakamoto_jp"] , TH: ["eno_th", "airx_th"], ID: ["promag_id", "enzyplex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["beaze_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["gasx_us", "beano_us"], JP: ["ohta_isan_jp", "wakamoto_jp"] , TH: ["eno_th", "domperidone_th"], ID: ["promag_id", "enzyplex_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["doctorbear_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["dramamine_us", "emetrol_us"], JP: ["aneron_jp", "travelmin_jp"] , TH: ["domperidone_th", "eno_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Motion sickness (detected via follow-up answer "멀미")
      {
        comboKey: "motionSickness",
        drugMatches: {
          "default": { KR: ["kimite_kr", "bonaring_kr"], VN: ["nautamine_vn", "dimenhydrinate_vn"], US: ["dramamine_us", "bonine_us"], JP: ["aneron_jp", "travelmin_jp"] , TH: ["navamed_th", "stugeron_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nausea + diarrhea+pain → food poisoning
      {
        comboKey: "diarrheaPain",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "doctorbear_kr"], VN: ["berberin_vn", "motilium_vn"], US: ["pepto_us", "dramamine_us"], JP: ["seirogan_jp", "aneron_jp"] , TH: ["ors_th", "domperidone_th"], ID: ["diatabs_id", "oralit_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Nausea + fever
      {
        comboKey: "fever",
        drugMatches: {
          "default": { KR: ["doctorbear_kr", "tylenol_500_kr"], VN: ["domperidone_vn", "panadol_500_vn"], US: ["dramamine_us", "tylenol_500_us"], JP: ["aneron_jp", "tylenol_a_jp"] , TH: ["domperidone_th", "sara_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["doctorbear_kr", "gashualmyeongsu_kr"], VN: ["domperidone_vn", "motilium_vn"], US: ["dramamine_us", "emetrol_us"], JP: ["aneron_jp", "travelmin_jp"] , TH: ["domperidone_th", "eno_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["ibuprofen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["ketotop_kr", "airpas_kr"], VN: ["salonpas_vn", "tigerbalm_vn"], US: ["icyhot_us", "bengay_us"], JP: ["salonpas_jp", "feitas_jp"] , TH: ["counterpain_th", "salonpas_th"], ID: ["bodrex_extra_id", "counterpain_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Muscle pain + fever + chills → flu
      {
        comboKey: "feverChills",
        drugMatches: {
          "default": { KR: ["pancol_a_kr", "tylenol_cold_kr"], VN: ["decolgen_forte_vn", "tiffy_vn"], US: ["dayquil_us", "nyquil_us"], JP: ["pabron_gold_jp", "lulu_attack_jp"] , TH: ["tiffy_th", "sara_th"], ID: ["procold_id", "decolgen_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Muscle pain + headache
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "tylenol_500_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["salonpas_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Muscle pain + jointPain
      {
        comboKey: "jointPain",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "salonpas_jp"] , TH: ["ibuprofen_gpo_th", "counterpain_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["ibuprofen_200_kr", "advil_liquigel_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "tylenol_500_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["ezn6_kr", "nacsen_kr"], VN: ["celebrex_vn", "arcoxia_vn"], US: ["aleve_us", "advil_400_us"], JP: ["loxonin_s_jp", "voltaren_gel_jp"] , TH: ["counterpain_th", "salonpas_th"], ID: ["bodrex_extra_id", "counterpain_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      { comboKey: "legNumb", hospitalWarning: true, warningKR: "허리 통증과 다리 저림이 함께 나타나면 디스크(추간판 탈출증)의 가능성이 있습니다. 정형외과 또는 신경외과를 방문하세요.", warningEN: "Back pain with leg numbness may indicate a herniated disc. Please visit an orthopedic or neurosurgery clinic.", warningVI: "Đau lưng kèm tê chân có thể là thoát vị đĩa đệm. Vui lòng đến khoa chỉnh hình hoặc thần kinh.", drugMatches: {} },
      { comboKey: "urineIssue", hospitalWarning: true, warningKR: "허리 통증과 소변 이상이 함께 나타나면 신장 결석이나 요로 감염의 가능성이 있습니다. 비뇨기과를 방문하세요.", warningEN: "Back pain with urinary problems may indicate kidney stones or UTI. Please visit a urologist.", warningVI: "Đau lưng kèm vấn đề tiểu tiện có thể là sỏi thận hoặc nhiễm trùng đường tiết niệu. Vui lòng đến khoa tiết niệu.", drugMatches: {} },
      { comboKey: "fever", hospitalWarning: true, warningKR: "허리 통증과 발열이 함께 나타나면 감염의 가능성이 있습니다. 병원을 방문하세요.", warningEN: "Back pain with fever may indicate an infection. Please visit a hospital.", warningVI: "Đau lưng kèm sốt có thể là nhiễm trùng. Vui lòng đến bệnh viện.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "salonpas_jp"] , TH: ["counterpain_th", "salonpas_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
      ], drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] }, "child": { KR: ["child_zyrtec_kr", "child_claritin_kr"], VN: ["child_zyrtec_kr", "child_claritin_kr"], US: ["child_zyrtec_kr", "child_claritin_kr"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "nasalSneeze", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] }, "child": { KR: ["child_zyrtec_kr", "child_claritin_kr"], VN: ["child_zyrtec_kr", "child_claritin_kr"], US: ["child_zyrtec_kr", "child_claritin_kr"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "eyeItch", drugMatches: { "default": { KR: ["cromolin_kr", "zyrtec_kr"], VN: ["cromolin_vn", "cetirizine_vn"], US: ["zaditor_us", "pataday_us"], JP: ["allegra_fx_jp", "rohto_v_jp"] , TH: ["zyrtec_th", "telfast_th"], ID: ["insto_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "skinRash", drugMatches: { "default": { KR: ["zyrtec_kr", "hydrocortisone_kr"], VN: ["cetirizine_vn", "phenergan_vn"], US: ["benadryl_us", "cortisone10_us"], JP: ["allegra_fx_jp", "muhi_alpha_jp"] , TH: ["zyrtec_th", "hydrocortisone_th"], ID: ["caladine_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "coughBreathless", hospitalWarning: true, warningKR: "알레르기와 함께 기침이나 숨참이 나타나면 천식의 가능성이 있습니다. 호흡기내과를 방문하세요.", warningEN: "Allergy with cough or shortness of breath may indicate asthma. Please visit a pulmonologist.", warningVI: "Dị ứng kèm ho hoặc khó thở có thể là hen suyễn. Vui lòng đến khoa hô hấp.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
      ], drugMatches: { "default": { KR: ["mullindi_kr", "bumugli_kr"], VN: ["tigerbalm_vn", "salonpas_vn"], US: ["benadryl_cream_us", "cortisone10_us"], JP: ["muhi_s_jp", "unakowa_jp"] , TH: ["siang_pure_th", "tiger_balm_th"], ID: ["caladine_id", "kayu_putih_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "fever", hospitalWarning: true, warningKR: "피부 발진과 발열이 함께 나타나면 감염성 질환의 가능성이 있습니다. 병원을 방문하세요.", warningEN: "Skin rash with fever may indicate an infectious disease. Please visit a hospital.", warningVI: "Phát ban kèm sốt có thể là bệnh truyền nhiễm. Vui lòng đến bệnh viện.", drugMatches: {} },
      { comboKey: "swellingBreathless", hospitalWarning: true, warningKR: "피부 발진과 함께 부종이나 숨참이 나타나면 아나필락시스(심한 알레르기 응급반응)의 가능성이 있습니다. 즉시 119 또는 현지 응급번호로 전화하세요.", warningEN: "Skin rash with swelling or breathing difficulty may indicate anaphylaxis (severe allergic emergency). Call 911 or local emergency number IMMEDIATELY.", warningVI: "Phát ban kèm sưng hoặc khó thở có thể là sốc phản vệ (cấp cứu dị ứng nặng). Gọi 115 hoặc số cấp cứu địa phương NGAY LẬP TỨC.", drugMatches: {} },
      { comboKey: "sneeze", drugMatches: { "default": { KR: ["zyrtec_kr", "claritin_kr"], VN: ["cetirizine_vn", "loratadine_vn"], US: ["zyrtec_us", "claritin_us"], JP: ["allegra_fx_jp", "allegra_fx_jp"] , TH: ["clarityne_th", "zyrtec_th"], ID: ["cetirizine_id", "loratadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["zyrtec_kr", "hydrocortisone_kr"], VN: ["cetirizine_vn", "phenergan_vn"], US: ["benadryl_us", "cortisone10_us"], JP: ["allegra_fx_jp", "muhi_alpha_jp"] , TH: ["calamine_th", "hydrocortisone_th"], ID: ["caladine_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
        "default": { KR: ["eve_kr", "ezn6_kr"], VN: ["ibuprofen_400_vn", "panadol_extra_vn"], US: ["midol_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ponstan_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
      } },
      { comboKey: "headache", drugMatches: { "default": { KR: ["eve_kr", "geborin_kr"], VN: ["ibuprofen_400_vn", "hapacol_650_vn"], US: ["midol_us", "excedrin_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ponstan_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "backPain", drugMatches: { "default": { KR: ["eve_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["midol_us", "thermacare_us"], JP: ["eve_a_jp", "salonpas_jp"] , TH: ["ponstan_th", "counterpain_th"], ID: ["bodrex_extra_id", "salonpas_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "heavyBleeding", hospitalWarning: true, warningKR: "생리통과 함께 출혈량이 비정상적으로 많은 경우 자궁근종이나 호르몬 이상의 가능성이 있습니다. 산부인과를 방문하세요.", warningEN: "Severe menstrual pain with abnormally heavy bleeding may indicate fibroids or hormonal issues. Please visit a gynecologist.", warningVI: "Đau bụng kinh kèm ra máu nhiều bất thường có thể là u xơ tử cung hoặc rối loạn hormone. Vui lòng đến khoa phụ khoa.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["eve_kr", "ezn6_kr"], VN: ["ibuprofen_400_vn", "panadol_extra_vn"], US: ["midol_us", "advil_200_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ponstan_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
      ], drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "orajel_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "gumSwollen", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tantum_kr"], VN: ["ibuprofen_400_vn", "betadine_gargle_vn"], US: ["advil_200_us", "anbesol_us"], JP: ["loxonin_s_jp", "eve_a_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "fever", hospitalWarning: true, warningKR: "치통과 발열이 함께 나타나면 치아 감염의 가능성이 있습니다. 가능한 빨리 치과를 방문하세요.", warningEN: "Toothache with fever may indicate a dental infection. Please visit a dentist as soon as possible.", warningVI: "Đau răng kèm sốt có thể là nhiễm trùng răng. Vui lòng đến nha khoa sớm nhất có thể.", drugMatches: {} },
      { comboKey: "faceSwelling", hospitalWarning: true, warningKR: "치통과 얼굴 부종이 함께 나타나면 치아 농양의 가능성이 있습니다. 즉시 치과를 방문하세요. 농양은 항생제 치료가 필요합니다.", warningEN: "Toothache with facial swelling may indicate a dental abscess. Visit a dentist immediately. Abscess requires antibiotic treatment.", warningVI: "Đau răng kèm sưng mặt có thể là áp xe răng. Đến nha khoa ngay. Áp xe cần điều trị kháng sinh.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "orajel_us"], JP: ["eve_a_jp", "loxonin_s_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
      ], drugMatches: { "default": { KR: ["refresh_kr", "hyaluronate_kr"], VN: ["systane_vn", "vrohto_vn"], US: ["visine_dry_us", "visine_us"], JP: ["rohto_v_jp", "smile_40_jp"] , TH: ["systane_th", "visine_th"], ID: ["insto_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "allergyNose", drugMatches: { "default": { KR: ["cromolin_kr", "zyrtec_kr"], VN: ["cromolin_vn", "cetirizine_vn"], US: ["zaditor_us", "pataday_us"], JP: ["allegra_fx_jp", "rohto_v_jp"] , TH: ["zyrtec_th", "telfast_th"], ID: ["insto_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "discharge", hospitalWarning: true, warningKR: "눈곱이 많이 나오면 결막염의 가능성이 있습니다. 안과를 방문하여 적절한 안약을 처방받으세요. 다른 사람에게 전염될 수 있으니 수건/베개를 구분하세요.", warningEN: "Excessive eye discharge may indicate conjunctivitis. Please visit an eye doctor. It can be contagious - use separate towels.", warningVI: "Nhiều ghèn mắt có thể là viêm kết mạc. Vui lòng đến bác sĩ mắt. Có thể lây - dùng khăn riêng.", drugMatches: {} },
      { comboKey: "visionChange", hospitalWarning: true, warningKR: "갑작스러운 시력 변화는 즉시 안과를 방문하세요.", warningEN: "Sudden vision changes require immediate eye doctor visit.", warningVI: "Thay đổi thị lực đột ngột cần đến bác sĩ mắt ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["refresh_kr", "vizuclear_kr"], VN: ["systane_vn", "vrohto_vn"], US: ["visine_dry_us", "cleareyes_us"], JP: ["rohto_v_jp", "soft_santia_jp"] , TH: ["visine_th", "systane_th"], ID: ["insto_id", "cetirizine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
        "default": { KR: ["gelpos_kr", "gaviscon_kr"], VN: ["phosphalugel_vn", "gaviscon_vn"], US: ["tums_us", "gaviscon_us"], JP: ["ohta_isan_jp", "gaster_10_jp"] , TH: ["eno_th", "gaviscon_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        "severe": { KR: ["famotidine_kr", "lansoprazole_kr"], VN: ["famotidine_kr", "omeprazole_vn"], US: ["pepcid_us", "prilosec_us"], JP: ["gaster_10_jp", "gaviscon_jp"] , TH: ["omeprazole_th", "gaviscon_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
      } },
      { comboKey: "stomachPain", drugMatches: { "default": { KR: ["gelpos_kr", "almagel_kr"], VN: ["phosphalugel_vn", "yumangel_vn"], US: ["tums_us", "pepcid_us"], JP: ["gaster_10_jp", "ohta_isan_jp"] , TH: ["eno_th", "gaviscon_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "nausea", drugMatches: { "default": { KR: ["gaviscon_kr", "doctorbear_kr"], VN: ["gaviscon_vn", "motilium_vn"], US: ["gaviscon_us", "pepto_us"], JP: ["ohta_isan_jp", "aneron_jp"] , TH: ["gaviscon_th", "domperidone_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "chestPain", hospitalWarning: true, warningKR: "속쓰림과 함께 심한 가슴 통증이 나타나면 심장 질환과 구별이 필요합니다. 특히 운동 시 악화, 왼팔 저림, 식은땀이 동반되면 즉시 응급실을 방문하세요.", warningEN: "Heartburn with severe chest pain needs to be distinguished from heart disease. If it worsens with exercise, includes left arm numbness, or cold sweats, call emergency services immediately.", warningVI: "Ợ nóng kèm đau ngực nặng cần phân biệt với bệnh tim. Nếu nặng hơn khi vận động, tê cánh tay trái, hoặc đổ mồ hôi lạnh, gọi cấp cứu ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["gelpos_kr", "gaviscon_kr"], VN: ["phosphalugel_vn", "gaviscon_vn"], US: ["tums_us", "gaviscon_us"], JP: ["ohta_isan_jp", "gaster_10_jp"] , TH: ["eno_th", "gaviscon_th"], ID: ["promag_id", "mylanta_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
        "default": { KR: ["magmil_kr", "dulcolax_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"], JP: ["colac_jp", "biofermin_constip_jp"] , TH: ["lactulose_th", "dulcolax_th"], ID: ["dulcolax_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        "severe": { KR: ["dulcolax_kr", "bicogreen_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"], JP: ["colac_jp", "biofermin_constip_jp"] , TH: ["dulcolax_th", "lactulose_th"], ID: ["dulcolax_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
      } },
      { comboKey: "bloatingPain", drugMatches: { "default": { KR: ["magmil_kr", "gashualmyeongsu_kr"], VN: ["duphalac_vn", "airx_vn"], US: ["miralax_us", "gasx_us"], JP: ["colac_jp", "ohta_isan_jp"] , TH: ["lactulose_th", "airx_th"], ID: ["dulcolax_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "bloodyStool", hospitalWarning: true, warningKR: "변비와 함께 출혈이 있으면 치질 또는 다른 질환의 가능성이 있습니다. 소화기내과 또는 외과를 방문하세요.", warningEN: "Constipation with bleeding may indicate hemorrhoids or other conditions. Please visit a gastroenterologist or surgeon.", warningVI: "Táo bón kèm chảy máu có thể là trĩ hoặc bệnh khác. Vui lòng đến khoa tiêu hóa hoặc ngoại khoa.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["magmil_kr", "dulcolax_kr"], VN: ["duphalac_vn", "forlax_vn"], US: ["miralax_us", "metamucil_us"], JP: ["colac_jp", "biofermin_constip_jp"] , TH: ["lactulose_th", "dulcolax_th"], ID: ["dulcolax_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
        "default": { KR: ["sleepaid_kr", "aronamin_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"], JP: ["drewell_jp", "drewell_jp"] , TH: ["benadryl_sleep_th", "sara_th"] },
        "severe": { KR: ["sleepaid_kr", "rediants_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"], JP: ["drewell_jp", "drewell_jp"] , TH: ["benadryl_sleep_th", "sara_th"] },
      } },
      { comboKey: "anxiety", drugMatches: { "default": { KR: ["rediants_kr", "sleepaid_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "benadryl_us"], JP: ["drewell_jp", "drewell_jp"] , TH: ["benadryl_sleep_th", "sara_th"] } } },
      { comboKey: "coldSymptoms", drugMatches: { "default": { KR: ["pancol_night_kr", "tylenol_cold_kr"], VN: ["ameflu_night_vn", "tiffy_vn"], US: ["nyquil_us", "tylenol_pm_us"], JP: ["pabron_gold_jp", "drewell_jp"] , TH: ["tiffy_th", "benadryl_sleep_th"] } } },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["sleepaid_kr", "rediants_kr"], VN: ["rotunda_vn", "melatonin_vn"], US: ["zzzquil_us", "unisom_us"], JP: ["drewell_jp", "drewell_jp"] , TH: ["benadryl_sleep_th", "sara_th"] } } },
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
        "default": { KR: ["ibuprofen_200_kr", "tylenol_500_kr"], VN: ["ibuprofen_400_vn", "panadol_500_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "voltaren_gel_jp"] , TH: ["ibuprofen_gpo_th", "sara_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        "severe": { KR: ["nacsen_kr", "glucosamine_kr"], VN: ["aleve_vn", "voltaren_vn"], US: ["aleve_us", "voltaren_us"], JP: ["loxonin_s_jp", "voltaren_gel_jp"] , TH: ["voltaren_gel_th", "counterpain_th"], ID: ["bodrex_extra_id", "counterpain_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
      } },
      { comboKey: "musclePain", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "salonpas_vn"], US: ["advil_200_us", "aleve_us"], JP: ["eve_a_jp", "salonpas_jp"] , TH: ["ibuprofen_gpo_th", "counterpain_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
      { comboKey: "swellingRedness", hospitalWarning: true, warningKR: "관절이 붓고 빨갛게 변한 경우 통풍이나 관절염의 가능성이 있습니다. 정형외과 또는 류마티스내과를 방문하세요.", warningEN: "Swollen, red joints may indicate gout or arthritis. Please visit an orthopedic or rheumatology clinic.", warningVI: "Khớp sưng đỏ có thể là gout hoặc viêm khớp. Vui lòng đến khoa chỉnh hình hoặc thấp khớp.", drugMatches: {} },
      { comboKey: "fever", hospitalWarning: true, warningKR: "관절통과 발열이 함께 나타나면 감염성 관절염의 가능성이 있습니다. 즉시 병원을 방문하세요.", warningEN: "Joint pain with fever may indicate septic arthritis. Please visit a hospital immediately.", warningVI: "Đau khớp kèm sốt có thể là viêm khớp nhiễm khuẩn. Vui lòng đến bệnh viện ngay.", drugMatches: {} },
      { comboKey: "_fallback", drugMatches: { "default": { KR: ["ibuprofen_200_kr", "ketotop_kr"], VN: ["ibuprofen_400_vn", "voltaren_vn"], US: ["advil_200_us", "voltaren_us"], JP: ["eve_a_jp", "voltaren_gel_jp"] , TH: ["voltaren_gel_th", "counterpain_th"], ID: ["salonpas_id", "voltaren_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] } } },
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
          "default": { KR: ["meniere_kr", "bonaring_kr"], VN: ["betaserc_vn", "stugeron_vn"], US: ["dramamine_us", "bonine_us"], JP: ["travelmin_jp", "aneron_jp"] , TH: ["stugeron_th", "navamed_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      {
        comboKey: "nauseaVomit",
        drugMatches: {
          "default": { KR: ["bonaring_kr", "kimite_kr"], VN: ["stugeron_vn", "nautamine_vn"], US: ["dramamine_us", "bonine_us"], JP: ["travelmin_jp", "aneron_jp"] , TH: ["stugeron_th", "navamed_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["bonaring_kr", "tylenol_500_kr"], VN: ["stugeron_vn", "panadol_500_vn"], US: ["bonine_us", "tylenol_500_us"], JP: ["travelmin_jp", "eve_a_jp"] , TH: ["stugeron_th", "sara_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["meniere_kr", "bonaring_kr"], VN: ["betaserc_vn", "stugeron_vn"], US: ["dramamine_us", "bonine_us"], JP: ["travelmin_jp", "aneron_jp"] , TH: ["stugeron_th", "navamed_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["ginkgo_kr", "meniere_kr"], VN: ["tanakan_vn", "betaserc_vn"], US: ["lipoflavonoid_us", "dramamine_us"], JP: ["travelmin_jp", "aneron_jp"] , TH: ["stugeron_th", "sara_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["ginkgo_kr", "meniere_kr"], VN: ["tanakan_vn", "betaserc_vn"], US: ["lipoflavonoid_us", "dramamine_us"], JP: ["travelmin_jp", "aneron_jp"] , TH: ["stugeron_th", "sara_th"], ID: ["antimo_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["vaseline_kr", "saline_spray_kr"], VN: ["vaseline_kr", "saline_spray_kr"], US: ["saline_spray_kr", "vaseline_kr"], JP: ["oronine_jp", "oronine_jp"] , TH: ["sara_th", "ors_th"], ID: ["betadine_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["vaseline_kr", "saline_spray_kr"], VN: ["vaseline_kr", "saline_spray_kr"], US: ["saline_spray_kr", "vaseline_kr"], JP: ["oronine_jp", "oronine_jp"] , TH: ["sara_th", "ors_th"], ID: ["betadine_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["oramedi_kr", "albocil_kr"], VN: ["kamistad_vn", "albocil_kr"], US: ["orajel_mouth_us", "albocil_kr"], JP: ["traful_direct_jp", "chocola_bb_jp"] , TH: ["kamistad_th", "oramed_th"], ID: ["kamillosan_id", "albothyl_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["oramedi_kr", "albocil_kr"], VN: ["kamistad_vn", "albocil_kr"], US: ["orajel_mouth_us", "albocil_kr"], JP: ["traful_direct_jp", "chocola_bb_jp"] , TH: ["kamistad_th", "oramed_th"], ID: ["kamillosan_id", "albothyl_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["fucidin_kr", "silvadene_kr"], VN: ["biafine_vn", "silvadene_kr"], US: ["neosporin_burn_us", "silvadene_kr"], JP: ["oronine_jp", "oronine_jp"] , TH: ["betadine_th", "fucidin_th"], ID: ["betadine_id", "bioplacenton_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      {
        comboKey: "blister",
        warningKR: "물집을 터뜨리지 마세요. 감염 위험이 있습니다.",
        warningEN: "Do not pop the blister. There is a risk of infection.",
        warningVI: "Không được chọc vỡ phỏng nước. Có nguy cơ nhiễm trùng.",
        drugMatches: {
          "default": { KR: ["silvadene_kr", "fucidin_kr"], VN: ["silvadene_kr", "biafine_vn"], US: ["neosporin_burn_us", "silvadene_kr"], JP: ["oronine_jp", "oronine_jp"] , TH: ["betadine_th", "fucidin_th"], ID: ["betadine_id", "bioplacenton_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["fucidin_kr", "silvadene_kr"], VN: ["biafine_vn", "silvadene_kr"], US: ["neosporin_burn_us", "silvadene_kr"], JP: ["oronine_jp", "oronine_jp"] , TH: ["betadine_th", "fucidin_th"], ID: ["betadine_id", "bioplacenton_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["fucidin_kr", "madecassol_kr"], VN: ["betadine_vn", "fucidin_vn"], US: ["neosporin_us2", "bandaid_us"], JP: ["oronine_jp", "oronine_jp"] , TH: ["betadine_th", "fucidin_th"], ID: ["betadine_id", "bioplacenton_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["fucidin_kr", "madecassol_kr"], VN: ["betadine_vn", "fucidin_vn"], US: ["neosporin_us2", "bandaid_us"], JP: ["oronine_jp", "oronine_jp"] , TH: ["betadine_th", "fucidin_th"], ID: ["betadine_id", "bioplacenton_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["brufen_200_kr", "brufen_200_kr"], VN: ["daflon_vn", "antistax_vn"], US: ["advil_200_us", "advil_200_us"], JP: ["eve_a_jp", "eve_a_jp"] , TH: ["daflon_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["brufen_200_kr", "brufen_200_kr"], VN: ["daflon_vn", "antistax_vn"], US: ["advil_200_us", "advil_200_us"], JP: ["eve_a_jp", "eve_a_jp"] , TH: ["daflon_th", "ibuprofen_gpo_th"], ID: ["bodrex_extra_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["noscarna_kr", "pairacne_kr"], VN: ["benzac_vn", "pairacne_kr"], US: ["differin_us", "noscarna_kr"], JP: ["pair_acne_jp", "clearasil_jp"] , TH: ["benzac_th", "clinda_m_th"], ID: ["acnes_id", "benzolac_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      {
        comboKey: "inflamed",
        drugMatches: {
          "default": { KR: ["pairacne_kr", "fucidin_kr"], VN: ["pairacne_kr", "benzac_vn"], US: ["differin_us", "noscarna_kr"], JP: ["pair_acne_jp", "clearasil_jp"] , TH: ["benzac_th", "clinda_m_th"], ID: ["acnes_id", "benzolac_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["noscarna_kr", "pairacne_kr"], VN: ["benzac_vn", "pairacne_kr"], US: ["differin_us", "noscarna_kr"], JP: ["pair_acne_jp", "clearasil_jp"] , TH: ["benzac_th", "clinda_m_th"], ID: ["acnes_id", "benzolac_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["lamisil_kr", "canesten_kr"], VN: ["lamisil_kr", "canesten_kr"], US: ["lamisil_kr", "canesten_kr"], JP: ["butenafine_jp", "lamisil_at_jp"] , TH: ["canesten_th", "lamisil_th"], ID: ["canesten_id", "kalpanax_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["lamisil_kr", "canesten_kr"], VN: ["lamisil_kr", "canesten_kr"], US: ["lamisil_kr", "canesten_kr"], JP: ["butenafine_jp", "lamisil_at_jp"] , TH: ["canesten_th", "lamisil_th"], ID: ["canesten_id", "kalpanax_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["terramycin_kr", "warm_compress"], VN: ["tobrex_vn", "warm_compress"], US: ["terramycin_kr", "warm_compress"], JP: ["rohto_antibac_jp", "rohto_antibac_jp"] , TH: ["chloramphenicol_eye_th", "systane_th"], ID: ["insto_id", "betadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["terramycin_kr", "warm_compress"], VN: ["tobrex_vn", "warm_compress"], US: ["terramycin_kr", "warm_compress"], JP: ["rohto_antibac_jp", "rohto_antibac_jp"] , TH: ["chloramphenicol_eye_th", "systane_th"], ID: ["insto_id", "betadine_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
          "default": { KR: ["condition_kr", "brufen_hangover_kr"], VN: ["condition_kr", "brufen_hangover_kr"], US: ["hangover_ors_kr", "brufen_hangover_kr"], JP: ["heparize_jp", "ukon_jp"] , TH: ["ors_th", "ibuprofen_gpo_th"], ID: ["oralit_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
          "severe": { KR: ["hangover_combo_kr", "hangover_ors_kr"], VN: ["hangover_combo_kr", "hangover_ors_kr"], US: ["hangover_combo_kr", "hangover_ors_kr"], JP: ["heparize_jp", "solmac_jp"] , TH: ["ors_th", "ibuprofen_gpo_th"], ID: ["oralit_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Hangover + headache
      {
        comboKey: "headache",
        drugMatches: {
          "default": { KR: ["brufen_hangover_kr", "condition_kr"], VN: ["brufen_hangover_kr", "condition_kr"], US: ["brufen_hangover_kr", "hangover_ors_kr"], JP: ["heparize_jp", "eve_a_jp"] , TH: ["ibuprofen_gpo_th", "ors_th"], ID: ["oralit_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Hangover + nausea
      {
        comboKey: "nausea",
        drugMatches: {
          "default": { KR: ["gashualmyeongsu_kr", "doctorbear_kr"], VN: ["motilium_vn", "condition_kr"], US: ["pepto_us", "dramamine_us"], JP: ["solmac_jp", "aneron_jp"] , TH: ["eno_th", "domperidone_th"], ID: ["antimo_id", "promag_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Hangover + thirst (dehydration)
      {
        comboKey: "thirst",
        drugMatches: {
          "default": { KR: ["hangover_ors_kr", "hangover_pocari_kr"], VN: ["hangover_ors_kr", "hangover_pocari_kr"], US: ["hangover_ors_kr", "hangover_pocari_kr"], JP: ["ukon_jp", "heparize_jp"] , TH: ["ors_th", "eno_th"], ID: ["oralit_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Hangover + diarrhea
      {
        comboKey: "diarrhea",
        drugMatches: {
          "default": { KR: ["jungrowhan_kr", "hangover_ors_kr"], VN: ["berberin_vn", "hangover_ors_kr"], US: ["pepto_us", "hangover_ors_kr"], JP: ["seirogan_jp", "heparize_jp"] , TH: ["ors_th", "imodium_th"], ID: ["oralit_id", "diatabs_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
        },
      },
      // Fallback
      {
        comboKey: "_fallback",
        drugMatches: {
          "default": { KR: ["hangover_combo_kr", "hangover_ors_kr"], VN: ["hangover_combo_kr", "hangover_ors_kr"], US: ["hangover_combo_kr", "hangover_ors_kr"], JP: ["heparize_jp", "solmac_jp"] , TH: ["ors_th", "ibuprofen_gpo_th"], ID: ["oralit_id", "panadol_id"], GB: ["paracetamol_gb", "nurofen_gb"], AU: ["panadol_au", "nurofen_au"], DE: ["paracetamol_de", "ibuprofen_400_de"] },
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
