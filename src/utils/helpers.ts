import "cross-fetch";
import { EmbedFieldData } from "discord.js";
import { URLSearchParams } from "url";
import { GIFResponse, MemeResponse } from "../typings";
import Command from "./Command";

const { API_KEY, PREFIX } = process.env;

export async function gif(tag: string): Promise<GIFResponse> {
    const api = "https://api.giphy.com/v1/gifs/random?";

    const params = new URLSearchParams({
        api_key: API_KEY,
        tag,
    });

    const res = await fetch(`${api}${params}`);
    const data = await res.json();
    const { url } = data;

    return url;
}

export async function meme(
    subName: string = "dankmemes"
): Promise<MemeResponse> {
    const api = `https://reddit.com/r/${subName}/random.json?`;
    const params = new URLSearchParams({
        limit: "1",
    });
    const res = await fetch(`${api}${params}`);
    const data = await res.json();
    const {
        title,
        url,
        created_utc,
        author,
        subreddit_name_prefixed: sub,
        permalink,
    } = data[0].data.children[0].data;

    const date = new Date(created_utc * 1000);
    const post = `https://reddit.com${permalink}`;

    return { title, url, date, author, sub, post };
}

export function formatCommand(command: Command): EmbedFieldData {
    const hasUsage = command.usage ? true : false;

    if (hasUsage) {
        return {
            name: `${PREFIX}${command.name}`,
            value: `${command.description} \`\`\`${command.usage}\`\`\``,
        };
    } else {
        return {
            name: `${PREFIX}${command.name}`,
            value: `${command.description}`,
        };
    }
}
