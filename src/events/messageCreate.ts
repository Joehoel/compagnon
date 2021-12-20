import * as features from "../features";
import Event from "../structures/Event";

export default new Event({
    name: "messageCreate",
    async run(client, message) {
        // await features.filter(client, message);
        // await features.command(client, message);
        // await features.polls(client, message);
        await features.xp(client, message);
        await features.dad(client, message);
        await features.answers(client, message);
    },
});
