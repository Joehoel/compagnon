import { ApplicationCommandOptionType } from "discord-api-types/v9";
import Uwuifier from "uwuifier";
import Command from "../../lib/Command";

const uwu = new Uwuifier();

export default new Command({
  name: "uwu",
  description: "uwuify a sentence",
  options: [
    {
      description: "the sentence to uwuify",
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "sentence",
    },
  ],
  execute(_, interaction) {
    return interaction.reply({
      content: uwu.uwuifySentence(interaction.options.getString("sentence")!),
    });
  },
});
