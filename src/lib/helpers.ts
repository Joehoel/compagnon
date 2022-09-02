import { join } from "node:path";

export const here = (...p: string[]) => join(__dirname, ...p);

/**
 * Chunk an array in to more arrays
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @param {number} size
 * @return {*}  {T[][]}
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export async function gif(tag: string): Promise<string> {
  const api = "https://api.giphy.com/v1/gifs/random?";

  const params = new URLSearchParams({
    api_key: process.env.GIPHY_API_KEY,
    tag,
  });

  const res = await fetch(`${api}${params}`);
  const { data } = await res.json();
  const { url } = data;

  return url;
}

/**
 * Capitalize a string
 *
 * @export
 * @param {string} string
 * @return {string} capitalized string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}
