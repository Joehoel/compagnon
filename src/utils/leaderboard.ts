import Game, { IGame } from "../models/game.model";
import Board, { IBoard } from "../models/board.model";
import { capitalize } from "./helpers";

export class Leaderboard {
    constructor() {}
    public async boards(game: string): Promise<IBoard[]> {
        const boards: IBoard[] = await Board.find({ game }, { _id: 0, __v: 0 });
        return boards;
    }

    public async games() {
        const games: IGame[] = await Game.find({}, { _id: 0, __v: 0 });
        return games;
    }

    public async get(game: string): Promise<IGame> {
        return await Game.findOne({ name: game }, { _id: 0, __v: 0 });
    }

    public async create(game: string, name: string) {
        const exists = await this.get(game);
        if (exists) {
            return await Board.create({ name, game });
        }
        await Game.create({ name: game });
        return await Board.create({ name, game });
    }
}

// // Setup your MongoDB connection.
// export async function connect() {
//     try {
//         mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.info("Database connected!");

//         return mongoose;
//     } catch (error) {
//         console.error(error);
//     }
// }

export async function init() {
    try {
        const leaderboard = new Leaderboard();

        // leaderboard.all = async () => {
        //     const collections = await db.listCollections().toArray();
        //     return collections.map((c) => c.name.substring(3));
        // };

        return leaderboard;
    } catch (error) {
        console.error(error);
    }
}
// // Initialize the leaderboard.
