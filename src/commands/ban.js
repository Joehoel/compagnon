const Command = require("../utils/Command");

module.exports = new Command({
	name: "ban",
	description: "Ban a user",
	admin: true,
	args: true,
	usage: "<username> <days> <reason>",
	async execute(client, message, args) {
		const member = await message.mentions.members
			.first()
			.ban({ days: args[1], reason: args.slice(2) });

		message.channel.send(`:wave: ${member.displayName} has successfully been banned.`);
	},
});
