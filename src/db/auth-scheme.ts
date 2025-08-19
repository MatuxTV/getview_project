// src/db/auth-schema.ts
import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// USERS
export const users = pgTable("users", {
  id: text("id").primaryKey(),                       // uuid / cuid – generuješ v kóde
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  passwordHash: text("password_hash"),               // nechaj pripravené (Credentials do budúcna)
});

// ACCOUNTS (OAuth prepojenia, napr. Google)
export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id").notNull(),               // FK -> users.id (drizzle FK nepovinné)
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),            // "google"
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: timestamp("expires_at", { withTimezone: true }),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => ({
    // unikátny kľúč podľa adapteru
    pk: primaryKey({ columns: [t.provider, t.providerAccountId] }),
  })
);

// SESSIONS (iba ak zvolíš session stratégiiu)
export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull(),                 // FK -> users.id
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

// VERIFICATION TOKENS (magic link, reset hesla…)
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.identifier, t.token] }),
  })
);