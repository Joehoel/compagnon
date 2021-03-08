import { Collection } from "discord.js";
import Command from "../Command";
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

declare module "discord-slash" {
  interface Client {
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
    music: DisTube;
    logger: Consola;
  }
}
