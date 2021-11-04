import logger from "../lib/logger";
import Module from "../structures/Module";

export default new Module({
    name: "interaction",
    event: "interactionCreate",
    async run(_, interaction) {
        if (interaction.isButton()) {
            return console.log(interaction.customId);
        }

        if (!interaction.isCommand()) return;

        const command = interaction.client.slashCommands.get(interaction.commandName);

        try {
            command?.execute(interaction);
        } catch (error) {
            logger.error(error);
        } finally {
            const author = interaction.user;
            logger.info(`${author.tag} (${author.id}) ran a (/) command: '${command?.name}'`);
        }
    },
});
