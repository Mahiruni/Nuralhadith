export type GradeKey = "sahih" | "hasan" | "daif" | "mawdu" | "unknown";
export type GradeInfo = { key: GradeKey; label: string; explanation: string; scholarlyContext: string };
export const GRADE_INFO: Record<GradeKey, GradeInfo> = {
  sahih:{key:"sahih",label:"Ṣaḥīḥ",explanation:"A report classified as sound under the technical conditions used by hadith scholars.",scholarlyContext:"A ṣaḥīḥ label is a classification under a defined methodology; it does not remove legitimate scholarly discussion about wording, transmission, or interpretation."},
  hasan:{key:"hasan",label:"Ḥasan",explanation:"A report classified as good and acceptable under the relevant hadith methodology, below ṣaḥīḥ in strength.",scholarlyContext:"Grading terminology and the conditions applied can vary between scholars and works."},
  daif:{key:"daif",label:"Ḍaʿīf",explanation:"A report classified as weak under the relevant hadith methodology.",scholarlyContext:"Weakness can arise for different reasons; the label alone does not describe every detail of the chain or text."},
  mawdu:{key:"mawdu",label:"Mawḍūʿ",explanation:"A report classified as fabricated or forged by the cited grading authority.",scholarlyContext:"This is a specific scholarly classification and should be read with its attributed grading source."},
  unknown:{key:"unknown",label:"Grade not supplied",explanation:"The current source record does not provide a report-level authenticity grade.",scholarlyContext:"Collection membership is not being used here as a substitute for a report-level grade."},
};
export function normalizeGrade(value?:string|null):GradeKey{
 const v=(value||"").toLowerCase().replace(/[āáà]/g,"a").replace(/[īíì]/g,"i").replace(/[ūúù]/g,"u").replace(/ʿ/g,"").trim();
 if(!v)return"unknown"; if(v.includes("sahih")||v.includes("authentic"))return"sahih"; if(v.includes("hasan")||v.includes("good"))return"hasan"; if(v.includes("daif")||v.includes("weak"))return"daif"; if(v.includes("mawdu")||v.includes("fabricat"))return"mawdu"; return"unknown";
}
export const SOURCE_VERSION="AhmedBaset/hadith-json v1.2.0";
export const SOURCE_UPDATED="Source release tag v1.2.0; Nur al-Hadith does not assert an upstream release date.";
export const SOURCE_URL="https://github.com/AhmedBaset/hadith-json";
