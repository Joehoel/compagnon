import { Config } from "../../entity/Config";
import { createGuildConfig } from "../../lib/helpers";
import Command from "../../modules/Command";

export default new Command({
  name: "color",
  description: "Change the server color",
  admin: true,
  args: true,
  usage: "<color>",
  async execute(client, message, args) {
    const guildId = message.guild!.id;
    const newColor = args[0];
    const config = await Config.findOne({ where: { guild: { id: guildId } } });
    if (!config) {
      const newConfig = await createGuildConfig(message.guild!);
      await Config.update({ id: newConfig?.id }, { color: newColor });
    }
    await Config.update({ id: config?.id }, { color: newColor });
    if (config) {
      client.config.set(guildId, { ...config, color: newColor });
    }
  },
});
