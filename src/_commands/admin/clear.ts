import { ROLES } from "../../lib/contants";
import { wait } from "../../lib/helpers";
import SlashCommand, { OptionType, PermissionType } from "../../modules/SlashCommand";
import { GuildMember, Message, TextChannel } from "discord.js";

export default new SlashCommand({
    name: "clear",
    description: "Clear the chat",
    options: [
        {
            name: "amount",
            type: OptionType.NUMBER,
            required: true,
            description: "Amount of messages to clear from the chat",
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

        const amount = interaction.options.getNumber("amount")!;

        if (amount > 101) {
            return interaction.reply({ content: "You can`t delete more than 100 messages at once!", ephemeral: true });
        }

        if (amount < 1) {
            return interaction.reply({ content: "You have to delete at least 1 message!", ephemeral: true });
        }

        await interaction.channel!.messages.fetch({ limit: amount }).then((messages) => {
            (interaction.channel as TextChannel).bulkDelete(messages);
        });

        const message = (await interaction.reply({
            content: `Successfully deleted **${amount}** messages!`,
            fetchReply: true,
        })) as Message;

        await wait(2000);
        return message.delete();
    },
});
