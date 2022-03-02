import { ROLES } from "../../lib/constants";
import { sendAnswer, sendQuestion } from "../../lib/helpers";
import SlashCommand, { PermissionType } from "../../structures/SlashCommand";

export default new SlashCommand({
    name: "question",
    description: "Manually send the daily question",
    permissions: [
        {
            id: ROLES.MODERATOR,
            type: PermissionType.ROLE,
            permission: true,
        },
    ],
    async execute(interaction) {
        sendAnswer(interaction.client);
        sendQuestion(interaction.client);
        return interaction.reply({
            ephemeral: true,
            content: "Successfully send answer and question",
        });
    },
});
