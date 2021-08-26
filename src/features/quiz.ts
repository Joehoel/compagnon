import { questions } from "@/lib/contants";
import redis from "@/lib/redis";
import { Client, Message } from "discord.js";

const { PREFIX } = process.env;

const id = "880154232886550609";

export default async (client: Client, message: Message) => {
    if (message.author.bot) return;
    const db = await redis();
    db.set("quiz", JSON.stringify({ index: 10, date: Date.now() }));
    db.get("quiz", (_, val) => JSON.parse(val!));
    await message.channel.send(questions[0]);
    // if (message.channel.type == "DM") return;
    // const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;
    // if (message.content.startsWith(prefix) || message.channel.id != CHANNELS.ANTWOORDEN || message.author.bot) return;
    // const member = await client.users.fetch(USERS.JESSE);
    // await member.send({
    //     embeds: [
    //         embed({
    //             description: message.content,
    //             author: {
    //                 name: message.author.username,
    //                 iconURL: message.author.displayAvatarURL() ?? message.author.defaultAvatarURL,
    //             },
    //         }),
    //     ],
    // });
    // await message.author.send({
    //     embeds: [
    //         embed({
    //             title: "Antwoord",
    //             description: message.content,
    //         }),
    //     ],
    // });
    // await message.reply("Answer successfully submitted! ✅");
    // await message.delete();
};
