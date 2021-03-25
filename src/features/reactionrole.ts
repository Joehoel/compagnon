import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { EMOJIS, EVENTS, GUILD_ID, REACTION_ROLE_CHANNEL, ROLES } from "../utils/constants";
import { giveRole, removeRole } from "../utils/helpers";

export default async (client: Client, reaction: MessageReaction, user: User | PartialUser, event: EVENTS) => {
  const member = client.guilds.cache.get(GUILD_ID)!.members.cache.get(user.id);

  try {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == REACTION_ROLE_CHANNEL) {
      switch (reaction.emoji.name) {
        case EMOJIS.MEMBER:
          if (event == EVENTS.REACTION_ADD) {
            await giveRole(member!, ROLES.MEMBER);
          } else {
            await removeRole(member!, ROLES.MEMBER);
          }
          break;
        case EMOJIS.POLLER:
          if (event == EVENTS.REACTION_ADD) {
            await giveRole(member!, ROLES.POLLER);
          } else {
            await removeRole(member!, ROLES.POLLER);
          }
          break;
        case EMOJIS.SPEEDRUNNER:
          if (event == EVENTS.REACTION_ADD) {
            await giveRole(member!, ROLES.SPEEDRUNNER);
          } else {
            await removeRole(member!, ROLES.SPEEDRUNNER);
          }
          break;

        default:
          break;
      }
      // if (reaction.emoji.name === EMOJIS.MEMBER) {
      //   await reaction.message.guild.members.cache.get(user.id)!.roles.add(memberRole as RoleResolvable);
      // }
    }
    return;
  } catch (error) {
    client.logger.error(error);
  }
};
