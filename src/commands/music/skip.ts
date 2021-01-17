import { MessageEmbed } from "discord.js";
import Command from "@/utils/Command";

export default new Command({
    name: "skip",
    description: "Skip a song",
    roles: ["521378616429248527"],
    execute(client, message) {
        return client.music.skip(message);
    },
});
