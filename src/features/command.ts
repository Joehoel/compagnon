import { Client, Message } from "discord.js";
import { embed } from "../utils/helpers";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
  // Not a command or author is bot
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  // Command handler
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();

  if (!client.commands.has(commandName) && !client.aliases.has(commandName)) {
    await message.channel.send(`Sorry, ${message.author}! that command doesn't exist`);
    return;
  }

  const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);

  if (command.admin && !message.member!.hasPermission("ADMINISTRATOR")) {
    await message.channel.send(`Sorry, ${message.author}! You must be an admin to execute this command.`);
    return;
  }

  if (command.roles.some((role) => !message.member!.roles.cache.find((_role) => _role.id === role))) {
    await message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
    return;
  }

  if (command.permissions.some((permission) => !message.member!.hasPermission(permission))) {
    await message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
    return;
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }

    await message.channel.send(reply);
    return;
  }

  // Execute
  try {
    command.execute(client, message, args);
    return;
  } catch (error) {
    if (error.message === "NotInVoice") {
      return message.channel.send(
        embed({ title: "Error", description: "You must be in a voice channel to execute that command!" }, message)
      );
    }
    client.logger.error(error);
    await message.reply("There was an error trying to execute that command!");
  }
};
