import { REST } from "@discordjs/rest";
import { getVoiceConnections } from "@discordjs/voice";
import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { Routes } from "discord-api-types/v9";
import { Client, ClientOptions, Collection } from "discord.js";
import DisTube from "distube";
import { Config } from "../entity/Config";
import { music, quiz } from "../features";
import logger from "../lib/logger";
import { read } from "../lib/read";
import { Snipe } from "../typings";
import Command from "./Command";
import Event from "./Event";
import Module from "./Module";
import SlashCommand from "./SlashCommand";

type SlashCommandResponse = {
    id: string;
    application_id: string;
    name: string;
    description: string;
    version: string;
    default_permission: boolean;
    type: number;
    guild_id: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    options: Object[];
}[];

/**
 * Wrapper around Discord Client that provides automatic loading of commands, slash-commands & events. Support for aliases and has music functionality
 * @class Bot
 * @extends {Client}
 */
export default class Bot extends Client {
    public commands = new Collection<string, Command>();
    public slashCommands = new Collection<string, SlashCommand>();
    public events = new Collection<string, Event<never>>();
    public modules = new Collection<string, Module<never>>();
    public aliases = new Collection<string, string>();
    public config = new Collection<string, Partial<Config>>();
    public snipes = new Collection<string, Snipe>();

    private commandsFolder: string;
    private eventsFolder: string;
    private slashCommandsFolder: string;
    private modulesFolder: string;

    public prefix: string;
    public music: DisTube;

    private app = new REST({ version: "9" });
    private clientId: string;
    private guildId: string;

    constructor({
        token,
        commandsFolder,
        slashCommandsFolder,
        eventsFolder,
        modulesFolder,
        prefix,
        clientId,
        guildId,
        ...options
    }: ClientOptions & {
        token: string;
        commandsFolder?: string;
        eventsFolder?: string;
        slashCommandsFolder?: string;
        modulesFolder?: string;
        prefix?: string;
        clientId: string;
        guildId: string;
    }) {
        super(options);

        this.token = token;
        this.clientId = clientId;
        this.guildId = guildId;
        this.prefix = prefix ?? "!";

        this.commandsFolder = commandsFolder ?? "commands";
        this.eventsFolder = eventsFolder ?? "events";
        this.slashCommandsFolder = slashCommandsFolder ?? "_commands";
        this.modulesFolder = modulesFolder ?? "modules";

        this.app.setToken(token);

        this.music = new DisTube(this, {
            emitNewSongOnly: true,
            leaveOnEmpty: true,
            leaveOnStop: true,
            searchSongs: 0,
            youtubeDL: false,
            plugins: [new SpotifyPlugin(), new YtDlpPlugin()],
        });

        try {
            this.registerCommands(this.commandsFolder);
            this.registerEvents(this.eventsFolder);
            this.registerSlashCommands(this.slashCommandsFolder);
            this.registerModules(this.modulesFolder);

            music(this.music);
            quiz(this);

            this.login(token);
        } catch (error) {
            logger.error(error);
        }
    }

    public leaveVoiceChannels() {
        const connections = getVoiceConnections();

        for (const connection of connections.values()) {
            connection.disconnect();
        }
    }

    private async registerSlashCommands(dir: string) {
        const slashCommands = await read<SlashCommand>(dir);

        await this.app.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
            body: slashCommands,
        });
        const commands = (await this.app.get(
            Routes.applicationGuildCommands(this.clientId, this.guildId)
        )) as SlashCommandResponse;

        for (const slashCommand of slashCommands) {
            this.slashCommands.set(slashCommand.name, slashCommand);
            // const command = commands.find(({ name }) => name == slashCommand.name);

            // if (slashCommand.permissions?.length && command?.id) {
            //     await this.app.put(
            //         Routes.applicationCommandPermissions(this.clientId, this.guildId, command.id),
            //         {
            //             body: { permissions: slashCommand.permissions },
            //         }
            //     );
            // }
        }

        logger.info(`Loaded ${slashCommands.length} [/] commands`);
    }

    private async registerCommands(dir: string) {
        const commands = await read<Command>(dir);

        for (const command of commands) {
            // Register command
            this.commands.set(command.name, command);

            // Register all command aliases
            if (!command.aliases) return;
            command.aliases.forEach((alias: string) => {
                this.aliases.set(alias, command.name);
            });
        }
        logger.info(`Loaded ${commands.length} commands`);
    }

    private async registerEvents(dir: string) {
        const events = await read<Event<never>>(dir);
        for (const event of events) {
            this.events.set(event.name, event);
            try {
                if (event.once) {
                    this.once(event.name, event.run.bind(event, this));
                } else {
                    this.on(event.name, event.run.bind(event, this));
                }
            } catch (error) {
                logger.error(error);
            }
        }
        logger.info(`Loaded ${events.length} events`);
    }

    private async registerModules(dir: string) {
        const modules = await read<Module<never>>(dir);

        for (const module of modules) {
            this.modules.set(module.name, module);

            try {
                this.on(module.event, module.run.bind(module, this));
            } catch (error) {
                logger.error(error);
            }
        }

        logger.info(`Loaded ${modules.length} modules`);
    }
}
