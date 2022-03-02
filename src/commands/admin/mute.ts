import { ROLES } from "../../lib/constants";
import Command from "../../structures/Command";
import redis, { expire } from "../../lib/redis";
import { removeRole, giveRole } from "../../lib/helpers";
import logger from "../../lib/logger";

const redisKeyPrefix = process.env.REDIS_KEY_PREFIX;

export default new Command({
    name: "mute",
    description: "Mute a person",
    args: true,
    permissions: ["MUTE_MEMBERS"],
    usage: "<@> <duration> <m, h, d or life>",
    exclusive: true,
    // enabled: false,
    async execute(client, message, args) {
        if (args.length !== 3) {
            return message.channel.send(`Please use the correct syntax: \`${this.usage}\``);
        }
        const [_, duration, type] = args;

        if (isNaN(parseInt(duration))) return;

        const durations: Record<string, number> = {
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
            life: -1,
        };

        if (!durations[type]) return;

        const milliseconds = (+duration * durations[type]) / 1000;

        const target = message.mentions.members!.first()! || message.author;

        if (!target) {
            return message.channel.send(`Please tag a user to mute`);
        }
        const { id } = target;
        const targetMember = message.member?.guild.members.cache.get(id);

        return await targetMember?.timeout(milliseconds);
        //     expire((message: string) => {
        //         if (message.startsWith(redisKeyPrefix)) {
        //             const split = message.split("-");
        //             const memberId = split[1];
        //             const guildId = split[2];
        //             const guild = client.guilds.cache.get(guildId);
        //             const member = guild!.members.cache.get(memberId);
        //             removeRole(member!, ROLES.MUTED);
        //             giveRole(member!, ROLES.MEMBER);
        //         }
        //     });
        //     if (targetMember) {
        //         giveRole(targetMember, ROLES.MUTED);
        //         removeRole(targetMember, ROLES.MEMBER);
        //     }
        //     const redisClient = await redis();
        //     try {
        //         const redisKey = `${redisKeyPrefix}${id}-${message.member?.guild.id}`;
        //         if (seconds > 0) {
        //             redisClient.set(redisKey, "true", "EX", seconds);
        //         } else {
        //             redisClient.set(redisKey, "true");
        //         }
        //     } catch (err) {
        //         logger.error(err);
        //     } finally {
        //         redisClient.quit();
        //     }
    },
});
