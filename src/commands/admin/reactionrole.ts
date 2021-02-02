import { MessageEmbed, RoleResolvable } from "discord.js";
import Command from "../../utils/Command";

export default new Command({
    name: "reactionrole",
    description: "Create an embed to make give users roles",
    permissions: ["MANAGE_ROLES"],
    aliases: ["rr"],
    async execute(client, message) {
        const channel = "521379692163366921";
        const memberRole = message.guild!.roles.cache.find((role) => role.id === "737240291089711175");

        const memberEmoji = "🙋‍♂️";

        const msg = await message.channel.send(
            new MessageEmbed({
                title: "Welkom",
                description: "Klik op de emoji om toegang te krijgen tot de rest van server.",
                color: "#ffc600",
            })
        );
        await msg.react(memberEmoji);

        client.on("messageReactionAdd", async (reaction, user) => {
            console.log("HERE");
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === memberEmoji) {
                    await reaction.message.guild.members.cache.get(user.id)!.roles.add(memberRole as RoleResolvable);
                }
            }
            return;
        });

        client.on("messageReactionRemove", async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === memberEmoji) {
                    await reaction.message.guild.members.cache.get(user.id)!.roles.remove(memberRole as RoleResolvable);
                }
            }
            return;
        });
    },
});
