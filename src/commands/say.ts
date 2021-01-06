import Command from "../utils/Command";

export default new Command({
    name: "say",
    description: "Outputs message from user",
    args: true,
    usage: "<message>",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, args) {
        message.delete({ timeout: 1000 });
        message.channel.send(args.join(" "));
    },
});
