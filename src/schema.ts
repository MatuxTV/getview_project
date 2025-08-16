import { pgTable, serial, text, doublePrecision, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color"), // hex farba pre ikony
  icon: text("icon"), // názov ikony
});

export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  categoryId: integer("categoryId").references(() => categories.id), // foreign key
});

// Definície vzťahov
export const categoriesRelations = relations(categories, ({ many }) => ({
  places: many(places),
}));

export const placesRelations = relations(places, ({ one }) => ({
  category: one(categories, {
    fields: [places.categoryId],
    references: [categories.id],
  }),
}));