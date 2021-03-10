import { Fucks } from "../entity/Fucks";
import Command from "../utils/Command";
import { embed } from "../utils/helpers";

export default new Command({
  name: "user",
  description: "Display info about a user",
  async execute(client, message, args) {
    const target = message.mentions.members?.first();
    const fuck = await Fucks.findOne({ where: { user: target?.user.toString() } });

    if (target && fuck) {
      return message.channel.send(
        embed(
          {
            title: target.user.username,
            fields: [
              {
                name: "Got Fucked",
                value: `\`${fuck.gotFucked} times\``,
              },
              {
                name: "Fucks given",
                value: `\`${fuck.fucksGiven} fucks given\``,
              },
            ],
          },
          message
        )
      );
    }
  },
});
