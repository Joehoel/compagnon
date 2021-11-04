import { TextChannel } from "discord.js";
import logger from "../lib/logger";
import Bot from "../structures/Bot";

export default async (client: Bot) => {
    const player = client.player;

    player.on("trackStart", (queue, track) => {
        // @ts-ignore
        const channel = queue.metadata.channel as TextChannel;
        channel.send(`🎶 | Now playing **${track.title}**!`);
    });

    player.on("trackAdd", (queue, track) => {
        // @ts-ignore
        const channel = queue.metadata.channel as TextChannel;
        channel.send(`➕ | Added **${track.title}** to queue!`);
    });

    player.on("channelEmpty", (queue) => {
        // @ts-ignore
        const channel = queue.metadata.channel as TextChannel;
        channel.send(`🚫 | Channel is empty!`);
    });

    player.on("error", (_, error) => {
        logger.error(error);
    });
};
