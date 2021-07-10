import Event from "../modules/Event";

export default new Event({
  name: "error",
  async run(client, args: Error) {
    client.logger.error(args);
  },
});
