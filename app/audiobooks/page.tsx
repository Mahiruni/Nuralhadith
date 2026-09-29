import AppHeader from "../../components/AppHeader";

const audiobooks = [
  ["bukhari", "Ṣaḥīḥ al-Bukhārī", "صحيح البخاري", "https://cdn.muslimdawah.org/hadith-audio/Sahih_Al-Bukhari/", "Sahih_Al-Bukhari_01.mp3", "15+ streamed volume files"],
  ["muslim", "Ṣaḥīḥ Muslim", "صحيح مسلم", "https://cdn.muslimdawah.org/hadith-audio/ar_Moslem_Reading/", "", "Streaming source"],
  ["abudawud", "Sunan Abī Dāwūd", "سنن أبي داود", "https://cdn.muslimdawah.org/hadith-audio/ar_Abo_Dawood_audiobook/", "", "Streaming source"],
  ["tirmidhi", "Jāmiʿ at-Tirmidhī", "جامع الترمذي", "https://cdn.muslimdawah.org/hadith-audio/Jami_At-Tirmidhi/", "", "Streaming source"],
  ["nasai", "Sunan an-Nasāʾī", "سنن النسائي", "https://cdn.muslimdawah.org/hadith-audio/Sunan_An-Nasai/", "", "Streaming source"],
  ["ibnmajah", "Sunan Ibn Mājah", "سنن ابن ماجه", "https://cdn.muslimdawah.org/hadith-audio/Sunan_Ibn-Majah/", "", "Streaming source"],
];

export const metadata = { title: "Hadith Audiobooks — Nur al-Hadith", description: "Stream available Hadith audiobook recordings without downloading them into Nur al-Hadith." };

export default function AudiobooksPage() {
  return <main className="shell audio-library"><AppHeader /><header className="pagebar audio-page-title"><div><span className="eyebrow">AUDIO</span><h1>Hadith Audiobooks</h1><p>Stream available recordings directly from their original public audio sources.</p></div></header><section className="audio-grid" aria-label="Available Hadith audiobooks">{audiobooks.map(([id,title,arabic,url,file,note]) => <article className="audio-card" key={id}><div className="audio-card-top"><span className="audio-icon" aria-hidden="true">▶</span><span className="audio-language">STREAM</span></div><h2>{title}</h2><div className="audio-arabic" dir="rtl">{arabic}</div><p>{note}. Audio stays hosted by the original source; Nur al-Hadith does not download or store it.</p><div className="audio-card-foot"><span>External streaming</span><a href={file ? `${url}${file}` : url} target="_blank" rel="noopener noreferrer">Listen ↗</a></div></article>)}</section><section className="audio-note"><strong>Streaming only</strong><p>Nur al-Hadith does not copy these recordings into the repository or Vercel deployment. The player/source opens the original hosted audio, keeping the app lightweight. Availability depends on the source.</p></section></main>;
}
