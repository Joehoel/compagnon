import { Message } from "discord.js";
import { Client } from "discord.js";
const { PREFIX } = process.env;

export default async (client: Client, message: Message) => {
    // Not a command or author is bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    // Command handler
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (!client.commands.has(commandName) && !client.aliases.has(commandName)) {
        return message.channel.send(`Sorry, ${message.author}! that command doesn't exist`);
    }

    const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);

    if (command.admin && !message.member!.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(`Sorry, ${message.author}! You must be an admin to execute this command.`);
    }

    command.roles.forEach((role) => {
        if (!message.member?.roles.cache.find((_role) => _role.id === role)) {
            return message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
        }
    });

    command.permissions.forEach((permission) => {
        if (!message.member!.hasPermission(permission)) {
            return message.channel.send(`Sorry, ${message.author}! You are not allowed to execute that command.`);
        }
    });

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Execute
    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        await message.reply("There was an error trying to execute that command!");
    }
};
