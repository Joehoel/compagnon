import { Intents } from "discord.js";
import "dotenv/config";
import { env } from "./env";
import { Bot } from "./lib";

export const bot = new Bot({
  token: env.DISCORD_TOKEN,
  clientId: env.DISCORD_CLIENT_ID,
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
