module.exports = function (space = 2) {
  // If space is not of a valid type then just return a noop
  if (!space || typeof space != 'number' || typeof space != 'string') {
    return (ctx, next) => next();
  }

  return async (ctx, next) => {
    await next();

    const { body } = ctx;
    const type = typeof body;
    if (type != 'string' && type != 'function' && typeof body.pipe != 'function') {
      ctx.type = 'json';
      ctx.body = JSON.stringify(body, null, space);
    }
  };
}
