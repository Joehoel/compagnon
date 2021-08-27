import { Client, MessageReaction, PartialUser, TextChannel, User } from "discord.js";
import reactionrole from "@/features/reactionrole";
import { CHANNELS, EVENTS, GUILD_ID } from "@/lib/contants";
import Event from "../modules/Event";
import { IQ } from "../entity/IQ";

export default new Event({
    name: "messageReactionAdd",
    async run(client: Client, reaction: MessageReaction, user: User | PartialUser) {
        await reactionrole(client, reaction, user, EVENTS.REACTION_ADD);

        // Quiz code
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot || reaction.message.channel.type != "DM") return;

        const member = client.guilds.cache.get(GUILD_ID)!.members.cache.get(user.id);

        const score = await IQ.findOne({ where: { user: member?.toString() } });

        switch (reaction.emoji.name) {
            case "✅":
                console.log("Correct");
                if (!score) {
                    const newIQ = new IQ({ user: member?.toString() });
                    await newIQ.save();
                    console.log("Saved", newIQ);
                } else {
                    const newScore = new IQ({ score: score.score + 1 });
                    const updated = await IQ.update({ user: member?.toString() }, newScore);
                    console.log("Updated", updated);
                }
                break;

            case "❌":
                console.log("Incorrect");
                break;

            default:
                console.log(reaction.emoji.name);
                break;
        }
    },
});
