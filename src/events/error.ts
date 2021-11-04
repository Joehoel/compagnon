import logger from "../lib/logger";
import Event from "../structures/Event";

export default new Event({
    name: "error",
    async run(client, args) {
        logger.error(args);
    },
});
