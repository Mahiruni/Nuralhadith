import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata: Metadata = {
  title: "Nur al-Hadith — نور الحديث",
  description: "A calm, source-aware digital library for reading hadith.",
  manifest: "/manifest.webmanifest",
  themeColor: "#174f42",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
