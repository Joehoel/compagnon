import { Client, ClientEvents } from "discord.js";

export default class Event {
    public name: keyof ClientEvents;
    public once: boolean;
    run: (client: Client, ...args: any) => Promise<void>;

    constructor({
        name,
        run,
        once,
    }: {
        name: keyof ClientEvents;
        run: (client: Client, ...args: any) => Promise<void>;
        once?: boolean;
    }) {
        this.name = name;
        this.once = once ?? false;
        this.run = run;
    }
}
