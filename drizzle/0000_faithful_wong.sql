CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hashtags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"categoryId" integer
);
--> statement-breakpoint
CREATE TABLE "places_to_hashtags" (
	"id" serial PRIMARY KEY NOT NULL,
	"placeId" integer NOT NULL,
	"hashtagId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places_to_hashtags" ADD CONSTRAINT "places_to_hashtags_placeId_places_id_fk" FOREIGN KEY ("placeId") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places_to_hashtags" ADD CONSTRAINT "places_to_hashtags_hashtagId_hashtags_id_fk" FOREIGN KEY ("hashtagId") REFERENCES "public"."hashtags"("id") ON DELETE no action ON UPDATE no action;