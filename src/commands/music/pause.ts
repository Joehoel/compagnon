import Command from "../../modules/Command";
import { embed } from "../../lib/helpers";

export default new Command({
    name: "pause",
    description: "Pauses the current track",
    exclusive: true,
    execute(client, message) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.pause(message);
        return message.channel.send({ embeds: [embed({ title: "Music paused/resumed" })] });
    },
});
