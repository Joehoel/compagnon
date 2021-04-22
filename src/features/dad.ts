import { Client, Message } from "discord.js";

const { PREFIX } = process.env;

export default async (_: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.author.bot) return;
  const text = message.content.toLowerCase();

  const tests = ["ik ben", "i am", "i'm"];
  const regex = new RegExp(`${tests.join("|")}`, "gi");

  if (text.match(regex)) {
    const match = text.match(regex);
    const words = text.split(" ");
    const index = words.indexOf(match![0]) + 3;
    const name = words.slice(index).join(" ");
    message.channel.send(`Hallo ${name}, Ik ben compagnon :wave:`);
  }
};
