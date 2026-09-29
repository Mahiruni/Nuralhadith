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
      text: "السلام عليكم ورحمة الله وبركاته\nI am Ustadh Nur. Welcome, dear student. Ask me about the Qur’an, Salah, purification, duas, Aqidah or everyday Islamic practice. We will learn with evidence, mercy and practical steps.",
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