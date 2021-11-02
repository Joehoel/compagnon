import { REST } from "@discordjs/rest";
import SpotifyPlugin from "@distube/spotify";
import { Routes } from "discord-api-types/v9";
import { BitFieldResolvable, Client, Collection, IntentsString, PartialTypes } from "discord.js";
import DisTube from "distube";
import { Config } from "../entity/Config";
import { music, playground, quiz } from "../features";
import logger from "../lib/logger";
import { read } from "../lib/read";
import { Snipe } from "../typings";
import Command from "./Command";
import Event from "./Event";
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

export default class Bot extends Client {
    public commands = new Collection<string, Command>();
    public slashCommands = new Collection<string, SlashCommand>();
    public events = new Collection<string, Event<never>>();
    public aliases = new Collection<string, string>();
    public config = new Collection<string, Partial<Config>>();
    public snipes = new Collection<string, Snipe>();
    public prefix: string | undefined = "!";
    public music: DisTube;

    private app = new REST({ version: "9" });
    private clientId: string;
    private guildId: string;

    constructor({
        token,
        intents,
        partials,
        commandsFolder,
        slashCommandsFolder,
        eventsFolder,
        prefix,
        clientId,
        guildId,
    }: {
        token: string;
        intents: BitFieldResolvable<IntentsString, number>;
        partials?: PartialTypes[] | undefined;
        commandsFolder?: string;
        eventsFolder?: string;
        slashCommandsFolder?: string;
        prefix?: string;
        clientId: string;
        guildId: string;
    }) {
        super({ intents, partials });

        this.token = token;
        this.clientId = clientId;
        this.guildId = guildId;
        this.prefix = prefix;

        this.app.setToken(token);

        this.music = new DisTube(this, {
            emitNewSongOnly: true,
            leaveOnEmpty: true,
            searchSongs: 0,
            plugins: [new SpotifyPlugin()],
        });

        try {
            this.registerCommands(commandsFolder);
            this.registerEvents(eventsFolder);
            this.registerSlashCommands(slashCommandsFolder);

            music(this.music);
            quiz(this);
            playground(this);

            this.login(token);
        } catch (error) {
            logger.error(error);
        }
    }
    private async registerSlashCommands(dir = `${process.cwd()}/src/_commands`) {
        const slashCommands = await read<SlashCommand>(dir);

        await this.app.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
            body: slashCommands,
        });
        const commands = (await this.app.get(
            Routes.applicationGuildCommands(this.clientId, this.guildId)
        )) as SlashCommandResponse;

        for (const slashCommand of slashCommands) {
            this.slashCommands.set(slashCommand.name, slashCommand);
            const command = commands.find(({ name }) => name == slashCommand.name);

            if (slashCommand.permissions?.length && command?.id) {
                await this.app.put(Routes.applicationCommandPermissions(this.clientId, this.guildId, command.id), {
                    body: { permissions: slashCommand.permissions },
                });
            }
        }

        logger.info(`Loaded ${slashCommands.length} [/] commands`);
    }

    private async registerCommands(dir = `${process.cwd()}/src/commands`) {
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

    private async registerEvents(dir = `${process.cwd()}/src/events`) {
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
}
