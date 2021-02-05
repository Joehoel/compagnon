const { readFile } = require("fs/promises");
const path = "./TODO.md";

export async function getTodos() {
    const data = await readFile(path, { encoding: "utf8" });
    return data;
}
