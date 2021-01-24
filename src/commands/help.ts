import { MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";
import Command from "@/utils/Command";
import { canExecute, formatCommand, embed } from "../utils/helpers";
import { FieldsEmbed } from "discord-paginationembed";
const { PREFIX } = process.env;

export default new Command({
    name: "help",
    description: "Show all possible commands",
    usage: "<command>",
    aliases: ["h", "?"],
    async execute(client, message, args) {
        const [commandName] = args.map((arg) => arg.toLowerCase());

        if (commandName) {
            const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);
            if (command) {
                return message.channel.send(
                    embed(
                        {
                            title: "Help",
                            fields: [
                                {
                                    name: "Name",
                                    value: `\`${command.name}\``,
                                },
                                {
                                    name: "Aliases",
                                    value:
                                        command.aliases.length >= 1
                                            ? `\`${command.aliases.join(", ")}\``
                                            : "This command doesn't have any aliases",
                                },
                                {
                                    name: "Description",
                                    value: `\`${command.description}\``,
                                },
                                {
                                    name: "Usage",
                                    value: command.args
                                        ? `\`${PREFIX}${command.name} ${command.usage}\``
                                        : "This command doesn't have any arguments",
                                },
                            ],
                        },
                        message
                    )
                );
            }
        }

        const commands = client.commands
            .array()
            .filter((command) => {
                return canExecute(message.member!, command);
            })
            .map(formatCommand);

        const paginatedEmbed = new FieldsEmbed()
            .setArray(commands)
            .setElementsPerPage(5)
            .setDisabledNavigationEmojis(["delete"])
            .setChannel(message.channel as TextChannel)
            .formatField("Commands", (el) => el);

        paginatedEmbed.embed.setColor("#ffc600").setTitle("Help");

        await paginatedEmbed.build();
    },
});
