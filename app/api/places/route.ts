import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { places, hashtags, placesToHashtags, users } from '@/src/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/src/auth';

export async function GET() {
  try {
    const placesWithDetails = await db
      .select({
        id: places.id,
        title: places.title,
        description: places.description,
        latitude: places.latitude,
        longitude: places.longitude,
        createdAt: places.createdAt,
        categoryId: places.categoryId,
        userId: places.userId,
        // Pridáme user info
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(places)
      .leftJoin(users, eq(places.userId, users.id)); // JOIN s users tabuľkou

    // Načítame hashtagy pre každé miesto
    const placesWithHashtags = await Promise.all(
      placesWithDetails.map(async (place) => {
        const placeHashtags = await db
          .select({
            id: hashtags.id,
            name: hashtags.name,
          })
          .from(placesToHashtags)
          .innerJoin(hashtags, eq(placesToHashtags.hashtagId, hashtags.id))
          .where(eq(placesToHashtags.placeId, place.id));

        return {
          ...place,
          hashtags: placeHashtags,
        };
      })
    );

    return NextResponse.json(placesWithHashtags);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Získaj aktuálnu session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, latitude, longitude, categoryId, hashtagIds = [], customHashtags = [] } = body;

    if (!title || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Vytvor custom hashtagy ak existujú
    const createdHashtagIds: number[] = [];
    for (const customHashtag of customHashtags) {
      const cleanHashtag = customHashtag.replace(/^#/, '').trim();
      if (cleanHashtag) {
        const [existingHashtag] = await db
          .select()
          .from(hashtags)
          .where(eq(hashtags.name, cleanHashtag))
          .limit(1);

        if (existingHashtag) {
          createdHashtagIds.push(existingHashtag.id);
        } else {
          const [newHashtag] = await db
            .insert(hashtags)
            .values({ name: cleanHashtag })
            .returning();
          createdHashtagIds.push(newHashtag.id);
        }
      }
    }

    // Vytvor nové miesto s userId z session
    const [newPlace] = await db
      .insert(places)
      .values({
        title,
        description,
        latitude,
        longitude,
        categoryId,
        userId: session.user.id, // Pridáme userId z session
      })
      .returning();

    // Spoj miesto s hashtagmi
    const allHashtagIds = [...hashtagIds, ...createdHashtagIds];
    if (allHashtagIds.length > 0) {
      await db.insert(placesToHashtags).values(
        allHashtagIds.map(hashtagId => ({
          placeId: newPlace.id,
          hashtagId,
        }))
      );
    }

    // Načítaj kompletné miesto s user info pre response
    const [completePlace] = await db
      .select({
        id: places.id,
        title: places.title,
        description: places.description,
        latitude: places.latitude,
        longitude: places.longitude,
        createdAt: places.createdAt,
        categoryId: places.categoryId,
        userId: places.userId,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(places)
      .leftJoin(users, eq(places.userId, users.id))
      .where(eq(places.id, newPlace.id));

    return NextResponse.json(completePlace, { status: 201 });

  } catch (error) {
    console.error('Error creating place:', error);
    return NextResponse.json({ error: 'Failed to create place' }, { status: 500 });
  }
}