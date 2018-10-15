const path = require("path");

const etag = require("koa-etag");
const conditional = require("koa-conditional-get");
const helmet = require("koa-helmet");
const favicon = require("koa-favicon");
const logger = require("koa-logger");
const body = require("koa-body");
const session = require("koa-session");
const compress = require("koa-compress");
const static = require("koa-static");
const views = require("koa-views");
const flash = require("./lib/flash");

const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router")();

// Routes
const index = require("./routes");
const cms = require("./routes/cms");

const VIEWS_DIR = path.join(__dirname, "/views");
const STATIC_DIR = path.join(__dirname, "../client");

// Add etag support and use helmet for security
app.use(conditional());
app.use(etag());
app.use(helmet());
app.keys = ["secret", "key"]; // TODO: security?

// uncomment after placing your favicon in /client
//app.use(favicon(__dirname + "/client/favicon.ico"));
app.use(logger());
app.use(compress({
  flush: require("zlib").Z_SYNC_FLUSH
}));
app.use(session({
  key: "somesecretkey1234",
  maxAge: 24 * 60 * 60 * 1000 // expire in 1 day
}, app));
app.use(body({ multipart: true })); // generally only use when needed
app.use(views(VIEWS_DIR, { extension: "pug" }));
app.use(flash);

// Mount the routes and static content
app.use(static(STATIC_DIR));

app.use(cms.routes());
app.use(index.routes());

// Indicate that the server started
console.log("\x1b[32m%s\x1b[0m", "Server is now running!");
module.exports = app;
