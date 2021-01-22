import Command from "../../utils/Command";

export default new Command({
    name: "remove",
    description: "Remove a specific song or songs from queue",
    aliases: ["delete", "del"],
    args: true,
    usage: "<song number(s)>",
    execute(client, message, args) {
        const indeces = args.map((arg) => parseInt(arg));
        const songs = client.music.getQueue(message).songs;

        if (args.length === 1) {
            const songIdx = indeces[0];
            return songs.splice(songIdx, 1);
        }

        let deletedCount = 0;
        for (const idx of indeces) {
            songs.splice(idx - deletedCount, 1);
            deletedCount++;
        }
    },
});
