import { Message } from "discord.js";
import { CHANNELS, USERS } from "../lib/contants";
import { embed } from "../lib/helpers";
import Bot from "../structures/Bot";

const { PREFIX } = process.env;

export default async (client: Bot, message: Message) => {
    // const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

    if (
        message.content.startsWith(PREFIX) ||
        message.channel.id != CHANNELS.ANTWOORDEN ||
        message.author.bot
    )
        return;

    const member = await client.users.fetch(USERS.JESSE);
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
    // await message.author.send({
    //     embeds: [
    //         embed({
    //             title: "Antwoord",
    //             description: message.content,
    //         }),
    //     ],
    // });
    await message.channel.send({ content: `${message.author}, Answer successfully submitted! ✅` });
    await message.delete();

    await msg.react("✅");
    await msg.react("❌");
};
