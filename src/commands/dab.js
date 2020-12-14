const Command = require("../utils/Command");
const { gif } = require("../helpers");

module.exports = new Command({
	name: "dab",
	description: "Sends a random dab gif in chat",
	async execute(client, message) {
		const { url } = await gif("dab");
		message.channel.send(url);
	},
});
