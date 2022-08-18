import { Command } from "@/lib";
import { lyricsClient } from "@/lib/lyrics";
import { ApplicationCommandOptionType } from "discord-api-types/v9";
import { MessageEmbed } from "discord.js";

export default new Command({
  name: "lyrics",
  description: "Get the lyrics of a song",
  options: [
    {
      name: "query",
      type: ApplicationCommandOptionType.String,
      description: "The song you want to get the lyrics of",
      required: true,
    },
  ],

  async execute({ player }, interaction) {
    const query = interaction.options.getString("query")!;
    const { lyrics, title, artist, image, thumbnail, url } = await lyricsClient.search(query);
    if (!lyrics) {
      return await interaction.reply({
        content: "Could not find any lyrics for that song!",
        ephemeral: true,
      });
    }

    const embed = new MessageEmbed({
      title: `${title} - ${artist.name}`,
      description: lyrics,
      thumbnail: { url: image },
      url,
    });

    await interaction.reply({ embeds: [embed] });
  },
});
