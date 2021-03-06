import { Guild as Server } from "discord.js";
import { createGuildConfig } from "../lib/helpers";
import Event from "../modules/Event";

export default new Event({
  name: "guildCreate",
  async run(client, guild: Server) {
    await createGuildConfig(guild);
  },
});
