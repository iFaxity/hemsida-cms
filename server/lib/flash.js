module.exports = async (ctx, next) => {
  const { session } = ctx;
  if (!session) {
    throw new Error("flash needs session to work!");
  }
  ctx.state.messages = session.messages || {};
  const messages = session.messages = {};
  
  ctx.flash = (key, value) => {
    if (typeof key === "string") {
      if (value !== undefined) {
        messages[key] = value;
      } else {
        return messages[key];
      }
    } else {
      return messages;
    }
  };

  await next();
};
