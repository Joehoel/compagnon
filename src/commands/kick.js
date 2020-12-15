const Command = require("../utils/Command");

module.exports = new Command({
	name: "kick",
	description: "Kick a user",
	admin: true,
	args: true,
	usage: "<username> <reason>",
	async execute(client, message, args) {
		const member = await message.mentions.members.first().kick(args.slice(1));
		await message.channel.send(`:wave: ${member.displayName} has successfully been kicked.`);
	},
});
