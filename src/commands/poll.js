const Discord = require("discord.js");
const Command = require("../utils/Command");

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

const pollLog = {};

/**
 * Returns true or false if the given user hasn't created a poll for more than 30 seconds
 *
 * @param {string | number} user_id
 * @return {boolean}
 */
function canSendPoll(user_id) {
	if (pollLog[user_id]) {
		const timeSince = Date.now() - pollLog[user_id].lastPoll;
		if (timeSince < 30000) {
			return false;
		}
	}
	return true;
}

module.exports = new Command({
	name: "poll",
	triggers: ["poll", "📊"],
	description:
		"Ask a polling question. Vote by emoji reaction. Question and options must be wrapped in double quotes. Questions with no provided options are treated as Yes / No / Unsure questions.",
	usage: "<question> <optional answer A> <optional answer B>",
	args: true,
	execute(client, message) {
		let args = message.content.match(/"(.+?)"/g);
		if (args) {
			if (
				!canSendPoll(message.author.id) &&
				!message.member.hasPermission("ADMINISTRATOR")
			) {
				return message.channel.send(
					`${message.author} please wait before sending another poll.`
				);
			} else if (args.length === 1) {
				// yes no unsure question
				const question = args[0].replace(/"/g, "");
				pollLog[message.author.id] = {
					lastPoll: Date.now(),
				};

				return message.channel
					.send(
						new Discord.MessageEmbed()
							.setColor("#ffc600")
							.setTitle(question)
							.setTimestamp()
							.setFooter(
								`Poll started by: ${message.author.username}`,
								message.author.displayAvatarURL()
							)
					)
					.then(async pollMessage => {
						await pollMessage.react("👍");
						await pollMessage.react("👎");
						await pollMessage.react("🤷‍♀️");
					})
					.catch(err => {
						console.error(err);
					});
			} else {
				// multiple choice
				args = args.map(a => a.replace(/"/g, ""));
				const question = args[0];
				const questionOptions = [...new Set(args.slice(1))];
				if (questionOptions.length > 20) {
					return message.channel.send(
						`${message.author} Polls are limited to 20 options.`
					);
				} else {
					pollLog[message.author.id] = {
						lastPoll: Date.now(),
					};
					return message.channel
						.send(
							new Discord.MessageEmbed()
								.setColor("#ffc600")
								.setTitle(question)
								.setDescription(
									`${questionOptions
										.map(
											(option, i) =>
												`${options[i]} - ${option}`
										)
										.join("\n")}`
								)
								.setFooter(
									`Poll started by: ${message.author.username}`,
									`${message.author.displayAvatarURL()}`
								)
								.setTimestamp()
						)
						.then(async pollMessage => {
							for (let i = 0; i < questionOptions.length; i++) {
								await pollMessage.react(options[i]);
							}
						});
				}
			}
		} else {
			return message.channel.send(
				`${message.author} invalid Poll! Question and options should be wrapped in double quotes.`
			);
		}
	},
});
