import type { GuildMember, GuildTextBasedChannel } from "discord.js";
import interaction from "modules/interaction";
import Command from "../../structures/Command";

export default new Command({
    name: "play",
    description: "Play a song",
    args: true,
    usage: "<song>",
    aliases: ["p"],
    exclusive: true,
    execute(client, message, args) {
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) throw new Error("NotInVoice");

        return client.music.play(voiceChannel, args.join(" "), {
            textChannel: message.channel as GuildTextBasedChannel,
            member: message.member as GuildMember,
        });
    },
});
