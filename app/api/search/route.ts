import {NextResponse} from "next/server";
import {BOOKS,getBook,normalizeHadith} from "../../../lib/source";
import {collections} from "../../../lib/collections";

export async function GET(req:Request){
 const {searchParams}=new URL(req.url); const q=(searchParams.get("q")||"").trim(); const collection=searchParams.get("collection")||"";
 if(q.length<2)return NextResponse.json({results:[],message:"Enter at least 2 characters."});
 const books=collection?BOOKS.filter(x=>x===collection):BOOKS;
 const needle=q.toLocaleLowerCase();
 const data=await Promise.all(books.map(async book=>({book,data:await getBook(book)})));
 const results=data.flatMap(({book,data})=>{
   if(!data)return [];
   const c=collections.find(x=>x.id===book);
   return data.hadiths.filter(h=>{
     const text=[h.arabic,h.english?.text||"",h.english?.narrator||""].join(" ").toLocaleLowerCase();
     return text.includes(needle);
   }).slice(0,30).map(h=>({...normalizeHadith(h,book,c?.name),collection_name:c?.name,hadithnumber:h.idInBook}));
 }).slice(0,60);
 return NextResponse.json({results,total:results.length,source:{repo:"AhmedBaset/hadith-json",tag:"v1.2.0"}},{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=1800"}});
}
