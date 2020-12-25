import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";

export default new Command({
    name: "ping",
    description: "Pong!",
    execute(client, message) {
        const embed = new MessageEmbed({
            title: "Pong",
            color: "ffc600",
        });
        message.channel.send(embed).then((m) => {
            const ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(
                new MessageEmbed({
                    title: "Pong",
                    color: "ffc600",
                    description: `${ping}ms`,
                }),
            );
        });
    },
});
