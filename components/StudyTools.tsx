"use client";
import {useEffect,useMemo,useState} from "react";
import {useLanguage} from "./LanguageProvider";
import {STUDY_TOPICS,topicName} from "../lib/study";
type Props={book:string;number:string|number;arabic:string;english?:string};
export default function StudyTools({book,number,arabic,english}:Props){const{locale}=useLanguage();const key=book+"/"+number;const[open,setOpen]=useState(false);const[note,setNote]=useState("");const[tag,setTag]=useState("");const[status,setStatus]=useState<"none"|"reflecting"|"memorizing">("none");const[quote,setQuote]=useState("");const[topics,setTopics]=useState<string[]>([]);
useEffect(()=>{setNote(localStorage.getItem("nur-study-note-"+key)||"");setTag(localStorage.getItem("nur-study-tag-"+key)||"");setStatus((localStorage.getItem("nur-study-status-"+key)||"none") as any);setTopics(JSON.parse(localStorage.getItem("nur-study-topics-"+key)||"[]"))},[key]);
const persist=(k:string,v:string)=>{if(v)localStorage.setItem(k,v);else localStorage.removeItem(k)};
function capture(){const s=window.getSelection()?.toString().trim();if(s){setQuote(s);setOpen(true);}}
const topicChoices=useMemo(()=>STUDY_TOPICS,[locale]);
return <section className="study-tools"><button className="study-reveal" onClick={()=>setOpen(!open)} aria-expanded={open}>✦ {open?"Close study tools":"Study this Hadith"}</button>{open&&<div className="study-panel">
<div className="study-panel-head"><div><div className="eyebrow">PERSONAL STUDY</div><h2>Read, reflect, remember.</h2><p>Your notes, labels and study state stay on this device.</p></div><button onClick={capture}>Highlight selection</button></div>
{quote&&<div className="study-quote" dir="rtl">{quote}</div>}
<div className="study-actions"><button className={status==="reflecting"?"active":""} onClick={()=>{const n=status==="reflecting"?"none":"reflecting";setStatus(n);persist("nur-study-status-"+key,n)}}>Reflecting on</button><button className={status==="memorizing"?"active":""} onClick={()=>{const n=status==="memorizing"?"none":"memorizing";setStatus(n);persist("nur-study-status-"+key,n)}}>Memorizing</button></div>
<label className="study-label">Personal note<textarea value={note} onChange={e=>{setNote(e.target.value);persist("nur-study-note-"+key,e.target.value)}} placeholder="Write a quiet note for yourself…" /></label>
<label className="study-label">Personal label<input value={tag} onChange={e=>{setTag(e.target.value);persist("nur-study-tag-"+key,e.target.value)}} placeholder="e.g. review, family, memorize" /></label>
<div className="study-label">Topics<div className="topic-chips">{topicChoices.map(t=><button key={t.id} className={topics.includes(t.id)?"active":""} onClick={()=>{const n=topics.includes(t.id)?topics.filter(x=>x!==t.id):[...topics,t.id];setTopics(n);persist("nur-study-topics-"+key,JSON.stringify(n))}}>{topicName(t,locale)}</button>)}</div></div>
<p className="study-footnote">These are personal study tools, not scholarly classifications. The Arabic text and source provenance remain unchanged.</p>
</div>}</section>}
