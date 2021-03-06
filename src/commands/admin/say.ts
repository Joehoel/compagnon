import Command from "../../modules/Command";

export default new Command({
  name: "say",
  description: "Outputs message from user",
  args: true,
  usage: "<message>",
  permissions: ["MANAGE_MESSAGES"],
  aliases: ["s"],
  execute(client, message, args) {
    message.delete({ timeout: 1000 });
    message.channel.send(args.join(" "));
  },
});
