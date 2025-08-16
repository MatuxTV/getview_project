import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts", // kde budú tvoje tabuľky
  out: "./drizzle",          // priečinok s migráciami
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});