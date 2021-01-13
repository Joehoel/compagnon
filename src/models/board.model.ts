import { Document, model, Schema } from "mongoose";

export interface IBoard extends Document {
    name: string;
    game: string;
}

const BoardSchema: Schema = new Schema({
    name: { type: String, required: true },
    game: { type: String, required: true, unique: true },
});

export default model<IBoard>("Board", BoardSchema);
