import type { Hadith } from "./types";

export const SOURCE_TAG = "v1.2.0";
export const SOURCE_REPO = "https://github.com/AhmedBaset/hadith-json";
export const BOOKS = ["bukhari","muslim","abudawud","tirmidhi","nasai","ibnmajah","malik","ahmed"] as const;
export type BookKey = typeof BOOKS[number];

export function bookUrl(book:string){
  if(!BOOKS.includes(book as BookKey)) return null;
  return `https://raw.githubusercontent.com/AhmedBaset/hadith-json/${SOURCE_TAG}/db/by_book/the_9_books/${book}.json`;
}
export type SourceBook={
  id:number;
  metadata:{id:number;length:number;arabic:{title:string;author:string};english:{title:string;author:string}};
  chapters:{id:number;bookId:number;arabic:string;english:string}[];
  hadiths:{id:number;idInBook:number;chapterId:number;bookId:number;arabic:string;english?:{narrator?:string;text?:string}}[];
};
export async function getBook(book:string){
  const url=bookUrl(book); if(!url)return null;
  const res=await fetch(url,{next:{revalidate:86400}}); if(!res.ok)return null;
  return await res.json() as SourceBook;
}
export function normalizeHadith(h:SourceBook["hadiths"][number],book:string,sourceName?:string):Hadith{
  return {id:h.id,collection:book,number:h.idInBook||h.id,chapterId:h.chapterId,arabic:h.arabic,english:h.english?.text||"",narrator:h.english?.narrator||"",source:sourceName};
}
