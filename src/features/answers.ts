import { CHANNELS, USERS } from "@/lib/contants";
import { embed } from "@/lib/helpers";
import { Client, Message, MessageReaction, ReactionCollector, User } from "discord.js";

const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
    // const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

    if (message.content.startsWith(PREFIX) || message.channel.id != CHANNELS.TEST_CHANNEL || message.author.bot) return;

    const member = await client.users.fetch(USERS.JOEL);
    const msg = await member.send({
        embeds: [
            embed({
                description: message.content,
                author: {
                    name: message.author.username,
                    iconURL: message.author.displayAvatarURL() ?? message.author.defaultAvatarURL,
                },
            }),
        ],
    });
    await message.author.send({
        embeds: [
            embed({
                title: "Antwoord",
                description: message.content,
            }),
        ],
    });
    await message.channel.send({ content: `${message.author}, Answer successfully submitted! ✅` });
    await message.delete();

    await msg.react("✅");
    await msg.react("❌");

    // const filter = (reaction: MessageReaction, user: User) => {
    //     console.log("HERE");
    //     return ["✅", "❌"].includes(reaction.emoji.name!);
    // };
};
