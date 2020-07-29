const fs = require("fs")
require("dotenv").config()
const { TOKEN, PREFIX } = process.env

const Discord = require("discord.js")
const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs
	.readdirSync("./src/commands")
	.filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)

	client.commands.set(command.name, command)
}

client.once("ready", () => {
	console.log("Compagnon online!")
})

client.on("message", message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return

	const args = message.content.slice(PREFIX.length).trim().split(/ +/)

	const commandName = args.shift().toLowerCase()

	if (!client.commands.has(commandName)) return

	const command = client.commands.get(commandName)

	if (command.admin && !message.member.hasPermission("ADMINISTRATOR")) {
		return message.channel.send(
			`Sorry, ${message.author}! You must be an admin to execute this command.`
		)
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``
		}

		return message.channel.send(reply)
	}

	try {
		command.execute(client, message, args)
	} catch (error) {
		console.error(error)
		message.reply("there was an error trying to execute that command!")
	}
})

client.login(TOKEN)
