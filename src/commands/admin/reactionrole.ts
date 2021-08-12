import { embed } from "@/lib/helpers";
import { EMOJIS } from "@/lib/contants";
import Command from "@/modules/Command";

export default new Command({
  name: "reactionrole",
  description: "Create an embed to make give users roles",
  permissions: ["MANAGE_ROLES"],
  aliases: ["rr"],
  exclusive: true,
  async execute(_, message) {
    const msg = await message.channel.send({
      embeds: [
        embed({
          title: "Welkom",
          description: `Reageer op dit bericht om jezelf een role te geven\n\n ${EMOJIS.MEMBER} - **Member**\n\n ${EMOJIS.SPEEDRUNNER} - **Speedrunner**\n\n ${EMOJIS.POLLER} - **Poller**\n\n ${EMOJIS.CONTESTANT} - **Contestant**\n\n`,
          timestamp: undefined,
        }),
      ],
    });
    await msg.react(EMOJIS.MEMBER);
    await msg.react(EMOJIS.SPEEDRUNNER);
    await msg.react(EMOJIS.POLLER);
    await msg.react(EMOJIS.CONTESTANT);
  },
});
