import {NextResponse} from "next/server";
import {BOOKS,getBook,normalizeHadith} from "../../../lib/source";
import {collections} from "../../../lib/collections";
export async function GET(){
 for(let i=0;i<BOOKS.length*2;i++){const book=BOOKS[Math.floor(Math.random()*BOOKS.length)];const data=await getBook(book);if(!data?.hadiths?.length)continue;const h=data.hadiths[Math.floor(Math.random()*data.hadiths.length)];const c=collections.find(x=>x.id===book);return NextResponse.json({hadith:normalizeHadith(h,book,c?.name)},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=3600"}});}
 return NextResponse.json({error:"Unable to retrieve a random hadith."},{status:503});
}