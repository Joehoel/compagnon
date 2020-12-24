import Discord from "discord.js";
import Command from "../utils/Command";

export default new Command({
	name: "clear",
	description: "Clears the chat",
	admin: true,
	args: true,
	usage: "<amount>",
	async execute(client, message, args) {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply("The amount parameter isn`t a number!");
		}

		if (amount > 100) {
			return message.reply("You can`t delete more than 100 messages at once!");
		}

		if (amount < 1) {
			return message.reply("You have to delete at least 1 message!");
		}

		await message.channel.messages.fetch({ limit: amount }).then(messages => {
			(message.channel as Discord.TextChannel).bulkDelete(messages);
		});
	},
});
