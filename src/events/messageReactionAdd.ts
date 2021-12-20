import { checkAnswers, reactionrole } from "../features";
import { EVENTS } from "../lib/contants";
import Event from "../structures/Event";

export default new Event({
    name: "messageReactionAdd",
    async run(client, reaction, user) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_ADD);
        await checkAnswers(client, reaction, user, EVENTS.REACTION_ADD);
    },
});
