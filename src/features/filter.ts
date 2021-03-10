import Filter from "bad-words";
import { Client, Message } from "discord.js";
import fs from "fs";
import { fuck } from "../utils/helpers";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.author.bot) return;
  const text = message.content.toLowerCase();
  // if (text.includes("fuck") && message?.mentions?.members?.first()?.user) {
  //   fuck(message.author, message.mentions.members?.first()!.user);
  // }

  const filter = new Filter();
  const lists = {
    nl: "./src/features/scheldwoorden-nl.txt",
    en: "./src/features/scheldwoorden-en.txt",
  };

  Object.values(lists).forEach((path) => {
    const file = fs.readFileSync(path, { encoding: "utf-8" });
    const words = file.split(", ").map((word) => word.toLowerCase().trim());
    filter.addWords(...words);
  });

  if (filter.isProfane(message.content)) {
    client.commands.get("mute")?.execute(client, message, [message.author.toString(), "1", "m"]);
    return message.reply("Ga je mond wassen! 🧼");
  }
};
