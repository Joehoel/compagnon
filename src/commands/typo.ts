import Command from "../utils/Command";
import { embed } from "../utils/helpers";

export default new Command({
    name: "typo",
    description: "Call when a user makes a typo.",
    aliases: ["tp"],
    execute(client, message, args) {
        const target = message.mentions.users.first();
        message.channel.send(embed({ description: `${target}` }, message));
    },
});
