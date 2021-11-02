import { join } from "path";
import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";

const logger = createLogger({
    level: "silly",
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
    defaultMeta: { service: "Compagnon" },
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: false }),
                format.padLevels(),
                consoleFormat({
                    showMeta: true,
                    metaStrip: ["timestamp", "service"],
                    inspectOptions: {
                        depth: Infinity,
                        colors: true,
                        maxArrayLength: Infinity,
                        breakLength: 120,
                        compact: Infinity,
                    },
                })
            ),
        }),
        new transports.File({
            filename: join(__dirname, "../../logs/error.log"),
            level: "info",
        }),
    ],
});

export default logger;
