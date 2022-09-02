import { Command } from "@/lib";
import { db } from "@/lib/db";
import { Swears } from "@prisma/client";
import { ApplicationCommandOptionType } from "discord-api-types/v9";
import { MessageEmbed } from "discord.js";

export default new Command({
  name: "swears",
  description: "Check a users swear count",
  options: [
    { description: "The user to check", type: ApplicationCommandOptionType.User, name: "user" },
  ],
  async execute(_, interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const swear = await db.swears.findFirst({ where: { discordId: user.id } });

    if (!swear) {
      return interaction.reply(`${user.username} has no swear count`);
    }

    return await interaction.reply({
      embeds: [
        new MessageEmbed({
          title: "Swears",
          author: { name: user.username, iconURL: user.displayAvatarURL() },
          description: `\`${swear?.count ?? "None"}\``,
        }),
      ],
    });
  },
});
