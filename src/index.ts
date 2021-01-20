// Global
import "dotenv/config";
import "module-alias/register";
import music from "@/features/music";
import Command from "@/utils/Command";
import colors from "colors";
import { Client, Collection } from "discord.js";
import DisTube from "distube";
import Commands from "./commands";
import command from "./features/command";
import { createConnection } from "typeorm";
const { TOKEN } = process.env;
import consola from "consola";

const client = new Client();

// Command handler
client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.logger = consola;

for (const file in Commands) {
    const command = Commands[file as keyof typeof Commands];

    client.commands.set(file, command);

    command.aliases.forEach((alias: string) => {
        client.aliases.set(alias, file);
    });
}

// Ready!
client.on("ready", async () => {
    try {
        await createConnection();
        client.logger.success("Database" + colors.green.bold(" connected!"));

        // Music handler
        music(client.music);

        client.logger.success("Compagnon" + colors.green.bold(" online!"));
    } catch (error) {
        client.logger.error(error);
    }
});

// On every message
client.on("message", async (message) => {
    // Command handler
    command(client, message);
});

client.login(TOKEN);
