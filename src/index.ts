// Global
import "dotenv/config";
import "module-alias/register";
import "./lib/ExtendedMessage";

// Command and Event classes
import Command from "./utils/Command";
import Event from "./utils/Event";

// Other
import consola from "consola";
import DisTube from "distube";
import { Client, Collection } from "discord.js";
import { Snipe } from "./typings";
import { registerCommands, registerEvents } from "./utils/registry";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// Client properties for easy acces
client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.snipes = new Collection<string, Snipe>();
client.events = new Collection<string, Event>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

(async () => {
  try {
    // Register commands and events
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await client.login(TOKEN);
  } catch (error) {
    client.logger.error(error);
  }
})();
