import { wait } from "@/lib/helpers";
import SlashCommand, { CommandType } from "@/modules/SlashCommand";
import { Message, TextChannel } from "discord.js";

export default new SlashCommand({
  name: "clear",
  description: "Clear the chat",
  options: [
    {
      name: "amount",
      type: CommandType.NUMBER,
      required: true,
      description: "Amount of messages to clear from the chat",
    },
  ],
  async execute(interaction) {
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
