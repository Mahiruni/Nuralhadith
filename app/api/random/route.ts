import {NextResponse} from "next/server";
const BASE = process.env.HADITH_API_BASE || "https://alfurqan.online";
const books=["bukhari","muslim","abudawud","tirmidhi","nasai","ibnmajah","malik","ahmed"];
export async function GET(){
 for(let i=0;i<5;i++){const book=books[Math.floor(Math.random()*books.length)];
  const info=await fetch(BASE+"/api/v1/hadith/"+book,{next:{revalidate:86400}}).then(r=>r.ok?r.json():null).catch(()=>null); const max=Number(info?.total_hadiths||0); if(!max)continue;
  const id=Math.floor(Math.random()*max)+1; const res=await fetch(BASE+"/api/v1/hadith/"+book+"/hadith/"+id,{next:{revalidate:86400}}).catch(()=>null); if(!res?.ok)continue;
  const raw=await res.json();const h=raw.hadith||raw;const english=typeof h.english==="string"?h.english:(h.english?.text||"");const narrator=typeof h.english==="object"?h.english?.narrator:h.narrator;
  return NextResponse.json({hadith:{...h,english,narrator,number:h.idInBook||h.id||id,collection:book,source:raw.book?.name_en}},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=3600"}});
 }
 return NextResponse.json({error:"Unable to retrieve a random hadith."},{status:503});
}