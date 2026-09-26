import {NextResponse} from "next/server";
import {getBook,normalizeHadith} from "../../../../../lib/source";
import {collections} from "../../../../../lib/collections";
export async function GET(_:Request,{params}:{params:Promise<{book:string;id:string}>}){
 const {book,id}=await params; const data=await getBook(book); if(!data)return NextResponse.json({error:"Collection unavailable."},{status:404});
 const n=Number(id); const h=data.hadiths.find(x=>x.idInBook===n||x.id===n); if(!h)return NextResponse.json({error:"Hadith not found."},{status:404});
 const c=collections.find(x=>x.id===book);
 return NextResponse.json({hadith:normalizeHadith(h,book,c?.name)},{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}