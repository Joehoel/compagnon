import Command from "../utils/Command";
import { embed } from "../utils/helpers";
import ms from "ms";
import redis from "../lib/redis";

export default new Command({
  name: "remindme",
  description: "Send a DM to user at the given time",
  args: true,
  usage: "<time> <message>",
  async execute(client, message, [t, ...msg]) {
    const time = ms(t);
    const user = message.mentions.members?.first()?.user || message.author;
    message.channel.send(embed({ title: "Reminder has been set" }));
    setTimeout(() => {
      return message.channel.send(
        embed({
          title: "Reminder",
          fields: [
            {
              name: "Message",
              value: msg.join(" "),
              inline: true,
            },
            {
              name: "Link",
              value: `[Message](${message.url})`,
              inline: true,
            },
          ],
          timestamp: new Date(Date.now() - time),
        })
      );
    }, time);
  },
});
