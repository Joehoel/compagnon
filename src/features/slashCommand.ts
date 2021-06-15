// import { APIMessage, APIMessageContentResolvable, Channel, Client, Guild, GuildMember, Message } from "discord.js";
// import { embed } from "../lib/helpers";

// export interface ISlashCommand {
//   id: string;
//   application_id: string;
//   name: string;
//   description: string;
//   version: string;
//   default_permission: boolean;
// }

// export default async (client: Client, message: Message) => {
//   //@ts-ignore
//   client.ws.on("INTERACTION_CREATE", async (interaction) => {
//     const { member, data, guild_id, channel_id } = interaction;
//     const { name, options } = data;

//     const command: string = name.toLowerCase();
//     const guild = client.guilds.cache.get(guild_id);
//     const args = getArrayFromOptions(guild, options);
//     const channel = guild?.channels.cache.get(channel_id);
//     execute(interaction, command, args, member, guild, channel);
//   });

//   async function execute(
//     interaction: APIMessageContentResolvable,
//     commandName: string,
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     options: object,
//     member: GuildMember,
//     guid: Guild | undefined,
//     channel: Channel | undefined
//   ): Promise<boolean> {
//     const command = client.commands.get(commandName)! || client.commands.get(client.aliases.get(commandName)!);

//     if (!command || !command.execute) {
//       return false;
//     }

//     const result = await command.execute({
//       client,
//       args: options as unknown as string[],
//       interaction,
//       //@ts-ignore
//       text: (options as unknown as string[]).join ? options.join(" ") : "",
//     });

//     if (!result) {
//       client.logger.error("Slash command has to return content from the execute function");
//       return false;
//     }

//     let data: any = {
//       content: result,
//     };

//     if (typeof result === "object") {
//       data = await createAPIMessage(interaction, embed(result));
//     }
//     //@ts-ignore
//     client.fetchApplication.interactions(interaction.id, interaction.token).callback.post({
//       data: {
//         type: 4,
//         data,
//       },
//     });

//     return true;
//   }
// };

// async function get(guildId?: string): Promise<ISlashCommand[]> {
//   // @ts-ignore
//   const app = this._client.api.applications(this._client.user.id);
//   if (guildId) {
//     app.guilds(guildId);
//   }

//   return await app.commands.get();
// }

// async function createAPIMessage(interaction: APIMessageContentResolvable, content: any) {
//   const { data, files } = await APIMessage.create(
//     // @ts-ignore
//     client.channels.resolve(interaction.channel_id),
//     content
//   )
//     .resolveData()
//     .resolveFiles();

//   return { ...data, files };
// }

// function getArrayFromOptions(
//   guild: { members: { cache: unknown } } | undefined,
//   options?: { name: string; value: string }[]
// ): string[] {
//   const args: string[] = [];
//   if (!options) {
//     return args;
//   }

//   for (const { value } of options) {
//     args.push(getMemberIfExists(value, guild));
//   }

//   return args;
// }
// // Checks if string is a user id, if true, returns a Guild Member object
// function getMemberIfExists(value: string, guild: any) {
//   if (value && typeof value === "string" && value.startsWith("<@!") && value.endsWith(">")) {
//     value = value.substring(3, value.length - 1);

//     value = guild?.members.cache.get(value);
//   }

//   return value;
// }
