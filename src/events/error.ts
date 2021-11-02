import logger from "@/lib/logger";
import Event from "../modules/Event";

export default new Event({
    name: "error",
    async run(client, args: Error) {
        logger.error(args);
    },
});
