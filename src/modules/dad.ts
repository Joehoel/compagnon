import { CHANNELS } from "../lib/constants";
import Module from "../structures/Module";

const { PREFIX } = process.env;

export default new Module({
    name: "dad",
    event: "messageCreate",
    async run(client, message) {
        if (message.channel.type == "DM" || message.channel.id === CHANNELS.ANTWOORDEN) return;
        const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

        if (message.content.startsWith(prefix) || message.author.bot) return;
        const text = message.content.toLowerCase();

        const tests = ["ik ben", "i am"];
        const regex = new RegExp(`${tests.join("|")}`, "gi");
        const match = text.match(regex);

        if (match) {
            const words = text.split(" ");
            const index = words.indexOf(match[match.length - 1].split(" ")[1]) + 1;
            const name = words.slice(index).join(" ");

            return message.reply(`Hallo ${name}, ik ben compagnon :wave:`);
        }
    },
});
