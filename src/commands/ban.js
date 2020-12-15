const Command = require("../utils/Command");

module.exports = new Command({
	name: "ban",
	description: "Ban a user",
	admin: true,
	args: true,
	usage: "<username> <days> <reason>",
	execute(client, message, args) {
		message.mentions.members.first().ban({ days: args[1], reason: args.slice(2) });
	},
});
