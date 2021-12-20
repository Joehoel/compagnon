import { MessageEmbed } from "discord.js";
import Command from "../../structures/Command";
import { status } from "../../lib/helpers";

export default new Command({
    name: "stop",
    description: "Stops the current playing music",
    aliases: ["leave", "fuckoff", "krijgdetering", "optyfen", "opgetyfet", "getthefuckoutofmyroomimplayingminecraft"],
    exclusive: true,
    execute(client, message) {
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
                    value: status(client.music.getQueue(message)!),
                },
            ],
        });
        message.channel.send({ embeds: [embed] });
        return client.music.stop(message);
    },
});
