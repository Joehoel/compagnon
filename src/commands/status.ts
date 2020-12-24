import Command from "../utils/Command";

export default new Command({
    name: "status",
    description: "Updated the bots' status",
    args: true,
    admin: true,
    usage: "<status message>",
    execute(client, message, args) {
        args.unshift();
        client.user!.setPresence({
            activity: {
                name: args.join(" "),
                type: 0,
            },
        });

        return message.channel.send(`Changed my status ${message.author}!`);
    },
});
