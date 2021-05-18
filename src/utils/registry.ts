import { Client } from "discord.js";
import Command from "./Command";
import Event from "./Event";
import { read } from "./read";

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
}

export async function registerEvents(client: Client, dir = "") {
  const events = await read<Event>(dir);
  for (const event of events) {
    client.events.set(event.name, event);
    try {
      client.on(event.name, event.run.bind(event, client));
    } catch (error) {
      client.logger.error(error);
    }
  }
}
