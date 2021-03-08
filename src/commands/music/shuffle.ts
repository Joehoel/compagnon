import Command from "../../utils/Command";
import { embed } from "../../utils/helpers";
import queue from "./queue";

export default new Command({
  name: "shuffle",
  description: "Shuffle current queue",
  aliases: ["random"],
  async execute(client, message, args) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    client.music.shuffle(message);
    queue.execute(client, message, args);
    return message.channel.send(embed({ title: "Toggled shuffle" }, message));
  },
});
