import Command from "../../modules/Command";
import { embed } from "../../lib/helpers";
import { init } from "../../lib/lyrics";

const { GENIUS_TOKEN } = process.env;

export default new Command({
    name: "lyrics",
    description: "Search for the song lyrics",
    usage: "<song - artist>",
    exclusive: true,
    async execute(client, message, args) {
        const { search } = init(GENIUS_TOKEN);
        let song = "";
        const queue = client.music.getQueue(message);

        if (queue?.songs) {
            song = queue.songs[0].name!;
        }

        if (args.length >= 1) {
            song = args.join(" ").toLowerCase();
        } else if (song.includes("(")) {
            song = song.split("(")[0];
        }

        const { lyrics, title, artist, thumbnail, url } = await search(song);
        if (lyrics?.trim().length) {
            return await message.channel.send({
                embeds: [
                    embed({
                        title: `${title} - ${artist.name}`,
                        description: lyrics,
                        thumbnail: { url: thumbnail },
                        url,
                    }),
                ],
            });
        }
    },
});
