import { Client, Message } from "discord.js";
import { CHANNELS, USERS } from "../utils/constants";
import { embed } from "../utils/helpers";

const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.channel.id != CHANNELS.ANTWOORDEN || message.author.bot) return;
  const member = await client.users.fetch(USERS.JESSE);
  await member.send(
    embed(
      {
        description: message.content,
        author: {
          name: message.author.username,
          iconURL: message.author.displayAvatarURL() ?? message.author.defaultAvatarURL,
        },
      },
      message
    )
  );
  await message.reply("Answer successfully submitted! ✅");
  await message.delete({ timeout: 1000 });
};
