import { join } from "node:path";

export const here = (...p: string[]) => join(__dirname, ...p);
