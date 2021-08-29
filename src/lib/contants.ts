import { readFileSync } from "fs";

export enum ROLES {
    MEMBER = "813361178587430934",
    SPEEDRUNNER = "670183692445941781",
    POLLER = "824017327485485138",
    MUTED = "813348811728486420",
    CHAD = "834023222131425340",
    CONTESTANT = "868226976014540820",
}

export enum USERS {
    JESSE = "138353487208644608",
    JOEL = "181077317840273411",
}

export enum EMOJIS {
    MEMBER = "🙋‍♂️",
    SPEEDRUNNER = "💨",
    POLLER = "📋",
    CONTESTANT = "❓",
}

export enum CHANNELS {
    WELCOME = "447101212094103552",
    POLLS = "823936293125881866",
    BOT_COMMANDS = "521379692163366921",
    ANTWOORDEN = "836998630904299530",
    ANTWOORDEN_VOOR_JESSE = "837620950400237598",
}

export enum EVENTS {
    REACTION_ADD,
    REACTION_REMOVE,
}

export const REACTION_ROLE_CHANNEL = CHANNELS.WELCOME;
export const GUILD_ID = "447097993850781696";

export const questions = readFileSync("./src/data/vragen.txt", "utf-8")
    .split("\n")
    .map((question) => question.trim());
