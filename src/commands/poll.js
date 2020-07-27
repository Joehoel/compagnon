const Discord = require("discord.js")

module.exports = {
	name: "poll",
	description: "generates a poll from input",
	usage: "!poll <question>",
	args: true,
	execute({ channel, author }, args) {
		const question = args.slice(0).join(" ")

		const poll = new Discord.MessageEmbed()
			.setColor("#ffc600")
			.setTitle(question)
			.setFooter(
				`Poll started by: ${author.username}`,
				`${author.avatarURL()}`
			)
			.setTimestamp()
		channel.send(poll).then(message => {
			message.react("👍")
			message.react("👎")
			message.react("🤷‍♀️")
		})
	},
}
