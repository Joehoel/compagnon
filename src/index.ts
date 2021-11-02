import "dotenv/config";
import "module-alias/register";
import { Intents } from "discord.js";
import { createConnection } from "typeorm";
import logger from "./lib/logger";
import Bot from "./modules/Bot";

// Environment variables
const { TOKEN, CLIENT_ID, GUILD_ID, PREFIX } = process.env;

createConnection();

new Bot({
    clientId: CLIENT_ID,
    guildId: GUILD_ID,
    prefix: PREFIX,
    token: TOKEN,
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

process.on("uncaughtException", (error) => logger.error(error));
process.on("unhandledRejection", (error) => logger.error(error));
process.on("warning", (warning) => logger.warn(warning));
