import { Client, Message } from "discord.js";

export default class Event {
  public name: string;
  public do: (client: Client, message: Message, args: string[]) => void;

  constructor({ name }: { name: string }) {
    this.name = name;
  }
}
