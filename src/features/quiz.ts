import { Client, Message } from "discord.js";
import { CHANNELS, USERS } from "../lib/contants";
import { embed } from "../lib/helpers";
import config from "../../config.json";

export default async (client: Client, message: Message) => {
  if (message.content.startsWith(config.prefix) || message.channel.id != CHANNELS.ANTWOORDEN || message.author.bot)
    return;
  const member = await client.users.fetch(USERS.JESSE);
  await member.send(
    embed({
      description: message.content,
      author: {
        name: message.author.username,
        iconURL: message.author.displayAvatarURL() ?? message.author.defaultAvatarURL,
      },
    })
  );
  await message.reply("Answer successfully submitted! ✅");
  await message.delete({ timeout: 1000 });
};
