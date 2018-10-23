const Router = require('koa-router')();
const Cache = require('../lib/page');

// Render template and append page content from pages/<filename>.html
Router.get('/*', async ctx => {
  const path = ctx.url === '/' ? 'index' : ctx.url.substr(1);

  if(Cache.has(path, true)) {
    const page = Cache.get(path);
    const fields = Object.keys(page.fields).reduce((acc, field) => {
      acc[field] = page.fields[field].value;
      return acc;
    }, {});

    await ctx.render(path, fields);
  } else {
    ctx.status = 404;
    ctx.body = `<html>
    <head>
      <title>404 Not Found</title>
    </head>
    <body>
      <h1>404 Not Found</h1>
      <p>Sidan du sökte efter kunde inte hittas</p>
    </body>
    </html>`;
  }
});

module.exports = Router;
