import { here, Module } from "@/lib";
import { db } from "@/lib/db";
import Filter from "bad-words";
import { readFileSync } from "node:fs";

export default new Module({
  name: "swears",
  event: "messageCreate",
  async run(client, message) {
    if (message.channel.type == "DM") return;
    if (message.author.bot) return;

    const text = message.content.toLowerCase();

    const filter = new Filter();

    const lists = {
      nl: here("../../data/scheldwoorden-nl.txt"),
      en: here("../../data/scheldwoorden-en.txt"),
      extra: here("../../data/scheldwoorden.txt"),
    };

    Object.values(lists).forEach((path) => {
      const file = readFileSync(path, { encoding: "utf-8" });
      const words = file.split(", ").map((word) => word.toLowerCase().trim());
      filter.addWords(...words);
    });

    filter.removeWords("lol", "hoe", "hoor", "kunt", "hardcore", "kaas");
    if (filter.isProfane(text)) {
      const guildId = message.guild?.id;

      if (!guildId) {
        console.error("Could't find 'guildId' for message.");

        return;
      }
      // client.commands.get("mute")?.execute(client, message, [user, "1", "m"]);

      const swear = await db.swears.findFirst({
        where: { discordId: message.author.id, guildId },
      });
      if (swear) {
        await db.swears.update({
          where: {
            discordId_guildId: {
              discordId: message.author.id,
              guildId,
            },
          },
          data: { count: swear.count + 1 },
        });
      } else {
        await db.swears.create({
          data: { discordId: message.author.id, guildId, count: 1 },
        });
      }

      return message.reply("Ga je mond wassen! 🧼");
    }
  },
});
