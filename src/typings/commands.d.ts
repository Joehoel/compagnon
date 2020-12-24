import Discord from "discord.js";
import Command from "../utils/Command";

declare module "discord.js" {
	interface Client {
		commands: Discord.Collection<string, Command>;
	}
}
