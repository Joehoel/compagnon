import Command from "../../utils/Command";

export default new Command({
    name: "shuffle",
    description: "Shuffle current queue",
    aliases: ["random"],
    execute(client, message) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.shuffle(message);
    },
});
