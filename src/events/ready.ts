import colors from "colors";
import { Client } from "discord.js";
import { createConnection } from "typeorm";
import { music } from "../features";
import { GUILD_ID } from "../utils/constants";

export default async (client: Client) => {
  try {
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
