import { ROLES } from "@/lib/contants";
import { CronJob } from "cron";
import { Client, TextChannel } from "discord.js";
import { Question } from "../entity/Question";

const id = "880154232886550609";

const getDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0, 0).toUTCString();
};

export default async (client: Client) => {
    const question = await Question.findOne({ where: { date: getDate() } });

    const job = new CronJob("0 9 * * *", async () => {
        const channel = (await client.channels.fetch(id, { cache: true, force: true })) as TextChannel;
        channel.send(`<@&${ROLES.CONTESTANT}> ${question!.text}`);
    });
    job.start();

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
