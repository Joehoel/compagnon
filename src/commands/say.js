const Command = require("../utils/Command");

module.exports = new Command({
	name: "say",
	description: "Outputs message from user",
	args: true,
	admin: true,
	usage: "<message>",
	execute(client, message, args) {
		message.delete({ timeout: 1000 });
		message.channel.send(args.join(" "));
	},
});
