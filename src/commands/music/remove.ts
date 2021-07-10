import Command from "../../modules/Command";

export default new Command({
  name: "remove",
  description: "Remove a specific song or songs from queue",
  aliases: ["delete", "del"],
  args: true,
  usage: "<song number(s)>",
  exclusive: true,
  execute(client, message, args) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
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
