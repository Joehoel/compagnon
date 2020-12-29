import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";
import { meme } from "../utils/helpers";

export default new Command({
    name: "meme",
    description: "Shows a random lit meme",
    async execute(client, message, args) {
        const { title, url, date, author, sub, post } = await meme(args[0]);

        const embed = new MessageEmbed()
            .setColor("#ffc600")
            .setTitle(title)
            .setDescription(sub)
            .setFooter(author)
            .setURL(post)
            .setImage(url)
            .setTimestamp(date);

        message.channel.send(embed);
    },
});
