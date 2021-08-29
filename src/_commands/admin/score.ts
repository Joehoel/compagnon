import { Brain } from "../../entity/Brain";
import SlashCommand, { CommandType } from "../../modules/SlashCommand";

export default new SlashCommand({
    name: "score",
    description: "Update users score for the quizcorner",
    options: [
        {
            name: "user",
            description: "The user to update the score from",
            type: CommandType.USER,
            required: true,
        },
        {
            name: "value",
            description: "Value to update the score to",
            type: CommandType.NUMBER,
            required: true,
        },
    ],
    async execute(interaction) {
        const user = interaction.options.getUser("user")!;
        const value = interaction.options.getNumber("value")!;

        const brain = await Brain.findOne({ where: { user: user?.toString() } });
        if (brain) {
            await Brain.update({ user: brain.user }, { score: value });
            return interaction.reply({ content: `Successfully updated score to: ${value}` });
        }
    },
});
