import { gif } from "../../lib/helpers";
import SlashCommand from "../../modules/SlashCommand";

export default new SlashCommand({
    name: "dab",
    description: "Sends a random dab gif in chat",
    async execute(interaction) {
        const url = await gif("dab");
        interaction.reply(url);
    },
});
