import SlashCommand from "../structures/SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Consola } from "consola";
import { Player } from "discord-player";
import "discord.js";
import { Collection } from "discord.js";
import DisTube from "distube";
import { Config } from "../entity/Config";
import Command from "../structures/Commandand";
import Event from "../structures/Event";
import { Snipe } from "./";

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
