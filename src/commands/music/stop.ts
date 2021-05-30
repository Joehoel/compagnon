import { MessageEmbed } from "discord.js";
import Command from "../../lib/Command";
import { status } from "../../utils/helpers";

export default new Command({
  name: "stop",
  description: "Stops the current playing music",
  aliases: ["leave", "fuckoff", "krijgdetering", "optyfen", "opgetyfet", "getthefuckoutofmyroomimplayingminecraft"],
  execute(client, message) {
    const embed = new MessageEmbed({
      title: "Music",
      color: "#ffc600",
      fields: [
        {
          name: "Playing",
          value: "`stopped`",
        },
        {
          name: "Status",
          value: status(client.music.getQueue(message)),
        },
      ],
    });
    message.channel.send(embed);
    return client.music.stop(message);
  },
});
