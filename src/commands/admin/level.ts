import Levels from "discord-xp";
import Command from "../../utils/Command";
import { GUILD_ID } from "../../utils/constants";
import { embed } from "../../utils/helpers";

enum Type {
  SET = "set",
  APPEND = "append",
}

export default new Command({
  name: "level",
  description: "Level command to update / append levels to a user",
  permissions: ["MANAGE_GUILD"],
  aliases: ["lvl"],
  args: true,
  usage: "<target [set/append] level>",
  async execute(client, message, args) {
    const target = message.mentions.users.first() || message.author;

    const [_, type, lvl] = args.map((arg, i) => {
      if (i !== args.length - 1) return arg.toLowerCase();
      return arg;
    });

    switch (type) {
      case Type.SET:
        Levels.setLevel(target.id, GUILD_ID, parseInt(lvl));
        return message.channel.send(
          embed({
            title: "Level",
            description: `Successfully updated ${target}'s level to **${Math.floor(parseInt(lvl))}**`,
            timestamp: Date.now(),
          })
        );

      default:
        break;
    }
  },
});
