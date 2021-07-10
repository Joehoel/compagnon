import Command from "../modules/Command";
import { gif } from "../lib/helpers";

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
