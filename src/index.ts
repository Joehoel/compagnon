import "dotenv/config";
import "module-alias/register";
import colors from "colors";
import consola from "consola";
import { Client, Collection, Intents } from "discord.js";
import { DisTube } from "distube";
import { createConnection } from "typeorm";
import { Config } from "./entity/Config";
import { music, quiz } from "./features";
import playground from "./features/playground";
import { registerCommands, registerEvents, registerSlashCommands } from "./lib/registry";
import Command from "./modules/Command";
import Event from "./modules/Event";
import SlashCommand from "./modules/SlashCommand";
import { Snipe } from "./typings";
import { Player } from "discord-player";
import SpotifyPlugin from "@distube/spotify";
import player from "./features/player";

// Environment variables
const { TOKEN } = process.env;

// Register new discord client
const client = new Client({
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

// Client properties for easy acces
client.commands = new Collection<string, Command>();
client.slashCommands = new Collection<string, SlashCommand>();
client.aliases = new Collection<string, string>();
client.snipes = new Collection<string, Snipe>();
client.events = new Collection<string, Event>();
client.config = new Collection<string, Partial<Config>>();
client.music = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    searchSongs: 0,
    plugins: [new SpotifyPlugin()],
});
client.player = new Player(client);
client.logger = consola;

(async () => {
    try {
        // Database connection
        await createConnection();

        client.logger.success("Database" + colors.green.bold(" connected!"));

        // Register commands and events
        await registerCommands(client, "../commands");
        await registerEvents(client, "../events");
        await registerSlashCommands(client, "../_commands");

        // Music handler
        music(client.music);
        player(client);

        // Login bot
        await client.login(TOKEN);

        quiz(client);
        playground(client);
    } catch (error) {
        client.logger.error(error);
    }
})();

process.on("uncaughtException", (error) => client.logger.error(error));
