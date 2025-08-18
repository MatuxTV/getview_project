import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { hashtags } from "@/src/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allHashtags = await db.select().from(hashtags).orderBy(desc(hashtags.id));
    return NextResponse.json(allHashtags);
  } catch (error) {
    console.error("Chyba pri načítavaní hashtagov:", error);
    return NextResponse.json({ error: "Chyba pri načítavaní hashtagov" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const newHashtag = await db.insert(hashtags).values({ name }).returning();
    return NextResponse.json(newHashtag);
  } catch (error) {
    console.error("Chyba pri pridávaní hashtagov:", error);
    return NextResponse.json({ error: "Chyba pri pridávaní hashtagov" }, { status: 500 });
  }
}
