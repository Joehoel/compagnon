// Global
import "dotenv/config";
import "module-alias/register";
import "./modules/ExtendedMessage";

// Command and Event classes
import Command from "./modules/Command";
import Event from "./modules/Event";

// Other
import consola from "consola";
import DisTube from "distube";
import { Client, Collection } from "discord.js";
import { Snipe } from "./typings";
import { registerCommands, registerEvents } from "./lib/registry";
import { music } from "./features";
import { createConnection } from "typeorm";
import colors from "colors";
import { Config } from "./entity/Config";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// Client properties for easy acces
client.commands = new Collection<string, Command>();
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

    // Music handler
    music(client.music);

    // Database connection
    await createConnection();
    client.logger.success("Database" + colors.green.bold(" connected!"));

    // Log bot in
    await client.login(TOKEN);
    client.logger.success("Compagnon" + colors.green.bold(" online!"));
  } catch (error) {
    client.logger.error(error);
  }
})();
