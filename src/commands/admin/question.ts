import { sendQuestion } from "../../lib/helpers";
import Command from "../../structures/Command";

export default new Command({
    name: "question",
    description: "Manually send the daily question",
    admin: true,
    execute(client) {
        return sendQuestion(client);
    },
});
