import fs from "fs";
const path = "./TODO.md";

export async function getTodos() {
    const file = fs.readFileSync(path, { encoding: "utf-8" });
    return file;
}
