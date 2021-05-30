import Command from "../../lib/Command";

export default new Command({
  name: "empty",
  description: "Empty the queue",
  aliases: ["cq", "clearqueue"],
  execute(client, message, args) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    client.music.getQueue(message).songs.length = 0;
  },
});
