import { Client, Message } from "discord.js";
import { command, filter } from "../features";

export default async (client: Client, message: Message) => {
  try {
    await filter(client, message);
    await command(client, message);
  } catch (error) {
    client.logger.error(error);
  }
};
