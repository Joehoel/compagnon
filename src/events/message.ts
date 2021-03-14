import { Client, Message } from "discord.js";
import command from "../features/command";
import filter from "../features/filter";

export default async (client: Client, message: Message) => {
  try {
    filter(client, message);
    command(client, message);
  } catch (error) {
    client.logger.error(error);
  }
};
