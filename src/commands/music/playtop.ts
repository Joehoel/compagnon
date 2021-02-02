import Command from "../../utils/Command";
import move from "./move";

export default new Command({
    name: "playtop",
    description: "Adds song to the top of the queue",
    aliases: ["playskip", "pt"],
    execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.play(message, args.join(" "));
        const from = client.music.getQueue(message).songs.length.toString();
        console.log(from);
        move.execute(client, message, [from, "1"]);
    },
});
