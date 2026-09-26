import {NextResponse} from "next/server";
import {getBook,normalizeHadith} from "../../../../../lib/source";
import {collections} from "../../../../../lib/collections";
export async function GET(_:Request,{params}:{params:Promise<{book:string;id:string}>}){
 const {book,id}=await params; const data=await getBook(book); if(!data)return NextResponse.json({error:"Collection unavailable."},{status:404});
 const n=Number(id); const h=data.hadiths.find(x=>x.idInBook===n||x.id===n); if(!h)return NextResponse.json({error:"Hadith not found."},{status:404});
 const c=collections.find(x=>x.id===book); const chapter=data.chapters.find(x=>x.id===h.chapterId);
 const hadith=normalizeHadith(h,book,c?.name); hadith.chapter=chapter?.english||""; hadith.book=chapter?.arabic||"";
 return NextResponse.json({hadith,provenance:{source:"AhmedBaset/hadith-json",version:"v1.2.0",collection:c?.name,collectionArabic:c?.arabic,chapterArabic:chapter?.arabic||"",chapterEnglish:chapter?.english||"",hadithNumber:h.idInBook||h.id}},{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}