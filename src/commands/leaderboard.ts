import Command from "@/utils/Command";
import { MessageEmbed } from "discord.js";
import { Game } from "../entity/Game";
import { Leaderboard } from "../entity/Leaderboard";
import { Score } from "../entity/Score";
import { capitalize, embed } from "../utils/helpers";

export default new Command({
    name: "leaderboard",
    aliases: ["lb"],
    usage: "<show / create / score> <game> <leaderboard> <score> <proof>",
    args: true,
    description: "Leaderboard command",
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

                    return message.channel.send(
                        embed(
                            {
                                title: "Game created",
                                fields: [
                                    {
                                        name: "Game",
                                        value: capitalize(game.name),
                                    },
                                ],
                            },
                            message
                        )
                    );
                }

                if (gameName && leaderboardName) {
                    const foundGame = await Game.findOne({ name: gameName });
                    if (foundGame) {
                        const lb = new Leaderboard({ name: leaderboardName, game: foundGame });
                        await lb.save();

                        return message.channel.send(
                            embed(
                                {
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
                                },
                                message
                            )
                        );
                    } else {
                        const game = new Game({ name: gameName });
                        await game.save();
                        const lb = new Leaderboard({ name: leaderboardName, game });
                        await lb.save();

                        return message.channel.send(
                            embed(
                                {
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
                                },
                                message
                            )
                        );
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

                        return message.channel.send(
                            embed(
                                {
                                    title: capitalize(leaderboardName),
                                    fields: scores
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
                                },
                                message
                            )
                        );
                    } catch (error) {
                        return message.channel.send(
                            embed(
                                { title: "Something went wrong!", description: "Couldn't find that leaderboard" },
                                message
                            )
                        );
                    }
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
                        return message.channel.send(
                            new MessageEmbed({
                                title: "Successfully submitted score!",
                                color: "#ffc600",
                            })
                        );
                    } else {
                        // Leaderboard doesn't exist
                        return message.channel.send("Couldn't find that leaderboard");
                    }
                }
            default:
                break;
        }
    },
});
