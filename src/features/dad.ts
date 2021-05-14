import { Client, Message } from "discord.js";

const { PREFIX } = process.env;

export default async (_: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.author.bot) return;
  const text = message.content.toLowerCase();

  const tests = ["ik ben", "i am"];
  const regex = new RegExp(`${tests.join("|")}`, "gi");
  const match = text.match(regex);

  if (match) {
    const words = text.split(" ");
    const index = words.indexOf(match[0].split(" ")[0]) + 2;
    const name = words.slice(index).join(" ");
    message.channel.send(`Hallo ${name}, Ik ben compagnon :wave:`);
  }
};
