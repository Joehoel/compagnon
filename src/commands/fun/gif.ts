import { Command, gif } from "@/lib";
import { ApplicationCommandOptionType } from "discord-api-types/v9";

export default new Command({
  name: "gif",
  description: "Sends a random GIF in chat",
  options: [
    {
      name: "tag",
      description: "Tag to search a gif for",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(_, interaction) {
    const tag = interaction.options.getString("tag")!;
    const url = await gif(tag);
    interaction.reply({ content: url, ephemeral: false });
    return;
  },
});
