const fs = require("fs")
require("dotenv").config()
const { TOKEN, PREFIX } = process.env

const Discord = require("discord.js")
const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs
	.readdirSync("./commands")
	.filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command)
}

client.once("ready", () => {
	console.log("Compagnon online!")
})

client.on("message", message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return

	const args = message.content
		.slice(PREFIX.length)
		.trim()
		.match(/[^\s"]+|"([^"]*)"/gi)

	const commandName = args.shift().toLowerCase()

	if (!client.commands.has(commandName)) return

	const command = client.commands.get(commandName)

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``
		}

		return message.channel.send(reply)
	}

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply("there was an error trying to execute that command!")
	}
})

client.login(TOKEN)
