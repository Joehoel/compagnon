import { CHANNELS, EVENTS, GUILD_ID, SCOREBOARD_MESSAGE_ID } from "../lib/constants";
import {
    Client,
    MessageReaction,
    PartialMessageReaction,
    PartialUser,
    TextChannel,
    User,
} from "discord.js";
import { Brain } from "../entity/Brain";
import { getQuestion, scoreboard } from "../lib/helpers";

export default async (
    client: Client,
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
    event: EVENTS
) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || reaction.message.channel.type != "DM") return;

    const author = reaction.message.embeds[0].author;
    const member = client.guilds.cache
        .get(GUILD_ID)!
        .members.cache.find((m) => m.user.username == author?.name);

    const score = await Brain.findOne({ where: { user: member?.id } });
    const question = await getQuestion();

    const answersChannel = (await client.guilds.cache
        .get(GUILD_ID)
        ?.channels.cache.get(CHANNELS.ANTWOORDEN)
        ?.fetch()) as TextChannel;

    if (reaction.emoji.name == "✅") {
        if (event == EVENTS.REACTION_ADD) {
            if (!score) {
                const newIQ = new Brain({ user: member?.id });
                await newIQ.save();
            } else {
                const newScore = new Brain({ score: score.score + 1 });
                await Brain.update({ user: member?.id }, newScore);
            }

            await answersChannel.send({
                content: `<@${member?.user.id}> Je antwoord op de vraag van ${Intl.DateTimeFormat(
                    "nl-NL",
                    {
                        dateStyle: "medium",
                    }
                ).format(question?.date)} is goedgekeurd!`,
            });
        } else {
            const newScore = new Brain({ score: score!.score - 1 });
            await Brain.update({ user: member?.id }, newScore);
            await answersChannel.send({
                content: `<@${member?.user.id}> Je antwoord op de vraag van ${Intl.DateTimeFormat(
                    "nl-NL",
                    {
                        dateStyle: "medium",
                    }
                ).format(question?.date)} is bij nader inzien afgekeurd!`,
            });
        }

        // Update the scoreboard
        const scoreboardChannel = (await client.guilds.cache
            .get(GUILD_ID)
            ?.channels.cache.get(CHANNELS.REGELS_EN_LEADERBOARD)
            ?.fetch()) as TextChannel;

        const messages = await scoreboardChannel.messages.fetch({
            around: SCOREBOARD_MESSAGE_ID,
            limit: 1,
        });
        const message = messages.first();
        await message?.edit({ content: await scoreboard() });
    }
};
