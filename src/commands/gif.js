const Command = require("../utils/Command");
const { gif } = require("../helpers");

module.exports = new Command({
	name: "gif",
	args: true,
	usage: "<tag>",
	description: "Sends a random GIF in chat",
	async execute(client, message, args) {
		const { url } = await gif(args.join(" "));
		message.channel.send(url);
	},
});
