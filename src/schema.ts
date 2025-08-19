import { pgTable, serial, text, doublePrecision, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { AdapterAccount } from "@auth/core/adapters";

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
  // Pridáme userId foreign key
  userId: text("userId").notNull().references(() => users.id), // Kto vytvoril miesto
});

// Junction tabuľka pre many-to-many vzťah medzi places a hashtags
export const placesToHashtags = pgTable("places_to_hashtags", {
  id: serial("id").primaryKey(),
  placeId: integer("placeId").notNull().references(() => places.id),
  hashtagId: integer("hashtagId").notNull().references(() => hashtags.id),
});

// Auth tables - použijem predvolené názvy pre NextAuth.js
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount["type"]>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (vt) => ({
  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}));

// Definície vzťahov
export const categoriesRelations = relations(categories, ({ many }) => ({
  places: many(places),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  places: many(places), // User má veľa miest
}));

export const placesRelations = relations(places, ({ one, many }) => ({
  category: one(categories, {
    fields: [places.categoryId],
    references: [categories.id],
  }),
  user: one(users, { // Place patrí jednému userovi
    fields: [places.userId],
    references: [users.id],
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

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));