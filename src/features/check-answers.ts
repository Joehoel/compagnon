import { Brain } from "../entity/Brain";
import { EVENTS, GUILD_ID } from "@/lib/contants";
import { Client, MessageReaction, PartialUser, User } from "discord.js";

export default async (client: Client, reaction: MessageReaction, user: User | PartialUser, event: EVENTS) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || reaction.message.channel.type != "DM") return;

    const member = client.guilds.cache.get(GUILD_ID)!.members.cache.get(user.id);

    const score = await Brain.findOne({ where: { user: member?.toString() } });

    switch (reaction.emoji.name) {
        case "✅":
            if (event == EVENTS.REACTION_ADD) {
                if (!score) {
                    const newIQ = new Brain({ user: member?.toString() });
                    await newIQ.save();
                } else {
                    const newScore = new Brain({ score: score.score + 1 });
                    await Brain.update({ user: member?.toString() }, newScore);
                }
            } else {
                const newScore = new Brain({ score: score!.score - 1 });
                await Brain.update({ user: member?.toString() }, newScore);
            }
            console.log(score);
            break;

        case "❌":
            console.log("Incorrect");
            break;

        default:
            console.log(reaction.emoji.name);
            break;
    }
};
