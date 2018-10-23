const path = require('path');
const { createReadStream } = require('fs');
const Router = require('koa-router')();

// Show index page
Router.get('*', async (ctx, next) => {
  if(!ctx.url.startsWith('/dist')) {
    ctx.type = 'html';
    ctx.body = createReadStream(path.join(__dirname, '../index.html'));
  }
  next();
});

module.exports = Router;
