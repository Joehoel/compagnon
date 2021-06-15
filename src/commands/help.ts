import Command from "../modules/Command";
import { FieldsEmbed } from "discord-paginationembed";
import { TextChannel } from "discord.js";
import { canExecute, embed, formatCommand } from "../lib/helpers";
import { GUILD_ID } from "../lib/contants";

export default new Command({
  name: "help",
  description: "Show all possible commands",
  usage: "<command>",
  aliases: ["h", "?"],
  async execute(client, message, args) {
    const prefix = client.prefixes.get(message.guild!.id);

    const [commandName] = args.map((arg) => arg.toLowerCase());

    if (commandName) {
      const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);
      const isAllowed = command.exclusive == (message.guild!.id == GUILD_ID);
      if (command && isAllowed) {
        return message.channel.send(
          embed({
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
                value: command.usage
                  ? `\`${prefix}${command.name} ${command.usage}\``
                  : "This command doesn't have any arguments",
              },
            ],
          })
        );
      }
    }

    const commands = client.commands
      .array()
      .filter((command) => {
        const isAllowed = command.exclusive == (message.guild!.id == GUILD_ID);
        return canExecute(message.member!, command) && isAllowed;
      })
      .map(formatCommand);

    const paginatedEmbed = new FieldsEmbed()
      .setArray(commands)
      .setElementsPerPage(8)
      .setDisabledNavigationEmojis(["delete"])
      .setChannel(message.channel as TextChannel)
      .formatField("Commands", (el: any) => `${el.name}\n${el.value}`);

    paginatedEmbed.embed.setColor("#ffc600").setTitle("Help");

    await paginatedEmbed.build();
  },
});
