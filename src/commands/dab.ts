import Command from "../utils/Command";
import { gif } from "../utils/helpers";

export default new Command({
    name: "dab",
    description: "Sends a random dab gif in chat",
    async execute(client, message) {
        const url = await gif("dab");
        message.channel.send(url);
    },
});
