import { CHANNELS, USERS } from "../lib/constants";
import { embed } from "../lib/helpers";
import Module from "../structures/Module";

const { PREFIX } = process.env;

export default new Module({
    name: "answers",
    event: "messageCreate",
    async run(client, message) {
        const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

        if (
            message.content.startsWith(prefix) ||
            message.channel.id != CHANNELS.ANTWOORDEN ||
            message.author.bot
        )
            return;

        const member = await client.users.fetch(USERS.JESSE);
        const msg = await member.send({
            embeds: [
                embed({
                    description: message.content,
                    author: {
                        name: message.author.username,
                        iconURL:
                            message.author.displayAvatarURL() ?? message.author.defaultAvatarURL,
                    },
                }),
            ],
        });

        await message.channel.send({
            content: `${message.author}, Answer successfully submitted! ✅`,
        });
        await message.delete();

        await msg.react("✅");
        await msg.react("❌");

        return;
    },
});
