// === Synonym Dictionary: 20 symptoms × 3 languages × 15+ expressions each ===

const SYNONYMS: Record<string, string[]> = {
  headache: [
    // Korean (20+)
    "두통", "머리", "머리가 아파", "머리 아파", "머리가 아프", "편두통", "머리통",
    "머리아파", "머리가아파", "머리가아프", "머리 아프다", "머리 깨질것같아",
    "머리 지끈", "지끈지끈", "머리 욱신", "헤드", "머리가띵", "머리띵",
    "관자놀이", "뒷머리", "앞머리아파", "두통약", "머리쪽", "머리아픔",
    // English (15+)
    "headache", "head", "migraine", "head hurts", "head ache", "my head",
    "splitting headache", "head pain", "head pounding", "throbbing head",
    "tension headache", "cluster headache", "head is killing", "skull",
    "temple pain", "forehead pain",
    // Vietnamese (15+)
    "đau đầu", "nhức đầu", "đầu đau", "đau nửa đầu", "nhức nửa đầu",
    "đau thái dương", "đau trán", "đầu nhức", "chóng mặt đau đầu",
    "đau đầu dữ dội", "nhức đầu kinh khủng", "đau buốt đầu",
    "đau sau đầu", "đau đỉnh đầu", "đau đầu liên tục",
  ],
  fever: [
    "발열", "열", "열이 나", "열나", "감기", "오한", "으슬으슬", "열있어",
    "열이나", "열나요", "열이있어", "체온", "미열", "고열", "열감기",
    "몸이 뜨거워", "열나는것같아", "으슬으슬추워", "몸살기", "한기",
    "열이높아", "열이안내려", "열감", "열올라",
    "fever", "temperature", "cold", "flu", "chills", "feverish",
    "high temperature", "running a fever", "body temperature", "feeling hot",
    "got a fever", "burning up", "shivering", "common cold", "influenza",
    "caught a cold", "feel cold",
    "sốt", "cảm cúm", "cảm", "sốt cao", "sốt nhẹ", "nóng người",
    "ớn lạnh", "run người", "cảm lạnh", "bị cảm", "thân nhiệt cao",
    "sốt virus", "sốt siêu vi", "lạnh run", "cảm sốt",
  ],
  cough: [
    "기침", "콜록", "마른기침", "가래", "기침이나", "기침나", "콜록콜록",
    "기침이심해", "기침약", "기침이안멈춰", "기침멈춰", "가래기침",
    "마른기침이나", "헛기침", "기침소리", "기관지", "가래끓",
    "목에가래", "기침가래", "밤에기침",
    "cough", "coughing", "dry cough", "phlegm", "mucus", "wet cough",
    "persistent cough", "hacking cough", "can't stop coughing", "chest cough",
    "cough won't stop", "coughing up", "bronchial", "barking cough",
    "tickly cough", "night cough",
    "ho", "ho khan", "ho có đờm", "đờm", "ho liên tục", "ho nhiều",
    "ho không dứt", "ho đêm", "ho sặc", "ho ra đờm", "viêm phế quản",
    "ho kéo dài", "ho nặng", "ho nhẹ", "ho sổ mũi",
  ],
  runnyNose: [
    "콧물", "코막힘", "코 막힘", "재채기", "코가 막혀", "코막혀",
    "콧물나", "콧물이나", "코물", "코가안뚫려", "코안뚫려", "코가답답",
    "코풀", "콧물이흘러", "맑은콧물", "코막힌", "코답답", "비염",
    "코가찡해", "코쪽", "코간지러",
    "runny nose", "stuffy nose", "nasal", "sneezing", "congestion",
    "blocked nose", "nose is running", "stuffy", "can't breathe through nose",
    "nose blocked", "sinus", "nasal congestion", "runny", "dripping nose",
    "nose won't stop", "clear mucus",
    "sổ mũi", "nghẹt mũi", "hắt hơi", "mũi chảy nước", "tắc mũi",
    "mũi bị nghẹt", "viêm mũi", "mũi khó thở", "hắt xì", "xì mũi",
    "chảy nước mũi", "mũi bị tắc", "nghẹt mũi nặng", "mũi chảy",
    "viêm xoang mũi",
  ],
  soreThroat: [
    "목 아파", "목이 아파", "인후통", "목 아프", "목이 아프", "편도", "목감기",
    "목아파", "목이아파", "목아프", "목이아프", "목따가워", "목쪽",
    "목이따끔", "목이칼칼", "칼칼", "삼킬때아파", "침삼킬때", "목이부었",
    "목부음", "목통증", "목이건조", "목이간지러",
    "sore throat", "throat", "tonsil", "throat hurts", "my throat",
    "throat pain", "swollen throat", "scratchy throat", "strep",
    "painful swallowing", "hurts to swallow", "throat infection",
    "raspy throat", "raw throat", "burning throat", "dry throat",
    "đau họng", "viêm họng", "rát họng", "họng đau", "đau rát họng",
    "khó nuốt", "nuốt đau", "viêm amidan", "họng sưng", "họng khô",
    "đau khi nuốt", "họng rát", "viêm họng cấp", "cổ họng đau",
    "họng ngứa",
  ],
  stomachache: [
    "배탈", "배 아파", "배가 아파", "복통", "배아파", "장염", "배가아파",
    "배아파요", "배가쑤셔", "속이안좋아", "명치", "뱃속", "배가콕콕",
    "배가살살", "장이아파", "위가아파", "아랫배", "윗배", "옆구리",
    "배아픔", "밥먹고배아파", "배가끊어질것같아", "배살살", "복부",
    "stomach", "stomachache", "stomach ache", "abdominal pain", "belly",
    "tummy ache", "belly hurts", "stomach hurts", "gut pain", "abdominal",
    "my stomach", "belly pain", "tummy hurts", "food poisoning",
    "ate something bad", "stomach cramps", "tummy",
    "đau bụng", "bụng đau", "đau dạ dày", "khó chịu bụng", "đau ruột",
    "bụng khó chịu", "ăn xong đau bụng", "đau vùng bụng", "bụng đau quặn",
    "đau thượng vị", "bụng cồn cào", "đau bụng dữ dội", "bụng khó ở",
    "co thắt bụng", "đau bụng dưới",
  ],
  diarrhea: [
    "설사", "물설사", "배탈설사", "설사해", "설사나", "설사가심해",
    "화장실자주", "똥이물", "변이묽어", "설사약", "배탈나서설사",
    "설사멈춰", "급성설사", "배가아프고설사", "설사가안멈춰",
    "장이안좋아", "변이자주", "수양성설사",
    "diarrhea", "loose stool", "watery stool", "runs", "the runs",
    "loose bowels", "runny stool", "frequent bowel", "upset stomach diarrhea",
    "can't stop going", "watery poop", "liquid stool", "stomach bug",
    "bowel problems", "going a lot",
    "tiêu chảy", "đi ngoài", "đi phân lỏng", "đau bụng đi ngoài",
    "phân nước", "đi tiêu nhiều", "tiêu chảy cấp", "bụng xì xoẹt",
    "đi ngoài liên tục", "phân lỏng", "rối loạn tiêu hóa",
    "đi cầu nhiều lần", "đi ngoài phân nước", "tiêu lỏng",
    "đi ngoài không dứt",
  ],
  indigestion: [
    "소화불량", "더부룩", "소화안됨", "체했", "체한", "가스", "소화",
    "소화가안돼", "소화가안되", "체한것같아", "체한거같아", "밥이안넘어가",
    "트림", "가스차", "더부룩해", "소화제", "배부른느낌", "포만감",
    "음식이안내려가", "위가더부룩", "식후불편",
    "indigestion", "bloating", "bloated", "gas", "gassy", "fullness",
    "feeling full", "can't digest", "food won't go down", "burping",
    "belching", "heavy stomach", "stomach feels full", "digestive problems",
    "upset tummy", "uncomfortable after eating",
    "khó tiêu", "đầy hơi", "đầy bụng", "ăn không tiêu", "bụng đầy",
    "chướng bụng", "ợ hơi", "trướng bụng", "ăn vào không tiêu",
    "bụng căng", "khó chịu sau ăn", "tiêu hóa kém", "ợ chua",
    "bụng ì ạch", "ăn xong đầy bụng",
  ],
  nausea: [
    "구역", "구토", "메스꺼움", "토할", "멀미", "울렁", "토할것같아",
    "속이울렁", "구역질", "메스꺼워", "속이메스꺼워", "울렁거려",
    "토하고싶어", "속이안좋아", "속울렁", "메쓰꺼움", "게우",
    "입맛이없어", "속이뒤집혀", "헛구역", "오바이트",
    "nausea", "vomiting", "vomit", "motion sickness", "queasy",
    "feel sick", "feeling nauseous", "going to throw up", "sick to stomach",
    "puking", "throwing up", "car sick", "seasick", "morning sickness",
    "feel like vomiting", "stomach turning",
    "buồn nôn", "nôn", "say tàu xe", "muốn nôn", "ói", "nôn mửa",
    "say xe", "say sóng", "buồn nôn liên tục", "nôn ói", "nôn khan",
    "cảm giác buồn nôn", "khó chịu muốn nôn", "nôn ra", "ói mửa",
  ],
  musclePain: [
    "근육통", "근육 아파", "근육이 아파", "뻐근", "어깨 아파", "몸살",
    "근육아파", "근육이아파", "어깨아파", "몸이쑤셔", "몸이아파",
    "근육뭉침", "담결렸", "담걸림", "등아파", "팔아파", "다리아파",
    "온몸이아파", "근육이뻐근", "알이베겼", "뭉쳤어",
    "muscle pain", "muscle ache", "sore muscles", "body ache",
    "muscles hurt", "aching muscles", "stiff muscles", "muscle cramp",
    "pulled muscle", "muscle strain", "body pain", "aching body",
    "sore body", "muscle spasm", "tight muscles", "myalgia",
    "đau cơ", "nhức mỏi", "đau nhức cơ", "mỏi người", "nhức người",
    "cơ bắp đau", "đau bắp tay", "đau bắp chân", "nhức mỏi toàn thân",
    "cứng cơ", "co cơ", "đau cơ bắp", "mỏi cơ", "đau toàn thân",
    "nhức cơ thể",
  ],
  backPain: [
    "허리", "허리 아파", "허리가 아파", "요통", "허리통증", "디스크",
    "허리아파", "허리가아파", "허리쪽", "허리가끊어질것같아", "허리삐끗",
    "허리를삐었", "등허리", "허리디스크", "척추", "허리아픔", "등아파",
    "요추", "허리통", "허리뻐근", "허리가뻐근", "허리무거워",
    "back pain", "lower back", "backache", "lumbago", "back hurts",
    "my back", "sore back", "back ache", "spine", "spinal", "slipped disc",
    "herniated disc", "back is killing me", "stiff back", "back problems",
    "lower back pain", "upper back",
    "đau lưng", "đau thắt lưng", "lưng đau", "đau cột sống",
    "đau lưng dưới", "đau lưng trên", "lưng mỏi", "nhức lưng",
    "thoát vị đĩa đệm", "đau vùng lưng", "lưng cứng", "mỏi lưng",
    "đau sống lưng", "đau thắt lưng dữ dội", "lưng đau nhức",
  ],
  allergy: [
    "알레르기", "두드러기", "알러지", "알러지반응", "알레르기반응",
    "알레르기증상", "알러지증상", "꽃가루알레르기", "음식알레르기",
    "약물알레르기", "알레르기비염", "알레르기피부", "알러지약",
    "알레르기약", "과민반응", "항히스타민",
    "allergy", "allergies", "allergic", "hives", "allergic reaction",
    "hay fever", "pollen allergy", "food allergy", "drug allergy",
    "antihistamine", "allergic rhinitis", "seasonal allergy",
    "allergic to", "allergy medicine", "allergy pills",
    "dị ứng", "mề đay", "dị ứng thuốc", "dị ứng thức ăn",
    "phản ứng dị ứng", "viêm mũi dị ứng", "dị ứng phấn hoa",
    "dị ứng da", "dị ứng thời tiết", "nổi mề đay", "ngứa do dị ứng",
    "dị ứng mùa", "sổ mũi dị ứng", "dị ứng bụi", "quá mẫn",
  ],
  skinRash: [
    "피부", "발진", "가려움", "가려워", "벌레 물림", "습진", "피부발진",
    "피부가려움", "피부가가려워", "벌레물렸", "모기물렸", "벌레에물렸",
    "피부빨갛", "온몸이가려워", "가려움증", "두드러기나", "피부트러블",
    "피부뭐남", "피부올라옴", "뾰루지", "각질", "건조",
    "skin rash", "rash", "itchy skin", "itching", "bug bite", "eczema",
    "skin irritation", "hives", "mosquito bite", "insect bite", "dermatitis",
    "skin bumps", "skin red", "breakout", "dry skin", "flaky skin",
    "itchy", "scratching", "skin problems",
    "phát ban", "ngứa da", "nổi mẩn", "côn trùng cắn", "muỗi đốt",
    "chàm", "da ngứa", "da đỏ", "nổi mề đay", "mẩn đỏ",
    "viêm da", "da khô", "da bong tróc", "ngứa toàn thân",
    "phát ban đỏ", "nổi ban", "da nổi mẩn",
  ],
  menstrualPain: [
    "생리통", "생리", "월경통", "생리 아파", "생리아파", "생리가아파",
    "생리중", "생리기간", "월경", "생리통심해", "생리통약", "생리할때아파",
    "생리첫날", "생리때", "자궁", "아랫배당김", "생리전증후군",
    "pms", "생리전", "월경전",
    "menstrual", "period pain", "cramps", "period cramps", "menstruation",
    "period", "time of month", "period symptoms", "dysmenorrhea",
    "menstrual cramps", "painful period", "pms", "monthly cramps",
    "period ache", "aunt flow", "that time",
    "đau bụng kinh", "kinh nguyệt", "đau kinh", "đau kỳ kinh",
    "đau bụng khi có kinh", "kinh đau", "đến tháng", "hành kinh đau",
    "đau bụng dưới kỳ kinh", "chu kỳ kinh nguyệt", "đau ngày đèn đỏ",
    "kinh nguyệt đau", "bụng đau khi hành kinh", "đau vùng chậu",
    "rối loạn kinh nguyệt",
  ],
  toothache: [
    "치통", "이 아파", "이가 아파", "잇몸", "치아", "이아파", "이가아파",
    "이빨", "이빨아파", "이빨이아파", "잇몸아파", "잇몸이아파",
    "잇몸부음", "어금니", "앞니", "사랑니", "충치", "이쪽아파",
    "이가시려", "이시림", "이가흔들",
    "toothache", "tooth pain", "dental", "gum pain", "tooth hurts",
    "my tooth", "teeth hurt", "tooth ache", "cavity", "wisdom tooth",
    "gum swollen", "gum bleeding", "dental pain", "molar pain",
    "sensitive tooth", "tooth is killing",
    "đau răng", "đau nướu", "răng đau", "sâu răng", "nhức răng",
    "đau răng khôn", "nướu sưng", "chảy máu nướu", "nướu đau",
    "ê răng", "răng lung lay", "viêm nướu", "nhức buốt răng",
    "răng sâu đau", "đau chân răng",
  ],
  eyeStrain: [
    "눈 피로", "눈 충혈", "눈 건조", "눈 가려움", "눈이 아파", "눈 아파",
    "눈아파", "눈이아파", "눈피로", "눈충혈", "눈건조", "눈가려움",
    "눈빨개", "눈이빨개", "눈이침침", "눈침침", "눈뻑뻑", "눈시림",
    "눈부심", "눈곱", "안구건조", "눈이뻑뻑",
    "eye strain", "red eyes", "dry eyes", "itchy eyes", "eye fatigue",
    "eyes hurt", "my eyes", "eye pain", "bloodshot", "strained eyes",
    "tired eyes", "blurry vision", "watery eyes", "burning eyes",
    "screen fatigue", "computer eyes", "eye drops",
    "mỏi mắt", "đỏ mắt", "khô mắt", "ngứa mắt", "mắt mệt",
    "mắt đau", "mắt đỏ", "mắt khô", "nhức mắt", "mắt cay",
    "mắt mờ", "chảy nước mắt", "mắt sưng", "mắt nhức",
    "mắt bị đỏ", "mỏi mắt do điện thoại",
  ],
  heartburn: [
    "속쓰림", "위산", "위산역류", "신물", "역류", "속이쓰려", "속쓰려",
    "속이타", "가슴이타", "가슴쪽이화끈", "위산이올라와", "신물올라와",
    "명치가아파", "명치쪽", "가슴화끈", "위염", "위장", "속이안좋아",
    "속쓰림약", "위가쓰려", "속이불편",
    "heartburn", "acid reflux", "gerd", "acid", "burning chest",
    "chest burn", "stomach acid", "acid stomach", "reflux", "acidic",
    "burning sensation", "sour taste", "antacid", "stomach burning",
    "epigastric", "upper stomach burn",
    "ợ nóng", "trào ngược", "trào ngược axit", "nóng rát ngực",
    "axit dạ dày", "ợ chua", "dạ dày nóng", "đau thượng vị",
    "nóng bụng trên", "trào ngược dạ dày", "viêm dạ dày",
    "đầy axit", "ợ nóng liên tục", "dạ dày trào ngược",
    "cảm giác nóng rát",
  ],
  constipation: [
    "변비", "대변", "배변", "변비약", "변이안나", "변이안나와", "변안나와",
    "화장실안가져", "대변이안나", "대변이딱딱", "변이딱딱", "배변어려움",
    "변비심해", "만성변비", "대변못봄", "뒤가안통해",
    "장이안움직여", "배변활동",
    "constipation", "constipated", "can't poop", "hard stool",
    "haven't pooped", "no bowel movement", "backed up", "blocked",
    "irregular bowel", "difficulty pooping", "straining", "hard to poop",
    "stool won't come", "bowel issues", "not regular",
    "táo bón", "không đi cầu được", "phân cứng", "khó đi cầu",
    "bón", "không đại tiện được", "phân khô", "táo bón nặng",
    "đi cầu khó", "nhiều ngày không đi cầu", "bụng cứng",
    "không đi ngoài được", "rặn không ra", "phân viên",
    "táo bón kinh niên",
  ],
  insomnia: [
    "불면", "불면증", "잠이 안 와", "잠을 못 자", "수면", "잠안와",
    "잠이안와", "잠을못자", "잠못잠", "잠이안옴", "잠안옴", "수면장애",
    "수면제", "잠들기어려", "잠을설쳐", "뒤척", "뒤척거려",
    "밤새잠을못", "새벽에깨", "자꾸깨", "수면부족", "잠이부족",
    "insomnia", "can't sleep", "sleepless", "sleep aid", "trouble sleeping",
    "unable to sleep", "sleep problems", "wide awake", "tossing and turning",
    "no sleep", "restless night", "sleep disorder", "hard to fall asleep",
    "waking up", "sleep medicine", "sleeping pills",
    "mất ngủ", "khó ngủ", "không ngủ được", "trằn trọc", "ngủ không yên",
    "thức giấc", "ngủ không được", "mất ngủ kinh niên", "khó đi vào giấc ngủ",
    "ngủ chập chờn", "hay thức giấc", "giấc ngủ kém",
    "không ngủ nổi", "thiếu ngủ", "rối loạn giấc ngủ",
  ],
  jointPain: [
    "관절", "관절통", "무릎", "관절이 아파", "통풍", "관절아파",
    "관절이아파", "무릎아파", "무릎이아파", "손가락관절", "어깨관절",
    "관절염", "류마티스", "발목아파", "손목아파", "관절뻣뻣",
    "관절붓", "관절이붓", "관절이뻣뻣", "관절소리",
    "joint pain", "joint", "knee pain", "arthritis", "gout",
    "joints hurt", "stiff joints", "swollen joint", "knee hurts",
    "finger joints", "shoulder joint", "ankle pain", "wrist pain",
    "rheumatoid", "joint inflammation", "joint swelling",
    "đau khớp", "đau gối", "viêm khớp", "khớp đau", "đau khớp gối",
    "gout", "đau khớp tay", "đau khớp vai", "sưng khớp",
    "cứng khớp", "viêm khớp dạng thấp", "đau mắt cá chân",
    "đau khớp ngón tay", "khớp sưng đỏ", "khớp kêu lắc rắc",
  ],
  dizziness: [
    "어지러움", "어지러워", "어지러", "빙빙", "빙빙돌아", "현기증",
    "어질어질", "눈앞이깜깜", "눈앞깜깜", "균형", "균형잡기", "비틀",
    "어지럽다", "어지러워요", "머리가핑", "핑도는", "어지러운",
    "빙글빙글", "정신이없", "휘청", "비틀거려", "쓰러질거같",
    "dizzy", "dizziness", "vertigo", "lightheaded", "spinning",
    "room spinning", "balance", "faint", "head spinning", "woozy",
    "unsteady", "off balance", "feel faint", "head rush", "blackout",
    "chóng mặt", "hoa mắt", "choáng váng", "xây xẩm", "mất thăng bằng",
    "đầu quay cuồng", "chóng mặt buồn nôn", "hoa mắt chóng mặt",
    "đứng lên bị chóng", "mắt tối sầm", "choáng", "loạng choạng",
  ],
  tinnitus: [
    "이명", "귀에서소리", "귀울림", "귀에서삐", "귀소리", "귀울려",
    "귀에서웅", "귀가울려", "귀에서삐소리", "귀가울려요", "귀에삐",
    "귀에서윙", "귀울림증", "귀에서소리나", "귀에소리",
    "tinnitus", "ringing ears", "ear ringing", "buzzing ears",
    "ringing in ears", "ear noise", "buzzing sound", "ear buzzing",
    "hissing ears", "pulsatile tinnitus", "ears ringing",
    "ear whooshing", "humming in ears", "constant ear noise",
    "ù tai", "tai ù", "tiếng ù trong tai", "tai kêu", "ù tai liên tục",
    "nghe tiếng ù", "tai nghe tiếng kêu", "ù tai một bên",
    "tiếng vo ve trong tai", "tai bị ù", "nghe tiếng ve kêu",
  ],
  nosebleed: [
    "코피", "코에서피", "코피나", "코피가나", "코에서피나", "코피날때",
    "코피자주", "코피많이", "코에서출혈", "코출혈", "비출혈",
    "코피멈추", "코피안멈", "코에서피가",
    "nosebleed", "nose bleed", "bloody nose", "nose bleeding",
    "blood from nose", "nasal bleeding", "nose blood",
    "my nose is bleeding", "bleeding nose", "nose keeps bleeding",
    "frequent nosebleed", "epistaxis",
    "chảy máu mũi", "máu mũi", "mũi chảy máu", "ra máu mũi",
    "chảy máu cam", "máu cam", "mũi ra máu", "bị chảy máu mũi",
    "hay chảy máu mũi", "máu mũi không ngừng",
  ],
  mouthUlcer: [
    "구내염", "입안헐", "입안이헐", "혓바늘", "입병", "구내염생겼",
    "입안아파", "입안이아파", "입속아파", "입안에염증", "입안상처",
    "혀아파", "볼안쪽아파", "입안이따가", "입안따가",
    "mouth ulcer", "canker sore", "mouth sore", "ulcer in mouth",
    "oral ulcer", "sore in mouth", "tongue sore", "mouth blister",
    "painful mouth", "aphthous", "inside mouth hurts",
    "loét miệng", "nhiệt miệng", "lở miệng", "viêm miệng",
    "đau trong miệng", "vết loét miệng", "nhiệt lưỡi",
    "loét lưỡi", "miệng bị lở", "bị nhiệt miệng",
    "đau lưỡi", "môi bị lở", "vết thương trong miệng",
  ],
  burn: [
    "화상", "데었", "데임", "데였", "화상입", "불에데", "뜨거운물",
    "데여서", "화상났", "화상치료", "기름튀어", "데인데",
    "물에데여", "화상약", "데었어", "살데었",
    "burn", "burned", "burnt", "scalded", "hot water burn",
    "oil burn", "sunburn", "burn injury", "skin burn",
    "got burned", "burn blister", "chemical burn",
    "bỏng", "bị bỏng", "bỏng nước sôi", "bỏng dầu",
    "da bị bỏng", "bỏng nhẹ", "bỏng nặng", "phỏng",
    "bỏng nắng", "bỏng hóa chất", "vết bỏng",
  ],
  wound: [
    "상처", "찰과상", "베었", "긁혔", "찔렸", "상처났", "베인상처",
    "깨진", "까졌", "까진상처", "피나", "출혈", "상처치료",
    "베어서", "긁혀서", "찔려서", "상처약",
    "wound", "cut", "scrape", "scratch", "laceration",
    "bleeding", "skin cut", "got cut", "scraped",
    "open wound", "puncture", "abrasion", "gash",
    "vết thương", "bị cắt", "trầy xước", "vết cắt",
    "chảy máu", "bị đứt tay", "vết trầy", "xước da",
    "bị thương", "vết xước", "da bị rách", "đứt tay",
  ],
  swelling: [
    "부종", "부었", "붓", "발부종", "다리부종", "발이부어",
    "다리가부어", "발목부", "종아리부", "발붓", "다리붓",
    "부어올라", "부기", "부어있", "발이붓", "다리가붓",
    "swelling", "swollen", "swollen feet", "swollen legs",
    "swollen ankles", "leg swelling", "foot swelling", "edema",
    "puffy legs", "feet swelling", "ankle swelling",
    "swollen calves", "water retention",
    "sưng", "phù", "chân sưng", "bàn chân sưng", "phù chân",
    "chân bị sưng", "sưng mắt cá", "phù nề",
    "chân phù", "bị sưng chân", "sưng bàn chân",
  ],
  acne: [
    "여드름", "뾰루지", "여드름났", "뾰루지났", "피부트러블",
    "트러블", "여드름치료", "피지", "블랙헤드", "화이트헤드",
    "좁쌀여드름", "곪은여드름", "얼굴에뾰루지", "여드름약",
    "뾰루지나", "여드름자국", "피부여드름",
    "acne", "pimple", "pimples", "breakout", "zit", "zits",
    "blemish", "acne treatment", "blackhead", "whitehead",
    "cystic acne", "spots on face", "skin breakout",
    "mụn", "mụn trứng cá", "mụn bọc", "nổi mụn", "mụn đầu đen",
    "mụn viêm", "mụn ẩn", "da nổi mụn", "bị mụn",
    "trị mụn", "mụn mủ", "mụn cám", "da mụn",
  ],
  athletesFoot: [
    "무좀", "발무좀", "무좀치료", "발곰팡이", "발가락사이",
    "발가려움", "발가려워", "발벗겨", "발각질", "무좀약",
    "발이가려", "발가락가려", "무좀걸렸",
    "athlete foot", "athletes foot", "foot fungus", "tinea pedis",
    "itchy feet", "fungal infection feet", "toenail fungus",
    "peeling feet", "foot itch", "foot rash", "jock itch foot",
    "nấm chân", "nấm kẽ chân", "nấm da chân", "chân bị nấm",
    "ngứa chân", "da chân bong tróc", "nấm bàn chân",
    "ngứa kẽ ngón chân", "nấm móng chân", "chân bị ngứa",
  ],
  stye: [
    "다래끼", "눈다래끼", "다래끼났", "눈에뭐났", "눈꺼풀부",
    "눈꺼풀이부", "다래끼치료", "눈에혹", "눈꺼풀염",
    "눈꺼풀부어", "눈이부어", "다래끼약", "눈에다래끼",
    "stye", "eye stye", "sty", "eyelid bump", "eyelid swollen",
    "chalazion", "eye lump", "swollen eyelid", "eyelid infection",
    "bump on eyelid", "eye bump", "sty on eye",
    "lẹo mắt", "chắp mắt", "mắt bị lẹo", "sưng mí mắt",
    "mí mắt sưng", "mụn ở mí mắt", "u mí mắt",
    "mắt bị sưng", "viêm mí mắt", "nổi hạt ở mí mắt",
  ],
  hangover: [
    "숙취", "술먹고", "음주후", "해장", "술병", "과음",
    "어젯밤술", "술마신후", "머리깨질것같", "술마시고",
    "술먹고속안좋", "술마시고토할것같", "숙취해소",
    "술먹은다음날", "술깸", "아침에술깸", "폭음후",
    "해장하고싶", "술때문에", "음주다음날",
    "hangover", "drank too much", "after drinking",
    "morning after", "booze", "wasted", "drunk",
    "too much alcohol", "heavy drinking", "hungover",
    "hung over", "next day drinking", "post drinking",
    "alcohol headache", "drinking headache",
    "say rượu", "nhậu xong", "đau đầu sau nhậu",
    "uống rượu", "say bia", "giải rượu",
    "sau khi nhậu", "buồn nôn sau nhậu", "nhậu say",
    "giải say", "khó chịu sau uống rượu",
  ],
};

// Korean particles to strip
const KO_PARTICLES = ["이", "가", "을", "를", "에", "도", "는", "은", "으로", "로", "에서", "의", "와", "과", "하고", "랑", "이랑", "요", "아요", "어요", "해요", "합니다", "습니다", "에요", "예요", "인데", "인데요", "거든", "거든요", "같아", "같아요", "것같아", "것같아요"];

// Remove Korean particles from end of word
function stripParticles(text: string): string {
  let result = text;
  for (const p of KO_PARTICLES.sort((a, b) => b.length - a.length)) {
    if (result.endsWith(p) && result.length > p.length + 1) {
      result = result.slice(0, -p.length);
    }
  }
  return result;
}

// Normalize: lowercase, trim, remove extra spaces
function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

// Remove all spaces for comparison
function removeSpaces(text: string): string {
  return text.replace(/\s/g, "");
}

// Calculate match score between input and a synonym
function calcScore(input: string, synonym: string): number {
  const normInput = normalize(input);
  const normSyn = normalize(synonym);
  const noSpaceInput = removeSpaces(normInput);
  const noSpaceSyn = removeSpaces(normSyn);

  // Exact match
  if (normInput === normSyn) return 100;
  if (noSpaceInput === noSpaceSyn) return 98;

  // Exact match after particle stripping
  if (stripParticles(noSpaceInput) === noSpaceSyn) return 95;
  if (noSpaceInput === stripParticles(noSpaceSyn)) return 95;
  if (stripParticles(noSpaceInput) === stripParticles(noSpaceSyn)) return 93;

  // Input contains synonym (or vice versa)
  if (noSpaceInput.includes(noSpaceSyn)) {
    const ratio = noSpaceSyn.length / noSpaceInput.length;
    return Math.round(70 + ratio * 20);
  }
  if (noSpaceSyn.includes(noSpaceInput)) {
    const ratio = noSpaceInput.length / noSpaceSyn.length;
    return Math.round(65 + ratio * 20);
  }

  // Stripped input contains/contained-in synonym
  const strippedInput = stripParticles(noSpaceInput);
  if (strippedInput.includes(noSpaceSyn) || noSpaceSyn.includes(strippedInput)) {
    return 60;
  }

  // Partial token overlap
  const inputTokens = normInput.split(" ").filter(Boolean);
  const synTokens = normSyn.split(" ").filter(Boolean);
  let matchedTokens = 0;
  for (const it of inputTokens) {
    for (const st of synTokens) {
      if (it.includes(st) || st.includes(it) ||
          stripParticles(it) === st || it === stripParticles(st)) {
        matchedTokens++;
        break;
      }
    }
  }
  if (matchedTokens > 0) {
    const tokenScore = (matchedTokens / Math.max(inputTokens.length, synTokens.length)) * 50;
    return Math.round(30 + tokenScore);
  }

  return 0;
}

export interface MatchResult {
  category: string;
  score: number;
}

// Main matching function: returns scored results
export function matchSymptomScored(input: string): MatchResult[] {
  if (!input.trim()) return [];

  const scores: Record<string, number> = {};

  for (const [category, synonyms] of Object.entries(SYNONYMS)) {
    let bestScore = 0;
    for (const syn of synonyms) {
      const score = calcScore(input, syn);
      if (score > bestScore) bestScore = score;
    }
    if (bestScore > 0) {
      scores[category] = bestScore;
    }
  }

  return Object.entries(scores)
    .map(([category, score]) => ({ category, score }))
    .filter((r) => r.score >= 30)
    .sort((a, b) => b.score - a.score);
}

// Simple match: returns top category or null
export function matchSymptom(input: string): string | null {
  const results = matchSymptomScored(input);
  if (results.length === 0) return null;
  return results[0].category;
}

// Get candidates when ambiguous (top score vs next are close)
export function getMatchCandidates(input: string): MatchResult[] {
  const results = matchSymptomScored(input);
  if (results.length === 0) return [];

  const top = results[0];
  // If top score is very high, just return it
  if (top.score >= 80) return [top];

  // Return top matches within 15 points of the best, max 3
  const threshold = top.score - 15;
  return results.filter((r) => r.score >= threshold).slice(0, 3);
}

// All category IDs for fallback
export const ALL_CATEGORIES = [
  "headache", "fever", "cough", "runnyNose", "soreThroat",
  "stomachache", "diarrhea", "indigestion", "nausea", "musclePain",
  "backPain", "allergy", "skinRash", "menstrualPain", "toothache",
  "eyeStrain", "heartburn", "constipation", "insomnia", "jointPain",
  "dizziness", "tinnitus", "nosebleed", "mouthUlcer", "burn",
  "wound", "swelling", "acne", "athletesFoot", "stye", "hangover",
] as const;
