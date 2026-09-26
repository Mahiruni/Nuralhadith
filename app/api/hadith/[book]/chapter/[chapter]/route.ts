import {NextResponse} from "next/server";
import {getBook,normalizeHadith} from "../../../../../../lib/source";
import {collections} from "../../../../../../lib/collections";
export async function GET(_:Request,{params}:{params:Promise<{book:string;chapter:string}>}){
 const {book,chapter}=await params; const data=await getBook(book); if(!data)return NextResponse.json({error:"Collection unavailable."},{status:404});
 const id=Number(chapter); const ch=data.chapters.find(x=>x.id===id); if(!ch)return NextResponse.json({error:"Chapter not found."},{status:404});
 const c=collections.find(x=>x.id===book); const hadiths=data.hadiths.filter(x=>x.chapterId===id).map(x=>normalizeHadith(x,book,c?.name));
 return NextResponse.json({chapter:ch,hadiths},{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}