import Levels from "discord-xp";
import { Client, Message } from "discord.js";

const { MONGO_URI } = process.env;

Levels.setURL(MONGO_URI);

// Level system using discord-xp
export default async (_: Client, message: Message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
  }
};
