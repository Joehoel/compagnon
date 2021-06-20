import Command from "../modules/Command";
import { gif } from "../lib/helpers";

export default new Command({
  name: "dab",
  description: "Sends a random dab gif in chat",
  async execute(_, message) {
    const url = await gif("dab");
    message.channel.send(url);
  },
});
