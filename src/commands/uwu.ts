import Command from "../structures/Command";
import Uwuifier from "uwuifier";

const uwu = new Uwuifier();

export default new Command({
    name: "uwu",
    description: "Make sentence UwU",
    async execute(_, message, args) {
        await message.delete();
        return message.channel.send({ content: `<@${message.author.id}> zegt: ${uwu.uwuifySentence(args.join(" "))}` });
    },
});
