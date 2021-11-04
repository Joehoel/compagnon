import { Guild as Server } from "discord.js";
import { createGuildConfig } from "../lib/helpers";
import Event from "../structures/Event";

export default new Event({
    name: "guildCreate",
    async run(_, guild: Server) {
        await createGuildConfig(guild);
    },
});
