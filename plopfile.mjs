export default function (
    /** @type {import("plop").NodePlopAPI} */
    plop
) {
    plop.setGenerator("command", {
        description: "command",
        prompts: [
            { type: "input", message: "Name", name: "name" },
            { type: "input", message: "Description", name: "description" },
        ],
        actions: [
            {
                type: "add",
                path: "src/commands/{{dashCase name}}.ts",
                templateFile: "./templates/command.hbs",
            },
        ],
    });

    plop.setGenerator("slash-command", {
        description: "Discord.js [/] command",
        prompts: [
            { type: "input", message: "Name", name: "name" },
            { type: "input", message: "Description", name: "description" },
        ],
        actions: [
            {
                type: "add",
                path: "src/_commands/{{dashCase name}}.ts",
                templateFile: "./templates/_command.hbs",
            },
        ],
    });

    plop.setGenerator("module", {
        description: "Bot module",
        prompts: [
            { type: "input", message: "Name", name: "name" },
            { type: "input", message: "Event", name: "event" },
        ],
        actions: [
            {
                type: "add",
                path: "src/modules/{{dashCase name}}.ts",
                templateFile: "./templates/module.hbs",
            },
        ],
    });
}
