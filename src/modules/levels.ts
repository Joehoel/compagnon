import { Module, nameof } from "@/lib";
import { db } from "@/lib/db";
import { differenceInMinutes } from "date-fns";
import { Guild } from "discord.js";

const messages = new Map<string, number[]>();
const voice = new Map<string, [Date, Date | undefined]>();
const timer = new Map<string, string>();

export default new Module({
  name: "levels",
  event: "ready",
  async run(client) {
    const minute = new Date().getMinutes();

    client.on("messageCreate", async (message) => {
      if (message.channel.type == "DM") return;
      if (message.author.bot) return;

      const guildId = message.guild?.id;

      if (!guildId) {
        console.error(`Could't find 'guildId' for message.`);

        return;
      }

      const levels = await db.level.findFirst({ where: { discordId: message.author.id, guildId } });

      if (!levels) {
        await db.level.create({ data: { discordId: message.author.id, guildId } });
        return;
      }

      // Check if the user has sent a message in the current minute
      const sent = messages.get(message.author.id) ?? [];

      if (!sent.includes(minute)) {
        messages.set(message.author.id, [...sent, minute]);

        // TODO: Make reusable
        const amount = 100 + levels.level * 100;
        const needed = levels.level * levels.level * 100;

        // const amount = 1000000;
        const level = Math.floor(0.1 * Math.sqrt(levels.xp));

        // Add xp to the user
        await db.level.update({
          where: {
            discordId_guildId: {
              discordId: message.author.id,
              guildId,
            },
          },
          data: { xp: levels.xp + amount, level },
        });

        console.log(`${amount}/${needed} (${levels.level})`);

        const hasLeveledUp = level > levels.level;

        if (hasLeveledUp) {
          await message.reply(`Gefeliciteerd! Je bent nu level \`${level}\` 🎉`);

          return;
        }
      }
    });

    // client.on("voiceStateUpdate", async (oldState, newState) => {
    //   // TODO: implement
    // }
  },
});
