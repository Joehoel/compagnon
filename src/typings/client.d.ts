import Command from "@/Command";
import { Collection } from "discord.js";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}
