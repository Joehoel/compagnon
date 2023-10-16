import { Intents } from "discord.js";
import { Bot } from "./lib";
import "dotenv/config";
import invariant from "tiny-invariant";

const { TOKEN, GUILD_ID, CLIENT_ID, DATABASE_URL } = process.env;

invariant(TOKEN, "'TOKEN' environment variable is required");
invariant(GUILD_ID, "'GUILD_ID' environment variable is required");
invariant(CLIENT_ID, "'CLIENT_ID' environment variable is required");
invariant(DATABASE_URL, "'DATABASE_URL' environment variable is required");

export const bot = new Bot({
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
