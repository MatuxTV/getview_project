import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { places } from "@/src/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const allPlaces = await db.select().from(places).orderBy(desc(places.createdAt));
  return NextResponse.json(allPlaces);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, latitude, longitude, category } = body ?? {};

  if (!title || typeof latitude !== "number" || typeof longitude !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Vytvor objekt len s potrebnými polia
  const dataToInsert = {
    title,
    description,
    latitude,
    longitude,
    ...(category && { category }), // Pridaj category len ak existuje
  };

  const inserted = await db.insert(places).values(dataToInsert).returning();

  return NextResponse.json(inserted[0]);
}