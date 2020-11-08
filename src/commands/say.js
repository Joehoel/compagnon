module.exports = {
	name: "say",
	description: "Outputs message from user",
	args: true,
	usage: "<message>",
	async execute(client, message, args) {
		message.delete({ timeout: 1000 });
		message.channel.send(args.join(" "));
	},
};
