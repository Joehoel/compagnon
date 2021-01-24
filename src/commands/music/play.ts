import Command from "@/utils/Command";
import { embed } from "../../utils/helpers";

export default new Command({
    name: "play",
    description: "Play a song",
    args: true,
    usage: "<song>",
    aliases: ["p"],
    execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");

        client.music.play(message, args.join(" "));
    },
});
