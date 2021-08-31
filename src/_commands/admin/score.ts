import { CHANNELS, GUILD_ID, ROLES, SCOREBOARD_MESSAGE_ID } from "../../lib/contants";
import { scoreboard } from "../../lib/helpers";
import { GuildMember, TextChannel } from "discord.js";
import { Brain } from "../../entity/Brain";
import SlashCommand, { OptionType, PermissionType } from "../../modules/SlashCommand";

export default new SlashCommand({
    name: "score",
    description: "Update users score for the quizcorner",
    options: [
        {
            name: "user",
            description: "The user to update the score from",
            type: OptionType.USER,
            required: true,
        },
        {
            name: "value",
            description: "Value to update the score to",
            type: OptionType.NUMBER,
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
        const { client } = interaction;

        const member = interaction.member as GuildMember;
        if (!member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "Sorry, you are not allowed to execute that command!" });
        }
        const user = interaction.options.getUser("user")!;
        const value = interaction.options.getNumber("value")!;

        const brain = await Brain.findOne({ where: { user: user?.toString() } });
        if (brain) {
            await Brain.update({ user: brain.user }, { score: value });

            // TODO: Functie van maken
            // Update scoreboard
            const scoreboardChannel = (await client.guilds.cache
                .get(GUILD_ID)
                ?.channels.cache.get(CHANNELS.REGELS_EN_LEADERBOARD)
                ?.fetch()) as TextChannel;

            const messages = await scoreboardChannel.messages.fetch({
                around: SCOREBOARD_MESSAGE_ID,
                limit: 1,
            });
            const message = messages.first();
            await message?.edit({ content: await scoreboard() });

            return interaction.reply({ content: `Successfully updated score to: ${value}` });
        }
    },
});
