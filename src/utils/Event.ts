import { Client } from "discord.js";

export default class Event {
  public name: string;
  run: (client: Client, ...args: any) => Promise<void>;

  constructor({ name, run }: { name: string; run: (client: Client, ...args: any) => Promise<void> }) {
    this.name = name;
    this.run = run;
  }
}
