import { Client, ClientEvents } from "discord.js";

export default class Event {
  public name: keyof ClientEvents;
  public once: boolean;
  run: (client: Client, ...args: any) => Promise<void>;

  constructor({ name, run }: { name: keyof ClientEvents; run: (client: Client, ...args: any) => Promise<void> }) {
    this.name = name;
    this.run = run;
  }
}
