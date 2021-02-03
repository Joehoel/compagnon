import Command from "../../utils/Command";
import move from "./move";

export default new Command({
    name: "playtop",
    description: "Adds song to the top of the queue",
    aliases: ["playskip", "pt"],
    async execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        await client.music.play(message, args.join(" "));
        const from = client.music.getQueue(message).songs.length;
        move.execute(client, message, [from.toString(), "1"]);
        console.log(`Moving ${from} to 1`);
    },
});
