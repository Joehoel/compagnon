import { capitalize, Module } from "@/lib";
import DetectLanguage from "detectlanguage";

const dl = new DetectLanguage(process.env.DETECT_LANGUAGE_API_KEY);

export default new Module({
  name: "i-hardly-know-her",
  event: "messageCreate",
  async run(_, message) {
    if (message.channel.type == "DM" || message.author.bot) return;
    const text = message.content.toLowerCase();

    const words = text.split(" ");
    const word = words.find((word) => word.endsWith("er"));

    if (!word) return;

    const results = await dl.detect(message.content);
    const result = results.find((r) => r.isReliable);

    if (result?.language !== "en" || !result) return;

    if (word.length >= 4) {
      // Comedy is dead
      return message.reply(`${capitalize(word)}? I hardly know her!`);
    }
  },
});
