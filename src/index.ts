// Global
import "dotenv/config";
import Commands from "./commands";
import music from "@/features/music";
import Command from "@/utils/Command";
import colors from "colors";
import { Client, Collection } from "discord.js";
import DisTube from "distube";
import command from "./features/command";
const { TOKEN, PREFIX } = process.env;

const client = new Client();

// Command handler
client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, string>();
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

for (const file in Commands) {
    const command = Commands[file as keyof typeof Commands];

    client.commands.set(file, command);

    command.aliases.forEach((alias: string) => {
        client.aliases.set(alias, file);
    });
}

// Ready!
client.on("ready", async () => {
    // Music handler
    music(client.music);
    console.info("Compagnon" + colors.green.bold(" online!"));
});

// On every message
client.on("message", async (message) => {
    // Command handler
    command(client, message);
});

client.login(TOKEN);
