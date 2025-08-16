import { pgTable, serial, text, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  category: text("category"), 
});