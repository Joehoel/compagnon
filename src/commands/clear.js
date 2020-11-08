module.exports = {
	name: "clear",
	description: "Clears messages",
	usage: "<amount>",
	args: true,
	async execute(client, message, args) {
		const amount = args[0];

		if (isNaN(amount)) {
			return message.reply("The amount parameter isn`t a number!");
		}

		if (amount > 100) {
			return message.reply(
				"You can`t delete more than 100 messages at once!"
			);
		}
		if (amount < 1) {
			return message.reply("You have to delete at least 1 message!");
		}

		await message.channel.messages
			.fetch({ limit: amount })
			.then(messages => {
				message.channel.bulkDelete(messages);
			});
	},
};
