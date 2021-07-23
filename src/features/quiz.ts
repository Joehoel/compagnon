import { Client, Message } from "discord.js";
import { CHANNELS, USERS } from "../lib/contants";
import { embed } from "../lib/helpers";

const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.channel.type == "dm") return;
  const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

  if (message.content.startsWith(prefix) || message.channel.id != CHANNELS.ANTWOORDEN || message.author.bot) return;

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

  await message.author.send(
    embed({
      title: "Antwoord",
      description: message.content,
    })
  );

  await message.reply("Answer successfully submitted! ✅");
  await message.delete({ timeout: 500 });
};
