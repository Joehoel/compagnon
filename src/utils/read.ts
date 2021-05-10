import fs from "fs";
import Table from "ascii-table";
import { join } from "path";

const table = new Table("Commands");

table.setHeading("Name", "Status");

export async function read<T>(dir: string): Promise<T[]> {
  // console.log(`Loading commands \`${dir}\``);

  const commands: T[] = [];

  const files = fs.readdirSync(join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(join(__dirname, dir, file));
    if (stat.isDirectory()) {
      const nestedCommands = await read<T>(join(dir, file));
      commands.push(...nestedCommands);
    } else if (file !== "index.ts" && file !== "index.js" && !file.endsWith(".map")) {
      // console.log(`Importing command ${join(__dirname, dir, file)}`);
      try {
        const command = await import(join(__dirname, dir, file));
        // table.addRow(file, "✅");
        commands.push(command.default);
      } catch (error) {
        // table.addRow(file, `❌ - ${error}`);
      }
    }
  }
  // console.log(table.toString());
  return commands;
}
