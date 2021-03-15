import { Client, MessageReaction, PartialUser, RoleResolvable, User } from "discord.js";
import { MEMBER_EMOJI, MEMBER_ROLE_ID, REACTION_ROLE_CHANNEL } from "../utils/constants";

export default async (client: Client, reaction: MessageReaction, user: User | PartialUser) => {
  const memberRole = client.guilds.cache
    .get("447097993850781696")
    ?.roles.cache.find((role) => role.id === MEMBER_ROLE_ID);

  try {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == REACTION_ROLE_CHANNEL) {
      if (reaction.emoji.name === MEMBER_EMOJI) {
        await reaction.message.guild.members.cache.get(user.id)!.roles.add(memberRole as RoleResolvable);
      }
    }
    return;
  } catch (error) {
    client.logger.error(error);
  }
};
