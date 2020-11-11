module.exports = {
	name: "dab",
	description: "Shows dab GIF",
	execute(client, message) {
		return message.channel.send("https://media.giphy.com/media/bXvwCQglnTGKs/giphy.gif")
	},
};

