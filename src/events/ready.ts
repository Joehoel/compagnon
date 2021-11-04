import colors from "colors";
import { TextChannel } from "discord.js";
import { Config } from "../entity/Config";
import { CHANNELS } from "../lib/contants";
import logger from "../lib/logger";
import Event from "../structures/Event";

export default new Event({
    name: "ready",
    async run(client) {
        // Cache for reactions
        const channel = client.channels.cache.get(CHANNELS.WELCOME) as TextChannel;
        channel?.messages.cache.get("878717402878185493");

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

        const totalMembers = client.guilds.cache.reduce((acc, val) => acc + val.memberCount, 0);

        client.user?.setPresence({
            status: "online",
            activities: [{ name: `with my ${totalMembers} nerds` }],
        });

        logger.info("Compagnon" + colors.green.bold(" online!"));
    },
});
