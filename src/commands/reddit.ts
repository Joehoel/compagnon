import Reddit from "@/lib/reddit";
import { ApplicationCommandOptionType } from "discord-api-types/v9";
import { MessageEmbed } from "discord.js";
import Command from "../lib/Command";

export default new Command({
  name: "reddit",
  description: "get a hot post from reddit",
  options: [
    {
      name: "subreddit",
      description: "the subreddit you want to get a post from",
      type: ApplicationCommandOptionType.String,
    },
  ],
  async execute(_, interaction) {
    const subreddit = interaction.options.getString("subreddit") ?? "memes";

    const reddit = new Reddit(subreddit);
    // const { title, url, date, author, sub, post } = await meme(subreddit);
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
