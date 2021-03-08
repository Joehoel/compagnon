import fs from "fs";
const path = "./TODO.md";

export async function getTodos() {
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    if (err) throw new Error(err.message);
    if (data) {
      return data;
    }
  });
}
