import Command from "../../structures/Command";
import { MessageReaction, User } from "discord.js";
import { embed } from "../../lib/helpers";
import logger from "../../lib/logger";

export default new Command({
    name: "skip",
    description: "Skip a song",
    aliases: ["jump"],
    usage: "<song number>",
    exclusive: true,
    async execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");

        const { channel } = message.member.voice;
        const members = channel.members.filter((m) => !m.user.bot);

        if (members.size === 1 || message.member.roles.cache.get("521378616429248527")) {
            return client.music.skip(message);
        } else {
            const votesRequired = Math.ceil(members.size * 0.6);
            const msg = await message.channel.send({
                embeds: [
                    embed({
                        title: "Music",
                        description: `Votes required to skip: ${votesRequired}`,
                    }),
                ],
            });
            await msg.react("👍");
            await msg.react("👎");

            const filter = (reaction: MessageReaction, user: User) => {
                if (user.bot) return false;
                const { channel } = message.guild!.members.cache.get(user.id)!.voice;
                if (channel) {
                    return ["👍"].includes(reaction.emoji.name!);
                } else {
                    return false;
                }
            };

            try {
                // const reactions = await msg.awaitReactions(filter, {
                //   max: votesRequired,
                //   time: 10000,
                //   errors: ["time"],
                // });
                const reactions = await msg.awaitReactions({
                    max: votesRequired,
                    time: 10000,
                    errors: ["time"],
                    filter,
                });
                const totalVotes = reactions.get("👍")!.users.cache.filter((u) => !u.bot);
                if (totalVotes.size >= votesRequired) {
                    return client.music.skip(message);
                }
            } catch (err) {
                logger.error(err);
            }
        }

        const songNumber = parseInt(args[0]);
        if (!songNumber) return client.music.skip(message);
        return client.music.jump(message, songNumber);
    },
});
