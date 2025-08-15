import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // obíde self-signed cert problémy
});

await client.connect();
export const db = drizzle(client);