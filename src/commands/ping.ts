import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";

export default new Command({
    name: "ping",
    description: "Pong!",
    execute(client, message) {
        const embed = new MessageEmbed({
              color: "ffc600",
              description: `**Pong!**`,
        });
        return message.channel.send(embed).then((m) => {
            const ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(
                new MessageEmbed({
                    color: "ffc600",
                    description: `**Pong!** \`${ping}ms\``,
                })
            );
        });
    },
});
