import { Module } from "@/lib";

const { PREFIX } = process.env;

export default new Module({
  name: "i-hardly-know-her",
  event: "messageCreate",
  async run(_, message) {
    if (message.channel.type == "DM") return;

    if (message.content.startsWith(PREFIX) || message.author.bot) return;
    const text = message.content.toLowerCase();

    // Loop over every word in the message
    text.split(" ").forEach((word: string) => {
      // Detect if the words ends with "er" and is longer than or equal to 4 characters
      if (word.length >= 4) {
        if (word.slice(word.length - 2) == "er") {
          // Comedy is dead
          return message.reply(
            `${word.charAt(0).toLocaleUpperCase()}${word.slice(1)}? I hardly know her!`
          );
        }
      }
    });
  },
});
