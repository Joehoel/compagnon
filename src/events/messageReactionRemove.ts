import { Client, MessageReaction, PartialUser, User } from "discord.js";
import reactionrole from "@/features/reactionrole";
import { EVENTS } from "@/lib/contants";
import Event from "@/modules/Event";

export default new Event({
    name: "messageReactionRemove",
    async run(client: Client, reaction: MessageReaction, user: User | PartialUser) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_REMOVE);
    },
});
