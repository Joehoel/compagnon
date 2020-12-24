import Command from "../utils/Command";

export default new Command({
	name: "ban",
	description: "Ban a user",
	admin: true,
	args: true,
	usage: "<username> <days> <reason>",
	async execute(client, message, args) {
		const days = parseInt(args[1]);

		const reason = args.slice(2).join(" ");

		const member = await message.mentions.members!.first()!.ban({ days, reason });

		await message.channel.send(
			`:wave: ${
				member.displayName
			} has successfully been banned for ${+args[1]} and reason: ${reason}.`
		);
	},
});
