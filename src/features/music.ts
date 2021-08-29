import { MessageEmbed } from "discord.js";
import DisTube from "distube";
import { status } from "../lib/helpers";

export default (music: DisTube) => {
    music
        .on("playSong", (message, queue, song) => {
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
                        value: song.user.username,
                    },
                    {
                        name: "Status",
                        value: status(queue),
                    },
                ],
            });
            message.channel.send({ embeds: [embed] });
        })
        .on("addSong", (message, queue, song) => {
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
                        value: song.user.username,
                    },
                    {
                        name: "Status",
                        value: status(queue),
                    },
                ],
            });
            message.channel.send({ embeds: [embed] });
        })
        .on("playList", (message, queue, playlist, song) => {
            const embed = new MessageEmbed({
                title: "Music",
                color: "#ffc600",
                fields: [
                    {
                        name: "Playing",
                        value: `\`${playlist.name}\` playlist (${playlist.songs.length} songs)`,
                    },
                    {
                        name: "Requested by",
                        value: song.user.username,
                    },
                    {
                        name: "Now playing",
                        value: `\`${song.name}\` - \`${song.formattedDuration}\``,
                    },
                    {
                        name: "Status",
                        value: status(queue),
                    },
                ],
            });

            message.channel.send({ embeds: [embed] });
        })
        .on("addList", (message, queue, playlist) => {
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
                        value: playlist.user.username,
                    },

                    {
                        name: "Status",
                        value: status(queue),
                    },
                ],
            });

            message.channel.send({ embeds: [embed] });
        })

        .on("error", (message, e) => {
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
            message.channel.send({ embeds: [embed] });
        });
};
