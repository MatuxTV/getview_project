import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts", // kde budú tvoje tabuľky
  out: "./drizzle",          // priečinok s migráciami
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});