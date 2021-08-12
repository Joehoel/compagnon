import Command from "../../modules/Command";
import { embed } from "../../lib/helpers";

export default new Command({
  name: "autoplay",
  description: "Enable / Disable autoplay",
  aliases: ["ap", "auto"],
  exclusive: true,
  execute(client, message) {
    if (!message.member?.voice.channel) throw new Error("NotInVoice");
    const mode = client.music.toggleAutoplay(message);
    return message.channel.send({
      embeds: [embed({ title: "Music", description: "Set autoplay mode to `" + (mode ? "On" : "Off") + "`" })],
    });
  },
});
