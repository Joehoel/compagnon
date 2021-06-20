import { Client, Message, PartialMessage } from "discord.js";
import Event from "../modules/Event";

export default new Event({
  name: "messageDelete",
  async run(client: Client, message: Message | PartialMessage) {
    if (message?.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author?.tag,
      member: message.member,
      image: message.attachments.first() ? message.attachments.first()?.proxyURL : null,
    });
  },
});
