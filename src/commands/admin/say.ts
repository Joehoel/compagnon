import Command from "../../structures/Command";

export default new Command({
    name: "say",
    description: "Outputs message from user",
    args: true,
    usage: "<message>",
    permissions: ["MANAGE_MESSAGES"],
    aliases: ["s"],
    execute(_, message, args) {
        message.delete();
        message.channel.send(args.join(" "));
    },
});
