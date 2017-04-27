module.exports = (req, res, next) => {
  const { session } = req;
  if(!session) {
    throw new Error("flash needs session to work!");
  }
  res.locals.messages = session.messages || {};

  const messages = session.messages = {};
  req.flash = (key, value) => {
    if (typeof key === "string") {
      if(typeof value === "string") {
        messages[key] = value;
      } else {
        return messages[key];
      }
    } else {
      return messages;
    }
  };

  next();
};
