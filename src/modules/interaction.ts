import { Module } from "@/lib";

export default new Module({
  name: "interaction",
  event: "interactionCreate",
  async run(_, interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    try {
      command?.execute(interaction);
    } catch (error) {
      console.error(error);
    } finally {
      const author = interaction.user;
      console.info(`${author.tag} (${author.id}) ran a (/) command: '${command?.name}'`);
    }
  },
});
