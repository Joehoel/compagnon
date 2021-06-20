import { Swear } from "../entity/Swear";
import Command from "../modules/Command";
import { embed } from "../lib/helpers";

export default new Command({
  name: "swears",
  description: "Display swear counter",
  usage: "<@>",
  exclusive: true,
  async execute(_, message) {
    const target = message.mentions.members?.first() || message.author;
    const swear = await Swear.findOne({ where: { user: target?.toString() } });

    const user = message.mentions.members?.first()?.user || message.author;

    return message.channel.send(
      embed({
        title: "Swears",
        author: { name: user.username, iconURL: user.displayAvatarURL() },
        description: `\`${swear?.swears}\``,
      })
    );
  },
});
