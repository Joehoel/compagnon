import { Command } from "@/lib";
import { ApplicationCommandOptionType } from "discord-api-types/v9";
import mock from "@jbreeze/spongebobify";

export default new Command({
  name: "mock",
  description: "normal text and convert it to 'NOrmaAl TexT",
  options: [
    {
      description: "The text to mock",
      name: "text",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(_, interaction) {
    const text = interaction.options.getString("text")!;
    return interaction.reply({ content: mock()(text) });
  },
});
