import { Intents } from "discord.js";
import "dotenv/config";

import Bot from "./bot";

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const bot = new Bot({
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

bot.on("ready", () => {
  console.log("sup!");
});

bot.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  try {
    command?.execute(interaction);
  } catch (error) {
    console.error(error);
  } finally {
    const author = interaction.user;
    console.info(`${author.tag} (${author.id}) ran a (/) command: '${command?.name}'`);
  }
});

bot.on("messageCreate", (message) => {
  console.log(message.content);
});
