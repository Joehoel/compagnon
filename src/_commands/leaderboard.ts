import { Leaderboard } from "../entity/Leaderboard";
import { Score } from "../entity/Score";
import SlashCommand, { CommandType } from "@/modules/SlashCommand";
import Levels, { LeaderboardUser } from "discord-xp";
import { MessageEmbed } from "discord.js";
import { Game } from "../entity/Game";
import { capitalize, distinctArrayByKey, embed } from "../lib/helpers";

type Action = "show" | "create" | "score";

const { GUILD_ID } = process.env;

export default new SlashCommand({
    name: "leaderboard",
    description: "Leaderboard command",
    options: [
        {
            name: "action",
            description: "action to take",
            type: CommandType.STRING,
            required: true,
            choices: [
                { name: "show", value: "show" },
                { name: "create", value: "create" },
                { name: "score", value: "score" },
            ],
        },
        {
            name: "category",
            description: "leaderboard category",
            required: true,
            type: CommandType.STRING,
        },
        {
            name: "leaderboard",
            description: "leaderboard name",
            required: true,
            type: CommandType.STRING,
        },
        {
            name: "score",
            description: "score",
            required: false,
            type: CommandType.STRING,
        },
        {
            name: "proof",
            description: "proof",
            required: false,
            type: CommandType.STRING,
        },
    ],
    async execute({ options, channel, client, user: author, deferReply, editReply }) {
        const type = options.getString("action") as Action;
        const gameName = options.getString("category")!;
        const leaderboardName = options.getString("leaderboard")!;
        const score = options.getString("score")!;
        const proof = options.getString("proof")!;

        if (!channel) return;

        switch (type) {
            case "create":
                if (gameName && !leaderboardName) {
                    const game = new Game({ name: gameName });
                    await game.save().catch((err) => {
                        console.error(err);
                        return editReply(`Game ${game.name} already exists`);
                    });
                    await deferReply();
                    return editReply({
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

                        await deferReply();
                        return editReply({
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

                        await deferReply();
                        return editReply({
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
                        await deferReply();
                        return editReply({
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
                        return editReply({
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

                    if (rawLeaderboard.length < 1) {
                        await deferReply();
                        return editReply("Nobody's in leaderboard yet.");
                    }

                    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
                    await deferReply();
                    return editReply({
                        embeds: [
                            embed({
                                title: "Ranks",
                                fields: leaderboard?.map((user: LeaderboardUser) => {
                                    return {
                                        name: user.position + ".",
                                        value: `User: <@${user.userID}>\nLevel: \`${user.level}\`\nXP: \`${
                                            user.xp
                                        }/${Levels.xpFor(user.level + 1)}\``,
                                    };
                                }),
                            }),
                        ],
                    });
                }
                break;

            case "score":
                if (score && proof) {
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
                            user: author.toString(),
                        });
                        await newScore.save();
                        await deferReply();
                        return editReply({
                            embeds: [
                                new MessageEmbed({
                                    title: "Successfully submitted score!",
                                    color: "#ffc600",
                                }),
                            ],
                        });
                    } else {
                        // Leaderboard doesn't exist
                        await deferReply();
                        return editReply("Couldn't find that leaderboard");
                    }
                }
                break;
        }
    },
});
