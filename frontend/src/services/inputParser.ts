/**
 * Parse free-text symptom input to auto-detect duration, severity, and body location.
 * Returns detected values that can pre-fill questionnaire answers.
 */

export interface ParsedInput {
  duration?: { value: string; label: string; source: string };
  severity?: { value: string; label: string; source: string };
  location?: { value: number; label: string; source: string }; // option index for follow-up
}

interface Rule {
  keywords: string[];
  value: string;
  label: string;
}

const DURATION_RULES: Rule[] = [
  { keywords: ["오늘", "방금", "아까", "지금", "today", "just now", "hôm nay", "vừa mới"], value: "today", label: "오늘" },
  { keywords: ["어제", "이틀", "2일", "yesterday", "2 days", "hôm qua", "2 ngày"], value: "2-3days", label: "2~3일" },
  { keywords: ["3일", "삼일", "며칠", "사흘", "3 days", "few days", "3 ngày", "mấy ngày"], value: "2-3days", label: "2~3일" },
  { keywords: ["일주일", "7일", "한주", "week", "a week", "1 tuần", "tuần"], value: "1week", label: "일주일" },
  { keywords: ["2주", "보름", "한달", "몇달", "오래", "2 weeks", "a month", "months", "long time", "2 tuần", "1 tháng", "lâu"], value: "2weeks+", label: "2주 이상" },
];

const SEVERITY_RULES: Rule[] = [
  { keywords: ["약간", "살짝", "조금", "가볍", "slight", "a little", "mild", "hơi", "nhẹ", "một chút"], value: "mild", label: "가벼움" },
  { keywords: ["꽤", "좀", "제법", "불편", "moderate", "quite", "uncomfortable", "khá", "tương đối"], value: "moderate", label: "중간" },
  { keywords: ["심한", "심하게", "너무", "극심", "많이", "아주", "죽을것같", "severe", "very", "really bad", "terrible", "rất", "dữ dội", "nặng"], value: "severe", label: "심함" },
  { keywords: ["못참", "견딜수없", "미칠것같", "최악", "극도", "unbearable", "worst", "can't stand", "không chịu nổi"], value: "very_severe", label: "매우 심함" },
];

// Headache location detection
const LOCATION_RULES: { keywords: string[]; index: number; label: string }[] = [
  { keywords: ["앞머리", "이마", "forehead", "front", "trán"], index: 0, label: "앞머리" },
  { keywords: ["뒷머리", "뒷골", "뒤통수", "back of head", "sau đầu"], index: 1, label: "뒷머리+목" },
  { keywords: ["관자놀이", "옆머리", "한쪽", "temple", "side", "thái dương"], index: 2, label: "관자놀이" },
  { keywords: ["전체", "머리전체", "온머리", "all over", "entire", "toàn bộ"], index: 3, label: "전체" },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "").replace(/[.,!?]/g, "");
}

function matchKeywords(input: string, keywords: string[]): string | null {
  const normalized = normalize(input);
  for (const kw of keywords) {
    const nkw = normalize(kw);
    if (normalized.includes(nkw)) return kw;
  }
  return null;
}

export function parseSymptomInput(input: string): ParsedInput {
  const result: ParsedInput = {};

  // Check duration
  for (const rule of DURATION_RULES) {
    const match = matchKeywords(input, rule.keywords);
    if (match) {
      result.duration = { value: rule.value, label: rule.label, source: match };
      break;
    }
  }

  // Check severity
  for (const rule of SEVERITY_RULES) {
    const match = matchKeywords(input, rule.keywords);
    if (match) {
      result.severity = { value: rule.value, label: rule.label, source: match };
      break;
    }
  }

  // Check headache location
  for (const rule of LOCATION_RULES) {
    const match = matchKeywords(input, rule.keywords);
    if (match) {
      result.location = { value: rule.index, label: rule.label, source: match };
      break;
    }
  }

  return result;
}

/** Map parsed duration value to medical question option index */
export function durationToOptionIndex(value: string): number {
  switch (value) {
    case "today": return 0;
    case "2-3days": return 1;
    case "1week": return 2;
    case "2weeks+": return 3;
    default: return -1;
  }
}

/** Map parsed severity value to medical question option value */
export function severityToValue(value: string): string {
  return value; // already matches: mild, moderate, severe, very_severe
}
