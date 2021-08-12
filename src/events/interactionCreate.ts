import * as features from "@/features";
import { Interaction } from "discord.js";
import Event from "../modules/Event";

export default new Event({
  name: "interactionCreate",
  async run(_, interaction: Interaction) {
    await features.interaction(interaction);
  },
});
