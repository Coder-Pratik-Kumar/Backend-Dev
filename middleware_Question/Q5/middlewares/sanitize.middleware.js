import xss from "xss";
import validator from "validator";

const sanitizeObject = (obj) => {

    for (let key in obj) {

        if (typeof obj[key] === "string") {

            // Remove XSS scripts
            let cleanValue = xss(obj[key]);

            // Escape SQL characters
            cleanValue = validator.escape(cleanValue);

            obj[key] = cleanValue;
        }

        if (typeof obj[key] === "object") {
            sanitizeObject(obj[key]);
        }
    }

    return obj;
};

const sanitizeMiddleware = (req, res, next) => {

    if (req.body) {
        req.body = sanitizeObject(req.body);
    }

    if (req.query) {
        req.query = sanitizeObject(req.query);
    }

    if (req.params) {
        req.params = sanitizeObject(req.params);
    }

    next();
};

export default sanitizeMiddleware;