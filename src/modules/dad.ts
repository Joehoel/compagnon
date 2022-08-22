import { capitalize, Module } from "@/lib";
import assert from "assert";
import {
  anyOf,
  caseInsensitive,
  char,
  createRegExp,
  exactly,
  global,
  oneOrMore,
  word,
  wordBoundary,
  wordChar,
} from "magic-regexp";

export default new Module({
  name: "dad",
  event: "messageCreate",
  async run(client, message) {
    if (message.channel.type == "DM" || message.author.bot) return;

    // a message contains "ik ben" and return the part after "ik ben" regex
    const regex = createRegExp(exactly("ik ben ").before(oneOrMore(char).as("sentence")), [
      caseInsensitive,
      global,
    ]);

    const sentence = regex.exec(message.content)?.at(-1);

    if (sentence) {
      message.reply(`Hallo ${capitalize(sentence)}, ik ben Compagnon :wave:`);

      return;
    }
  },
});
