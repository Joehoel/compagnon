import { Client, Message } from "discord.js";

export default class Command {
    public name: string;
    public admin: boolean;
    public usage?: string;
    public args: boolean;
    public description: string;
    public execute: (client: Client, message: Message, args: string[]) => void;

    constructor({
        name,
        admin,
        usage,
        args,
        description,
        execute,
    }: {
        name: string;
        admin?: boolean;
        usage?: string;
        args?: boolean;
        description: string;
        execute: (client: Client, message: Message, args: string[]) => void;
    }) {
        this.name = name;
        this.admin = admin ?? false;
        this.usage = usage;
        this.args = args ?? false;
        this.description = description;
        this.execute = execute;
    }
}
