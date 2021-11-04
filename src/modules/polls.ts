import { CHANNELS } from "../lib/contants";
import Module from "../structures/Module";

export default new Module({
    name: "polls",
    event: "messageCreate",
    async run(client, message) {
        if (message.channel.type == "DM") return;
        // const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;
        const prefix = client.prefix;

        if (message.channel.id == CHANNELS.POLLS) {
            if (!message.content.startsWith(`${prefix}poll`) && !message.author.bot) {
                await message.delete();
            }
        }
    },
});
