import SlashCommand from "@/modules/SlashCommand";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import Command from "../modules/Command";
import Event from "../modules/Event";
import { read } from "./read";

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

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: "9" }).setToken(TOKEN);

export async function registerCommands(client: Client, dir = "") {
    const commands = await read<Command>(dir);

    for (const command of commands) {
        // Register command
        client.commands.set(command.name, command);

        // Register all command aliases
        if (!command.aliases) return;
        command.aliases.forEach((alias: string) => {
            client.aliases.set(alias, command.name);
        });
    }
    client.logger.success("Successfully reloaded commands.");
}

export async function registerSlashCommands(client: Client, dir = "../_commands") {
    const slashCommands = await read<SlashCommand>(dir);

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: slashCommands,
    });
    const commands = (await rest.get(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID))) as SlashCommandResponse;

    for (const slashCommand of slashCommands) {
        client.slashCommands.set(slashCommand.name, slashCommand);
        const command = commands.find(({ name }) => name == slashCommand.name);

        if (slashCommand.permissions?.length && command?.id) {
            await rest.put(Routes.applicationCommandPermissions(CLIENT_ID, GUILD_ID, command.id), {
                body: { permissions: slashCommand.permissions },
            });
        }
    }
    client.logger.success("Successfully reloaded application [/] commands.");
}

export async function registerEvents(client: Client, dir = "") {
    const events = await read<Event>(dir);
    for (const event of events) {
        client.events.set(event.name, event);
        try {
            if (event.once) {
                client.once(event.name, event.run.bind(event, client));
            } else {
                client.on(event.name, event.run.bind(event, client));
            }
        } catch (error) {
            client.logger.error(error);
        }
    }

    client.logger.success("Successfully reloaded events");
}
