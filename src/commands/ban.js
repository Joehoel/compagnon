module.exports = {
	name: "ban",
	description: "Ban someone",
	args: true,
	admin: true,
	usage: "<username> <reason>",
	execute(client, message) {
		// TODO: Add ban command
		console.log(`Banned @${message.channel.author}`);
	},
};
