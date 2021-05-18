import Command from "@/utils/Command";
import { gif } from "@/utils/helpers";

export default new Command({
  name: "gif",
  args: true,
  usage: "<tag>",
  description: "Sends a random GIF in chat",
  aliases: ["g"],
  async execute(client, message, args) {
    const url = await gif(args.join(" "));
    message.channel.send(url);
  },
});
