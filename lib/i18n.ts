export type Locale = "en" | "ar" | "am" | "ti" | "om";

export const LOCALES: Record<Locale, { native: string; english: string; dir: "ltr" | "rtl" }> = {
  en: { native: "English", english: "English", dir: "ltr" },
  ar: { native: "العربية", english: "Arabic", dir: "rtl" },
  am: { native: "አማርኛ", english: "Amharic", dir: "ltr" },
  ti: { native: "ትግርኛ", english: "Tigrinya", dir: "ltr" },
  om: { native: "Oromoo", english: "Afaan Oromo", dir: "ltr" },
};

type Dictionary = Record<string, string>;

const en: Dictionary = {
  search: "Search", collections: "Collections", library: "My Library", settings: "Settings",
  theme: "Toggle theme", today: "TODAY'S READING", dailyTitle: "A narration for quiet reflection",
  another: "Another narration", loading: "Loading…", save: "Save", saved: "Saved",
  bilingual: "Arabic + translation", original: "Arabic original", translation: "Translation",
  increase: "Increase text size", decrease: "Decrease text size", explore: "Explore collections",
  random: "Random hadith", libraryTitle: "Your study space", savedHadiths: "Saved hadiths",
  notes: "Notes", noSaved: "No saved hadiths yet.", noNotes: "Your private reflections will appear here.",
  localStorage: "Bookmarks and notes remain on this device. No account is required.",
  findHadith: "Find a hadith", searchHint: "Search the indexed corpus by words and narrow results by collection.",
  searchPlaceholder: "Search in Arabic or the selected translation…", allCollections: "All collections",
  searching: "Searching…", searchButton: "Search", enterTwo: "Enter at least 2 characters.",
  unavailable: "Search is temporarily unavailable.", resultsHere: "Search results will appear here.",
  readHadith: "Read hadith", openCollection: "Open collection", chapters: "chapters", hadiths: "hadiths",
  eightCollections: "Eight collections", libraryIntro: "Browse each collection by its books and chapters.",
  searchChapters: "Search books and chapters…", collectionNotFound: "Collection not found",
  returnLibrary: "Return to library", continuous: "Continuous chapter", single: "Single hadith",
  share: "Share this hadith", printPdf: "Print / PDF", previous: "Previous", next: "Next",
  privateNote: "PRIVATE NOTE", studyNarration: "Study this narration",
  noteStored: "Your note is stored locally on this device.",
  notePlaceholder: "Write a reflection or question…", tryAgain: "Try again",
  couldNotLoad: "This hadith could not be loaded.", narrator: "Narrator",
  isnad: "Isnād / transmission details", noIsnad: "The source record does not expose a separate isnād field.",
  language: "Language", verifiedOnly: "Verified translations only",
  translationUnavailable: "A verified translation in this language is not available for this narration yet.",
  translationNotice: "Arabic remains the primary and authoritative text. Translations are presented as translations.",
  source: "Source", gradeNotSupplied: "Grade not supplied", hadithCollection: "Hadith collection",
};

const ar: Dictionary = {
  search:"البحث",collections:"المجموعات",library:"مكتبتي",settings:"الإعدادات",theme:"تبديل المظهر",
  today:"قراءة اليوم",dailyTitle:"حديث للتأمل الهادئ",another:"حديث آخر",loading:"جارٍ التحميل…",
  save:"حفظ",saved:"محفوظ",bilingual:"العربية + الترجمة",original:"النص العربي",translation:"الترجمة",
  increase:"تكبير النص",decrease:"تصغير النص",explore:"استكشاف المجموعات",random:"حديث عشوائي",
  libraryTitle:"مساحة دراستك",savedHadiths:"الأحاديث المحفوظة",notes:"الملاحظات",
  noSaved:"لا توجد أحاديث محفوظة بعد.",noNotes:"ستظهر تأملاتك الخاصة هنا.",
  localStorage:"تبقى العلامات والملاحظات على هذا الجهاز، ولا يلزم إنشاء حساب.",
  findHadith:"ابحث عن حديث",searchHint:"ابحث في النص المفهرس وضيّق النتائج حسب المجموعة.",
  searchPlaceholder:"ابحث بالعربية أو بالترجمة المختارة…",allCollections:"جميع المجموعات",
  searching:"جارٍ البحث…",searchButton:"بحث",enterTwo:"أدخل حرفين على الأقل.",
  unavailable:"البحث غير متاح مؤقتًا.",resultsHere:"ستظهر نتائج البحث هنا.",readHadith:"قراءة الحديث",
  openCollection:"فتح المجموعة",chapters:"أبواب",hadiths:"أحاديث",eightCollections:"ثماني مجموعات",
  libraryIntro:"تصفح كل مجموعة حسب الكتب والأبواب.",searchChapters:"ابحث في الكتب والأبواب…",
  collectionNotFound:"المجموعة غير موجودة",returnLibrary:"العودة إلى المكتبة",
  continuous:"المجموعة كاملة",single:"حديث واحد",share:"مشاركة الحديث",printPdf:"طباعة / PDF",
  previous:"السابق",next:"التالي",privateNote:"ملاحظة خاصة",studyNarration:"ادرس هذا الحديث",
  noteStored:"تُحفظ ملاحظتك محليًا على هذا الجهاز.",notePlaceholder:"اكتب تأملًا أو سؤالًا…",
  tryAgain:"حاول مرة أخرى",couldNotLoad:"تعذر تحميل هذا الحديث.",narrator:"الراوي",
  isnad:"تفاصيل الإسناد والرواية",noIsnad:"لا يحتوي سجل المصدر على حقل مستقل للإسناد.",
  language:"اللغة",verifiedOnly:"الترجمات الموثقة فقط",
  translationUnavailable:"لا تتوفر ترجمة موثقة بهذه اللغة لهذا الحديث حتى الآن.",
  translationNotice:"تبقى العربية هي النص الأصلي والمرجع. وتُعرض الترجمات بوصفها ترجمات.",
  source:"المصدر",gradeNotSupplied:"لم تُذكر درجة الحديث",hadithCollection:"مجموعة الحديث",
};

const am: Dictionary = {
  search:"ፍለጋ",collections:"ስብስቦች",library:"የእኔ ቤተ-መጽሐፍት",settings:"ቅንብሮች",theme:"ገጽታ ቀይር",
  today:"የዛሬ ንባብ",dailyTitle:"ለጸጥታ እና ለማሰላሰል የሚረዳ ሐዲስ",another:"ሌላ ሐዲስ",loading:"በመጫን ላይ…",
  save:"አስቀምጥ",saved:"ተቀምጧል",bilingual:"ዓረብኛ + ትርጉም",original:"የዓረብኛ ዋና ጽሑፍ",translation:"ትርጉም",
  increase:"የጽሑፍ መጠን ጨምር",decrease:"የጽሑፍ መጠን ቀንስ",explore:"ስብስቦችን ይመልከቱ",random:"የዘፈቀደ ሐዲስ",
  libraryTitle:"የጥናት ቦታዎ",savedHadiths:"የተቀመጡ ሐዲሶች",notes:"ማስታወሻዎች",
  noSaved:"እስካሁን የተቀመጠ ሐዲስ የለም።",noNotes:"የግል ማሰላሰሎችዎ እዚህ ይታያሉ።",
  localStorage:"የተቀመጡ ምልክቶችና ማስታወሻዎች በዚህ መሣሪያ ላይ ብቻ ይቆያሉ፤ መለያ አያስፈልግም።",
  findHadith:"ሐዲስ ይፈልጉ",searchHint:"በተዘጋጀው የሐዲስ ማውጫ ውስጥ በቃላት ይፈልጉ፣ ከዚያም በስብስብ ያጣሩ።",
  searchPlaceholder:"በዓረብኛ ወይም በተመረጠው ትርጉም ይፈልጉ…",allCollections:"ሁሉም ስብስቦች",
  searching:"በመፈለግ ላይ…",searchButton:"ፈልግ",enterTwo:"ቢያንስ ሁለት ፊደላት ያስገቡ።",
  unavailable:"ፍለጋው ለጊዜው አይገኝም።",resultsHere:"የፍለጋ ውጤቶች እዚህ ይታያሉ።",readHadith:"ሐዲሱን አንብብ",
  openCollection:"ስብስቡን ክፈት",chapters:"ምዕራፎች",hadiths:"ሐዲሶች",eightCollections:"ስምንት የሐዲስ ስብስቦች",
  libraryIntro:"እያንዳንዱን ስብስብ በመጻሕፍቱና በምዕራፎቹ ይመልከቱ።",searchChapters:"መጻሕፍትና ምዕራፎችን ይፈልጉ…",
  collectionNotFound:"ስብስቡ አልተገኘም",returnLibrary:"ወደ ቤተ-መጽሐፍት ተመለስ",
  continuous:"ቀጣይ ምዕራፍ",single:"አንድ ሐዲስ",share:"ይህን ሐዲስ አጋራ",printPdf:"አትም / PDF",
  previous:"ቀዳሚ",next:"ቀጣይ",privateNote:"የግል ማስታወሻ",studyNarration:"ይህን ሐዲስ አጥኑ",
  noteStored:"ማስታወሻዎ በዚህ መሣሪያ ላይ በአካባቢው ይቀመጣል።",notePlaceholder:"ማሰላሰል ወይም ጥያቄ ይጻፉ…",
  tryAgain:"እንደገና ሞክር",couldNotLoad:"ይህ ሐዲስ መጫን አልተቻለም።",narrator:"ተራኪ",
  isnad:"የእስናድ / የትርክት ዝርዝሮች",noIsnad:"የምንጩ መዝገብ ለእስናድ የተለየ መስክ አያቀርብም።",
  language:"ቋንቋ",verifiedOnly:"የተረጋገጡ ትርጉሞች ብቻ",
  translationUnavailable:"ለዚህ ሐዲስ በዚህ ቋንቋ የተረጋገጠ ትርጉም እስካሁን አይገኝም።",
  translationNotice:"ዓረብኛ ዋናውና ተዓማኒው ጽሑፍ ነው። ትርጉሞች እንደ ትርጉም ብቻ ይቀርባሉ።",
  source:"ምንጭ",gradeNotSupplied:"የሐዲሱ ደረጃ አልተገለጸም",hadithCollection:"የሐዲስ ስብስብ",
};

const ti: Dictionary = {
  search:"ምድላዋ",collections:"ስብስባት",library:"ቤተ-መጽሐፍተይ",settings:"ቅንብራት",theme:"መልክዒ ቀይር",
  today:"ናይ ሎሚ ንባብ",dailyTitle:"ንህዱእ ምስትንታን ዝሕግዝ ሓዲስ",another:"ካልእ ሓዲስ",loading:"ይጽዓን ኣሎ…",
  save:"ዕቀብ",saved:"ተዓቂቡ",bilingual:"ዓረብኛ + ትርጉም",original:"መበቆላዊ ዓረብኛ",translation:"ትርጉም",
  increase:"ዓቐን ጽሑፍ ወስኽ",decrease:"ዓቐን ጽሑፍ ንክ",explore:"ስብስባት ርአ",random:"ብዘይ ምርጫ ሓዲስ",
  libraryTitle:"ቦታ መጽናዕትኻ",savedHadiths:"ዝተዓቀቡ ሓዲሳት",notes:"መዘኻኸሪታት",
  noSaved:"ገና ዝተዓቀበ ሓዲስ የለን።",noNotes:"ውልቃዊ ምስትንታንካ ኣብዚ ክርአ እዩ።",
  localStorage:"ምልክታትን መዘኻኸሪታትን ኣብዚ መሳርሒ ጥራይ ይቕመጡ። ኣካውንት ኣየድልን።",
  findHadith:"ሓዲስ ድለ",searchHint:"ኣብ ዝተዳለወ መዝገብ ብቓላት ድለ፣ ብስብስብ ድማ ኣጽርዮ።",
  searchPlaceholder:"ብዓረብኛ ወይ ብዝመረጽካዮ ትርጉም ድለ…",allCollections:"ኩሎም ስብስባት",
  searching:"ይድለ ኣሎ…",searchButton:"ድለ",enterTwo:"ብውሑዱ ክልተ ፊደላት ኣእቱ።",
  unavailable:"ምድላው ንግዚኡ ኣይሰርሕን።",resultsHere:"ውጽኢት ምድላው ኣብዚ ክርአ እዩ።",readHadith:"ነቲ ሓዲስ ኣንብብ",
  openCollection:"ነቲ ስብስብ ክፈት",chapters:"ምዕራፋት",hadiths:"ሓዲሳት",eightCollections:"ሸሞንተ ስብስባት ሓዲስ",
  libraryIntro:"ነፍሲ ወከፍ ስብስብ ብመጻሕፍቱን ምዕራፋቱን ርአ።",searchChapters:"መጻሕፍትን ምዕራፋትን ድለ…",
  collectionNotFound:"እቲ ስብስብ ኣይተረኽበን",returnLibrary:"ናብ ቤተ-መጽሐፍቲ ተመለስ",
  continuous:"ቀጻሊ ምዕራፍ",single:"ሓደ ሓዲስ",share:"ነዚ ሓዲስ ኣካፍል",printPdf:"ኣትም / PDF",
  previous:"ዝሓለፈ",next:"ዝቕጽል",privateNote:"ውልቃዊ መዘኻኸሪ",studyNarration:"ነዚ ሓዲስ ኣጽንዕ",
  noteStored:"መዘኻኸሪኻ ኣብዚ መሳርሒ ብከባቢ ይቕመጥ።",notePlaceholder:"ሓሳብ ወይ ሕቶ ጽሓፍ…",
  tryAgain:"እንደገና ፈትን",couldNotLoad:"እዚ ሓዲስ ክጽዓን ኣይከኣለን።",narrator:"ራዊ",
  isnad:"ዝርዝር እስናድ / ሰንሰለት ምስላ",noIsnad:"መዝገብ ምንጪ ንእስናድ ፍሉይ መስክ ኣየቕርብን።",
  language:"ቋንቋ",verifiedOnly:"ዝተረጋገጹ ትርጉማት ጥራይ",
  translationUnavailable:"ንዚ ሓዲስ ብዚ ቋንቋ ዝተረጋገጸ ትርጉም ክሳብ ሕጂ የለን።",
  translationNotice:"ዓረብኛ መበቆላዊን ቀንዲን ጽሑፍ እዩ። ትርጉማት ከም ትርጉም ጥራይ ይቐርቡ።",
  source:"ምንጪ",gradeNotSupplied:"ደረጃ ናይቲ ሓዲስ ኣይተገልጸን",hadithCollection:"ስብስብ ሓዲስ",
};

const om: Dictionary = {
  search:"Barbaadi",collections:"Walitti qabamoota",library:"Kuusaa koo",settings:"Qindaa'ina",theme:"Bifa jijjiiri",
  today:"DUBBISA HAR'AA",dailyTitle:"Hadiisa xiinxala tasgabbaa'aaf",another:"Hadiisa biraa",loading:"Fe'amaa jira…",
  save:"Olkaa'i",saved:"Olkaa'ame",bilingual:"Arabiffaa + hiika",original:"Barreeffama Arabiffaa",translation:"Hiika",
  increase:"Qubee guddisi",decrease:"Qubee xiqqeessi",explore:"Walitti qabamoota ilaali",random:"Hadiisa tasaa",
  libraryTitle:"Iddoo qo'annoo kee",savedHadiths:"Hadiisota olkaa'aman",notes:"Yaadannoo",
  noSaved:"Hadiisni olkaa'ame hin jiru.",noNotes:"Yaadannoowwan dhuunfaa kee asitti mul'atu.",
  localStorage:"Mallattoolee fi yaadannoowwan meeshaa kana irratti qofa kuufamu; herrega hin barbaadu.",
  findHadith:"Hadiisa barbaadi",searchHint:"Kuusaa hadiisaa keessatti jechootaan barbaadi; walitti qabamaatiin dhiphisi.",
  searchPlaceholder:"Arabiffaan ykn hiika filatameen barbaadi…",allCollections:"Walitti qabamoota hunda",
  searching:"Barbaadaa jira…",searchButton:"Barbaadi",enterTwo:"Yoo xiqqaate qubee lama galchi.",
  unavailable:"Barbaaduun yeroo ammaa hin argamu.",resultsHere:"Bu'aan barbaachaa asitti mul'ata.",readHadith:"Hadiisa dubbisi",
  openCollection:"Walitti qabama bani",chapters:"Boqonnaalee",hadiths:"Hadiisota",eightCollections:"Walitti qabamoota hadiisaa saddeet",
  libraryIntro:"Walitti qabama hunda kitaabota fi boqonnaalee isaatiin ilaali.",searchChapters:"Kitaabota fi boqonnaalee barbaadi…",
  collectionNotFound:"Walitti qabamni hin argamne",returnLibrary:"Gara kuusaatti deebi'i",
  continuous:"Boqonnaa itti fufiinsa qabu",single:"Hadiisa tokko",share:"Hadiisa kana qoodi",printPdf:"Maxxansi / PDF",
  previous:"Duraa",next:"Itti aanu",privateNote:"YAADANNOO DHUUNFAA",studyNarration:"Hadiisa kana qo'adhu",
  noteStored:"Yaadannoon kee meeshaa kana irratti naannoo keessatti kuufama.",notePlaceholder:"Yaada ykn gaaffii barreessi…",
  tryAgain:"Irra deebi'ii yaali",couldNotLoad:"Hadiisni kun fe'amuu hin dandeenye.",narrator:"Ravii",
  isnad:"Bal'ina Isnaad / dabarsa",noIsnad:"Galmeen madda isnaadaaf dirree adda ta'e hin qabu.",
  language:"Afaan",verifiedOnly:"Hiikawwan mirkanaa'an qofa",
  translationUnavailable:"Hiikni mirkanaa'e hadiisa kanaaf afaan kanaan amma hin argamu.",
  translationNotice:"Arabiffaan barruu jalqabaa fi madda aangoo qabuudha. Hiikawwan akka hiikaatti qofa dhiyaatu.",
  source:"Madda",gradeNotSupplied:"Sadarkaan hadiisaa hin kennamne",hadithCollection:"Walitti qabama hadiisaa",
};

const dictionaries: Record<Locale, Dictionary> = { en, ar, am, ti, om };
const trustUi: Record<Locale, Dictionary> = {
 en:{sourceReference:"Source reference",chapter:"Chapter",hadithNumber:"Hadith number",authenticity:"Authenticity",gradeContext:"About this grade",gradeNotSuppliedDetail:"This source record does not provide a report-level grade. Collection membership is not used as a substitute for grading.",translationSource:"Translation source",translationAuthority:"Translations are secondary to the Arabic original.",aboutSources:"About the sources",reportError:"Report a possible error",onlySahih:"Ṣaḥīḥ only",allGrades:"All grades",privacyFeedback:"Feedback is prepared on your device and is only sent if you choose to submit it.",reportText:"What appears to be incorrect?",sendReport:"Prepare report",sourceVersion:"Database version",sourceUpdated:"Source update",scholarlyContext:"Scholarly context",verified:"Verified source"},
 ar:{sourceReference:"مرجع المصدر",chapter:"الباب",hadithNumber:"رقم الحديث",authenticity:"درجة الحديث",gradeContext:"حول هذه الدرجة",gradeNotSuppliedDetail:"لا يقدّم سجل المصدر الحالي درجةً لهذا الحديث. ولا نستخدم انتماء الحديث إلى المجموعة بديلاً عن درجة الحديث.",translationSource:"مصدر الترجمة",translationAuthority:"الترجمة تابعة للنص العربي وليست في مرتبته.",aboutSources:"حول المصادر",reportError:"الإبلاغ عن خطأ محتمل",onlySahih:"الصحيح فقط",allGrades:"جميع الدرجات",privacyFeedback:"تُجهّز الملاحظة على جهازك ولا تُرسل إلا إذا اخترت إرسالها.",reportText:"ما الذي يبدو غير صحيح؟",sendReport:"إعداد البلاغ",sourceVersion:"إصدار قاعدة البيانات",sourceUpdated:"تحديث المصدر",scholarlyContext:"السياق العلمي",verified:"مصدر موثّق"},
 am:{sourceReference:"የምንጭ ማጣቀሻ",chapter:"ምዕራፍ",hadithNumber:"የሐዲስ ቁጥር",authenticity:"የሐዲስ ደረጃ",gradeContext:"ስለዚህ ደረጃ",gradeNotSuppliedDetail:"የአሁኑ የምንጭ መዝገብ የሐዲስ ደረጃ አያቀርብም። የስብስቡን አባልነት እንደ ደረጃ አንጠቀምበትም።",translationSource:"የትርጉም ምንጭ",translationAuthority:"ትርጉሙ ከዓረብኛ ዋና ጽሑፍ በኋላ የሚመጣ ነው።",aboutSources:"ስለ ምንጮች",reportError:"ሊኖር የሚችል ስህተት ሪፖርት አድርግ",onlySahih:"ሰሒሕ ብቻ",allGrades:"ሁሉም ደረጃዎች",privacyFeedback:"ግብረመልሱ በመሣሪያዎ ላይ ብቻ ይዘጋጃል፤ እርስዎ ካልመረጡ አይላክም።",reportText:"ምን ነገር ትክክል አይመስልዎትም?",sendReport:"ሪፖርት አዘጋጅ",sourceVersion:"የዳታቤዝ ስሪት",sourceUpdated:"የምንጭ ዝመና",scholarlyContext:"ምሁራዊ አውድ",verified:"የተረጋገጠ ምንጭ"},
 ti:{sourceReference:"መወከሲ ምንጪ",chapter:"ምዕራፍ",hadithNumber:"ቁጽሪ ሓዲስ",authenticity:"ደረጃ ሓዲስ",gradeContext:"ብዛዕባ እዚ ደረጃ",gradeNotSuppliedDetail:"መዝገብ ምንጪ ንእዚ ሓዲስ ደረጃ ኣይህብን። ኣባልነት ስብስብ ከም ደረጃ ሓዲስ ኣይንጥቀመሉን።",translationSource:"ምንጪ ትርጉም",translationAuthority:"ትርጉም ካብ መበቆላዊ ዓረብኛ ታሕቲ እዩ።",aboutSources:"ብዛዕባ ምንጭታት",reportError:"ንዝኾነ ጌጋ ሓብር",onlySahih:"ሰሒሕ ጥራይ",allGrades:"ኩሎም ደረጃታት",privacyFeedback:"ግብረመልስኻ ኣብ መሳርሒኻ ጥራይ ይዳሎ፤ እንተዘይመሪጽካ ኣይስደድን።",reportText:"እንታይ ትኽክል ዘይመስል እዩ?",sendReport:"ሪፖርት ኣዳልው",sourceVersion:"ስሪት ዳታቤዝ",sourceUpdated:"ዝምዕባለ ምንጪ",scholarlyContext:"ምሁራዊ ኣውድ",verified:"ዝተረጋገጸ ምንጪ"},
 om:{sourceReference:"Wabii madda",chapter:"Boqonnaa",hadithNumber:"Lakkoofsa hadiisaa",authenticity:"Sadarkaa hadiisaa",gradeContext:"Waa'ee sadarkaa kanaa",gradeNotSuppliedDetail:"Galmeen madda amma jiru sadarkaa hadiisaa hin kennu. Miseensummaa walitti qabamaa bakka sadarkaa hadiisaa hin buusnu.",translationSource:"Madda hiikaa",translationAuthority:"Hiikni barruu Arabiffaa jalqabaa caalaa aangoo hin qabu.",aboutSources:"Waa'ee maddoota",reportError:"Dogoggora shakkame gabaasi",onlySahih:"Ṣaḥīḥ qofa",allGrades:"Sadarkaalee hunda",privacyFeedback:"Yaadni kee meeshaa kee irratti qophaa'a; yoo ati hin filanne hin ergamu.",reportText:"Maaltu sirrii hin fakkaatu?",sendReport:"Gabaasa qopheessi",sourceVersion:"Gosa kuusaa ragaa",sourceUpdated:"Haaromsa madda",scholarlyContext:"Haala barnoota hadiisaa",verified:"Madda mirkanaa'e"}
};


export function translate(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? trustUi[locale][key] ?? trustUi.en[key] ?? dictionaries.en[key] ?? key;
}
