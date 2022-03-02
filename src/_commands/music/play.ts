import { GuildMember, GuildTextBasedChannel } from "discord.js";
import SlashCommand, { OptionType } from "../../structures/SlashCommand";

export default new SlashCommand({
    name: "play",
    description: "Play a song",
    options: [
        {
            name: "query",
            type: OptionType.STRING,
            description: "The song you want to play",
            required: true,
        },
    ],
    async execute(interaction) {
        const query = interaction.options.getString("query")!;
        const member = interaction.member as GuildMember;
        const voiceChannel = member?.voice.channel;
        if (!voiceChannel) throw new Error("NotInVoice");

        await interaction.client.music.play(voiceChannel, query, {
            textChannel: interaction.channel as GuildTextBasedChannel,
            member: interaction.member as GuildMember,
        });
    },
});
