import { Swear } from "../entity/Swear";
import { embed } from "@/lib/helpers";
import Command from "@/modules/Command";

export default new Command({
  name: "swears",
  description: "Display swear counter",
  usage: "<@>",
  exclusive: true,
  async execute(client, message, args) {
    const target = message.mentions.members?.first() || message.author;
    const swear = await Swear.findOneOrFail({ where: { user: `<@${target.id}>` } });

    const user = message.mentions.members?.first()?.user || message.author;

    return await message.channel.send({
      embeds: [
        embed({
          title: "Swears",
          author: { name: user.username, iconURL: user.displayAvatarURL() },
          description: `\`${swear?.swears ?? "None"}\``,
        }),
      ],
    });
  },
});
