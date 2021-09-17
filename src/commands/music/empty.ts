import Command from "../../modules/Command";

export default new Command({
    name: "empty",
    description: "Empty the queue",
    aliases: ["cq", "clearqueue"],
    exclusive: true,
    execute(client, message) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.getQueue(message)!.songs.length = 0;
    },
});
