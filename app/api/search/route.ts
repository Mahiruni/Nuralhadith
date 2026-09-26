import {NextResponse} from "next/server";
const SEARCH_BASE=process.env.HADITH_SEARCH_BASE || "https://www.sabeeljannah.com/api/hadith/v1/search";
export async function GET(req:Request){
  const {searchParams}=new URL(req.url); const q=(searchParams.get("q")||"").trim(); const collection=searchParams.get("collection")||"";
  if(q.length<2) return NextResponse.json({results:[],message:"Enter at least 2 characters."});
  const url=new URL(SEARCH_BASE); url.searchParams.set("q",q); url.searchParams.set("limit","30"); if(collection) url.searchParams.set("collection",collection);
  const res=await fetch(url.toString(),{next:{revalidate:300}}).catch(()=>null);
  if(!res?.ok) return NextResponse.json({results:[],message:"Search service is temporarily unavailable."},{status:502});
  return NextResponse.json(await res.json(),{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=1800"}});
}
