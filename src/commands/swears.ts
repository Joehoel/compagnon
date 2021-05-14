import { Swear } from "../entity/Swear";
import Command from "../utils/Command";
import { embed } from "../utils/helpers";

export default new Command({
  name: "swears",
  description: "Display swear counter",
  usage: "<@>",
  async execute(_, message, args) {
    const target = message.mentions.members?.first() || message.author;
    const swear = await Swear.findOne({ where: { user: target?.toString() } });

    const user = message.mentions.members?.first()?.user || message.author;

    return message.channel.send(
      embed(
        {
          title: "Swears",
          author: { name: user.username, iconURL: user.displayAvatarURL() },
          description: `\`${swear?.swears}\``,
        },
        message
      )
    );
  },
});
