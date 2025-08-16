import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { categories } from "@/src/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allCategories = await db.select().from(categories).orderBy(desc(categories.id));
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Chyba pri načítavaní kategórií:", error);
    return NextResponse.json({ error: "Chyba pri načítavaní kategórií" }, { status: 500 });
  }
}
