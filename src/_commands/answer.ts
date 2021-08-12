import { USERS } from "@/lib/contants";
import { embed } from "@/lib/helpers";
import SlashCommand, { CommandType } from "@/modules/SlashCommand";

export default new SlashCommand({
  name: "answer",
  description: "Answer the question of the day",
  options: [
    {
      name: "answer",
      description: "The answer to the question",
      type: CommandType.STRING,
      required: true,
    },
  ],
  async execute(interaction) {
    const author = interaction.user;

    // Get answer from the interaction
    const answer = interaction.options.getString("answer")!;

    // Reply to only the user that submitted the answer
    interaction.reply({ ephemeral: true, content: answer });

    // TODO: Change to USERS.JESSE
    const member = await interaction.client.users.fetch(USERS.JOEL);

    // Send answer to Jesse
    await member.send({
      embeds: [
        embed({
          description: answer,
          author: {
            name: author.username,
            iconURL: author.displayAvatarURL() ?? author.defaultAvatarURL,
          },
        }),
      ],
    });
  },
});
