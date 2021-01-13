import { MessageEmbed } from "discord.js";
import Command from "../utils/Command";
import { Leaderboard } from "../utils/leaderboard";
import { IGame } from "../models/game.model";
import { capitalize, logo } from "../utils/helpers";
import { IBoard } from "../models/board.model";

export default new Command({
    name: "leaderboard",
    description: "leaderboard command",
    usage: "<create / show> <name>",
    args: false,
    permissions: ["MANAGE_ROLES"],
    async execute(client, message, args) {
        const leaderboard = new Leaderboard();
        const [type, gameName, name] = args.map((arg) => arg.toLowerCase());

        switch (type) {
            case "create":
                const board = await leaderboard.create(gameName, name);
                message.channel.send(`Leaderboard: "${name}" for game "${gameName}" successfully created`);

                break;

            case "show":
                if (!gameName) return;
                const game = await leaderboard.get(gameName);
                const boards = await leaderboard.boards(gameName);

                game;

                return message.channel.send(
                    new MessageEmbed({
                        author: { name: capitalize(gameName), iconURL: game?.imageUrl },
                        title: "Leaderboards",
                        color: "#ffc600",
                        fields: boards.map((board: IBoard) => {
                            return {
                                name: capitalize(board.name),
                                value: board.name.length,
                                inline: true,
                            };
                        }),
                        timestamp: Date.now(),
                    })
                );

            default:
                const games = await leaderboard.games();

                games;

                return message.channel.send(
                    new MessageEmbed({
                        title: "Leaderboards",
                        color: "#ffc600",
                        fields: [
                            {
                                name: "Current games",
                                value: games.map((game: IGame) => capitalize(game.name)),
                                inline: false,
                            },
                        ],
                        timestamp: Date.now(),
                    })
                );
        }
    },
});
