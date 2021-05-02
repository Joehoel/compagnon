import colors from "colors";
import { Client } from "discord.js";
import { createConnection } from "typeorm";
import { music } from "../features";
import Command from "../utils/Command";
import { GUILD_ID } from "../utils/constants";
import { read } from "../utils/read";

export default async (client: Client) => {
  try {
    // Register all commands
    const commands = await read<Command>("../commands");
    for (const command of commands) {
      // Register command
      client.commands.set(command.name, command);

      // Register all command aliases
      if (!command.aliases) return;
      command.aliases.forEach((alias: string) => {
        client.aliases.set(alias, command.name);
      });
    }

    // Music handler
    music(client.music);
    client.logger.success("Compagnon" + colors.green.bold(" online!"));

    // Database connection
    await createConnection();
    client.logger.success("Database" + colors.green.bold(" connected!"));

    client.user?.setPresence({
      status: "online",
      activity: { name: `with my ${client.guilds.cache.get(GUILD_ID)!.memberCount} nerds` },
    });
  } catch (error) {
    client.logger.error(error);
  }
};
