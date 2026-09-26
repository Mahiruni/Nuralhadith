import {NextResponse} from "next/server";
const BASE = process.env.HADITH_API_BASE || "https://alfurqan.online";
export async function GET(_:Request,{params}:{params:Promise<{book:string;id:string}>}){
 const {book,id}=await params;
 const res=await fetch(BASE+"/api/v1/hadith/"+encodeURIComponent(book)+"/hadith/"+encodeURIComponent(id),{next:{revalidate:86400}});
 if(!res.ok)return NextResponse.json({error:"Hadith unavailable."},{status:res.status});
 const raw=await res.json(); const h=raw.hadith||raw;
 const english=typeof h.english==="string"?h.english:(h.english?.text||"");
 const narrator=typeof h.english==="object"?h.english?.narrator:h.narrator;
 return NextResponse.json({...raw,hadith:{...h,english,narrator,number:h.idInBook||h.id||id,collection:book,source:raw.book?.name_en}},{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}
