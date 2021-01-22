import Command from "../../utils/Command";

export default new Command({
    name: "volume",
    description: "Change the volume of the music",
    aliases: ["sound", "vol", "v"],
    roles: ["521378616429248527"],
    execute(client, message, args) {
        client.music.setVolume(message, parseInt(args[0]));
    },
});
