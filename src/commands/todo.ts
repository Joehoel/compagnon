import Command from "../utils/Command";
import { embed } from "../utils/helpers";
import { getTodos } from "../utils/markdown";

export default new Command({
  name: "todo",
  description: "Add a new todo",
  async execute(client, message, args) {
    const todos = await getTodos();
    return message.channel.send(embed({ title: "Todo's", description: `\`\`\`md\n${todos}\`\`\`\n` }, message));
  },
});
