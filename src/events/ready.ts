import colors from "colors";
import { Client } from "discord.js";
import { createConnection } from "typeorm";
import { music } from "../features";
import { GUILD_ID } from "../utils/constants";
import Event from "../utils/Event";

export default new Event({
  name: "ready",
  async run(client: Client) {
    client.user?.setPresence({
      status: "online",
      activity: { name: `with my ${client.guilds.cache.get(GUILD_ID)!.memberCount} nerds` },
    });
  },
});
