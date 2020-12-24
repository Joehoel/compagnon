import { meme } from "../helpers";
import Command from "../utils/Command";

export default new Command({
    name: "meme",
    description: "Sends a random meme from the provided subreddit",
    usage: "<sub>",
    async execute(client, message, args) {
        return message.channel.send(await meme("memes"));
    },
});
