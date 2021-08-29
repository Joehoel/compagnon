import { sendQuestion } from "../../lib/helpers";
import Command from "../../modules/Command";

export default new Command({
    name: "question",
    description: "Manually send the daily question",
    admin: true,
    execute(client) {
        return sendQuestion(client);
    },
});
