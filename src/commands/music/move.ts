import Command from "../../utils/Command";

export default new Command({
    name: "move",
    description: "Move a song to another position in the queue",
    aliases: ["mv"],
    execute(client, message, args) {
        const queue = client.music.getQueue(message);
        if (!queue) throw new Error("NotPlaying");
        const playing = queue.songs.shift();
        const [from, to] = args.map((arg) => parseInt(arg));

        queue.songs.unshift(playing!);

        queue.songs.splice(to, 0, queue.songs[from]);
        queue.songs.splice(from + 1, 1);
    },
});
