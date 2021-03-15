// Global
import "dotenv/config";
import "module-alias/register";

// Events
import * as events from "./events";

// Command related
import Command from "./utils/Command";
import * as commands from "./commands";

// Other
import consola from "consola";
import DisTube from "distube";
import { Client, Collection } from "discord.js";
import { Snipe } from "./typings";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.snipes = new Collection<string, Snipe>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

for (const file in commands) {
  const command = commands[file as keyof typeof commands];

  // Register command
  client.commands.set(file, command);

  // Register all command aliases
  command.aliases.forEach((alias: string) => {
    client.aliases.set(alias, file);
  });
}

// Ready!
client.on("ready", async () => {
  await events.ready(client);
});

// On every message
client.on("message", async (message) => {
  await events.message(client, message);
});

// When a message is deleted
client.on("messageDelete", async (message) => {
  await events.messageDelete(client, message);
});

// Login
client.login(TOKEN);
