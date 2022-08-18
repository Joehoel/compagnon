import { Command } from "@/lib";
import {
  APIInteraction,
  APIInteractionGuildMember,
  ApplicationCommandOptionType,
} from "discord-api-types/v9";
import { Guild, GuildMember } from "discord.js";

export default new Command({
  name: "play",
  description: "Plays a song!",
  options: [
    {
      name: "query",
      type: ApplicationCommandOptionType.String,
      description: "The song you want to play",
      required: true,
    },
  ],
  async execute({ player }, interaction) {
    const query = interaction.options.getString("query")!;
    const member = interaction.member as GuildMember;

    if (!member.voice.channelId)
      return await interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    if (
      interaction.guild?.me?.voice.channelId &&
      member.voice.channelId !== interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });
    const queue = player.createQueue(interaction.guild!, {
      metadata: {
        channel: interaction.channel,
      },
    });

    // verify vc connection
    try {
      if (!queue.connection) await queue.connect(member.voice.channel!);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: "Could not join your voice channel!",
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
