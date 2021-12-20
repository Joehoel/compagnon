import Command from "../../structures/Command";
import { embed } from "../../lib/helpers";
import queue from "./queue";

export default new Command({
    name: "shuffle",
    description: "Shuffle current queue",
    aliases: ["random"],
    exclusive: true,
    async execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.shuffle(message);
        queue.execute(client, message, args);
        return message.channel.send({
            embeds: [
                embed({
                    title: "Toggled shuffle",
                }),
            ],
        });
    },
});
