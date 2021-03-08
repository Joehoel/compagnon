import Filter from "bad-words";
import { Client, Message } from "discord.js";
import fs from "fs";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  if (message.content.startsWith(PREFIX) || message.author.bot) return;

  const file = fs.readFileSync("./src/features/badwords.txt", { encoding: "utf-8" });
  const words = file.split(", ").map((word) => word.toLowerCase());

  const filter = new Filter();
  filter.addWords(...words);

  if (filter.isProfane(message.content)) {
    client.commands.get("mute")?.execute(client, message, [message.author.toString(), "1", "m"]);
    return message.reply("Ga je mond wassen! 🧼");
  }
};
