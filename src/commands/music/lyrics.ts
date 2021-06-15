import Command from "../../modules/Command";
import { embed } from "../../lib/helpers";
import { getLyrics } from "../../lib/lyrics";

export default new Command({
  name: "lyrics",
  description: "Search for the song lyrics",
  usage: "<song - artist>",
  exclusive: true,
  async execute(client, message, args) {
    let song = "";
    const queue = client.music.getQueue(message);
    if (queue?.songs.length) {
      song = queue.songs[0].name;
    }

    if (args.length >= 1) {
      song = args.join(" ").toLowerCase();
    } else if (song.includes("(")) {
      song = song.split("(")[0];
    }

    try {
      const { lyrics, name, artist, album_art, url } = await getLyrics(song);
      if (lyrics.trim().length) {
        return await message.channel.send(
          embed({
            title: `${name} - ${artist}`,
            description: lyrics,
            thumbnail: { url: album_art },
            url,
          })
        );
      }
    } catch (error) {
      client.logger.error(error);
    }
  },
});
