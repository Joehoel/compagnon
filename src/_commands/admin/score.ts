import { ROLES } from "@/lib/contants";
import { GuildMember } from "discord.js";
import { Brain } from "../../entity/Brain";
import SlashCommand, { CommandType, PermissionType } from "../../modules/SlashCommand";

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
    permissions: [
        {
            id: ROLES.MODERATOR,
            type: PermissionType.ROLE,
            permission: true,
        },
    ],
    async execute(interaction) {
        const member = interaction.member as GuildMember;
        if (!member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "Sorry, you are not allowed to execute that command!" });
        }
        const user = interaction.options.getUser("user")!;
        const value = interaction.options.getNumber("value")!;

        const brain = await Brain.findOne({ where: { user: user?.toString() } });
        if (brain) {
            await Brain.update({ user: brain.user }, { score: value });
            return interaction.reply({ content: `Successfully updated score to: ${value}` });
        }
    },
});
