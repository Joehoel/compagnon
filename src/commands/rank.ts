import Levels from "discord-xp";
import Command from "../structures/Command";
import { embed } from "../lib/helpers";

export default new Command({
    name: "rank",
    description: "Show the users rank and xp",
    aliases: ["watismijnxplevel", "howbigismydick"],
    usage: "<user>",
    async execute(_, message) {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message!.guild!.id!); // Selects the target from the database.

        if (!user)
            return message.channel.send({
                embeds: [embed({ description: "Seems like this user has not earned any xp so far" })],
            }); // If there isnt such user in the database, we send a message in general.

        return message.channel.send({
            embeds: [
                embed({
                    title: "Rank",
                    description: `**${target.username}** is currently level \`${user.level}\` \`(${
                        user.xp
                    }/${Levels.xpFor(user.level + 1)})\``,
                }),
            ],
        });
    },
});
