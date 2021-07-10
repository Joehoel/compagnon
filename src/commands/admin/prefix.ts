import { Config } from "../../entity/Config";
import { createGuildConfig } from "../../lib/helpers";
import Command from "../../modules/Command";

export default new Command({
  name: "prefix",
  description: "Change the server prefix",
  admin: true,
  args: true,
  usage: "<prefix>",
  async execute(client, message, args) {
    const guildId = message.guild!.id;
    const newPrefix = args[0];
    const config = await Config.findOne({ where: { guild: { id: guildId } } });
    if (!config) {
      const newConfig = await createGuildConfig(message.guild!);
      await Config.update({ id: newConfig?.id }, { prefix: newPrefix });
    }
    await Config.update({ id: config?.id }, { prefix: newPrefix });
    if (config) {
      client.config.set(guildId, { ...config, prefix: newPrefix });
    }
  },
});
