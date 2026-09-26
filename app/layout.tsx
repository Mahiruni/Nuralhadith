import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../components/LanguageProvider";
import ExperienceLayer from "../components/ExperienceLayer";
import OfflineManager from "../components/OfflineManager";
import {AudioProvider} from "../components/AudioProvider";
import AudioMiniPlayer from "../components/AudioMiniPlayer";

export const metadata: Metadata = {
  title: "Nur al-Hadith — نور الحديث",
  description: "A calm, source-aware digital library for reading hadith.",
  manifest: "/manifest.webmanifest",
  themeColor: "#174f42",
  icons: { icon: "/icon.svg" },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <LanguageProvider>
          <AudioProvider><ExperienceLayer /><OfflineManager /><AudioMiniPlayer />
          <div id="main-content">{children}</div></AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
