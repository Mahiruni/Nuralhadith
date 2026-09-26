import {NextResponse} from "next/server";
const BASE = process.env.HADITH_API_BASE || "https://alfurqan.online";
export async function GET(_: Request, {params}:{params:Promise<{book:string}>}) {
  const {book}=await params;
  const res=await fetch(BASE+"/api/v1/hadith/"+encodeURIComponent(book),{next:{revalidate:86400}});
  if(!res.ok) return NextResponse.json({error:"Collection unavailable."},{status:res.status});
  return NextResponse.json(await res.json(),{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}});
}
