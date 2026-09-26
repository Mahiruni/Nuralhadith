export type StudyTopic={id:string;names:{en:string;ar:string;am:string;ti:string;om:string};keywords:string[]};
export const STUDY_TOPICS:StudyTopic[]=[
{id:"prayer",names:{en:"Prayer",ar:"الصلاة",am:"ሶላት",ti:"ሰላት",om:"Salaata"},keywords:["prayer","salah","salat","mosque","ablution","wudu","prostration","sajdah","sujud"]},
{id:"character",names:{en:"Character",ar:"الأخلاق",am:"ሥነ ምግባር",ti:"ስነ-ምግባር",om:"Amala gaarii"},keywords:["character","manners","truth","honesty","kindness","mercy","gentle","anger","patience"]},
{id:"family",names:{en:"Family",ar:"الأسرة",am:"ቤተሰብ",ti:"ስድራ ቤት",om:"Maatii"},keywords:["family","mother","father","parent","parents","wife","husband","marriage","child","children","kin"]},
{id:"knowledge",names:{en:"Knowledge",ar:"العلم",am:"እውቀት",ti:"ፍልጠት",om:"Beekumsa"},keywords:["knowledge","learn","learning","scholar","book","teach","teacher","wisdom"]},
{id:"patience",names:{en:"Patience",ar:"الصبر",am:"ትዕግስት",ti:"ትዕግስቲ",om:"Obsa"},keywords:["patience","patient","hardship","trial","affliction","perseverance"]},
{id:"gratitude",names:{en:"Gratitude",ar:"الشكر",am:"ምስጋና",ti:"ምስጋና",om:"Galata"},keywords:["gratitude","grateful","thanks","thankful","blessing","blessings","shukr"]},
{id:"mercy",names:{en:"Mercy",ar:"الرحمة",am:"ምሕረት",ti:"ምሕረት",om:"Rahmata"},keywords:["mercy","merciful","compassion","forgive","forgiveness","kindness"]},
{id:"heart",names:{en:"The Heart",ar:"القلب",am:"ልብ",ti:"ልቢ",om:"Onnee"},keywords:["heart","intention","sincerity","faith","iman","soul"]},
{id:"charity",names:{en:"Charity",ar:"الصدقة",am:"ምጽዋት",ti:"ምጽዋት",om:"Sadaqaa"},keywords:["charity","sadaqah","zakat","poor","needy","giving"]},
{id:"fasting",names:{en:"Fasting",ar:"الصيام",am:"ጾም",ti:"ጾም",om:"Sooroma"},keywords:["fast","fasting","ramadan","suhoor","iftar"]},
{id:"knowledge-of-faith",names:{en:"Faith",ar:"الإيمان",am:"እምነት",ti:"እምነት",om:"Iimaana"},keywords:["faith","belief","allah","tawhid","islam","muslim","angel","hereafter"]},
{id:"duaa",names:{en:"Supplication",ar:"الدعاء",am:"ዱዓ",ti:"ዱዓ",om:"Du'aa"},keywords:["dua","supplication","invocation","asking Allah"]},
];
export function topicForText(text:string){const v=text.toLocaleLowerCase();return STUDY_TOPICS.filter(t=>t.keywords.some(k=>v.includes(k))).map(t=>t.id)}
export function topicName(topic:StudyTopic,locale:string){return topic.names[locale as keyof typeof topic.names]||topic.names.en}
