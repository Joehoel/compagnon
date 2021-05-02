import fs from "fs";
import { join } from "path";

export async function read<T>(dir: string): Promise<T[]> {
  console.log(`Loading commands \`${dir}\``);

  const commands: T[] = [];

  const files = fs.readdirSync(join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(join(__dirname, dir, file));

    if (stat.isDirectory()) {
      const nestedCommands = await read<T>(join(dir, file));
      commands.push(...nestedCommands);
    } else if (file !== "index.ts" && file !== "index.js" && !file.endsWith(".map")) {
      const command = await import(join(__dirname, dir, file));
      commands.push(command.default);
    }
  }

  return commands;
}
