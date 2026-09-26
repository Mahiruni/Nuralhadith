export type Collection={id:string;name:string;arabic:string;short:string;count:number;note:string};
export const collections:Collection[]=[
{id:"bukhari",name:"Ṣaḥīḥ al-Bukhārī",arabic:"صحيح البخاري",short:"Bukhārī",count:7277,note:"Source-reported corpus count; collection membership is not itself a universal authenticity grade."},
{id:"muslim",name:"Ṣaḥīḥ Muslim",arabic:"صحيح مسلم",short:"Muslim",count:7459,note:"Source-reported corpus count; edition numbering can differ."},
{id:"abudawud",name:"Sunan Abī Dāwūd",arabic:"سنن أبي داود",short:"Abū Dāwūd",count:5276,note:"A major Sunan collection; individual reports may carry different grades."},
{id:"tirmidhi",name:"Jāmiʿ at-Tirmidhī",arabic:"جامع الترمذي",short:"Tirmidhī",count:4053,note:"A major Sunan collection with report-level grading."},
{id:"nasai",name:"Sunan an-Nasāʾī",arabic:"سنن النسائي",short:"Nasāʾī",count:5768,note:"Source-reported corpus count; edition numbering can differ."},
{id:"ibnmajah",name:"Sunan Ibn Mājah",arabic:"سنن ابن ماجه",short:"Ibn Mājah",count:4345,note:"A major Sunan collection with report-level grading."},
{id:"malik",name:"Muwaṭṭaʾ Mālik",arabic:"موطأ مالك",short:"Mālik",count:1985,note:"An early foundational compilation; numbering varies by edition."},
{id:"ahmed",name:"Musnad Aḥmad",arabic:"مسند الإمام أحمد بن حنبل",short:"Aḥmad",count:1374,note:"The connected source currently exposes 1,374 indexed entries; this must not be presented as the full printed Musnad."}
];