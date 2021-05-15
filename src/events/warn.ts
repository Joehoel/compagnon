import { Client } from "discord.js";
import Event from "../utils/Event";

export default new Event({
  name: "warn",
  async run(client: Client, args: string) {
    client.logger.warn(args);
  },
});

// export default async (client: Client, args: string) => {
//   client.logger.warn(args);
// };
