import { Answer } from "@/entity/Answer";
import "cross-fetch";
import fetch from "cross-fetch";
import {
    Client,
    EmbedFieldData,
    Guild as Server,
    GuildMember,
    MessageEmbed,
    MessageEmbedOptions,
    TextChannel,
} from "discord.js";
import Queue from "distube/typings/Queue";
import { URLSearchParams } from "url";
import { promisify } from "util";
import { Brain } from "../entity/Brain";
import { Config } from "../entity/Config";
import { Guild } from "../entity/Guild";
import { Question } from "../entity/Question";
import Command from "../modules/Command";
import { GIFResponse, MemeResponse } from "../typings";
import { CHANNELS, GUILD_ID, ROLES } from "./contants";
import redis from "./redis";

const { API_KEY, REDIS_KEY_PREFIX } = process.env;

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

export async function meme(subName = "dankmemes"): Promise<MemeResponse> {
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

/**
 * Format a discord command to for embed usage
 *
 * @export
 * @param {Command} command Command
 * @return {EmbedFieldData} Embed field
 */
export function formatCommand(command: Command): EmbedFieldData {
    return {
        name:
            command.aliases?.length >= 1
                ? `**${command.name}** \`(${command.aliases.join(", ")})\``
                : `**${command.name}**`,
        value: command.description + "\n",
        inline: true,
    };
}

/**
 * Given a discord member and command check if that member can execute that command
 *
 * @export
 * @param {GuildMember} member
 * @param {Command} command
 * @return {boolean}
 */
export function canExecute(member: GuildMember, command: Command): boolean {
    if (!command.permissions) return true;
    const memberPerms = member.permissions.toArray();
    return command.permissions.every((permission) => memberPerms?.includes(permission));
}

/**
 * Capitalize a string
 *
 * @export
 * @param {string} string
 * @return {string} capitalized string
 */
export function capitalize(string: string): string {
    return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1);
}

export function status(queue: Queue) {
    return `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode == 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
}

/**
 * Generate a discord embed with default color and timestamp
 *
 * @export
 * @param {MessageEmbedOptions} options
 * @return {MessageEmbed} Embed
 */
export function embed(options: MessageEmbedOptions): MessageEmbed {
    return new MessageEmbed({
        ...options,
        color: "#ffc600",
        timestamp: Date.now(),
    });
}

export function distinctArrayByKey<T>(array: T[], key: keyof T): T[] {
    return [...new Map(array.map((item: T) => [item[key], item])).values()];
}

export function getRole(guild: Server, roleId: string) {
    return guild.roles.cache.find((role) => role.id === roleId);
}

export function giveRole(member: GuildMember, roleId: string) {
    const role = getRole(member.guild, roleId);
    if (role) {
        return member.roles.add(role);
    }
}

export function removeRole(member: GuildMember, roleId: string) {
    const role = getRole(member.guild, roleId);
    if (role) {
        return member.roles.remove(role);
    }
}

export async function onJoin(member: GuildMember) {
    const { id, guild } = member;

    const redisClient = await redis();
    try {
        redisClient.get(`${REDIS_KEY_PREFIX}${id}-${guild.id}`, (err, result) => {
            if (err) {
                console.error("Redis GET error:", err);
            } else if (result) {
                giveRole(member, ROLES.MUTED);
            } else {
                console.log("The user is not muted");
            }
        });
    } finally {
        redisClient.quit();
    }
}

/**
 * Get a random number between min and max (inclusive)
 * @param min Minimum value of the random number
 * @param max Maximum value of the random number
 * @param float Whether to return a float instead of an integer
 * @returns Random number between min and max
 */
export function random(min: number, max: number, float?: true): number;

/**
 * Get a random entry from an array
 * @param array Array to get a random entry from
 * @returns Random entry from array
 */
export function random<T>(array: T[]): T;

/**
 * Get a number of random items from an array
 * @param array Array to get random entries from
 * @param count Number of random entries to get
 * @returns A random slice from the input array
 */
export function random<T>(array: T[], count: number): T[];

export function random<T>(arrOrMin: number | T[], countOrMax?: number, float?: true): T[] | T | number {
    if (Array.isArray(arrOrMin)) {
        if (countOrMax == undefined) return arrOrMin[Math.floor(Math.random() * arrOrMin.length)];

        const copy = arrOrMin.slice(0, arrOrMin.length);

        const selected: T[] = [];
        for (let i = 0; i < countOrMax; i++) {
            selected.push(copy.splice(random(0, copy.length - 1), 1)[0]);
        }
        return selected;
    } else {
        const x = Math.random() * (countOrMax! - arrOrMin);
        return float ? arrOrMin + x : arrOrMin + Math.round(x);
    }
}

export async function createGuildConfig(guild: Server) {
    const newGuild = new Guild({
        id: guild.id,
        ownerId: guild.ownerId,
    });
    await newGuild.save();

    const newConfig = new Config({
        guild: newGuild,
    });
    await newConfig.save();

    return newConfig;
}

/**
 * Check if the given command is exclusive and allowed in the current server
 *
 * @export
 * @param {Command} command
 * @param {string} guildId
 * @return {boolean}
 */
export function isAllowed(command: Command, guildId: string): boolean {
    if (command.exclusive) {
        return guildId === GUILD_ID;
    } else {
        return true;
    }
}

export const wait = promisify(setTimeout);

export const scoreboard = async () => {
    const found = await Brain.find({});
    const scores = found
        .map((brain) => {
            return {
                user: brain.user,
                score: brain.score,
            };
        })
        .sort((a, b) => {
            return a.score > b.score ? 1 : -1;
        })
        .reverse();

    return `========================================  Biggest of brains  ========================================\n${scores
        .map((score, i) => `${i + 1}. ${score.user} - ${score.score}`)
        .join(
            "\n"
        )}\n======================================== Smallest of brains ========================================\n(Last updated: ${new Intl.DateTimeFormat(
        "nl-NL",
        { dateStyle: "long", timeStyle: "medium" }
    ).format(new Date())})`;
};

const getQuestionDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0, 0).toUTCString();
};
const getAnswerDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 11, 0, 0, 0).toUTCString();
};

export const sendQuestion = async (client: Client) => {
    const question = await getQuestion();
    const channel = (await client.channels.fetch(CHANNELS.VRAGEN, {
        cache: true,
        force: true,
    })) as TextChannel;
    return channel.send(`<@&${ROLES.CONTESTANT}> ${question!.text}`);
};

export const getQuestion = async () => {
    return await Question.findOne({ where: { date: getQuestionDate() } });
};

export const sendAnswer = async (client: Client) => {
    const answer = await getAnswer();
    const channel = (await client.channels.fetch(CHANNELS.VRAGEN, {
        cache: true,
        force: true,
    })) as TextChannel;
    return channel.send(`||${answer!.text}||`);
};

export const getAnswer = async () => {
    return await Answer.findOne({ where: { data: getAnswerDate() } });
};
