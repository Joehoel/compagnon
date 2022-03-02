import "module-alias/register";
import "dotenv/config";
import { register } from "typescript-paths";

// Register typescript paths
register();

import { Intents } from "discord.js";
import { createConnection } from "typeorm";
import logger from "./lib/logger";
import Bot from "./structures/Bot";

// Environment variables
const { TOKEN, CLIENT_ID, GUILD_ID, PREFIX } = process.env;

// Connect to PostgreSQL using `ormconfig.js` file
try {
    createConnection();
    logger.info("Connected to database");
} catch (error) {
    logger.error(error);
}

// Create instance of bot
const bot = new Bot({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    clientId: CLIENT_ID,
    guildId: GUILD_ID,
    prefix: PREFIX,
    token: TOKEN,
});

// Catch all errors and log to the console using custom logger
process.on("uncaughtException", (error) => logger.error(error));
process.on("unhandledRejection", (error) => logger.error(error));
process.on("warning", (warning) => {
    if (warning.message.includes("NODE_TLS_REJECT_UNAUTHORIZED")) return;
    logger.warn(warning);
});
process.on("message", (message) => logger.info(message));
process.on("SIGINT", () => {
    bot.emit("warn", "Shutting down");
    bot.destroy();
    process.exit();
});
