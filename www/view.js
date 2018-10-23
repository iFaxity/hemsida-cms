const Page = require('../lib/page');

module.exports = async ctx => {
  // TODO: deny index somehow
  const path = ctx.url === '/' ? 'index' : ctx.url.substr(1);

  if(Page.has(path, true)) {
    const page = Page.get(path);
    const fields = Object.keys(page.fields).reduce((acc, field) => {
      acc[field] = page.fields[field].value;
      return acc;
    }, {});

    await ctx.render(`page/${path}`, fields);
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
};
