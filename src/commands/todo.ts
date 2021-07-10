import Command from "../modules/Command";
import { embed } from "../lib/helpers";
import { getTodos } from "../lib/markdown";

export default new Command({
  name: "todo",
  description: "Add a new todo",
  exclusive: true,
  async execute(client, message, args) {
    const todos = await getTodos();
    return message.channel.send(
      embed({
        title: "Todo's",
        description: `\`\`\`md\n${todos}\`\`\`\n`,
      })
    );
  },
});
