import { Client, Message } from "discord.js";
import * as features from "../features";

export default async (client: Client, message: Message) => {
  try {
    await features.filter(client, message);
    await features.command(client, message);
    await features.polls(client, message);
  } catch (error) {
    client.logger.error(error);
  }
};
