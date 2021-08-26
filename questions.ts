import { questions } from "./src/lib/contants";
import { createConnection } from "typeorm";
import { Question } from "./src/entity/Question";

(async () => {
    await createConnection();

    questions.forEach(async (question, index) => {
        const date = new Date(new Date(2021, 7, 26, 9, 0, 0, 0).getTime() + index * 1000 * 60 * 60 * 24);
        const q = new Question({
            text: question,
            date,
        });
        await q.save();
    });
})();
