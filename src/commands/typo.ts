import Command from "../structures/Command";
import { embed } from "../lib/helpers";

export default new Command({
    name: "typo",
    description: "Call when a user makes a typo.",
    aliases: ["tp"],
    exclusive: true,
    execute(_, message) {
        const target = message.mentions.users.first();
        message.channel.send({ embeds: [embed({ description: `${target}` })] });
    },
});
