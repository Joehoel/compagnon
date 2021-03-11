import { Swear } from "../entity/Swear";
import Command from "../utils/Command";
import { embed } from "../utils/helpers";

export default new Command({
  name: "swears",
  description: "Display swear counter",
  args: true,
  usage: "<@>",
  async execute(client, message, args) {
    const target = message.mentions.members?.first() || message.author;
    const swear = await Swear.findOne({ where: { user: target?.toString() } });
    return message.channel.send(embed({ title: "Swears", description: `\`${swear?.swears}\`` }, message));
  },
});
