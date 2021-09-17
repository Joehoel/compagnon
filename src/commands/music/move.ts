import Command from "../../modules/Command";

export default new Command({
    name: "move",
    description: "Move a song to another position in the queue",
    aliases: ["mv"],
    exclusive: true,
    execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        const queue = client.music.getQueue(message);
        if (!queue) throw new Error("NotPlaying");
        const [from, to] = args.map((arg) => parseInt(arg));

        if (from > to) {
            queue.songs.splice(to, 0, queue.songs[from]);
            queue.songs.splice(from + 1, 1);
        } else {
            queue.songs.splice(to + 1, 0, queue.songs[from]);
            queue.songs.splice(from - 1, 1);
        }
    },
});
