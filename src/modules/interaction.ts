import { Module } from "@/lib";

export default new Module({
  name: "interaction",
  event: "interactionCreate",
  async run(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    try {
      await command?.execute(client, interaction);
    } catch (error) {
      console.error(error);
    } finally {
      const author = interaction.user;
      console.info(`${author.tag} (${author.id}) ran a (/) command: '${command?.name}'`);
    }
  },
});
