import { ROLES } from "../../lib/contants";
import { sendQuestion } from "../../lib/helpers";
import SlashCommand, { PermissionType } from "../../modules/SlashCommand";

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
        return sendQuestion(interaction.client);
    },
});
