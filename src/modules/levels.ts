import { Module } from "@/lib";
import { db } from "@/lib/db";
import { differenceInMinutes } from "date-fns";

const { PREFIX } = process.env;

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
      if (message.content.startsWith(PREFIX) || message.author.bot) return;

      const levels = await db.level.findFirst({ where: { discordId: message.author.id } });

      if (!levels) {
        await db.level.create({ data: { discordId: message.author.id } });
        return;
      }

      // Check if the user has sent a message in the current minute
      const sent = messages.get(message.author.id) ?? [];

      if (!sent.includes(minute)) {
        messages.set(message.author.id, [...sent, minute]);

        // TODO: Make reusable
        const amount = 100 + levels.level * 100;
        const level = Math.floor(0.1 * Math.sqrt(amount));

        // Add xp to the user
        await db.level.update({
          where: { discordId: message.author.id },
          data: { xp: levels.xp + amount, level },
        });
      }
    });

    client.on("voiceStateUpdate", async (oldState, newState) => {
      // TODO: implement
    }
  },
});
