import Command from "@/Command";
import { ApplicationCommandOptionType } from "discord-api-types/v9";

export default new Command({
  name: "avatar",
  description: "Get the avatar of a user",
  options: [
    {
      name: "user",
      description: "The user to get the avatar of",
      type: ApplicationCommandOptionType.User,
    },
  ],
  execute(interaction) {
    const user = interaction.options.getUser("user")!;

    if (user) {
      interaction.reply(`${user.username}'s avatar: ${user.avatarURL()}`);
    } else {
      interaction.reply(`Your avatar: ${interaction.user.avatarURL()}`);
    }
  },
});
