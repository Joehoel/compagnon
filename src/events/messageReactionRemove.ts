import { EVENTS } from "@/lib/contants";
import Event from "@/modules/Event";
import { checkAnswers, reactionrole } from "../features";

export default new Event({
    name: "messageReactionRemove",
    async run(client, reaction, user) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_REMOVE);
        await checkAnswers(client, reaction, user, EVENTS.REACTION_REMOVE);
    },
});
