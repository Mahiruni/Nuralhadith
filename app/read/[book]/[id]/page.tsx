'use client';
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {useParams} from "next/navigation";
import {collections} from "../../../../lib/collections";
import type {Hadith} from "../../../../lib/types";
import {useLanguage} from "../../../../components/LanguageProvider";
import AppHeader from "../../../../components/AppHeader";
import {getVerifiedTranslation} from "../../../../lib/verifiedTranslations";
import {GRADE_INFO,normalizeGrade,SOURCE_VERSION} from "../../../../lib/trust";
import {readOfflineBook} from "../../../../lib/offlineDb";
import StudyTools from "../../../../components/StudyTools";
import AudioPlayer from "../../../../components/AudioPlayer";

export default function Reader(){
 const{t,locale}=useLanguage();const{book,id}=useParams<{book:string;id:string}>();const c=collections.find(x=>x.id===book);
 const[h,setH]=useState<Hadith|null>(null);const touchStart=useRef<number|null>(null);const[chapter,setChapter]=useState<Hadith[]>([]);const[continuous,setContinuous]=useState(false);const[loading,setLoading]=useState(true);const[error,setError]=useState("");const[retry,setRetry]=useState(0);
 const[mode,setMode]=useState<"bilingual"|"arabic"|"translation">("bilingual");const[size,setSize]=useState(1);const[saved,setSaved]=useState(false);const[note,setNote]=useState("");
 const noteKey="nur-note-"+book+"-"+id;
 useEffect(()=>{let cancelled=false;setLoading(true);setError("");(async()=>{try{const offline=await readOfflineBook(book);const local=offline?.hadiths?.find((x:any)=>Number(x.idInBook)===Number(id)||Number(x.id)===Number(id));if(local){const chapterInfo=offline.chapters?.find((x:any)=>x.id===local.chapterId);const normalized={id:local.id,collection:book,number:local.idInBook||local.id,chapterId:local.chapterId,chapter:chapterInfo?.english||"",book:chapterInfo?.arabic||"",arabic:local.arabic||"",english:local.english?.text||"",narrator:local.english?.narrator||"",source:c?.name};if(!cancelled)setH(normalized);if(!cancelled)setError("");if(!cancelled)setLoading(false);return}const r=await fetch("/api/hadith/"+book+"/"+id);if(!r.ok)throw new Error();const d=await r.json();const x=d.hadith||d;const normalized={...x,collection:book,number:x.idInBook||x.id||id,source:c?.name};if(!cancelled)setH(normalized);localStorage.setItem("nur-last",JSON.stringify(normalized));if(!cancelled)setError("")}catch{if(!cancelled)setError(t("couldNotLoad"))}finally{if(!cancelled)setLoading(false)}})()},[book,id,c?.name,retry,t]);
 useEffect(()=>{const s=JSON.parse(localStorage.getItem("nur-saved")||"[]");setSaved(s.includes(book+"/"+id));setNote(localStorage.getItem(noteKey)||"")},[book,id,noteKey]);
 useEffect(()=>{if(note)localStorage.setItem(noteKey,note);else localStorage.removeItem(noteKey)},[note,noteKey]);
 useEffect(()=>{if(!continuous||!h?.chapterId)return;fetch("/api/hadith/"+book+"/chapter/"+h.chapterId).then(r=>r.ok?r.json():null).then(d=>{const a=(d?.hadiths||d?.data||[]).map((x:Hadith)=>({...x,collection:book,number:x.number||x.id}));if(a.length)setChapter(a)}).catch(()=>{})},[continuous,h?.chapterId,book]);
 function toggleSave(){const s=JSON.parse(localStorage.getItem("nur-saved")||"[]");const k=book+"/"+id;const nextSaved=!s.includes(k);const next=nextSaved?[...s,k]:s.filter((x:string)=>x!==k);localStorage.setItem("nur-saved",JSON.stringify(next));setSaved(nextSaved);window.dispatchEvent(new CustomEvent("nur:toast",{detail:nextSaved?"Saved to your library":"Removed from your library"}))}
 async function share(x=h){if(!x)return;const verified=locale==="en"?x.english:getVerifiedTranslation(locale,book,x.number).translation?.text;const text=(x.arabic?x.arabic+"\n\n":"")+(verified||"")+(verified?"\n\n":"")+t("translationNotice")+"\n\n"+(c?.name||"")+" "+x.number;if(navigator.share)await navigator.share({title:"Nur al-Hadith",text});else await navigator.clipboard.writeText(text)}
 const next=Number(id)+1,prev=Math.max(1,Number(id)-1);
 useEffect(()=>{const onTouchStart=(e:TouchEvent)=>{touchStart.current=e.changedTouches[0]?.clientX??null};const onTouchEnd=(e:TouchEvent)=>{if(touchStart.current===null)return;const dx=e.changedTouches[0]?.clientX-touchStart.current;touchStart.current=null;if(Math.abs(dx)<70)return;if(dx<0)window.location.href="/read/"+book+"/"+next;else window.location.href="/read/"+book+"/"+prev};window.addEventListener("touchstart",onTouchStart,{passive:true});window.addEventListener("touchend",onTouchEnd,{passive:true});return()=>{window.removeEventListener("touchstart",onTouchStart);window.removeEventListener("touchend",onTouchEnd)}},[book,next,prev]);
 function Translation({x}:{x:Hadith}){const verified=locale==="en"?{text:x.english||"",source:"Current English corpus",sourceUrl:"https://github.com/AhmedBaset/hadith-json"}:getVerifiedTranslation(locale,book,x.number).translation;return <div className="translation-panel"><div className="translation-label"><span>{locale==="en"?"English":t("translation")}</span><span>{verified?t("verifiedOnly"):""}</span></div>{verified?.text?<p className={locale==="am"||locale==="ti"?"translation-text geez-text":"translation-text"} dir={locale==="ar"?"rtl":"ltr"}>{verified.text}</p>:<p className="translation-unavailable">{t("translationUnavailable")}</p>}</div>}
 function Card({x}:{x:Hadith}){const grade=GRADE_INFO[normalizeGrade(x.grade)];return <article className="reader-card">
 {mode!=="translation"&&<div className="reader-arabic" dir="rtl" style={{fontSize:1.9*size+"rem"}}>{x.arabic}</div>}
 <section className="trust-reference" aria-label={t("sourceReference")}><div className="trust-kicker">{t("sourceReference")}</div><div className="trust-reference-main"><strong>{c?.name||book}</strong><span dir="rtl">{c?.arabic||""}</span><span>{t("chapter")}: {x.chapter||t("chapter")}</span><span>{t("hadithNumber")}: {x.number}</span></div><small>{SOURCE_VERSION}</small></section>
 {mode!=="arabic"&&<Translation x={x}/>}
 <button className={"grade-badge grade-"+grade.key} aria-expanded="false" onClick={(e)=>{const d=(e.currentTarget.nextElementSibling as HTMLDetailsElement|null);if(d)d.open=!d.open}}>{t("authenticity")}: {grade.label}</button>
 <details className="grade-details"><summary>{t("gradeContext")}</summary><p>{x.grade?grade.explanation: t("gradeNotSuppliedDetail")}</p><p className="scholarly-context">{grade.scholarlyContext}</p></details>
 {x.narrator&&<div className="reader-meta">{t("narrator")}: {x.narrator}</div>}
 <details><summary>{t("isnad")}</summary><p>{x.isnad||t("noIsnad")}</p></details>
 <button className="share-inline" onClick={()=>share(x)}>{t("share")}</button>
 </article>}
 return <main className="shell reader-shell"><AppHeader />
 <div className="reader" aria-live="polite"><div className="eyebrow">{c?.name||book}</div>{loading&&<div className="skeleton"><span/><span/><span/></div>}{error&&<div className="error-box">{error}<button onClick={()=>setRetry(x=>x+1)}>{t("tryAgain")}</button></div>}
 {h&&<><div className="reader-title"><span>{t("readHadith")} {h.number}</span><span>{h.grade||t("gradeNotSupplied")}</span></div>{continuous&&chapter.length?chapter.map(x=><div key={String(x.number)} className="continuous-item"><Card x={x}/></div>):<Card x={h}/>}
 <div className="reader-controls"><button onClick={()=>setContinuous(!continuous)}>{continuous?t("single"):t("continuous")}</button><button onClick={toggleSave}>{saved?"★ "+t("saved"):"☆ "+t("save")}</button><button className={mode==="arabic"?"active":""} onClick={()=>setMode("arabic")}>{t("original")}</button><button className={mode==="bilingual"?"active":""} onClick={()=>setMode("bilingual")}>{t("bilingual")}</button><button className={mode==="translation"?"active":""} onClick={()=>setMode("translation")}>{t("translation")}</button><button onClick={()=>setSize(Math.max(.8,size-.1))} aria-label={t("decrease")}>A−</button><button onClick={()=>setSize(Math.min(1.5,size+.1))} aria-label={t("increase")}>A+</button><button onClick={()=>share()}>{t("share")}</button><button onClick={()=>window.print()}>{t("printPdf")}</button></div>
 <section className="note-panel"><div><div className="eyebrow">{t("privateNote")}</div><h2>{t("studyNarration")}</h2><p>{t("noteStored")}</p></div><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder={t("notePlaceholder")}/></section>
 <AudioPlayer book={book} number={h.number} onPrevious={()=>{window.location.href="/read/"+book+"/"+prev}} onNext={()=>{window.location.href="/read/"+book+"/"+next}}/><StudyTools book={book} number={h.number} arabic={h.arabic} english={h.english}/><nav className="prev-next"><Link href={"/read/"+book+"/"+prev}>← {t("previous")}</Link><span>{t("readHadith")} {h.number}</span><Link href={"/read/"+book+"/"+next}>{t("next")} →</Link></nav>
 </>}</div></main>}
