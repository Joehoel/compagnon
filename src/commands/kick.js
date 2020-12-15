const Command = require("../utils/Command");

module.exports = new Command({
	name: "kick",
	description: "Kick a user",
	admin: true,
	args: true,
	usage: "<username> <reason>",
	execute(client, message, args) {
		message.mentions.members.first().kick(args.slice(1));
	},
});
