import { gif } from "../../lib/helpers";
import SlashCommand, { OptionType } from "../../modules/SlashCommand";

export default new SlashCommand({
    name: "gif",
    description: "Sends a random GIF in chat",
    options: [{ name: "tag", description: "Tag to search a gif for", type: OptionType.STRING, required: true }],
    async execute(interaction) {
        const tag = interaction.options.getString("tag")!;
        const url = await gif(tag);
        interaction.reply(url);
    },
});
