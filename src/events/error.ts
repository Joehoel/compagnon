import { Client } from "discord.js";
import Event from "../utils/Event";

export default new Event({
  name: "error",
  async run(client, args: Error) {
    client.logger.error(args);
  },
});

// export default async (client: Client, args: Error) => {
//   client.logger.error(args);
// };
