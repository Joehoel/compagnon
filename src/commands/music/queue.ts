import Command from "../../structures/Command";
import { Embeds } from "discord-paginationembed";
import { MessageEmbed, TextChannel } from "discord.js";
import { chunk, embed } from "../../lib/helpers";
import { sendPaginatedEmbeds } from "discord.js-embed-pagination";

export default new Command({
    name: "queue",
    description: "Show the current queue",
    aliases: ["q"],
    exclusive: true,
    async execute(client, message) {
        const queue = client.music.getQueue(message);

        if (queue && queue.songs.length > 1) {
            const formattedQueue = queue.songs.map((song, i) => {
                return `**${i}**. \`${song?.name}\` - \`${song?.formattedDuration}\``;
            });

            const playing = formattedQueue.shift()?.split(".")[1];

            const embeds = chunk(formattedQueue, 10).map((chunk) => {
                const content = chunk.join("\n");
                return new MessageEmbed({
                    title: "Music",
                    footer: {
                        text: `${queue?.songs.length} song(s) in queue | ${queue?.formattedDuration} total length`,
                    },
                    color: "#ffc600",
                    fields: [
                        {
                            name: "Now playing",
                            value: playing!,
                            inline: true,
                        },
                        {
                            name: "Queue",
                            value: content,
                        },
                    ],
                });
            });

            const paginatedEmbed = new Embeds()
                .setArray(embeds)
                .setDisabledNavigationEmojis(["delete"])
                .setChannel(message.channel as TextChannel);

            await paginatedEmbed.build();
        } else {
            return message.channel.send("🗑 | Queue is empty ");
        }
    },
});
