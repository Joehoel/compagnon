import Command from "../../utils/Command";

export default new Command({
    name: "shuffle",
    description: "Shuffle current queue",
    aliases: ["random"],
    execute(client, message) {
        client.music.shuffle(message);
    },
});
