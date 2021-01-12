import { Document, model, Schema } from "mongoose";

export interface IGame extends Document {
    name: string;
    imageUrl: string;
}

const GameSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String },
});

export default model<IGame>("Game", GameSchema);
