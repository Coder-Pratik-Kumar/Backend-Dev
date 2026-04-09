import fs from "fs";

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const responseTime = end - start;

        const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${responseTime}ms\n`;

        fs.appendFile("requests.log", log, (err) => {
            if (err) console.error("Error writing log:", err);
        });
    });

    next();
};

export default requestLogger;