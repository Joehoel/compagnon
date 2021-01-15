import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";
import { status } from "../utils/helpers";

export default new Command({
    name: "loop",
    description: "Loops the current playing song",
    execute(client, message, args) {
        client.music.setRepeatMode(message, +args[0]);
        const embed = new MessageEmbed({
            title: "Music",
            color: "#ffc600",
            fields: [
                {
                    name: "Status",
                    value: status(client.music.getQueue(message)),
                },
            ],
        });
        return message.channel.send(embed);
    },
});
