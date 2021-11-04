import { CronJob } from "cron";
import { sendAnswer, sendQuestion } from "../lib/helpers";
import Bot from "../structures/Bot";

export default async (client: Bot) => {
    const job = new CronJob("0 9 * * *", async () => {
        await sendAnswer(client);
        await sendQuestion(client);
    });
    job.start();
};
