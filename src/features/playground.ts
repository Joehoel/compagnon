import { Client } from "discord.js";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (client: Client) => {
    // * playground
    const answers = readFileSync(join(__dirname, "../data/antwoorden.txt"), "utf-8")
        .split("\n")
        .map((answer) => answer.trim());

    answers.map((answer, index) => {
        const date = new Date(2021);
    });
};
