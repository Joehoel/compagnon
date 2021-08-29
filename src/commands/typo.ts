import Command from "../modules/Command";
import { embed } from "../lib/helpers";

export default new Command({
    name: "typo",
    description: "Call when a user makes a typo.",
    aliases: ["tp"],
    exclusive: true,
    execute(client, message, args) {
        const target = message.mentions.users.first();
        message.channel.send({ embeds: [embed({ description: `${target}` })] });
    },
});
