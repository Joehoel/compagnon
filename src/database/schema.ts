import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  avatar: text("avatar"),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGuilds: many(usersToGuilds),
}));

export const guilds = pgTable("guilds", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const guildsRelations = relations(guilds, ({ many }) => ({
  usersToGuilds: many(usersToGuilds),
}));

export const usersToGuilds = pgTable(
  "users_to_guilds",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    guildId: integer("guild_id")
      .notNull()
      .references(() => guilds.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.guildId),
  })
);

export const usersToGuildsRelations = relations(usersToGuilds, ({ one }) => ({
  guild: one(guilds, {
    fields: [usersToGuilds.guildId],
    references: [guilds.id],
  }),
  user: one(users, {
    fields: [usersToGuilds.userId],
    references: [users.id],
  }),
}));
