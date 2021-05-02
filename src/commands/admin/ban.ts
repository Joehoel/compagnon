import Command from "../../utils/Command";

export default new Command({
  name: "ban",
  description: "Ban a user",
  args: true,
  usage: "<username> <days> <reason>",
  permissions: ["BAN_MEMBERS"],
  async execute(client, message, args) {
    const days = parseInt(args[1]);

    const reason = args.slice(2).join(" ");

    const member = await message.mentions.members!.first()!.ban({ days, reason });

    return message.channel.send(
      `:wave: ${member.displayName} has successfully been banned for ${+args[1]} and reason: ${reason}.`
    );
  },
});
