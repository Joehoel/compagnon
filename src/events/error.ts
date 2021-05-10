import { Client } from "discord.js";

export default async (client: Client, ...args: any[]) => {
  client.logger.error(args);
};
