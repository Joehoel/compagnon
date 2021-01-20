import { MessageEmbed } from "discord.js";
import Command from "@/utils/Command";

export default new Command({
    name: "skip",
    description: "Skip a song",
    aliases: ["jump"],
    usage: "<song number>",
    roles: ["521378616429248527"],
    execute(client, message, args) {
        const songNumber = parseInt(args[0]);
        if (!songNumber) return client.music.skip(message);
        return client.music.jump(message, songNumber);
    },
});
