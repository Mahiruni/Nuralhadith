import {NextResponse} from "next/server";
import {getBook} from "../../../../lib/source";
export async function GET(_:Request,{params}:{params:Promise<{book:string}>}){const{book}=await params;const data=await getBook(book);if(!data)return NextResponse.json({error:"Collection unavailable."},{status:404});return NextResponse.json(data,{headers:{"Cache-Control":"public, s-maxage=86400, stale-while-revalidate=604800"}})}
