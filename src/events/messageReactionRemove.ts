import { Client, MessageReaction, PartialUser, RoleResolvable, User } from "discord.js";
import { EMOJIS, GUILD_ID, REACTION_ROLE_CHANNEL, ROLES } from "../utils/constants";

export default async (client: Client, reaction: MessageReaction, user: User | PartialUser) => {
  const memberRole = client.guilds.cache.get(GUILD_ID)?.roles.cache.find((role) => role.id === ROLES.MEMBER);

  try {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == REACTION_ROLE_CHANNEL) {
      if (reaction.emoji.name === EMOJIS.MEMBER) {
        await reaction.message.guild.members.cache.get(user.id)!.roles.remove(memberRole as RoleResolvable);
      }
    }
    return;
  } catch (error) {
    client.logger.error(error);
  }
};
