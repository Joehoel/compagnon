import { sendAnswer, sendQuestion } from "@/lib/helpers";
import { CronJob } from "cron";
import { Client } from "discord.js";

export default async (client: Client) => {
    const job = new CronJob("0 9 * * *", async () => {
        await sendAnswer(client);
        await sendQuestion(client);
    });
    job.start();
};
