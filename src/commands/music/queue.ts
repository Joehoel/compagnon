import { Interaction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { chunk } from "../../lib/helpers";
import Command from "../../structures/Command";

export default new Command({
    name: "queue",
    description: "Show the current queue",
    aliases: ["q"],
    exclusive: true,
    async execute(client, message) {
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) throw new Error("NotInVoice");

        const pages: Record<string, number> = {};

        const id = message.member.user.id;
        pages[id] = pages[id] || 0;

        const queue = client.music.getQueue(message);

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

            const reply = await message.reply({
                embeds: [embed],
                components: [getRow(id)],
            });

            const collector = reply.createMessageComponentCollector({ filter, time });

            collector.on("collect", (buttonInteraction) => {
                if (!buttonInteraction) return;

                buttonInteraction.deferUpdate();

                if (!["prev", "next"].includes(buttonInteraction.customId)) return;

                if (buttonInteraction.customId === "prev" && pages[id] > 0) {
                    --pages[id];
                } else if (buttonInteraction.customId === "next" && pages[id] < embeds.length - 1) {
                    ++pages[id];
                }

                reply.edit({
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
            return message.channel.send("🗑 | Queue is empty ");
        }
    },
});
