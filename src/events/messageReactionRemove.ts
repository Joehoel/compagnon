import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { reactionrole, checkAnswers } from "../features";
import { EVENTS } from "@/lib/contants";
import Event from "@/modules/Event";

export default new Event({
    name: "messageReactionRemove",
    async run(client: Client, reaction: MessageReaction, user: User | PartialUser) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_REMOVE);
        await checkAnswers(client, reaction, user, EVENTS.REACTION_REMOVE);
    },
});
