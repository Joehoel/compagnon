import type SlashCommand from "../structures/SlashCommand";
import type { Consola } from "consola";
import type { Player } from "discord-player";
import "discord.js";
import type { Collection } from "discord.js";
import type DisTube from "distube";
import type { Config } from "../entity/Config";
import type Command from "../structures/Command";
import type Event from "../structures/Event";
import type { Snipe } from "./";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
        slashCommands: Collection<string, SlashCommand>;
        aliases: Collection<string, string>;
        snipes: Collection<string, Snipe>;
        events: Collection<string, Event>;
        features: Collection<string, any>;
        config: Collection<string, Partial<Config>>;
        music: DisTube;
        player: Player;
        logger: Consola;
    }
}
