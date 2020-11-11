module.exports = {
	name: "kick",
	description: "Kick someone",
	args: true,
	admin: true,
	usage: "<username> <reason>",
	execute(client, message) {
		// TODO: Add kick command
		console.log(`Kicked @${message.channel.author}`);
	},
};
