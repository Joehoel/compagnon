import Command from "../../utils/Command";
import { embed } from "../../utils/helpers";

export default new Command({
    name: "autoplay",
    description: "Enable / Disable autoplay",
    aliases: ["ap", "auto"],
    execute(client, message) {
        if (!message.member?.voice.channel) throw new Error("NotInVoice");
        const mode = client.music.toggleAutoplay(message);
        return message.channel.send(
            embed({ title: "Music", description: "Set autoplay mode to `" + (mode ? "On" : "Off") + "`" }, message)
        );
    },
});
