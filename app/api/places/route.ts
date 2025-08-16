import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { places, categories } from "@/src/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    // Načítaj places s kategóriami cez join
    const allPlaces = await db
      .select({
        id: places.id,
        title: places.title,
        description: places.description,
        latitude: places.latitude,
        longitude: places.longitude,
        createdAt: places.createdAt,
        categoryId: places.categoryId,
        category: {
          id: categories.id,
          name: categories.name,
          color: categories.color,
          icon: categories.icon,
        }
      })
      .from(places)
      .leftJoin(categories, eq(places.categoryId, categories.id))
      .orderBy(desc(places.createdAt));

    return NextResponse.json(allPlaces);
  } catch (error) {
    console.error("Chyba pri načítavaní miest:", error);
    return NextResponse.json({ error: "Chyba pri načítavaní miest" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, latitude, longitude, categoryId } = body ?? {};

    if (!title || typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Vytvor objekt len s potrebnými polia
    const dataToInsert = {
      title,
      description,
      latitude,
      longitude,
      ...(categoryId && { categoryId }), // Pridaj categoryId len ak existuje
    };

    const inserted = await db.insert(places).values(dataToInsert).returning();

    return NextResponse.json(inserted[0]);
  } catch (error) {
    console.error("Chyba pri vytváraní miesta:", error);
    return NextResponse.json({ error: "Chyba pri vytváraní miesta" }, { status: 500 });
  }
}