import fs from "fs";
import { join } from "path";
import { ROOT } from "./constants";
import logger from "./logger";

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

    const files = fs.readdirSync(join(process.cwd(), ROOT, dir));

    for (const file of files) {
        const stat = fs.lstatSync(join(process.cwd(), ROOT, dir, file));

        if (stat.isDirectory()) {
            const nestedCommands = await read<T>(join(dir, file));

            commands.push(...nestedCommands);
        } else if (file !== "index.ts" && file !== "index.js" && !file.endsWith(".map")) {
            // console.log(`Importing command ${join(__dirname, dir, file)}`);
            try {
                const command: T = await import(join(process.cwd(), ROOT, dir, file)).then(
                    (value) => value.default
                );
                // table.addRow(file, "✅");
                commands.push(command);
            } catch (error) {
                logger.error(error);
                // table.addRow(file, `❌ - ${error}`);
            }
        }
    }
    // console.log(table.toString());
    return commands;
}
