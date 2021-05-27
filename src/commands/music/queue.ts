import Command from "../../lib/Command";
import { FieldsEmbed } from "discord-paginationembed";
import { TextChannel } from "discord.js";
import Song from "distube/typings/Song";
import { embed } from "../../utils/helpers";

export default new Command({
  name: "queue",
  description: "Show the current queue",
  aliases: ["q"],
  async execute(client, message) {
    const queue = client.music.getQueue(message);
    const playing = queue?.songs.shift();

    if (queue && queue.songs.length > 1) {
      try {
        const formattedQueue = queue?.songs?.map((song: Song, i) => {
          return `**${i + 1}**. \`${song?.name}\` - \`${song?.formattedDuration}\``;
        });
        const paginatedEmbed = new FieldsEmbed()
          .setArray(formattedQueue)
          .setElementsPerPage(10)
          .setDisabledNavigationEmojis(["delete"])
          .setChannel(message.channel as TextChannel)
          .formatField("Queue", (el) => el);

        paginatedEmbed.embed
          .setColor("#ffc600")
          .setTitle("Music")
          .setFooter(`${queue?.songs.length} songs in queue | ${queue?.formattedDuration} total length`);

        queue?.songs.unshift(playing!);

        await paginatedEmbed.build();
      } catch (error) {
        client.logger.error(error);
      }
    } else {
      return message.channel.send(
        embed({
          title: "Music",
          description: "Queue is empty 🐱",
        })
      );
    }
  },
});
