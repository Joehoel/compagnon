import axios from "axios";
import Command from "../../structures/Command";
import { stations } from "../../data/stations.json";
import { MessageActionRow, MessageSelectMenu } from "discord.js";

interface Station {
    id: number;
    name: string;
    url: string;
}

export default new Command({
    name: "radio",
    description: "Play a radio station to your liking",
    exclusive: true,
    async execute(client, message, args) {
        const row = new MessageActionRow({
            type: "SELECT_MENU",
            components: [
                new MessageSelectMenu({
                    customId: "radio-select",
                    placeholder: "Radio stations",
                    options: stations
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .slice(0, 24)
                        .map((station) => ({ label: station.name, value: station.url })),
                }),
            ],
        });

        await message.reply({ content: "Kies een radio station", components: [row] });

        // await client.music.play(message, data.url);
    },
});
