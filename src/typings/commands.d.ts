import Discord from "discord.js";
import { Collection } from "discord.js";
import interactions from "discord-slash-commands-client";
import Command from "../utils/Command";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
        aliases: Collection<string, string>;
    }
}
