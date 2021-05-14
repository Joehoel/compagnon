import { Client } from "discord.js";

export default async (client: Client, args: string) => {
  client.logger.warn(args);
};
