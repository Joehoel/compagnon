import { ClientEvents } from "discord.js";
import Bot from "./Bot";

export default class Module<T extends keyof ClientEvents> {
    public name: string;
    public event: T;
    public run: (client: Bot, ...args: ClientEvents[T]) => Promise<any>;

    constructor({
        name,
        event,
        run,
    }: {
        name: string;
        event: T;
        run: (client: Bot, ...args: ClientEvents[T]) => Promise<any>;
    }) {
        this.name = name;
        this.event = event;
        this.run = run;
    }
}
