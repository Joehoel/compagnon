import { Interaction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { chunk } from "../../lib/helpers";
import SlashCommand from "../../structures/SlashCommand";

export default new SlashCommand({
    name: "queue",
    description: "Get the queue",
    async execute(interaction) {
        const client = interaction.client;
        const queue = client.music.getQueue(interaction.guild!.id);

        const pages: Record<string, number> = {};

        const id = interaction.member!.user.id;
        pages[id] = pages[id] || 0;

        if (queue && queue.songs.length > 1) {
            const formattedQueue = queue.songs.map((song, i) => {
                return `**${i}**. \`${song?.name}\` - \`${song?.formattedDuration}\``;
            });

            const playing = formattedQueue.shift()?.split(".")[1] ?? "Nothing playing...";

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
                            value: playing,
                            inline: true,
                        },
                        {
                            name: "Queue",
                            value: content,
                        },
                    ],
                });
            });

            const embed = embeds[pages[id]];

            const filter = (i: Interaction) => i.user.id === id;
            const time = 1000 * 6 * 5;

            interaction.reply({
                ephemeral: true,
                embeds: [embed],
                components: [getRow(id)],
            });

            const collector = interaction.channel?.createMessageComponentCollector({
                filter,
                time,
            });

            collector?.on("collect", (buttonInteraction) => {
                if (!buttonInteraction) return;

                buttonInteraction.deferUpdate();

                if (!["prev", "next"].includes(buttonInteraction.customId)) return;

                if (buttonInteraction.customId === "prev" && pages[id] > 0) {
                    --pages[id];
                } else if (buttonInteraction.customId === "next" && pages[id] < embeds.length - 1) {
                    ++pages[id];
                }

                interaction.editReply({
                    embeds: [embeds[pages[id]]],
                    components: [getRow(id)],
                });
            });

            // eslint-disable-next-line no-inner-declarations
            function getRow(id: string) {
                const row = new MessageActionRow();

                row.addComponents(
                    new MessageButton({
                        customId: "prev",
                        style: "SECONDARY",
                        emoji: "⬅️",
                        disabled: pages[id] === 0,
                    }),
                    new MessageButton({
                        customId: "next",
                        style: "SECONDARY",
                        emoji: "➡️",
                        disabled: pages[id] === embeds.length - 1,
                    })
                );

                return row;
            }
            // const paginatedEmbed = new Embeds()
            //     .setArray(embeds)
            //     .setDisabledNavigationEmojis(["delete"])
            //     .setChannel(message.channel as TextChannel);
            // await paginatedEmbed.build();
        } else {
            return interaction.reply("🗑 | Queue is empty ");
        }
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
