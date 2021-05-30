import Command from "../lib/Command";
import { embed } from "../utils/helpers";

export default new Command({
  name: "snipe",
  description: "Snipe the most recent deleted command",
  execute(client, message) {
    const msg = client.snipes.get(message.channel.id);
    return message.channel.send(
      embed({
        author: { name: msg?.author?.toString(), iconURL: msg?.member?.user.displayAvatarURL() },
        description: msg!.content!,
        footer: { text: "🎯 Get sniped lol" },
        timestamp: Date.now(),
      })
    );
  },
});
