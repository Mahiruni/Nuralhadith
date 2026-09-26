import {NextResponse} from "next/server";
import {getBook} from "../../../../lib/source";
export async function GET(_:Request,{params}:{params:Promise<{book:string}>}){
 const {book}=await params; const data=await getBook(book);
 if(!data)return NextResponse.json({error:"Collection unavailable."},{status:404});
 return NextResponse.json({total_hadiths:data.metadata.length,chapters:data.chapters.map(ch=>{const hs=data.hadiths.filter(h=>h.chapterId===ch.id);const nums=hs.map(h=>h.idInBook);return{id:ch.id,arabic:ch.arabic,english:ch.english,hadith_count:hs.length,hadith_range:nums.length?[Math.min(...nums),Math.max(...nums)]:[]};}),source:{repo:"AhmedBaset/hadith-json",tag:"v1.2.0"}},{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}