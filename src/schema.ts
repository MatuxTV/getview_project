import { pgTable, serial, text, doublePrecision, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const hashtags = pgTable("hashtags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  categoryId: integer("categoryId").references(() => categories.id),
  hashtagId: integer("hashtagId").references(() => hashtags.id)
});

// Junction tabuľka pre many-to-many vzťah medzi places a hashtags
export const placesToHashtags = pgTable("places_to_hashtags", {
  id: serial("id").primaryKey(),
  placeId: integer("placeId").notNull().references(() => places.id),
  hashtagId: integer("hashtagId").notNull().references(() => hashtags.id),
});

// Definície vzťahov
export const categoriesRelations = relations(categories, ({ many }) => ({
  places: many(places),
}));

export const placesRelations = relations(places, ({ one, many }) => ({
  category: one(categories, {
    fields: [places.categoryId],
    references: [categories.id],
  }),
  placesToHashtags: many(placesToHashtags),
}));

export const hashtagsRelations = relations(hashtags, ({ many }) => ({
  placesToHashtags: many(placesToHashtags),
}));

export const placesToHashtagsRelations = relations(placesToHashtags, ({ one }) => ({
  place: one(places, {
    fields: [placesToHashtags.placeId],
    references: [places.id],
  }),
  hashtag: one(hashtags, {
    fields: [placesToHashtags.hashtagId],
    references: [hashtags.id],
  }),
}));