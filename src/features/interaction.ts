import { Interaction } from "discord.js";

export default async (interaction: Interaction) => {
    if (interaction.isButton()) {
        return console.log(interaction.customId);
    }

    if (!interaction.isCommand()) return;

    const command = interaction.client.slashCommands.get(interaction.commandName);

    try {
        command?.execute(interaction);
    } catch (error) {
        interaction.client.logger.error(error);
    } finally {
        const author = interaction.user;
        interaction.client.logger.info(`${author.tag} (${author.id}) ran a (/) command: '${command?.name}'`);
    }
};
