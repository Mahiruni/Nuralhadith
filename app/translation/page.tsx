"use client";

import { FormEvent, useMemo, useState } from "react";
import AppHeader from "../../components/AppHeader";

const LANGUAGES = [
  ["auto", "Auto detect"], ["ar", "العربية"], ["en", "English"], ["am", "አማርኛ"],
  ["om", "Afaan Oromoo"], ["ti", "ትግርኛ"], ["ur", "اردو"], ["fr", "Français"],
  ["id", "Bahasa Indonesia"], ["ms", "Bahasa Melayu"], ["tr", "Türkçe"],
] as const;

type Mode = "literal" | "meaning" | "scholarly";

export default function TranslationPage() {
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("en");
  const [mode, setMode] = useState<Mode>("meaning");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const targetName = useMemo(() => LANGUAGES.find(([code]) => code === target)?.[1] ?? target, [target]);

  async function translateText(e?: FormEvent) {
    e?.preventDefault();
    if (!text.trim() || loading) return;
    setLoading(true); setError(""); setResult(""); setNotes([]);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), source, target, mode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Translation unavailable.");
      setResult(data.translation || "");
      setNotes(Array.isArray(data.notes) ? data.notes : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation unavailable.");
    } finally { setLoading(false); }
  }

  return (
    <main className="translation-page">
      <AppHeader />
      <section className="translation-hero">
        <div className="translation-eyebrow">نور الحديث · TRANSLATION ENGINE</div>
        <h1>Translate with <em>precision.</em></h1>
        <p>Faithful translation for Hadith, Qur’an and authentic Islamic texts — preserving terminology, context and scholarly tone.</p>
      </section>

      <section className="translation-workspace">
        <div className="translation-toolbar">
          <label>Source<select value={source} onChange={(e) => setSource(e.target.value)}>{LANGUAGES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
          <button className="swap" type="button" onClick={() => { if (source !== "auto") { setSource(target); setTarget(source); } }}>⇄</button>
          <label>Target<select value={target} onChange={(e) => setTarget(e.target.value)}>{LANGUAGES.filter(([code]) => code !== "auto").map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
        </div>

        <div className="translation-modes">
          <span>Translation style</span>
          {([["literal","Literal"],["meaning","Meaning-based"],["scholarly","Scholarly explanatory"]] as const).map(([value, label]) =>
            <button key={value} type="button" className={mode === value ? "active" : ""} onClick={() => setMode(value)}>{label}</button>
          )}
        </div>

        <div className="translation-panels">
          <div className="translation-panel">
            <div className="panel-head"><span>Original text</span><span>{source === "auto" ? "Auto detect" : LANGUAGES.find(([c]) => c === source)?.[1]}</span></div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a Hadith, Qur’anic verse, Arabic text, or Islamic passage…" dir={source === "ar" ? "rtl" : "auto"} />
            <div className="panel-foot"><span>{text.length} characters</span><button type="button" onClick={() => setText("")}>Clear</button></div>
          </div>

          <div className="translation-panel output">
            <div className="panel-head"><span>Translation</span><span>{targetName}</span></div>
            <div className="translation-output" dir={target === "ar" || target === "ur" ? "rtl" : "auto"}>
              {loading ? <div className="translation-loading"><span /> Translating with Nuralhadith standards…</div> : result ? result.split("\n").map((line, i) => <p key={i}>{line || "\u00a0"}</p>) : <span className="output-placeholder">Your faithful translation will appear here.</span>}
            </div>
            <div className="panel-foot"><span>{result ? "Translation complete" : "Ready"}</span>{result && <button type="button" onClick={() => navigator.clipboard?.writeText(result)}>Copy</button>}</div>
          </div>
        </div>

        <button className="translate-button" type="button" onClick={() => translateText()} disabled={loading || !text.trim()}>
          {loading ? "Translating…" : "Translate text"} <span>→</span>
        </button>

        {error && <div className="translation-error">{error}</div>}
        {!!notes.length && <aside className="translation-notes"><strong>Clarifying notes</strong>{notes.map((note, i) => <p key={i}>{note}</p>)}</aside>}

        <div className="translation-standards">
          <div><strong>01</strong><span>Meaning first</span><small>Faithful to the source before stylistic fluency.</small></div>
          <div><strong>02</strong><span>Islamic terminology</span><small>Preserves terms such as Sunnah, Taqwa and Salah where appropriate.</small></div>
          <div><strong>03</strong><span>Scholarly restraint</span><small>No invented narrations, opinions or cultural additions.</small></div>
        </div>
      </section>
      <style jsx>{`
        .translation-page{min-height:100vh;background:var(--bg,#f9f6f0);color:var(--ink,#1c1c1c)}
        .translation-hero{max-width:1120px;margin:0 auto;padding:72px 24px 34px}
        .translation-eyebrow{font-size:11px;letter-spacing:.16em;color:#0f3d2e;font-weight:800;margin-bottom:18px}
        .translation-hero h1{font-size:clamp(42px,7vw,78px);line-height:.95;letter-spacing:-.045em;margin:0 0 22px;font-weight:700}
        .translation-hero h1 em{font-family:Georgia,serif;color:#0f3d2e;font-weight:500}
        .translation-hero p{max-width:680px;font-size:17px;line-height:1.7;color:#5c5c5c;margin:0}
        .translation-workspace{max-width:1120px;margin:0 auto;padding:20px 24px 80px}
        .translation-toolbar{display:flex;align-items:end;gap:14px;margin-bottom:14px}
        .translation-toolbar label{flex:1;font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:800;color:#777}
        .translation-toolbar select{display:block;width:100%;margin-top:7px;padding:13px 14px;border:1px solid #d8d5cd;border-radius:12px;background:white;font-size:14px;color:#1c1c1c}
        .swap{height:45px;width:45px;border:1px solid #d8d5cd;border-radius:12px;background:white;font-size:20px;cursor:pointer}
        .translation-modes{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:18px 0}
        .translation-modes span{font-size:12px;color:#777;margin-right:4px}
        .translation-modes button{border:1px solid #d8d5cd;background:transparent;border-radius:999px;padding:8px 12px;font-size:12px;cursor:pointer}
        .translation-modes button.active{background:#0f3d2e;color:white;border-color:#0f3d2e}
        .translation-panels{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .translation-panel{background:white;border:1px solid #dfddd6;border-radius:16px;overflow:hidden;min-height:330px;display:flex;flex-direction:column}
        .panel-head,.panel-foot{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;font-size:11px;color:#777;border-bottom:1px solid #eee}
        .panel-head span:first-child{font-weight:800;color:#1c1c1c;text-transform:uppercase;letter-spacing:.08em}
        .panel-foot{border-top:1px solid #eee;border-bottom:0;margin-top:auto}
        .panel-foot button{border:0;background:none;cursor:pointer;color:#0f3d2e;font-weight:700}
        textarea{flex:1;border:0;outline:0;resize:none;padding:20px;font:inherit;font-size:18px;line-height:1.8;min-height:240px}
        .translation-output{flex:1;padding:20px;font-size:18px;line-height:1.8;overflow:auto}
        .translation-output p{margin:0 0 10px}.output-placeholder{color:#aaa}
        .translation-loading{color:#0f3d2e;font-size:14px}.translation-loading span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#c9a227;margin-right:8px}
        .translate-button{margin:18px 0 0 auto;display:flex;gap:18px;align-items:center;background:#0f3d2e;color:white;border:0;border-radius:12px;padding:14px 20px;font-weight:800;cursor:pointer}.translate-button:disabled{opacity:.45;cursor:not-allowed}
        .translation-error{margin-top:14px;padding:14px;border-radius:12px;background:#fff0ee;color:#9b3328;font-size:14px}
        .translation-notes{margin-top:18px;padding:18px;border-left:3px solid #c9a227;background:#fffdf7}.translation-notes p{margin:7px 0 0;color:#5c5c5c;font-size:14px}
        .translation-standards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:34px}.translation-standards div{padding:18px;background:#e8f2ed;border-radius:14px}.translation-standards strong{display:block;color:#c9a227;font-size:12px}.translation-standards span{display:block;font-weight:800;margin:8px 0 5px}.translation-standards small{color:#5c5c5c;line-height:1.5}
        @media(max-width:760px){.translation-hero{padding-top:42px}.translation-toolbar{gap:8px}.swap{width:40px}.translation-panels{grid-template-columns:1fr}.translation-panel{min-height:280px}.translation-standards{grid-template-columns:1fr}.translation-workspace{padding-bottom:48px}}
      `}</style>
    </main>
  );
}
