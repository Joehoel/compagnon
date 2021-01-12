import "cross-fetch";
import fetch from "cross-fetch";
import { GuildMember } from "discord.js";
import { EmbedFieldData } from "discord.js";
import { URLSearchParams } from "url";
import { GIFResponse, LogoResponse, MemeResponse } from "../typings";
import Command from "./Command";

const { API_KEY, PREFIX } = process.env;

export async function gif(tag: string): Promise<GIFResponse> {
    const api = "https://api.giphy.com/v1/gifs/random?";

    const params = new URLSearchParams({
        api_key: API_KEY,
        tag,
    });

    const res = await fetch(`${api}${params}`);
    const { data } = await res.json();
    const { url } = data;

    return url;
}

export async function meme(subName: string = "dankmemes"): Promise<MemeResponse> {
    const api = `https://reddit.com/r/${subName}/random.json?`;
    const params = new URLSearchParams({
        limit: "1",
    });
    const res = await fetch(`${api}${params}`);
    const data = await res.json();
    const { title, url, created_utc, author, subreddit_name_prefixed: sub, permalink } = data[0].data.children[0].data;

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

export async function logo(query: string): Promise<string> {
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`;
    const res = await fetch(url);
    const data: LogoResponse[] = await res.json();
    const { logo } = data[0];

    return logo;
}

export function canExecute(member: GuildMember, command: Command): boolean {
    const memberPerms = member.permissions.toArray();
    return command.permissions.every((permission) => memberPerms?.includes(permission));
}

export function capitalize(string: string) {
    return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1);
}
