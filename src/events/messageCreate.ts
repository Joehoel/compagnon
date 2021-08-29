import { embed } from "@/lib/helpers";
import { Client, Message } from "discord.js";
import * as features from "../features";
import Event from "../modules/Event";

export default new Event({
    name: "messageCreate",
    async run(client: Client, message: Message) {
        try {
            await features.filter(client, message);
            await features.command(client, message);
            await features.polls(client, message);
            await features.xp(client, message);
            await features.dad(client, message);
            await features.quiz(client, message);
        } catch (error) {
            await message.channel.send({
                embeds: [
                    embed({
                        title: "Something went wrong!",
                        fields: [
                            {
                                name: "Error",
                                value: error,
                            },
                        ],
                    }),
                ],
            });

            throw error;
        }
    },
});
