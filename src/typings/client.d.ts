import { Consola } from "consola";
import "discord.js";
import DisTube from "distube";
import { Config } from "../entity/Config";
import Command from "../modules/Command";
import Event from "../modules/Event";
import { Snipe } from "./";

type Content = APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions;
type Options = (MessageOptions & { split?: false }) | MessageAdditions;

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
    snipes: Collection<string, Snipe>;
    events: Collection<string, Event>;
    features: Collection<string, any>;
    config: Collection<string, Partial<Config>>;
    music: DisTube;
    logger: Consola;
  }
  interface Message {
    inlineReply(content: Content, options?: Options): Promise<Message | Message[]>;
    edit(content: Content, options?: Options): Promise<Message>;
  }
}
