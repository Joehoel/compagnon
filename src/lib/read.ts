import { lstat, readdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Given a directory read all the files in that directory and give them the correct type
 *
 * @export
 * @template T Class that all files are an instance of
 * @param {string} dir absolute path to the directory
 * @return {Promise<T[]>} Array of instances of T read from the given directory
 */
export async function read<T>(dir: string): Promise<T[]> {
  const commands: T[] = [];

  const files = await readdir(dir);

  for (const file of files) {
    const stat = await lstat(join(dir, file));

    if (stat.isDirectory()) {
      const nestedCommands = await read<T>(join(dir, file));
      commands.push(...nestedCommands);
    } else if (file !== "index.ts" && file !== "index.js" && !file.endsWith(".map")) {
      try {
        const location = join(dir, file);

        const command = await import(`${location}`).then((m) => m.default);
        commands.push(command);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return commands;
}
