import { pgTable, text, doublePrecision, timestamp, serial, integer } from "drizzle-orm/pg-core"



export const places = pgTable("places", {
	title: text().notNull(),
	description: text().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	createdAt: timestamp({ mode: 'string' }),
	id: serial().primaryKey().notNull(),
	category: integer(),
});
