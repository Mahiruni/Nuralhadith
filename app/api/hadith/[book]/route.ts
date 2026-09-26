import {NextResponse} from "next/server";
import {getBook} from "../../../../lib/source";
import {collections} from "../../../../lib/collections";

export async function GET(_: Request, {params}: {params: Promise<{book: string}>}) {
  const {book} = await params;
  const data = await getBook(book);
  if (!data) return NextResponse.json({error: "Collection unavailable."}, {status: 404});
  const collection = collections.find(x => x.id === book);
  const chapters = data.chapters.map(ch => {
    const hadiths = data.hadiths.filter(h => h.chapterId === ch.id);
    return {
      ...ch,
      hadith_count: hadiths.length,
      hadith_range: hadiths.length ? [hadiths[0].idInBook, hadiths[hadiths.length - 1].idInBook] : [],
    };
  });
  return NextResponse.json(
    {total_hadiths: data.hadiths.length, chapters, metadata: data.metadata, collection},
    {headers: {"Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800"}}
  );
}
