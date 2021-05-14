import { Client } from "discord.js";

export default async (client: Client, args: Error) => {
  client.logger.error(args);
};
