import { status } from "@/lib/helpers";
import { MessageEmbed } from "discord.js";
import DisTube from "distube";

export default (music: DisTube) => {
    music
        .on("playSong", (queue, song) => {
            const embed = new MessageEmbed({
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
            });
            queue.textChannel?.send({ embeds: [embed] });
        })
        .on("addSong", (queue, song) => {
            const embed = new MessageEmbed({
                title: "Music",
                color: "#ffc600",
                fields: [
                    {
                        name: "Added to queue",
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
            });
            queue.textChannel?.send({ embeds: [embed] });
        })
        .on("addList", (queue, playlist) => {
            const embed = new MessageEmbed({
                title: "Music",
                color: "#ffc600",
                fields: [
                    {
                        name: "Added to queue",
                        value: `\`${playlist.name}\` playlist (${playlist.songs.length} songs)`,
                    },
                    {
                        name: "Requested by",
                        value: playlist.user!.username,
                    },

                    {
                        name: "Status",
                        value: status(queue),
                    },
                ],
            });

            queue.textChannel?.send({ embeds: [embed] });
        })

        .on("error", (channel, e) => {
            console.error(e);

            const embed = new MessageEmbed({
                title: "Error",
                color: "#FF0000",
                fields: [
                    {
                        name: "An error encountered",
                        value: e.message,
                    },
                ],
            });
            channel.send({ embeds: [embed] });
        });
};
