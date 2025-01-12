import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;

winston.addColors({
    info: "cyan",
    warn: "yellow",
    error: "red",
    debug: "magenta",
});

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: *****${message}*****`;
});

export const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.Console({
            format: combine(colorize({ level: true }), timestamp(), logFormat),
        }),
        //new winston.transports.File({ filename: "server_log.log" }),
    ],
});
