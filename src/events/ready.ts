import { Client } from "discord.js";
import { GUILD_ID } from "../globals";
import Event from "../lib/Event";

export default new Event({
  name: "ready",
  async run(client: Client) {
    client.user?.setPresence({
      status: "online",
      activity: { name: `with my ${client.guilds.cache.get(GUILD_ID)!.memberCount} nerds` },
    });
  },
});
