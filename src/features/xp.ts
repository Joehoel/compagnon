import Levels from "discord-xp";
import { Message } from "discord.js";
import { ROLES } from "../lib/contants";
import { embed, giveRole } from "../lib/helpers";
import Bot from "../structures/Bot";

const { MONGO_URI } = process.env;
const sent = new Map<string, boolean>();

Levels.setURL(MONGO_URI);

// Level system using discord-xp
export default async (_: Bot, message: Message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const user = await Levels.fetch(message.author.id, message.guild.id);
    const isChad = user.xp >= 42069 && user.xp <= 42169;

    if (isChad) {
        if (sent.get(message.author.toString())) return;

        await message.channel.send({
            embeds: [
                embed({
                    title: "Congratulations",
                    description: `You have reached \`42069\` xp\nYou now have one of the biggest dicks in this server! 🍆 \nAs a reward you have been promoted to <@&${ROLES.CHAD}>`,
                    thumbnail: { url: "https://media.tenor.com/images/111a73396501d1621a54bd26e4db5ed8/tenor.gif" },
                }),
            ],
        });

        giveRole(message.member!, ROLES.CHAD);

        sent.set(message.author.toString(), true);
    }

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        message.channel.send(
            `${message.author}, congratulations! You have leveled up to **${user.level + 1}**. :tada:`
        );
    }
};
