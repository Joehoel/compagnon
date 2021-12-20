import { embed } from "../lib/helpers";
import SlashCommand from "../structures/SlashCommand";
import { Message } from "discord.js";

export default new SlashCommand({
    name: "ping",
    description: "Pong!!!",
    async execute(interaction) {
        const message = (await interaction.reply({
            embeds: [
                embed({
                    description: `**Pong!**`,
                }),
            ],
            fetchReply: true,
        })) as Message;

        const ping = message.createdTimestamp - interaction.createdTimestamp!;

        await message.edit({
            embeds: [
                embed({
                    description: `**Pong!** \`${ping}ms\``,
                }),
            ],
        });
    },
});
