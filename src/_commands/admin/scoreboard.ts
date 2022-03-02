import { ROLES } from "../../lib/constants";
import { scoreboard } from "../../lib/helpers";
import SlashCommand, { PermissionType } from "../../structures/SlashCommand";

export default new SlashCommand({
    name: "scoreboard",
    description: "Gets the scoreboard",
    permissions: [
        {
            id: ROLES.MODERATOR,
            type: PermissionType.ROLE,
            permission: true,
        },
    ],
    async execute(interaction) {
        return interaction.channel?.send({
            content: await scoreboard(),
        });
    },
});
