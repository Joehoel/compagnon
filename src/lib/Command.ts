import type {
  APIApplicationCommandOptionChoice,
  ApplicationCommandOptionType,
} from "discord-api-types/v9";
import type { CommandInteraction } from "discord.js";

interface Option {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: APIApplicationCommandOptionChoice[];
}

export default class Command {
  public readonly name: string;
  public readonly description: string;
  public readonly options: Option[];
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
