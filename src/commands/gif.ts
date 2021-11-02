import { gif } from "../lib/helpers";
import Command from "../modules/Command";

export default new Command({
    name: "gif",
    args: true,
    usage: "<tag>",
    description: "Sends a random GIF in chat",
    aliases: ["g"],
    async execute(client, message, args) {
        const url = await gif(args.join(" "));
        message.channel.send(url);
    },
});
