ALTER TABLE "users_to_guilds" RENAME COLUMN "group_id" TO "guild_id";--> statement-breakpoint
ALTER TABLE "users_to_guilds" DROP CONSTRAINT "users_to_guilds_group_id_guilds_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_guilds" DROP CONSTRAINT "users_to_guilds_user_id_group_id_pk";--> statement-breakpoint
ALTER TABLE "users_to_guilds" ADD CONSTRAINT "users_to_guilds_user_id_guild_id_pk" PRIMARY KEY("user_id","guild_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_guilds" ADD CONSTRAINT "users_to_guilds_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
