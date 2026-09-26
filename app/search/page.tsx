'use client';
import Link from "next/link"; import {useState} from "react"; import {collections} from "../../lib/collections";
import {useLanguage} from "../../components/LanguageProvider"; import LanguageSwitcher from "../../components/LanguageSwitcher";
type Result={collection?:string;collection_name?:string;hadithnumber?:number;id?:string|number;arabic?:string;english?:string;text?:string;grade?:string};
export default function SearchPage(){
 const{t,locale}=useLanguage();const[q,setQ]=useState("");const[collection,setCollection]=useState("");const[results,setResults]=useState<Result[]>([]);const[loading,setLoading]=useState(false);const[message,setMessage]=useState("");
 async function search(e?:React.FormEvent){e?.preventDefault();if(q.trim().length<2){setMessage(t("enterTwo"));return}setLoading(true);setMessage("");try{const r=await fetch("/api/search?q="+encodeURIComponent(q.trim())+"&collection="+encodeURIComponent(collection));const d=await r.json();setResults(d.results||d.data||[]);setMessage(d.message||"")}catch{setMessage(t("unavailable"))}finally{setLoading(false)}}
 return <main className="shell"><header className="pagebar"><Link href="/" className="brand-link">✦ <span>Nur al-Hadith</span><small>نور الحديث</small></Link><div style={{display:"flex",alignItems:"center",gap:10}}><LanguageSwitcher/><Link href="/collections" className="quiet-link">{t("collections")}</Link></div></header>
 <div className="page-content search-page"><div className="eyebrow">{t("search")}</div><h1 className="page-title">{t("findHadith")}</h1><p className="lead">{t("searchHint")}</p>
 <form className="search-form" onSubmit={search}><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t("searchPlaceholder")} autoFocus/><select value={collection} onChange={e=>setCollection(e.target.value)} aria-label={t("collections")}><option value="">{t("allCollections")}</option>{collections.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><button type="submit">{loading?t("searching"):t("searchButton")}</button></form>
 <div className="search-results">{results.map((r,i)=>{const b=r.collection||"";const n=r.hadithnumber||r.id||i+1;return <Link className="result-card" href={b?"/read/"+b+"/"+n:"#"} key={String(r.id||i)}><div className="result-meta">{r.collection_name||b} · {r.grade||t("gradeNotSupplied")}</div><div className="result-arabic" dir="rtl">{r.arabic}</div><p>{r.english||r.text}</p><span>{t("readHadith")} {n} →</span></Link>})}</div>
 {!loading&&!results.length&&<div className="empty">{message||t("resultsHere")}</div>}
 {locale!=="en"&&<div className="translation-notice">{t("translationNotice")}</div>}
 </div></main>
}