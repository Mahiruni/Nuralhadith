'use client';
import Link from "next/link";
import {useEffect,useState} from "react";
import {collections} from "../lib/collections";
import {useLanguage} from "../components/LanguageProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Icon from "../components/Icon";

type H={arabic:string;english?:string;number?:string|number;grade?:string;source?:string;narrator?:string;collection?:string};

export default function Home(){
  const {t,locale}=useLanguage();
  const[dark,setDark]=useState(false);const[h,setH]=useState<H|null>(null);const[loading,setLoading]=useState(true);const[size,setSize]=useState(1);const[mode,setMode]=useState<"bilingual"|"arabic"|"english">("bilingual");const[saved,setSaved]=useState(false);
  useEffect(()=>{if("serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>{});setDark(localStorage.getItem("nur-theme")==="dark");const k=localStorage.getItem("nur-last");if(k){try{setH(JSON.parse(k))}catch{}}},[]);
  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("nur-theme",dark?"dark":"light")},[dark]);
  async function random(){setLoading(true);try{const r=await fetch("/api/random");if(!r.ok)throw new Error();const d=await r.json();const x=d.hadith||d;setH(x);localStorage.setItem("nur-last",JSON.stringify(x))}catch{}finally{setLoading(false)}}
  useEffect(()=>{if(!h)random();else setLoading(false)},[]);
  function toggleSave(){if(!h)return;const k=(h.collection||"")+"/"+h.number;const s=JSON.parse(localStorage.getItem("nur-saved")||"[]");const nextSaved=!s.includes(k);const n=nextSaved?[...s,k]:s.filter((x:string)=>x!==k);localStorage.setItem("nur-saved",JSON.stringify(n));setSaved(nextSaved);window.dispatchEvent(new CustomEvent("nur:toast",{detail:nextSaved?"Saved to your library":"Removed from your library"}))}
  return <main className="home">
    <header className="topbar">
      <Link href="/" className="brand"><span aria-hidden="true"><Icon name="library" size={15}/></span><div><b>Nur al-Hadith</b><small>نور الحديث</small></div></Link>
      <nav><Link href="/collections">{t("collections")}</Link><Link href="/search">{t("search")}</Link><Link href="/topics">Topics</Link><Link href="/library">{t("library")}</Link><Link href="/settings">{t("settings")}</Link><LanguageSwitcher/><button className="icon-button" onClick={()=>setDark(!dark)} aria-label={t("theme")}><Icon name={dark?"sun":"moon"} size={17}/></button></nav>
    </header>
    <section className="home-hero"><div><div className="eyebrow">نور الحديث · A DIGITAL HADITH LIBRARY</div><h1>Read the Sunnah<br/><em>with presence.</em></h1><p>A quiet, carefully structured place to read Arabic hadith and verified translations across eight major collections.</p><div className="hero-actions"><Link href="/collections" className="primary">{t("explore")}</Link><button className="secondary" onClick={random}><span>{t("random")}</span><Icon name="arrowUpRight" size={14}/></button></div></div><div className="hero-mark" aria-hidden="true">ﷺ</div></section>
    <section className="daily"><div className="section-head"><div><span className="eyebrow">{t("today")}</span><h2>{t("dailyTitle")}</h2></div><button className="icon-action" onClick={random}><span>{loading?t("loading"):t("another")}</span><Icon name="refresh" size={14}/></button></div>
      {loading?<div className="skeleton"><span/><span/><span/></div>:h&&<article className="daily-card" aria-label={t("dailyTitle")}><div className="daily-meta"><span>{h.source||t("hadithCollection")}</span><button className="icon-action" onClick={toggleSave}><Icon name={saved?"check":"bookmark"} size={14}/><span>{saved?t("saved"):t("save")}</span></button></div>
      {mode!=="english"&&<div className="daily-arabic" dir="rtl" style={{fontSize:1.9*size+"rem"}}>{h.arabic}</div>}
      {mode!=="arabic"&&h.english&&<p className="daily-english">{h.english}</p>}
      <div className="daily-foot"><span>{h.narrator||""}</span><strong>{h.grade||t("gradeNotSupplied")}</strong></div>
      <div className="reader-controls" role="group" aria-label="Reading controls"><button className={mode==="arabic"?"active":""} onClick={()=>setMode("arabic")}>{t("original")}</button><button className={mode==="bilingual"?"active":""} onClick={()=>setMode("bilingual")}>{t("bilingual")}</button><button className={mode==="english"?"active":""} onClick={()=>setMode("english")}>{locale==="en"?"English":t("translation")}</button><button onClick={()=>setSize(Math.max(.8,size-.1))} aria-label={t("decrease")}>A−</button><button onClick={()=>setSize(Math.min(1.5,size+.1))} aria-label={t("increase")}>A+</button></div>
      {locale!=="en"&&<div className="translation-notice">{t("translationNotice")}</div>}</article>}</section>
    <section className="collection-section"><div className="section-head"><div><span className="eyebrow">THE LIBRARY</span><h2>{t("eightCollections")}</h2></div><Link href="/collections">{t("collections")} →</Link></div><div className="home-grid">{collections.map((c,i)=><Link href={"/collections/"+c.id} className="home-collection" key={c.id}><span>0{i+1}</span><div dir="rtl">{c.arabic}</div><h3>{c.name}</h3><p>{c.note}</p></Link>)}</div></section>
    <footer className="home-footer"><span>نور الحديث</span><small>Arabic original · Verified translations · Private notes · Offline-ready PWA</small></footer>
  </main>
}
