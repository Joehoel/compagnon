import { PartialMessage } from "discord.js";
import { Client, Message } from "discord.js";

export default async (client: Client, message: Message | PartialMessage) => {
  try {
    console.log("Deleted a message");
  } catch (error) {
    client.logger.error(error);
  }
};
