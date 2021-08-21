import Command from "../../modules/Command";

export default new Command({
    name: "volume",
    description: "Change the volume of the music",
    aliases: ["sound", "vol", "v"],
    roles: ["521378616429248527"],
    exclusive: true,
    execute(client, message, args) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        client.music.setVolume(message, parseInt(args[0]));
    },
});
