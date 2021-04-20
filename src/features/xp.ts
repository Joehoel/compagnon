import Levels from "discord-xp";
import { Client, Message } from "discord.js";
import { ROLES } from "../utils/constants";
import { embed, giveRole } from "../utils/helpers";

const { MONGO_URI } = process.env;

Levels.setURL(MONGO_URI);

// Level system using discord-xp
export default async (_: Client, message: Message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const user = await Levels.fetch(message.author.id, message.guild.id);
  const isChad = user.xp >= 42069 && user.xp <= 42169;

  if (isChad) {
    message.channel.send(
      embed(
        {
          title: "Congratulations",
          description: `You have reached \`42069\` xp\nYou now have one of the biggest dicks in this server! 🍆 \nAs a reward you have been promoted to <@&${ROLES.CHAD}>`,
          thumbnail: { url: "https://cdn.discordapp.com/attachments/521379692163366921/834025604675665930/66f-1.png" },
        },
        message
      )
    );

    giveRole(message.member!, ROLES.CHAD);
  }

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
  }
};
