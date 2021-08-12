import { embed, random } from "@/lib/helpers";
import Command from "@/modules/Command";

export default new Command({
  name: "roll",
  description: "Roll dice / choose a random item in a list",
  aliases: ["random", "choice", "choose", "kies", "kopofmunt", "coinpagnon", "robbeldebobbelsteen"],
  async execute(_, message, args) {
    if (args.length == 0) {
      const coin = random(["Kop", "Munt"]);
      return message.channel.send({ embeds: [embed({ title: "Rolled", description: coin })] });
    } else if (args.length == 1) {
      const n = parseInt(args[0]);
      const number = random(1, n);
      return message.channel.send({ embeds: [embed({ title: "Rolled", description: number.toString() })] });
    }
    const choice = random(args);
    return message.channel.send({ embeds: [embed({ title: "Rolled", description: choice })] });
  },
});
