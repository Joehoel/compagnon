import { Module } from "@/lib";

const { PREFIX } = process.env;

export default new Module({
  name: "i-hardly-know-her",
  event: "messageCreate",
  async run(_, message) {
    if (message.channel.type == "DM") return;
    if (message.content.startsWith(PREFIX) || message.author.bot) return;

    const text = message.content.toLowerCase();

    const words = text.split(" ");
    const word = words.find((word) => word.endsWith("er"));

    if (!word) return;

    if (word.length >= 4) {
      // Comedy is dead
      return message.reply(
        `${word.charAt(0).toLocaleUpperCase()}${word.slice(1)}? I hardly know her!`
      );
    }
  },
});
