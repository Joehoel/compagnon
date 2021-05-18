import "cross-fetch";
import fetch from "cross-fetch";
import { EmbedFieldData, Guild, GuildMember, Message, MessageEmbed, MessageEmbedOptions } from "discord.js";
import Queue from "distube/typings/Queue";
import { URLSearchParams } from "url";
import redis from "../lib/redis";
import { GIFResponse, MemeResponse } from "../typings";
import Command from "./Command";
import { ROLES } from "./constants";

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

export function formatCommand(command: Command): EmbedFieldData {
  return {
    name:
      command.aliases.length >= 1 ? `**${command.name}** \`(${command.aliases.join(", ")})\`` : `**${command.name}**`,
    value: command.description + "\n",
  };
}

export function canExecute(member: GuildMember, command: Command) {
  if (!command.permissions) return;
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

export function getRole(guild: Guild, roleId: string) {
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
