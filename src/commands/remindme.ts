import Command from "../utils/Command";
import { embed } from "../utils/helpers";

export default new Command({
  name: "remindme",
  description: "Send a DM to user at the given time",
  args: true,
  usage: "<time>",
  execute(_, message, args) {
    return message.channel.send(embed({ title: "Work in progress"
));
  },
});
