import { MessageEmbed } from "discord.js";
import Command from "@/utils/Command";

export default new Command({
    name: "queue",
    description: "Show the current queue",
    aliases: ["q"],
    execute(client, message) {
        const queue = client.music.getQueue(message);
        const embed = new MessageEmbed({
            title: "Music",
            color: "#ffc600",
            fields: [
                {
                    name: "Queue",
                    value: queue.songs
                        .slice(1)
                        .map((song, i) => {
                            return `**${i + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``;
                        })
                        .slice(0, 10)
                        .join("\n"),
                },
            ],
        });
        return message.channel.send(embed);
    },
});
