import { Message, SelectMenuInteraction, User } from "discord.js";
import Module from "../structures/Module";

export default new Module({
    name: "radio",
    event: "interactionCreate",
    async run(client, interaction) {
        if (!interaction.isSelectMenu()) return;

        // if (interaction.customId == "radio-select") {
        //     await client.music.play(
        //         { ...interaction.message, author: interaction.member.user as User },
        //         interaction.values[0]
        //     );
        //     // console.log();
        // }
    },
});
