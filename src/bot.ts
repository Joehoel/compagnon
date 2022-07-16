import { Client, ClientOptions, Collection } from "discord.js";
import Command from "./Command";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { read } from "./read";

type SlashCommandResponse = {
  id: string;
  application_id: string;
  name: string;
  description: string;
  version: string;
  default_permission: boolean;
  type: number;
  guild_id: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  options: Object[];
}[];

/**
 * Wrapper around Discord Client that provides automatic loading of commands, slash-commands & events. Support for aliases and has music functionality
 * @class Bot
 * @extends {Client}
 */
export default class Bot extends Client {
  public commands = new Collection<string, Command>();

  private commandsFolder: string;

  public prefix: string;

  private app = new REST({ version: "9" });
  private clientId: string;
  private guildId: string;

  constructor({
    token,
    commandsFolder,
    slashCommandsFolder,
    eventsFolder,
    modulesFolder,
    prefix,
    clientId,
    guildId,
    ...options
  }: ClientOptions & {
    token: string;
    commandsFolder?: string;
    eventsFolder?: string;
    slashCommandsFolder?: string;
    modulesFolder?: string;
    prefix?: string;
    clientId: string;
    guildId: string;
  }) {
    super(options);

    this.token = token;
    this.clientId = clientId;
    this.guildId = guildId;
    this.prefix = prefix ?? "!";

    this.commandsFolder = commandsFolder ?? "commands";

    this.app.setToken(token);

    try {
      this.registerCommands(this.commandsFolder);

      this.login(token);
    } catch (error) {
      console.error(error);
      //   logger.error(error);
    }
  }

  private async registerCommands(dir: string) {
    const slashCommands = await read<Command>(dir);

    await this.app.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
      body: slashCommands,
    });

    const commands = (await this.app.get(
      Routes.applicationGuildCommands(this.clientId, this.guildId)
    )) as SlashCommandResponse;

    for (const slashCommand of slashCommands) {
      this.commands.set(slashCommand.name, slashCommand);
      // const command = commands.find(({ name }) => name == slashCommand.name);

      // if (slashCommand.permissions?.length && command?.id) {
      //     await this.app.put(
      //         Routes.applicationCommandPermissions(this.clientId, this.guildId, command.id),
      //         {
      //             body: { permissions: slashCommand.permissions },
      //         }
      //     );
      // }
    }

    console.log("registred commands");
    // logger.info(`Loaded ${slashCommands.length} [/] commands`);
  }
}
