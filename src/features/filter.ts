import Filter from "bad-words";
import { Message } from "discord.js";
import { readFileSync } from "fs";
import { Swear } from "../entity/Swear";
import Bot from "../structures/Bot";

const { PREFIX } = process.env;

export default async (client: Bot, message: Message) => {
    if (message.channel.type == "DM") return;
    const prefix = client.config.get(message.guild!.id)?.prefix || PREFIX;

    if (message.content.startsWith(prefix) || message.author.bot) return;
    const text = message.content.toLowerCase();

    const filter = new Filter();

    const lists = {
        nl: "./src/data/scheldwoorden-nl.txt",
        en: "./src/data/scheldwoorden-en.txt",
        extra: "./src/data/scheldwoorden.txt",
    };

    Object.values(lists).forEach((path) => {
        const file = readFileSync(path, { encoding: "utf-8" });
        const words = file.split(", ").map((word) => word.toLowerCase().trim());
        filter.addWords(...words);
    });

    filter.removeWords("lol", "hoe", "hoor", "kunt", "hardcore", "kaas");
    if (filter.isProfane(text)) {
        const user = message.author.toString();
        // client.commands.get("mute")?.execute(client, message, [user, "1", "m"]);

        const swear = await Swear.findOne({ where: { user } });
        if (swear) {
            swear.swears++;
            await swear.save();
        } else {
            const newSwear = new Swear({ user });
            await newSwear.save();
        }

        return message.reply("Ga je mond wassen! 🧼");
    }
};
