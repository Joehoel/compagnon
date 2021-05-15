import { Client, Message } from "discord.js";
import { embed } from "../utils/helpers";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  // Not a command or author is bot
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  // Command handler

  // Parse args from message content
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();

  // Check if the message is just '.'
  if (commandName === ".") return;

  // Check if command exists
  if (!client.commands.has(commandName) && !client.aliases.has(commandName)) {
    await message.channel.send(`Sorry, ${message.author}! that command doesn't exist`);
    return;
  }

  // Get command from collection
  const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);

  // Check if user is admin for command
  if (command.admin && !message.member!.hasPermission("ADMINISTRATOR")) {
    await message.channel.send(`Sorry, ${message.author}! You must be an admin to execute this command.`);
    return;
  }

  // Check if user has the correct roles te execute command
  if (command.roles.some((role) => !message.member!.roles.cache.find((_role) => _role.id === role))) {
    await message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
    return;
  }

  // Check if user has the correct permissions te execute command
  if (command.permissions.some((permission) => !message.member!.hasPermission(permission))) {
    await message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
    return;
  }

  // Check if user provided argument for the command
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }

    await message.channel.send(reply);
    return;
  }

  // If all check have passed, execute command
  try {
    command.execute(client, message, args);
    return;
  } catch (error) {
    if (error.message === "NotInVoice") {
      return message.channel.send(
        embed({ title: "Error", description: "You must be in a voice channel to execute that command!" })
      );
    }
    client.logger.error(error);
    await message.reply("There was an error trying to execute that command!");
  } finally {
    client.logger.info(`${message.author.tag} (${message.author.id}) ran a command: '${command.name}'`);
  }
};
