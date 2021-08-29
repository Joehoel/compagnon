import { scoreboard } from "../../lib/helpers";
import SlashCommand from "../../modules/SlashCommand";

export default new SlashCommand({
    name: "scoreboard",
    description: "Gets the scoreboard",
    async execute(interaction) {
        return interaction.channel?.send({
            content: await scoreboard(),
        });
    },
});
