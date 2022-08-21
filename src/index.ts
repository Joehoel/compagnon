import { Intents } from "discord.js";
import { Bot } from "./lib";
import "dotenv/config";

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;

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
