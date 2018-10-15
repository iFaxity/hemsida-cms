const path = require("path");
const PAGES_DIR = path.join(__dirname, "../pages");

const Router = require("koa-router")();
const Cache = require("../lib/cache");

// Render template and append page content from pages/<filename>.html
Router.get("*", async ctx => {
  const path = ctx.url === "/" ? "/index" : ctx.url.replace("/\//g", ".");
  const page = Cache.get(path);

  if(page) {
    await ctx.render("index", {
      title: "Lekextra",
      content: page
    });
  } else {
    ctx.status = 404;
    ctx.body = `<html>
    <head>
      <title>404 Not Found</title>
    </head>
    <body>
      <h1>404 Not Found</h1>
    </body>
    </html>`;
  }
});

module.exports = Router;
