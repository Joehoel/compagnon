import SlashCommand, { OptionType } from "../structures/SlashCommand";

export default new SlashCommand({
    name: "todo",
    description: "Add a new todo for Joel to make",
    options: [
        { name: "title", description: "the todo title", type: OptionType.STRING, required: true },
        {
            name: "description",
            description: "the todo description",
            type: OptionType.STRING,
            required: false,
        },
    ],
    async execute(interaction) {
        const title = interaction.options.getString("title")!;
        const description = interaction.options.getString("description")!;

        await fetch("https://maker.ifttt.com/trigger/task_added/with/key/O5rzqhMDS6pzVDbLT7Si", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                value1: title,
                value2: description,
            }),
        });

        return interaction.reply(`Todo: '${title}' added!`);
    },
});
