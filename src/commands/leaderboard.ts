import { Game } from "../entity/Game";
import { Leaderboard } from "../entity/Leaderboard";
import { Score } from "../entity/Score";
import Command from "../structures/Command";
import { capitalize, distinctArrayByKey, embed } from "../lib/helpers";
import Levels, { LeaderboardUser } from "discord-xp";
import { MessageEmbed } from "discord.js";
import { GUILD_ID } from "../lib/constants";

export default new Command({
    name: "leaderboard",
    aliases: ["lb"],
    usage: "<show / create / score> <game> <leaderboard> <score> <proof>",
    args: true,
    description: "Leaderboard command",
    exclusive: true,
    async execute(client, message, args) {
        const [type, gameName, leaderboardName, score, proof] = args.map((arg, i) => {
            if (i !== args.length - 1) return arg.toLowerCase();
            return arg;
        });

        switch (type) {
            case "create":
                if (gameName && !leaderboardName) {
                    const game = new Game({ name: gameName });
                    await game.save().catch((err) => {
                        console.error(err);
                        return message.channel.send(`Game ${game.name} already exists`);
                    });

                    return message.channel.send({
                        embeds: [
                            embed({
                                title: "Game created",
                                fields: [
                                    {
                                        name: "Game",
                                        value: capitalize(game.name),
                                    },
                                ],
                            }),
                        ],
                    });
                }

                if (gameName && leaderboardName) {
                    const foundGame = await Game.findOne({ name: gameName });
                    if (foundGame) {
                        const lb = new Leaderboard({ name: leaderboardName, game: foundGame });
                        await lb.save();

                        return message.channel.send({
                            embeds: [
                                embed({
                                    title: "Leaderboard created",
                                    fields: [
                                        {
                                            name: "Game",
                                            value: `\`${foundGame.name}\``,
                                        },
                                        {
                                            name: "Leaderboard",
                                            value: `\`${lb.name}\``,
                                        },
                                    ],
                                    timestamp: Date.now(),
                                }),
                            ],
                        });
                    } else {
                        const game = new Game({ name: gameName });
                        await game.save();
                        const lb = new Leaderboard({ name: leaderboardName, game });
                        await lb.save();

                        return message.channel.send({
                            embeds: [
                                embed({
                                    title: "Leaderboard created",
                                    fields: [
                                        {
                                            name: "Game",
                                            value: game.name,
                                        },
                                        {
                                            name: "Leaderboard",
                                            value: lb.name,
                                        },
                                    ],
                                    timestamp: Date.now(),
                                }),
                            ],
                        });
                    }
                }
                break;

            case "show":
                if (gameName && leaderboardName) {
                    try {
                        const game = await Game.findOneOrFail({ name: gameName });
                        const lb = await Leaderboard.findOneOrFail(
                            { game: { id: game.id }, name: leaderboardName },
                            { relations: ["game"] }
                        );
                        const scores = await Score.find({ where: { leaderboard: lb } });
                        return message.channel.send({
                            embeds: [
                                embed({
                                    title: capitalize(leaderboardName),
                                    fields: distinctArrayByKey(scores, "user")
                                        .sort((a, b) => {
                                            if (a.score < b.score) return -1;
                                            return 1;
                                        })
                                        .map((score, i) => {
                                            return {
                                                name: i + 1 + ".",
                                                value: `Score: \`${score.score}\`\n Username: ${
                                                    score.user
                                                }\n  Date: \`${score.createdAt.toLocaleString()}\`\n Proof: ${
                                                    score.proof ? `${score.proof}` : ""
                                                }`,
                                            };
                                        }),
                                }),
                            ],
                        });
                    } catch (error) {
                        return message.channel.send({
                            embeds: [
                                embed({
                                    title: "Something went wrong!",
                                    description: "Couldn't find that leaderboard",
                                }),
                            ],
                        });
                    }
                }
                if (gameName == "ranks") {
                    const rawLeaderboard = await Levels.fetchLeaderboard(GUILD_ID, 10); // We grab top 10 users with most xp in the current server.

                    if (rawLeaderboard.length < 1)
                        return message.reply("Nobody's in leaderboard yet.");

                    const leaderboard = await Levels.computeLeaderboard(
                        client,
                        rawLeaderboard,
                        true
                    ); // We process the leaderboard.

                    message.channel.send({
                        embeds: [
                            embed({
                                title: "Ranks",
                                fields: leaderboard?.map((user: LeaderboardUser) => {
                                    return {
                                        name: user.position + ".",
                                        value: `User: <@${user.userID}>\nLevel: \`${
                                            user.level
                                        }\`\nXP: \`${user.xp}/${Levels.xpFor(user.level + 1)}\``,
                                    };
                                }),
                            }),
                        ],
                    });
                    return;
                }
                break;

            case "score":
                if (args.length > 3) {
                    const game = await Game.findOne({ name: gameName });

                    const leaderboard = await Leaderboard.findOne({
                        name: leaderboardName,
                        game,
                    });

                    if (leaderboard && game) {
                        const newScore = new Score({
                            score,
                            proof,
                            leaderboard,
                            user: message.author.toString(),
                        });
                        await newScore.save();
                        return message.channel.send({
                            embeds: [
                                new MessageEmbed({
                                    title: "Successfully submitted score!",
                                    color: "#ffc600",
                                }),
                            ],
                        });
                    } else {
                        // Leaderboard doesn't exist
                        return message.channel.send("Couldn't find that leaderboard");
                    }
                }
                break;
        }
    },
});
