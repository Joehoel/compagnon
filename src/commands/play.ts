import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";

export default new Command({
    name: "play",
    description: "Play a song",
    args: true,
    usage: "<song>",
    aliases: ["p"],
    execute(client, message, args) {
        client.music.play(message, args.join(" "));
    },
});
