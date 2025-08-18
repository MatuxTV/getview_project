import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { places, categories, hashtags, placesToHashtags } from "@/src/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    // Najprv načítame všetky places s kategóriami
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
        },
      })
      .from(places)
      .leftJoin(categories, eq(places.categoryId, categories.id))
      .orderBy(desc(places.createdAt));

    // Potom načítame hashtagy pre každé miesto
    const placesWithHashtags = await Promise.all(
      allPlaces.map(async (place) => {
        const placeHashtags = await db
          .select({
            id: hashtags.id,
            name: hashtags.name,
          })
          .from(hashtags)
          .innerJoin(placesToHashtags, eq(hashtags.id, placesToHashtags.hashtagId))
          .where(eq(placesToHashtags.placeId, place.id));

        return {
          ...place,
          hashtags: placeHashtags,
        };
      })
    );

    return NextResponse.json(placesWithHashtags);
  } catch (error) {
    console.error("Chyba pri načítavaní miest:", error);
    return NextResponse.json({ error: "Chyba pri načítavaní miest" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, latitude, longitude, categoryId, hashtagIds, customHashtags } = body ?? {};

    if (!title || typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Vytvor miesto
    const dataToInsert = {
      title,
      description,
      latitude,
      longitude,
      ...(categoryId && { categoryId }),
    };

    const insertedPlace = await db.insert(places).values(dataToInsert).returning();
    const placeId = insertedPlace[0].id;

    // Spracuj vlastné hashtagy - vytvor ich v databáze ak neexistujú
    const allHashtagIds = [...(hashtagIds || [])];
    
    if (customHashtags && customHashtags.length > 0) {
      for (const customHashtag of customHashtags) {
        const hashtagName = customHashtag.startsWith('#') ? customHashtag : `#${customHashtag}`;
        
        // Skontroluj či hashtag existuje
        const existingHashtag = await db
          .select()
          .from(hashtags)
          .where(eq(hashtags.name, hashtagName))
          .limit(1);

        if (existingHashtag.length > 0) {
          allHashtagIds.push(existingHashtag[0].id);
        } else {
          // Vytvor nový hashtag
          const newHashtag = await db
            .insert(hashtags)
            .values({ name: hashtagName })
            .returning();
          allHashtagIds.push(newHashtag[0].id);
        }
      }
    }

    // Pripoj hashtagy k miestu
    if (allHashtagIds.length > 0) {
      const hashtagConnections = allHashtagIds.map(hashtagId => ({
        placeId,
        hashtagId,
      }));
      
      await db.insert(placesToHashtags).values(hashtagConnections);
    }

    // Vráť kompletné miesto s hashtagmi
    const placeWithHashtags = await db
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
        },
      })
      .from(places)
      .leftJoin(categories, eq(places.categoryId, categories.id))
      .where(eq(places.id, placeId));

    const placeHashtags = await db
      .select({
        id: hashtags.id,
        name: hashtags.name,
      })
      .from(hashtags)
      .innerJoin(placesToHashtags, eq(hashtags.id, placesToHashtags.hashtagId))
      .where(eq(placesToHashtags.placeId, placeId));

    const result = {
      ...placeWithHashtags[0],
      hashtags: placeHashtags,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chyba pri vytváraní miesta:", error);
    return NextResponse.json({ error: "Chyba pri vytváraní miesta" }, { status: 500 });
  }
}