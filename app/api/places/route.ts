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
  const { title, description, latitude, longitude } = body ?? {};

  if (!title || typeof latitude !== "number" || typeof longitude !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const inserted = await db.insert(places).values({
    title,
    description,
    latitude,
    longitude,
  }).returning();

  return NextResponse.json(inserted[0]);
}