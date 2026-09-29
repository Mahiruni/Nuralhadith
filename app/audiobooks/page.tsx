import Link from "next/link";
import AppHeader from "../../components/AppHeader";

const audiobooks = [
  {
    id: "bukhari",
    title: "Ṣaḥīḥ al-Bukhārī",
    arabic: "صحيح البخاري",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/Sahih_Al-Bukhari/",
    note: "Chapter-by-chapter audiobook files.",
  },
  {
    id: "muslim",
    title: "Ṣaḥīḥ Muslim",
    arabic: "صحيح مسلم",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/ar_Moslem_Reading/",
    note: "Arabic reading audio available from the source.",
  },
  {
    id: "abudawud",
    title: "Sunan Abī Dāwūd",
    arabic: "سنن أبي داود",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/ar_Abo_Dawood_audiobook/",
    note: "Arabic audiobook files available from the source.",
  },
  {
    id: "tirmidhi",
    title: "Jāmiʿ at-Tirmidhī",
    arabic: "جامع الترمذي",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/Jami_At-Tirmidhi/",
    note: "Chapter-by-chapter audiobook files.",
  },
  {
    id: "nasai",
    title: "Sunan an-Nasāʾī",
    arabic: "سنن النسائي",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/Sunan_An-Nasai/",
    note: "Chapter-by-chapter audiobook files.",
  },
  {
    id: "ibnmajah",
    title: "Sunan Ibn Mājah",
    arabic: "سنن ابن ماجه",
    language: "Arabic",
    source: "Muslim Dawah",
    url: "https://cdn.muslimdawah.org/hadith-audio/Sunan_Ibn-Majah/",
    note: "Chapter-by-chapter audiobook files.",
  },
];

export const metadata = {
  title: "Hadith Audiobooks — Nur al-Hadith",
  description: "Available external audiobook sources for major Hadith collections.",
};

export default function AudiobooksPage() {
  return (
    <main className="shell audio-library">
      <AppHeader />
      <header className="pagebar audio-page-title">
        <div>
          <span className="eyebrow">AUDIO</span>
          <h1>Hadith Audiobooks</h1>
          <p>Listen to available recordings while keeping the Hadith text and references in Nur al-Hadith.</p>
        </div>
        <Link className="quiet-link" href="/collections">Browse collections →</Link>
      </header>

      <section className="audio-grid" aria-label="Available Hadith audiobooks">
        {audiobooks.map(book => (
          <article className="audio-card" key={book.id}>
            <div className="audio-card-top">
              <span className="audio-icon" aria-hidden="true">▶</span>
              <span className="audio-language">{book.language}</span>
            </div>
            <h2>{book.title}</h2>
            <div className="audio-arabic" dir="rtl">{book.arabic}</div>
            <p>{book.note}</p>
            <div className="audio-card-foot">
              <span>Source: {book.source}</span>
              <a href={book.url} target="_blank" rel="noopener noreferrer">Listen ↗</a>
            </div>
          </article>
        ))}
      </section>

      <section className="audio-note">
        <strong>Source-aware audio</strong>
        <p>
          These recordings are opened from their original public source rather than copied into the Nur al-Hadith repository.
          Per-Hadith in-app audio will only be marked as available when redistribution or streaming permission is verified.
        </p>
      </section>
    </main>
  );
}
