# Nur al-Hadith — نور الحديث

A calm, mobile-first Progressive Web App for hadith reading.

## Stack
- Next.js 16.3.6 / React 19
- App Router + TypeScript
- PWA service worker + Web Manifest
- Local persistence for theme and private notes
- Server-side Hadith API proxy

## Collections
The interface is prepared for the eight requested collections: Ṣaḥīḥ al-Bukhārī, Ṣaḥīḥ Muslim, Sunan Abī Dāwūd, Jāmiʿ at-Tirmidhī, Sunan an-Nasāʾī, Sunan Ibn Mājah, Muwaṭṭaʾ Mālik and Musnad Aḥmad.

The UI deliberately does not equate collection membership with an authenticity grade. The `grade` field is treated as source data and displayed only when supplied.

## Run
npm install
npm run dev

## Data architecture
The reading UI is separated from the hadith corpus. The included server route can proxy a verified hadith API, while a production deployment should normalize the complete corpus into PostgreSQL/Supabase and use indexed full-text search rather than shipping tens of thousands of records in the client bundle.

Suggested production tables: collections, books, chapters, hadiths, grades, narrators, hadith_narrators, users, bookmarks, notes, reading_progress, study_lists, study_list_items.

## PWA
The starter includes a web manifest and service worker. Before production release, add platform icons, an offline corpus strategy, cache versioning, and a verified corpus synchronization pipeline.

## Important content note
Hadith text, translation, grading, attribution, numbering and metadata should be verified against the licensed/source datasets used for production. Do not represent a report as authentic solely because it appears in a collection.
