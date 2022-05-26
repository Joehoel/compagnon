import SlashCommand, { OptionType } from "../structures/SlashCommand";
import mock from "@jbreeze/spongebobify";

export default new SlashCommand({
    name: "mock",
    description: "normal text and convert it to 'NOrmaAl TexT",
    options: [
        { description: "The text to mock", name: "text", type: OptionType.STRING, required: true },
    ],
    async execute(interaction) {
        const text = interaction.options.getString("text")!;
        return interaction.reply({ ephemeral: true, content: mock()(text) });
    },
});
