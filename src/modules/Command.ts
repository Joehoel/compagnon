import type { TextChannel } from "discord.js";
import { CHANNELS } from "../lib/constants";
import { NotInVoice } from "../lib/errors";
import { embed, isAllowed } from "../lib/helpers";
import logger from "../lib/logger";
import Module from "../structures/Module";

export default new Module({
    name: "command",
    event: "messageCreate",
    async run(client, message) {
        if (message.channel.type == "DM") return;
        // const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;
        const prefix = client.prefix;

        // Not a command or author is bot
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        // Parse args from message content
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        // Check if the message is just '.'
        if (args[0] === prefix) return;

        // Check if command exists
        if (!client.commands.has(commandName) && !client.aliases.has(commandName)) {
            return await message.reply(`That command doesn't exist`);
        }

        // Get command from collection
        const command =
            client.commands.get(commandName)! ||
            client.commands.get(client.aliases.get(commandName)!);

        if (!command.enabled) {
            return await message.reply("That command is disabled.");
        }

        if (!isAllowed(command, message.guild!.id)) {
            return await message.reply("That command doesn't exist.");
        }

        // Check if user is admin for command
        if (command.admin && !message.member?.permissions.has("ADMINISTRATOR")) {
            return await message.reply("You must be an admin to execute this command.");
        }

        // Check if user has the correct roles te execute command
        if (
            command.roles.some(
                (role) => !message.member?.roles.cache.find((_role) => _role.id === role)
            )
        ) {
            return await message.reply("You are not allowed to execute that command.");
        }

        // Check if user has the correct permissions te execute command
        if (
            command.permissions.some((permission) => !message.member!.permissions.has(permission))
        ) {
            return await message.reply("You are not allowed to execute that command.");
        }

        // Check if user provided argument for the command
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return await message.channel.send(reply);
        }

        // If all check have passed, execute command
        try {
            return command.execute(client, message, args);
        } catch (error) {
            if (error instanceof NotInVoice && error.message === "NotInVoice") {
                return message.channel.send({
                    embeds: [
                        embed({
                            title: "Error",
                            description: "You must be in a voice channel to execute that command!",
                        }),
                    ],
                });
            }
            logger.error(error);
            const channel = client.channels.cache.get(CHANNELS.LOGS) as TextChannel;

            await channel?.send({
                embeds: [
                    embed({
                        color: "#ff0000",
                        title: "Error",
                        description:
                            error instanceof Error ? error.message : "Something went wrong!",
                    }),
                ],
            });

            await message.reply("There was an error trying to execute that command!");
        } finally {
            logger.info(
                `${message.author.tag} (${message.author.id}) ran a command: '${command.name}'`
            );
        }
    },
});
