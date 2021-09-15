import { Answer } from "../entity/Answer";
import { Client } from "discord.js";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { sendAnswer } from "../lib/helpers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (client: Client) => {
    // * playground
    // const answers = readFileSync(join(__dirname, "../data/antwoorden.txt"), "utf-8")
    //     .split("\n")
    //     .map((answer) => answer.trim());
    // answers.map(async (answer, index) => {
    //     const now = new Date();
    //     const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index - 14, 9, 0, 0, 0);
    //     const newAnswer = new Answer({
    //         date,
    //         text: answer,
    //     });
    //     await newAnswer.save();
    // });
};
