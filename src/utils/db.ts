import mongoose from "mongoose";
import colors from "colors";

type TInput = {
    db: string;
};

export const connect = ({ db }: TInput) => {
    const connect = () => {
        mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => {
                return console.info("Database" + colors.green.bold(" connected!"));
            })
            .catch((error) => {
                console.error(colors.red.bold("Error") + "connecting to database: ", error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};
