import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import Command from "@/utils/Command";
import { canExecute, formatCommand } from "@/utils/helpers";

export default new Command({
    name: "help",
    description: "Show all possible commands",
    usage: "<command>",
    aliases: ["h", "?"],
    execute(client, message, args) {
        const [commandName] = args.map((arg) => arg.toLowerCase());

        if (commandName) {
            const command = client.commands.get(commandName);
            console.log(command);
            return message.channel.send(
                new MessageEmbed({
                    title: command?.name,
                    color: "#ffc600",
                })
            );
        }

        const commands = client.commands
            .array()
            .filter((command) => {
                return canExecute(message.member!, command);
            })
            .map(formatCommand);

        const embed = new MessageEmbed({
            title: "Commands",
            color: "#ffc600",
            fields: commands,
        } as MessageEmbedOptions);

        message.channel.send(embed);
    },
});
