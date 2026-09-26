'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collections } from "../../../lib/collections";

type Chapter = {
  id: number;
  arabic: string;
  english: string;
  hadith_count: number;
  hadith_range: number[];
};

type Info = {
  total_hadiths: number;
  chapters: Chapter[];
};

export default function CollectionPage() {
  const { book } = useParams<{ book: string }>();
  const c = collections.find((x) => x.id === book);
  const [info, setInfo] = useState<Info | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/hadith/" + book)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Info | null) => {
        if (!cancelled) setInfo(data);
      })
      .catch(() => {
        if (!cancelled) setInfo(null);
      });

    return () => {
      cancelled = true;
    };
  }, [book]);

  if (!c) {
    return (
      <main className="shell">
        <div className="page-content">
          <h1>Collection not found</h1>
          <Link href="/collections">Return to library</Link>
        </div>
      </main>
    );
  }

  const chapters = (info?.chapters || []).filter((x) =>
    (x.english + " " + x.arabic).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <main className="shell">
      <header className="pagebar">
        <Link href="/collections" className="brand-link">← <span>Collections</span></Link>
        <Link href="/search" className="quiet-link">Search</Link>
      </header>

      <div className="page-content">
        <div className="eyebrow">{c.short}</div>
        <h1 className="page-title">{c.name}</h1>
        <div className="collection-stat">
          {info?.total_hadiths?.toLocaleString() || "—"} hadiths · {info?.chapters.length || "—"} chapters
        </div>

        <input
          className="wide-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search books and chapters…"
          aria-label="Search books and chapters"
        />

        <div className="chapter-list">
          {chapters.map((ch) => {
            const firstHadith = ch.hadith_range[0];
            if (!firstHadith) return null;

            return (
              <Link
                className="chapter-row"
                href={"/read/" + book + "/" + firstHadith}
                key={ch.id}
              >
                <span>{String(ch.id).padStart(2, "0")}</span>
                <div>
                  <b>{ch.english}</b>
                  <small dir="rtl">{ch.arabic}</small>
                </div>
                <em>{ch.hadith_count} hadiths →</em>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
