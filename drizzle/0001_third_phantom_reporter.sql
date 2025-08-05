CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "guestBook" RENAME TO "files";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "guestBook_email_unique";--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "file_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "file_path" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN IF EXISTS "email";