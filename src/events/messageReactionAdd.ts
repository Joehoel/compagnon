import { Client, MessageReaction, PartialUser, User } from "discord.js";
import reactionrole from "../features/reactionrole";
import { EVENTS } from "../utils/constants";

import Event from "../utils/Event";

export default new Event({
  name: "messageReactionAdd",
  async run(client: Client, reaction: MessageReaction, user: User | PartialUser) {
    await reactionrole(client, reaction, user, EVENTS.REACTION_ADD);
  },
});

// export default async (client: Client, reaction: MessageReaction, user: User | PartialUser) => {
//   await reactionrole(client, reaction, user, EVENTS.REACTION_ADD);
// };
