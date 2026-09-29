"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";

function gentleHaptic(kind: "light" | "success" = "light") {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try { navigator.vibrate(kind === "success" ? [8, 18, 8] : 8); } catch {}
}

export default function ExperienceLayer() {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0);
      });
    };
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      if (!message) return;
      setToast(message);
      window.setTimeout(() => setToast(""), 1800);
    };
    const onAction = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest("button,a") as HTMLElement | null;
      if (!el) return;
      const label = (el.getAttribute("aria-label") || el.textContent || "").toLowerCase();
      const important = /save|bookmark|play|pause|download|offline|theme|dark|light|note|language|copy|share|retry/.test(label);
      if (important) gentleHaptic(label.includes("download") || label.includes("saved") ? "success" : "light");
    };
    const onLanguage = (event: Event) => { if ((event.target as HTMLElement | null)?.tagName === "SELECT") gentleHaptic("light"); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("nur:toast", onToast);
    document.addEventListener("click", onAction, { passive: true });
    document.addEventListener("change", onLanguage, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("nur:toast", onToast);
      document.removeEventListener("click", onAction);
      document.removeEventListener("change", onLanguage);
    };
  }, []);

  return <>
    <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    <a className="skip-link" href="#main-content">Skip to content</a>
    {toast && <div className="experience-toast" role="status" aria-live="polite">{toast}</div>}
  </>;
}
