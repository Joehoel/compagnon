import { Module } from "@/lib";

const { PREFIX } = process.env;

export default new Module({
  name: "levels",
  event: "messageCreate",
  async run(client, message) {
    // TODO: implement

    if (message.channel.type == "DM") return;
    if (message.content.startsWith(PREFIX) || message.author.bot) return;

    const text = message.content.toLowerCase();
  },
});
