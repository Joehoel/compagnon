import { Client, Message, PartialMessage } from "discord.js";

export default async (client: Client, message: Message | PartialMessage) => {
  try {
    if (message?.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author?.tag,
      member: message.member,
      image: message.attachments.first() ? message.attachments.first()?.proxyURL : null,
    });
  } catch (error) {
    client.logger.error(error);
  }
};
