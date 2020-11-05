module.exports = {
	name: "status",
	description: "Sets the bots' status",
	args: true,
	admin: true,
	usage: "<message>",
	execute(client, message, args) {
		args.unshift();
		client.user.setPresence({
			activity: {
				name: args.join(" "),
				type: 0,
			},
		});

		return message.channel.send(`${message.author} `);
	},
};
