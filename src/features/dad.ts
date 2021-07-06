import { Client, Message } from "discord.js";

const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.channel.type == "dm") return;
  const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

  if (message.content.startsWith(prefix) || message.author.bot) return;
  const text = message.content.toLowerCase();

  const tests = ["ik ben", "i am"];
  const regex = new RegExp(`${tests.join("|")}`, "gi");
  const match = text.match(regex);

  if (match) {
    const words = text.split(" ");
    const index = words.indexOf(match[match.length - 1].split(" ")[1]) + 1;
    const name = words.slice(index).join(" ");
    message.inlineReply(`Hallo ${name}, ik ben compagnon :wave:`);
  }
};
