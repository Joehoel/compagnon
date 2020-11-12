const Command = require("../utils/Command");

module.exports = new Command({
	name: "ban",
	description: "Ban a user",
	admin: true,
	args: true,
	usage: "<username> <reason>",
	execute(client, message, args) {
		// TODO: BAN HAMMER
	},
});
