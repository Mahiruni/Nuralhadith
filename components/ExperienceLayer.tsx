"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExperienceLayer() {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0);
    };
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (!message) return;
      setToast(message);
      window.setTimeout(() => setToast(""), 1800);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("nur:toast", onToast);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("nur:toast", onToast);
    };
  }, []);
  return <>
    <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    <a className="skip-link" href="#main-content">Skip to content</a>
    {toast && <div className="experience-toast" role="status" aria-live="polite">{toast}</div>}
    <nav className="mobile-nav" aria-label="Primary">
      <Link href="/" aria-label="Home"><span>⌂</span><small>Home</small></Link>
      <Link href="/collections" aria-label="Collections"><span>◫</span><small>Library</small></Link>
      <Link href="/search" aria-label="Search"><span>⌕</span><small>Search</small></Link>
      <Link href="/library" aria-label="My library"><span>♡</span><small>Saved</small></Link>
    </nav>
  </>;
}
