import { APIApplicationCommandOptionChoice } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";

export enum OptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
}

interface Option {
    type: OptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: APIApplicationCommandOptionChoice[];
}

export enum PermissionType {
    ROLE = 1,
    USER = 2,
}

export interface Permission {
    id: string;
    type: PermissionType;
    permission: boolean;
}

export default class SlashCommand {
    public readonly name: string;
    public readonly description: string;
    public readonly options: Option[];
    public readonly permissions: Permission[];
    public execute: (interaction: CommandInteraction) => void;
    constructor({
        name,
        description,
        execute,
        options,
        permissions,
    }: {
        name: string;
        description: string;
        options?: Option[];
        permissions?: Permission[];
        execute: (interaction: CommandInteraction) => void;
    }) {
        this.name = name;
        this.description = description;
        this.options = options ?? [];
        this.permissions = permissions ?? [];
        this.execute = execute;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            options: this.options ?? [],
            default_permission: !this.permissions.length,
        };
    }
}
