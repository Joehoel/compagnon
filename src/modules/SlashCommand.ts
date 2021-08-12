import { ToAPIApplicationCommandOptions } from "@discordjs/builders";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";

export enum CommandType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
}

interface Option {
  type: CommandType;
  name: string;
  description: string;
  required?: boolean;
}

export default class SlashCommand {
  public name: string;
  public description: string;
  public options: Option[];
  public execute: (interaction: CommandInteraction) => void;
  constructor({
    name,
    description,
    execute,
    options,
  }: {
    name: string;
    description: string;
    options?: Option[];
    execute: (interaction: CommandInteraction) => void;
  }) {
    this.name = name;
    this.description = description;
    this.options = options ?? [];
    this.execute = execute;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      options: this.options ?? [],
    };
  }
}
