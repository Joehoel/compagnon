import { Client } from "discord.js";
import { Config } from "../entity/Config";
import { GUILD_ID } from "../lib/contants";
import Event from "../modules/Event";

export default new Event({
  name: "ready",
  async run(client: Client) {
    client.guilds.cache.forEach(async (guild) => {
      const config = await Config.findOne({
        where: {
          guild: {
            id: guild.id,
          },
        },
      });

      if (config) {
        client.config.set(guild.id, config);
      }
    });

    client.user?.setPresence({
      status: "online",
      activity: { name: `with my ${client.guilds.cache.get(GUILD_ID)!.memberCount} nerds` },
    });
  },
});
