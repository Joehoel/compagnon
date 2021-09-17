import { chunk, embed } from "@/lib/helpers";
import SlashCommand, { OptionType } from "@/modules/SlashCommand";
import { GuildMember, MessageEmbed, VoiceChannel } from "discord.js";
import { sendPaginatedEmbeds } from "discord.js-embed-pagination";

export default new SlashCommand({
    name: "queue",
    description: "Get the queue",
    async execute(interaction) {
        const client = interaction.client;
        const queue = client.player.getQueue(interaction.guild!);

        // if (queue.tracks.length > 1) {
        // }
        // if (queue && queue.songs.length > 1) {
        //     const formattedQueue = queue?.songs?.map((song, i) => {
        //         return `**${i + 1}**. \`${song?.name}\` - \`${song?.formattedDuration}\``;
        //     });

        //     // const paginatedEmbed = new MessageEmbed({
        //     //     title: "Queue",
        //     //     footer: { text: `${queue?.songs.length} songs in queue | ${queue?.formattedDuration} total length` },
        //     // });

        //     await sendPaginatedEmbeds(interaction, embeds);
        // }
    },
});
