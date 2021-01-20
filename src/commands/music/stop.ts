import { MessageEmbed } from "discord.js";
import Command from "@/utils/Command";
import { status } from "@/utils/helpers";

export default new Command({
    name: "stop",
    description: "Stops the current playing music",
    aliases: ["leave"],
    execute(client, message, args) {
        const embed = new MessageEmbed({
            title: "Music",
            color: "#ffc600",
            fields: [
                {
                    name: "Playing",
                    value: "`stopped`",
                },
                {
                    name: "Status",
                    value: status(client.music.getQueue(message)),
                },
            ],
        });
        message.channel.send(embed);
        return client.music.stop(message);
    },
});
