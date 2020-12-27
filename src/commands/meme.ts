import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import Command from "../utils/Command";

export default new Command({
    name: "meme",
    description: "Shows a random lit meme",
    async execute(client, message, args) {
        const response = await fetch(
            `https://reddit.com/r/dankmemes/random.json?limit=1`,
        );

        const data = await response.json();

        const { title, url, created_utc } = data[0].data.children[0].data;

        const embed = new MessageEmbed()
            .setColor("#ffc600")
            .setTitle(title)
            .setImage(url)
            .setTimestamp(new Date(created_utc * 1000));

        message.channel.send(embed);
    },
});
