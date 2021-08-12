import { MessageEmbed } from "discord.js";
import Command from "../../modules/Command";
import { status } from "../../lib/helpers";

export default new Command({
  name: "loop",
  description: "Loops the current playing song",
  exclusive: true,
  execute(client, message, args) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    client.music.setRepeatMode(message, +args[0]);
    const embed = new MessageEmbed({
      title: "Music",
      color: "#ffc600",
      fields: [
        {
          name: "Status",
          value: status(client.music.getQueue(message)),
        },
      ],
    });
    return message.channel.send({ embeds: [embed] });
  },
});
