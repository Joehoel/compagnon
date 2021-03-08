// Global
import "dotenv/config";
import "module-alias/register";

// Handlers
import music from "@/features/music";
import command from "./features/command";

// Command related
import Command from "@/utils/Command";
import Commands from "./commands";

// Other
import colors from "colors";
import consola from "consola";
import DisTube from "distube";
import { Client, Collection } from "discord.js";
import { createConnection } from "typeorm";
import filter from "./features/filter";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

for (const file in Commands) {
  const command = Commands[file as keyof typeof Commands];

  // Register command
  client.commands.set(file, command);

  // Register all command aliases
  command.aliases.forEach((alias: string) => {
    client.aliases.set(alias, file);
  });
}

// Ready!
client.on("ready", async () => {
  try {
    // Music handler
    music(client.music);
    client.logger.success("Compagnon" + colors.green.bold(" online!"));

    // Database connection
    await createConnection();
    client.logger.success("Database" + colors.green.bold(" connected!"));
  } catch (error) {
    client.logger.error(error);
  }
});

// On every message
client.on("message", async (message) => {
  // Command handler
  filter(client, message);
  command(client, message);
});

// Login
client.login(TOKEN);
