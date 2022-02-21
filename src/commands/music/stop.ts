import { MessageEmbed } from "discord.js";
import Command from "../../structures/Command";
import { status } from "../../lib/helpers";
import { getVoiceConnection } from "@discordjs/voice";

export default new Command({
    name: "stop",
    description: "Stops the current playing music",
    aliases: [
        "leave",
        "fuckoff",
        "krijgdetering",
        "optyfen",
        "opgetyfet",
        "getthefuckoutofmyroomimplayingminecraft",
    ],
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

        client.music.stop(message);

        const connection = getVoiceConnection(message.guild!.id);
        return connection?.disconnect();
    },
});
