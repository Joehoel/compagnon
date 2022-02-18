import SlashCommand, { OptionType } from "../../structures/SlashCommand";
import { Guild, GuildMember, VoiceChannel } from "discord.js";

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
        const player = interaction.client.player;
        const query = interaction.options.getString("query")!;
        const member = interaction.member as GuildMember;
        const queue = player.createQueue(interaction.guild!, {
            metadata: {
                channel: interaction.channel,
            },
        });

        try {
            if (!queue.connection) await queue.connect(member.voice.channel as VoiceChannel);
        } catch {
            queue.destroy();
            return await interaction.reply({
                content: "🚫 | Could not join your voice channel!",
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        const track = await player
            .search(query, {
                requestedBy: interaction.user,
            })
            .then((x) => x.tracks[0]);
        if (!track)
            return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    },
});
