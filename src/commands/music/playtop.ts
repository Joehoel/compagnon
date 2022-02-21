import Command from "../../structures/Command";
import move from "./move";

export default new Command({
    name: "playtop",
    description: "Adds song to the top of the queue",
    aliases: ["playskip", "pt"],
    exclusive: true,
    async execute(client, message, args) {
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) throw new Error("NotInVoice");

        await client.music.play(voiceChannel, args.join(" "), {
            position: 0,
        });
    },
});
