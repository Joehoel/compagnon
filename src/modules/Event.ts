import { ClientEvents } from "discord.js";
import Bot from "./Bot";

export default class Event<T extends keyof ClientEvents> {
    public name: T;
    public once: boolean;
    run: (client: Bot, ...args: ClientEvents[T]) => Promise<void>;

    constructor({
        name,
        run,
        once,
    }: {
        name: T;
        run: (client: Bot, ...args: ClientEvents[T]) => Promise<void>;
        once?: boolean;
    }) {
        this.name = name;
        this.once = once ?? false;
        this.run = run;
    }
}
