import { Client } from "discord.js";
import { Config } from "../entity/Config";
import Event from "@/modules/Event";
import colors from "colors";

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

        const totalMembers = client.guilds.cache.reduce((acc, val) => acc + val.memberCount, 0);

        client.user?.setPresence({
            status: "online",
            activities: [{ name: `with my ${totalMembers} nerds` }],
        });

        client.logger.success("Compagnon" + colors.green.bold(" online!"));
    },
});
