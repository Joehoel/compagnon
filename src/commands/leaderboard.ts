import Command from "@/utils/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "leaderboard",
    aliases: ["lb"],
    description: "Leaderboard command",
    execute(client, message, args) {
        const embed = new MessageEmbed({
            description: "Leaderboard command is still WIP",
        });
        return message.channel.send(embed);
    },
});
