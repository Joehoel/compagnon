import { MessageEmbed } from "discord.js";
import Reddit from "../lib/reddit";
import Command from "../utils/Command";
import { meme } from "../utils/helpers";

export default new Command({
  name: "meme",
  description: "Shows a random lit meme from the provided subreddit (defaults to 'r/dankmemes')",
  usage: "<sub>",
  aliases: ["m"],
  async execute(client, message, [subreddit]) {
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

    return message.channel.send(embed);
  },
});
