import { Interaction } from "discord.js";

export default async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.slashCommands.get(interaction.commandName);
  return command?.execute(interaction);
};
