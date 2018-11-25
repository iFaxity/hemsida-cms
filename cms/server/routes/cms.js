const send = require('koa-send');

// Show index page
module.exports = async function(ctx, next) {
  if(!ctx.url.startsWith('/dist')) {
    await send(ctx, 'cms/server/index.html');
  } else {
    await next();
  }
};
