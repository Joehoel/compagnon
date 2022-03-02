import { embed } from "../lib/helpers";
import Command from "../structures/Command";

export default new Command({
    name: "ping",
    description: "Pong!",
    async execute(_, message) {
        const send = embed({
            description: `**Pong!**`,
        });

        return message.channel.send({ embeds: [send] }).then((m) => {
            const ping = m.createdTimestamp - message.createdTimestamp;
            m.edit({
                embeds: [
                    embed({
                        description: `**Pong!** \`${ping}ms\``,
                    }),
                ],
            });
        });
    },
});
// Command that send a random cat picture from the internet to the user
