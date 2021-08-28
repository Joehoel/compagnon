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
import { music, quiz } from "./features";
import { createConnection } from "typeorm";
import colors from "colors";
import { Config } from "./entity/Config";
import { GUILD_ID, ROLES } from "./lib/contants";
import { Brain } from "./entity/Brain";

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
client.music = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
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

        // Login bot
        await client.login(TOKEN);

        // Insert users into `brains`
        // const users = [
        //     {
        //         id: "688798592873398355",
        //         score: 54,
        //     },
        //     {
        //         id: "272388777257730048",
        //         score: 52,
        //     },
        //     {
        //         id: "249946621456941056",
        //         score: 51,
        //     },
        //     {
        //         id: "764872419088924742",
        //         score: 51,
        //     },
        //     {
        //         id: "690630673836539987",
        //         score: 27,
        //     },
        //     {
        //         id: "279521224143667203",
        //         score: 24,
        //     },
        //     {
        //         id: "267717489138335744",
        //         score: 23,
        //     },
        //     {
        //         id: "180975824273408000",
        //         score: 8,
        //     },

        //     // "180975824273408000",
        //     // "764872419088924742",
        //     // "690630673836539987",
        //     // "249946621456941056",
        //     // "272388777257730048",
        //     // "279521224143667203",
        //     // "267717489138335744",
        // ];

        // users.forEach(async (user) => {
        //     await new Brain({
        //         user: `<@${user.id}>`,
        //         score: user.score,
        //     }).save();
        // });

        quiz(client);
    } catch (error) {
        client.logger.error(error);
    }
})();

process.on("uncaughtException", (error) => client.logger.error(error));
