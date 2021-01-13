import { PrismaClient } from "@prisma/client";
import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";
import { capitalize } from "../utils/helpers";

const prisma = new PrismaClient();

export default new Command({
    name: "leaderboard",
    description: "leaderboard command",
    usage: "<create / show / score> <game> <name> <score> <evidence>",
    args: true,
    permissions: ["MANAGE_ROLES"],
    async execute(client, message, args) {
        try {
            const [type, gameName, name, score, evidence] = args.map((arg) =>
                arg.toLowerCase()
            );
            switch (type) {
                case "create":
                    if (gameName && !name) {
                        const game = await prisma.game.create({
                            data: { name: gameName },
                        });
                        return message.channel.send(
                            new MessageEmbed({
                                title: `Game ${game.name} created`,
                                color: "#ffc600",
                                timestamp: Date.now(),
                            })
                        );
                    }
                    if (gameName && name) {
                        const game = await prisma.game.findFirst({
                            where: { name: gameName },
                        });
                        if (game) {
                            const leaderboard = await prisma.leaderboard.create(
                                {
                                    data: {
                                        createdBy: message.author.toString(),
                                        game: { connect: { id: game.id } },
                                        name,
                                    },
                                }
                            );
                            return message.channel.send(
                                new MessageEmbed({
                                    title: `Leaderboard created`,
                                    color: "#ffc600",
                                    description: `Leaderboard: ${leaderboard.name}\nGame: ${gameName}`,
                                    timestamp: Date.now(),
                                })
                            );
                        } else {
                            const game = await prisma.game.create({
                                data: { name: gameName },
                            });
                            const leaderboard = await prisma.leaderboard.create(
                                {
                                    data: {
                                        createdBy: message.author.toString(),
                                        game: { connect: { id: game.id } },
                                        name,
                                    },
                                }
                            );

                            return message.channel.send(
                                new MessageEmbed({
                                    title: `Leaderboard created`,
                                    color: "#ffc600",
                                    description: `Leaderboard: ${leaderboard.name}\nGame: ${gameName}`,
                                    timestamp: Date.now(),
                                })
                            );
                        }
                    }
                    break;
                case "show":
                    if (gameName && name) {
                        const foundGame = await prisma.game.findFirst({
                            where: { name: gameName },
                            select: { imageUrl: true, name: true, id: true },
                        });

                        const scores = await prisma.score.findMany({
                            where: {
                                Leaderboard: {
                                    name,
                                    game: { name: gameName },
                                },
                            },
                        });

                        return message.channel.send(
                            new MessageEmbed({
                                author: {
                                    name: capitalize(foundGame!.name),
                                    iconURL: foundGame!.imageUrl!,
                                },
                                title: capitalize(name),
                                color: "#ffc600",
                                fields: scores.map((score) => {
                                    return {
                                        name: score.score,
                                        value: `Username: ${
                                            score.user
                                        }\n  Date: ${score.createdAt.toLocaleString()}\n ${
                                            score.evidence
                                                ? `Evidence: ${score.evidence}`
                                                : ""
                                        }`,
                                    };
                                }),
                            })
                        );
                    }

                    if (gameName && !name) {
                        const foundGame = await prisma.game.findFirst({
                            where: { name: gameName },
                            select: { imageUrl: true, name: true, id: true },
                        });
                        const leaderboards = await prisma.leaderboard.findMany({
                            where: { game: { name: gameName } },
                        });

                        return message.channel.send(
                            new MessageEmbed({
                                author: {
                                    name: capitalize(foundGame!.name),
                                    iconURL: foundGame!.imageUrl!,
                                },
                                title: "Leaderboards",
                                color: "#ffc600",
                                fields: leaderboards.map((leaderboard) => {
                                    return {
                                        name: capitalize(leaderboard.name),
                                        value: `Amount of scores: ${leaderboards.length}`,
                                    };
                                }),
                            })
                        );
                    }

                    const games = await prisma.game.findMany({
                        include: { Leaderboard: true },
                    });

                    return message.channel.send(
                        new MessageEmbed({
                            title: "Leaderboards",
                            color: "#ffc600",
                            fields: games.map((game) => {
                                return {
                                    name: capitalize(game.name),
                                    value: game.Leaderboard.map((leaderboard) =>
                                        capitalize(leaderboard.name)
                                    ),
                                };
                            }),
                        })
                    );

                case "score":
                    if (gameName && name && score) {
                        const leaderboard = await prisma.leaderboard.findFirst({
                            where: {
                                game: { name: gameName },
                                AND: { name },
                            },
                        });

                        if (leaderboard) {
                            const newScore = await prisma.score.create({
                                data: {
                                    user: message.author.toString(),
                                    Leaderboard: {
                                        connect: { id: leaderboard.id },
                                    },
                                    evidence: evidence ? evidence : null,
                                    score,
                                },
                            });
                            return message.channel.send(
                                JSON.stringify(newScore, null, 2)
                            );
                        }
                        // Leaderboard doesn't exist
                    }
                    break;
            }
        } catch (error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    },
});
