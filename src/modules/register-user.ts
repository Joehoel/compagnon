import { db } from "@/database";
import Module from "../lib/Module";
import { users } from "@/database/schema";

export default new Module({
  name: "register-user",
  event: "messageCreate",
  async run(client, message) {
    console.log("register-user on guildMemberAdd");

    await db.insert(users).values({
      id: 1,
      avatar: message.author.avatar,
      username: message.author.username,
    });

    return;
  },
});
