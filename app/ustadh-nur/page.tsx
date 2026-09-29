"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "../../components/AppHeader";

type Message = { role: "user" | "assistant"; text: string };

const starters = [
  { title: "Learn Salah", prompt: "Teach me how to pray Salah step by step." },
  { title: "Qur'an reflection", prompt: "Help me understand a Qur'an verse and apply it to my life." },
  { title: "Learn a Dua", prompt: "Teach me a short authentic dua with Arabic, transliteration and meaning." },
  { title: "Taharah", prompt: "Teach me the basics of purification before Salah." },
];

function answerFor(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("salah") || p.includes("pray")) {
    return "Begin with wudu, face the Qiblah, make the intention for the prayer, then pray with calmness and humility. I can walk with you through every position, recitation and common mistake.";
  }
  if (p.includes("dua")) {
    return "A beautiful authentic dua is: رَبِّ زِدْنِي عِلْمًا — Rabbi zidnī ʿilmā — “My Lord, increase me in knowledge.” (Qur'an 20:114). Ask Allah sincerely and put the knowledge into practice.";
  }
  if (p.includes("purif") || p.includes("taharah") || p.includes("wudu")) {
    return "Purification begins with removing physical impurity and performing wudu when it is required. I can teach wudu step by step, including what invalidates it and the relevant evidence.";
  }
  return "بِسْمِ اللهِ — In the name of Allah. I’m here to help you learn Qur’an, Salah and authentic Islamic knowledge with evidence and good manners. Ask your question, and we will take it step by step.";
}

export default function UstadhNurPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "السلام عليكم ورحمة الله وبركاته
I am Ustadh Nur. Welcome, dear student. Ask me about the Qur’an, Salah, purification, duas, Aqidah or everyday Islamic practice. We will learn with evidence, mercy and practical steps.",
    },
  ]);

  function send(text = input) {
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: value },
      { role: "assistant", text: answerFor(value) },
    ]);
    setInput("");
  }

  return (
    <main className="ustadh-page">
      <AppHeader />
      <section className="ustadh-hero">
        <div className="ustadh-kicker">نور الحديث · USTADH NUR</div>
        <div className="ustadh-hero-grid">
          <div>
            <h1>Learn Islam.<br /><em>Live it beautifully.</em></h1>
            <p>
              A calm Islamic learning companion for Qur’an, Salah and authentic
              knowledge — designed to teach clearly, gently and with evidence.
            </p>
            <div className="ustadh-trust">
              <span>Qur’an</span><span>Authentic Sunnah</span><span>Adab</span>
            </div>
          </div>
          <div className="ustadh-seal" aria-hidden="true">
            <div>﷽</div>
            <small>USTADH NUR</small>
          </div>
        </div>
      </section>

      <section className="ustadh-layout">
        <aside className="ustadh-sidebar">
          <div className="ustadh-card">
            <span className="ustadh-label">LEARNING PATH</span>
            <h2>Start where you are.</h2>
            <p>Choose a topic or ask naturally. Lessons can move from beginner to advanced.</p>
            <div className="ustadh-path">
              <span><b>01</b> Beginner</span>
              <span><b>02</b> Intermediate</span>
              <span><b>03</b> Advanced</span>
            </div>
          </div>
          <Link className="ustadh-library-link" href="/collections">
            <span>Read the Hadith Library</span><span>↗</span>
          </Link>
        </aside>

        <section className="ustadh-chat" aria-label="Ustadh Nur Islamic teacher">
          <div className="ustadh-chat-head">
            <div className="ustadh-avatar">ن</div>
            <div><strong>Ustadh Nur</strong><span>Islamic learning companion</span></div>
            <span className="ustadh-online">● Ready</span>
          </div>

          <div className="ustadh-starters">
            {starters.map((item) => (
              <button key={item.title} type="button" onClick={() => send(item.prompt)}>
                <small>{item.title}</small><span>{item.prompt}</span>
              </button>
            ))}
          </div>

          <div className="ustadh-messages">
            {messages.map((message, index) => (
              <div className={"ustadh-message " + message.role} key={index}>
                {message.role === "assistant" && <div className="ustadh-mini-avatar">ن</div>}
                <div className="ustadh-bubble">
                  {message.text.split("\n").map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            ))}
          </div>

          <form className="ustadh-composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Ustadh Nur a question about Islam…"
              rows={1}
              aria-label="Ask Ustadh Nur"
            />
            <button type="submit" aria-label="Send question">↑</button>
          </form>
          <p className="ustadh-note">
            For learning and guidance. Where scholars differ, Ustadh Nur should present the evidence and the recognized views respectfully.
          </p>
        </section>
      </section>
    </main>
  );
}

<style jsx>{`
.ustadh-page{min-height:100vh;background:radial-gradient(circle at 75% 0%,rgba(201,162,39,.12),transparent 28%),var(--cream);color:var(--ink)}
.ustadh-hero{max-width:1220px;margin:auto;padding:76px 6vw 54px;border-bottom:1px solid var(--line)}
.ustadh-kicker,.ustadh-label{font-size:10px;letter-spacing:.17em;font-weight:700;color:var(--gold);text-transform:uppercase}
.ustadh-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:50px;align-items:center;margin-top:12px}
.ustadh-hero h1{font-size:clamp(48px,7vw,82px);line-height:.98;letter-spacing:-.055em;color:var(--emerald-deep);font-weight:600;margin:12px 0 22px}.ustadh-hero h1 em{font-family:Amiri,serif;font-style:normal;color:var(--gold);font-weight:400}.ustadh-hero p{max-width:650px;color:var(--muted);font-size:15px;line-height:1.9;margin:0}
.ustadh-trust{display:flex;gap:8px;flex-wrap:wrap;margin-top:25px}.ustadh-trust span{padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:var(--paper);font-size:10px;color:var(--muted)}
.ustadh-seal{width:210px;height:210px;border:1px solid var(--gold-soft);border-radius:50%;display:grid;place-items:center;align-content:center;background:radial-gradient(circle,var(--paper),transparent 68%);box-shadow:inset 0 0 0 12px color-mix(in srgb,var(--gold-soft) 10%,transparent)}.ustadh-seal div{font-family:Amiri;font-size:58px;color:var(--gold);line-height:1}.ustadh-seal small{margin-top:9px;letter-spacing:.2em;color:var(--muted);font-size:8px}
.ustadh-layout{max-width:1220px;margin:auto;padding:48px 6vw 100px;display:grid;grid-template-columns:280px minmax(0,1fr);gap:30px;align-items:start}.ustadh-sidebar{display:grid;gap:12px;position:sticky;top:88px}.ustadh-card{padding:23px;border:1px solid var(--line);border-radius:20px;background:var(--paper);box-shadow:var(--shadow)}.ustadh-card h2{font-size:20px;margin:8px 0}.ustadh-card p{font-size:11px;line-height:1.8;color:var(--muted);margin:0 0 18px}.ustadh-path{display:grid;gap:8px}.ustadh-path span{font-size:11px;color:var(--muted);padding-top:8px;border-top:1px solid var(--line)}.ustadh-path b{color:var(--gold);margin-right:8px}
.ustadh-library-link{display:flex;justify-content:space-between;padding:16px 18px;border:1px solid var(--gold-soft);border-radius:16px;background:var(--emerald-deep);color:#fff;font-size:11px}.ustadh-library-link:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(15,61,46,.16)}
.ustadh-chat{border:1px solid var(--line);border-radius:24px;background:var(--paper);box-shadow:var(--shadow);overflow:hidden}.ustadh-chat-head{min-height:72px;padding:13px 18px;display:flex;align-items:center;gap:11px;border-bottom:1px solid var(--line)}.ustadh-avatar,.ustadh-mini-avatar{display:grid;place-items:center;border-radius:50%;font-family:Amiri;color:#fff;background:var(--emerald-deep)}.ustadh-avatar{width:43px;height:43px;font-size:24px}.ustadh-chat-head div:nth-child(2){display:grid;gap:2px;min-width:0}.ustadh-chat-head strong{font-size:13px}.ustadh-chat-head span{font-size:10px;color:var(--muted)}.ustadh-online{margin-left:auto;color:var(--gold)!important;font-size:9px!important;white-space:nowrap}
.ustadh-starters{padding:15px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;background:var(--paper-2);border-bottom:1px solid var(--line)}.ustadh-starters button{text-align:left;padding:12px;border:1px solid var(--line);border-radius:13px;background:var(--paper);color:var(--ink)}.ustadh-starters button:hover{border-color:var(--gold-soft);transform:translateY(-1px)}.ustadh-starters small{display:block;color:var(--gold);font-size:9px;font-weight:700;margin-bottom:5px}.ustadh-starters span{font-size:10px;line-height:1.45;color:var(--muted)}
.ustadh-messages{padding:24px;min-height:330px;max-height:520px;overflow:auto;display:grid;align-content:start;gap:16px}.ustadh-message{display:flex;gap:8px;max-width:85%}.ustadh-message.user{margin-left:auto;justify-content:flex-end}.ustadh-mini-avatar{width:27px;height:27px;min-width:27px;font-size:15px}.ustadh-bubble{padding:12px 14px;border-radius:16px;background:var(--paper-2);font-size:12px;line-height:1.8}.ustadh-message.assistant .ustadh-bubble{border-top-left-radius:5px}.ustadh-message.user .ustadh-bubble{background:var(--emerald-deep);color:#fff;border-top-right-radius:5px}.ustadh-bubble p{margin:0}.ustadh-bubble p+p{margin-top:8px}
.ustadh-composer{margin:0 15px 9px;padding:6px;border:1px solid var(--line);border-radius:17px;display:flex;align-items:end;gap:8px;background:var(--paper)}.ustadh-composer:focus-within{border-color:var(--gold);box-shadow:0 0 0 4px rgba(201,162,39,.08)}.ustadh-composer textarea{flex:1;resize:none;border:0;outline:0;background:transparent;color:inherit;padding:10px;font-size:12px;line-height:1.5;min-height:42px;max-height:110px}.ustadh-composer button{width:40px;height:40px;border-radius:12px;background:var(--emerald-deep);color:#fff;font-size:20px}.ustadh-composer button:hover{transform:translateY(-1px)}.ustadh-note{padding:0 18px 15px;margin:0;text-align:center;font-size:9px;line-height:1.6;color:var(--muted)}.ustadh-nav-link{color:var(--nav-foreground)!important}
@media(max-width:850px){.ustadh-hero{padding:52px 20px 35px}.ustadh-hero-grid{grid-template-columns:1fr}.ustadh-seal{display:none}.ustadh-layout{grid-template-columns:1fr;padding:30px 18px 90px}.ustadh-sidebar{position:static}.ustadh-card{display:none}.ustadh-starters{grid-template-columns:1fr 1fr}.ustadh-messages{min-height:360px}}
@media(max-width:560px){.ustadh-hero h1{font-size:48px}.ustadh-starters{grid-template-columns:1fr}.ustadh-message{max-width:94%}.ustadh-chat{border-radius:18px}.ustadh-messages{padding:18px 14px}}
`}</style>
