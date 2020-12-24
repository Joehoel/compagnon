// Global
import fs from "fs";
import "dotenv/config";

import Command from "./utils/Command";
const { TOKEN, PREFIX } = process.env;

// Discord
import Discord from "discord.js";
const client = new Discord.Client();

import Commands from "./commands";

// Ready!
client.once("ready", async () => {
	console.log("Compagnon online!");
});

// Command handler
client.commands = new Discord.Collection<string, Command>();

for (const file in Commands) {
	client.commands.set(file, Commands[file as keyof typeof Commands]);
}

// On every message
client.on("message", async message => {
	// Not a command or author is bot
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	// Command handler

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const commandName = args.shift()!.toLowerCase();

	if (!client.commands.has(commandName)) {
		return message.channel.send(`Sorry, ${message.author}! that command doesn't exist`);
	}

	const command = client.commands.get(commandName)!;

	if (command.admin && !message.member!.hasPermission("ADMINISTRATOR")) {
		return message.channel.send(
			`Sorry, ${message.author}! You must be an admin to execute this command.`,
		);
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Execute
	try {
		await command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		await message.reply("There was an error trying to execute that command!");
	}
});

client.login(TOKEN);
