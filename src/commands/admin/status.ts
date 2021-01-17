import Command from "@/utils/Command";

export default new Command({
    name: "status",
    description: "Updated the bots' status with the provided status message",
    args: true,
    usage: "<status message>",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        args.unshift();
        await client.user!.setPresence({
            activity: {
                name: args.join(" "),
                type: 0,
            },
        });

        return message.channel.send(`Changed my status ${message.author}!`);
    },
});
