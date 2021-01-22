import Command from "@/utils/Command";
import { FieldsEmbed } from "discord-paginationembed";
import { TextChannel } from "discord.js";

export default new Command({
    name: "queue",
    description: "Show the current queue",
    aliases: ["q"],
    async execute(client, message) {
        const queue = client.music.getQueue(message);
        const formattedQueue = queue.songs.map((song, i) => {
            return `**${i + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``;
        });

        const paginatedEmbed = new FieldsEmbed()
            .setArray(formattedQueue)
            .setElementsPerPage(10)
            .setDisabledNavigationEmojis(["delete"])
            .setChannel(message.channel as TextChannel)
            .formatField("Queue", (el) => el);

        paginatedEmbed.embed
            .setColor("#ffc600")
            .setTitle("Music")
            .setFooter(`${queue.songs.length} songs in queue | ${queue.formattedDuration} total length`);

        await paginatedEmbed.build();
    },
});
