import { Message } from "discord.js";
import { embed } from "../lib/helpers";
import SlashCommand, { OptionType } from "../structures/SlashCommand";

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

export default new SlashCommand({
    name: "poll",
    description: "Create a poll where people can react to vote",
    options: [
        { name: "question", description: "question", type: OptionType.STRING },
        {
            name: "answer_1",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
        {
            name: "answer_2",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
        {
            name: "answer_3",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
        {
            name: "answer_4",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
        {
            name: "answer_5",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
        {
            name: "answer_6",
            description: "optional answer",
            required: false,
            type: OptionType.STRING,
        },
    ],
    async execute(interaction) {
        const question = interaction.options.getString("question");
        const author = interaction.user;

        const message = (await interaction.reply({
            embeds: [
                embed({
                    title: `${question}`,
                    footer: {
                        text: `Poll started by: ${author.username}`,
                        iconURL: author.avatarURL()!,
                    },
                }),
            ],
            fetchReply: true,
        })) as Message;
        await message.react("👍");
        await message.react("👎");
        await message.react("🤷‍♀️");
    },
});
