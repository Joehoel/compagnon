import { lstat, readdir } from "node:fs/promises";
import { here } from "@/helpers";
import { join } from "node:path";

/**
 * Given a directory read all the files in that directory and give them the correct type
 *
 * @export
 * @template T Class that all files are an instance of
 * @param {string} dir Directory relative to 'utils/read.ts'
 * @return {Promise<T[]>} Array of instances of T read from the given directory
 */
export async function read<T>(dir: string): Promise<T[]> {
  // console.log(`Loading commands \`${dir}\``);

  const commands: T[] = [];

  const files = await readdir(here(dir));

  for (const file of files) {
    const stat = await lstat(here(dir, file));

    if (stat.isDirectory()) {
      //   const nestedCommands = await read<T>(here(dir, file));
      //   commands.push(...nestedCommands);
    } else if (file !== "index.ts" && file !== "index.js" && !file.endsWith(".map")) {
      // console.log(`Importing command ${join(__dirname, dir, file)}`);
      try {
        const location = here(dir, file);

        console.log(location);

        const command = await import(`${location}`).then((m) => m.default);
        // // table.addRow(file, "✅");
        commands.push(command);
      } catch (error) {
        // logger.error(error);
        console.error(error);
        // table.addRow(file, `❌ - ${error}`);
      }
    }
  }
  // console.log(table.toString());
  return commands;
}
