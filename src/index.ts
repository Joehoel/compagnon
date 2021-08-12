// Global
import "dotenv/config";
import "module-alias/register";
// import "./modules/ExtendedMessage";

// Command and Event classes
import SlashCommand from "./modules/SlashCommand";
import Command from "./modules/Command";
import Event from "./modules/Event";

// Other
import consola from "consola";
import DisTube from "distube";
import { Client, Collection, Intents } from "discord.js";
import { Snipe } from "./typings";
import { registerCommands, registerEvents, registerSlashCommands } from "./lib/registry";
import { music } from "./features";
import { createConnection } from "typeorm";
import colors from "colors";
import { Config } from "./entity/Config";

// Environment variables
const { TOKEN } = process.env;

// Register REST client

// Register new discord client
const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    // Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// Client properties for easy acces
client.commands = new Collection<string, Command>();
client.slashCommands = new Collection<string, SlashCommand>();
client.aliases = new Collection<string, string>();
client.snipes = new Collection<string, Snipe>();
client.events = new Collection<string, Event>();
client.config = new Collection<string, Partial<Config>>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

(async () => {
  try {
    // Register commands and events
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await registerSlashCommands(client, "../_commands");

    // Music handler
    music(client.music);

    // Database connection
    await createConnection();
    client.logger.success("Database" + colors.green.bold(" connected!"));

    // Login bot
    await client.login(TOKEN);
  } catch (error) {
    client.logger.error(error);
  }
})();

process.on("uncaughtException", (error) => client.logger.error(error));
