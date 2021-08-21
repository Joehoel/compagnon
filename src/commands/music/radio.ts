import axios from "axios";
import Command from "../../modules/Command";

interface Station {
    id: number;
    name: string;
    url: string;
}

export default new Command({
    name: "radio",
    description: "Play a radio station to your liking",
    usage: "<station>",
    exclusive: true,
    async execute(client, message, args) {
        let id = 66;
        if (args.length) {
            const [station] = args.map((x) => x.toLowerCase());
            switch (station) {
                case "qmusic":
                    id = 73;
                    break;

                default:
                    break;
            }
        }
        const { data } = await axios.get<Station>(`https://stations-api.herokuapp.com/stations/${id}`);
        await client.music.play(message, data.url);
    },
});
