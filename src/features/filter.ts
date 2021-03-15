import Filter from "bad-words";
import { Client, Message } from "discord.js";
import fs from "fs";
import { Swear } from "../entity/Swear";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.author.bot) return;
  const text = message.content.toLowerCase();

  const filter = new Filter();

  const lists = {
    nl: "./src/features/scheldwoorden-nl.txt",
    en: "./src/features/scheldwoorden-en.txt",
    extra: "./src/features/scheldwoorden.txt",
  };

  Object.values(lists).forEach((path) => {
    const file = fs.readFileSync(path, { encoding: "utf-8" });
    const words = file.split(", ").map((word) => word.toLowerCase().trim());
    filter.addWords(...words);
  });

  filter.removeWords("lol", "hoe", "hoor");

  if (filter.isProfane(text)) {
    const user = message.author.toString();
    client.commands.get("mute")?.execute(client, message, [user, "1", "m"]);

    const swear = await Swear.findOne({ where: { user } });
    if (swear) {
      swear.swears++;
      await swear.save();
    } else {
      const newSwear = new Swear({ user });
      await newSwear.save();
    }

    return message.reply("Ga je mond wassen! 🧼");
  }
};
