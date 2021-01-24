import "cross-fetch";
import fetch from "cross-fetch";
import { GuildMember } from "discord.js";
import { MessageEmbedOptions } from "discord.js";
import { Message, MessageEmbed } from "discord.js";
import { EmbedFieldData } from "discord.js";
import Queue from "distube/typings/Queue";
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
    return {
        name: command.aliases ? `${command.name} \`(${command.aliases.join(", ")})\`` : `${command.name}`,
        value: command.description,
    };
}

export function canExecute(member: GuildMember, command: Command): boolean {
    const memberPerms = member.permissions.toArray();
    return command.permissions.every((permission) => memberPerms?.includes(permission));
}

export function capitalize(string: string) {
    return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1);
}

export function status(queue: Queue) {
    return `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode == 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
}

export function embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
    return new MessageEmbed({
        ...options,
        color: "#ffc600",
        footer: {
            text: message.author.tag,
            iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }),
        },
    });
}
