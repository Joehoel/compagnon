import { MessageEmbed } from "discord.js";
import { ROLES } from "../lib/contants";
import Command from "../structures/Command";

const options = [
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
    "🇬",
    "🇭",
    "🇮",
    "🇯",
    "🇰",
    "🇱",
    "🇲",
    "🇳",
    "🇴",
    "🇵",
    "🇶",
    "🇷",
    "🇸",
    "🇹",
    "🇺",
    "🇻",
    "🇼",
    "🇽",
    "🇾",
    "🇿",
];

const pollLog: { [userId: string]: { lastPoll: number } } = {};

function canSendPoll(userId: string): boolean {
    if (pollLog[userId]) {
        const timeSince = Date.now() - pollLog[userId].lastPoll;
        if (timeSince < 30000) {
            return false;
        }
    }
    return true;
}

export default new Command({
    name: "poll",
    description: "Create a poll where people can react to vote.",
    usage: "<question> <optional answer A> <optional answer B>",
    roles: [ROLES.POLLER],
    args: true,
    admin: false,
    async execute(client, message) {
        let args = message.content.match(/"(.+?)"/g)!;
        if (!canSendPoll(message.author.id) && !message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                `${message.author} please wait before sending another poll.`
            );
        } else if (args.length === 1) {
            // yes no unsure question
            const question = args[0].replace(/"/g, "");
            pollLog[message.author.id] = {
                lastPoll: Date.now(),
            };
            const id = `#${question.toUpperCase()?.substr(0, 1) + Math.floor(Math.random() * 100)}`;
            await message.delete();
            return message.channel
                .send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#ffc600")
                            .setTitle(`${question}`)
                            .setTimestamp()
                            .setFooter(
                                `Poll started by: ${message.author.username}`,
                                message.author.displayAvatarURL()
                            ),
                    ],
                })
                .then(async (pollMessage) => {
                    await pollMessage.react("👍");
                    await pollMessage.react("👎");
                    await pollMessage.react("🤷‍♀️");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            // multiple choice
            args = args.map((a) => a.replace(/"/g, ""));
            const question = args[0];
            const id = `#${question.toUpperCase()?.substr(0, 1) + Math.floor(Math.random() * 100)}`;
            const questionOptions = [...new Set(args.slice(1))];
            if (questionOptions.length > 20) {
                return message.channel.send(`${message.author} Polls are limited to 20 options.`);
            } else {
                pollLog[message.author.id] = {
                    lastPoll: Date.now(),
                };
                await message.delete();
                return message.channel
                    .send({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#ffc600")
                                .setTitle(`${question} ${id}`)
                                .setDescription(
                                    `${questionOptions
                                        .map((option, i) => `${options[i]} - ${option}`)
                                        .join("\n")}`
                                )
                                .setFooter(
                                    `Poll started by: ${message.author.username}`,
                                    `${message.author.displayAvatarURL()}`
                                )
                                .setTimestamp(),
                        ],
                    })
                    .then(async (pollMessage) => {
                        for (let i = 0; i < questionOptions.length; i++) {
                            await pollMessage.react(options[i]);
                        }
                    });
            }
        }
    },
});
