import { Collection } from "discord.js";
import Command from "../utils/Command";
import DisTube from "distube";
import { Consola } from "consola";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
        aliases: Collection<string, string>;
        music: DisTube;
        logger: Consola;
    }
}
