import { relative } from "node:path";
import { Events } from "discord.js/src/util/Constants.js";
import AutocompletePrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

export default function (
  /** @type {import("plop").NodePlopAPI} */
  plop
) {
  plop.setPrompt("autocomplete", AutocompletePrompt);

  plop.setHelper("relativePath", (from, to) => relative(from, to));

  plop.setGenerator("command", {
    description: "Discord.js [/] command",
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

  plop.setGenerator("module", {
    description: "Bot module",
    prompts: [
      { type: "input", message: "Name", name: "name" },
      {
        type: "autocomplete",
        message: "Event",
        name: "event",
        source: (_, input = "") =>
          fuzzy.filter(input, Object.values(Events)).map((e) => e.original),
      },
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
