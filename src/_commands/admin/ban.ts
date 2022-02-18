import { MessageActionRow, MessageComponentInteraction } from "discord.js";
import { ROLES } from "../../lib/contants";
import SlashCommand, { OptionType, PermissionType } from "../../structures/SlashCommand";

export default new SlashCommand({
    name: "ban",
    description: "Ban a user",
    options: [
        {
            name: "user",
            description: "Target user to ban",
            type: OptionType.USER,
            required: true,
        },
        {
            name: "days",
            description: "Number of days to ban the user for",
            type: OptionType.NUMBER,
            required: false,
        },
        {
            name: "reason",
            description: "Reason why the user is getting banned",
            type: OptionType.STRING,
            required: false,
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
        const user = interaction.options.getUser("user")!;
        const days = interaction.options.getNumber("days")!;
        const reason = interaction.options.getString("reason")!;

        const row = new MessageActionRow({
            components: [
                { customId: "ban-yes", label: "Yes", style: "SUCCESS", type: "BUTTON" },
                { customId: "ban-no", label: "No", style: "DANGER", type: "BUTTON" },
            ],
        });

        await interaction.reply({
            content: `Are you sure you want to ban ${user}?`,
            components: [row],
            ephemeral: true,
        });

        const filter = ({ customId, user }: MessageComponentInteraction) =>
            customId.includes("ban") && user.id === interaction.member?.user.id;

        const collector = interaction.channel?.createMessageComponentCollector({
            filter,
            time: 15000,
        });

        collector?.on("collect", async ({ customId }) => {
            if (customId === "ban-yes") {
                await interaction.guild?.members.ban(user, { days, reason });
            } else if (customId === "ban-no") {
                await interaction.channel?.send({ content: "Cancelling..." });
            }
        });
    },
});
