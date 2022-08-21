import { Client, ClientOptions, Collection } from "discord.js";
import Command from "./Command";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { read } from "./read";
import Module from "./Module";
import { Player } from "discord-player";
import { join, resolve } from "node:path";
import "discord-player/smoothVolume";
import chalk from "chalk";
import { name, version } from "../../package.json";

/**
 * Wrapper around Discord Client that provides automatic loading of commands, slash-commands & events. Support for aliases and has music functionality
 * @class Bot
 * @extends {Client}
 */
export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  public modules = new Collection<string, Module<never>>();

  private commandsFolder: string;
  private modulesFolder: string;

  private app = new REST({ version: "9" });

  public player = new Player(this);

  private clientId: string;
  private guildId?: string;

  constructor({
    token,
    commandsFolder,
    modulesFolder,
    clientId,
    guildId,
    ...options
  }: ClientOptions & {
    token: string;
    commandsFolder?: string;
    modulesFolder?: string;
    clientId: string;
    guildId?: string;
  }) {
    super(options);

    this.token = token;
    this.clientId = clientId;
    this.guildId = guildId;

    this.commandsFolder = commandsFolder ?? "commands";
    this.modulesFolder = modulesFolder ?? "modules";

    this.app.setToken(token);

    try {
      Promise.allSettled([
        this.registerCommands(this.commandsFolder),
        this.registerModules(this.modulesFolder),
      ]).then(() => {
        this.login(token);
        console.log(
          `✅ ${chalk.yellow(name)} - ${chalk.gray(`v${version}`)} is ${chalk.green.bold(
            "online"
          )}!`
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async registerCommands(dir: string) {
    const commands = await read<Command>(join("src", dir));

    if (this.guildId) {
      await this.app.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: commands,
      });
    }

    this.app.put(Routes.applicationCommands(this.clientId), { body: commands });

    for (const command of commands) {
      this.commands.set(command.name, command);
    }

    console.info(`✅ Loaded ${chalk.bold(commands.length)} commands`);
  }

  private async registerModules(dir: string) {
    const modules = await read<Module<never>>(join("src", dir));

    for (const module of modules) {
      this.modules.set(module.name, module);

      try {
        this.on(module.event, module.run.bind(module, this));
      } catch (error) {
        console.error(error);
      }
    }

    console.info(`✅ Loaded ${chalk.bold(modules.length)} modules`);
  }
}
