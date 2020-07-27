const Discord = require("discord.js")

module.exports = {
	name: "ping",
	description: "Ping!",
	execute(message) {
		const embed = new Discord.MessageEmbed().setTitle("Pong")
		message.channel.send(embed)
	},
}
