const languageMiddleware = (req, res, next) => {

  const language = req.cookies.language || "en";

  req.language = language;

  next();
};

export default languageMiddleware;