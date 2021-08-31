import { checkAnswers, reactionrole } from "../features";
import { EVENTS } from "@/lib/contants";
import { Client, MessageReaction, PartialUser, User } from "discord.js";
import Event from "../modules/Event";

export default new Event({
    name: "messageReactionAdd",
    async run(client: Client, reaction: MessageReaction, user: User | PartialUser) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_ADD);
        await checkAnswers(client, reaction, user, EVENTS.REACTION_ADD);
    },
});
