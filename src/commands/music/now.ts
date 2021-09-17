import Command from "../../modules/Command";
import { status } from "../../lib/helpers";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "now",
    description: "Shows the current playing song",
    aliases: ["np", "nowplaying", "playing"],
    exclusive: true,
    execute(client, message) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        const queue = client.music.getQueue(message)!;
        const song = queue.songs[0];
        if (song && queue)
            return message.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Music",
                        color: "#ffc600",
                        fields: [
                            {
                                name: "Playing",
                                value: `\`${song.name}\` - \`${song.formattedDuration}\``,
                            },
                            {
                                name: "Requested by",
                                value: song.user!.username,
                            },
                            {
                                name: "Status",
                                value: status(queue),
                            },
                        ],
                    }),
                ],
            });
    },
});
