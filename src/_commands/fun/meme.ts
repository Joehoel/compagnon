import Reddit from "@/lib/reddit";
import SlashCommand, { OptionType } from "@/modules/SlashCommand";
import { MessageEmbed } from "discord.js";

export default new SlashCommand({
    name: "meme",
    description: "Shows a random lit meme from the provided subreddit (defaults to 'r/dankmemes')",
    options: [{ name: "sub", description: "subreddit", type: OptionType.STRING, required: false }],
    async execute(interaction) {
        const subreddit = interaction.options.getString("sub") ?? "dankmemes";

        const reddit = new Reddit(subreddit);
        const { title, url, date, author, sub, link } = await reddit.getRandomHotPost();

        const embed = new MessageEmbed()
            .setColor("#ffc600")
            .setTitle(title)
            .setDescription(sub)
            .setFooter(author)
            .setURL(link)
            .setImage(url)
            .setTimestamp(date);

        return interaction.reply({ embeds: [embed] });
    },
});
