import { MessageEmbed } from "discord.js";
import Command from "../../utils/Command";
import { EMOJIS } from "../../utils/constants";

export default new Command({
  name: "reactionrole",
  description: "Create an embed to make give users roles",
  permissions: ["MANAGE_ROLES"],
  aliases: ["rr"],
  async execute(client, message) {
    const msg = await message.channel.send(
      new MessageEmbed({
        title: "Welkom",
        description: "Klik op de emoji om toegang te krijgen tot de rest van server.",
        color: "#ffc600",
      })
    );
    await msg.react(EMOJIS.MEMBER);
    await msg.react(EMOJIS.SPEEDRUNNER);
    await msg.react(EMOJIS.POLLER);
  },
});
